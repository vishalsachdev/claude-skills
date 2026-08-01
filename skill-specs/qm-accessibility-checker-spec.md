# QM Accessibility Checker - Skill Specification

## Overview

**Purpose**: Deep-dive accessibility audit focused exclusively on QM Standard 8 (Accessibility and Usability), providing detailed findings and specific remediation guidance.

**Scope**: Read-only analysis with detailed accessibility reporting.

**Complexity**: Lower (focused scope)

---

## Skill Metadata

```yaml
name: qm-accessibility-checker
description: Comprehensive accessibility audit for Canvas courses based on QM Standard 8, WCAG guidelines, and UDL principles.
triggers:
  - "check accessibility"
  - "accessibility audit"
  - "a11y check"
  - "WCAG compliance"
  - "screen reader friendly"
```

---

## Standard 8 Deep Dive

### SRS 8.1: Course Navigation (3 pts, Essential)
**Check Points**:
- [ ] Consistent module naming convention
- [ ] "Start Here" or equivalent orientation module
- [ ] Logical content sequencing
- [ ] Clear module descriptions
- [ ] Reasonable module count (not overwhelming)

**Automated Checks**:
```python
# Module naming consistency
modules = list_modules(course_id)
naming_patterns = detect_naming_pattern(modules)
# Check for: "Week X:", "Module X:", "Unit X:", numbered, etc.

# Start Here detection
has_start_here = any(
    keyword in m.name.lower()
    for m in modules
    for keyword in ['start here', 'getting started', 'begin', 'orientation']
)
```

### SRS 8.2: Course Design/Readability (3 pts, Essential)
**Check Points**:
- [ ] Consistent heading hierarchy (H1 → H2 → H3)
- [ ] Adequate color contrast
- [ ] Readable font sizes
- [ ] Consistent formatting across pages
- [ ] Minimal use of all-caps
- [ ] Appropriate line length and spacing

**Automated Checks**:
```python
# Via scan_course_content_accessibility
accessibility_report = scan_course_content_accessibility(course_id)

# Additional HTML analysis
for page in list_pages(course_id):
    content = get_page_content(page.url)
    issues += check_heading_hierarchy(content)
    issues += check_text_formatting(content)
```

### SRS 8.3: Text Accessibility (2 pts)
**Check Points**:
- [ ] Tables used for data, not layout
- [ ] Tables have headers
- [ ] No merged cells (or properly marked)
- [ ] PDFs are text-based (not scanned images)
- [ ] Lists use proper markup

**Automated Checks**:
```python
# Table structure analysis
tables = extract_tables(page_content)
for table in tables:
    has_headers = check_table_headers(table)
    has_merged = check_merged_cells(table)

# PDF text extraction test
for file in course_files:
    if file.type == 'pdf':
        is_searchable = test_pdf_text_extraction(file)
```

### SRS 8.4: Image Accessibility (2 pts)
**Check Points**:
- [ ] All images have alt text
- [ ] Alt text is meaningful (not just filename)
- [ ] Decorative images marked as such
- [ ] Complex images have long descriptions
- [ ] Charts/graphs have text alternatives

**Automated Checks**:
```python
# Via accessibility scan
images = scan_course_content_accessibility(course_id, content_type='images')

for img in images:
    if not img.alt_text:
        issues.append(f"Missing alt text: {img.location}")
    elif img.alt_text == img.filename:
        issues.append(f"Alt text appears to be filename: {img.location}")
    elif len(img.alt_text) < 5:
        issues.append(f"Alt text may be insufficient: {img.location}")
```

### SRS 8.5: Video/Audio Accessibility (2 pts)
**Check Points**:
- [ ] Videos have captions
- [ ] Captions are accurate
- [ ] Audio has transcripts
- [ ] Synchronized captions for video

**Automated Checks**:
```python
# Detect media elements
media = detect_media_in_course(course_id)

for video in media.videos:
    # Check for caption indicators
    has_captions = (
        video.has_cc_track or
        'caption' in video.description.lower() or
        video.platform in PLATFORMS_WITH_AUTO_CAPTIONS
    )

for audio in media.audio:
    # Check for transcript references
    has_transcript = search_nearby_content(audio, ['transcript', 'text version'])
```

### SRS 8.6: Multimedia Usability (2 pts)
**Check Points**:
- [ ] Media players have controls (play, pause, volume)
- [ ] Media can be resized without quality loss
- [ ] Clear audio quality
- [ ] Video segments reasonable length (<20 min ideal)
- [ ] Cross-browser compatibility noted

