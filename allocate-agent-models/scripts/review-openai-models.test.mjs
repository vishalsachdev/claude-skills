import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  ALLOWED_DOMAINS,
  OFFICIAL_FACTS_END,
  OFFICIAL_FACTS_START,
  PR_BODY_PATH,
  REFERENCE_PATH,
  REVIEWED_DATE_PREFIX,
  buildReviewRequest,
  reviewModelGuidance,
  shouldRefreshEvidence,
  validateChangedFiles,
} from './review-openai-models.mjs';

const SOURCE = 'https://developers.openai.com/api/docs/models/gpt-5.6-sol';

function reference(lastChecked = '2026-06-01') {
  return [
    '# OpenAI model facts',
    REVIEWED_DATE_PREFIX + lastChecked + ' -->',
    '',
    OFFICIAL_FACTS_START,
    '- Existing official fact.',
    OFFICIAL_FACTS_END,
    '',
    'Local guidance belongs elsewhere.',
    '',
  ].join('\n');
}

function reviewOutput({ factsChanged = true, block } = {}) {
  return {
    facts_changed: factsChanged,
    verified_facts: [
      {
        claim: factsChanged ? 'GPT-5.6 Sol is available in the Responses API.' : 'Existing official fact.',
        source_urls: [SOURCE],
      },
    ],
    sources: [SOURCE],
    official_facts_block: block ?? [
      OFFICIAL_FACTS_START,
      factsChanged ? '- GPT-5.6 Sol is available in the Responses API.' : '- Existing official fact.',
      OFFICIAL_FACTS_END,
    ].join('\n'),
    policy_recommendations: ['Use Sol/high only for high-consequence model-routing review.'],
  };
}

function responseFixture(output = reviewOutput(), options = {}) {
  const search = options.search ?? {
    type: 'web_search_call',
    status: 'completed',
    action: { type: 'search', queries: ['OpenAI model guidance'], sources: [{ type: 'url', url: SOURCE }] },
  };
  const message = options.message ?? {
    type: 'message',
    status: 'completed',
    content: [{ type: 'output_text', text: JSON.stringify(output) }],
  };
  return {
    status: options.status ?? 'completed',
    model: options.model ?? 'gpt-5.6-sol',
    output: [search, message],
  };
}

async function workspace(lastChecked) {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), 'openai-model-review-'));
  const referenceFile = path.join(rootDir, REFERENCE_PATH);
  await writeFile(referenceFile, reference(lastChecked), { encoding: 'utf8', flag: 'w' }).catch(async (error) => {
    if (error.code !== 'ENOENT') throw error;
    const { mkdir } = await import('node:fs/promises');
    await mkdir(path.dirname(referenceFile), { recursive: true });
    await writeFile(referenceFile, reference(lastChecked), 'utf8');
  });
  return rootDir;
}

function fakeFetch(payload, status = 200) {
  return async () => new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test('buildReviewRequest locks Sol/high to a required allowlisted live web search and strict schema', () => {
  const request = buildReviewRequest('current facts');
  assert.equal(request.model, 'gpt-5.6-sol');
  assert.deepEqual(request.reasoning, { effort: 'high' });
  assert.deepEqual(request.tools, [{ type: 'web_search', filters: { allowed_domains: ALLOWED_DOMAINS } }]);
  assert.equal(request.tool_choice, 'required');
  assert.deepEqual(request.include, ['web_search_call.action.sources']);
  assert.equal(request.text.format.type, 'json_schema');
  assert.equal(request.text.format.strict, true);
});

test('a valid changed review replaces only the delimited facts block, refreshes the date, and writes policy only to PR body', async () => {
  const rootDir = await workspace('2026-06-01');
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture()),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, [REFERENCE_PATH, PR_BODY_PATH]);
  const updated = await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8');
  assert.match(updated, /GPT-5\.6 Sol is available/);
  assert.match(updated, /OPENAI_MODEL_GUIDANCE_REVIEWED: 2026-08-11/);
  assert.doesNotMatch(updated, /Use Sol\/high only/);
  const body = await readFile(path.join(rootDir, PR_BODY_PATH), 'utf8');
  assert.match(body, /Use Sol\/high only/);
});

