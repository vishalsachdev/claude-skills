// Interactive Infographic Template
// This template demonstrates the core structure for creating
// data-driven infographics with hover interactions

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 600;               // Drawing area height
let controlHeight = 120;            // Detail display area height
let canvasHeight = drawHeight + controlHeight;
let margin = 20;                    // Margin for visual elements
let defaultTextSize = 16;           // Base text size

// Data variables
let infographicData;
let nodes = [];
let edges = [];
let groups = {};
let hoveredNode = null;

function preload() {
  infographicData = loadJSON('data.json');
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Parse data from JSON
  parseData();

  describe('Interactive infographic showing concept relationships', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  rect(0, 0, width, drawHeight);

  // Detail display area background
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Draw edges first (behind nodes)
  drawEdges();

  // Draw nodes
  drawNodes();

  // Draw tooltip if hovering over a node
  drawTooltip();

  // Draw detail panel for hovered node
  drawDetailPanel();
}

function parseData() {
  // Parse groups
  if (infographicData.groups) {
    groups = infographicData.groups;
  }

  // Parse nodes
  nodes = infographicData.nodes.map(n => ({
    id: n.id,
    label: n.label || '',
    x: n.x || 0,
    y: n.y || 0,
    group: n.group || 'default',
    shortDescription: n.shortDescription || '',
    fullDescription: n.fullDescription || '',
    shape: n.shape || (groups[n.group]?.shape || 'ellipse'),
    color: n.color || (groups[n.group]?.color || '#97C2FC'),
    borderColor: n.borderColor || (groups[n.group]?.borderColor || '#2B7CE9'),
    borderWidth: n.borderWidth || 2,
    size: n.size || 40,
    icon: n.icon || null
  }));

  // Parse edges
  edges = infographicData.edges.map(e => ({
    from: e.from,
    to: e.to,
    label: e.label || '',
    color: e.color || '#848484',
    width: e.width || 1,
    dashes: e.dashes || false,
    smooth: e.smooth || { type: 'continuous', roundness: 0.5 }
  }));
}

function drawNodes() {
  hoveredNode = null;

  for (let node of nodes) {
    // Check if mouse is hovering over this node
    let d = dist(mouseX, mouseY, node.x, node.y);
    let isHovered = d < node.size;

    if (isHovered && mouseY < drawHeight) {
      hoveredNode = node;
    }

    // Draw node shape
    push();
    stroke(node.borderColor);
    strokeWeight(isHovered ? node.borderWidth + 1 : node.borderWidth);
    fill(node.color);

    if (node.shape === 'ellipse' || node.shape === 'circle') {
      ellipse(node.x, node.y, node.size * 2);
    } else if (node.shape === 'box' || node.shape === 'square') {
      rectMode(CENTER);
      rect(node.x, node.y, node.size * 1.8, node.size * 1.8);
    } else if (node.shape === 'diamond') {
      drawDiamond(node.x, node.y, node.size);
    } else if (node.shape === 'triangle') {
      drawTriangle(node.x, node.y, node.size);
    }

    pop();

    // Draw label below node
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(node.label, node.x, node.y + node.size + 15);
  }
}

function drawDiamond(x, y, size) {
  beginShape();
  vertex(x, y - size);           // top
  vertex(x + size, y);           // right
  vertex(x, y + size);           // bottom
  vertex(x - size, y);           // left
  endShape(CLOSE);
}

function drawTriangle(x, y, size) {
  beginShape();
  vertex(x, y - size);                    // top
  vertex(x + size * 0.866, y + size/2);   // bottom right
  vertex(x - size * 0.866, y + size/2);   // bottom left
  endShape(CLOSE);
}

function drawEdges() {
  for (let edge of edges) {
    let fromNode = nodes.find(n => n.id === edge.from);
    let toNode = nodes.find(n => n.id === edge.to);

    if (!fromNode || !toNode) continue;

    push();
    stroke(edge.color);
    strokeWeight(edge.width);

    if (edge.dashes) {
      drawingContext.setLineDash([5, 5]);
    }

    // Draw curved or straight line based on smooth parameter
    if (edge.smooth && edge.smooth.type === 'curvedCW') {
      // Draw curved line clockwise
      noFill();
      let controlX = (fromNode.x + toNode.x) / 2 + 50;
      let controlY = (fromNode.y + toNode.y) / 2;
      bezier(fromNode.x, fromNode.y, controlX, controlY,
             controlX, controlY, toNode.x, toNode.y);
    } else if (edge.smooth && edge.smooth.type === 'curvedCCW') {
      // Draw curved line counter-clockwise
      noFill();
      let controlX = (fromNode.x + toNode.x) / 2 - 50;
      let controlY = (fromNode.y + toNode.y) / 2;
      bezier(fromNode.x, fromNode.y, controlX, controlY,
             controlX, controlY, toNode.x, toNode.y);
    } else {
      // Draw straight line
      line(fromNode.x, fromNode.y, toNode.x, toNode.y);
    }

    drawingContext.setLineDash([]);
    pop();

    // Draw edge label if exists
    if (edge.label) {
      let midX = (fromNode.x + toNode.x) / 2;
      let midY = (fromNode.y + toNode.y) / 2;

      // Background for label readability
      push();
      fill(255, 255, 255, 200);
      noStroke();
      textSize(12);
      let labelWidth = textWidth(edge.label) + 8;
      rectMode(CENTER);
      rect(midX, midY, labelWidth, 18, 3);
      pop();

      // Label text
      fill(100);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      text(edge.label, midX, midY);
    }
  }
}

function drawTooltip() {
  if (!hoveredNode || mouseY >= drawHeight) return;

  let tooltipText = hoveredNode.shortDescription;
  if (!tooltipText) return;

  // Measure tooltip dimensions
  textSize(14);
  let tooltipWidth = textWidth(tooltipText) + 20;
  let tooltipHeight = 30;
  let padding = 10;

  // Position tooltip near mouse, but keep within drawing bounds
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - 20;

  // Adjust if tooltip would go off right edge
  if (tooltipX + tooltipWidth > width - padding) {
    tooltipX = mouseX - tooltipWidth - 15;
  }

  // Adjust if tooltip would go off left edge
  if (tooltipX < padding) {
    tooltipX = padding;
  }

  // Adjust if tooltip would go off top edge
  if (tooltipY < padding) {
    tooltipY = mouseY + 20;
  }

  // Adjust if tooltip would go off bottom of drawing area
  if (tooltipY + tooltipHeight > drawHeight - padding) {
    tooltipY = drawHeight - tooltipHeight - padding;
  }

  // Draw tooltip background
  push();
  fill(255, 255, 220);
  stroke(150);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);

  // Draw tooltip text
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text(tooltipText, tooltipX + 10, tooltipY + tooltipHeight / 2);
  pop();
}

