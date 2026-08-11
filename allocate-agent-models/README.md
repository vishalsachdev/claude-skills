# Allocate Agent Models

An Agent Skills-compatible guide for assigning delegated OpenAI work across GPT-5.6 Sol, Terra,
and Luna without presenting local routing preferences as provider facts.

## Features

- Starts new or unevaluated task classes with an accuracy-first reference
- Keeps Sol high as the conservative floor for dangerous or weakly verified work
- Separates access and tool failures from genuine model failures
- Requires independent review, explicit authority, and auditable model IDs
- Provides concise Herdr coordination safeguards
- Keeps official facts, local policy, and secondary benchmark evidence visibly separate

## Installation

Copy the `allocate-agent-models` directory into the skills directory used by the target agent
runtime. For Codex, the usual user-level destination is `${CODEX_HOME:-$HOME/.codex}/skills/`.
Review any existing copy before replacing it.

This repository copy does not modify a live installation automatically.

## Usage

The skill should activate when a coordinator delegates work or revisits a model route. Example
requests include:

- “Assign models and reasoning effort for these parallel tasks.”
- “Choose a safe fallback after the strongest model became unavailable.”
- “Decide whether this evaluated task can move from Sol to Terra.”
- “Set up independent review and Herdr panes for these workers.”

The resulting allocation record names the task, evidence status, explicit model and effort, safety
floor, fallback, and authority boundary.

## Requirements

- An agent runtime that exposes the requested OpenAI model IDs and effort controls
- Representative local evaluations before adopting lower-cost routes
- `HERDR_ENV=1` only when Herdr orchestration is requested

Model availability can change. Read
[references/openai-models.md](references/openai-models.md) before relying on current provider facts.

## Verification

```yaml
claim: The skill has valid Agent Skills frontmatter and repository layout
verify: python3 skill-creator/scripts/quick_validate.py allocate-agent-models
expect: Skill is valid!
checked: 2026-08-11
```

The command is read-only and was run from the repository root. Provider facts were checked
separately against the dated official sources and method recorded in the reference.

## Sources and evidence

- [OpenAI model facts](references/openai-models.md) records dated official claims and direct URLs.
- [Independent benchmark rules](references/independent-benchmarks.md) defines how secondary
  evidence may be used without treating it as routing authority.

## License

MIT. See [LICENSE.txt](LICENSE.txt).
