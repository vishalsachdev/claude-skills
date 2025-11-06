---
name: claude-infrastructure-showcase
description: Enterprise-ready infrastructure patterns for Claude Code including auto-activating skills, specialized agents, hooks system, and modular skill architecture. Extracted from 6 months of production TypeScript microservices development. Use when scaling Claude Code for complex projects, needing automatic skill activation, or building enterprise development workflows.
---

# Claude Code Infrastructure Showcase

A comprehensive infrastructure system for Claude Code that solves the fundamental problem: **"Skills just sit there. You have to remember to use them."**

This skill provides production-tested patterns extracted from 6 months of real-world TypeScript microservices development, including auto-activating skills, specialized agents, hooks system, and modular skill architecture.

## When to use this skill

- Scaling Claude Code for enterprise or complex projects
- Need automatic skill activation based on context
- Managing multiple specialized development workflows
- Building production-ready development infrastructure
- Working with large codebases that exceed context limits
- Implementing consistent development patterns across teams
- Need specialized agents for code review, refactoring, debugging

## What this skill provides

This infrastructure system includes:

1. **Auto-Activating Skills System** - Skills that suggest themselves based on context
2. **10 Specialized Agents** - Pre-built agents for common development tasks
3. **6 Production Hooks** - Automation triggers for workflow enhancement
4. **Modular Skill Architecture** - 500-line rule with progressive disclosure
5. **Dev Documentation System** - Context-reset-resistant documentation patterns
6. **3 Slash Commands** - Utilities for documentation and research

## Important: This is a Reference Library

**NOT a plug-and-play solution.** The infrastructure requires customization for your:
- Project structure (monorepo vs. single app)
- Tech stack (frontend/backend frameworks)
- Service names and paths
- Team workflows

Integration typically takes **15-30 minutes** starting with essential hooks and one relevant skill.

## Core Components Overview

### 1. Auto-Activating Skills (5 Modular Skills)

Following a 500-line rule to avoid context limits, each skill uses progressive disclosure:

**Available Skills:**
- `backend-dev-guidelines` - Backend development patterns (Node.js/Express/Prisma)
- `frontend-dev-guidelines` - Frontend patterns (React 18+/MUI v7/TanStack)
- `skill-developer` - Meta-skill for creating new skills (tech-agnostic)
- `route-tester` - API route testing patterns (tech-agnostic)
- `error-tracking` - Error monitoring and tracking (tech-agnostic)

**Modular Structure:**
```
.claude/skills/
├── skill-rules.json              # Auto-activation rules
├── backend-dev-guidelines/
│   ├── main.md                   # Core skill (under 500 lines)
│   └── resources/                # Supplementary docs loaded on-demand
├── skill-developer/
│   ├── main.md
│   └── resources/
└── ...
```

### 2. Specialized Agents (10 Pre-Built)

Copy and use immediately for complex tasks:

**Available Agents:**
- `code-architecture-reviewer.md` - Analyze and review code architecture
- `code-refactor-master.md` - Guide refactoring implementation
- `refactor-planner.md` - Plan refactoring initiatives
- `documentation-architect.md` - Generate documentation structure
- `plan-reviewer.md` - Review development plans
- `auto-error-resolver.md` - Automated error detection/resolution
- `frontend-error-fixer.md` - Frontend-specific error handling
- `auth-route-debugger.md` - Debug authentication routes
- `auth-route-tester.md` - Test authentication routes
- `web-research-specialist.md` - Web research and information gathering

### 3. Hooks System (6 Automation Triggers)

**Essential Hooks (Required):**
- `skill-activation-prompt.sh/.ts` - Analyzes prompts and suggests relevant skills
- `post-tool-use-tracker.sh` - Tracks tool usage patterns

**Optional Enhancement Hooks:**
- `tsc-check.sh` - TypeScript checking integration
- `trigger-build-resolver.sh` - Build issue resolution
- `stop-build-check-enhanced.sh` - Prevent actions during failed builds
- `error-handling-reminder.sh/.ts` - Error handling pattern reminders

### 4. Slash Commands (3 Utilities)

- `/dev-docs` - Create dev documentation (plan/context/tasks)
- `/dev-docs-update` - Update existing dev documentation
- `/route-research-for-testing` - Research routes for testing

