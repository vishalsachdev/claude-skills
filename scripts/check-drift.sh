#!/usr/bin/env bash
# Report drift between this repo's skills and the live install in ~/.claude/skills.
#
# Why this exists: as of 2026-08-01 five skills had silently diverged three ways
# (this repo, the now-archived claude-code-skills, and the live install). The live
# copy was newest in every case, because a live -> repo sync ran once on 2026-01-24
# and then stopped. Nothing detected that for six months.
#
# The live install is treated as UPSTREAM: it is what actually runs, so it is what
# is actually maintained. This repo is the published mirror.
#
# Usage:
#   scripts/check-drift.sh          # report only; exit 1 if drift found
#   scripts/check-drift.sh --pull   # copy live -> repo for drifted skills, then report
#
# Symlinked skills in ~/.claude/skills are skipped: they point at other upstreams
# (~/.agents/skills, ~/.agents/personal-skills) that this repo does not mirror.

set -uo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIVE_DIR="${CLAUDE_SKILLS_LIVE:-$HOME/.claude/skills}"
PULL=0
[[ "${1:-}" == "--pull" ]] && PULL=1

# Build artifacts and macOS cruft are not content; they produced false drift on
# skill-creator (only .pyc files differed) during the 2026-08-01 consolidation.
IGNORE=('.DS_Store' '__pycache__' '*.pyc')
DIFF_EXCLUDES=(); RSYNC_EXCLUDES=()
for pat in "${IGNORE[@]}"; do
  DIFF_EXCLUDES+=(--exclude="$pat")
  RSYNC_EXCLUDES+=(--exclude="$pat")
done

if [[ ! -d "$LIVE_DIR" ]]; then
  echo "No live skills dir at $LIVE_DIR — nothing to compare." >&2
  exit 0
fi

drifted=()
only_live=()
shared=0

for skill_md in "$REPO_DIR"/*/SKILL.md; do
  [[ -e "$skill_md" ]] || continue
  name="$(basename "$(dirname "$skill_md")")"
  live="$LIVE_DIR/$name"

  [[ -d "$live" ]] || continue          # repo-only: published but not installed, fine
  [[ -L "$live" ]] && continue          # symlink: different upstream, not ours to mirror

  shared=$((shared + 1))
  if ! diff -rq "${DIFF_EXCLUDES[@]}" "$live" "$REPO_DIR/$name" >/dev/null 2>&1; then
    drifted+=("$name")
    if [[ $PULL -eq 1 ]]; then
      rsync -a --delete "${RSYNC_EXCLUDES[@]}" "$live/" "$REPO_DIR/$name/"
    fi
  fi
done

# Installed, non-symlinked, but never published here.
for live in "$LIVE_DIR"/*/; do
  name="$(basename "$live")"
  [[ -L "${live%/}" ]] && continue
  [[ -e "$live/SKILL.md" ]] || continue
  [[ -d "$REPO_DIR/$name" ]] || only_live+=("$name")
done

echo "Compared $shared shared skill(s) against $LIVE_DIR"

# The spec requires SKILL.md. macOS is case-insensitive, so a lowercase skill.md
# works locally and breaks on Linux; rsync from live silently reintroduces it.
# 11 live skills carried lowercase names on 2026-08-01.
badcase="$(cd "$REPO_DIR" && git ls-files 2>/dev/null | grep -E '(^|/)skill\.md$' || true)"
if [[ -n "$badcase" ]]; then
  echo "FILENAME CASE — must be SKILL.md, not skill.md:"
  printf '  %s\n' $badcase
  bad_case_found=1
fi

if [[ ${#drifted[@]} -gt 0 ]]; then
  if [[ $PULL -eq 1 ]]; then
    echo "Pulled ${#drifted[@]} drifted skill(s) from live:"
  else
    echo "DRIFT — ${#drifted[@]} skill(s) differ from the live install:"
  fi
  printf '  %s\n' "${drifted[@]}"
fi

if [[ ${#only_live[@]} -gt 0 ]]; then
  echo "Installed locally but not published here (${#only_live[@]}) — publish or ignore:"
  printf '  %s\n' "${only_live[@]}"
fi

if [[ ${#drifted[@]} -eq 0 && -z "${bad_case_found:-}" ]]; then
  echo "No drift."
  exit 0
fi

if [[ ${#drifted[@]} -eq 0 ]]; then
  exit 1   # casing only
fi

if [[ $PULL -eq 1 ]]; then
  echo
  echo "Review with 'git diff', then commit."
  exit 0
fi

echo
echo "Resolve with: scripts/check-drift.sh --pull"
exit 1