test('an unchanged review before the deterministic 60-day refresh point writes nothing', async () => {
  const rootDir = await workspace('2026-07-01');
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture(reviewOutput({ factsChanged: false }))),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, []);
  assert.equal(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), reference('2026-07-01'));
});

test('an unchanged review at 60 days refreshes evidence before the 90-day staleness limit', async () => {
  const rootDir = await workspace('2026-06-12');
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture(reviewOutput({ factsChanged: false }))),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, [REFERENCE_PATH, PR_BODY_PATH]);
  assert.match(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), /REVIEWED: 2026-08-11/);
  assert.equal(shouldRefreshEvidence('2026-06-12', '2026-08-11'), true);
  assert.equal(shouldRefreshEvidence('2026-06-13', '2026-08-11'), false);
});

test('fails closed when the response contains no completed web search', async () => {
  const rootDir = await workspace();
  await assert.rejects(
    reviewModelGuidance({
      rootDir, apiKey: 'test-key', today: '2026-08-11',
      fetchImpl: fakeFetch(responseFixture(reviewOutput(), { search: { type: 'web_search_call', status: 'in_progress', action: { sources: [] } } })),
      changedFiles: () => [],
    }),
    /completed web_search_call/,
  );
});

test('fails closed when a search or reported source is outside the HTTPS OpenAI allowlist', async () => {
  const rootDir = await workspace();
  const badSource = 'https://example.com/models';
  const output = reviewOutput();
  output.sources = [badSource];
  output.verified_facts[0].source_urls = [badSource];
  const response = responseFixture(output, {
    search: { type: 'web_search_call', status: 'completed', action: { type: 'search', sources: [{ type: 'url', url: badSource }] } },
  });
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(response), changedFiles: () => [] }),
    /allowlist/,
  );
});

test('fails closed on a model refusal', async () => {
  const rootDir = await workspace();
  const response = responseFixture(reviewOutput(), {
    message: { type: 'message', status: 'completed', content: [{ type: 'refusal', refusal: 'Cannot comply.' }] },
  });
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(response), changedFiles: () => [] }),
    /refused/,
  );
});

test('fails closed on malformed structured output or factual claims without linked sources', async () => {
  const rootDir = await workspace();
  const malformed = responseFixture({ facts_changed: true });
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(malformed), changedFiles: () => [] }),
    /schema/,
  );

  const unlinked = reviewOutput();
  unlinked.verified_facts[0].source_urls = [];
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(responseFixture(unlinked)), changedFiles: () => [] }),
    /source linkage/,
  );
});

test('fails closed on HTTP errors before attempting a file update', async () => {
  const rootDir = await workspace();
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch({ error: { message: 'bad token' } }, 401), changedFiles: () => [] }),
    /HTTP 401/,
  );
  assert.equal(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), reference());
});

test('fails closed on a missing API key or a returned fallback model', async () => {
  const rootDir = await workspace();
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: '', today: '2026-08-11', fetchImpl: fakeFetch(responseFixture()), changedFiles: () => [] }),
    /OPENAI_API_KEY is missing/,
  );
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(responseFixture(reviewOutput(), { model: 'gpt-5.6-terra' })), changedFiles: () => [] }),
    /not gpt-5\.6-sol/,
  );
});

test('rejects every changed path outside the two automation outputs', () => {
  assert.doesNotThrow(() => validateChangedFiles([REFERENCE_PATH, PR_BODY_PATH]));
  assert.throws(() => validateChangedFiles([REFERENCE_PATH, 'allocate-agent-models/SKILL.md']), /outside the allowlist/);
});
