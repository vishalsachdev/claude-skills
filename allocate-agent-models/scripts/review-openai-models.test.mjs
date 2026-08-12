import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import * as reviewer from './review-openai-models.mjs';

const {
  ALLOWED_DOMAINS,
  PR_BODY_PATH,
  REFERENCE_PATH,
  buildReviewRequest,
  reviewModelGuidance,
  shouldRefreshEvidence,
  validateChangedFiles,
} = reviewer;

const SOURCE = 'https://developers.openai.com/api/docs/models/gpt-5.6-sol';
const SECOND_SOURCE = 'https://platform.openai.com/docs/api-reference/responses/create';
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, '../..');
const WORKFLOW_PATH = path.join(REPOSITORY_ROOT, '.github/workflows/review-model-routing.yml');
const ACTUAL_REFERENCE_PATH = path.join(REPOSITORY_ROOT, REFERENCE_PATH);
const FACTS_START = '<!-- BEGIN AUTO-MANAGED OFFICIAL FACTS -->';
const FACTS_END = '<!-- END AUTO-MANAGED OFFICIAL FACTS -->';

function existingFactsBlock() {
  return [
    FACTS_START,
    `- Existing official fact. ([source](${SOURCE}))`,
    FACTS_END,
  ].join('\n');
}

function reference(lastChecked = '2026-06-01') {
  return [
    '# OpenAI model facts',
    '',
    `Checked: ${lastChecked}`,
    '',
    'Stable content before the managed section.',
    '',
    existingFactsBlock(),
    '',
    'Local guidance belongs elsewhere.',
    '',
  ].join('\n');
}

function verifiedFact(claim = 'GPT-5.6 Sol is available in the Responses API.', sourceUrls = [SOURCE]) {
  return { claim, source_urls: sourceUrls };
}

function reviewOutput({ facts = [verifiedFact()], policyRecommendations } = {}) {
  return {
    verified_facts: facts,
    policy_recommendations: policyRecommendations ?? ['Use Sol/high only for high-consequence model-routing review.'],
  };
}

function responseFixture(output = reviewOutput(), options = {}) {
  const sourceUrls = [...new Set(
    (output.verified_facts ?? []).flatMap((fact) => Array.isArray(fact.source_urls) ? fact.source_urls : []),
  )];
  const search = options.search ?? {
    type: 'web_search_call',
    status: 'completed',
    action: {
      type: 'search',
      queries: ['OpenAI model guidance'],
      sources: sourceUrls.map((url) => ({ type: 'url', url })),
    },
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

async function workspaceFromContent(content) {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), 'openai-model-review-'));
  const referenceFile = path.join(rootDir, REFERENCE_PATH);
  await mkdir(path.dirname(referenceFile), { recursive: true });
  await writeFile(referenceFile, content, 'utf8');
  return rootDir;
}

async function workspace(lastChecked) {
  return workspaceFromContent(reference(lastChecked));
}

