---
name: learning-design-review
description: Review educational content against the Four Learning Design Pillars framework. Use when users want to evaluate course materials, lessons, tutorials, e-learning modules, or any instructional content for alignment with evidence-based learning design principles. Provides structured feedback with specific principle references (e.g., 1.1.1, 2.3.4) and actionable recommendations. Triggers on "review this course", "evaluate my lesson", "check best practices", or "analyze this module".
---

# Learning Design Review

Evaluate educational content against 46 research-based principles in four pillars.

## Workflow

### Step 1: Gather Content

Ask user to provide content as: file path, URL, pasted text, or description of course structure.

### Step 2: Load Principles

Read: `~/.claude/skills/learning-design-pillars/principles/learning-design-pillars.yaml`

This file contains 4 pillars, 13 categories, and 46 principles with verification checks.

### Step 3: Analyze Against Each Pillar

For each pillar, identify **Strengths**, **Gaps**, and **Evidence** (specific examples). Always cite principle IDs.

- **1.x.x Structure** — segmentation, consistency, objectives, adaptive design
- **2.x.x Content** — presentation, multimedia, engagement, quality
- **3.x.x Practice** — variety, feedback, metacognition
- **4.x.x UX** — navigation, accessibility, media control

### Step 4: Score

| Score | Rating | Description |
|-------|--------|-------------|
| 5 | Exemplary | Best practices across nearly all principles |
| 4 | Strong | Good alignment, minor gaps |
| 3 | Developing | Core requirements met, notable gaps |
| 2 | Emerging | Significant gaps |
| 1 | Beginning | Major redesign needed |

Overall = average of 4 pillar scores.

### Step 5: Generate Report

```markdown
# Learning Design Review

**Content:** [Name/description]
**Date:** [Date]
**Overall Score:** [X.X/5.0] - [Rating]

## Executive Summary
[2-3 sentences]

## Pillar 1: Clear, Purposeful Structure
**Score: X/5**

### Strengths
- [Finding] (Principle X.X.X)

### Areas for Improvement
- [Gap] (Principle X.X.X): [Specific recommendation]

[Repeat for Pillars 2-4]

## Priority Recommendations

1. **[High Priority]** [Action] (Addresses: X.X.X)
   - Why: [Rationale]
   - How: [Steps]

2. **[Medium Priority]** [Action] (Addresses: X.X.X)

## Quick Wins
- [ ] [Small change with immediate impact]
- [ ] [Small change with immediate impact]
```

## Principle ID Reference

- **1.x.x** = Structure (Organization, Consistency, Learning Path, Adaptive)
- **2.x.x** = Content (Design, Multimedia, Engagement, Quality)
- **3.x.x** = Practice (Variety, Feedback, Metacognition)
- **4.x.x** = UX (Navigation, Accessibility, Media Control)

## Notes

- Always cite specific principle IDs to make feedback actionable
- Prioritize by impact on learning outcomes
- Consider content context (audience, constraints, platform)
- Focus on actionable suggestions, not just critique
