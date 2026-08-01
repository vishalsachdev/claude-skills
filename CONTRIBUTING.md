# Contributing to the component store

This library exists so people do not rediscover the same mistakes. It is not a code
library, and the distinction matters.

## The premise

AI agents write most of the code here, models improve every month, and many contributors
are not professional developers. Three consequences follow:

1. **Implementations get cheap.** Regenerating a working device-code flow or an API client
   costs little and gets better over time. Freezing that code into a shared package locks
   you at today's model quality and creates a maintenance burden nobody asked for.
2. **Constraints do not get cheap.** No model can derive that your tenant needs a custom
   subdomain, that a `.` never matches `\r` in a Graph payload, or that Outlook's desktop
   app silently desyncs. Those cost a live failure to learn. They are the durable payload.
3. **Confident-wrong output is the real hazard.** A better model produces a larger, more
   plausible structure on a false premise, faster. A contributor who cannot evaluate the
   output will act on it.

So the rule is:

> **Freeze the constraints. Regenerate the implementation.**

You are not preventing reinvention. Reinvention is nearly free. You are preventing
**re-mistaking**.

## The five tiers

Pick the cheapest tier that works. Promote only on evidence.

| Tier | Use when | What you write |
|---|---|---|
| **Pointer** | Default. Churning substrate, few consumers, or a repo you do not own | A link to live code plus the gotchas that will bite the reader |
| **Verified fact** | An environment truth or experiment outcome | A claim, a command that checks it, the expected result |
| **Decision record** | An architectural choice worth not re-litigating | The choice, the rationale, and what would make you revisit it |
| **Spec anchored to live code** | High per-use variation; the invariants are the value | The invariants, plus the repo that demonstrates them |
| **Extracted code** | Rare. The failure mode is *silent* and the substrate is stable | An actual reviewed, tested module |

### Choosing a tier

Ask three questions, in order:

1. **What happens when it is wrong?** Silent-wrong (auth, identity matching, authorization,
   anything that returns a confident bad answer instead of crashing) is the only case that
   justifies extracted code. Loud-wrong (a build fails, a deploy errors) needs at most a
   template. The failure teaches the user.
2. **How fast does the underlying thing churn?** A stable protocol can be frozen. A
   fast-moving SDK cannot: freezing guarantees drift, so point at live code that updates
   itself.
3. **How much must each use differ?** Same every time favors code. Deliberately different
   every time favors a spec, because adaptation is the point.

Complexity is deliberately absent from that list. A complex-but-stable-and-dangerous thing
wants code. A simple-but-churning thing wants a pointer.

### Promotion, not prediction

Start everything as a pointer. Promote to a spec when a second consumer adapts it. Promote
to extracted code when a third appears **and** the failure mode is silent. Never extract on
the theory that it will be reused. An abstraction with two consumers costs more than it
saves.

## Every entry carries a verification command

This is the rule that keeps the store honest, and it is not optional.

Code has a test suite, so when the world moves it goes red. Prose does not. A stale entry
confidently instructs an agent to do the wrong thing and nothing catches it. Since agents
are cheap, make staleness detectable instead of silent:

```yaml
claim:  Cognitive Services user_impersonation needs only user consent, not admin consent
verify: az ad sp show --id 7d312290-28c8-473c-a0ed-8e53749b6d6d \
          --query "oauth2PermissionScopes[?value=='user_impersonation'].type"
expect: ["User"]
checked: 2026-08-01
```

Requirements:

- A verification command is **executable and non-destructive**. It reads state; it never
  changes it.
- If a claim cannot be verified by a command, say so explicitly and give it a review date.
  An unverifiable claim is allowed; an unverifiable claim pretending to be checked is not.
- An entry whose verification has not run in 90 days is stale. Treat a stale entry as
  unproven, not as true.

## Writing for agents, not just humans

The primary reader is an agent acting on behalf of someone who may not catch a mistake.
Therefore:

- **State the failure mode, not just the happy path.** "This is how it breaks" is worth more
  than "this is how it works," because the model can already derive the latter.
- **Name what you verified and how.** "Confirmed by running X" beats "X is true." A claim
  without provenance gets treated as a guess.
- **Never assert absence without a stated search scope.** "Not found in repos A, B, C" is a
  finding. "Does not exist" is a liability.
- **Give exact values** (ids, paths, flags). Approximations force rediscovery, which is the
  thing this store exists to prevent.

## Guardrails beat components

For contributors who cannot evaluate an agent's output, enforcement matters more than
reusable parts. Ranked by what actually protects them:

1. **Hooks and CI gates** — deterministic, survive context pressure, cannot be skipped
2. **Verified facts** — unknowable a priori, now auto-checkable
3. **Decision records** — prevent inconsistent re-derivation across sessions
4. **Templates and golden paths** — start correct instead of debugging into correctness
5. **Extracted code** — last resort, silent-wrong cases only

A rule that lives only in prose *will* be skipped in a long session. That is structural, not
a discipline problem. If a rule matters, wire it into a hook or a CI gate.

## Before you submit

- [ ] Chosen the cheapest tier that works, with a stated reason
- [ ] Verification command included, run, and dated (or unverifiability declared)
- [ ] Failure modes documented, not only the happy path
- [ ] Claims cite how they were checked
- [ ] No secret values in the text (name the kind and location instead)
- [ ] If extracting code: stated why the failure mode is silent

## Mechanics

This document decides *what* earns a place in the store and at *which tier*. For the mechanical
side — directory layout, `SKILL.md` frontmatter requirements, packaging a `.skill` file, and the
pull-request steps — see [docs/skill-authoring-mechanics.md](docs/skill-authoring-mechanics.md).

Skills here follow the [Agent Skills](https://agentskills.io) open specification.

### Keeping the store honest

The live install at `~/.claude/skills` is **upstream** — it is what actually runs, so it is what
actually gets maintained. This repo is the published mirror, and it drifts silently: on
2026-08-01, 11 of 19 shared skills had diverged, every stale copy frozen at the same abandoned
`2026-01-24` auto-sync commit that nobody noticed had stopped.

Prose did not catch that for six months, so this is a script:

```bash
scripts/check-drift.sh          # exit 1 on drift or bad filename case
scripts/check-drift.sh --pull   # take live for drifted skills, then review with git diff
```

Run it before publishing. It also enforces `SKILL.md` casing — macOS is case-insensitive, so a
lowercase `skill.md` passes locally and breaks on Linux.
