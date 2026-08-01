---
name: claude-md-template
description: Create or fix a project's CLAUDE.md using a template that bakes in verification guardrails. Use when starting a new project, when a repo has no CLAUDE.md, when an existing one has grown bloated or stale, or when a non-developer needs their project set up so agents behave safely in it. Produces a short, high-signal file plus the guardrails that catch confident-wrong agent output.
---

# CLAUDE.md Template

`CLAUDE.md` is the highest-leverage file in any repo: it shapes how every agent behaves, on
every task, for every person who opens the project. A good one prevents mistakes across
hundreds of sessions. A bloated one gets ignored under context pressure, which is worse than
none because it creates false confidence.

This skill produces a short file that carries only what an agent cannot infer, plus the
verification habits that protect someone who cannot evaluate an agent's output themselves.

## When to use

- Starting a new project
- A repo has no `CLAUDE.md`
- An existing one has drifted past ~60 lines of actionable content, or has gone stale
- Setting up a project for someone who is not a professional developer

## The one principle

Include only what an agent **cannot derive by reading the code**.

An agent can already read the directory tree, infer the framework, and see the types. It
cannot know your Canvas course id, that a deploy needs a flag you learned the hard way, or
that the staging database is the one that matters. Everything you write should fail this
test: *would removing this line cause a mistake?* If not, cut it.

| Include | Exclude |
|---|---|
| Commands that cannot be guessed | Anything discoverable by reading code |
| Env vars, external ids, endpoints | Directory trees, type listings |
| Gotchas that cost hours | Generic framework docs (link instead) |
| Verification commands | Code snippets that go stale |
| Security boundaries | Empty placeholder sections |
| Current focus and next steps | Vague advice like "write clean code" |

## Steps

1. **Check for an existing file.** If one exists, read it and preserve anything
   non-inferable. Never discard hard-won gotchas while restructuring.
2. **Detect the project type** from its files (`package.json`, `pyproject.toml`, mostly
   `.md`, etc.) so the template's commands section fits reality.
3. **Copy `assets/CLAUDE.md.template`** to the repo root as `CLAUDE.md`.
4. **Fill only the sections that have real content.** Delete the rest. An empty
   `## Roadmap` is noise; add it when there is a roadmap.
5. **Verify every command you wrote by running it.** A build command that does not work is
   worse than no build command, because the agent will trust it. This step is not optional.
6. **Add the guardrails section verbatim.** It is the part that protects a non-expert user.
7. **Consider a hook for anything critical.** A rule that lives only in `CLAUDE.md` will be
   skipped in a long session. That is structural, not a discipline problem. If a rule really
   matters, wire it into a hook or a CI gate and reference it from the file.

## Keep it short

Aim for under 60 lines of actionable content. Session logs and roadmaps at the bottom do not
count toward that, since they sit in the part of the context agents attend to least.

When a file outgrows the limit, the culprit is almost never the session log. It is inline
runbooks: deployment steps, architecture notes, troubleshooting. Move each to `docs/<topic>.md`
and leave a five-line summary plus a link. Watch out for repos where `docs/` is the publish
root (a docs site, GitHub Pages) — use `internal/` there instead.

## Maintenance

- Keep only the **single most recent** session-log entry. Older ones go to
  `docs/session-archive.md` or get deleted.
- Add rules **reactively**, after a repeated failure. Not preemptively.
- Delete instructions the agent already follows without being told.
- Re-verify commands periodically. A stale command is a trap, not documentation.

## Common mistakes

- Writing a directory tree an agent can generate itself
- Documenting the happy path but not the gotcha that actually costs time
- Putting a hard requirement in prose instead of a hook, then being surprised it was skipped
- Leaving placeholder sections that make the file look complete
- Copying commands from another project without running them here
