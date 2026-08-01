---
name: wrap-up-session
description: Use when user says "let's wrap up", "close shop", "done for today", or wants to end a session. Handles session wrap-up including git operations, documentation updates, roadmap updates, and preparing for next session. Works across all repo types.
---

# Close Shop

Wrap up a work session. Execute these steps directly (do NOT spawn a subagent — you have the session context, a subagent does not).

## Steps

### 0. Read project wrap-up instructions

Check CLAUDE.md for `## Session Wrap-up`, `## Deployment`, or similar sections. If the project has specific wrap-up steps (sync commands, restart commands, deploy scripts), note them — you'll run them in Step 4.

### 1. Review uncommitted work

```bash
git status --short
git diff --stat
git log --oneline -5
```

If there are uncommitted changes, ask the user what to do:
- **Commit**: Stage and commit with a descriptive message following the repo's existing commit style.
- **Stash**: `git stash push -m "WIP: [description]"` — for work-in-progress not ready to commit. `/start-session` will surface this next time.
- **Leave**: Note the uncommitted files in the session summary as carry-forward.

### 2. Push and update CLAUDE.md

**Push:** After committing, push to the remote branch. Ask the user if unsure which branch.

**Update roadmap sections** — skip if CLAUDE.md lacks these sections:

**`## Session Log`** — Keep only the **1 most recent entry** in CLAUDE.md. Replace (don't append) the existing session log content with today's entry:

```markdown
### YYYY-MM-DD
- Completed: [infer from git commits + conversation context]
- Next: [ask user if unclear]
```

Move any older entries to `docs/session-archive.md`. Create the archive file if it doesn't exist. claude-mem already stores full session history — the session log exists only so `/start-session` can show "last time + next steps."

**`## Roadmap`** — Check off completed items (`- [ ]` → `- [x]`). Infer completions from commits made during the session.

**`## Current Focus`** — Update to the next incomplete roadmap item, or ask the user.

Commit and push the CLAUDE.md update.

### 2b. Memory dedup check

Before writing anything to auto memory (`~/.claude/projects/*/memory/`), check:
1. **Is this already in CLAUDE.md?** If the fact is in the project's CLAUDE.md (architecture, env vars, commands, gotchas), don't duplicate it in auto memory.
2. **Is this a session event?** claude-mem records session observations automatically. Don't save session summaries, completed tasks, or "what we did" to auto memory — that's claude-mem's job.
3. **Only write to auto memory** for: feedback/preferences, external reference pointers, gotchas that wasted hours and aren't in CLAUDE.md, and structured data (schemas, external IDs) that don't fit CLAUDE.md.

If you spot existing auto memory files that duplicate CLAUDE.md content, note them in the session summary so the user can clean up (or run `node ~/.claude/scripts/memory-audit.js`).

### 2bb. Surprising-learnings prompt (lightweight promotion)

Ask the user a single question: **"Any surprising or non-obvious learnings from this session worth lifting into memory?"**

- If **no**: skip.
- If **yes**: draft 1–3 candidate entries with target location (global CLAUDE.md, project CLAUDE.md, or auto memory) and proposed text. Get approval, then write.
- If the user wants a deeper cross-session pattern review (not just today), suggest running `/promote-memory` — that skill mines claude-mem for recurring patterns, "searched twice" items, and cross-project themes. This step only handles *fresh* learnings from the current session.

Keep this lightweight — don't query claude-mem here. Most sessions will answer "no" and that's fine.

### 2c. Check worktrees

If the repo uses git worktrees:

```bash
git worktree list 2>/dev/null
```

If other worktrees have uncommitted changes, note them in the summary so the user is aware.

### 3. Check for running background processes

Flag any background processes started during this session (nohup jobs, pm2 processes, screen sessions, drip campaigns, dev servers). Note any that are still running so the user knows what's active after the session ends.

### 3b. Observability nudge (code projects only)

For `@code` projects that are user-facing (deployed to Vercel/Cloudflare/VPS, real users can hit them), check whether Sentry is wired up:

```bash
grep -q '"@sentry' package.json 2>/dev/null && echo "sentry: yes" || echo "sentry: no"
```

If absent and the project is user-facing, mention it once in the session summary — don't nag every session. Phrase as: "This project doesn't have Sentry; setup runbook at `~/admin/agent-infra/sentry-setup.md` if you want errors visible without SQL forensics."

Skip for: local-only tools, CLI scripts, scratch projects, anything not deployed publicly. Skip for non-`@code` repos entirely.

### 4. Sync / Deploy

Run whatever sync or deploy commands are documented in the project's CLAUDE.md (found in Step 0). Common examples: rsync to VPS, deploy scripts, pm2 restart. If nothing is documented, skip this step.

### 4b. Surface outstanding GitHub issues & PRs

If the repo has a GitHub remote and `gh` is available, list what's still open so the next session (and the `## Session Log` "Next:" line) reflects it:

```bash
git remote get-url origin 2>/dev/null | grep -q github.com && gh auth status >/dev/null 2>&1 && {
  echo "=== OPEN ISSUES ==="; gh issue list --state open --limit 30
  echo "=== OPEN PRs ==="; gh pr list --state open --limit 30
}
```

- Fold open PRs/issues awaiting action into the `## Session Log` "Next:" line so `/start-session` resurfaces them.
- If this session **opened/merged a PR or closed an issue**, reflect that in the "Completed:" line.
- Skip silently if there's no GitHub remote or `gh` isn't authenticated.

### 5. Output session summary

Provide a brief summary: what was done, what's next, any background processes still running, any uncommitted carry-forward files.

### 6. Rename session

Generate a concise session title (3-8 words) that captures the main accomplishment. Format: `[verb] [what]` (e.g., "Deploy Copilot Studio channel", "Fix timezone bug in cron", "Build document extraction pipeline").

**IMPORTANT:** `/rename` is a built-in CLI command that only the user can execute — you cannot invoke it. Output the suggested title and ask the user to run it:

```
Suggested session name: **<title>**
Run: `/rename <title>`
```

## Repo type adaptations

Check CLAUDE.md for `type:` declaration or infer from contents.

- **Code repos** (default): Review git changes, commit, push, update roadmap, sync/deploy.
- **Research/writing repos**: Skip linting/testing. Commit document changes. Note current section for next session.
- **Mixed**: Apply relevant aspects from both.

## Notes

- Pairs with `/start-session` which reads these same roadmap sections
- If roadmap sections are missing, suggest adding them (but don't block the wrap-up)
- The skill is a checklist — defer to project CLAUDE.md for project-specific details (sync targets, deploy commands, branch strategy)
