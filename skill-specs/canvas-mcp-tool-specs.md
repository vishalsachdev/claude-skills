# Canvas MCP - High Priority Tool Specifications

## Overview

These tool specifications address gaps identified while designing the QM evaluation skills. Each tool would significantly improve the ability to evaluate and remediate Canvas courses for Quality Matters compliance.

---

## Tool 1: check_course_links

### Purpose
Validate all links within course content and report broken, redirect, or inaccessible URLs.

### QM Standards Addressed
- **6.4**: Links are functional and maintained (2 pts)
- **4.3**: Materials are current (helps identify stale links)

### Specification

```python
def check_course_links(
    course_identifier: str,
    content_types: list[str] = ["pages", "assignments", "discussions", "syllabus"],
    check_external: bool = True,
    timeout_seconds: int = 10,
    include_redirects: bool = True
) -> LinkCheckResult:
    """
    Scan course content for links and validate their accessibility.

    Args:
        course_identifier: Course code or ID
        content_types: Which content areas to scan
        check_external: Whether to validate external URLs (slower)
        timeout_seconds: Timeout for each URL check
        include_redirects: Report URLs that redirect

    Returns:
        LinkCheckResult with categorized findings
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "scan_date": "2026-02-04T10:30:00Z",
  "total_links": 145,
  "summary": {
    "valid": 132,
    "broken": 5,
    "redirects": 6,
    "timeout": 2,
    "skipped": 0
  },
  "links": [
    {
      "url": "https://example.com/old-resource",
      "status": "broken",
      "http_code": 404,
      "location": {
        "content_type": "page",
        "content_id": "12345",
        "content_title": "Week 3 Resources",
        "link_text": "Download readings"
      },
      "suggested_action": "Remove or update link"
    },
    {
      "url": "https://old-domain.edu/article",
      "status": "redirect",
      "http_code": 301,
      "redirect_to": "https://new-domain.edu/article",
      "location": {...},
      "suggested_action": "Update to new URL"
    }
  ]
}
```

### Implementation Notes
- Use HEAD requests first, fall back to GET if needed
- Cache results within session to avoid duplicate checks
- Rate limit external requests to avoid being blocked
- Mark Canvas-internal links differently from external
- Consider async/parallel checking for performance

---

## Tool 2: get_external_tools

### Purpose
List all external tools (LTI integrations) configured in a course, including their availability and accessibility information.

### QM Standards Addressed
- **6.1**: Tools support learning objectives (3 pts, Essential)
- **6.2**: Tools promote engagement (3 pts, Essential)
- **6.3**: Technologies are current and accessible (2 pts)
- **8.7**: Vendor accessibility statements provided (1 pt)

### Specification

```python
def get_external_tools(
    course_identifier: str,
    include_account_tools: bool = True,
    include_usage: bool = False
) -> ExternalToolsResult:
    """
    List all LTI and external tools available in the course.

    Args:
        course_identifier: Course code or ID
        include_account_tools: Include institution-level tools
        include_usage: Include where each tool is used in course

    Returns:
        ExternalToolsResult with tool details
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "tools": [
    {
      "id": "12345",
      "name": "Turnitin",
      "domain": "turnitin.com",
      "tool_type": "lti_1_3",
      "privacy_level": "public",
      "status": "active",
      "accessibility_url": "https://turnitin.com/accessibility",
      "usage_locations": [
        {
          "type": "assignment",
          "id": "98765",
          "name": "Research Paper"
        }
      ]
    },
    {
      "id": "12346",
      "name": "Kaltura",
      "domain": "kaltura.com",
      "tool_type": "lti_1_1",
      "privacy_level": "name_only",
      "status": "active",
      "accessibility_url": "https://corp.kaltura.com/accessibility",
      "usage_locations": [...]
    }
  ],
  "summary": {
    "total_tools": 5,
    "with_accessibility_info": 3,
    "missing_accessibility_info": ["Custom Quiz Tool", "Lab Simulator"]
  }
}
```

### Implementation Notes
- Use Canvas External Tools API endpoint
- Cross-reference with known accessibility statement URLs
- Check both course-level and account-level tools
- Include LTI version information
- Flag tools without accessibility documentation

---

## Tool 3: search_course_content

