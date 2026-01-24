#!/usr/bin/env python3
"""
Update the article cache from The Hybrid Builder sitemap (full archive).

Usage:
    python update-cache.py              # Update cache from sitemap
    python update-cache.py --search "compound engineering"  # Search articles
    python update-cache.py --list       # List all cached articles
    python update-cache.py --themes     # List articles by theme
    python update-cache.py --related "slug"  # Find related articles
    python update-cache.py --suggest "topic text"  # Suggest references for a topic
"""

import argparse
import html
import json
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

# Config
SITEMAP_URL = "https://chatwithgpt.substack.com/sitemap.xml"
BASE_URL = "https://chatwithgpt.substack.com"
SKILL_DIR = Path(__file__).parent.parent
CACHE_FILE = SKILL_DIR / "article-cache.json"
FETCH_DELAY = 0.5  # seconds between requests to be polite

# Theme keywords - articles containing these get tagged
THEME_KEYWORDS = {
    "ai-collaboration": ["claude", "ai-human", "collaboration", "partner", "co-author", "conversational development"],
    "skills": ["skill", "slash command", "/", "capability", "teach claude"],
    "mcp": ["mcp", "model context protocol", "server", "integration"],
    "teaching": ["teach", "course", "student", "education", "learning", "classroom", "canvas"],
    "compound-engineering": ["compound", "iterative", "use before improve", "loop", "refinement"],
    "context-engineering": ["context", "context window", "prompt", "engineering"],
    "automation": ["automat", "workflow", "pipeline", "script"],
    "microsim": ["microsim", "simulation", "p5.js", "interactive"],
    "research": ["research", "paper", "study", "analysis"],
}


