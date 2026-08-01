# QM Course Auditor - Skill Specification

## Overview

**Purpose**: Read-only evaluation of Canvas courses against QM Higher Education Rubric standards, generating comprehensive compliance reports.

**Scope**: Data collection and analysis only - NO modifications to course content.

**Complexity**: Medium

---

## Skill Metadata

```yaml
name: qm-course-auditor
description: Evaluate Canvas LMS courses against Quality Matters Higher Education Rubric (7th Edition). Generates compliance reports with scores, findings, and prioritized recommendations.
triggers:
  - "evaluate course"
  - "QM audit"
  - "quality matters review"
  - "course quality check"
  - "QM compliance"
```

---

## Core Workflow

```
1. SELECT COURSE
   └─ list_courses() → User picks course

2. GATHER DATA (Parallel where possible)
   ├─ get_course_details()        → Syllabus, description
   ├─ get_course_content_overview() → Structure overview
   ├─ list_modules() + items      → Navigation, organization
   ├─ list_pages()                → Policy pages, content
   ├─ list_assignments()          → Assessments, objectives
   ├─ list_discussion_topics()    → Interaction opportunities
   ├─ list_announcements()        → Communication patterns
   ├─ scan_course_content_accessibility() → A11y issues
   └─ list_assignment_rubrics()   → Grading criteria

3. EVALUATE (Per Standard)
   └─ For each of 42 SRS:
      ├─ Run automated checks
      ├─ Calculate confidence score
      └─ Determine: Met / Not Met / Needs Review

4. GENERATE REPORT
   ├─ Executive Summary
   ├─ Standard-by-Standard Results
   ├─ Essential Standards Status
   ├─ Prioritized Recommendations
   └─ Export options (Markdown, HTML, PDF)
```

---

## Standards Coverage

### Fully Automated Checks (High Confidence)

| SRS | Check Logic |
|-----|-------------|
| 1.3 | `list_pages()` → search for "netiquette" or "communication guidelines" |
| 1.5 | `list_pages()` → search for "technology", "requirements", "technical" |
| 1.7 | `list_discussion_topics()` → search for "introduction", "introduce yourself" |
| 3.2 | `get_course_details()` → check syllabus contains grading policy keywords |
| 3.3 | `list_assignment_rubrics()` → count assignments with rubrics vs total |
| 3.6 | `list_assignments()` → count unique submission_types |
| 5.2 | `list_discussion_topics()` → check for instructor-led discussions |
| 5.3 | `list_discussion_topics()` → check for peer discussion requirements |
| 7.1-7.4 | `list_pages()` → search for support-related keywords |
| 8.1 | `list_modules()` → check naming consistency, "Start Here" presence |
| 8.4 | `scan_course_content_accessibility()` → image alt-text check |
| 8.7 | `list_pages()` → search for "accessibility statement" |

### Heuristic Checks (Medium Confidence)

| SRS | Check Logic |
|-----|-------------|
| 1.1 | Check for navigation instructions, "getting started" content |
| 1.2 | Check front page for course purpose/structure description |
| 2.1-2.4 | Scan assignment descriptions for Bloom's verbs, objective language |
| 3.1 | Cross-reference assignment descriptions with stated objectives |
| 4.5 | Check module items for "required"/"optional" labels |
| 8.2-8.3 | Check heading structure, text formatting patterns |

### Flagged for Manual Review

| SRS | Reason |
|-----|--------|
| 2.5 | Requires understanding of course level expectations |
| 4.3 | Requires domain expertise to assess currency |
| 4.4 | Requires content analysis for perspective diversity |
| 6.1-6.2 | Requires understanding of tool-objective alignment |

---

## Report Structure

### Executive Summary
```markdown
## Course Quality Audit Summary

**Course**: [Name] ([Code])
**Audit Date**: [Date]
**Auditor**: Claude (QM Course Auditor)

### Overall Score
- **Points**: X / 99 (XX%)
- **Essential Standards Met**: X / 20

### Certification Readiness
[ ] Ready for QM Review
[X] Needs Improvement (X essential standards not met)

### Priority Actions
1. [Highest impact recommendation]
2. [Second priority]
3. [Third priority]
```

### Standard Detail Section
```markdown
## Standard 1: Course Overview and Introduction

| SRS | Description | Points | Status | Confidence | Notes |
|-----|-------------|--------|--------|------------|-------|
| 1.1 | Navigation instructions | 3 | ✅ Met | High | "Start Here" module found |
| 1.2 | Course purpose | 3 | ⚠️ Review | Medium | Description present but brief |
| 1.3 | Netiquette | 2 | ❌ Not Met | High | No netiquette page found |
...
```

---

## Canvas MCP Tools Required

### Currently Available ✅
- `list_courses`
- `get_course_details`
- `get_course_content_overview`
- `list_modules`, `list_module_items`
- `list_pages`, `get_page_content`
- `list_assignments`, `get_assignment_details`
- `list_discussion_topics`
- `list_announcements`
- `scan_course_content_accessibility`
- `list_assignment_rubrics`

### Would Improve Evaluation 🔧
- `check_course_links` - Validate all links in course (SRS 6.4)
- `get_external_tools` - List LTI integrations (SRS 6.1-6.3)
- `search_course_content` - Keyword search across all content
- `get_course_navigation` - Navigation tab settings
- `get_learning_outcomes` - Canvas outcomes alignment

---

## Directory Structure

```
qm-course-auditor/
├── SKILL.md
├── references/
│   ├── qm-standards-checklist.md    # All 42 SRS with check criteria
│   ├── bloom-verbs.md               # Bloom's taxonomy verb lists
│   └── keyword-patterns.md          # Search patterns for each SRS
└── templates/
    ├── report-full.md               # Complete report template
    ├── report-summary.md            # Executive summary only
    └── report-remediation.md        # Focused on action items
```

---

## Usage Examples

**Basic Audit**:
> "Run a QM audit on my BADM 554 course"

**Focused Audit**:
> "Check if my course meets QM essential standards"

**Comparison**:
> "Audit both sections of my course and compare results"

---

## Limitations

- Cannot access content inside external LTI tools
- Cannot verify actual link functionality (without additional tool)
- Cannot assess pedagogical quality of content
- Some standards require human judgment (flagged appropriately)
- Report reflects point-in-time snapshot