### Purpose
Full-text search across all course content (pages, assignments, discussions, announcements, syllabus) with context snippets.

### QM Standards Addressed
- Enables efficient checking of multiple standards by searching for keywords
- **1.3**: Search for "netiquette"
- **1.5**: Search for "technology requirements"
- **7.1-7.4**: Search for support-related terms
- **8.7**: Search for "accessibility"
- General: Find policy language, objectives, etc.

### Specification

```python
def search_course_content(
    course_identifier: str,
    query: str,
    content_types: list[str] = ["all"],
    case_sensitive: bool = False,
    include_context: bool = True,
    context_chars: int = 100,
    max_results: int = 50
) -> SearchResult:
    """
    Search across all course content for matching text.

    Args:
        course_identifier: Course code or ID
        query: Search term or phrase
        content_types: Filter to specific content types
        case_sensitive: Whether to match case
        include_context: Include surrounding text
        context_chars: Characters of context on each side
        max_results: Maximum results to return

    Returns:
        SearchResult with matches and context
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "query": "netiquette",
  "total_matches": 3,
  "results": [
    {
      "content_type": "page",
      "content_id": "page-123",
      "title": "Course Policies",
      "url": "/courses/60366/pages/course-policies",
      "matches": [
        {
          "context": "...students are expected to follow netiquette guidelines when posting...",
          "position": 1542
        }
      ]
    },
    {
      "content_type": "syllabus",
      "content_id": "syllabus",
      "title": "Course Syllabus",
      "matches": [
        {
          "context": "...See the Netiquette page for communication expectations...",
          "position": 3201
        }
      ]
    }
  ]
}
```

### Implementation Notes
- Index content on first search, cache for subsequent
- Support regex patterns for advanced searches
- Handle HTML content (search visible text, not tags)
- Consider relevance ranking
- Support boolean operators (AND, OR, NOT)

---

## Tool 4: get_media_objects

### Purpose
List all video and audio content in a course, including embedded media, with accessibility metadata.

### QM Standards Addressed
- **8.5**: Video and audio content is accessible (2 pts)
- **8.6**: Multimedia is easy to use (2 pts)

### Specification

```python
def get_media_objects(
    course_identifier: str,
    media_types: list[str] = ["video", "audio"],
    include_embedded: bool = True,
    check_captions: bool = True
) -> MediaObjectsResult:
    """
    List all media objects in the course with accessibility info.

    Args:
        course_identifier: Course code or ID
        media_types: Filter by media type
        include_embedded: Include YouTube, Vimeo, etc. embeds
        check_captions: Attempt to detect caption availability

    Returns:
        MediaObjectsResult with media details
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "summary": {
    "total_videos": 12,
    "total_audio": 3,
    "with_captions": 10,
    "missing_captions": 2,
    "with_transcripts": 8
  },
  "media": [
    {
      "id": "media-123",
      "type": "video",
      "title": "Week 1 Lecture",
      "duration_seconds": 1847,
      "platform": "canvas_studio",
      "location": {
        "content_type": "page",
        "content_id": "page-456",
        "content_title": "Week 1 Overview"
      },
      "accessibility": {
        "has_captions": true,
        "caption_type": "auto-generated",
        "has_transcript": true,
        "transcript_location": "linked_below"
      }
    },
    {
      "id": "embed-789",
      "type": "video",
      "title": "External Tutorial",
      "duration_seconds": null,
      "platform": "youtube",
      "embed_url": "https://www.youtube.com/embed/abc123",
      "location": {...},
      "accessibility": {
        "has_captions": "unknown",
        "note": "Cannot verify captions for external embed"
      }
    }
  ]
}
```

### Implementation Notes
- Parse HTML for common embed patterns (YouTube, Vimeo, Kaltura, etc.)
- Check Canvas Media Gallery/Studio
- Use platform APIs to check caption status where possible
- Flag videos over 20 minutes (8.6 recommendation)
- Detect transcript links near media

---

## Tool 5: get_course_navigation

### Purpose
Retrieve course navigation settings, tab visibility, and custom ordering.

### QM Standards Addressed
- **8.1**: Course navigation is easy and intuitive (3 pts, Essential)
- **1.1**: Instructions make clear how to navigate (3 pts, Essential)

### Specification