## Prerequisites

Before integrating this infrastructure:

### Tech Stack Compatibility

**For Backend Skills:**
- Node.js with Express
- Prisma ORM
- TypeScript

**For Frontend Skills:**
- React 18+
- MUI v7
- TanStack Query & Router

**Tech-Agnostic Skills:**
- `skill-developer` works with any stack
- `route-tester` adaptable to any API framework
- `error-tracking` framework-agnostic

### Project Requirements

- Git repository
- Command-line access for hooks
- Node.js for TypeScript hooks (optional)
- `.claude/` directory support

## Implementation Steps

### Step 1: Understand Your Project Structure

**CRITICAL: Ask these questions first:**

1. **Project Type:**
   - Monorepo or single app?
   - Service locations (e.g., `services/`, `apps/`, `packages/`)?
   - Frontend/backend separation?

2. **Tech Stack:**
   - Frontend framework and version?
   - Backend framework?
   - Database and ORM?
   - TypeScript configuration?

3. **Naming Conventions:**
   - Service names (e.g., `auth-service`, `user-service`)?
   - Route patterns (e.g., `/api/v1/`, `/v1/api/`)?
   - File naming conventions?

### Step 2: Set Up Essential Infrastructure

**2.1. Create Claude Directory Structure:**

```bash
# If .claude/ doesn't exist
mkdir -p .claude/{skills,hooks,agents,commands}

# Verify structure
tree .claude/
```

**2.2. Copy Essential Hooks:**

```bash
# Copy the two essential hooks
curl -o .claude/hooks/skill-activation-prompt.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/skill-activation-prompt.sh

curl -o .claude/hooks/post-tool-use-tracker.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/post-tool-use-tracker.sh

# Make executable
chmod +x .claude/hooks/*.sh
```

**2.3. Install Hook Dependencies (for TypeScript hooks):**

```bash
cd .claude/hooks

# If using TypeScript versions
curl -o package.json \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/package.json

npm install

cd ../..
```

### Step 3: Add Your First Skill

**3.1. Choose a Skill Based on Your Needs:**

```bash
# For backend development
SKILL="backend-dev-guidelines"

# For frontend development
SKILL="frontend-dev-guidelines"

# For skill development itself
SKILL="skill-developer"

# For API testing
SKILL="route-tester"

# For error tracking
SKILL="error-tracking"
```

**3.2. Copy Skill Files:**

```bash
# Create skill directory
mkdir -p ".claude/skills/$SKILL"

# Copy main skill file
curl -o ".claude/skills/$SKILL/main.md" \
  "https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/skills/$SKILL/main.md"

# Copy resources directory (if exists)
# Use GitHub API to list and download resources
```

**3.3. Copy and Customize skill-rules.json:**

```bash
# Download skill-rules.json
curl -o .claude/skills/skill-rules.json \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/skills/skill-rules.json
```

**Edit `.claude/skills/skill-rules.json`** to match YOUR project structure:

```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/YOUR_BACKEND_PATH/**/*.ts",  // Customize this
        "**/YOUR_API_PATH/**/*.ts"       // Customize this
      ]
    }
  }
}
```

### Step 4: Configure Settings

**4.1. Merge Settings (DO NOT COPY AS-IS):**

```bash
# Download reference settings
curl -o .claude/settings.example.json \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/settings.json
```

**4.2. Manually merge relevant sections into your `.claude/settings.json`:**

Key sections to add:
- Hook configurations
- Agent configurations
- Skill paths

**Example settings merge:**

```json
{
  "hooks": {
    "user-prompt-submit": {
      "script": ".claude/hooks/skill-activation-prompt.sh"
    },
    "post-tool-use": {
      "script": ".claude/hooks/post-tool-use-tracker.sh"
    }
  },
  "skills": {
    "autoActivationEnabled": true,
    "rulesFile": ".claude/skills/skill-rules.json"
  }
}
```

### Step 5: Add Specialized Agents (Optional)

```bash
# Copy specific agents you need
curl -o .claude/agents/code-architecture-reviewer.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/agents/code-architecture-reviewer.md

curl -o .claude/agents/auto-error-resolver.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/agents/auto-error-resolver.md

# Copy any other agents you need
```

Agents typically work standalone and require minimal customization.