function fakeFetch(payload, status = 200) {
  return async () => new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test('buildReviewRequest requires structured per-claim sources and has no model-authored Markdown block', () => {
  const request = buildReviewRequest('current facts');
  assert.equal(request.model, 'gpt-5.6-sol');
  assert.deepEqual(request.reasoning, { effort: 'high' });
  assert.deepEqual(request.tools, [{ type: 'web_search', filters: { allowed_domains: ALLOWED_DOMAINS } }]);
  assert.equal(request.tool_choice, 'required');
  assert.deepEqual(request.include, ['web_search_call.action.sources']);
  assert.equal(request.text.format.type, 'json_schema');
  assert.equal(request.text.format.strict, true);
  assert.deepEqual(request.text.format.schema.required, ['verified_facts', 'policy_recommendations']);
  assert.equal(request.text.format.schema.properties.official_facts_block, undefined);
  assert.equal(request.text.format.schema.properties.sources, undefined);
  assert.equal(request.text.format.schema.properties.verified_facts.items.properties.source_urls.minItems, 1);
});

test('a valid review deterministically renders each claim with its own allowlisted sources', async () => {
  const rootDir = await workspace('2026-06-01');
  const facts = [
    verifiedFact('GPT-5.6 Sol is available in the Responses API.', [SOURCE, SECOND_SOURCE]),
    verifiedFact('GPT-5.6 Terra has an explicit model ID.', [SECOND_SOURCE]),
  ];
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture(reviewOutput({ facts }))),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, [REFERENCE_PATH, PR_BODY_PATH]);
  const updated = await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8');
  assert.match(updated, /Checked: 2026-08-11/);
  assert.ok(updated.includes(
    `- GPT-5.6 Sol is available in the Responses API. ([source 1](${SOURCE}), [source 2](${SECOND_SOURCE}))`,
  ));
  assert.match(updated, /- GPT-5\.6 Terra has an explicit model ID\. \(\[source\]\(https:\/\/platform\.openai\.com\/docs\/api-reference\/responses\/create\)\)/);
  assert.doesNotMatch(updated, /Use Sol\/high only/);
  const body = await readFile(path.join(rootDir, PR_BODY_PATH), 'utf8');
  assert.match(body, /GPT-5\.6 Sol is available.*developers\.openai\.com.*platform\.openai\.com/s);
  assert.match(body, /Use Sol\/high only/);
});

test('the updater runs against a copy of the actual committed reference markers and date', async () => {
  const actualReference = await readFile(ACTUAL_REFERENCE_PATH, 'utf8');
  assert.match(actualReference, /^Checked: 2026-08-11$/m);
  assert.match(actualReference, /^<!-- BEGIN AUTO-MANAGED OFFICIAL FACTS -->$/m);
  assert.match(actualReference, /^<!-- END AUTO-MANAGED OFFICIAL FACTS -->$/m);
  const rootDir = await workspaceFromContent(actualReference);

  await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-10-10',
    fetchImpl: fakeFetch(responseFixture()),
    changedFiles: () => [],
  });

  const updated = await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8');
  assert.match(updated, /^Checked: 2026-10-10$/m);
  assert.match(updated, /GPT-5\.6 Sol is available in the Responses API/);
  assert.match(updated, /^## Direct official sources$/m);
});

test('an unchanged review before the deterministic 60-day refresh point writes nothing', async () => {
  const rootDir = await workspace('2026-07-01');
  const unchanged = reviewOutput({ facts: [verifiedFact('Existing official fact.')] });
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture(unchanged)),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, []);
  assert.equal(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), reference('2026-07-01'));
});

test('an unchanged review at 60 days refreshes evidence before the 90-day staleness limit', async () => {
  const rootDir = await workspace('2026-06-12');
  const unchanged = reviewOutput({ facts: [verifiedFact('Existing official fact.')] });
  const result = await reviewModelGuidance({
    rootDir,
    apiKey: 'test-key',
    today: '2026-08-11',
    fetchImpl: fakeFetch(responseFixture(unchanged)),
    changedFiles: () => [],
  });

  assert.deepEqual(result.changedFiles, [REFERENCE_PATH, PR_BODY_PATH]);
  assert.match(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), /Checked: 2026-08-11/);
  assert.equal(shouldRefreshEvidence('2026-06-12', '2026-08-11'), true);
  assert.equal(shouldRefreshEvidence('2026-06-13', '2026-08-11'), false);
});

test('one sourced claim plus an unsourced extra claim is rejected before rendering', async () => {
  const rootDir = await workspace();
  const original = await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8');
  const output = reviewOutput({
    facts: [verifiedFact(), verifiedFact('This extra assertion has no source.', [])],
  });
  await assert.rejects(
    reviewModelGuidance({
      rootDir,
      apiKey: 'test-key',
      today: '2026-08-11',
      fetchImpl: fakeFetch(responseFixture(output)),
      changedFiles: () => [],
    }),
    /source linkage/,
  );
  assert.equal(await readFile(path.join(rootDir, REFERENCE_PATH), 'utf8'), original);
});

