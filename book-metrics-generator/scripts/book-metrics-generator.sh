#!/bin/bash

# book-metrics-generator.sh
# Generates comprehensive metrics for intelligent textbooks
#
# This script is a wrapper that calls the Python book-metrics.py program
# to generate two markdown files:
#   - docs/learning-graph/book-metrics.md (overall book metrics)
#   - docs/learning-graph/chapter-metrics.md (chapter-by-chapter metrics)
#
# Usage:
#   ./book-metrics-generator.sh [docs_directory]
#
# If no directory is specified, defaults to "docs"

set -e  # Exit on error

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get docs directory from command line or use default
DOCS_DIR="${1:-docs}"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "❌ Error: Directory '$DOCS_DIR' does not exist"
    exit 1
fi

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 is not installed"
    exit 1
fi

# Run the Python program
echo "🚀 Generating book metrics for: $DOCS_DIR"
python3 "$SCRIPT_DIR/book-metrics.py" "$DOCS_DIR"

echo ""
echo "✅ Metrics files generated:"
echo "   - $DOCS_DIR/learning-graph/book-metrics.md"
echo "   - $DOCS_DIR/learning-graph/chapter-metrics.md"
