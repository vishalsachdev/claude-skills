---
name: start-session
description: Use when user says "let's get started", "where are we", or at beginning of a session. Reads project context from CLAUDE.md, checks git status and recent commits, and provides orientation for the session. Works across all repo types (code, research, mixed).
---

# Session Start

Orient at the beginning of a work session. Execute these steps directly (do NOT spawn a subagent — you have the session context, a subagent does not).

## Steps

### 0a. Am I in Herdr? (do this FIRST — it changes how Step 3 must be run)

```bash
test "${HERDR_ENV:-}" = 1 && echo "IN HERDR" || echo "not in herdr"
```

Most sessions now run inside Herdr. When it reports `IN HERDR`:

1. **Invoke the `herdr` skill** before running any `herdr` command. It carries the ID model, agent lifecycle states, and pane targeting rules.
2. **Check who else is live, and in which directory:**
   ```bash
   herdr agent list   # compare each agent's cwd against this repo's path
   ```
3. **If another agent shares this working tree, do not create branches in it.** Git branches, HEAD and the index are per-*working-tree*, not per-session: two agents in one checkout switch branches under each other, and uncommitted edits ride along onto whichever branch the other session picks. Create a dedicated worktree instead:
   ```bash
   herdr worktree create --cwd <repo> --branch <name> --base origin/main \
       --path <repo>-<purpose> --label <purpose> --no-focus
   ```
   Then address every git command as `git -C <path>` — the Bash tool's cwd resets between calls. Gitignored files (`.env`) do **not** carry into a new worktree; symlink them if the work needs live credentials.

A `SessionStart` hook (`~/.claude/hooks/herdr-session-reminder.sh`) also injects this, but the hook's context can be compacted away mid-session — so run the check here too.

*(Added 2026-08-08 after two Claude sessions ran concurrently in one canvas-mcp checkout: branches moved under each other and an uncommitted `files.py` edit appeared then vanished.)*

### 0b. Read project instructions

Check CLAUDE.md for `## Session Wrap-up`, `## Deployment`, sync commands, or similar sections. Note any sync/pull commands — you'll run them in Step 1.

### 1. Sync from remote

If CLAUDE.md documents a sync or pull command (rsync, git pull, etc.), run it now. If nothing is documented, skip this step.

### 2. Detect repo type

CLAUDE.md is already loaded into conversation context — don't re-read it. Detect repo type from `type:` declaration in CLAUDE.md or infer from contents (package.json = code, mostly .md = research). Only read `agents.md` or `README.md` if CLAUDE.md is missing or lacks project context.

### 3. Check git state

```bash
git fetch --prune 2>/dev/null
git status --short
git branch --show-current
git log --oneline -5
```

After fetching, check if the current branch is behind the remote:

```bash
git rev-list --count HEAD..@{u} 2>/dev/null
```

If behind, note it in the summary so the user can decide whether to pull.

Also list any remote-only branches (excluding main/master) if they exist:

```bash
git branch -r --no-merged HEAD 2>/dev/null | grep -v HEAD | grep -v 'main$' | grep -v 'master$' | head -5
```

Check for forgotten stashes from previous sessions:

```bash
git stash list 2>/dev/null | head -5
```

If stashes exist, list them in the summary so the user can decide whether to pop or drop them.

### 3b. Check worktrees

If the repo uses git worktrees (common for experiment frameworks):

```bash
git worktree list 2>/dev/null
```

If multiple worktrees exist, list them in the summary. This surfaces sibling experiments or feature branches the user may have been working on.

### 4. Check for existing plans

Look for files in `.claude/plans/`. If any exist, list them with a one-line summary. These may represent in-progress work from previous sessions.

### 5. Check for running background processes

Flag any relevant background processes (pm2, nohup jobs, screen sessions, drip campaigns). These may be left over from a previous session or actively running.

### 5b. Check agent-inbox for pending handoffs

Some projects use an `_agent-inbox/` handoff pattern — sandboxed/container agents drop tasks there for the host Claude Code session to execute (things they can't do: deploy, touch host, run pm2, edit .env, etc.).

1. **Locate the inbox.** Check `_agent-inbox/` in the current repo. Also check any related-repo path referenced by CLAUDE.md (e.g., a `## Related Repository` section with a "Local path:" line). Auto-memory may also record an inbox path — use it if the current CLAUDE.md points there.
2. **Pull before listing** so items are fresh: `cd <inbox-repo> && git pull`.
3. **List pending items.** `.md` files directly in `_agent-inbox/` that are NOT in the `done/` subfolder, excluding `README.md` (that's the inbox's own readme, not an instruction).
4. **Surface each pending item** in the orientation with filename + a one-line summary (first heading or first non-empty line). These are tasks waiting for execution.
5. **Do not auto-execute.** Let the user decide whether to process them this session — some may be stale, superseded, or lower priority than the user's current goal.

Completion convention (for when the user chooses to process): move the file to `done/` via `git mv` and commit the move to the inbox repo. Run any deploy command documented in the instruction.

### 5c. Check open GitHub issues & PRs

If the repo has a GitHub remote and `gh` is available, surface open issues and PRs — these are in-progress work that lives on the remote, not in local git state (especially relevant when collaborators/TAs contribute via the issue→PR workflow).

```bash
git remote get-url origin 2>/dev/null | grep -q github.com && gh auth status >/dev/null 2>&1 && {
  echo "=== OPEN ISSUES ==="; gh issue list --state open --limit 30
  echo "=== OPEN PRs ==="; gh pr list --state open --limit 30
}
```

Surface in the orientation:
- **Open PRs** awaiting review (note author + branch). A PR from a collaborator is usually the highest-priority "do this now" item.
- **Open issues**, especially any assigned to others (work in flight) or referenced by an open PR (`Closes #N`).
- **Cross-check the last session log's "Next" items against issue state** — if the log said "confirm issue #N is closed" and #N no longer appears in the open list, note that it was resolved.

Skip silently if there's no GitHub remote or `gh` isn't authenticated.

### 6. Parse roadmap sections

From CLAUDE.md, extract — skip any that don't exist:

- **`## Current Focus`** — Suggested starting point for the session
- **`## Roadmap`** — Count total vs completed items, list next 2-3 incomplete items
- **`## Session Log`** — Most recent entry (what was completed, what was next)

### 6b. Flag stale session log entries

If any session log entries are older than 30 days, flag them for archiving. Suggest the user move old entries to a separate file (e.g., `docs/session-archive.md`) or delete them to keep CLAUDE.md concise.

### 7. Output orientation summary

Provide a structured summary including: project purpose, current branch, uncommitted changes, upstream status, recent commits, current focus, roadmap progress, last session summary, existing plans, and any running background processes.

Adapt for repo type:
- **Code repos** (default): Focus on git state, plans, running services
- **Research repos**: Include document structure, recently edited files, where writing left off
- **Mixed**: Combine both

## Structure checks

After the orientation, note any missing infrastructure as suggestions (don't block on them):

1. **No CLAUDE.md** — Offer to create one with project description, roadmap sections, and current focus placeholder. Ask: "What is this project for? (one sentence)"

2. **CLAUDE.md exists but missing roadmap sections** — Suggest adding `## Current Focus`, `## Roadmap`, and `## Session Log`. These enable progress tracking and `/wrap-up-session` integration.

## Notes

- Pairs with `/wrap-up-session` which writes the same roadmap sections this skill reads
- The skill is a checklist — defer to project CLAUDE.md for project-specific details (sync commands, deploy targets, branch strategy)
- If plans exist in `.claude/plans/`, flag stale ones (>30 days) for cleanup
