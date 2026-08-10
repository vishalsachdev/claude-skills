---
name: write-article
description: Write newsletter articles for The Hybrid Builder (chatwithgpt.substack.com) with intelligent cross-referencing of the full article archive. Includes sitemap-based article cache with theme indexing, reference suggestions, session transcript export, and cover image generation. Use when asked to write a blog post, article, or newsletter about a collaboration or technical topic.
---

# Write Article for The Hybrid Builder

Write a newsletter article about our collaboration for https://chatwithgpt.substack.com/s/the-hybrid-builder

## Context
- This publication is explicitly stated as AI-written
- Article documents our collaboration on: $ARGUMENTS

## Before Writing: Does this article already exist?

**Run both of these before writing a word.** They are cheap, and skipping them is how you produce a duplicate of something already published.

1. **`--search "<working title>"`, after confirming the cache is fresh.** `--list` prints `Last updated`; if it is more than a few weeks old, run `--full` first. A stale cache silently answers "no such article" for everything published since it was built — it does not warn you.
2. **`ls <repo>/articles/`** in the repo the article narrates. The Substack cache only knows what is *published*. An in-progress draft, a companion piece, or a planned part 2 exists only on disk — and its `README.md`, if present, is the authority on how the material was already split.

If a draft exists, the job is almost never "write it again" — it is to revise that file, or to write the *pending* companion piece. Confirm which with the user before drafting.

> 2026-08-08: skipping both produced a complete duplicate of a piece published the previous day, merged with its unpublished sequel. The narrated repo's `articles/` directory was open in the same session for git-stats collection and was never listed; the cache was four months stale.

## Before Writing: Find Related Articles

**Always check the article archive first.** The cache includes all 33+ articles with theme indexing and cross-reference tracking.

### Article Cache Commands

**Note:** The cache script requires Homebrew Python (`/opt/homebrew/bin/python3`) due to SSL certificate issues with the system Python. The shebang is set correctly, but if you call it with `python3` explicitly, use `/opt/homebrew/bin/python3`. If the cache is stale (check `Last updated` in output), run `--full` to force refresh.

```bash
# Update cache from sitemap (full archive)
python3 ~/.claude/skills/write-article/scripts/update-cache.py

# Get reference suggestions for your topic
python3 ~/.claude/skills/write-article/scripts/update-cache.py --suggest "your topic here"

# List all cached articles
python3 ~/.claude/skills/write-article/scripts/update-cache.py --list

# Browse by theme
python3 ~/.claude/skills/write-article/scripts/update-cache.py --themes

# Find articles related to a specific article
python3 ~/.claude/skills/write-article/scripts/update-cache.py --related "article-slug"

# Search by keyword
python3 ~/.claude/skills/write-article/scripts/update-cache.py --search "compound engineering"
```

### Reference Workflow
1. Run `--suggest "topic"` to get ranked candidates with phrasing suggestions
2. Review the theme index to spot thematic connections
3. For top candidates, use WebFetch to read full content if needed
4. Apply natural reference patterns from [references/reference-patterns.md](references/reference-patterns.md)

## Co-construction mode (when to use)

The default writing mode is "draft, then iterate" — assemble a complete article, surface it, the user reviews and you revise. This works for short-to-medium articles where the user's role is editorial.

**Switch to co-construction mode** when:
- The user explicitly says they want to internalize / learn / build understanding as we go ("I forget what was written if you just deliver", "I want to learn the connections in real time", "co-construct this").
- The article is a position paper, canonical reference, or thesis piece where the user's own articulation matters more than the speed of producing a draft.
- The user is the subject-matter expert; the AI is the writing partner, not the writer.

**Co-construction mechanics:**

1. **One connection at a time.** Surface a single conceptual move, pairing, or section. Pause. Wait for the user to react before continuing.
2. **Show your reasoning, then ask for pushback.** End each surfaced beat with 2–3 specific things to push back on. The user's role is to spot what's wrong; yours is to make it findable.
3. **Let the user steer order.** Don't pre-decide that section 3 comes before section 4. Surface what the user wants to work through next.
4. **Push back yourself when invited.** When the user says "you can push back too" or asks for critique, give an honest critical assessment — even if it means walking back a previous turn. Don't just confirm.
5. **Keep prose tight in each turn.** Each surfaced beat should be readable in under a minute. The user's mental load is the constraint; if a beat takes 5 minutes to read, you've already lost them.
6. **Assemble only at the end.** After all beats are agreed in conversation, *then* commit them to the file as one assembly step — not progressively. The user has been building the article in their head turn-by-turn; the file is the artifact that captures it.

**Counter-indicators — do NOT use co-construction for:**

- Routine newsletter pieces or one-off blog posts where the user just wants a draft to edit.
- Pieces where the user is the audience, not the author.
- Time-constrained drafts ("I need this in 30 minutes").

