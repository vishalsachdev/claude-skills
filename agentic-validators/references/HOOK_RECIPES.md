# Hook recipes (Claude Code-style)

> Note: Exact hook configuration differs by agent/IDE. Adapt these patterns to your environment.

## Recipe 1: post-tool-use validate touched file
- Inputs: tool name + file path(s)
- Action: run a validator script with the file path
- Output: non-zero exit on failure so the agent must fix

## Recipe 2: stop hook final gate
Run once on agent stop:
- tests
- build
- lint (repo-wide)

## Recipe 3: logging
Write:
- timestamp
- agent id / session id (if available)
- command run
- pass/fail

Prefer line-oriented logs.
