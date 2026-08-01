---
name: learning-design-checklist
description: Generate a quick compliance checklist from the Four Learning Design Pillars. Use when users want a practical checklist for reviewing content, a quick audit tool, or verification questions for specific pillars. Triggers on "checklist", "quick audit", "design check", or "verify against pillars".
---

# Learning Design Checklist Generator

Generate actionable verification checklists from the Four Learning Design Pillars.

## Workflow

### Step 1: Determine Scope

Ask which checklist:
- **Full checklist**: All 4 pillars (~46 items)
- **Single pillar**: Focus on one area (1-4)
- **Canvas-specific**: Tailored to Canvas LMS features

### Step 2: Load Principles

Read from `~/.claude/skills/learning-design-pillars/principles/learning-design-pillars.json`

The JSON contains `checks` arrays for each principle — use these for checklist items.

### Step 3: Output Checklist

## Pillar 1: Clear, Purposeful Structure

### 1.1 Content Organization
- [ ] Content chunked into bite-sized units? (1.1.1)
- [ ] Each page has a single primary idea? (1.1.1)
- [ ] Prerequisites stated or embedded? (1.1.2)
- [ ] Complexity increasing gradually? (1.1.3)
- [ ] Scannable structure with clear priority? (1.1.4)
- [ ] Learners guided on what to focus on? (1.1.5)

### 1.2 Design Consistency
- [ ] Screens behave consistently across the course? (1.2.1)
- [ ] No unnecessary jumping between tools/screens? (1.2.2)
- [ ] Later modules build on earlier ones consistently? (1.2.3)

### 1.3 Learning Path Clarity
- [ ] Success criteria visible? (1.3.1)
- [ ] Units begin with orientation, end with consolidation? (1.3.2)
- [ ] Every activity tied to an objective? (1.3.3)
- [ ] Expectations explicit (time, quality, grading)? (1.3.4)
- [ ] Prerequisites and structure communicated? (1.3.5)

### 1.4 Adaptive Design
- [ ] Planned re-exposure later in program? (1.4.1)
- [ ] Experienced learners can move faster? (1.4.2)

## Pillar 2: Active, Engaging Learning Content

### 2.1 Content Design
- [ ] Succinct and focused on objectives? (2.1.1)
- [ ] Both visual and verbal mediums used? (2.1.2)
- [ ] Graphics relevant, not decorative? (2.1.3)
- [ ] Text and visuals placed near each other? (2.1.4)
- [ ] Scannable with short paragraphs and headings? (2.1.5)
- [ ] Additional detail revealed on demand? (2.1.6)
- [ ] Users can jump to content of interest? (2.1.7)
- [ ] Fonts readable and audio audible? (2.1.8)

### 2.2 Multimedia & Interactive
- [ ] Multimedia increases engagement? (2.2.1)
- [ ] Doing prioritized over passive reading? (2.2.2)
- [ ] Videos under 10 minutes? (2.2.3)
- [ ] Video narration explains visuals? (2.2.4)
- [ ] On-screen text used sparingly in videos? (2.2.5)
- [ ] Audio and visuals synchronized? (2.2.6)

### 2.3 Engagement & Relevance
- [ ] Conversational and relatable language? (2.3.1)
- [ ] Purpose of features explained? (2.3.2)
- [ ] Prior knowledge activated? (2.3.3)
- [ ] Storytelling elements used? (2.3.4)
- [ ] Concrete before abstract? (2.3.5)
- [ ] Difficulty appropriately calibrated? (2.3.6)
- [ ] Examples relevant and interesting? (2.3.7)
- [ ] Key terms highlighted and defined? (2.3.8a)
- [ ] Multiple perspectives provided? (2.3.8b)

### 2.4 Quality
- [ ] Supplementary resources available? (2.4.1)
- [ ] Content current, accurate, sourced? (2.4.2)
- [ ] Free from bias and discrimination? (2.4.3)
- [ ] Credibility indicators present? (2.4.4)

## Pillar 3: Continuous Practice & Feedback

### 3.1 Practice Design
- [ ] Practice varied across contexts? (3.1.1)
- [ ] Skills interleaved in practice? (3.1.2)
- [ ] Practice cycles back over time? (3.1.3)
- [ ] Recall-heavy prompts used? (3.1.4)
- [ ] Practice reflects real-world contexts? (3.1.5)
- [ ] Low-stakes practice available? (3.1.6)
- [ ] Prior skills practiced before new topics? (3.1.7)

### 3.2 Feedback
- [ ] Feedback specific and actionable? (3.2.1)
- [ ] Encouraging in tone? (3.2.2)
- [ ] Delivered immediately? (3.2.3)
- [ ] Worked examples provided and faded? (3.2.4)
- [ ] Rubrics and expectations clear? (3.2.5)

### 3.3 Metacognition
- [ ] Learners can assess their progress? (3.3.1)
- [ ] Why/how/what-if questions used? (3.3.2)
- [ ] Reflection prompts included? (3.3.3)
- [ ] Collaboration opportunities provided? (3.3.4)

## Pillar 4: Simple, Intuitive UX

### 4.1 Navigation
- [ ] Navigation intuitive? (4.1.1)
- [ ] Progress indicators visible? (4.1.2)
- [ ] Interactive elements clearly distinguishable? (4.1.3)
- [ ] External links labeled? (4.1.4)
- [ ] Returning learners can find their place? (4.1.5)

### 4.2 Accessibility
- [ ] Search available? (4.2.1)
- [ ] Annotation tools provided? (4.2.2)
- [ ] Viewable on different screen sizes? (4.2.3)
- [ ] Display preferences customizable? (4.2.4)
- [ ] Design minimalist and clear? (4.2.5)

### 4.3 Media Control
- [ ] Learners control video pace? (4.3.1)
- [ ] Time estimates provided? (4.3.2)

## Canvas-Specific Variant

When Canvas LMS context is detected, output this tailored version instead:

### Structure (Pillar 1)
- [ ] Modules named consistently (e.g., "Week 1: Topic")
- [ ] Module requirements set for sequencing
- [ ] Learning objectives in module descriptions
- [ ] Welcome/orientation module exists

### Content (Pillar 2)
- [ ] Pages use H1/H2/H3 hierarchy
- [ ] Images have alt text
- [ ] Videos under 10 min (or segmented)
- [ ] Discussions encourage active participation

### Practice & Feedback (Pillar 3)
- [ ] Practice quizzes with unlimited attempts
- [ ] Rubrics attached to all graded assignments
- [ ] Peer reviews configured where appropriate
- [ ] Assignment feedback turnaround < 7 days

### UX (Pillar 4)
- [ ] Unused navigation items hidden
- [ ] Modules view set as home page
- [ ] Module progress tracking enabled
- [ ] Time estimates included
