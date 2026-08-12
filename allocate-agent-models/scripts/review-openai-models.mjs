#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const MODEL = 'gpt-5.6-sol';
export const ALLOWED_DOMAINS = ['developers.openai.com', 'platform.openai.com'];
export const REFERENCE_PATH = 'allocate-agent-models/references/openai-models.md';
export const PR_BODY_PATH = 'allocate-agent-models/.generated/openai-model-routing-pr-body.md';
export const OFFICIAL_FACTS_START = '<!-- BEGIN AUTO-MANAGED OFFICIAL FACTS -->';
export const OFFICIAL_FACTS_END = '<!-- END AUTO-MANAGED OFFICIAL FACTS -->';
export const REVIEWED_DATE_PREFIX = 'Checked: ';
export const EVIDENCE_REFRESH_DAYS = 60;

const ALLOWED_CHANGED_FILES = new Set([REFERENCE_PATH, PR_BODY_PATH]);

function fail(message) {
  throw new Error(`OpenAI model review failed closed: ${message}`);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function asNonEmptyString(value, name) {
  if (typeof value !== 'string' || value.trim() === '') fail(`${name} must be a non-empty string`);
  return value;
}

function validateIsoDate(value, name) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(`${name} must be YYYY-MM-DD`);
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    fail(`${name} is not a calendar date`);
  }
  return value;
}

function utcDay(value) {
  const [year, month, day] = validateIsoDate(value, 'date').split('-').map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

export function shouldRefreshEvidence(lastChecked, today) {
  const age = utcDay(today) - utcDay(lastChecked);
  if (age < 0) fail('checked date is in the future');
  return age >= EVIDENCE_REFRESH_DAYS;
}

function isAllowedSource(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && ALLOWED_DOMAINS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function validateSource(url, context) {
  asNonEmptyString(url, context);
  if (!isAllowedSource(url)) fail(`${context} is not HTTPS on the OpenAI allowlist`);
}

function strictSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['verified_facts', 'policy_recommendations'],
    properties: {
      verified_facts: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['claim', 'source_urls'],
          properties: {
            claim: { type: 'string', minLength: 1 },
            source_urls: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string' } },
          },
        },
      },
      policy_recommendations: { type: 'array', items: { type: 'string' } },
    },
  };
}

export function buildReviewRequest(existingFactsBlock) {
  return {
    model: MODEL,
    reasoning: { effort: 'high' },
    tools: [{ type: 'web_search', filters: { allowed_domains: ALLOWED_DOMAINS } }],
    tool_choice: 'required',
    include: ['web_search_call.action.sources'],
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: [
              'Perform a live OpenAI documentation review. Use web search before answering.',
              'Only use https://developers.openai.com and https://platform.openai.com sources.',
              'Return verified official facts separately from local policy recommendations.',
              'Return each official fact as one standalone, single-line plain-text claim.',
              'Every claim must link to one or more source URLs returned by the completed web search.',
              'Do not return Markdown, block delimiters, a replacement block, or a facts-changed decision.',
              'The updater renders the managed block deterministically from validated claim objects.',
              'Put every recommendation, routing preference, and auditability choice in policy_recommendations.',
            ].join('\n'),
          },
        ],
      },
      {
        role: 'user',
        content: [{ type: 'input_text', text: `Current official facts block:\n${existingFactsBlock}` }],
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'openai_model_guidance_review',
        strict: true,
        schema: strictSchema(),
      },
    },
  };
}

function requireExactKeys(object, keys, context) {
  if (!isPlainObject(object)) fail(`${context} is not an object`);
  const actual = Object.keys(object).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    fail(`${context} violates the required schema`);
  }
}