### Step 6: Add Slash Commands (Optional)

```bash
# Copy commands
curl -o .claude/commands/dev-docs.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/commands/dev-docs.md

curl -o .claude/commands/dev-docs-update.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/commands/dev-docs-update.md

curl -o .claude/commands/route-research-for-testing.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/commands/route-research-for-testing.md
```

**Customize path references in commands** if your dev docs are stored in a different location.

### Step 7: Verification Checklist

**Test Auto-Activation:**

1. Open a file matching your `pathPatterns` (e.g., backend API route)
2. Type a relevant prompt (e.g., "Add authentication to this route")
3. Verify the skill activation hook suggests the appropriate skill

**Test Hooks:**

```bash
# Verify hooks are executable
ls -la .claude/hooks/*.sh

# Should show -rwxr-xr-x permissions
```

**Test Agents:**

```
# In Claude Code chat
"Use the code-architecture-reviewer agent to review this component"
```

**Test Slash Commands:**

```
/dev-docs
# Should prompt to create development documentation
```

## Customization Guidelines

### Customizing skill-rules.json

The `skill-rules.json` file controls when skills auto-activate. Customize for your structure:

**Example for Monorepo:**

```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/services/*/src/**/*.ts",
        "**/packages/backend-*/**/*.ts",
        "**/apps/api/**/*.ts"
      ],
      "excludePatterns": [
        "**/node_modules/**",
        "**/*.test.ts",
        "**/*.spec.ts"
      ]
    },
    "priority": 10
  },
  "frontend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/apps/web/**/*.{tsx,jsx}",
        "**/packages/ui/**/*.{tsx,jsx}",
        "**/components/**/*.{tsx,jsx}"
      ]
    },
    "priority": 10
  }
}
```

**Example for Single App:**

```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/src/api/**/*.ts",
        "**/src/routes/**/*.ts",
        "**/src/controllers/**/*.ts"
      ]
    }
  }
}
```

### Customizing Hooks

**skill-activation-prompt.sh Customization:**

Edit the context analysis logic to match your project patterns:

```bash
# Add your service names
SERVICES="auth-service user-service product-service"

# Add your route patterns
ROUTE_PATTERNS="/api/v1/ /v1/api/ /graphql"
```

**post-tool-use-tracker.sh Customization:**

Adjust logging paths:

```bash
# Change log location
LOG_DIR=".claude/logs"  # or your preferred location
```

### Adapting Skills for Different Tech Stacks

If your stack differs from the showcase:

**Option 1: Adapt the Skill**
```markdown
# In your skill file
## Tech Stack
This skill has been adapted for:
- Frontend: Vue 3 + Vuetify (adapted from React/MUI)
- Backend: NestJS + TypeORM (adapted from Express/Prisma)

## Original Patterns (Reference Only)
[Original React/MUI patterns for reference...]

## Adapted Patterns
[Your Vue/Vuetify adaptations...]
```

**Option 2: Extract Framework-Agnostic Patterns**

Focus on architecture and patterns rather than specific implementations:
- API design principles
- Error handling strategies
- State management concepts
- Security patterns

**Option 3: Use as Reference Only**

Keep skills for reference but don't activate them:
```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": []  // Empty = never auto-activate
    }
  }
}
```

## The Modular Skill Pattern (500-Line Rule)

### Why Modular Skills?

Claude Code has context limits. Skills over 500 lines can hit these limits. The solution: **Progressive Disclosure**

### Pattern Structure

```
.claude/skills/
└── your-skill/
    ├── main.md                    # Core skill (< 500 lines)
    └── resources/
        ├── error-handling.md      # Load when needed
        ├── authentication.md      # Load when needed
        ├── testing-patterns.md    # Load when needed
        └── deployment.md          # Load when needed
```

### Main File Template

```markdown
---
name: your-skill-name
description: Brief description
---

# Your Skill Name

## Core Patterns

[Essential patterns that fit in < 500 lines]

## Advanced Topics

For detailed information on specific topics:

- **Error Handling**: See `resources/error-handling.md`
- **Authentication**: See `resources/authentication.md`
- **Testing**: See `resources/testing-patterns.md`
- **Deployment**: See `resources/deployment.md`

When you need details on any topic, say:
"Load the error-handling resource from this skill"
```