**Automated Checks**:
```python
# Platform analysis
for video in media.videos:
    if video.platform in KNOWN_ACCESSIBLE_PLAYERS:
        status = "Met"
    else:
        status = "Needs verification"

    if video.duration and video.duration > 1200:  # 20 minutes
        issues.append(f"Long video ({video.duration//60} min): {video.title}")
```

### SRS 8.7: Vendor Accessibility Statements (1 pt)
**Check Points**:
- [ ] LMS accessibility statement linked
- [ ] External tool statements linked or noted
- [ ] Statement for each required technology

**Automated Checks**:
```python
# Search for accessibility statement page
pages = list_pages(course_id)
a11y_page = find_page_by_keywords(pages, [
    'accessibility', 'accessible', 'accommodations'
])

# Check for vendor links
if a11y_page:
    content = get_page_content(a11y_page)
    external_tools = get_external_tools(course_id)
    for tool in external_tools:
        if tool.name not in content:
            issues.append(f"No accessibility info for: {tool.name}")
```

---

## Report Structure

### Accessibility Score Card

```
╔═══════════════════════════════════════════════════════════════╗
║               ACCESSIBILITY AUDIT RESULTS                      ║
╠═══════════════════════════════════════════════════════════════╣
║  Course: BADM 554 - Business Analytics                        ║
║  Date: 2026-02-04                                             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  STANDARD 8 SCORE: 14 / 17 points (82%)                       ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 8.1 Navigation       ███████████░░  3/3  ✅ Essential   │  ║
║  │ 8.2 Readability      █████████░░░░  2/3  ⚠️ Essential   │  ║
║  │ 8.3 Text             ██████████░░░  2/2  ✅              │  ║
║  │ 8.4 Images           █████░░░░░░░░  1/2  ⚠️              │  ║
║  │ 8.5 Video/Audio      ██████████░░░  2/2  ✅              │  ║
║  │ 8.6 Multimedia       ██████████░░░  2/2  ✅              │  ║
║  │ 8.7 Vendor Statements████████████░  2/2  ✅              │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ISSUES FOUND: 12 total                                       ║
║  • Critical: 2  • Major: 4  • Minor: 6                        ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝
```

### Issue Detail Format

```markdown
## Issue #1: Missing Alt Text

**Severity**: Major
**Standard**: 8.4 (Images are accessible)
**Location**: Module 3 > Week 3 Overview > Page content

**Problem**:
Image "chart_q3_sales.png" has no alternative text.

**Impact**:
Screen reader users cannot understand the chart content.

**Recommendation**:
Add descriptive alt text such as: "Bar chart showing Q3 sales by region: North $2.3M, South $1.8M, East $2.1M, West $1.5M"

**WCAG Reference**: 1.1.1 Non-text Content (Level A)

**Quick Fix Available**: Yes (via qm-course-remediator)
```

---

## Canvas MCP Tools Required

### Currently Available ✅
- `scan_course_content_accessibility` - Primary accessibility scan
- `fetch_ufixit_report` - Detailed accessibility report
- `list_pages`, `get_page_content` - Content analysis
- `list_modules`, `list_module_items` - Navigation check

### High Priority Additions 🔧
- `get_media_objects` - List all video/audio in course
- `check_course_links` - Validate link accessibility
- `get_external_tools` - List LTI tools for 8.7

---

## Directory Structure

```
qm-accessibility-checker/
├── SKILL.md
├── references/
│   ├── wcag-quick-ref.md            # WCAG 2.1 key criteria
│   ├── qm-standard-8-detail.md      # Full Standard 8 requirements
│   └── accessible-platforms.md      # Known accessible video/LTI platforms
└── templates/
    ├── report-full.md
    ├── report-summary.md
    └── issue-template.md
```

---

## Usage Examples

**Full Accessibility Audit**:
> "Check accessibility for my course"

**Specific Check**:
> "Are my videos accessible?"

**Quick Scan**:
> "Quick a11y check on BADM 554"

**Image Focus**:
> "Find all images missing alt text"

---

## Integration with Other Skills

```
qm-course-auditor
       │
       │ (Includes basic 8.x checks)
       │
       ▼
qm-accessibility-checker
       │
       │ (Deep dive on issues found)
       │
       ▼
qm-course-remediator
       │
       │ (Fix identified issues)
       ▼
    COMPLIANT
```
