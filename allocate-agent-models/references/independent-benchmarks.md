# Independent benchmarks: secondary evidence

Reference date: 2026-08-11

## Evidence status

LMArena Arena may be used only as secondary evidence. It is never authority for provider identity,
model availability, capability equivalence, or a production routing decision. No Arena score or
rank was imported into the initial allocation policy.

Official provider sources establish current model facts. Representative local evaluations establish
whether a route meets local acceptance criteria. Arena may help choose candidates to evaluate; it
cannot replace either evidence class.

## Required snapshot record

Before citing Arena, record all of the following together:

- Access date and time, with time zone
- Exact leaderboard and snapshot URL, starting from https://lmarena.ai/leaderboard
- Displayed model identifiers and whether they can be mapped unambiguously to provider IDs
- Category, filters, modality, language, and any style-control setting
- Sample or vote count and the population represented
- Rank, score, confidence interval, and tie or overlap information when shown
- Methodology version or methodology page available at the time of the snapshot
- Known exclusions, sampling effects, self-selection, presentation bias, and temporal drift
- A preserved screenshot or archive location when licensing and policy permit it

If any item needed to interpret a number is missing, label the evidence incomplete and do not use it
to justify a route.

## Methodology and uncertainty

Arena preference results reflect the prompts, users, comparisons, filters, and statistical method
present in that snapshot. They do not directly measure repository correctness, tool reliability,
security review, destructive-operation safety, instruction adherence, or performance under local
authority constraints.

Treat small rank differences and overlapping uncertainty as inconclusive. Do not convert a global
preference rank into a local pass rate. Recheck the snapshot when model labels, methodology,
population, or leaderboard categories change.

## Permitted conclusion shape

Use this form:

```text
Secondary evidence observed: <dated Arena snapshot and category>
Uncertainty: <sample, interval, mapping, and methodology limits>
Local implication: <candidate worth evaluating, not an approved route>
Required next step: <representative local evaluation and acceptance threshold>
```

Do not describe Arena as proving that one tier replaces another. Do not let secondary evidence lower
the Sol high safety floor for high-consequence, destructive, security-critical, or weak-oracle work.