Co-construction is slower (typically 2–4 hours for a 3,000-word piece vs. 30 minutes for a delivered draft) but produces an artifact the user can defend in their own words because they actually built it.

## Writing Style & Tone
- Conversational technical narrative blending storytelling with technical detail
- First-person collaborative perspective (emphasize the partnership)
- Enthusiastic, exploratory, and optimistic tone
- Transparent about challenges, failures, and iterative process
- High technical specificity with code examples and implementation details
- Meta-narrative about the AI-human collaboration itself

## Structure & Format
- Narrative-driven with chronological progression
- Use clear sections with timestamps/development phases
- Include headers and bullet points for readability
- Typical length: 1500-2500 words
- Always include: context, technical details, lessons learned, future implications

## Natural Cross-Referencing

Avoid mechanical patterns. See [references/reference-patterns.md](references/reference-patterns.md) for natural styles.

**Quick reference:**
| Style | Example |
|-------|---------|
| Callback | "The compound engineering loop kept surfacing..." (no link needed) |
| Context-first | "When I built X, I discovered... [that journey](url) taught me..." |
| Aside | "This approach (which I've been [systematizing](url))..." |
| Thematic echo | Name the concept, link becomes supplementary |

**Themes to watch for:** compound-engineering, skills, mcp, teaching, ai-collaboration, context-engineering, automation, research, microsim

## Entity & Reference Linking

**All named entities in articles must be hyperlinked on first mention.** This includes:

| Entity Type | Link To | Example |
|-------------|---------|---------|
| Research papers | DOI, NBER, or arXiv URL | `[Brynjolfsson et al.](https://www.nber.org/papers/w31161)` |
| Researchers/authors | Personal site or Wikipedia | `[Leon Furze](https://leonfurze.com/)` |
| Institutions | Official website | `[IMSA](https://www.imsa.edu/)` |
| Tools/products | Product homepage | `[Google AI Studio](https://aistudio.google.com/)` |
| Pedagogical frameworks | Wikipedia or canonical source | `[Bloom's taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy)` |
| Shared artifacts | Direct URL (Google Doc, deployed app, etc.) | `[Gallery Walk doc](https://docs.google.com/...)` |
| Hybrid Builder articles | Substack URL (from cache) | `[exploring in my classroom](https://chatwithgpt.substack.com/p/beyond-chatgpt...)` |

**Link source priority (use the highest available):**