### Resource File Template

```markdown
# Error Handling Patterns

[Detailed content that would make main file too large]

## Quick Reference

[Concise patterns that can be copied to main when needed]

## Detailed Implementations

[Full implementations and examples]
```

## Dev Documentation System

The infrastructure includes a three-file pattern for surviving context resets:

### Pattern: [task]-plan.md, [task]-context.md, [task]-tasks.md

**[task]-plan.md** - High-level approach and architecture decisions
```markdown
# Task: Add User Authentication

## Overview
Implement JWT-based authentication with refresh tokens

## Architecture Decisions
- Use JWT for stateless auth
- Refresh tokens stored in database
- HttpOnly cookies for token storage

## Approach
[High-level implementation approach]
```

**[task]-context.md** - Current progress and important context
```markdown
# Authentication Implementation - Context

## What's Done
- JWT token generation implemented
- Login endpoint created
- Token validation middleware added

## What's Next
- Implement refresh token rotation
- Add logout endpoint

## Important Notes
- Using bcrypt with 12 rounds
- Token expiry: 15min access, 7d refresh
```

**[task]-tasks.md** - Checklist of specific tasks
```markdown
# Authentication Tasks

- [x] Create JWT service
- [x] Implement login endpoint
- [x] Add token validation middleware
- [ ] Implement refresh token rotation
- [ ] Add logout endpoint
- [ ] Add tests for auth flow
```

### Using Slash Commands for Dev Docs

```
/dev-docs
# Creates all three files for a new task

/dev-docs-update
# Updates existing dev documentation with current progress
```

## Usage Examples

### Example 1: New TypeScript API Project

**User**: "I'm building a new TypeScript API with Express and Prisma. Set up the Claude infrastructure for auto-activating backend skills."

**Steps:**

1. **Set up essential infrastructure:**
```bash
mkdir -p .claude/{skills,hooks,agents,commands}

# Copy essential hooks
curl -o .claude/hooks/skill-activation-prompt.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/skill-activation-prompt.sh

curl -o .claude/hooks/post-tool-use-tracker.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/post-tool-use-tracker.sh

chmod +x .claude/hooks/*.sh
```

2. **Add backend skill:**
```bash
mkdir -p .claude/skills/backend-dev-guidelines

curl -o .claude/skills/backend-dev-guidelines/main.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/skills/backend-dev-guidelines/main.md
```

3. **Create skill-rules.json for single-app structure:**
```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/src/routes/**/*.ts",
        "**/src/controllers/**/*.ts",
        "**/src/services/**/*.ts"
      ]
    }
  }
}
```

4. **Update settings.json:**
```json
{
  "hooks": {
    "user-prompt-submit": {
      "script": ".claude/hooks/skill-activation-prompt.sh"
    },
    "post-tool-use": {
      "script": ".claude/hooks/post-tool-use-tracker.sh"
    }
  }
}
```

5. **Commit:**
```bash
git add .claude
git commit -m "Add Claude Code infrastructure with backend skills"
```

### Example 2: Add Architecture Review Agent

**User**: "Add the architecture review agent to help review my code structure."

**Steps:**

```bash
# Copy agent
curl -o .claude/agents/code-architecture-reviewer.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/agents/code-architecture-reviewer.md

# Use agent
# In Claude Code: "Use the code-architecture-reviewer agent to review src/services/"

git add .claude/agents
git commit -m "Add architecture review agent"
```

### Example 3: Full-Stack Monorepo Setup

**User**: "I have a monorepo with multiple services. Set up the full infrastructure."

**Project Structure:**
```
my-monorepo/
├── services/
│   ├── auth-service/
│   ├── user-service/
│   └── product-service/
├── apps/
│   └── web/
└── packages/
    └── ui/
```

**Steps:**

1. **Copy all components:**
```bash
# Skills
mkdir -p .claude/skills
cd .claude/skills
for skill in backend-dev-guidelines frontend-dev-guidelines skill-developer route-tester error-tracking; do
  mkdir -p "$skill"
  curl -o "$skill/main.md" \
    "https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/skills/$skill/main.md"
done
cd ../..

# Hooks
mkdir -p .claude/hooks
curl -o .claude/hooks/skill-activation-prompt.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/skill-activation-prompt.sh
curl -o .claude/hooks/post-tool-use-tracker.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/post-tool-use-tracker.sh
chmod +x .claude/hooks/*.sh

# Agents
mkdir -p .claude/agents
cd .claude/agents
for agent in code-architecture-reviewer auto-error-resolver documentation-architect; do
  curl -O "https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/agents/$agent.md"
done
cd ../..
```

