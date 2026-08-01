---
name: canvas-assignment-design
description: Design Canvas LMS assignments using evidence-based learning science principles from the Four Learning Design Pillars. Use when educators want to create pedagogically sound assignments, need help writing assignment descriptions with clear objectives, want rubric suggestions, or are creating quizzes/discussions/peer reviews. Integrates with canvas-mcp for direct Canvas creation.
---

# Canvas Assignment Design

Design Canvas assignments following the Four Learning Design Pillars.

## Workflow

### Phase 1: Learning Objective Clarification

Ask the educator:
1. **What should students be able to do after this assignment?** (use action verbs: analyze, create, evaluate, apply)
2. **What assignment type?** Standard, quiz, discussion, or peer review
3. **Context?** Course level, sequence position, estimated student time

### Phase 2: Design Decisions by Pillar

#### Pillar 1: Clear, Purposeful Structure

| Principle | Design Question | Canvas Implementation |
|-----------|-----------------|----------------------|
| **1.1.1 Small segments** | Can this be broken into milestones? | Multiple submissions or staged deadlines |
| **1.3.1 Clear objectives** | Are learning objectives stated at the top? | Add objectives in description header |
| **1.3.4 Expectation setting** | Are success criteria crystal clear? | Attach detailed rubric; provide exemplars |
| **1.2.2 Integrated format** | Are all resources accessible in one place? | Embed resources in assignment description |

- [ ] Learning objectives stated clearly
- [ ] Broken into logical steps or phases
- [ ] Rubric attached with clear criteria

#### Pillar 2: Active, Engaging Learning Content

| Principle | Design Question | Canvas Implementation |
|-----------|-----------------|----------------------|
| **2.3.4 Storytelling** | Can you frame this as a scenario? | Write assignment as a narrative |
| **2.3.7 Interest and relevance** | Connected to students' careers? | Reference real-world applications |
| **3.1.5 Authentic practice** | Mirrors real-world tasks? | Use industry scenarios, tools, formats |

- [ ] Authentic, real-world context provided
- [ ] Active production required (not passive)
- [ ] Prior knowledge explicitly activated

#### Pillar 3: Continuous Practice & Feedback

| Principle | Design Question | Canvas Implementation |
|-----------|-----------------|----------------------|
| **3.1.6 Low-stakes practice** | Formative or summative? | Practice quizzes with unlimited attempts vs graded |
| **3.2.1 Targeted feedback** | What specific feedback will students receive? | Rubric with actionable criteria |
| **3.2.4 Worked examples** | Have you provided exemplars? | Link sample submissions |

- [ ] Rubric with specific, actionable criteria
- [ ] Sample submission provided
- [ ] Reflection or explanation component included

#### Pillar 4: Simple, Intuitive UX

| Principle | Design Question | Canvas Implementation |
|-----------|-----------------|----------------------|
| **4.3.2 Time estimates** | How long should this take? | State estimated time in description |
| **4.2.5 Minimalist design** | Is the description uncluttered? | Use headers, bullets, white space |

- [ ] Time estimate provided
- [ ] Scannable format (headers, bullets)

### Phase 3: Generate Assignment Components

Generate these based on design decisions:

**1. Assignment Description** — Use this template:

```markdown
## Learning Objectives
By completing this assignment, you will be able to:
- [Objective 1 - action verb]

## Overview
[Engaging context - use storytelling/scenario framing]

**Estimated Time:** [X hours]

## Instructions
1. [Step 1]
2. [Step 2]

## Submission Requirements
- [Format, file types, length/scope]

## Evaluation Criteria
See attached rubric. Key areas: [Criterion 1], [Criterion 2]

## Sample Submission
[Link to exemplar or description of what success looks like]
```

**2. Rubric Criteria** — Aligned with learning objectives:

| Criterion | Excellent (4) | Proficient (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------------|----------------|---------------|
| [Objective 1] | [Description] | [Description] | [Description] | [Description] |

**3. Canvas Settings** — Submission type, allowed attempts, due date strategy, peer review toggle, points.

### Phase 4: Canvas Creation (Optional)

If canvas-mcp is available and educator confirms:
1. Confirm course ID and assignment group
2. Create assignment with `create_assignment` (set `published: false` for draft review)
3. Create and attach rubric with `create_rubric`
4. Return assignment URL

## Before/After Examples

For 3 detailed before/after examples (research paper, quiz, discussion forum) showing traditional vs pillar-informed design, see **[references/examples.md](references/examples.md)**.

## Principles Source

Full principle definitions: `~/.claude/skills/learning-design-pillars/principles/learning-design-pillars.yaml`
