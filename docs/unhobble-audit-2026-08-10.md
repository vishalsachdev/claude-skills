# Unhobbling audit — 2026-08-10

Full-coverage audit of the live skill install (`~/.claude/skills/`, the upstream per
`scripts/check-drift.sh`) against Anthropic's "unhobble for stronger models" guidance:
remove scaffolding written for weaker models (micro-prescription, think-harder ceremony,
defensive duplication, stale hard-coded values) while preserving incident-derived rules,
safety gates, and tool-quirk workarounds.

**Scope:** all 75 non-symlinked skills with a SKILL.md. Symlinked skills
(`~/.agents/skills/*`, `~/.agents/personal-skills/*`) and plugin-cache skills were not
touched — different upstreams. Only 19 of the 75 are mirrored in this repo; the other
56 are live-only, so their edits exist only in `~/.claude/skills/` (see "Publish
backlog" below).

**Result: 37 trimmed, 30 untouched, 8 flagged for human judgment. Net 12,543 bytes
removed from SKILL.md files** (12.5 KB of always-loaded-on-trigger context).

Categories: (a) stale model reference/limit, (b) micro-prescription/ceremony,
(c) defensive duplication, (d) verified-stale hard-coded value, (e) bloat moved to references/.

## Trimmed (37)

| Skill | Δ bytes | What was cut |
|---|---|---|
| paper-writing | -4,842 | (b/e) Community-imported skill: removed Common Pitfalls, Tips for Success, three example dialogues, Progressive Enhancement, Visualization section — all restating its own references/ files or generic human-writer advice. Kept Conversation-First, workflow, checklist. |
| skill-creator | -996 | (b/c/e) narrow-bridge analogy, "don't ask too many questions" coaching, "follow steps in order" (each step has its own skip clause), Pattern 3 (restated Pattern 1), obvious scripts note. NOTE: diverges from Anthropic upstream copy. |
| sentry-cli | -622 | (c) 4 Key Principles bullets duplicated verbatim by Common Mistakes / Design Principles. Safety Rules kept. |
| codebase-singularity | -591 | (b/c/e) "Prime: list files, read README" step; "Keep diffs small" (dup of step 4); Grades ladder moved to `references/maturity-ladder.md` (new file). |
| remotion-to-hyperframes | -510 | (c) "Do NOT use when" block (third copy of frontmatter scope fence) and reading-discipline nag. Kept NOT SUPPORTED, lint blockers, SSIM thresholds. |
| anywidget-generator | -485 | (c) Best Practices items 2-4 duplicated the opening paragraph verbatim. **Also fixed a real bug: example contained `createElement("b8utton")` — typo copied into generated widgets.** |
| web-perf | -374 | (b/c) "Copy this checklist" progress block (phases carry the structure), "Be assertive", "Skip non-issues" (dup of Quantify impact). |
| workers-best-practices | -364 | (c/b) 2nd+4th restatements of retrieval-first, "Read full files" step. |
| moving-rainbow | -321 | (c) "When to Use This Skill" section restating frontmatter (skill-creator's own rule). |
| hyperframes-creative | -313 | (c/b) sentence restating the blockquote directive above it; "don't read every reference" nag. |
| wrangler | -254 | (c) retrieval-first restatement; Best Practice #5 "update compatibility_date quarterly" (duplicated AND contradicted the earlier "within 30 days" guidance). |
| hyperframes-keyframes | -249 | (c/b) "Done" section (verbatim dup of Procedure step 4 + CLI Proof); 5-step remediation ceremony collapsed to one line keeping "trust painted pixels over logs". |
| openai-api | -204 | (c) prompt-caching bullet duplicating the dedicated Prompt Caching section. |
| auto-paper-demo | -195 | (b) "I cannot stress enough… You should really ultra think this" and "Feel free to think about this decision" — canonical think-harder ceremony. |
| implement-paper-auto | -195 | Same cuts (file is byte-identical to auto-paper-demo — see flags). |
| cloudflare-email-service | -175 | (c) opening paragraph was a verbatim duplicate of the next paragraph (kept the copy with the 2025-launch context). |
| cloudflare | -174 | (c) third restatement of prefer-retrieval. |
| marimo-batch | -172 | (b) "verify with the user before making them" stacked on "ask the user which…"; "confirm yes/no" ritual; inline columns warning (dedicated Columns section kept). |
| write-article | -167 | (c) Note restating the inline "works non-interactively, unlike `local`" comment. |
| promote-memory | -167 | (c) 2 anti-pattern bullets duplicating the NOT-promotable list (§4) and §5 Dedup check. |
| llm-council | -166 | (c) chairman-conflict sentence (Round-3 self-bias check states it better); "Don't retry more than once" retry ceremony. Dated field notes kept. |
| learning-design-review | -118 | (c/b) duplicate "always cite principle IDs" (kept the Step 3 copy); "Focus on actionable suggestions" tone coaching. |
| jupyter-to-marimo | -117 | (b) token-budget justification paragraph and shouty caps; the convert-first instruction itself kept. |
| granola | -115 | (b) "500+ entries → be thorough" exhortation. Encryption banner and JSON-via-file rule kept. |
| publish-to-twitter | -108 | (c/b) third statement of the 100-char title limit (Inputs table is canonical); "count chars carefully". |
| codex-review | -106 | (d) dead fallback path `~/.nvm/.../v22.14.0/bin/codex` → verified `/opt/homebrew/bin/codex`; (a) note about the retired `--approval-mode=never -q` pattern. |
| marimo-notebook | -94 | (b) "you have a tendency to over-do underscore prefixes" model-quirk framing → neutral style rule; (d) `__generated_with "0.20.4"` → 0.23.16 (installed version). |
| media-use | -72 | (b) "The human usually can't tell which media would lift the piece. You can." motivational framing. |
| impact-stats | -66 | (c) bot-traffic parenthetical (Notes bullet says it better with numbers). |
| implement-paper | -57 | (b) "Only move on once you have a clear picture"; typo fix ("you will an" → "you will have an"); (d) link case `references/ANYWIDGET.md` → actual `anywidget.md` (breaks on Linux). |
| canvas-course-audit | -57 | (d) stale MCP tool names: `list_discussions` → `list_discussion_topics`, `list_files` → `list_course_files` (verified against live canvas-mcp tool list); graceful-degradation handholding. |
| tweet-series-extractor | -50 | (d) five one-per-line ToolSearch calls → one batched comma-separated select (contradicted current claude-in-chrome guidance). |
| hyperframes | -37 | (c) "never leave a bumped pin unverified" (verify step already prescribed). Kept "act on the signal" autonomy policy. |
| meeting-prep | -26 | (c) inline acceptance-status codes (Notes entry is more complete, has code 7). |
| hyperframes-core | -22 | (b) "Read the files first." Kept the snapshot-inspection and black-frame rules. |
| streamlit-to-marimo | +3 | (d) broken cross-reference `marimo-anywidget` skill → `anywidget-generator` (no such skill existed). |
| publish-to-linkedin | +35 | (d) Key Differences row was wrong on BOTH columns (claimed execCommand for Substack, click+type for LinkedIn — contradicted by both skills' own Feb 2026 native-value-setter steps). Corrected, not deleted. |

## Untouched (30)

blog-from-podio, email-triage, weekly-review, meeting-debrief, profile-stakeholders,
start-session, wrap-up-session, premortem, cloudflare-one, cloudflare-one-migrations,
durable-objects, agents-sdk, vercel-react-best-practices (verified: 47 rule files match
its claim), remotion-best-practices, wasm-compatibility, add-molab-badge,
hyperframes-animation, hyperframes-cli, hyperframes-registry, canvas-assignment-design,
canvas-feedback-template, learning-design-checklist, agentic-eval-first-development,
agentic-validators, check-deployments, delegate-issue, herdr-crew, ship, worktree-pr,
rsa-animate-video.

These are dense domain content, safety gates around irreversible actions, or dated
incident memory. Notable deliberate keeps: check-deployments' read-only-by-default
rule, ship/worktree-pr git safety blocks, herdr-crew's dated 2026-08-05 scan-cycle
observations, profile-stakeholders' subagent write-ban, premortem's parallel-agents
rationale.

## Flagged for human judgment (8)

1. **codex-review — auto-deploy without approval.** "Fix them immediately (don't ask)"
   plus "Deploy the fix if already deployed (rsync + restart)". Conflicts with
   ship/delegate-issue approval policy. Recommend requiring approval for the deploy
   step. Disproof/context: your own multi-bot-review policy says verify bot findings
   before acting.
2. **refresh-msbai-dashboard — plaintext credential.** Dashboard password `giesmsba`
   sits in the SKILL.md. Not hobbling; credential hygiene call.
3. **tldraw-canvas — entire transport is dead.** `/Users/vishal/code/tldraw` is now a
   Vite+Worker app: no `start.sh`, no `mcp-server/index.js`, no :3333/:3334 bridge.
   The whole skill workflow is unrunnable as written. Rewrite or retire — too large a
   call to make unilaterally.
4. **auto-paper-demo ≡ implement-paper-auto.** Byte-identical apart from frontmatter.
   Consolidate to one (or make one a stub pointing at the other).
5. **openai-api — money-adjacent staleness.** "ALWAYS use `gpt-5.4`… current flagship"
   and the pricing table "(cached: 2026-03-05)" are 5 months old. Verify against the
   live API before refreshing; billing decisions ride on it.
6. **granola — ~4 KB of dead extraction code.** The 2026-06-11 encryption banner says
   Steps 1-3 no longer work, but they remain inline (they're also the rewiring
   reference). Suggest moving to `references/legacy-cache-extraction.md` when you do
   the TODO rewire.
7. **publish-to-linkedin — heading-merge regex.** Step 7's `/([.!?])([A-Z][^.]+:)/`
   pattern is documented in publish-to-substack (2026-08-08) as silently fixing zero
   headings. Needs the known-headings rewrite, not a deletion.
8. **learning-design-pillars/** — not a skill (no SKILL.md); it's the data repo the
   four Canvas/learning skills read from. Its top-level `learning-design-pillars.json`
   is a stray duplicate of `principles/learning-design-pillars.json`.

## Publish backlog (pre-existing, unchanged)

`check-drift.sh` reports 56 live skills never published to this repo. Their unhobbling
edits live only in the live install. Publish or explicitly ignore per skill; this audit
did not add them to the repo.

## Verification notes

- Every (d) staleness cut was verified against the filesystem or live tool list before
  editing (codex path via `which codex`; canvas tool names against the live MCP tool
  roster; marimo version via installed CLI; tldraw repo contents; references/ casing
  via `ls`).
- No incident-dated rule ("(2026-xx-xx, …)") was removed anywhere.
- All 9 repo-mirrored trimmed skills synced live → repo via `scripts/check-drift.sh
  --pull` (live is upstream). Pre-existing drift in start-session, wrap-up-session,
  write-article was pulled as its own prior commit.