function validateClaim(claim) {
  asNonEmptyString(claim, 'verified fact claim');
  if (claim.trim() !== claim) fail('verified fact claim must not have surrounding whitespace');
  if (/\r|\n/.test(claim)) fail('verified fact claim must be a single line');
  if (/https?:\/\//i.test(claim)) fail('verified fact claim must put links in source_urls');
}

function validatePolicyRecommendation(recommendation) {
  asNonEmptyString(recommendation, 'policy recommendation');
  if (recommendation.trim() !== recommendation || /\r|\n/.test(recommendation)) {
    fail('policy recommendation must be one trimmed line');
  }
}

function escapeMarkdownText(value) {
  return value.replace(/([\\`*_{}\[\]<>])/g, '\\$1');
}

function renderFactLine(fact) {
  const sources = [...fact.source_urls].sort();
  const links = sources.map((source, index) => {
    const label = sources.length === 1 ? 'source' : `source ${index + 1}`;
    return `[${label}](${source})`;
  });
  return `- ${escapeMarkdownText(fact.claim)} (${links.join(', ')})`;
}

export function renderOfficialFactsBlock(facts) {
  return [OFFICIAL_FACTS_START, ...facts.map(renderFactLine), OFFICIAL_FACTS_END].join('\n');
}

function completedSearchSources(response) {
  if (!Array.isArray(response.output)) fail('response output is missing');
  const completed = response.output.filter((item) => item?.type === 'web_search_call' && item.status === 'completed' && item.action?.type === 'search');
  if (completed.length === 0) fail('response has no completed web_search_call with a search action');
  const sources = completed.flatMap((item) => item.action.sources ?? []).map((source) => source?.url);
  if (sources.length === 0) fail('completed web_search_call has no sources');
  for (const source of sources) validateSource(source, 'web search source');
  return new Set(sources);
}

function outputTextOrRefusal(response) {
  if (!Array.isArray(response.output)) fail('response output is missing');
  for (const item of response.output) {
    if (item?.type !== 'message' || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (content?.type === 'refusal' || typeof content?.refusal === 'string') fail('model refused the review');
    }
  }
  for (const item of response.output) {
    if (item?.type !== 'message' || !Array.isArray(item.content)) continue;
    const text = item.content.find((content) => content?.type === 'output_text')?.text;
    if (typeof text === 'string') return text;
  }
  fail('response has no structured output text');
}

function parseAndValidateReview(response) {
  if (!isPlainObject(response)) fail('response body is not an object');
  if (response.status !== 'completed') fail(`response status is ${String(response.status)}`);
  if (response.model !== MODEL) fail(`response used ${String(response.model)}, not ${MODEL}`);
  const searchSources = completedSearchSources(response);
  let output;
  try {
    output = JSON.parse(outputTextOrRefusal(response));
  } catch (error) {
    fail(`structured output is not valid JSON: ${error.message}`);
  }
  requireExactKeys(output, ['verified_facts', 'policy_recommendations'], 'structured output');
  if (!Array.isArray(output.verified_facts) || !Array.isArray(output.policy_recommendations)) {
    fail('structured output violates the required schema');
  }
  if (output.verified_facts.length === 0) fail('structured output has no verified facts');
  const claims = new Set();
  for (const fact of output.verified_facts) {
    requireExactKeys(fact, ['claim', 'source_urls'], 'verified fact');
    validateClaim(fact.claim);
    if (claims.has(fact.claim)) fail('structured output contains a duplicate verified fact claim');
    claims.add(fact.claim);
    if (!Array.isArray(fact.source_urls) || fact.source_urls.length === 0) fail('verified fact has no source linkage');
    const factSources = new Set();
    for (const source of fact.source_urls) {
      validateSource(source, 'verified fact source');
      if (!searchSources.has(source)) fail('verified fact source was not returned by completed web search');
      if (factSources.has(source)) fail('verified fact contains a duplicate source URL');
      factSources.add(source);
    }
  }
  for (const recommendation of output.policy_recommendations) validatePolicyRecommendation(recommendation);
  return output;
}

function extractReferenceParts(reference) {
  const start = reference.indexOf(OFFICIAL_FACTS_START);
  const end = reference.indexOf(OFFICIAL_FACTS_END);
  if (start === -1 || end === -1 || end < start) fail(`reference is missing ordered ${OFFICIAL_FACTS_START}/${OFFICIAL_FACTS_END} delimiters`);
  if (reference.indexOf(OFFICIAL_FACTS_START, start + OFFICIAL_FACTS_START.length) !== -1 || reference.indexOf(OFFICIAL_FACTS_END, end + OFFICIAL_FACTS_END.length) !== -1) {
    fail('reference has duplicate official-facts delimiters');
  }
  const dateExpression = /^Checked: (\d{4}-\d{2}-\d{2})$/gm;
  const dates = [...reference.matchAll(dateExpression)];
  if (dates.length !== 1) fail('reference must have exactly one reviewed-date marker');
  if (dates[0].index > start) fail('reviewed-date marker must appear before the official-facts block');
  const factsEnd = end + OFFICIAL_FACTS_END.length;
  return {
    existingFactsBlock: reference.slice(start, factsEnd),
    lastChecked: validateIsoDate(dates[0][1], 'reference checked date'),
    dateStart: dates[0].index,
    dateEnd: dates[0].index + dates[0][0].length,
    factsStart: start,
    factsEnd,
  };
}

function replaceReference(reference, parts, block, today, replaceFacts) {
  const withFacts = replaceFacts
    ? reference.slice(0, parts.factsStart) + block + reference.slice(parts.factsEnd)
    : reference;
  const dateExpression = /^Checked: \d{4}-\d{2}-\d{2}$/m;
  const marker = `${REVIEWED_DATE_PREFIX}${today}`;
  const result = withFacts.replace(dateExpression, marker);
  if (result === withFacts) fail('could not update reviewed-date marker');
  return result;
}

function renderPrBody(review, today, refreshedEvidence) {
  return [
    '# Automated OpenAI model-guidance review',
    '',
    `Reviewed: ${today}`,
    `Official facts changed: ${review.facts_changed ? 'yes' : 'no'}`,
    `Evidence refreshed: ${refreshedEvidence ? 'yes' : 'no'}`,
    '',
    '## Verified official claims',
    ...review.verified_facts.map(renderFactLine),
    '',
    '## Local policy recommendations',
    ...review.policy_recommendations.map((recommendation) => `- ${escapeMarkdownText(recommendation)}`),
    '',
  ].join('\n');
}

function normalizeChangedPath(file) {
  if (typeof file !== 'string') fail('changed-file list contains a non-string path');
  return file.replace(/^\.\//, '');
}

export function validateChangedFiles(files) {
  if (!Array.isArray(files)) fail('changed-file list is not an array');
  for (const file of files) {
    const normalized = normalizeChangedPath(file);
    if (!ALLOWED_CHANGED_FILES.has(normalized)) fail(`changed file is outside the allowlist: ${file}`);
  }
}

function defaultChangedFiles(rootDir) {
  const stdout = execFileSync('git', ['diff', '--name-only'], { cwd: rootDir, encoding: 'utf8' });
  return stdout.split('\n').filter(Boolean);
}

async function readReference(rootDir) {
  const target = path.resolve(rootDir, REFERENCE_PATH);
  if (!target.startsWith(path.resolve(rootDir) + path.sep)) fail('reference path escaped repository root');
  try {
    return await readFile(target, 'utf8');
  } catch (error) {
    fail(`cannot read ${REFERENCE_PATH}: ${error.code ?? error.message}`);
  }
}

async function writeRepositoryFile(rootDir, relativePath, content) {
  const root = path.resolve(rootDir);
  const target = path.resolve(root, relativePath);
  if (!target.startsWith(root + path.sep)) fail(`write path escaped repository root: ${relativePath}`);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
}

export async function reviewModelGuidance({ rootDir, apiKey, today, fetchImpl = fetch, changedFiles = () => defaultChangedFiles(rootDir) }) {
  if (typeof apiKey !== 'string' || apiKey.trim() === '') fail('OPENAI_API_KEY is missing');
  validateIsoDate(today, 'today');
  validateChangedFiles(changedFiles());
  const reference = await readReference(rootDir);
  const parts = extractReferenceParts(reference);
  let httpResponse;
  try {
    httpResponse = await fetchImpl('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(buildReviewRequest(parts.existingFactsBlock)),
    });
  } catch (error) {
    fail(`network request failed: ${error.message}`);
  }
  if (!httpResponse || !httpResponse.ok) fail(`OpenAI Responses HTTP ${httpResponse?.status ?? 'unknown'}`);
  let response;
  try {
    response = await httpResponse.json();
  } catch (error) {
    fail(`OpenAI Responses JSON parse failed: ${error.message}`);
  }
  const structuredReview = parseAndValidateReview(response);
  const renderedFactsBlock = renderOfficialFactsBlock(structuredReview.verified_facts);
  const factsChanged = renderedFactsBlock !== parts.existingFactsBlock;
  const review = { ...structuredReview, facts_changed: factsChanged };
  const refreshEvidence = shouldRefreshEvidence(parts.lastChecked, today);
  const needsWrite = factsChanged || refreshEvidence;
  if (!needsWrite) return { changedFiles: [], review, refreshEvidence: false };

  const nextReference = replaceReference(reference, parts, renderedFactsBlock, today, factsChanged);
  await writeRepositoryFile(rootDir, REFERENCE_PATH, nextReference);
  await writeRepositoryFile(rootDir, PR_BODY_PATH, renderPrBody(review, today, refreshEvidence));
  const actualChangedFiles = changedFiles();
  validateChangedFiles(actualChangedFiles);
  return { changedFiles: [REFERENCE_PATH, PR_BODY_PATH], review, refreshEvidence };
}

async function main() {
  if (process.argv.includes('--validate-changed-files')) {
    const input = await new Promise((resolve, reject) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => { data += chunk; });
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
    validateChangedFiles(input.split('\n').filter(Boolean));
    return;
  }
  const result = await reviewModelGuidance({
    rootDir: process.cwd(),
    apiKey: process.env.OPENAI_API_KEY,
    today: new Date().toISOString().slice(0, 10),
  });
  process.stdout.write(`${result.changedFiles.length === 0 ? 'No facts changed; evidence is current.' : `Updated ${result.changedFiles.join(', ')}`}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
