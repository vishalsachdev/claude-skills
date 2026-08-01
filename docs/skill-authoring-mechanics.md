# Skill authoring mechanics

> Merged here from the archived `vishalsachdev/claude-code-skills` repository (2026-08-01).
> This is the **mechanical** guide — file layout, `SKILL.md` requirements, packaging, PR steps.
> For what belongs in this store and at which tier, read [CONTRIBUTING.md](../CONTRIBUTING.md) first;
> it governs, and this document only covers the how.

Thank you for your interest in contributing! This document provides guidelines for contributing to this skills collection.

## 🎯 Ways to Contribute

### Report Issues
- Bug reports
- Documentation improvements
- Feature requests for existing skills
- Suggestions for new skills

### Submit Pull Requests
- Fix bugs
- Improve documentation
- Enhance existing skills
- Add new skills

## 📝 Skill Contribution Guidelines

### Before Creating a New Skill

1. **Check existing skills** - Avoid duplicates
2. **Review the [Agent Skills spec](https://agentskills.io)** - Understand the format
3. **Define clear use cases** - What problems does it solve?
4. **Plan the structure** - What references, assets, scripts are needed?

### Skill Quality Standards

Every skill must:

- ✅ Follow the [Agent Skills specification](https://agentskills.io/specification)
- ✅ Include valid YAML frontmatter with `name` and `description`
- ✅ Be self-contained (all needed resources bundled)
- ✅ Use progressive disclosure (SKILL.md → references/ → assets/)
- ✅ Include LICENSE.txt file
- ✅ Have clear, concise instructions
- ✅ Include examples where helpful
- ✅ Be tested and working

### File Organization

```
skills/your-skill-name/
├── SKILL.md              # Required: Main skill file
├── README.md             # Required: Skill documentation
├── LICENSE.txt           # Required: License
├── references/           # Optional: Reference docs
│   └── *.md
├── assets/               # Optional: Templates, images
│   └── *
└── scripts/              # Optional: Helper scripts
    └── *.py, *.sh
```

### SKILL.md Requirements

**Frontmatter:**
```yaml
---
name: skill-name                    # Required: lowercase-with-hyphens
description: |                      # Required: Clear, comprehensive
  What the skill does and when to use it.
  Include triggers and contexts.
license: MIT                        # Optional but recommended
compatibility: |                    # Optional
  Environment/tool requirements
metadata:                           # Optional
  category: writing
  version: 1.0.0
  author: Your Name
---
```

**Body:**
- Clear purpose and use cases
- Step-by-step workflows
- Examples demonstrating usage
- References to bundled resources
- Tips and best practices

### README.md Requirements

Each skill must include a README.md with:

- **Title and brief description**
- **Installation instructions**
- **Usage examples**
- **Features list**
- **Requirements** (if any)
- **License information**
- **Credits/sources**

## 🔄 Pull Request Process

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/claude-code-skills.git
cd claude-code-skills
git remote add upstream https://github.com/vishalsachdev/claude-code-skills.git
```

### 2. Create a Branch

```bash
git checkout -b feature/your-skill-name
# or
git checkout -b fix/issue-description
```

### 3. Make Your Changes

**For new skills:**
```bash
# Create skill directory
mkdir -p skills/your-skill-name/{references,assets,scripts}

# Create required files
touch skills/your-skill-name/SKILL.md
touch skills/your-skill-name/README.md
touch skills/your-skill-name/LICENSE.txt

# Add your content
# ... edit files ...
```

**For improvements:**
- Edit existing files
- Maintain consistent style
- Update version in metadata if applicable

### 4. Test Your Skill

```bash
# Copy to Claude Code skills directory
cp -r skills/your-skill-name ~/.claude/skills/

# Test in Claude Code
# Verify it activates correctly
# Check all references load properly
# Test any scripts
```

### 5. Package Your Skill

```bash
cd skills/your-skill-name
zip -r ../../releases/your-skill-name-v1.0.0.skill . -x "*.DS_Store"
cd ../..
```

### 6. Commit and Push

```bash
git add .
git commit -m "Add your-skill-name skill"
# or
git commit -m "Fix: description of fix"

git push origin feature/your-skill-name
```

### 7. Create Pull Request

- Go to GitHub and create a pull request
- Fill in the PR template (if available)
- Link any related issues
- Provide clear description of changes

## 📋 PR Checklist

Before submitting, ensure:

- [ ] Skill follows Agent Skills specification
- [ ] SKILL.md has valid YAML frontmatter
- [ ] README.md is complete and clear
- [ ] LICENSE.txt is included
- [ ] All files use consistent formatting
- [ ] No sensitive information included
- [ ] Skill tested and working
- [ ] Packaged .skill file generated
- [ ] Main README.md updated (if adding new skill)
- [ ] Commit messages are clear

## 💡 Skill Ideas

Looking for ideas? Consider creating skills for:

### Writing & Documentation
- Technical writing
- Grant proposals
- Business plans
- API documentation

### Development
- Code review checklists
- Testing strategies
- Deployment workflows
- Architecture decision records

### Research
- Literature review workflows
- Data analysis pipelines
- Experiment design
- Survey creation

### Business
- Meeting notes
- Project planning
- Risk assessment
- Stakeholder communication

## 🎨 Style Guidelines

### Markdown
- Use proper heading hierarchy (# → ## → ###)
- Include table of contents for long documents
- Use code blocks with language specification
- Keep lines under 100 characters when possible

### Code
- Follow language-specific conventions
- Include clear comments
- Add error handling
- Provide usage examples

### Writing
- Use clear, concise language
- Write in imperative mood for instructions
- Use active voice
- Define technical terms

## 🐛 Bug Reports

Good bug reports include:

- **Clear title** - Summarize the issue
- **Description** - What happened vs what you expected
- **Steps to reproduce** - How to recreate the issue
- **Environment** - Claude Code version, OS, etc.
- **Screenshots** - If applicable
- **Logs** - Error messages or relevant output

## 💬 Questions?

- Open an [issue](https://github.com/vishalsachdev/claude-code-skills/issues) for questions
- Review existing issues and discussions
- Check the [Agent Skills docs](https://agentskills.io)

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

Individual skills may have their own licenses - ensure compatibility.

## 🙏 Thank You!

Your contributions help make Claude Code more powerful for everyone. Thank you for taking the time to contribute!

---

**Questions about contributing?** Open an issue and we'll help you get started.
