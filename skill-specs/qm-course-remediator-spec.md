# QM Course Remediator - Skill Specification

## Overview

**Purpose**: Create and update Canvas course content to address QM compliance gaps identified by the auditor skill.

**Scope**: Content creation and modification - requires explicit user approval for each action.

**Complexity**: Medium

**Prerequisite**: Should typically run after `qm-course-auditor` has identified issues.

---

## Skill Metadata

```yaml
name: qm-course-remediator
description: Fix QM compliance issues in Canvas courses by creating missing pages, reorganizing modules, and adding required content elements.
triggers:
  - "fix QM issues"
  - "remediate course"
  - "add missing QM content"
  - "improve course quality"
```

---

## Core Workflow

```
1. LOAD AUDIT RESULTS
   └─ User provides audit report OR runs fresh audit

2. PRIORITIZE ISSUES
   ├─ Essential standards first
   ├─ High-point items second
   └─ Quick wins (automatable) third

3. PROPOSE REMEDIATION PLAN
   └─ Present list of proposed changes
   └─ User approves/modifies plan

4. EXECUTE (With Confirmation)
   For each approved action:
   ├─ Show exactly what will be created/changed
   ├─ Get user confirmation
   ├─ Execute via Canvas MCP
   └─ Verify success

5. GENERATE CHANGE LOG
   └─ Document all modifications made
```

---

## Remediation Capabilities

### Tier 1: Template-Based Creation (Fully Automated)

| SRS | Action | Canvas Tool | Template |
|-----|--------|-------------|----------|
| 1.3 | Create netiquette page | `create_page` | `netiquette.html` |
| 1.5 | Create tech requirements page | `create_page` | `tech-requirements.html` |
| 1.7 | Create intro discussion | `create_discussion_topic` | `student-introductions` |
| 1.8 | Create instructor bio page | `create_page` | `instructor-bio.html` |
| 1.9 | Create support resources page | `create_page` | `getting-started.html` |
| 7.1 | Add technical support section | `create_page` / `edit_page_content` | `tech-support.html` |
| 7.2 | Add policies section | `edit_page_content` | `policies-links.html` |
| 7.3 | Add academic support section | `create_page` | `academic-support.html` |
| 7.4 | Add student services section | `edit_page_content` | `student-services.html` |
| 8.7 | Create accessibility statement | `create_page` | `accessibility.html` |

### Tier 2: Guided Creation (User Input Required)

| SRS | Action | User Input Needed |
|-----|--------|-------------------|
| 1.1 | Create "Start Here" module | Confirm module name, items to include |
| 1.2 | Enhance course description | Review/edit generated description |
| 1.4 | Add policy links | Provide institution-specific URLs |
| 3.2 | Add grading policy | Review/customize grading breakdown |
| 5.2 | Add instructor interaction points | Choose discussion topics, office hours info |

### Tier 3: Structural Changes (Careful Review)

| SRS | Action | Considerations |
|-----|--------|----------------|
| 8.1 | Reorganize modules | May affect existing student progress |
| 4.5 | Add required/optional labels | Needs content review |
| 2.2 | Add objective headers to modules | Instructor must provide objectives |

---

## Template Library

### netiquette.html (SRS 1.3)
```html
<h2>Online Communication Guidelines</h2>

<h3>General Expectations</h3>
<ul>
  <li>Be respectful and professional in all communications</li>
  <li>Use clear, concise language</li>
  <li>Proofread before posting</li>
</ul>

<h3>Discussion Board Etiquette</h3>
<ul>
  <li>Stay on topic</li>
  <li>Support your opinions with evidence</li>
  <li>Respond constructively to peers</li>
  <li>Meet participation deadlines</li>
</ul>

<h3>Email Guidelines</h3>
<ul>
  <li>Use a clear subject line with course name</li>
  <li>Include your full name</li>
  <li>Allow [X] business days for response</li>
</ul>

<!-- CUSTOMIZE: Add institution-specific guidelines -->
```

