---
name: premortem
description: Run a premortem on a plan, launch, product, hire, strategy, or decision — assumes it failed 6 months from now and works backward to find every reason why, then produces a revised plan. Use when the user has a concrete plan or commitment with high cost-of-being-wrong and asks to "premortem", "stress test", "find blind spots", "poke holes", "what could kill this", or "what am I missing". Skip for vague ideas without a plan, simple feedback requests, factual questions, or already-irreversible decisions.
allowed-tools: Read, Glob, Grep, Write, Bash, Agent
---

# Premortem

Imagine the plan already failed. Work backward to find why. Based on Gary Klein's HBR method — the "this is dead, explain how it died" frame produces more specific, honest failure modes than "what could go wrong?".

This breaks Claude's default agreeableness: instead of looking for reasons the plan works, you're explaining how it fell apart.

---

## When to run

**Good targets:** product/feature launches, pricing changes, hires, strategy pivots, partnerships, any commitment where being wrong is expensive.

**Bad targets:** vague ideas (help plan first), factual questions (just answer), draft feedback (that's editing), already-irreversible decisions.

If the user wants multiple perspectives on a current decision rather than failure analysis, suggest a different tool — premortems specifically simulate post-failure hindsight.

---

## Step 1 — Gather minimum context

You need three things before running:

1. **What is it?** — describable in one sentence
2. **Who is it for / who does it affect?**
3. **What does success look like?** — failure is success inverted

**Scan first, ask second.** Check the conversation, then run at most 2-3 `Glob`/`Read` calls for: `CLAUDE.md`, `memory/` folders, files the user referenced, related project briefs.

If something's missing, ask one focused question at a time. Don't interrogate — infer when you can.

---

## Step 2 — Set the frame explicitly

Once context is sufficient, say plainly:

> "It's 6 months from now. [The plan] has failed. We're looking back to understand what went wrong."

This framing is the mechanism. Don't skip it.

---

## Step 3 — Generate failure reasons

Produce a comprehensive list of genuine failure reasons. Each:
- Specific to this plan (not generic)
- Grounded in details the user provided
- A real threat (not a minor edge case)

State each in 1-2 sentences. The number is whatever's real — could be 3, could be 9. Don't pad. Don't truncate.

---

## Step 4 — Deep-dive agents in parallel

Spawn one agent per failure reason **in a single message with multiple Agent tool calls** so they run concurrently. Each agent investigates one failure independently.

**Agent prompt template** (substitute the bracketed sections before sending):

```
You are an investigator in a premortem. You've been assigned one specific failure to analyze.

THE PLAN:
[what it is, who it's for, success criteria, relevant workspace context]

FRAME: It is 6 months from now. This plan has failed.

YOUR ASSIGNED FAILURE: [the specific failure reason from step 3]

Write the story of how this specific failure played out. Be concrete. Use details from the plan.

Output (under 300 words total):

1. THE FAILURE STORY — 2-3 paragraph narrative of how it played out, naming specific moments where things went wrong.
2. THE UNDERLYING ASSUMPTION — the one thing the user took for granted that made this failure possible. One sentence.
3. EARLY WARNING SIGNS — 1-2 concrete, observable signals the user could watch for. Things you can see or measure, not vague feelings.

Be direct. Don't hedge. Don't sugarcoat.
```

---

## Step 5 — Synthesis

Read every deep-dive and produce:

1. **Most Likely Failure** — most probable given what you know. Why.
2. **Most Dangerous Failure** — worst damage if it happened, even if less likely.
3. **The Hidden Assumption** — the single biggest thing the user is taking for granted. Often where the real value lives.
4. **The Revised Plan** — concrete changes mapped to specific failure modes. Not "consider your pricing" — "test pricing at $X with 20 people before committing publicly."
5. **Pre-Launch Checklist** — 3-5 things to verify, test, or put in place before executing. Each prevents or detects one failure mode.

---

## Step 6 — Generate report

Save two files to the current working directory (confirm with the user if CWD looks wrong, e.g., a system path):

- `premortem-report-YYYYMMDD-HHMMSS.html` — visual report
- `premortem-transcript-YYYYMMDD-HHMMSS.md` — full transcript (gathered context, raw failure list, all agent deep-dives, synthesis)

Use a real timestamp from `date +%Y%m%d-%H%M%S`.

**HTML design:**
- Single self-contained file with inline CSS
- Dark background (e.g., `#0a0e1a`), clean typography, scannable
- Synthesis section (most likely / most dangerous / hidden assumption / revised plan / checklist) at the top — most users read this first
- One card per failure reason below: header, failure story, underlying assumption, early warning signs. Distinct accent colors per card.
- Footer with timestamp and what was premortemed

After writing, open the HTML report:

```
open premortem-report-YYYYMMDD-HHMMSS.html
```

(macOS. On Linux, use `xdg-open`.)

---

## Step 7 — Chat summary

In the chat, give a 3-sentence summary: most likely failure, hidden assumption, single most important plan revision. The HTML has the rest.

## Step 8 — Offer to chain

After the summary, offer one line: "Want me to convene the LLM council on the revised plan to pressure-test whether the revisions are right?" Skip the offer if the revised plan is trivially small or the user signaled closure.

---

## Principles

- **Always parallel.** All failure agents in one message. Sequential leaks earlier reasoning into later analysis.
- **Always set the frame.** "Already failed, explain why" is the psychological mechanism. Without it you get polite risk assessment.
- **Comprehensive, not padded.** Find every real failure. Don't stop at 3 if there are 7. Don't force 7 if there are 3.
- **The synthesis is the product.** Most users skim the cards and read the synthesis. Make it specific and actionable.
- **Don't sugarcoat.** Tell the user what they don't want to hear before reality does.
- **Concrete revisions only.** Every revised-plan item should be something the user can do this week.
- **Respect the context threshold.** One more question beats a generic premortem.
