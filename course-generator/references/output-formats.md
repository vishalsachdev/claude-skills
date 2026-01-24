# Output Formats Reference

Schemas and templates for all course artifacts.

## Learning Graph JSON Schema

```json
{
  "metadata": {
    "title": "Course Name",
    "description": "Course description",
    "level": "college",
    "totalConcepts": 200,
    "version": "1.0",
    "created": "2026-01-07"
  },
  "groups": {
    "FOUND": {
      "classifierName": "Foundation Concepts",
      "description": "Core concepts with no prerequisites",
      "color": {"background": "#e8f5e9", "border": "#4caf50"}
    },
    "BASIC": {
      "classifierName": "Basic Concepts",
      "description": "Build on foundations",
      "color": {"background": "#e3f2fd", "border": "#2196f3"}
    },
    "INTER": {
      "classifierName": "Intermediate Concepts",
      "description": "Build on basics",
      "color": {"background": "#fff3e0", "border": "#ff9800"}
    },
    "ADV": {
      "classifierName": "Advanced Concepts",
      "description": "Build on intermediate",
      "color": {"background": "#fce4ec", "border": "#e91e63"}
    },
    "APP": {
      "classifierName": "Application Concepts",
      "description": "Synthesize multiple concepts",
      "color": {"background": "#f3e5f5", "border": "#9c27b0"}
    }
  },
  "concepts": [
    {
      "id": 1,
      "name": "Concept Name",
      "category": "FOUND",
      "depends_on": [],
      "chapter": 1,
      "bloom_level": "understand",
      "description": "Brief description of concept"
    }
  ]
}
```

### Concept Fields

| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | Unique integer ID |
| name | Yes | Concept name (2-5 words) |
| category | Yes | FOUND, BASIC, INTER, ADV, or APP |
| depends_on | Yes | Array of prerequisite concept IDs |
| chapter | No | Chapter number where introduced |
| bloom_level | No | remember, understand, apply, analyze, evaluate, create |
| description | No | Brief description |

---

## Chapter Structure

### Chapter Index Template (docs/chapters/NN-name/index.md)

```markdown
# Chapter N: Title

## Learning Objectives

By the end of this chapter, you will be able to:

1. [Bloom's verb] [specific outcome] (Remember/Understand)
2. [Bloom's verb] [specific outcome] (Apply)
3. [Bloom's verb] [specific outcome] (Analyze)

## Introduction

[Hook: Story, question, or real-world scenario that motivates the topic]

## Section 1: [Foundation Concept]

[Concrete example first, then abstract principle]

### Key Idea

[Core concept in 1-2 sentences]

### Example

[Worked example with explanation]

### Try It

[Low-stakes practice opportunity]

## Section 2: [Building Concept]

[Build on Section 1, introduce complexity]

## Section 3: [Application]

[Connect to real-world use cases]

## Reflection Questions

1. [Socratic question prompting deeper thinking]
2. [Question connecting to student's own experience]
3. [Question about assumptions or limitations]

## Summary

[3-5 bullet points of key takeaways]

## Next Steps

[Preview of next chapter and how concepts connect]
```

---

## Quiz Format

### Quiz Template (docs/chapters/NN-name/quiz.md)

```markdown
# Chapter N Quiz

**Concepts Tested:** [List from learning graph]
**Bloom's Distribution:** 20% Remember, 30% Understand, 30% Apply, 20% Analyze

---

#### 1. [Question text]? (Remember)

<div class="upper-alpha" markdown>
1. [Option A]
2. [Option B]
3. [Option C]
4. [Option D]
</div>

??? question "Show Answer"
    The correct answer is **[Letter]**.

    [Explanation of why correct, why others wrong]

    **Concept:** [Concept name from learning graph]

---

#### 2. [Question text]? (Understand)

[Continue pattern...]
```

### Question Types by Bloom's Level

| Level | Question Stems |
|-------|---------------|
| Remember | Define..., List..., What is..., Name... |
| Understand | Explain..., Describe..., Summarize..., Why does... |
| Apply | How would you use..., Calculate..., Demonstrate..., Apply... |
| Analyze | Compare..., What is the relationship..., Differentiate..., Why might... |
| Evaluate | Assess..., Which is better..., Justify..., Critique... |
| Create | Design..., Propose..., What if..., How might you... |

---

## MicroSim Specification Format

### Spec Template (docs/sims/sim-name/spec.md)

```markdown
# MicroSim: [Name]

## Concept Visualized

**Concept:** [From learning graph]
**Chapter:** [Chapter number]
**Difficulty:** [Beginner/Intermediate/Advanced]

## Learning Goal

Students will understand [concept] by manipulating [parameter] and observing [outcome].

## Interaction Design

### Controls (Right Panel)
| Control | Type | Range | Default | Effect |
|---------|------|-------|---------|--------|
| [Name] | slider | [min]-[max] | [val] | [What changes] |
| [Name] | button | - | - | [What happens] |
| [Name] | dropdown | [options] | [val] | [What changes] |

### Visualization (Left Panel)
- [What is drawn]
- [How it responds to controls]
- [Color/size encoding if any]

## The "Aha" Moment

When the student [does action], they see [result], which demonstrates [principle].

## Technical Notes

- Canvas size: Responsive, min 400px width
- Frame rate: 30fps
- Libraries: p5.js
- Mobile: Touch-friendly controls

## Assessment Integration

After using this MicroSim, students should be able to answer:
1. [Quiz question this prepares them for]
2. [Another related question]
```

---

## Glossary Format

### Entry Template

```markdown
#### [Term]

[Definition: 1-2 sentences, ISO 11179 compliant]

**Example:** [Concrete illustration]

* Also known as: [Synonyms, if any]
```

### ISO 11179 Definition Standards

1. **Precise**: Exact meaning, no ambiguity
2. **Concise**: As brief as possible while complete
3. **Distinct**: Differentiates from similar terms
4. **Non-circular**: Doesn't use the term being defined
5. **No business rules**: Definition only, not how it's used

**Good:** "A variable that stores a single true or false value."
**Bad:** "A boolean is when something is boolean and can be true or false in business logic."

---

## FAQ Format

```markdown
# Frequently Asked Questions

## Conceptual Questions

### Q: [Question about core concept]?

[Answer in 2-4 sentences. Reference specific chapter if helpful.]

### Q: [Question about common misconception]?

[Clarify the misconception, explain correct understanding.]

## Practical Questions

### Q: [How do I apply this]?

[Practical guidance with example.]

## Prerequisites & Next Steps

### Q: What should I know before starting this course?

[List prerequisites with brief explanation of why each matters.]

### Q: What should I learn after this course?

[Recommended next courses/topics with brief rationale.]
```

---

## mkdocs.yml Template

```yaml
site_name: [Course Name]
site_description: [Course description]
site_url: https://[username].github.io/[repo-name]

theme:
  name: material
  features:
    - content.code.copy
    - navigation.expand
    - navigation.footer
    - navigation.sections
    - search.highlight
  palette:
    primary: indigo
    accent: indigo

markdown_extensions:
  - admonition
  - attr_list
  - md_in_html
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.arithmatex:
      generic: true
  - toc:
      permalink: true

extra_javascript:
  - https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML

nav:
  - Home: index.md
  - Course Description: course-description.md
  - Chapters:
    - 1. [Chapter 1]: chapters/01-name/index.md
    - 2. [Chapter 2]: chapters/02-name/index.md
  - Simulations:
    - [Sim 1]: sims/sim-name/index.md
  - Learning Graph: learning-graph/index.md
  - Glossary: glossary.md
  - FAQ: faq.md
```
