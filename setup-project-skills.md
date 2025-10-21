---
name: setup-project-skills
description: A meta-skill that helps you quickly add Claude Code skills to any new project from your centralized skills repository. Use when starting a new project and need to add reusable skills, adding specific skills to an existing project, or setting up skills across different platforms.
---

# Setup Project Skills

A meta-skill that helps you quickly add Claude Code skills to any new project from your centralized skills repository.

## When to use this skill

- Starting a new project and need to add reusable skills
- Adding specific skills to an existing project
- Setting up skills across different platforms (phone, laptop, GitHub bot)
- Quick-starting a project with common patterns

## What this skill does

Automates the process of copying skills from your central `claude-skills` repository into any project's `.claude/skills/` directory, making them available across all platforms.

## Prerequisites

You should have:
- A GitHub repository with your skills (e.g., `github.com/vishalsachdev/claude-skills`)
- Access to the internet (to download skills via curl/wget)

## Implementation Steps

### Option 1: Add All Skills (Recommended for New Projects)

```bash
# Create skills directory
mkdir -p .claude/skills

# Download all skills from your repo
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents \
  | grep 'download_url.*\.md"' \
  | cut -d'"' -f4 \
  | xargs -n1 -I{} bash -c 'curl -s {} -o .claude/skills/$(basename {})'

# Verify skills added
ls -lh .claude/skills/

# Commit to project
git add .claude/skills
git commit -m "Add Claude Code skills from central repository"
```

### Option 2: Add Specific Skill (For Targeted Needs)

```bash
# Create skills directory
mkdir -p .claude/skills

# Add specific skill (example: secure-nextjs-api-routes)
curl -o .claude/skills/secure-nextjs-api-routes.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/secure-nextjs-api-routes.md

# Commit to project
git add .claude/skills
git commit -m "Add secure Next.js API routes skill"
```

### Option 3: Git Submodule (For Always-Updated Skills)

```bash
# Add skills repo as submodule
git submodule add https://github.com/vishalsachdev/claude-skills.git .claude/skills

# Commit
git commit -m "Add Claude skills as submodule"

# To update skills in the future
cd .claude/skills
git pull origin main
cd ../..
git add .claude/skills
git commit -m "Update skills to latest version"
```

### Option 4: One-Liner Quick Setup (Fast Start)

```bash
# Single command to add all skills
mkdir -p .claude/skills && cd .claude/skills && \
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents | \
grep 'download_url.*\.md"' | cut -d'"' -f4 | xargs -n1 curl -sLO && cd ../..
```

## Available Skills

When running this skill, the assistant should list available skills from the repository:

### Current Skills:

1. **secure-nextjs-api-routes.md**
   - Security middleware for Next.js API routes
   - CSRF protection, rate limiting, audit logging
   - Use when: Building secure Next.js APIs

*(This list will grow as you add more skills)*

## Usage Examples

### Example 1: New Next.js Project with Security Needs

**User**: "I'm starting a new Next.js project that needs secure API routes. Set it up."

**Assistant**:
```bash
# Create skills directory
mkdir -p .claude/skills

# Add secure Next.js skill
curl -o .claude/skills/secure-nextjs-api-routes.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/secure-nextjs-api-routes.md

# Verify
ls .claude/skills/

# Commit
git add .claude/skills
git commit -m "Add secure API routes skill"
```

Now you can use the secure-nextjs-api-routes skill in this project!

### Example 2: Existing Project Needs Skills

**User**: "Add all available skills to this project"

**Assistant**:
```bash
# Create directory if needed
mkdir -p .claude/skills

# Download all skills
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents | \
grep 'download_url.*\.md"' | cut -d'"' -f4 | \
while read url; do curl -sL "$url" -o ".claude/skills/$(basename $url)"; done

# List skills added
echo "Skills added:"
ls -1 .claude/skills/

# Commit
git add .claude/skills
git commit -m "Add Claude Code skills library"
```

### Example 3: GitHub Bot Usage

When using the GitHub bot, you can reference skills directly:

```
@claude I need to add secure API routes to this project.
Use the secure-nextjs-api-routes skill from github.com/vishalsachdev/claude-skills
```

The bot will:
1. Fetch the skill from your public repo
2. Follow the implementation steps
3. Apply the pattern to your code

## Platform-Specific Notes

### 📱 On Phone (Claude Code App)

Skills work automatically once in `.claude/skills/`. To add:

1. Open project in Claude Code
2. Ask: "Add the secure-nextjs skill to this project"
3. Claude runs the curl command
4. Skill is available immediately

### 💻 On Laptop (Claude Code Desktop)

Same as phone, but you can also:
- Manually download skills
- Use git submodule approach for auto-updates
- Edit skills locally in `~/.claude/skills/` for global access

### 🤖 With GitHub Bot

The bot can:
- Reference skills from your public repo URL
- Copy skills into the project during PR creation
- Apply skills without needing them pre-installed

## Skill Repository Structure

Your skills repo should follow this structure:

```
claude-skills/
├── README.md                           # Catalog of skills
├── secure-nextjs-api-routes.md        # Skill 1
├── resilient-async-operations.md      # Skill 2
├── ai-model-cascade.md                # Skill 3
└── ...
```

## Helper Commands

### Check which skills are already in project:

```bash
ls -1 .claude/skills/ 2>/dev/null || echo "No skills directory found"
```

### Update all skills to latest version:

```bash
# Re-download all skills
cd .claude/skills
for skill in *.md; do
  curl -sL "https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/$skill" -o "$skill"
done
cd ../..
git add .claude/skills
git commit -m "Update skills to latest version"
```

### Remove a specific skill:

```bash
rm .claude/skills/skill-name.md
git add .claude/skills
git commit -m "Remove skill-name skill"
```

## Configuration Variables

Customize these for your setup:

```bash
# Your GitHub username
SKILLS_GITHUB_USER="vishalsachdev"

# Your skills repository name
SKILLS_REPO="claude-skills"

# Full URL
SKILLS_URL="https://raw.githubusercontent.com/$SKILLS_GITHUB_USER/$SKILLS_REPO/main"

# Example: Download any skill
curl -o .claude/skills/my-skill.md "$SKILLS_URL/my-skill.md"
```

## Automation: Create a Project Template

Save this as `~/.claude/new-project-setup.sh`:

```bash
#!/bin/bash
# Quick setup for new projects with Claude skills

PROJECT_NAME=$1
SKILLS_USER="vishalsachdev"

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

# Create project
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize git
git init

# Add skills
mkdir -p .claude/skills
curl -s "https://api.github.com/repos/$SKILLS_USER/claude-skills/contents" | \
grep 'download_url.*\.md"' | cut -d'"' -f4 | \
while read url; do
  curl -sL "$url" -o ".claude/skills/$(basename $url)"
done

# Create basic structure
mkdir -p src lib components

# Initial commit
git add .
git commit -m "Initial commit with Claude skills"

echo "✅ Project $PROJECT_NAME ready with Claude skills!"
echo "Skills available:"
ls -1 .claude/skills/
```

**Usage:**
```bash
chmod +x ~/.claude/new-project-setup.sh
~/.claude/new-project-setup.sh my-awesome-app
```

## Best Practices

1. **Always commit skills with your project** - Makes them available across platforms
2. **Update skills periodically** - Pull latest versions from central repo
3. **Don't modify skills in projects** - Modify in central repo, then re-download
4. **Use specific skills, not all** - Only add what you need to reduce clutter
5. **Document which skills you're using** - Add to project README

## Troubleshooting

### "Command not found: curl"

Use `wget` instead:
```bash
wget -O .claude/skills/skill-name.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/skill-name.md
```

### "Skills not appearing in Claude Code"

1. Verify directory structure: `.claude/skills/` (note the dot)
2. Check file extensions: Must be `.md`
3. Restart Claude Code
4. Check file permissions: `chmod 644 .claude/skills/*.md`

### "GitHub rate limit exceeded"

If downloading many skills:
```bash
# Use authenticated requests
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/vishalsachdev/claude-skills/contents
```

### "Cannot access private repo"

Make sure your skills repo is **public**, or use authentication:
```bash
# For private repos
curl -H "Authorization: token YOUR_GITHUB_TOKEN" -O \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/skill.md
```

## Quick Reference Card

```bash
# Add all skills
mkdir -p .claude/skills && cd .claude/skills && \
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents | \
grep 'download_url.*\.md"' | cut -d'"' -f4 | xargs -n1 curl -sLO

# Add one skill
curl -o .claude/skills/SKILLNAME.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/SKILLNAME.md

# Update all skills
cd .claude/skills && for f in *.md; do \
  curl -sL "https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/$f" -o "$f"; \
done

# List available skills (from GitHub)
curl -s https://api.github.com/repos/vishalsachdev/claude-skills/contents | \
  grep '"name".*\.md"' | cut -d'"' -f4

# List installed skills (in project)
ls -1 .claude/skills/
```

## Next Steps After Setup

Once skills are in your project:

1. **Explore available skills**: `ls .claude/skills/`
2. **Read skill documentation**: `cat .claude/skills/skill-name.md`
3. **Use a skill**: Ask Claude to "use the [skill-name] skill"
4. **Commit skills**: `git add .claude/skills && git commit -m "Add skills"`
5. **Share with team**: Skills are now in version control

---

## Meta Note

This skill is itself a skill! It demonstrates the recursive nature of Claude Code skills - you can create skills that help manage other skills.

To add this skill to your central repository:

```bash
cd ~/claude-skills
curl -o setup-project-skills.md \
  https://raw.githubusercontent.com/vishalsachdev/claude-skills/main/setup-project-skills.md
git add setup-project-skills.md
git commit -m "Add meta-skill for project setup"
git push
```

Then in any new project, you can ask:

> "Use the setup-project-skills skill to add all my skills to this project"

And Claude will automatically set everything up! 🎉
