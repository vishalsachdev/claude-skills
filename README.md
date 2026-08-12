# Claude Code Skills Library

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Compatible-blue?style=flat&logo=anthropic)](https://agentskills.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A component store of production-ready, reusable Claude Code skills, following the
[Agent Skills](https://agentskills.io) open specification. Entries are tiered by failure mode and
each one carries a verification command — see [CONTRIBUTING.md](CONTRIBUTING.md) for the rules that
govern what gets in.

Several skills were originally extracted from [TLDW](https://github.com/vishalsachdev/tldw), a
production AI-powered YouTube video analysis app.

> **Consolidation note (2026-08-01):** this repository absorbed
> `vishalsachdev/claude-code-skills`, which is now archived. Everything that lived there — skills,
> `skill-specs/`, `releases/`, and the authoring mechanics guide — is here.

> **Attribution note:** Some skills in this repository were originally contributed or inspired by
> other authors in the broader Claude Code community. I've collected and refined them over time
> across many machines and sessions, and I've lost the traceability needed to credit individual
> contributors. If you recognize a skill as yours or derived from your work, please open an issue
> and I'll happily add attribution. Skills I authored myself are noted in their frontmatter.

## Skills Available

### 📋 CLAUDE.md Template
**Folder**: `claude-md-template/` • **SKILL.md + template asset**

Creates or repairs a project's `CLAUDE.md` - the highest-leverage file in any repo, since it
shapes how every agent behaves on every task:
- Template carrying only non-inferable knowledge (commands, env vars, external ids, gotchas)
- Verification guardrails baked in, to catch confident-wrong agent output
- 60-line discipline, with guidance on where bloat actually comes from
- Maintenance rules: reactive additions, single session-log entry, periodic command re-verification

**Use when**: Starting a project, a repo has no CLAUDE.md, an existing one has bloated or gone
stale, or setting up a project for someone who is not a professional developer

See also: [CONTRIBUTING.md](CONTRIBUTING.md) for how entries in this library are tiered and verified.

---

### 🔌 LLM Client Golden Path
**Folder**: `llm-client-golden-path/` • **SKILL.md + model registry**

The correct shape for wiring an LLM client (OpenAI, Azure OpenAI, Anthropic, Gemini), plus
the failure modes worth knowing before you hit them:
- Key sourcing, client placement (handler not module scope), env-overridable model pins
- The silent trap: reasoning models spend the output budget on thinking, returning empty output with no error
- `max_tokens` vs `max_completion_tokens`; why `openai/gpt-5-mini` is correct under LiteLLM
- Shared [model registry](llm-client-golden-path/references/model-registry.md) so model ids live in one place, with verification commands for Azure availability, price, and SKU choice

**Use when**: Adding AI calls to a project, choosing which model to pin, debugging empty output
or token/parameter errors, or auditing existing LLM integrations

---

### 🚢 VPS Deploy Golden Path
**Folder**: `vps-deploy-golden-path/` • **SKILL.md + deploy.sh template**

A deploy script that cannot report success while the app is down:
- Step order as the design (lockfile discard → reset --hard → ci → migrate → build → restart → health check → sentinel)
- Build-before-restart, because restarting first ships a stale `dist/` that looks deployed
- Retrying health check: one attempt gives false failures, zero gives false successes
- Sentinel last and success-path only, so a silent failure becomes a noticed one
- Drift checklist for scripts already copied from an older template (safety steps get dropped silently; local additions survive)

**Use when**: Setting up VPS deployment, a deploy shipped stale code or wedged on a git conflict,
a deploy reported success while the app was down, or auditing an inherited deploy script

---

### 🚀 Vibe Coder SDLC
**Folder**: `vibe-coder-sdlc/` • **SKILL.md + 4 agent references**

A flexible SDLC workflow system for developers who want professional practices without rigid processes:
- Orchestrated multi-agent system (orchestrator, git, code-review, project-manager)
- Automatic tech stack detection (Python, TypeScript, Go, Rust, Java, Ruby, PHP)
- Feature branch workflows with automated PR creation
- Intelligent code review with language-specific best practices
- GitHub issues tracking and documentation updates
- Designed for "staying in flow" while maintaining quality

**Structure**: Main SKILL.md with 4 specialized agent definitions in `references/`

**Use when**: Starting features, managing git workflows, wanting code review, tracking work in GitHub issues

---

### 🔒 Secure Next.js API Routes
**File**: `secure-nextjs-api-routes.md` • **671 lines**

Comprehensive security middleware system for Next.js 13+ App Router:
- Authentication & authorization
- Rate limiting (Supabase-backed)
- CSRF protection (double-submit cookie)
- Audit logging & security headers
- Input validation & body size limits

**Use when**: Building secure Next.js APIs

---

### ⚡ Resilient Async Operations
**File**: `resilient-async-operations.md` • **586 lines**

Production patterns for handling async operations without memory leaks:
- AbortManager for automatic cleanup
- Go-style error handling (safePromise)
- Background operations that don't crash UI
- Timeout support & retry logic
- React hooks integration

**Use when**: Building React apps with API calls, preventing memory leaks

---

### 🤖 AI Model Cascade
**File**: `ai-model-cascade.md` • **673 lines**

Gemini integration with automatic fallback and structured output:
- Model cascade (lite → flash → pro)
- Zod schema → LLM format conversion
- Retry logic for rate limits/overloads
- Token tracking & cost optimization
- Smart/fast mode selection

**Use when**: Integrating AI/LLM APIs with type-safe responses

---

### ✅ Type-Safe Form Validation
**File**: `type-safe-form-validation.md` • **859 lines**

Comprehensive Zod validation patterns for forms and APIs:
- Client & server validation
- React Hook Form integration
- Automatic TypeScript type inference
- Complex nested object validation
- User-friendly error formatting

**Use when**: Building forms, validating API requests/responses

---

### 🎯 Setup Project Skills (Meta-Skill)
**File**: `setup-project-skills.md` • **393 lines**

Automate adding skills to new projects:
- One-command installation from GitHub
- Platform-specific setup (phone, laptop, bot)
- Update existing skills
- Project template generation

**Use when**: Starting new projects or adding skills

---

### 🔍 Advanced Text Search & Matching
**File**: `advanced-text-search-matching.md` • **821 lines**

High-performance text search for large documents:
- Boyer-Moore search algorithm (O(n/m) complexity)
- N-gram similarity for fuzzy matching
- Multi-strategy matching (exact → normalized → fuzzy)
- Document indexing with word and n-gram maps
- Character-precise highlighting for citations

**Use when**: Building search, citation systems, or finding text with typos

---

### 🗄️ Supabase Full-Stack Setup
**File**: `supabase-fullstack-setup.md` • **618 lines**

Complete Supabase integration for Next.js:
- Server and browser client setup
- Authentication with social providers (Google, GitHub)
- Row Level Security (RLS) patterns
- Real-time subscriptions
- Database schemas and migrations
- Common CRUD patterns

**Use when**: Starting new Next.js project with Supabase backend

---

### 🎛️ Complex State Management
**File**: `complex-state-management.md` • **411 lines**

React state patterns without external libraries:
- Multi-stage loading with progress tracking
- Command pattern for centralized control
- Ref-based optimization to avoid re-renders
- Memoized setters for performance
- Parallel state updates and batching
- Custom hooks for complex logic

**Use when**: Building complex UIs without Redux/Zustand

---

### 🏛️ LLM Council
**Folder**: `llm-council/` • **SKILL.md**

Convenes a 3-model council (Claude + GPT via `codex` CLI + Gemini CLI) on a high-stakes decision,
forcing cross-critique between members so real disagreement surfaces instead of default agreement.

**Use when**: Architecture, strategy, hiring, or pricing calls where being wrong is expensive.
Skip for factual questions and anything premortem-shaped

---

### 🔮 Premortem
**Folder**: `premortem/` • **SKILL.md**

Assumes the plan already failed six months out and works backward through every reason why, then
produces a revised plan.

**Use when**: A concrete plan or commitment needs stress-testing. Not for vague ideas, or decisions
already irreversible

---

### 📊 Agentic Eval-First Development
**Folder**: `agentic-eval-first-development/` • **SKILL.md + 3 references**

Architect, execute, and iterate on AI evaluations via the Data-Task-Score framework, treating evals
as the quantifiable form of a PRD.

**Use when**: Moving past vibe checks — building an eval, scoring LLM output, benchmarking a prompt,
or answering "is the model actually getting better?"

---

### 🧭 Allocate Agent Models
**Folder**: `allocate-agent-models/` • **SKILL.md + 2 references**

Choose auditable OpenAI model and reasoning-effort routes for delegated work while keeping provider
facts separate from local starting policy. Starts new task classes with accuracy evidence, preserves
a Sol high safety floor for dangerous or weakly verified work, and defines independent review,
failure classification, fallback, and Herdr coordination guardrails.

**Use when**: Delegating work across GPT-5.6 Sol, Terra, or Luna, evaluating a lower-cost route,
handling model unavailability or repeated failures, or coordinating parallel agents

---

### 🐦 Tweet Series Extractor
**Folder**: `tweet-series-extractor/` • **SKILL.md**

Extracts tweet series from X/Twitter profiles with full content, embedded links, and engagement
metrics preserved. Requires Chrome browser automation.

**Use when**: Analyzing an author's recurring tweet format, or collecting a series from a seed URL

---

### 🏛️ FormBuilder Admin
**Folder**: `formbuilder-admin/` • **SKILL.md + 6 references**

Create, edit, and manage forms in the University of Illinois ATLAS FormBuilder Admin application —
questions and sections, event sessions, payment line items and CFOAPAL codes, workflow phases and
conditional routing triggers.

**Use when**: Working with Illinois FormBuilder. Institution-specific

---

### 📝 Paper Writing
**Folder**: `paper-writing/` • **SKILL.md + 4 reference guides (~69KB)**

Academic and research paper guidance across the whole arc — planning, structure, revision, final
polish — covering journal articles, conference papers (ACM/IEEE), technical reports, thesis
chapters, and literature reviews. Includes Thatcher's 17 Rules for elite IS papers.

**Use when**: Writing or revising any academic paper

---

### 🎯 Codebase Singularity
**Folder**: `codebase-singularity/` • **SKILL.md + references**

**Use when**: Consolidating a sprawling codebase toward a single coherent structure

---

### ✅ Agentic Validators
**Folder**: `agentic-validators/` • **SKILL.md + references**

Design and install validation hooks for coding agents — post-tool-use and stop hooks, automated
tests/linters/formatters, parallel subagents with per-file validation, and audit logs. This is the
top tier of the store's own doctrine: enforcement that survives context pressure.

**Use when**: Making agent changes safer and more deterministic than prose rules can

---

### 🔄 Start / Wrap-Up Session
**Folders**: `start-session/`, `wrap-up-session/` • **SKILL.md each**

Bookend a work session. `start-session` orients — syncs from remote, reads git and worktree state,
surfaces plans, background processes, agent-inbox handoffs, and open GitHub issues/PRs, then parses
roadmap sections from CLAUDE.md. `wrap-up-session` closes — reviews uncommitted work, updates the
session log and roadmap, runs a memory dedup check, nudges on observability gaps, and surfaces
outstanding issues.

**Use when**: Session start ("where are we") and session end ("let's wrap up")

---

## Stats

- **66 skills** spanning SDLC workflows, security, async, AI, validation, search, database, state,
  teaching and course design, research writing, deployment golden paths, and session workflow
- **Official format**: Following the [Agent Skills](https://agentskills.io) open specification
- **Folder-based skills**: Proper SKILL.md format with references for long content
- **~53,000 lines** of documentation across 246 markdown files
- **Sources**: [TLDW](https://github.com/vishalsachdev/tldw) (production app, 10K+ LOC), the
  archived `claude-code-skills` repo, and the broader community (see attribution note above)

Counts verified 2026-08-11:
```bash
find . -name SKILL.md -not -path './.git/*' | wc -l    # 66
find . -name '*.md'   -not -path './.git/*' | wc -l    # 246
```

---

## Creating Your Own Skills

Want to create your own Claude skills? See **[SKILL_CREATION_GUIDE.md](SKILL_CREATION_GUIDE.md)** for the official format and best practices based on Anthropic's Agent Skills Spec v1.0.

---

## How to Use These Skills

### Option 1: Copy into Your Project (Recommended)

```bash
# In your project root
mkdir -p .claude/skills

# Copy the skill
curl -o .claude/skills/secure-nextjs-api-routes.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/secure-nextjs-api-routes.md

# Commit to your repo
git add .claude/skills
git commit -m "Add secure API routes skill"
```

### Option 2: Add All Skills

```bash
mkdir -p .claude/skills && cd .claude/skills && \
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents | \
grep 'download_url.*\.md"' | cut -d'"' -f4 | xargs -n1 curl -sLO
```

### Option 3: Git Submodule (Advanced)

```bash
git submodule add https://github.com/vishalsachdev/claude-skills.git .claude/skills
git commit -m "Add Claude skills as submodule"
```

### Option 4: Reference Directly

When chatting with Claude Code:
```
"Use the Secure Next.js API Routes skill from github.com/vishalsachdev/claude-skills"
```

---

## Using Skills Across Platforms

### 📱 On Phone (Claude Code App)
- Skills in `.claude/skills/` are automatically available
- Works when repo is open in Claude Code

### 💻 On Laptop (Claude Code Desktop)
- Same as phone - skills in repo's `.claude/skills/` directory
- Synced via git

### 🤖 With GitHub Bot
- Bot can access skills in the repo
- Tag: `@claude use the secure-nextjs-api-routes skill`
- Or reference this repo directly

---

## Contributing New Skills

Found a great pattern in your projects? Add it here!

1. Fork this repo
2. Add your skill as a `.md` file
3. Update this README
4. Submit a PR

### Skill Template

```markdown
# Skill Name

Description of what the skill does.

## When to use this skill
- Use case 1
- Use case 2

## Implementation Steps
Step-by-step guide...

## Usage Examples
Code examples...

## Best Practices
Tips and gotchas...
```

---

## Roadmap

**Potential Future Skills:**
- YouTube Video Processing Pipeline
- Citation & Quote System with Highlighting
- Real-time Loading Context with Progress
- GitHub Actions Workflows for CI/CD
- Error Boundary Patterns
- Accessibility (a11y) Best Practices

---

## License

MIT — see [LICENSE](LICENSE). Feel free to use in your projects.

---

## About

Skills extracted from production applications by [@vishalsachdev](https://github.com/vishalsachdev).

**Source Projects:**
- [TLDW](https://github.com/vishalsachdev/tldw) - AI-powered YouTube video analysis

---

Built with ❤️ for the Claude Code community