2. **Customize skill-rules.json for monorepo:**
```json
{
  "backend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/services/*/src/**/*.ts",
        "!**/services/*/src/**/*.test.ts"
      ]
    },
    "priority": 10
  },
  "frontend-dev-guidelines": {
    "activateWhen": {
      "pathPatterns": [
        "**/apps/web/**/*.{tsx,jsx}",
        "**/packages/ui/**/*.{tsx,jsx}"
      ]
    },
    "priority": 10
  },
  "route-tester": {
    "activateWhen": {
      "pathPatterns": [
        "**/services/*/src/routes/**/*.ts"
      ]
    },
    "priority": 5
  }
}
```

3. **Customize skill-activation-prompt.sh for monorepo:**

Edit `.claude/hooks/skill-activation-prompt.sh`:
```bash
# Add your service names
SERVICES="auth-service user-service product-service"

# Add monorepo patterns
MONOREPO_SERVICES="services/*"
MONOREPO_APPS="apps/*"
```

## Best Practices

### 1. Start Small, Expand Gradually

**Initial Setup (15-30 minutes):**
- Essential hooks only
- One relevant skill
- Test activation

**Week 1-2:**
- Add 1-2 more skills
- Add useful agents
- Refine activation rules

**Month 1:**
- Full skill library
- Custom skills
- Team-specific patterns

### 2. Always Customize for Your Project

**DON'T:**
- Copy `settings.json` as-is
- Use default path patterns
- Skip testing activation
- Add all skills at once

**DO:**
- Understand your project structure first
- Customize `skill-rules.json` paths
- Test one component at a time
- Ask about project structure before assuming

### 3. Document Your Customizations

Create `.claude/README.md` in your project:

```markdown
# Claude Infrastructure Setup

## Our Customizations

- **Monorepo structure**: Services in `services/`, apps in `apps/`
- **Backend**: Express + Prisma + TypeScript
- **Frontend**: React 18 + MUI v7 + TanStack Query
- **Skill activation**: See `.claude/skills/skill-rules.json`

## Active Skills

- backend-dev-guidelines (auto-activates in services/*)
- frontend-dev-guidelines (auto-activates in apps/web)
- route-tester (manual activation)

## Available Agents

- code-architecture-reviewer
- auto-error-resolver
- documentation-architect

## Team Notes

[Add team-specific notes here]
```

### 4. Maintain Skill Independence

Each skill should:
- Work standalone
- Not depend on other skills
- Have clear activation patterns
- Include its own resources

### 5. Use Progressive Disclosure

Main skill files:
- Keep under 500 lines
- Link to resources for details
- Provide quick reference patterns

Resource files:
- Detailed implementations
- Full examples
- Edge cases

### 6. Test Activation Patterns

```bash
# Test which skills activate for a file
cd .claude/hooks
./skill-activation-prompt.sh <<EOF
Working on: services/auth-service/src/routes/auth.routes.ts
Task: Add password reset endpoint
EOF
```

### 7. Version Control Everything

```bash
# Commit Claude infrastructure
git add .claude
git commit -m "Add Claude Code infrastructure

- Essential hooks for skill activation
- Backend dev guidelines skill
- Architecture review agent
- Customized for our monorepo structure"
```

## Troubleshooting

### Skills Not Auto-Activating

**Check 1: Hook is executable**
```bash
ls -la .claude/hooks/skill-activation-prompt.sh
# Should show -rwxr-xr-x
chmod +x .claude/hooks/skill-activation-prompt.sh
```

**Check 2: Hook is configured in settings.json**
```json
{
  "hooks": {
    "user-prompt-submit": {
      "script": ".claude/hooks/skill-activation-prompt.sh"
    }
  }
}
```

**Check 3: Path patterns match your files**

Test manually:
```bash
cd .claude/hooks
./skill-activation-prompt.sh <<EOF
Current file: your/actual/file/path.ts
EOF
```

