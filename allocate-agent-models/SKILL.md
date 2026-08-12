---
name: allocate-agent-models
description: Use when delegating OpenAI agent work across GPT-5.6 Sol, Terra, or Luna, especially for new task classes, parallel workers, independent review, model fallback, repeated failures, weak verification, or high-consequence operations.
---

# Allocate Agent Models

Route for accuracy first, then reduce cost or latency only after representative evaluations show
that a smaller model is reliable for that task class.

## Keep facts and policy separate

Read [references/openai-models.md](references/openai-models.md) when current model identity,
availability, or API facts affect a decision.

Verified OpenAI facts as of 2026-08-11:

- `gpt-5.6` currently aliases `gpt-5.6-sol`.
- Sol, Terra, and Luna are distinct models. More reasoning effort changes how a selected model
  works; it does not make Terra equivalent to Sol or Luna equivalent to Terra.

Treat every task matrix, fallback rule, failure count, and default below as **local starting
policy**, not an OpenAI claim. These recommendations remain provisional until representative local
evaluations support them.

## Classify the task

Record these factors before choosing a route:

1. Consequence: informational, reversible, high-consequence, destructive, security-critical, or
   production-affecting.
2. Task shape: deterministic extraction, bounded judgment, broad synthesis, or novel architecture.
3. Scope: isolated seam, connected components, or cross-system work.
4. Ambiguity: explicit procedure, discoverable uncertainty, or unresolved requirements.
5. Verification: strong executable oracle, independent human or agent review, or weak oracle.
6. Evidence: representative local evaluation exists, or the task class is new or unevaluated.

Use the highest-risk factor. Never average a destructive risk down because the edit is small.

## Establish accuracy before down-routing

For a new or unevaluated task class, establish an accuracy reference with `gpt-5.6-sol` at high
effort. Use representative tasks, realistic tools, the same authority limits, and the same success
criteria expected in real work.

Down-route only when measured evidence shows that a cheaper candidate meets the acceptance bar.
Measure substantive correctness and critical misses first; consider latency and cost afterward.
Keep the evidence by task class because success on repository inventory does not validate security
review, migration safety, or architecture.

Re-evaluate after material changes to models, tools, prompts, task distribution, or acceptance
criteria. Use public benchmarks only as secondary evidence under
[references/independent-benchmarks.md](references/independent-benchmarks.md); never substitute them
for representative local evaluations.

## Apply the local starting policy

These allocations are **local recommendations pending representative evaluations**:

Use explicit IDs such as `gpt-5.6-sol` for auditability. This is a local record-keeping policy, not
a provider recommendation or a workaround for an unknown alias.

| Task class | Starting allocation | Condition |
|---|---|---|
| New or unevaluated task class | Sol high | Establish the accuracy reference before testing smaller routes |
| Read-only inventory or exact extraction | Luna low | Boundaries and an exact oracle are present |
| Test execution or evidence collection | Luna low or medium | The expected commands and outputs are known |
| Mechanical edit | Luna medium | A focused regression test or golden output catches errors |
| Routine evaluated feature or bug fix | Terra medium | Local evidence supports this route for the task class |
| Focused evaluated code review | Terra medium | Reviewer independence and a strong oracle are preserved |
| Broad implementation or difficult diagnosis | Sol medium or high | Cross-component judgment or ambiguity dominates |
| High-consequence, destructive, security-critical, or weak-oracle work | Sol high minimum | Do not down-route until representative evaluations justify it |
| Conflicting evidence or repeated substantive failure | Fresh Sol high or xhigh | Reproduce from raw evidence before another change |

Select effort independently from model identity:

| Effort | Local recommendation |
|---|---|
| Low | Exact searches, known commands, and immediate deterministic checks |
| Medium | Evaluated multi-step work with clear requirements and strong verification |
| High | New task classes, subtle debugging, security, destructive operations, or weak oracles |
| Xhigh | Exceptional cross-system ambiguity or conflicting evidence |

Never use higher effort on a smaller model as evidence of equivalence to a larger model. Evaluate
that exact model-and-effort pair.

## Separate environment failure from model failure

Classify a failed attempt before changing the allocation:

- **Environment or tool failure:** authentication, permissions, sandboxing, dependency setup,
  malformed tool input, unavailable service, or broken fixture prevented a fair attempt. Repair the
  environment and retry the same allocation. Do not count it as a substantive model failure.
- **Substantive model failure:** the model had the required access and evidence but made an
  incorrect judgment, missed an interaction, violated a constraint, or produced an invalid result.
  Count it against that evaluated route.
- **Scope change:** the task became broader, riskier, or less verifiable. Reclassify it from scratch.

Preserve the failed output and execution evidence. A retry without a failure classification does
not produce useful routing evidence.

## Use local fallback and escalation rules

These are **local recommendations pending representative evaluations**, not provider guarantees:

1. If Luna is unavailable, use Terra at the same effort and record the substitution.
2. If Terra is unavailable, use Sol at the same effort. Use Luna only for bounded, strongly
   verified work already validated on Luna.
3. If Sol is unavailable, pause high-consequence, destructive, security-critical, weak-oracle, or
   new-task-class work. For evaluated lower-risk work, Terra at high effort may be used only with
   narrower scope and fresh independent review.
4. Never silently substitute a model. State the explicit model ID, effort, reason, and changed
   verification plan.
5. After two substantive failed attempts, use a fresh Sol high or xhigh pass and require root-cause
   analysis before another change.
6. After three substantive failed fixes, stop adding compute, question the approach, and request
   human direction.

Do not increment these counts for environment or tool failures.

## Preserve independent review and authority

- Give each worker exact scope, authority, finishing criteria, and required evidence.
- Keep dependent implementation sequential. Parallelize only independent workstreams.
- Use isolated worktrees when concurrent workers can write.
- Give reviewers requirements, the change, and raw evidence without the implementer's conclusions.
- Use a fresh review session. Do not let the implementer approve its own work.
- Keep the reviewer at the risk-appropriate floor even when implementation was down-routed.
- Keep final synthesis and conflict resolution with the coordinator.
- Never infer broader authority from a stronger model, higher effort, reviewer role, or fallback.

## Orchestrate with Herdr

When Herdr is requested:

1. Verify `HERDR_ENV=1` before issuing Herdr control commands.
2. Create panes only for genuine parallelism. `agent start` requires an existing idle shell pane; it
   does not create the pane.
3. Parse workspace, tab, and pane IDs from command JSON. Do not predict IDs from layout or examples.
4. Use isolated worktrees for concurrent writers and keep dependent writers sequential.
5. Batch-monitor workers at useful checkpoints instead of polling constantly.
6. Inspect `blocked` and `unknown` states before acting; neither is proof of successful completion.
7. Keep coordinator synthesis in the coordinating pane.
8. Close only panes, tabs, worktrees, or other resources created for this task.

## Announce and record the route

Before starting a worker, state:

```text
Task: <bounded assignment>
Evidence: <evaluated task class or new/unevaluated>
Allocation: <explicit model ID>, <effort>
Basis: <local policy factor or measured evaluation>
Safety floor: <risk and verification requirement>
Fallback: <explicit response to unavailability or substantive failure>
Authority: <what this worker may and may not do>
```

Afterward, record environment failures separately from substantive failures and note whether fresh
independent verification passed. Use accumulated results to revise local policy; do not turn an
anecdote into a provider fact.

OpenAI routing is the only implemented scope. Anthropic routing requires a future, separate
reference and its own evidence; do not infer or implement it from this skill.
