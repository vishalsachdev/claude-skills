# Claude Code Skills Library

A collection of production-ready, reusable Claude Code skills extracted from the [TLDW](https://github.com/vishalsachdev/tldw) project - a production AI-powered YouTube video analysis app with 10K+ lines of code.

## Skills Available

### 🚀 Vibe Coder SDLC
**File**: `vibe-coder-sdlc.md` • **1097 lines**

A flexible SDLC workflow system for developers who want professional practices without rigid processes:
- Orchestrated multi-agent system (orchestrator, git, code-review, project-manager)
- Automatic tech stack detection (Python, TypeScript, Go, Rust, Java, Ruby, PHP)
- Feature branch workflows with automated PR creation
- Intelligent code review with language-specific best practices
- GitHub issues tracking and documentation updates
- Designed for "staying in flow" while maintaining quality

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

## Stats

- **9 skills** covering SDLC workflows, security, async, AI, validation, search, database, state, and setup
- **6,330 lines** of production-ready code and documentation
- **Extracted from** [TLDW](https://github.com/vishalsachdev/tldw) - production app with 10K+ LOC

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

MIT - Feel free to use in your projects!

---

## About

Skills extracted from production applications by [@vishalsachdev](https://github.com/vishalsachdev).

**Source Projects:**
- [TLDW](https://github.com/vishalsachdev/tldw) - AI-powered YouTube video analysis

---

Built with ❤️ for the Claude Code community
