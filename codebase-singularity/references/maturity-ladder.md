# Grades (maturity ladder)

Moved out of SKILL.md (2026-08-10 unhobbling pass) — background taxonomy, not workflow.

## Grade 1: Prime only
- Prime, summarize, and stop on ambiguity.

## Grade 2: Specialized roles + verification
- Add role prompts (e.g., test_writer, docs_fetcher, reviewer).
- Require a verification step for each role.

## Grade 3: Tooling expansion
- Declare required tools or services and expected outputs.
- Prefer tools over guessing (e.g., query schema instead of inferring).

## Grade 4: Closed-loop autonomy
- Run cycles: request -> validate -> resolve.
- Add hard exits: max iterations, evidence of progress, stop after repeated failures.
