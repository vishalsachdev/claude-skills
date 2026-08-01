---
name: canvas-course-audit
description: Audit an entire Canvas LMS course against the Four Learning Design Pillars (Clear Structure, Active Content, Continuous Practice, Intuitive UX). Use when users want to evaluate course quality, identify improvement areas, or prepare for course redesign. Requires canvas-mcp server for course data access. Triggers on "audit course", "course review", "evaluate my course", or Canvas course IDs/codes.
---

# Canvas Course Audit

Systematically evaluate a Canvas course against 46 evidence-based learning design principles organized into four pillars.

## Prerequisites

- **canvas-mcp** server must be configured and running
- User must have instructor/TA/admin access to the target course
- Principles file: `~/.claude/skills/learning-design-pillars/principles/learning-design-pillars.yaml`

## Workflow

### Step 1: Initialize

1. Parse course identifier from user input
2. Load principles from the YAML file
3. Verify course access via `get_course_details`

### Step 2: Fetch Course Data

Use canvas-mcp to gather:
- `get_course_details` — metadata, syllabus
- `list_modules` — structure, item counts, prerequisites
- `list_assignments` — types, rubrics, due dates
- `list_discussions` — engagement elements
- `list_pages` — content, headings, media
- `list_files` — media inventory

### Step 3: Analyze Against Each Pillar

#### Pillar 1: Clear, Purposeful Structure (1.1-1.4)
- [ ] Modules have 5-10 items each (not overloaded)
- [ ] Consistent naming pattern (e.g., "Week 1: Topic")
- [ ] Each module has overview/summary pages
- [ ] Learning objectives visible in module descriptions
- [ ] Prerequisites configured where needed
- [ ] Logical progression from foundational to advanced

#### Pillar 2: Active, Engaging Learning Content (2.1-2.4)
- [ ] Videos embedded (not just linked)
- [ ] Videos exist per content module
- [ ] Pages use heading hierarchy (H1/H2/H3)
- [ ] Images have alt text
- [ ] Key terms bolded/highlighted
- [ ] Discussions exist beyond announcements

#### Pillar 3: Continuous Practice & Feedback (3.1-3.3)
- [ ] Practice quizzes exist (ungraded/unlimited attempts)
- [ ] Assignment types vary (papers, projects, presentations)
- [ ] Rubrics attached to assignments
- [ ] Peer review enabled on at least one assignment
- [ ] Feedback turnaround expectations stated

#### Pillar 4: Simple, Intuitive UX (4.1-4.3)
- [ ] Unused navigation items hidden
- [ ] Home page provides clear starting point
- [ ] Module requirements enable progress tracking
- [ ] External links clearly marked
- [ ] Time estimates provided for activities

For detailed weighted criteria per pillar, see **[references/audit-criteria.md](references/audit-criteria.md)**.

### Step 4: Calculate Pillar Scores

Score each pillar 1-5:

| Score | Description |
|-------|-------------|
| 5 | Exemplary — meets nearly all criteria with excellence |
| 4 | Strong — meets most criteria, minor gaps |
| 3 | Adequate — meets core criteria, notable gaps |
| 2 | Developing — several significant gaps |
| 1 | Needs Redesign — fundamental issues |

Formula: `Pillar Score = (criteria_met / total_criteria) * 5`

### Step 5: Generate Report

Output this structure:

```markdown
# Canvas Course Audit Report

**Course:** [Name] ([Code])
**Audit Date:** [Date]
**Overall Score:** [Average of 4 pillars] / 5

## Executive Summary
[2-3 sentences: strengths + primary improvement areas]

## Pillar Scores
| Pillar | Score | Status |
|--------|-------|--------|
| 1. Clear Structure | X.X/5 | [Status] |
| 2. Active Content | X.X/5 | [Status] |
| 3. Practice & Feedback | X.X/5 | [Status] |
| 4. Intuitive UX | X.X/5 | [Status] |

## Detailed Findings
[Per pillar: Strengths (cite principle IDs) + Gaps (cite principle IDs)]

## Recommendations
### Quick Wins (< 1 hour each)
### Medium Effort (1-4 hours)
### Major Redesigns
```

For a complete example report, see **[references/example-report.md](references/example-report.md)**.

## Notes

- Some criteria require manual review (tone, video quality) — flag these in the report
- Run audit at start of semester for maximum improvement time
- If a canvas-mcp tool is unavailable, note it and skip that analysis
