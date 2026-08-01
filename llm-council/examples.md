# LLM Council — Planning Doc

Status: not yet built. This is the design sketch. When ready to ship, convert to `skill.md`.

---

## Premise

Three frontier model families, one decision. The output is **not** three answers — it's a structured map of where they agree, where they disagree, and which disagreements actually matter. Run when the cost of being wrong is high and you suspect Claude alone is too agreeable.

## Why this is different from "ask three times"

| Failure mode of naive council | What this skill must do |
|---|---|
| Three answers shown side-by-side, user picks one | Force a synthesis pass that names the deltas |
| Models converge on the same hedged take | Round 2: each model sees the others' answers and is asked where they're wrong |
| Synthesis muddles disagreement into mush | Synthesis must preserve the strongest minority view |
| Used for trivial questions | Hard gate: only run when the user signals high stakes |

## Members

| Member | CLI | Role bias to lean into |
|---|---|---|
| Claude (current session) | n/a — this agent | Pragmatic synthesis, code-rooted reasoning |
| GPT (Codex) | `codex` at `/opt/homebrew/bin/codex` | Skeptical, hedge-prone, good at finding edge cases |
| Gemini | `gemini` at `/opt/homebrew/bin/gemini` | Structural, taxonomical, good at categorization |

## When to trigger

**Good fit:**
- Architecture or design decisions with long-lived consequences
- Strategic calls (pricing, positioning, hiring) where Claude's agreeableness is a real risk
- Reviewing a plan where you want adversarial perspectives, not failure modes (that's premortem's job)
- "Am I thinking about this right?" — when the user wants to challenge their framing, not their plan

**Bad fit:**
- Factual lookups (just answer)
- Code questions with one right answer
- Premortem-shaped requests ("what could go wrong" — route to premortem skill)
- Anything where the user wants speed, not depth

## Mechanism (3 rounds)

**Round 1 — Independent answers.** Send the question to GPT and Gemini via their CLIs in parallel. Claude (this session) drafts its own answer in parallel. Each member answers without seeing the others.

**Round 2 — Cross-critique.** Send each member the other two answers. Prompt: "Here are two other models' answers to the same question. Where are they wrong? Where are they right and you were wrong? Be specific. Don't be polite." This is the round that produces the value.

**Round 3 — Synthesis.** Claude synthesizes:
1. **Where the council agrees** (1-3 points)
2. **Where the council disagrees** (the actual deltas, with each side's strongest argument)
3. **Which disagreement matters most** for this user's decision
4. **Recommendation** — Claude's call, with explicit acknowledgment of which member it's siding with and why

## Output

- Chat: 4-section synthesis above. Concise.
- File: `council-[timestamp].md` in CWD with full transcript (R1 answers, R2 critiques, R3 synthesis). Optional — only if the user asks or the question is consequential enough to want a record.

## CLI invocation notes

**Codex** (non-interactive):
```
codex exec "<prompt>"
```
Returns to stdout. Test: `codex exec "say hi in 5 words"`.

**Gemini** (non-interactive — note: defaults to interactive, must use `-p`):
```
gemini -p "<prompt>"
```
Or pipe via stdin: `echo "<prompt>" | gemini -p ""`. Add `-m <model>` to pin a specific model. Test: `gemini -p "say hi in 5 words"`.

Both calls should be wrapped with timeouts (60s) and error handling — if a member fails, proceed with two and note the missing voice in the synthesis. Run them in parallel via background shells and `wait`, or via two simultaneous Bash tool calls.

## Anti-patterns to avoid

- **Pretending disagreement when there isn't any.** If all three converge, say so plainly. Manufactured drama is worse than agreement.
- **Treating each member as equally credible on every topic.** Claude knows the codebase context this session. GPT and Gemini are getting cold prompts. Weight accordingly in synthesis.
- **Running the council on every question.** The skill should be hard-gated. If the user asks something simple, just answer.
- **Burying the recommendation.** End with a clear call. "On balance, I'd go with X because Y" — not "all three perspectives have merit."

## Open design questions (resolve before building)

1. Should round 2 be optional? (faster path: skip critique, just synthesize raw answers — cheaper but defeats the purpose)
2. How to pass conversation context to the cold CLIs? (probably: the skill builds a self-contained prompt with relevant context attached, since `codex exec` and `gemini` won't see this conversation)
3. Token budget per member — cap response length so synthesis stays tractable?
4. Where does this live relative to `premortem`? (Premortem = post-failure hindsight on a plan. Council = multi-perspective on a current decision. They're complementary, not overlapping. Cross-reference both ways.)

## Verdict on value-add

Worth building **if** you commit to the round-2 critique step. Without it, this is just `claude | tee >(codex) >(gemini)` and not worth a skill. With it, this fills a real gap: a structured way to break Claude's agreeableness on high-stakes calls using genuinely different model families, not just different prompts to the same model.