def fetch_url(url: str, timeout: int = 15) -> str | None:
    """Fetch URL content with error handling."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ArticleCacheBot/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"  Error fetching {url}: {e}", file=sys.stderr)
        return None


def fetch_sitemap() -> list[dict]:
    """Fetch and parse sitemap, returning article URLs with metadata."""
    print(f"Fetching sitemap: {SITEMAP_URL}")
    content = fetch_url(SITEMAP_URL)
    if not content:
        return []

    # Parse XML
    root = ET.fromstring(content)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    articles = []
    for url_elem in root.findall("sm:url", ns):
        loc = url_elem.find("sm:loc", ns)
        lastmod = url_elem.find("sm:lastmod", ns)

        if loc is None:
            continue

        url = loc.text
        # Filter to only /p/ posts (articles)
        if "/p/" not in url:
            continue

        slug = url.split("/p/")[-1]
        articles.append({
            "url": url,
            "slug": slug,
            "lastmod": lastmod.text if lastmod is not None else None
        })

    print(f"  Found {len(articles)} articles in sitemap")
    return articles


def extract_article_content(html_content: str) -> dict:
    """Extract title, description, and body text from article HTML."""
    result = {"title": "", "description": "", "body_text": "", "outbound_links": []}

    # Extract title from og:title or <title>
    og_title = re.search(r'<meta[^>]*property="og:title"[^>]*content="([^"]*)"', html_content)
    if og_title:
        result["title"] = html.unescape(og_title.group(1))
    else:
        title_match = re.search(r'<title>([^<]*)</title>', html_content)
        if title_match:
            result["title"] = html.unescape(title_match.group(1).split(" - ")[0])

    # Extract description from og:description or meta description
    og_desc = re.search(r'<meta[^>]*property="og:description"[^>]*content="([^"]*)"', html_content)
    if og_desc:
        result["description"] = html.unescape(og_desc.group(1))

    # Extract publish date
    pub_date = re.search(r'<meta[^>]*property="article:published_time"[^>]*content="([^"]*)"', html_content)
    if pub_date:
        result["published"] = pub_date.group(1)

    # Extract body text (simplified - get text from article body)
    # Look for the main content div
    body_match = re.search(r'<div[^>]*class="[^"]*body[^"]*"[^>]*>(.*?)</div>\s*<div', html_content, re.DOTALL)
    if body_match:
        body_html = body_match.group(1)
        # Strip HTML tags for plain text
        body_text = re.sub(r'<[^>]+>', ' ', body_html)
        body_text = re.sub(r'\s+', ' ', body_text).strip()
        result["body_text"] = html.unescape(body_text)[:5000]  # Limit to first 5000 chars

    # Extract outbound links to other articles on same domain
    links = re.findall(r'href="(https://chatwithgpt\.substack\.com/p/[^"]+)"', html_content)
    result["outbound_links"] = list(set(links))

    return result


def extract_themes(text: str) -> list[str]:
    """Extract theme tags based on keyword presence."""
    text_lower = text.lower()
    themes = []

    for theme, keywords in THEME_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in text_lower:
                themes.append(theme)
                break

    return themes


def fetch_article_details(url: str) -> dict | None:
    """Fetch and parse a single article page."""
    content = fetch_url(url)
    if not content:
        return None

    return extract_article_content(content)


def update_cache(full_refresh: bool = False):
    """Fetch sitemap and update cache with article details."""
    sitemap_articles = fetch_sitemap()
    if not sitemap_articles:
        print("Failed to fetch sitemap", file=sys.stderr)
        return False

    # Load existing cache if available
    existing = {}
    if CACHE_FILE.exists() and not full_refresh:
        with open(CACHE_FILE) as f:
            cache = json.load(f)
            existing = {a["slug"]: a for a in cache.get("articles", [])}
        print(f"  Loaded {len(existing)} existing articles from cache")

    articles = []
    theme_index = defaultdict(list)
    link_graph = {}

    print(f"\nProcessing {len(sitemap_articles)} articles...")

    for i, sm_article in enumerate(sitemap_articles):
        slug = sm_article["slug"]
        url = sm_article["url"]
        lastmod = sm_article["lastmod"]

        # Check if we already have this article and it hasn't changed
        if slug in existing:
            cached = existing[slug]
            cached_lastmod = cached.get("lastmod")
            if cached_lastmod and lastmod and cached_lastmod >= lastmod:
                # Use cached version
                articles.append(cached)
                # Rebuild indexes
                for theme in cached.get("themes", []):
                    theme_index[theme].append(slug)
                link_graph[slug] = {
                    "references": [u.split("/p/")[-1] for u in cached.get("outbound_links", [])],
                    "referenced_by": []
                }
                continue

        # Fetch fresh content
        print(f"  [{i+1}/{len(sitemap_articles)}] Fetching: {slug[:50]}...")
        details = fetch_article_details(url)

        if details:
            # Combine text for theme extraction
            full_text = f"{details['title']} {details['description']} {details['body_text']}"
            themes = extract_themes(full_text)

            article = {
                "title": details["title"],
                "url": url,
                "slug": slug,
                "lastmod": lastmod,
                "date": details.get("published", lastmod),
                "description": details["description"],
                "excerpt": details["body_text"][:500] if details["body_text"] else "",
                "themes": themes,
                "outbound_links": details["outbound_links"],
                "word_count": len(details["body_text"].split()) if details["body_text"] else 0
            }
            articles.append(article)

            # Build indexes
            for theme in themes:
                theme_index[theme].append(slug)
            link_graph[slug] = {
                "references": [u.split("/p/")[-1] for u in details["outbound_links"]],
                "referenced_by": []
            }
        else:
            # Keep existing if fetch failed
            if slug in existing:
                articles.append(existing[slug])

        time.sleep(FETCH_DELAY)

    # Build referenced_by (reverse index)
    for slug, links in link_graph.items():
        for ref_slug in links["references"]:
            if ref_slug in link_graph:
                link_graph[ref_slug]["referenced_by"].append(slug)

    # Sort articles by date (newest first)
    articles.sort(key=lambda a: a.get("date", "") or "", reverse=True)

    # Build cache
    cache = {
        "last_updated": datetime.now().isoformat(),
        "source": "sitemap",
        "sitemap_url": SITEMAP_URL,
        "article_count": len(articles),
        "articles": articles,
        "theme_index": dict(theme_index),
        "link_graph": link_graph
    }

    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f, indent=2)

    print(f"\n✓ Cached {len(articles)} articles to {CACHE_FILE.name}")
    print(f"  Themes found: {', '.join(theme_index.keys())}")
    return True


def load_cache() -> dict | None:
    """Load the cached articles."""
    if not CACHE_FILE.exists():
        print("Cache not found. Run update-cache.py first.", file=sys.stderr)
        return None
    with open(CACHE_FILE) as f:
        return json.load(f)


def search_articles(query: str):
    """Search articles by keyword in title, description, and excerpt."""
    cache = load_cache()
    if not cache:
        return

    query_lower = query.lower()
    matches = []

    for article in cache["articles"]:
        searchable = f"{article['title']} {article['description']} {article.get('excerpt', '')}".lower()
        if query_lower in searchable:
            # Calculate relevance score
            score = 0
            if query_lower in article["title"].lower():
                score += 10
            if query_lower in article["description"].lower():
                score += 5
            score += searchable.count(query_lower)
            matches.append((score, article))

    matches.sort(key=lambda x: x[0], reverse=True)

    if matches:
        print(f"Found {len(matches)} article(s) matching '{query}':\n")
        for score, article in matches[:10]:
            themes = ", ".join(article.get("themes", [])) or "no themes"
            print(f"  [{score:2d}] {article['title']}")
            print(f"      {article['url']}")
            print(f"      Themes: {themes}")
            print()
    else:
        print(f"No articles found matching '{query}'")


def list_articles():
    """List all cached articles."""
    cache = load_cache()
    if not cache:
        return

    print(f"Articles cached: {cache['article_count']}")
    print(f"Last updated: {cache['last_updated'][:19]}")
    print(f"Source: {cache.get('source', 'unknown')}")
    print()

    for i, article in enumerate(cache["articles"], 1):
        date = article.get("date", "")[:10] if article.get("date") else "Unknown"
        themes = ", ".join(article.get("themes", []))
        print(f"{i:2}. [{date}] {article['title']}")
        if themes:
            print(f"    Themes: {themes}")
        print()


def list_by_theme():
    """List articles grouped by theme."""
    cache = load_cache()
    if not cache:
        return

    theme_index = cache.get("theme_index", {})
    if not theme_index:
        print("No theme index found. Run update with --full to rebuild.")
        return

    # Create slug->article lookup
    by_slug = {a["slug"]: a for a in cache["articles"]}

    for theme, slugs in sorted(theme_index.items()):
        print(f"\n## {theme} ({len(slugs)} articles)")
        for slug in slugs:
            if slug in by_slug:
                print(f"  - {by_slug[slug]['title']}")


def find_related(slug: str):
    """Find articles related to a given article slug."""
    cache = load_cache()
    if not cache:
        return

    link_graph = cache.get("link_graph", {})
    by_slug = {a["slug"]: a for a in cache["articles"]}

    if slug not in link_graph:
        print(f"Article '{slug}' not found in cache")
        return

    article = by_slug.get(slug)
    if article:
        print(f"Article: {article['title']}\n")

    refs = link_graph[slug]

    if refs["references"]:
        print("References (articles this one links to):")
        for ref in refs["references"]:
            if ref in by_slug:
                print(f"  → {by_slug[ref]['title']}")
                print(f"    {by_slug[ref]['url']}")

    if refs["referenced_by"]:
        print("\nReferenced by (articles that link to this one):")
        for ref in refs["referenced_by"]:
            if ref in by_slug:
                print(f"  ← {by_slug[ref]['title']}")
                print(f"    {by_slug[ref]['url']}")

    # Also find thematically related
    if article and article.get("themes"):
        theme_index = cache.get("theme_index", {})
        related_slugs = set()
        for theme in article["themes"]:
            related_slugs.update(theme_index.get(theme, []))
        related_slugs.discard(slug)

        if related_slugs:
            print(f"\nThematically related ({', '.join(article['themes'])}):")
            for rel_slug in list(related_slugs)[:5]:
                if rel_slug in by_slug:
                    print(f"  ~ {by_slug[rel_slug]['title']}")


def suggest_references(topic: str):
    """Suggest relevant articles to reference for a given topic."""
    cache = load_cache()
    if not cache:
        return

    topic_lower = topic.lower()
    scored = []

    for article in cache["articles"]:
        score = 0
        reasons = []

        # Check title match
        if any(word in article["title"].lower() for word in topic_lower.split()):
            score += 10
            reasons.append("title match")

        # Check description match
        if any(word in article["description"].lower() for word in topic_lower.split()):
            score += 5
            reasons.append("description match")

        # Check excerpt match
        excerpt = article.get("excerpt", "").lower()
        matching_words = sum(1 for word in topic_lower.split() if word in excerpt)
        if matching_words:
            score += matching_words * 2
            reasons.append(f"{matching_words} keyword matches")

        # Check theme overlap
        topic_themes = extract_themes(topic)
        shared_themes = set(topic_themes) & set(article.get("themes", []))
        if shared_themes:
            score += len(shared_themes) * 3
            reasons.append(f"themes: {', '.join(shared_themes)}")

        if score > 0:
            scored.append((score, reasons, article))

    scored.sort(key=lambda x: x[0], reverse=True)

    print(f"Reference suggestions for: '{topic}'\n")
    print("=" * 60)

    for score, reasons, article in scored[:5]:
        print(f"\n[{score:2d}] {article['title']}")
        print(f"    URL: {article['url']}")
        print(f"    Why: {'; '.join(reasons)}")

        # Suggest phrasing based on relationship
        themes = article.get("themes", [])
        if "compound-engineering" in themes:
            print(f"    Phrasing: \"Building on the compound engineering loop I described in...\"")
        elif "skills" in themes:
            print(f"    Phrasing: \"This extends the skill-building approach from...\"")
        elif "teaching" in themes:
            print(f"    Phrasing: \"Similar to my teaching experiments in...\"")
        else:
            print(f"    Phrasing: \"As I explored in...\" or \"Related: ...\"")


def main():
    parser = argparse.ArgumentParser(
        description="Manage The Hybrid Builder article cache (full archive via sitemap)"
    )
    parser.add_argument('--search', '-s', help="Search articles by keyword")
    parser.add_argument('--list', '-l', action='store_true', help="List all cached articles")
    parser.add_argument('--themes', '-t', action='store_true', help="List articles by theme")
    parser.add_argument('--related', '-r', help="Find articles related to a slug")
    parser.add_argument('--suggest', help="Suggest references for a topic")
    parser.add_argument('--full', '-f', action='store_true', help="Force full refresh (ignore cache)")

    args = parser.parse_args()

    if args.search:
        search_articles(args.search)
    elif args.list:
        list_articles()
    elif args.themes:
        list_by_theme()
    elif args.related:
        find_related(args.related)
    elif args.suggest:
        suggest_references(args.suggest)
    else:
        update_cache(full_refresh=args.full)


if __name__ == "__main__":
    main()
