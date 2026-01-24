# Validator design checklist

A good validator is:
- Deterministic (no network, minimal randomness)
- Fast (seconds, not minutes)
- Focused (one responsibility)
- Clear (actionable error messages)
- Idempotent (safe to re-run)

## Minimum recommended set
- formatter
- linter
- unit tests (small subset)
- final gate (repo-wide)
