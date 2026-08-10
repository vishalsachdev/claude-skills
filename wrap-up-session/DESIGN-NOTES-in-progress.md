# Deferred design: making changes comprehensible (started 2026-08-08)

Brainstorm paused mid-flight to fix a shipped bug. Resume from here — do NOT
restart the discovery, these two answers are already settled.

## The ask (user, verbatim intent)

Sessions produce many changes driven by external bug reports and feature
requests, across canvas-mcp and other repos. The user often lacks a mental
model of what was done. Wants:

1. Repo-level comprehension of a session's changes — where they sit in the
   overall system, possibly a diagram.
2. A per-change explainer focused on the mental model of the specific change.
3. Meta-learning about *how they work with Claude* lifted into global memory,
   so it can be written up and shared with other audiences ("I need to
   document and share how I use you").

## Settled answer 1 — when the gap is felt

**All four**: returning to the repo later, judging work in the moment,
explaining to others, and deciding what's next.

Interpretation: the problem is not a missing document. The reasoning behind
changes is invisible by default, so the gap surfaces everywhere.

## Settled answer 2 — scope split

Split "judge in the moment" out of the wrap-up work.

Rationale: the wrap-up skill runs after everything is merged, so it cannot
help the user object to a change before it lands. That need is a
**during-session narration rule** (output style / CLAUDE.md): state the mental
model and the risk before a non-trivial change, not after.

The wrap-up artifact therefore serves the three retrospective needs only.

## Open questions (next question was going to be about these)

- Granularity and home of the repo-level view: ephemeral terminal output, a
  committed doc, or a published Artifact? "Share how I use you" pulls toward
  something publishable; "returning to the repo later" pulls toward in-repo.
  These may be two outputs, not one.
- Diagram: what is being drawn — subsystem map with the session's changes
  highlighted, or a before/after of the system's shape? Mermaid renders
  natively in Artifacts and in GitHub markdown.
- Ask 3 partly exists already: step 2bb prompts for surprising learnings, and
  `/promote-memory` mines claude-mem cross-session. The gap is that neither
  targets *meta*-learning about working with Claude, nor formats it for
  reuse in writing. Likely an upgrade to 2bb plus a distinct memory type,
  not a new mechanism.
- Cost control: this runs every wrap-up. Needs a cheap default with an opt-in
  deep mode, or it will be skipped under context pressure.

## Related context

- Global CLAUDE.md rule: "A rule that lives only in CLAUDE.md will get skipped
  under context pressure — this is structural. If a rule matters, wire a hook
  or CI gate." Applies to the narration rule in particular.
- The user writes The Hybrid Builder newsletter (`/write-article`), which is
  the likely destination for the shared meta-learning.