**Check 4: skill-rules.json syntax is valid**
```bash
cat .claude/skills/skill-rules.json | jq .
# Should parse without errors
```

### Hooks Not Running

**Check permissions:**
```bash
chmod +x .claude/hooks/*.sh
```

**Check shebangs:**
```bash
head -1 .claude/hooks/skill-activation-prompt.sh
# Should show: #!/bin/bash
```

**Check for dependencies:**
```bash
# If using TypeScript hooks
cd .claude/hooks
npm install
```

### Agent Not Found

**Check agent file exists:**
```bash
ls -la .claude/agents/
```

**Check file naming:**
- Must be `.md` files
- Use kebab-case (e.g., `code-architecture-reviewer.md`)

**Verify settings.json agent paths:**
```json
{
  "agents": {
    "directory": ".claude/agents"
  }
}
```

### Context Limits Exceeded

**Solution 1: Use modular skills**

Split large skills into main + resources:
```
your-skill/
├── main.md           # < 500 lines
└── resources/
    ├── topic1.md
    └── topic2.md
```

**Solution 2: Use progressive disclosure**

In main.md:
```markdown
For detailed error handling patterns, say:
"Load the error-handling resource"
```

**Solution 3: Reference without loading**

```markdown
Reference: See resources/advanced-patterns.md
(Don't load unless specifically needed)
```

## Advanced Patterns

### Creating Custom Skills

Use the `skill-developer` skill:

```bash
# Add the skill developer meta-skill
mkdir -p .claude/skills/skill-developer
curl -o .claude/skills/skill-developer/main.md \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/skills/skill-developer/main.md

# Use it to create your custom skill
# In Claude Code: "Use the skill-developer skill to create a GraphQL API skill"
```

### Multi-Tech-Stack Projects

If your project uses multiple tech stacks:

```json
{
  "backend-dev-guidelines-node": {
    "activateWhen": {
      "pathPatterns": ["**/services/**/**.ts"]
    }
  },
  "backend-dev-guidelines-python": {
    "activateWhen": {
      "pathPatterns": ["**/services/**/**.py"]
    }
  },
  "frontend-dev-guidelines-react": {
    "activateWhen": {
      "pathPatterns": ["**/web/**/*.{tsx,jsx}"]
    }
  },
  "frontend-dev-guidelines-vue": {
    "activateWhen": {
      "pathPatterns": ["**/admin/**/*.vue"]
    }
  }
}
```

### Team-Wide Skill Library

**Option 1: Monorepo with submodule**
```bash
# In your project
git submodule add https://github.com/your-org/claude-skills.git .claude/skills-library

# Reference in skill-rules.json
{
  "paths": {
    "skillsDirectory": ".claude/skills-library"
  }
}
```

**Option 2: npm package**
```bash
# Publish skills as npm package
npm publish @yourcompany/claude-skills

# Install in projects
npm install --save-dev @yourcompany/claude-skills

# Symlink or copy to .claude/skills/
```

**Option 3: Shared S3/CDN**
```bash
# Upload skills to S3
aws s3 sync .claude/skills s3://your-company-claude-skills/

# Download in projects
aws s3 sync s3://your-company-claude-skills/ .claude/skills/
```

### Conditional Skill Activation

Advanced `skill-rules.json`:

```json
{
  "security-patterns": {
    "activateWhen": {
      "pathPatterns": ["**/*.ts"],
      "and": {
        "fileContains": ["password", "auth", "token", "jwt"]
      }
    },
    "priority": 20
  },
  "performance-patterns": {
    "activateWhen": {
      "pathPatterns": ["**/*.ts"],
      "and": {
        "fileContains": ["query", "database", "cache"]
      }
    }
  }
}
```

## Integration Checklist

Use this checklist to verify your integration:

### Phase 1: Essential Setup

- [ ] Created `.claude/` directory structure
- [ ] Copied `skill-activation-prompt.sh` hook
- [ ] Copied `post-tool-use-tracker.sh` hook
- [ ] Made hooks executable (`chmod +x`)
- [ ] Added hooks to `settings.json`
- [ ] Tested hooks run without errors

### Phase 2: First Skill

- [ ] Identified relevant skill for your project
- [ ] Copied skill main file
- [ ] Created `skill-rules.json`
- [ ] Customized path patterns for YOUR project
- [ ] Tested skill auto-activation
- [ ] Verified skill suggestions appear in chat