```python
def get_course_navigation(
    course_identifier: str,
    include_hidden: bool = True
) -> CourseNavigationResult:
    """
    Get course navigation tabs and their configuration.

    Args:
        course_identifier: Course code or ID
        include_hidden: Include tabs hidden from students

    Returns:
        CourseNavigationResult with tab configuration
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "tabs": [
    {
      "id": "home",
      "label": "Home",
      "position": 1,
      "visibility": "public",
      "type": "internal"
    },
    {
      "id": "modules",
      "label": "Modules",
      "position": 2,
      "visibility": "public",
      "type": "internal"
    },
    {
      "id": "external_tool_123",
      "label": "Turnitin",
      "position": 5,
      "visibility": "public",
      "type": "external_tool",
      "url": "https://turnitin.com/lti/..."
    },
    {
      "id": "grades",
      "label": "Grades",
      "position": 10,
      "visibility": "hidden",
      "type": "internal"
    }
  ],
  "home_page_type": "modules",
  "default_view": "modules"
}
```

### Implementation Notes
- Use Canvas Tabs API
- Distinguish student view from instructor view
- Note custom tab labels vs defaults
- Include external tool tabs
- Report home page configuration

---

## Tool 6: get_learning_outcomes

### Purpose
Retrieve Canvas Learning Outcomes aligned to the course and their assignment mappings.

### QM Standards Addressed
- **2.1**: Course learning objectives describe outcomes (3 pts, Essential)
- **2.2**: Module objectives align with course objectives (3 pts, Essential)
- **2.4**: Relationship between objectives and activities stated (3 pts, Essential)
- **3.1**: Assessments measure stated objectives (3 pts, Essential)

### Specification

```python
def get_learning_outcomes(
    course_identifier: str,
    include_alignments: bool = True,
    include_results: bool = False
) -> LearningOutcomesResult:
    """
    Get learning outcomes and their alignments in the course.

    Args:
        course_identifier: Course code or ID
        include_alignments: Include assignment/rubric alignments
        include_results: Include mastery statistics (instructor only)

    Returns:
        LearningOutcomesResult with outcomes and alignments
    """
```

### Response Schema

```json
{
  "course_id": "60366",
  "outcomes": [
    {
      "id": "outcome-123",
      "title": "Data Analysis Skills",
      "description": "Students will be able to analyze datasets using statistical methods",
      "mastery_points": 3,
      "points_possible": 5,
      "calculation_method": "highest",
      "alignments": [
        {
          "type": "assignment",
          "id": "assign-456",
          "name": "Midterm Project"
        },
        {
          "type": "rubric_criterion",
          "rubric_id": "rubric-789",
          "criterion_id": "crit-012",
          "assignment_id": "assign-456"
        }
      ]
    }
  ],
  "summary": {
    "total_outcomes": 8,
    "aligned_assignments": 12,
    "unaligned_assignments": 3
  }
}
```

### Implementation Notes
- Use Canvas Outcomes API
- Include both course-level and account-level outcomes
- Map alignments to specific assignments and rubrics
- Identify assignments without outcome alignment

---

## Priority Ranking

| Priority | Tool | Impact | Effort |
|----------|------|--------|--------|
| 🔴 High | `check_course_links` | Direct SRS 6.4 automation | Medium |
| 🔴 High | `get_external_tools` | SRS 6.1-6.3, 8.7 automation | Low |
| 🟡 Medium | `search_course_content` | Accelerates many checks | Medium |
| 🟡 Medium | `get_media_objects` | SRS 8.5, 8.6 automation | Medium |
| 🟢 Lower | `get_course_navigation` | SRS 8.1 enhancement | Low |
| 🟢 Lower | `get_learning_outcomes` | SRS 2.x, 3.1 enhancement | Low |

---

## Implementation Recommendation

### Phase 1 (Immediate Value)
1. `get_external_tools` - Low effort, high impact for accessibility
2. `check_course_links` - Enables full automation of 6.4

### Phase 2 (Enhanced Analysis)
3. `search_course_content` - Speeds up keyword-based checks
4. `get_media_objects` - Completes accessibility picture

### Phase 3 (Comprehensive)
5. `get_course_navigation` - Navigation analysis
6. `get_learning_outcomes` - Objective alignment analysis
