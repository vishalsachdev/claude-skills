# Claude Skills Creation Guide

Official guide for creating Claude Code skills based on Anthropic's specifications.

**Source**: [anthropics/skills](https://github.com/anthropics/skills) - Agent Skills Spec v1.0 (October 16, 2025)

---

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [SKILL.md Format](#skillmd-format)
4. [Writing Guidelines](#writing-guidelines)
5. [Best Practices](#best-practices)
6. [Examples](#examples)
7. [Common Mistakes](#common-mistakes)

---

## Overview

A **Claude Skill** is a reusable workflow packaged as a folder containing:
- A `SKILL.md` file (required, all caps)
- Optional scripts, references, and assets

Skills help Claude understand specialized workflows and apply them consistently across projects.

---

## Folder Structure

### Minimum Required Structure

```
your-skill-name/
└── SKILL.md          # Required, all caps
```

### Full Structure (with optional components)

```
your-skill-name/
├── SKILL.md          # Required: Main skill definition
├── scripts/          # Optional: Executable code (Python, JS, etc.)
├── references/       # Optional: Documentation, specs, examples
├── assets/           # Optional: Images, templates, data files
└── LICENSE.txt       # Optional: License information
```

### Naming Convention

- **Folder name**: Must be in `hyphen-case` (e.g., `vibe-coder-sdlc`)
- **SKILL.md**: Must be exactly `SKILL.md` (all caps)
- **Name must match**: The `name` field in frontmatter must match the folder name

---

## SKILL.md Format

### Required Structure

```markdown
---
name: your-skill-name
description: Third-person description of what the skill does and when to use it
---

# Your Skill Title

[Markdown content goes here]
```

### YAML Frontmatter Fields

#### Required Fields

| Field | Description | Format |
|-------|-------------|--------|
| `name` | Skill identifier | `hyphen-case`, must match folder name |
| `description` | What the skill does and when to use it | Third-person, clear and specific |

#### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `license` | License information | `"MIT - See LICENSE.txt"` |
| `allowed-tools` | Pre-approved tools for Claude Code | `["bash", "git", "npm"]` |
| `metadata` | Custom key-value pairs | `author: "Your Name"` |

### Example Frontmatter

```yaml
---
name: secure-api-routes
description: This skill should be used when users want to add comprehensive security middleware to Next.js API routes, including authentication, rate limiting, CSRF protection, and audit logging.
license: MIT - See LICENSE.txt
metadata:
  author: vishalsachdev
  version: 1.0.0
  tech-stack: typescript,nextjs
---
```

---

## Writing Guidelines

### Description Field

**Format**: Third-person perspective

**Good Examples**:
- ✅ "This skill should be used when users want to implement SDLC workflows with automated code review"
- ✅ "Helps developers add secure authentication to Next.js applications"
- ✅ "Creates comprehensive test suites with language-specific best practices"

**Bad Examples**:
- ❌ "Use this skill to..." (second person)
- ❌ "I will help you..." (first person)
- ❌ "Authentication skill" (too vague)

### Markdown Content

Address these three key questions:

1. **Purpose** — What does the skill accomplish?
2. **Usage Triggers** — When should Claude activate this skill?
3. **Execution Details** — How to use bundled resources?

### Imperative Form

Use imperative/infinitive form for instructions:

**Good**:
- ✅ "To add authentication, install the required packages"
- ✅ "Create a middleware file in `lib/auth.ts`"
- ✅ "Run tests before committing"

**Bad**:
- ❌ "You should install packages"
- ❌ "We need to create a file"
- ❌ "It's recommended to run tests"

### Length Limit

- **SKILL.md**: Keep under 5,000 words
- **Long content**: Move detailed docs to `references/` folder
- **Reference from SKILL.md**: Link to reference docs as needed

Example:
```markdown
For detailed API documentation, see [API Reference](references/api-docs.md).
```

---

## Best Practices

### 1. Single Responsibility

Create separate skills for different workflows. Multiple focused skills compose better than one large skill.

**Good**:
- ✅ `secure-api-routes/` - Security middleware
- ✅ `code-review-workflow/` - Code review automation
- ✅ `git-branch-management/` - Git workflows

**Bad**:
- ❌ `full-stack-development/` - Does everything

### 2. Clear Triggers

Claude uses descriptions to decide when to invoke skills. Be specific about when it applies.

**Good**:
```yaml
description: This skill should be used when users want to add JWT authentication to Express.js APIs with refresh token support and role-based access control.
```

**Bad**:
```yaml
description: Authentication skill for web apps.
```

### 3. Include Examples

Add example inputs and outputs in your SKILL.md to help Claude understand what success looks like.

```markdown
## Example Usage

**Input**: "Add user authentication to my Express API"

**Output**:
1. Install dependencies: jsonwebtoken, bcrypt
2. Create auth middleware in `middleware/auth.js`
3. Add login endpoint to `routes/auth.js`
4. Protect routes with authentication
```

### 4. Reference External Resources

For scripts and reference docs:

```markdown
## Implementation

To implement secure password hashing, use the provided script:

```bash
node scripts/setup-auth.js
```

For detailed security considerations, see [Security Best Practices](references/security.md).
```

### 5. Tech Stack Specific

If your skill is language/framework specific, mention it clearly:

```yaml
name: fastapi-api-routes
description: This skill should be used when users want to add comprehensive security middleware to FastAPI applications, including OAuth2, rate limiting, and CORS configuration. Specifically for Python FastAPI projects.
```

---

## Examples

### Example 1: Minimal Skill

**Folder**: `hello-world/`

```
hello-world/
└── SKILL.md
```

**SKILL.md**:
```markdown
---
name: hello-world
description: This skill should be used when users want to create a simple hello world program in any programming language with proper project structure.
---

# Hello World Skill

## Purpose

Creates a hello world program with best practices for the detected language.

## When to Use

Use this skill when:
- User asks to create a hello world program
- Starting a new project and need a simple test
- Teaching programming basics

## How It Works

1. Detect the target programming language
2. Create appropriate project structure
3. Add hello world code with comments
4. Include instructions for running

## Supported Languages

- Python: Creates `hello.py` with virtual environment
- JavaScript: Creates `hello.js` with Node.js setup
- Go: Creates `main.go` with module
- Rust: Creates Cargo project
```

### Example 2: Skill with Scripts

**Folder**: `api-security/`

```
api-security/
├── SKILL.md
├── scripts/
│   ├── setup.sh
│   └── generate-keys.py
└── references/
    └── security-checklist.md
```

**SKILL.md**:
```markdown
---
name: api-security
description: This skill should be used when users want to add comprehensive security to REST APIs including authentication, rate limiting, input validation, and security headers. Supports Express.js, FastAPI, and Django.
license: MIT
---

# API Security Skill

## Purpose

Implements production-ready security for REST APIs.

## When to Use

Use this skill when:
- Building new API endpoints
- Adding security to existing APIs
- Conducting security audit on API code

## Setup

Run the setup script to initialize security configuration:

```bash
bash scripts/setup.sh
```

This will:
1. Generate secure JWT keys
2. Create environment template
3. Set up security middleware structure

## Implementation Steps

[Detailed steps here...]

## Security Checklist

For a complete security review, see [Security Checklist](references/security-checklist.md).
```

### Example 3: Multi-Agent Skill

**Folder**: `sdlc-workflow/`

```
sdlc-workflow/
├── SKILL.md
├── references/
│   ├── git-agent-guide.md
│   ├── review-agent-guide.md
│   └── pm-agent-guide.md
└── assets/
    └── workflow-diagram.png
```

**SKILL.md**:
```markdown
---
name: sdlc-workflow
description: This skill should be used when users want professional SDLC practices with automated git workflows, code review, and project management. Orchestrates multiple specialized agents for feature development, branch management, and GitHub integration.
metadata:
  agents: orchestrator,git-workflow,code-review,project-manager
  tech-stacks: multi-language
---

# SDLC Workflow Skill

## Purpose

Provides a complete SDLC workflow using specialized agents.

## When to Use

Use this skill when:
- Starting a new feature
- Want automatic branch management and PR creation
- Need code review before merging
- Want to track work in GitHub issues

## Agents

This skill uses 4 specialized agents:
- **Orchestrator**: Coordinates the workflow
- **Git Workflow**: Manages branches, commits, PRs
- **Code Review**: Reviews with language-specific checks
- **Project Manager**: Updates docs and issues

For detailed agent instructions, see:
- [Git Agent Guide](references/git-agent-guide.md)
- [Review Agent Guide](references/review-agent-guide.md)
- [PM Agent Guide](references/pm-agent-guide.md)

## Workflow

[Simplified workflow here, with reference to detailed docs]
```

---

## Common Mistakes

### ❌ Wrong: Single File Instead of Folder

```
my-skill.md  ← Wrong! This is not recognized as a skill
```

### ✅ Correct: Folder with SKILL.md

```
my-skill/    ← Correct!
└── SKILL.md
```

---

### ❌ Wrong: Lowercase skill.md

```
my-skill/
└── skill.md  ← Wrong! Must be all caps
```

### ✅ Correct: All Caps SKILL.md

```
my-skill/
└── SKILL.md  ← Correct!
```

---

### ❌ Wrong: Name Mismatch

```
my-cool-skill/
└── SKILL.md
    ---
    name: my_cool_skill  ← Wrong! Doesn't match folder
```

### ✅ Correct: Name Matches Folder

```
my-cool-skill/
└── SKILL.md
    ---
    name: my-cool-skill  ← Correct!
```

---

### ❌ Wrong: Second Person Description

```yaml
description: Use this skill when you want to add authentication
```

### ✅ Correct: Third Person Description

```yaml
description: This skill should be used when users want to add authentication
```

---

### ❌ Wrong: Too Vague

```yaml
name: utils
description: Useful utilities
```

### ✅ Correct: Specific and Clear

```yaml
name: api-error-handling
description: This skill should be used when users want to implement comprehensive error handling for REST APIs with proper HTTP status codes, error messages, and logging. Supports Express.js and FastAPI.
```

---

## Installation Locations

### Project-Specific Skills

```
your-project/
├── .claude/
│   └── skills/
│       ├── project-skill-1/
│       │   └── SKILL.md
│       └── project-skill-2/
│           └── SKILL.md
└── src/
```

Skills in `.claude/skills/` are available when working in that project.

### Global Skills (All Projects)

```
~/.claude/skills/
├── global-skill-1/
│   └── SKILL.md
└── global-skill-2/
    └── SKILL.md
```

Skills in `~/.claude/skills/` are available in all projects.

---

## Quick Reference

### Checklist for Creating a Skill

- [ ] Create folder with hyphen-case name
- [ ] Add `SKILL.md` file (all caps)
- [ ] Include YAML frontmatter with `name` and `description`
- [ ] Ensure `name` matches folder name
- [ ] Write description in third person
- [ ] Address: Purpose, When to Use, How It Works
- [ ] Keep under 5,000 words (move extras to `references/`)
- [ ] Add examples of usage
- [ ] Include scripts in `scripts/` if needed
- [ ] Test in Claude Code

### Template to Copy

```markdown
---
name: your-skill-name
description: This skill should be used when users want to [accomplish specific task]. [Additional context about when it applies].
---

# Your Skill Title

## Purpose

[What this skill accomplishes]

## When to Use

Use this skill when:
- [Trigger 1]
- [Trigger 2]
- [Trigger 3]

## How It Works

[Step-by-step explanation]

## Examples

[Example usage with inputs and outputs]
```

---

## Resources

- **Official Spec**: [Agent Skills Specification v1.0](https://github.com/anthropics/skills/blob/main/agent_skills_spec.md)
- **Official Examples**: [Anthropic Skills Repository](https://github.com/anthropics/skills)
- **Skill Creator**: [skill-creator skill](https://github.com/anthropics/skills/tree/main/skill-creator)
- **Template**: [template-skill](https://github.com/anthropics/skills/tree/main/template-skill)

---

## Version History

- **v1.0** (2025-11-13): Initial guide based on Anthropic Agent Skills Spec v1.0

---

Built for the Claude Code community to create high-quality, reusable skills.
