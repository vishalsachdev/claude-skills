# QM Canvas Course Evaluator - Skill Specification

## Executive Summary

This document specifies a skill that enables Claude to evaluate Canvas LMS courses against the Quality Matters (QM) Higher Education Rubric 7th Edition, generate compliance reports, and optionally remediate identified issues using the Canvas MCP (Model Context Protocol).

## QM Rubric Structure Overview

The QM Higher Education Rubric consists of **8 General Standards** with **42 Specific Review Standards (SRS)**. Each SRS has a point value (1-3 points) and 13 are marked as **Essential** (must be met for QM certification).

| Standard | Name | SRS Count | Essential Count |
|----------|------|-----------|-----------------|
| GS1 | Course Overview and Introduction | 9 | 2 |
| GS2 | Learning Objectives | 5 | 5 |
| GS3 | Assessment and Measurement | 6 | 3 |
| GS4 | Instructional Materials | 5 | 2 |
| GS5 | Learning Activities and Learner Interaction | 4 | 4 |
| GS6 | Course Technology | 4 | 2 |
| GS7 | Learner Support | 4 | 0 |
| GS8 | Accessibility and Usability | 7 | 2 |

**Total: 42 SRS, 20 Essential, 99 possible points**

---

## Canvas MCP to QM Standard Mapping

### Data Retrieval Capabilities

| Canvas MCP Tool | QM Standards Addressable | Data Retrieved |
|-----------------|-------------------------|----------------|
| `get_course_details` | 1.2, 1.4, 3.2 | Syllabus, course description, grading policy |
| `get_course_content_overview` | 1.1, 1.2, 1.9 | Pages, modules, syllabus structure |
| `get_front_page` | 1.1, 1.2, 1.7, 1.8 | Course welcome, navigation, introductions |
| `list_modules` / `list_module_items` | 1.1, 2.2, 2.4 | Course organization, objective alignment |
| `list_pages` / `get_page_content` | 1.3-1.6, 7.1-7.4 | Policies, netiquette, support info |
| `list_assignments` / `get_assignment_details` | 2.1-2.5, 3.1-3.6 | Objectives, rubrics, grading criteria |
| `list_assignment_rubrics` | 3.3 | Evaluation criteria |
| `list_discussion_topics` | 5.2, 5.3 | Interaction opportunities |
| `list_announcements` | 3.5 | Feedback frequency |
| `scan_course_content_accessibility` | 8.3-8.6 | Accessibility issues |
| `fetch_ufixit_report` | 8.1-8.7 | Detailed accessibility audit |

### Remediation Capabilities

| Canvas MCP Tool | Remediation Actions |
|-----------------|---------------------|
| `create_page` / `edit_page_content` | Add/update policy pages, support links, netiquette |
| `create_assignment` / `update_assignment` | Add objectives, update rubrics, fix descriptions |
| `create_module` / `update_module` | Improve navigation, add learning objective modules |
| `add_module_item` | Add resources, organize content |
| `create_announcement` | Notify students of updates |
| `create_discussion_topic` | Add interaction opportunities |
| `send_conversation` | Notify instructor of findings |

---

## Detailed Standard-to-Canvas Mapping

### GS1: Course Overview and Introduction

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 1.1 | 3 | Yes | `get_front_page`, `list_modules` | Partial - check for "Start Here" module, navigation instructions | Yes - create navigation page |
| 1.2 | 3 | Yes | `get_course_details`, `get_front_page` | Partial - check for course purpose/structure description | Yes - update front page |
| 1.3 | 2 | No | `list_pages` (search "netiquette") | Yes - check for netiquette page existence | Yes - create netiquette page |
| 1.4 | 2 | No | `list_pages`, `get_course_details` | Partial - search for policy keywords | Yes - create policy page |
| 1.5 | 2 | No | `list_pages` (search "technology") | Yes - check for tech requirements page | Yes - create tech requirements page |
| 1.6 | 1 | No | `list_pages` | Partial - search for digital skills info | Yes - add to tech requirements |
| 1.7 | 1 | No | `list_discussion_topics` | Yes - check for intro discussion | Yes - create intro discussion |
| 1.8 | 1 | No | `get_front_page`, `list_pages` | Partial - search for instructor intro | Yes - create instructor bio page |
| 1.9 | 1 | No | `list_pages`, `list_modules` | Partial - search for support links | Yes - create support page |

