---
name: codebase-singularity
description: "Apply the codebase singularity approach: reliable codebase understanding and change with a repeatable workflow, guardrails, and verification gates. Use for repo work (feature, bugfix, refactor, migration) when you need high trust, minimal diffs, and explicit validation and exit criteria."
---

# Codebase Singularity

## Quick start
1. Collect inputs: repo path, goal, constraints, risk tolerance, and validation commands.
2. Summarize: explain repo shape and where the change belongs; ask questions if ambiguous.
3. Plan: write a short plan with success criteria and validation steps.
4. Change: implement the smallest viable patch; avoid unrelated refactors.
5. Validate: run the requested command(s) or the closest available; record results.
6. Wrap up: report changes, evidence, risks, and next steps.

## Inputs
- Repo path and task goal.
- Constraints (files to avoid, time or risk limits, API stability).
- Validation commands (tests, lint, build, or targeted checks).

## Outputs
- Short plan with success criteria.
- Minimal patch.
- Evidence: commands run and results.
- Wrap-up: what changed, why, risks, and next steps.

## Guardrails
- Always validate; if you cannot, say so and propose a safe next step.
- Ask before broad refactors or scope expansion.

## Templates

### Safe bugfix
```
Goal: Fix <bug> with minimal change.
Constraints: Do not modify public API; avoid touching <paths>.
Validation: Run `...` and paste output.
Exit conditions: Stop after 2 failed attempts; summarize hypotheses and logs.
Deliverables: Patch + explanation + risks.
```

### Add a feature
```
Goal: Add <feature>.
Constraints: Keep scope to <module>; no new dependencies.
Validation: Run `...`.
Deliverables: Patch + tests + short doc update.
```

## References
- Read `references/video.md` for a concise source summary.
- Read `references/transcript.md` for full context.
- Read `references/visual-notes.md` for a visual outline.
- Read `references/maturity-ladder.md` for the grades/maturity taxonomy.
