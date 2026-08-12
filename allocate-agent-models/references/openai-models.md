# OpenAI model facts

Checked: 2026-08-11

This reference contains provider facts only. The allocation matrix, safety floors, fallback rules,
and failure counts in `SKILL.md` are local starting policy pending representative evaluations.

## Evidence record

The completed research pass checked the direct official pages below. It confirmed model identity
from the model pages and canonical alias destination, then checked the Responses API, web search,
domain filtering, reasoning-effort, and strict structured-output requirements against the API
guides and reference. No benchmark result, community post, search-result snippet, or model-generated
comparison was accepted as an official OpenAI fact.

## Auto-managed official facts

<!-- BEGIN AUTO-MANAGED OFFICIAL FACTS -->
- gpt-5.6 currently aliases gpt-5.6-sol. ([source](https://developers.openai.com/api/docs/models/gpt-5.6-sol))
- The explicit GPT-5.6 model IDs are gpt-5.6-sol, gpt-5.6-terra, and gpt-5.6-luna. ([source 1](https://developers.openai.com/api/docs/models/gpt-5.6-luna), [source 2](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [source 3](https://developers.openai.com/api/docs/models/gpt-5.6-terra))
<!-- END AUTO-MANAGED OFFICIAL FACTS -->

## Direct official sources

- Alias and Sol: https://developers.openai.com/api/docs/models/gpt-5.6-sol
- Terra: https://developers.openai.com/api/docs/models/gpt-5.6-terra
- Luna: https://developers.openai.com/api/docs/models/gpt-5.6-luna
- Responses API create method: https://platform.openai.com/docs/api-reference/responses/create
- Web search and domain filtering:
  https://developers.openai.com/api/docs/guides/tools-web-search
- Structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Reasoning models and effort:
  https://developers.openai.com/api/docs/guides/reasoning

## Claim boundary

The official sources establish names and supported API behavior. They do not establish that one
model-and-effort pair equals another, or that a model is safe for a particular local task. Those
claims require representative local evaluations.

Anthropic routing is outside this reference.