### GS2: Learning Objectives

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 2.1 | 3 | Yes | `get_course_details`, `list_assignments` | Partial - check for measurable verbs (Bloom's taxonomy) | Limited - flag for review |
| 2.2 | 3 | Yes | `list_modules`, `list_module_items` | Partial - check module descriptions for objectives | Yes - add objective headers |
| 2.3 | 3 | Yes | `list_assignments` (descriptions) | Partial - NLP check for learner-centered language | Limited - flag for review |
| 2.4 | 3 | Yes | `list_assignments`, `list_modules` | Partial - check for explicit alignment statements | Limited - flag for review |
| 2.5 | 3 | Yes | `get_course_details` | No - requires course level context | No - requires SME review |

### GS3: Assessment and Measurement

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 3.1 | 3 | Yes | `list_assignments`, `get_assignment_details` | Partial - check assignment-objective mapping | Limited - flag for review |
| 3.2 | 3 | Yes | `get_course_details` (syllabus) | Yes - check for grading policy presence | Yes - add grading page |
| 3.3 | 3 | Yes | `list_assignment_rubrics` | Yes - check rubric existence per assignment | Yes - create rubric templates |
| 3.4 | 2 | No | `list_assignments` | Partial - identify self-assessment opportunities | Yes - add practice quizzes |
| 3.5 | 2 | No | `list_announcements`, `list_assignments` | Partial - check for feedback timing info | Limited - flag for review |
| 3.6 | 2 | No | `list_assignments` | Yes - count assessment type diversity | Limited - flag for review |

### GS4: Instructional Materials

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 4.1 | 3 | Yes | `list_modules`, `list_pages` | Partial - check material-objective links | Limited - flag for review |
| 4.2 | 3 | Yes | `list_module_items`, `list_pages` | Partial - check for purpose explanations | Limited - flag for review |
| 4.3 | 2 | No | `list_pages` (check dates/links) | Limited - check for broken links | Limited - report issues |
| 4.4 | 2 | No | Content analysis | No - requires content review | No - requires SME review |
| 4.5 | 2 | No | `list_modules` | Partial - check for required/optional labels | Yes - add labels |

### GS5: Learning Activities and Learner Interaction

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 5.1 | 3 | Yes | `list_assignments`, `list_discussion_topics` | Partial - check activity-objective alignment | Limited - flag for review |
| 5.2 | 3 | Yes | `list_discussion_topics`, `list_assignments` | Yes - check for instructor interaction points | Yes - add office hours/discussions |
| 5.3 | 3 | Yes | `list_discussion_topics` | Yes - check for peer interaction activities | Yes - add peer discussions |
| 5.4 | 3 | Yes | `list_assignments`, `list_pages` | Partial - check for content engagement | Limited - flag for review |

### GS6: Course Technology

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 6.1 | 3 | Yes | `list_pages`, tool analysis | Partial - identify tools used | Limited - flag for review |
| 6.2 | 3 | Yes | Tool engagement analysis | No - requires usage data | No - requires analytics |
| 6.3 | 2 | No | External tool detection | Limited - check tool availability | Yes - create tech page |
| 6.4 | 2 | No | Link checking | Yes - scan for broken links | Yes - report/flag links |

### GS7: Learner Support

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 7.1 | 2 | No | `list_pages` (search "support") | Yes - check for tech support info | Yes - create support page |
| 7.2 | 2 | No | `list_pages`, `get_course_details` | Yes - check for policies/services links | Yes - add links to pages |
| 7.3 | 2 | No | `list_pages` | Yes - check for academic support links | Yes - create academic resources page |
| 7.4 | 1 | No | `list_pages` | Yes - check for counseling/success links | Yes - add to support page |

### GS8: Accessibility and Usability

| SRS | Points | Essential | Canvas Data Source | Automated Check | Remediation Possible |
|-----|--------|-----------|-------------------|-----------------|---------------------|
| 8.1 | 3 | Yes | `list_modules`, navigation analysis | Yes - check module structure, naming | Yes - reorganize modules |
| 8.2 | 3 | Yes | `scan_course_content_accessibility` | Yes - check font, contrast, headings | Partial - flag issues |
| 8.3 | 2 | No | `scan_course_content_accessibility` | Yes - check text accessibility | Partial - flag issues |
| 8.4 | 2 | No | `scan_course_content_accessibility` | Yes - check image alt-text | Partial - flag missing alt-text |
| 8.5 | 2 | No | Content analysis | Limited - check for caption references | Partial - flag issues |
| 8.6 | 2 | No | Multimedia analysis | Limited - check player controls | Partial - flag issues |
| 8.7 | 1 | No | `list_pages` | Yes - check for accessibility statements | Yes - create statement page |

---

## Skill Architecture

### Directory Structure

```
qm-canvas-evaluator/
├── SKILL.md                          # Main skill instructions
├── references/
│   ├── qm-standards-full.md          # Complete QM standards reference
│   ├── canvas-mcp-mapping.md         # Canvas tool to QM mapping
│   ├── evaluation-criteria.md        # Detailed evaluation logic
│   ├── remediation-templates.md      # Pre-built content templates
│   └── report-templates.md           # Output format templates
├── scripts/
│   ├── evaluate_course.py            # Main evaluation orchestrator
│   ├── check_accessibility.py        # Accessibility-specific checks
│   ├── generate_report.py            # Report generation
│   └── remediate.py                  # Remediation actions
└── assets/
    ├── netiquette-template.html      # Sample netiquette page
    ├── tech-requirements-template.html
    ├── support-resources-template.html
    └── accessibility-statement-template.html
```

### Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    QM Course Evaluation Workflow                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. COURSE SELECTION                                             │
│    - list_courses() → User selects course                       │
│    - get_course_details() → Gather basic info                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DATA COLLECTION                                              │
│    - get_course_content_overview() → Structure                  │
│    - list_modules() + list_module_items() → Navigation          │
│    - list_pages() + get_page_content() → Content                │
│    - list_assignments() + get_assignment_details() → Assessments│
│    - list_discussion_topics() → Interactions                    │
│    - scan_course_content_accessibility() → Accessibility        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. EVALUATION (Per Standard)                                    │
│    For each SRS:                                                │
│    - Apply automated checks where possible                      │
│    - Flag items requiring manual review                         │
│    - Score: Met (full points) / Not Met (0) / Needs Review      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. REPORT GENERATION                                            │
│    - Executive Summary (score, essential status)                │
│    - Standard-by-Standard breakdown                             │
│    - Prioritized recommendations                                │
│    - Remediation action list                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. REMEDIATION (Optional, User-Approved)                        │
│    - Create missing pages (netiquette, support, etc.)           │
│    - Add module organization improvements                       │
│    - Create discussion topics for interaction                   │
│    - Add accessibility statements                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Automation Feasibility Analysis

### Fully Automatable (Green)
These checks can be performed with high confidence:
- **1.3**: Netiquette page existence
- **1.5**: Technology requirements page existence
- **1.7**: Introduction discussion existence
- **3.2**: Grading policy presence in syllabus
- **3.3**: Rubric existence for assignments
- **3.6**: Assessment type diversity count
- **5.2**: Instructor interaction points (discussions, announcements)
- **5.3**: Peer interaction activities (group discussions, peer review)
- **6.4**: Broken link detection
- **7.1-7.4**: Support page and link existence
- **8.1**: Module structure and naming consistency
- **8.4**: Image alt-text presence (via accessibility scan)
- **8.7**: Accessibility statement page existence

### Partially Automatable (Yellow)
Require NLP/heuristic analysis with human verification:
- **1.1, 1.2**: Navigation clarity (check for keywords, structure)
- **2.1-2.4**: Learning objective quality (Bloom's verbs, learner-centered language)
- **3.1**: Assessment-objective alignment (keyword matching)
- **4.1, 4.2**: Material-objective connection
- **5.1, 5.4**: Activity-objective alignment
- **8.2, 8.3**: Text accessibility (heading structure, contrast)
- **8.5, 8.6**: Multimedia accessibility (caption references)

### Manual Review Required (Red)
Cannot be automated:
- **2.5**: Appropriateness for course level
- **4.3**: Content currency (requires domain expertise)
- **4.4**: Diversity of perspectives
- **6.1, 6.2**: Tool-objective alignment and engagement quality

---

## Scoring Algorithm

### Per-SRS Scoring
```
For each Specific Review Standard:
  IF automated_check_passed:
    score = full_points
    status = "Met"
  ELIF automated_check_failed:
    score = 0
    status = "Not Met"
  ELSE:
    score = 0 (provisional)
    status = "Needs Review"
    flag_for_manual_review()
```

### Course-Level Scoring
```
total_score = sum(srs_scores)
max_score = 99
percentage = (total_score / max_score) * 100

essential_met = count(essential_srs where status == "Met")
essential_total = 20

certification_eligible = (essential_met == essential_total) AND (percentage >= 85)
```

---

## Remediation Templates

### 1. Netiquette Page (SRS 1.3)
Standard content covering:
- Professional communication expectations
- Response time guidelines
- Discussion participation norms
- Email etiquette

### 2. Technology Requirements (SRS 1.5)
- Browser requirements
- Software/plugins needed
- Hardware recommendations
- Internet speed requirements

### 3. Support Resources (SRS 7.1-7.4)
- Technical support contact
- Academic support services
- Accessibility services
- Counseling services

### 4. Introduction Discussion (SRS 1.7)
Pre-configured discussion topic with prompts for student introductions.

### 5. Accessibility Statement (SRS 8.7)
Template linking to institution and vendor accessibility statements.

---

## Implementation Recommendations

### Phase 1: Core Evaluation
1. Implement data collection from all Canvas MCP sources
2. Build automated checks for "Green" standards
3. Create basic report generation

### Phase 2: Enhanced Analysis
1. Add NLP-based checks for "Yellow" standards
2. Implement heuristic scoring with confidence levels
3. Add comparative benchmarking

### Phase 3: Remediation
1. Deploy template-based page creation
2. Add guided remediation workflow
3. Implement change tracking and rollback

### Phase 4: Continuous Improvement
1. Add feedback loop for manual reviews
2. Refine automated checks based on outcomes
3. Build institutional benchmarking

---

## Limitations and Considerations

### What This Skill CAN Do
- Retrieve and analyze course structure, content, and settings
- Identify missing or incomplete elements
- Generate compliance reports
- Create or update pages with template content
- Add discussion topics and announcements
- Reorganize modules and items

### What This Skill CANNOT Do
- Access external tool content (publisher platforms, LTI tools)
- Evaluate pedagogical quality of content
- Verify factual accuracy or currency of materials
- Assess actual learner engagement or outcomes
- Replace human QM peer review certification
- Access student submission content or grades

### Ethical Considerations
- Always require user approval before making changes
- Provide clear rationale for all recommendations
- Distinguish automated findings from human judgment areas
- Preserve instructor autonomy over pedagogical choices

---

## Next Steps

1. **User Approval**: Review and approve this specification
2. **Skill Creation**: Initialize skill using `init_skill.py`
3. **Reference Development**: Create detailed QM standards reference file
4. **Script Development**: Build evaluation and remediation scripts
5. **Template Creation**: Develop remediation content templates
6. **Testing**: Evaluate against sample courses
7. **Iteration**: Refine based on real-world usage

---

*Specification Version: 1.0*
*Based on: QM Higher Education Rubric, Seventh Edition (2023)*
*Target Platform: Canvas LMS via Canvas MCP*