function drawDetailPanel() {
  push();
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(defaultTextSize);

  let panelX = margin;
  let panelY = drawHeight + 10;
  let panelWidth = width - 2 * margin;

  if (hoveredNode) {
    // Display node label as header
    textSize(18);
    textStyle(BOLD);
    text(hoveredNode.label, panelX, panelY);

    // Display full description
    textSize(defaultTextSize);
    textStyle(NORMAL);

    // Note: p5.js doesn't render HTML, so strip tags for display
    let displayText = hoveredNode.fullDescription.replace(/<[^>]*>/g, '');

    // Wrap text to fit panel width
    let words = displayText.split(' ');
    let line = '';
    let y = panelY + 25;

    for (let word of words) {
      let testLine = line + word + ' ';
      if (textWidth(testLine) > panelWidth && line.length > 0) {
        text(line, panelX, y);
        line = word + ' ';
        y += 20;
        // Stop if we run out of space in the control panel
        if (y > drawHeight + controlHeight - 10) break;
      } else {
        line = testLine;
      }
    }
    if (y <= drawHeight + controlHeight - 10) {
      text(line, panelX, y);
    }
  } else {
    // Default message when nothing is hovered
    textStyle(ITALIC);
    fill(100);
    text('Hover over a concept to see details...', panelX, panelY);
  }

  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
