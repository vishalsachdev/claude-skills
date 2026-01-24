# Vis-Network Data Format Reference

This document provides comprehensive reference documentation for the vis-network compatible data format used by the infographic-generator-p5 skill.  The skill reads these files to place items with hovers on the drawing area
of the screen.

## Overview

The infographic-generator-p5 skill reads data from a `data.json` file that follows the vis-network library format. This format is widely used for network visualizations and ensures compatibility with other visualization tools.

## JSON Structure

The data file has four main sections:

```json
{
  "metadata": { ... },
  "groups": { ... },
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

## Metadata Section

Optional metadata about the infographic:

```json
"metadata": {
  "title": "string - Title of the infographic",
  "description": "string - Brief description",
  "author": "string - Creator name",
  "created": "string - Creation date (YYYY-MM-DD)",
  "subject": "string - Subject area or topic",
  "version": "string - Version number"
}
```

## Groups Section

Groups define default styling for categories of nodes. Each group has a unique identifier as the key:

```json
"groups": {
  "group-id": {
    "color": "string - Fill color (hex or named)",
    "borderColor": "string - Border color (hex or named)",
    "shape": "string - Default shape type"
  }
}
```

### Supported Group Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| color | string | Node fill color | "#FF6B6B" or "red" |
| borderColor | string | Node border color | "#C92A2A" or "darkred" |
| shape | string | Node shape type | "ellipse", "box", "diamond" |

### Example Groups

```json
"groups": {
  "foundation": {
    "color": "#FF6B6B",
    "borderColor": "#C92A2A",
    "shape": "ellipse"
  },
  "intermediate": {
    "color": "#4ECDC4",
    "borderColor": "#0B7285",
    "shape": "box"
  },
  "advanced": {
    "color": "#95E1D3",
    "borderColor": "#087F5B",
    "shape": "diamond"
  }
}
```

## Nodes Section

Nodes represent individual concepts or entities in the infographic. Each node is an object in the `nodes` array.

### Required Node Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| id | number | Unique identifier | 1 |
| label | string | Display text (max 30 chars) | "Core Concept" |
| x | number | X position in pixels | 400 |
| y | number | Y position in pixels | 100 |
| shortDescription | string | Tooltip text (one sentence) | "Brief description" |
| fullDescription | string | Detail panel text (paragraph) | "Full explanation..." |

### Optional Node Properties

| Property | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| group | string | "default" | Group identifier for styling | "foundation" |
| shape | string | "ellipse" | Node shape | "box", "diamond", "circle" |
| color | string | group default | Fill color | "#97C2FC" |
| borderColor | string | group default | Border color | "#2B7CE9" |
| borderWidth | number | 2 | Border thickness | 3 |
| size | number | 40 | Node radius/size | 50 |
| icon | string | null | Icon identifier (future) | "book" |

### Supported Node Shapes

- **ellipse** - Oval/circular shape (default)
- **circle** - Perfect circle
- **box** - Rectangle/square
- **square** - Perfect square
- **diamond** - Four-pointed diamond
- **triangle** - Equilateral triangle pointing up

### Example Node

```json
{
  "id": 1,
  "label": "Core Concept",
  "group": "foundation",
  "x": 400,
  "y": 100,
  "size": 45,
  "shape": "ellipse",
  "color": "#FF6B6B",
  "borderColor": "#C92A2A",
  "borderWidth": 2,
  "shortDescription": "The foundational idea upon which everything builds",
  "fullDescription": "This is the core concept that serves as the foundation for all other related ideas. Understanding this concept is essential before moving to more advanced topics."
}
```

### Node Description Guidelines

**shortDescription** (for tooltips):
- Single sentence
- 40-80 characters recommended
- No HTML formatting
- Concise and informative
- Example: "The foundational principle of the system"

**fullDescription** (for detail panel):
- 1-3 paragraphs
- Can include HTML links: `<a href='url'>text</a>`
- Explain significance and relationships
- Provide context and learning guidance
- Example: "This concept represents the fundamental principle that... It connects to other ideas by... Students should understand..."

## Edges Section

Edges represent relationships or connections between nodes. Each edge is an object in the `edges` array.

### Required Edge Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| from | number | Source node ID | 1 |
| to | number | Target node ID | 2 |

### Optional Edge Properties

| Property | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| label | string | "" | Text label for edge | "builds on" |
| color | string | "#848484" | Line color | "#999999" |
| width | number | 1 | Line thickness | 2 |
| dashes | boolean | false | Use dashed line | true |
| smooth | object | continuous | Curve type | `{"type": "curvedCW"}` |

### Edge Smooth Types

The `smooth` property controls edge curvature:

```json
// Straight line (default)
"smooth": { "type": "continuous", "roundness": 0 }