### Phase 3: Customization

- [ ] Updated service names in hooks
- [ ] Customized route patterns
- [ ] Adjusted path patterns for your structure
- [ ] Tested activation in different file types
- [ ] Documented customizations

### Phase 4: Expansion (Optional)

- [ ] Added relevant agents
- [ ] Added slash commands
- [ ] Created team README
- [ ] Committed to version control
- [ ] Shared with team

### Phase 5: Validation

- [ ] Skills activate in appropriate files
- [ ] Skills don't activate in test files (if excluded)
- [ ] Agents work when called explicitly
- [ ] Slash commands execute correctly
- [ ] No permission errors on hooks

## Quick Reference

### Essential Commands

```bash
# Download infrastructure showcase
git clone https://github.com/diet103/claude-code-infrastructure-showcase.git

# Copy essential hooks
curl -o .claude/hooks/skill-activation-prompt.sh \
  https://raw.githubusercontent.com/diet103/claude-code-infrastructure-showcase/main/.claude/hooks/skill-activation-prompt.sh
chmod +x .claude/hooks/skill-activation-prompt.sh

# Test hook manually
.claude/hooks/skill-activation-prompt.sh <<< "Working on: src/api/routes.ts"

# Validate skill-rules.json
cat .claude/skills/skill-rules.json | jq .

# List all hooks
ls -la .claude/hooks/

# List all skills
ls -la .claude/skills/

# List all agents
ls -la .claude/agents/
```

### File Structure Reference

```
your-project/
├── .claude/
│   ├── settings.json                  # Main config (customize)
│   ├── settings.local.json            # Local overrides (gitignore)
│   ├── skills/
│   │   ├── skill-rules.json          # Activation rules (CUSTOMIZE!)
│   │   ├── backend-dev-guidelines/
│   │   │   ├── main.md               # Core skill
│   │   │   └── resources/            # Detailed docs
│   │   └── frontend-dev-guidelines/
│   │       ├── main.md
│   │       └── resources/
│   ├── hooks/
│   │   ├── skill-activation-prompt.sh   # Essential
│   │   ├── post-tool-use-tracker.sh     # Essential
│   │   ├── tsc-check.sh                 # Optional
│   │   └── package.json                 # For TS hooks
│   ├── agents/
│   │   ├── code-architecture-reviewer.md
│   │   ├── auto-error-resolver.md
│   │   └── ...
│   └── commands/
│       ├── dev-docs.md
│       └── dev-docs-update.md
└── [your project files]
```

## Resources

- **Original Repository**: https://github.com/diet103/claude-code-infrastructure-showcase
- **Integration Guide**: [CLAUDE_INTEGRATION_GUIDE.md](https://github.com/diet103/claude-code-infrastructure-showcase/blob/main/CLAUDE_INTEGRATION_GUIDE.md)
- **Skills README**: [.claude/skills/README.md](https://github.com/diet103/claude-code-infrastructure-showcase/blob/main/.claude/skills/README.md)
- **Hooks README**: [.claude/hooks/README.md](https://github.com/diet103/claude-code-infrastructure-showcase/blob/main/.claude/hooks/README.md)
- **Agents README**: [.claude/agents/README.md](https://github.com/diet103/claude-code-infrastructure-showcase/blob/main/.claude/agents/README.md)

## License

The original infrastructure showcase is MIT licensed. This skill document is also MIT licensed.

## Credits

Infrastructure patterns extracted from production use by [@diet103](https://github.com/diet103).
Skill document created for the Claude Code Skills Library.

---

## Next Steps

1. **Understand your project structure** - Don't skip this!
2. **Start with essential hooks** - skill-activation-prompt.sh + post-tool-use-tracker.sh
3. **Add ONE relevant skill** - Test activation thoroughly
4. **Customize skill-rules.json** - Match YOUR project paths
5. **Expand gradually** - Add agents, commands, more skills as needed
6. **Document your setup** - Create .claude/README.md for your team
7. **Share with team** - Commit to version control

**Remember:** This is a reference library, not plug-and-play. Customization is required. Integration takes 15-30 minutes when done thoughtfully.

Happy building! 🚀