| Priority | Source | When to use | Example |
|----------|--------|-------------|---------|
| 1 | **DOI / publisher URL** | Papers, journal articles | `https://doi.org/10.3102/00346543068003249` |
| 2 | **Author's own site** | Researchers, practitioners, blog posts | `https://leonfurze.com/` |
| 3 | **Official project/org site** | Tools, institutions, frameworks with a canonical home | `https://aistudio.google.com/` |
| 4 | **Google Scholar profile** | Researchers without personal sites | `https://scholar.google.com/citations?user=...` |
| 5 | **Semantic Scholar or SSRN** | Papers without DOI | `https://www.semanticscholar.org/paper/...` |
| 6 | **Wikipedia** | ONLY for widely-known concepts where no better canonical source exists (e.g., Bloom's taxonomy) | Last resort |

**Wikipedia is a last resort, not a default.** Before linking to Wikipedia, check: does the author have a personal site? Is there a DOI? Is there a canonical source document? If yes to any, use that instead. For example, link Wiggins' authentic assessment to his published work or `authenticeducation.org`, not to a Wikipedia summary.

**When unsure, use WebSearch** to find the canonical URL for a researcher or framework before falling back to Wikipedia.

**Other rules:**
- Link on **first mention only** -- don't re-link the same entity later in the article
- Prefer DOI links for papers when available (stable, canonical)
- If using Wikipedia, use the most specific article (e.g., `Constructionism_(learning_theory)` not just `Constructionism`)
- Never use bare URLs in body text -- always wrap in descriptive markdown links
- The closing section can re-link key resources (slide deck, gallery doc, newsletter) as a reference block

## Data Sources

**When the article describes a real run, derive every number from the artifact, not from recall.** An article about a build/run/experiment lives or dies on its numbers, and session memory is exactly the wrong source — it rounds, it conflates phases, and it sounds equally confident either way. Pull timings from commit timestamps (`git log --pretty=format:'%h|%ad|%s' --date=format:'%Y-%m-%d %H:%M:%S' <base>..HEAD`), volumes from `--shortstat`, and word counts from `wc -w` on the actual outputs. State the commit range in the article's footer so a reader can re-derive them.

Two corollaries, both learned the hard way (2026-08-05, "Conducting the Conductors"):
- **Anything not derivable gets `[Vishal to confirm]`, never an estimate.** Approval counts, per-agent context consumption, and anything that lived only in a terminal session are gone. A plausible-looking invented number is the one defect a reader can catch and you can't.
- **Cross-check the prose against its own tables before review.** Phase timings must sum to the stated total, and section counts must sum to the stated commit count — mismatches here read as fabrication even when both numbers are individually true.

- Read git history and recent commits in current repo
- Check `/articles/chat-sessions/` for exported session data if available
- Cross-reference conversation context from this session
- Use `aichat search "topic"` to find related past sessions if relevant
- **Run `--suggest` for intelligent reference recommendations**

## Link Verification (Mandatory Before Publishing)

After writing the article and before generating cover images or publishing, verify every link in the markdown file. Links generated from memory or training data are often stale or wrong.

**Steps:**
1. Extract all URLs from the `.md` file
2. For each URL, use `WebFetch` with a simple prompt like `"Return the page title or confirm this URL loads"` — this catches 404s, redirects to error pages, and domain changes
3. For DOI links (`doi.org/...`), verify the DOI resolves (DOIs are stable but typos happen)
4. For Substack article links (from the cache), these are safe — skip verification
5. Report any broken links to the user with suggested replacements before proceeding

**Common failure modes:**
- Author personal sites that moved or expired
- Wikipedia article titles with wrong capitalization or underscores
- GitHub repos that were renamed or deleted
- Substack profile URLs (`substack.com/@handle`) — these change if the author renames

If a link fails, search for the correct URL before asking the user. Fix silently when the correct URL is obvious (e.g., redirect to new domain).

## Editorial Review (Mandatory Before Publishing)

After link verification and before cover images, dispatch an **editorial review subagent** using the Agent tool (`subagent_type: "feature-dev:code-reviewer"` or general-purpose). The subagent reviews the `.md` file and returns findings at three severity levels:

**P0 (fix before publishing):**
- Factual claims without evidence or attribution
- Sections that contradict each other
- Missing byline or broken article structure
- Title/subtitle that don't match the article's actual argument
- Plagiarism risk — passages that are too close to a cited source

**P1 (fix if quick, otherwise flag to user):**
- "So what" failures — a section that doesn't earn its place in the article
- Tone drift — switches from conversational to academic mid-article
- Overlong sections relative to their importance (>25% of article for a supporting point)
- Missing cross-references to prior Hybrid Builder articles (check cache with `--suggest`)
- Weak opening or closing — does the first paragraph hook? Does the last paragraph land?

**P2 (note for user, don't block publishing):**
- Sentences that could be tighter
- Repeated phrases or words in close proximity
- Passive voice in key claims
- Sections that could benefit from a concrete example

**Subagent prompt template:**

```
You are an editorial reviewer for a newsletter called The Hybrid Builder. Review this article for publication readiness.

The article is at: {article_path}

Check for:
1. STRUCTURE: Does every section earn its place? Is the narrative arc clear?
2. EVIDENCE: Are claims supported? Are attributions present for ideas from others?
3. TONE: Conversational technical narrative. First-person. Not academic, not clickbait.
4. HOOKS: Does the opening grab? Does the closing land?
5. LINKS: Are all entity links present on first mention? (researchers, tools, frameworks)
6. LENGTH: Is any section >25% of total word count? If so, does it deserve that weight?
7. CROSS-REFS: Could this article reference prior Hybrid Builder articles for continuity?

Return findings as P0/P1/P2 with specific line references and suggested fixes.
```

**After review:** Fix all P0s. Fix P1s if straightforward. Show P2s to the user. Regenerate the `.html` after any fixes.

## Output
- Create both Markdown (.md) and HTML (.html) versions
- Store in the `articles/` subfolder **of the repo the article narrates** (create if needed) — e.g. a piece about a run in `~/research/orchestration` goes in `~/research/orchestration/articles/`. This keeps the draft version-controlled alongside the work it describes, and is the convention across ~35 repos. `~/code/articles/` is *not* a central archive; it is merely the `articles/` folder of the `~/code` root, and is near-dead.
- Filename format: `YYYY-MM-DD-descriptive-slug`
- HTML version should be publication-ready with basic styling

## Cover Images

Two types of cover images, generated differently:

### Sketch Images (LinkedIn, Twitter)

Generate via OpenAI image API (`gpt-image-1`, size `1536x1024`, quality `high`). Then crop/resize to platform dimensions.

| Platform | Dimensions | Filename |
|----------|------------|----------|
| LinkedIn | 1200×628 | `YYYY-MM-DD-linkedin-1200x628.png` |
| Twitter | 1200×675 | `YYYY-MM-DD-twitter-1200x675.png` |

**Style: RSA Animate sketch.** Prompt guidelines:
- **Background:** Clean white or warm cream (#FAFAF5)
- **Line style:** Black ink, confident loose strokes, hand-drawn whiteboard feel
- **One accent color only:** Red marker (#DC2626) for circled emphasis — or Gies orange (#E84A27) for Illinois-branded articles
- **Composition:** Split-scene or conceptual diagram that visualizes the article's core idea, not just decorates
- **Labels/text in image:** Short (1-3 words), hand-lettered style, not typeset
- **Orientation:** Landscape 16:9
- **What works:** Metaphors (conveyor belts, loops, magnifying glasses), split scenes (before/after, AI/human), stick figures with props
- **What doesn't:** Photorealistic, overly detailed, generic "AI brain" clipart, text-heavy

Generate 3-4 concept variations with different visual metaphors. Let user pick, then crop to platform sizes.

### Banner Image (Substack)

Generate via Python/PIL — purpose-built for the extreme 1100×220 aspect ratio. Do NOT crop from the sketch image.

| Platform | Dimensions | Filename |
|----------|------------|----------|
| Substack | 1100×220 | `YYYY-MM-DD-substack-1100x220.png` |

**Design system:**
- **Background:** Pure white (#FFFFFF) — matches platform page backgrounds
- **Title:** Georgia, 36px, #1A1A1A — left-aligned, up to 2 lines
- **Subtitle/tagline:** Helvetica/system sans, 18px, #888888 — one line below title, summarizing the article's arc
- **Right side:** One small graphic element from the article's visual concept (e.g., a red circle with a keyword, a simple icon). Keep it minimal — this is a filmstrip, not a poster.
- **Optional divider:** Dotted vertical line (#CCCCCC) separating text from graphic
- **Font paths (macOS):** `/System/Library/Fonts/Georgia.ttf`, `/System/Library/Fonts/Helvetica.ttc`

Store all images in `articles/cover-explorations/` during generation. Copy final picks to `articles/` with standard filenames.

## RSA Animate Teaser Video (Optional)

After cover images are generated, ask: **"Would you like an RSA Animate-style teaser video for this article?"**

If yes, invoke `/rsa-animate-video` with the article path. That skill handles the full pipeline: storyboarding, frame generation, narration, Remotion composition, and rendering platform variants (16:9 + 1:1).

## Session Transcript Integration

After writing, ask: "Would you like me to publish this session as a shareable transcript?"

**If yes:**

First, find the current session file (most recent .jsonl for this project):
```bash
# Find the current session file
ls -t ~/.claude/projects/-Users-*-$(basename $(pwd))/*.jsonl 2>/dev/null | head -1
```

Then export using the `json` command (works non-interactively, unlike `local`):
```bash
# Use 'json' command with direct file path - works from Claude Code
uvx claude-code-transcripts json <SESSION_FILE.jsonl> --gist 2>&1 | tee /tmp/transcript-output.txt
```

Add to article:
```markdown
## Session Transcript
This article was written during a live collaboration session.
[View the full conversation](GIST_URL) to see how we built this together.
```

## Publishing to Platforms

After the article is written and reviewed, use the platform-specific publishing skills to automate distribution:

| Skill | Platform | Key Details |
|-------|----------|-------------|
| `/publish-to-substack` | Substack | ProseMirror editor, `execCommand` for title, heading merge fix, section dropdown |
| `/publish-to-linkedin` | LinkedIn | ProseMirror editor, H2→H3 conversion, no X embed auto-render |
| `/publish-to-twitter` | Twitter/X | DraftJS editor, 100-char title limit, ~1000-word condensed version, companion thread |

All three skills use the same **universal paste pattern** (ClipboardEvent with `text/html`) to inject formatted content. Pre-convert all `<table>` HTML to `<ul>` before pasting — tables are stripped on every platform.

**Typical publishing flow after article is ready:**
1. `/publish-to-substack` — full article with title, subtitle, and section
2. `/publish-to-linkedin` — full article (H2 auto-converts to H3, X URLs become `<a href>` links)
3. `/publish-to-twitter` — condensed version (~1000 words) + promotional thread
4. Upload cover images manually on each platform (browser automation can't access local files)

## Instructions

1. **Get reference suggestions**: Run `--suggest "topic"` for the current topic
2. **Gather context**: Read git log, relevant files, session exports
3. **Outline narrative arc** of the collaboration
4. **Ask the user** about specific aspects to emphasize before writing
5. **Write article** with technical depth and conversational tone
6. **Include natural cross-references** (1-3 articles, using patterns from reference guide)
7. Create both .md and .html versions in /articles
8. **Preview**: `open /path/to/article.html`
9. **Create cover images** for all three platforms
10. **Session transcript** (ask user, add if yes)
11. Final review: Confirm all assets are ready
12. **Publish**: Offer to run `/publish-to-substack`, `/publish-to-linkedin`, and `/publish-to-twitter`
