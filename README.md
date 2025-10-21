# Claude Code Skills Library

A collection of production-ready, reusable Claude Code skills extracted from real-world projects.

## Skills Available

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

## Stats

- **5 skills** covering security, async operations, AI integration, validation, and project setup
- **3,182 lines** of production-ready code and documentation
- **Extracted from** [TLDW](https://github.com/vishalsachdev/tldw) - real production app

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
- Advanced Text Search & Matching (Boyer-Moore, n-gram similarity)
- Supabase Full-Stack Setup (auth, RLS, common patterns)
- Complex State Management (multi-stage loading, command pattern)
- YouTube Video Processing Pipeline
- Citation & Quote System
- Real-time Loading Context

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
