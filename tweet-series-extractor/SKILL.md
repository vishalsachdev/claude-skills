---
name: tweet-series-extractor
description: |
  Extract tweet series from X/Twitter profiles with full content, links, and engagement metrics.
  Use when: (1) User provides a tweet URL and wants similar tweets by the same author,
  (2) User asks to "extract tweets", "collect tweet series", or "scrape tweets",
  (3) User wants to analyze a user's recurring tweet format (e.g., daily updates, weekly roundups),
  (4) User needs tweet content with embedded links preserved for analysis.
  Requires Chrome browser automation tools (mcp__claude-in-chrome__*).
---

# Tweet Series Extractor

Extract recurring tweet series from X/Twitter with content, links, and engagement metrics.

## Prerequisites

Load Chrome tools before use:
```
ToolSearch: select:mcp__claude-in-chrome__tabs_context_mcp
ToolSearch: select:mcp__claude-in-chrome__navigate
ToolSearch: select:mcp__claude-in-chrome__get_page_text
ToolSearch: select:mcp__claude-in-chrome__read_page
ToolSearch: select:mcp__claude-in-chrome__javascript_tool
```

## Workflow

### 1. Initialize Browser
```
mcp__claude-in-chrome__tabs_context_mcp(createIfEmpty: true)
```

### 2. Navigate to Seed Tweet
```
mcp__claude-in-chrome__navigate(url: "https://x.com/username/status/ID", tabId: <id>)
```

### 3. Extract Tweet Content
```
mcp__claude-in-chrome__get_page_text(tabId: <id>)
```
Returns: Title, URL, full article text, engagement metrics inline.

### 4. Extract Links from Tweet
```javascript
// Use javascript_tool with this code:
var links = [];
document.querySelectorAll('article a').forEach(function(a) {
  if (a.href && a.href.length > 10) links.push(a.href);
});
links.slice(4, 50).join(' | ')
```
- `slice(4, 50)` skips profile/header links
- Returns pipe-separated URLs

### 5. Find Similar Tweets on Profile
Navigate to profile and scroll:
```
mcp__claude-in-chrome__navigate(url: "https://x.com/username", tabId: <id>)
mcp__claude-in-chrome__javascript_tool(text: "window.scrollBy(0, 2000); 'scrolled'")
mcp__claude-in-chrome__read_page(tabId: <id>, depth: 12)
```

Look for articles with matching title patterns (e.g., "Welcome to [Date]").
Extract tweet URLs from `href="/username/status/ID"` links.

### 6. Collect Each Tweet
For each found tweet URL, repeat steps 2-4.

## Parsing Engagement Metrics

Metrics appear in page text after the timestamp:
```
6:12 AM · Jan 24, 2026·33.7K Views
80 68 594 163
```
Format: `replies reposts likes bookmarks`

Also found in group elements:
```
group "80 replies, 68 reposts, 594 likes, 163 bookmarks, 33738 views"
```

## Output JSON Structure

```json
{
  "author": {
    "name": "Display Name",
    "handle": "@username",
    "profile_url": "https://x.com/username"
  },
  "series": "Pattern description",
  "collected_at": "YYYY-MM-DD",
  "tweets": [
    {
      "date": "Month DD, YYYY",
      "url": "https://x.com/username/status/ID",
      "engagement": {
        "replies": 0,
        "reposts": 0,
        "likes": 0,
        "bookmarks": 0,
        "views": 0
      },
      "content": "Full tweet text...",
      "links": [
        {"text": "anchor text", "url": "https://..."}
      ]
    }
  ]
}
```

## Tips

- Scroll profile multiple times to load more tweets
- Tweet URLs follow pattern: `/username/status/ID`
- Articles are X's long-form format with embedded links
- Use `read_page` with `depth: 12` for full tweet visibility
- Parse link text from the `generic` elements near link refs