test('an attempted freeform managed block is rejected as an unexpected structured-output field', async () => {
  const rootDir = await workspace();
  const output = {
    ...reviewOutput(),
    official_facts_block: `${FACTS_START}\n- Sourced claim.\n- Unsourced extra assertion.\n${FACTS_END}`,
  };
  await assert.rejects(
    reviewModelGuidance({
      rootDir,
      apiKey: 'test-key',
      today: '2026-08-11',
      fetchImpl: fakeFetch(responseFixture(output)),
      changedFiles: () => [],
    }),
    /schema/,
  );
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

test('fails closed when a search or claim source is outside the HTTPS OpenAI allowlist', async () => {
  const rootDir = await workspace();
  const badSource = 'https://example.com/models';
  const output = reviewOutput({ facts: [verifiedFact('Bad source claim.', [badSource])] });
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

test('fails closed on malformed structured output or claims not linked to returned search sources', async () => {
  const rootDir = await workspace();
  const malformed = responseFixture(
    { verified_facts: [] },
    {
      search: {
        type: 'web_search_call',
        status: 'completed',
        action: { type: 'search', sources: [{ type: 'url', url: SOURCE }] },
      },
    },
  );
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(malformed), changedFiles: () => [] }),
    /schema/,
  );

  const output = reviewOutput();
  const response = responseFixture(output, {
    search: { type: 'web_search_call', status: 'completed', action: { type: 'search', sources: [{ type: 'url', url: SECOND_SOURCE }] } },
  });
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(response), changedFiles: () => [] }),
    /not returned by completed web search/,
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

test('fails closed on a missing API key without fetching or on a returned fallback model', async () => {
  const rootDir = await workspace();
  let fetched = false;
  await assert.rejects(
    reviewModelGuidance({
      rootDir,
      apiKey: '',
      today: '2026-08-11',
      fetchImpl: async () => { fetched = true; throw new Error('must not fetch'); },
      changedFiles: () => [],
    }),
    /OPENAI_API_KEY is missing/,
  );
  assert.equal(fetched, false);
  await assert.rejects(
    reviewModelGuidance({ rootDir, apiKey: 'test-key', today: '2026-08-11', fetchImpl: fakeFetch(responseFixture(reviewOutput(), { model: 'gpt-5.6-terra' })), changedFiles: () => [] }),
    /not gpt-5\.6-sol/,
  );
});

test('workflow checks default-branch protection before OpenAI use and pushes without a tokenized remote URL', async () => {
  const workflow = await readFile(WORKFLOW_PATH, 'utf8');
  const protectionStep = workflow.indexOf('- name: Verify the triggering ref is the protected default branch');
  const apiKeyStep = workflow.indexOf('- name: Check API key before repository writes');
  const openAiStep = workflow.indexOf('- name: Review current OpenAI documentation');
  assert.ok(protectionStep > 0 && protectionStep < apiKeyStep && apiKeyStep < openAiStep);
  assert.match(workflow, /TRIGGER_REF_NAME: \$\{\{ github\.ref_name \}\}/);
  assert.match(workflow, /DEFAULT_BRANCH: \$\{\{ github\.event\.repository\.default_branch \}\}/);
  assert.match(workflow, /TRIGGER_REF_PROTECTED: \$\{\{ github\.ref_protected \}\}/);
  assert.match(workflow, /\[ "\$TRIGGER_REF_NAME" != "\$DEFAULT_BRANCH" \]/);
  assert.match(workflow, /\[ "\$TRIGGER_REF_PROTECTED" != 'true' \]/);
  assert.doesNotMatch(workflow, /BRANCH_PROTECTION_TOKEN|--validate-branch-protection|branches\/\$\{default_branch\}\/protection/);
  assert.match(workflow, /gh auth setup-git[\s\S]*git push origin/);
  assert.doesNotMatch(workflow, /x-access-token|https:\/\/[^\s"']*\$\{?GITHUB_TOKEN/);
});

test('rejects every changed path outside the two automation outputs', () => {
  assert.doesNotThrow(() => validateChangedFiles([REFERENCE_PATH, PR_BODY_PATH]));
  assert.throws(() => validateChangedFiles([REFERENCE_PATH, 'allocate-agent-models/SKILL.md']), /outside the allowlist/);
});
