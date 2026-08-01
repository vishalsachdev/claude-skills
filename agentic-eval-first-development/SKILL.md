---
name: agentic-eval-first-development
description: Architect, execute, and iterate on AI evaluations using the Data-Task-Score framework. Treats evals as the modern, quantifiable version of a PRD. Use when the user asks to "build an eval," "improve model quality," "test an agent workflow," "quantify product intuition," "move beyond vibe checks," "measure AI output," "score LLM responses," "benchmark a prompt," or "set up evaluation infrastructure." Also triggers on phrases like "how do I know if this is working," "is the model getting better," or "eval-driven development."
---

# Agentic Eval-First Development

Evals are infrastructure, not afterthoughts. Define success criteria *before* writing prompts or task logic. The eval becomes the spec.

## Framework: Data → Task → Scores

Every eval has exactly three components:

1. **Data** — Golden dataset of inputs (the test cases)
2. **Task** — The operation being evaluated (LLM call, agent workflow, MCP pipeline)
3. **Scores** — Categorical rubric that maps outputs to normalized 0–1 values

## Step 1: Define the PRD (Data & Scores)

### Build the Golden Dataset

Collect or generate **10–20 representative inputs** covering the full range of expected usage.

- Use a high-reasoning model to autogenerate diverse test cases if manual examples are unavailable
- **Intentionally include inputs expected to fail** — these map current model limitations
- Store as JSON or JSONL for reproducibility. See [references/golden-dataset-template.md](references/golden-dataset-template.md) for the format

### Define the Scoring Rubric

Use **categorical scoring** (Options A/B/C) rather than asking for raw numbers. Raw numeric scores drift across evaluators and models.

- Every score must include a written **rationale** explaining the grade
- All scores normalize to **0–1** for cross-model comparison. See [references/scoring-rubrics.md](references/scoring-rubrics.md) for rubric templates
- Run `scripts/normalize_scores.py` to convert categorical results to normalized values

**Example categorical scorer:**

```
A (1.0) — Fully correct, well-structured, addresses all aspects
B (0.5) — Partially correct or missing key elements
C (0.0) — Incorrect, off-topic, or harmful
```

## Step 2: Configure the Task (The Harness)

The task is the operation under evaluation.

1. **Tool Pruning** — If using MCP, limit available tools to only what's necessary. Models select incorrect tools when overwhelmed with options
2. **System Prompt** — Define initial instructions based on success criteria from Step 1 (e.g., "don't ask clarifying questions," "respond in JSON")
3. **Isolation** — Each eval run must be independent. No shared state between test cases

## Step 3: Execute the Flywheel Loop

```
┌─────────────────────────────────────────┐
│  OFFLINE: Run golden dataset locally    │
│  → Identify gaps → Refine prompt/tools  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  ONLINE: Deploy scorers to production   │
│  → Monitor real user logs               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  CLOSE THE LOOP: Production failures    │
│  → Add back to golden dataset           │
└─────────────────────────────────────────┘
```

1. **Offline iteration** — Run experiments locally against the golden dataset. Iterate on prompts, tools, and model selection until scores stabilize
2. **Online validation** — Deploy scorers to production monitoring real user logs
3. **Close the loop** — When online score (e.g., 0.3) < offline score (e.g., 0.75), identify production failures and add them to the golden dataset

## When to Stop Iterating

- Offline scores plateau across 3+ consecutive runs
- Online/offline gap is < 0.1
- Remaining failures are edge cases outside the product's scope

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| All scores are 0 | Scorer criteria too strict | Do a manual vibe check — if you disagree with the scorer, update the rubric |
| Scores are always 1.0 | Scorer criteria too lenient or test cases too easy | Add adversarial inputs and tighten rubric |
| Online ≪ Offline | Golden dataset doesn't represent real usage | Add production failure cases to dataset |
| Scores vary wildly between runs | Non-deterministic task or scorer | Pin temperature=0, add more specific rubric criteria |

## Key Principle

The eval is the **durable asset**. Models change, prompts evolve, agent frameworks get replaced — but a well-built eval survives all of it. When switching models, re-run the eval; don't re-do the product thinking.