### tech-requirements.html (SRS 1.5)
```html
<h2>Technology Requirements</h2>

<h3>Hardware</h3>
<ul>
  <li>Computer (Windows 10+ or macOS 10.14+) or tablet</li>
  <li>Webcam and microphone (for synchronous sessions)</li>
  <li>Reliable internet connection (broadband recommended)</li>
</ul>

<h3>Software</h3>
<ul>
  <li>Modern web browser (Chrome, Firefox, Safari, or Edge)</li>
  <li>PDF reader</li>
  <!-- CUSTOMIZE: Add course-specific software -->
</ul>

<h3>Canvas Access</h3>
<p>This course uses Canvas LMS. Access at: [INSTITUTION_URL]</p>

<h3>Technical Support</h3>
<p>For technical issues, contact: [SUPPORT_INFO]</p>
```

### student-introductions (Discussion Topic)
```
Title: Introduce Yourself

Instructions:
Welcome to [COURSE_NAME]! Let's get to know each other.

Please share:
1. Your name and what you'd like to be called
2. Your program/major and expected graduation
3. One interesting fact about yourself
4. What you hope to learn in this course

After posting your introduction, reply to at least two classmates to start building our learning community.
```

### accessibility.html (SRS 8.7)
```html
<h2>Accessibility Information</h2>

<h3>Canvas Accessibility</h3>
<p>Canvas is committed to accessibility. View the
<a href="https://www.instructure.com/canvas/accessibility">Canvas Accessibility Statement</a>.</p>

<h3>Course Materials</h3>
<p>We strive to make all course materials accessible. If you encounter barriers, please contact the instructor.</p>

<h3>Accommodations</h3>
<p>Students requiring accommodations should contact [DISABILITY_SERVICES] to arrange support.</p>

<h3>External Tools</h3>
<!-- CUSTOMIZE: Add links to vendor accessibility statements for tools used -->
<ul>
  <li><a href="#">[Tool 1] Accessibility Statement</a></li>
  <li><a href="#">[Tool 2] Accessibility Statement</a></li>
</ul>
```

---

## Safety Guardrails

### Always Require Confirmation
- Show exact content before creating
- Confirm page titles and locations
- Preview changes to existing content

### Never Automatically
- Delete existing content
- Modify published assignments with submissions
- Change grading policies mid-semester
- Alter student-facing deadlines

### Preserve
- Create backups of modified pages (in description)
- Log all changes with timestamps
- Allow easy rollback instructions

---

## Canvas MCP Tools Required

### Currently Available ✅
- `create_page`, `edit_page_content`
- `create_discussion_topic`
- `create_module`, `update_module`, `add_module_item`
- `create_announcement`
- `update_assignment`

### Would Improve Remediation 🔧
- `duplicate_page` - Copy existing page as template
- `reorder_modules` - Bulk module reordering
- `bulk_update_module_items` - Add labels to multiple items

---

## Directory Structure

```
qm-course-remediator/
├── SKILL.md
├── references/
│   ├── remediation-guide.md         # When to use each action
│   └── customization-points.md      # What needs user input
├── templates/
│   ├── pages/
│   │   ├── netiquette.html
│   │   ├── tech-requirements.html
│   │   ├── academic-support.html
│   │   ├── accessibility.html
│   │   └── getting-started.html
│   ├── discussions/
│   │   └── student-introductions.json
│   └── modules/
│       └── start-here-module.json
└── logs/
    └── change-log-template.md
```

---

## Usage Examples

**From Audit Results**:
> "Fix the issues found in my QM audit"

**Specific Fix**:
> "Add a netiquette page to my course"

**Bulk Remediation**:
> "Add all missing support pages to BADM 554"

---

## Change Log Format

```markdown
# QM Remediation Log

**Course**: [Name] ([ID])
**Date**: [Timestamp]
**Performed By**: Claude (QM Course Remediator)

## Changes Made

| # | Action | Item | Status | Rollback |
|---|--------|------|--------|----------|
| 1 | Created page | "Netiquette Guidelines" | ✅ Success | Delete page ID: XXX |
| 2 | Created discussion | "Introduce Yourself" | ✅ Success | Delete topic ID: XXX |
| 3 | Updated page | "Course Home" | ✅ Success | Previous content saved below |

## Backup Content

### Course Home (Previous Version)
[Original content preserved here]
```
