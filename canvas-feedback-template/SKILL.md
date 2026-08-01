---
name: canvas-feedback-template
description: Generate learning science-backed feedback templates for Canvas assignments. Use when educators need feedback templates for grading, want to create rubric comments, need encouraging feedback language aligned with Pillar 3 principles (targeted, encouraging, immediate), or want to set up SpeedGrader comment libraries. Works with canvas-mcp for bulk grading.
---

# Canvas Feedback Template Generator

Generate feedback templates applying Pillar 3: Continuous Practice & Feedback.

## Workflow

### Step 1: Gather Context

Ask the user for:
1. **Assignment type** (essay, project, quiz, discussion, peer review)
2. **Learning objectives** being assessed
3. **Common issues** seen in submissions (optional)
4. **Rubric criteria** if available

### Step 2: Generate Templates

Organize by performance level. Each template must include these components (per Principle 3.2.1):
1. **Strength acknowledgment** (3.2.2 - Encouraging)
2. **Specific observation** with evidence from submission
3. **Actionable improvement** with concrete next step
4. **Forward-looking connection** to future learning

#### Exceeds Expectations
Celebrate mastery, suggest stretch goals.

#### Meets Expectations
Acknowledge success, highlight one improvement area.

#### Approaching Expectations
Specific improvements with encouragement.

#### Needs Improvement
Clear next steps with support resources.

### Step 3: Apply Principles

| Principle | Application in Feedback |
|-----------|------------------------|
| 3.2.1 Targeted | Focus on specific, goal-oriented actions |
| 3.2.2 Encouraging | Start with positives, maintain supportive tone |
| 3.2.3 Immediate | Design for quick delivery via SpeedGrader |
| 3.3.2 Generating explanations | Ask questions that prompt reflection |
| 3.3.3 Reflection | Include prompts for self-assessment |

### Step 4: Canvas Integration

If canvas-mcp is available:
- **Rubric Comments**: Generate comment options for each rubric criterion at each level
- **Comment Library**: Format for Canvas SpeedGrader comment library
- **Bulk Feedback**: Create templates for `bulk_grade_submissions`

## Template Examples

### Essay — Meets Expectations
```
**What's Working Well:**
Your thesis in paragraph 1 clearly establishes your argument about [topic].

**One Area to Strengthen:**
Your conclusion summarizes but could be more impactful. Try connecting
back to your opening hook or suggesting implications.

**Next Step:**
For your next essay, experiment with a "so what?" statement in your
conclusion that explains why your argument matters.
```

### Peer Review — Approaching Expectations
```
**Strengths in Your Review:**
You identified key strengths and provided specific examples.

**Area for Growth:**
Your suggestions are general ("make it clearer"). Effective peer feedback
includes specific, actionable recommendations.

**How to Improve:**
Instead of "the introduction needs work," try: "Consider opening with a
specific example of [topic] to immediately engage readers."

**Reflection Question:**
What specific change would have the biggest impact on your peer's draft?
```

## Feedback Quality Checklist

Before finalizing:
- [ ] **Specific**: References actual work, not generic statements
- [ ] **Actionable**: Includes concrete next step
- [ ] **Encouraging**: Leads with strengths
- [ ] **Forward-looking**: Connects to future assignments
- [ ] **Proportionate**: Length matches assignment weight