// Curved clockwise
"smooth": { "type": "curvedCW", "roundness": 0.5 }

// Curved counter-clockwise
"smooth": { "type": "curvedCCW", "roundness": 0.5 }
```

### Example Edges

```json
[
  {
    "from": 1,
    "to": 2,
    "label": "builds on",
    "color": "#999999",
    "width": 2,
    "smooth": { "type": "continuous" }
  },
  {
    "from": 2,
    "to": 3,
    "label": "leads to",
    "color": "#666666",
    "width": 1.5,
    "smooth": { "type": "curvedCW" }
  },
  {
    "from": 3,
    "to": 4,
    "label": "informs",
    "color": "#AAAAAA",
    "width": 1,
    "dashes": true
  }
]
```

## Color Guidelines

### Recommended Color Palettes

**Foundation Concepts (Warm Colors):**
- Red: #FF6B6B, border: #C92A2A
- Orange: #FF922B, border: #E67700
- Pink: #F06595, border: #C2255C

**Intermediate Concepts (Cool Colors):**
- Teal: #4ECDC4, border: #0B7285
- Blue: #74C0FC, border: #1971C2
- Cyan: #66D9E8, border: #0C8599

**Advanced Concepts (Green/Purple):**
- Green: #95E1D3, border: #087F5B
- Lime: #A9E34B, border: #5C940D
- Purple: #B197FC, border: #6741D9

### Color Contrast

Ensure sufficient contrast between:
- Node fill color and border color (3:1 ratio minimum)
- Node color and label text (4.5:1 ratio minimum)
- Edge color and background (3:1 ratio minimum)

## Layout Guidelines

### Positioning Nodes

**Coordinate System:**
- Origin (0,0) is top-left corner
- X increases to the right
- Y increases downward
- Recommended canvas: 800x600 drawing area

**Layout Patterns:**

**Hierarchical (Top-to-Bottom):**
```
Level 1:    y = 100
Level 2:    y = 250
Level 3:    y = 400
Level 4:    y = 550
```

**Radial (Circular):**
```javascript
// Center at (400, 300), radius 200
x = centerX + radius * cos(angle)
y = centerY + radius * sin(angle)
```

**Grid:**
```
Row 1:      y = 100, 200, 300, 400, 500
Row 2:      y = 250, ...
Row 3:      y = 400, ...
```

### Spacing Recommendations

- **Minimum node spacing**: 100 pixels (center to center)
- **Comfortable spacing**: 150-200 pixels
- **Edge margins**: 50 pixels from canvas edges
- **Label clearance**: 30 pixels below nodes

## Complete Example

```json
{
  "metadata": {
    "title": "Learning Path: Web Development",
    "description": "Progressive skill development for web developers",
    "author": "Education Team",
    "created": "2025-01-09",
    "subject": "Computer Science"
  },
  "groups": {
    "basics": {
      "color": "#FF6B6B",
      "borderColor": "#C92A2A",
      "shape": "ellipse"
    },
    "frontend": {
      "color": "#4ECDC4",
      "borderColor": "#0B7285",
      "shape": "box"
    },
    "backend": {
      "color": "#95E1D3",
      "borderColor": "#087F5B",
      "shape": "diamond"
    }
  },
  "nodes": [
    {
      "id": 1,
      "label": "HTML Basics",
      "group": "basics",
      "x": 200,
      "y": 100,
      "shortDescription": "Fundamental structure of web pages",
      "fullDescription": "HTML (HyperText Markup Language) provides the structural foundation for all web pages. Learn to create semantic markup using elements like headings, paragraphs, lists, and links."
    },
    {
      "id": 2,
      "label": "CSS Styling",
      "group": "basics",
      "x": 400,
      "y": 100,
      "shortDescription": "Visual design and layout control",
      "fullDescription": "CSS (Cascading Style Sheets) controls the visual presentation of HTML. Master selectors, properties, layouts (flexbox, grid), and responsive design principles."
    },
    {
      "id": 3,
      "label": "JavaScript",
      "group": "frontend",
      "x": 600,
      "y": 100,
      "shortDescription": "Interactive behavior and logic",
      "fullDescription": "JavaScript adds interactivity to web pages. Learn variables, functions, DOM manipulation, events, and modern ES6+ features for building dynamic user interfaces."
    },
    {
      "id": 4,
      "label": "React Framework",
      "group": "frontend",
      "x": 400,
      "y": 300,
      "shortDescription": "Component-based UI development",
      "fullDescription": "React is a popular library for building user interfaces using reusable components. Learn hooks, state management, props, and component lifecycle to create sophisticated web applications."
    },
    {
      "id": 5,
      "label": "Node.js Backend",
      "group": "backend",
      "x": 600,
      "y": 300,
      "shortDescription": "Server-side JavaScript runtime",
      "fullDescription": "Node.js enables JavaScript on the server. Build RESTful APIs, handle databases, manage authentication, and create full-stack applications using a unified language."
    }
  ],
  "edges": [
    {
      "from": 1,
      "to": 2,
      "label": "style with",
      "color": "#999999",
      "width": 2
    },
    {
      "from": 2,
      "to": 3,
      "label": "enhance with",
      "color": "#999999",
      "width": 2
    },
    {
      "from": 1,
      "to": 4,
      "label": "required for",
      "color": "#666666",
      "width": 1.5
    },
    {
      "from": 2,
      "to": 4,
      "label": "required for",
      "color": "#666666",
      "width": 1.5
    },
    {
      "from": 3,
      "to": 4,
      "label": "builds on",
      "color": "#666666",
      "width": 1.5
    },
    {
      "from": 3,
      "to": 5,
      "label": "extends to",
      "color": "#666666",
      "width": 1.5
    }
  ]
}
```

## Validation Checklist

Before deploying an infographic, verify:

- ✅ All node IDs are unique positive integers
- ✅ All edge `from` and `to` IDs reference existing nodes
- ✅ Node coordinates place all nodes within canvas bounds (0-800, 0-600)
- ✅ Labels are under 30 characters
- ✅ shortDescription exists for every node (for tooltips)
- ✅ fullDescription exists for every node (for detail panel)
- ✅ Colors use valid hex (#RRGGBB) or named colors
- ✅ Groups referenced by nodes are defined in groups section
- ✅ JSON syntax is valid (use JSONLint or similar)

## Tips and Best Practices

### Content Design

1. **Keep labels concise**: 15-25 characters ideal
2. **Write clear tooltips**: One complete sentence
3. **Provide context in descriptions**: Explain why it matters, not just what it is
4. **Use consistent terminology**: Align with course vocabulary

### Visual Design

1. **Limit groups to 5-7**: More becomes visually confusing
2. **Use color meaningfully**: Group by level, category, or theme
3. **Maintain visual hierarchy**: Size can indicate importance
4. **Avoid edge crossings**: Plan layout to minimize overlaps

### Technical

1. **Test with small datasets first**: Start with 5-10 nodes
2. **Validate JSON**: Use online validators before loading
3. **Check browser console**: Look for parsing errors
4. **Scale gradually**: Add complexity incrementally

## Related Resources

- vis-network documentation: https://visjs.github.io/vis-network/docs/network/
- Color accessibility checker: https://webaim.org/resources/contrastchecker/
- JSON validator: https://jsonlint.com/
- p5.js reference: https://p5js.org/reference/
