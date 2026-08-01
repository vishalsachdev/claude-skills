#!/usr/bin/env python3
"""Normalize categorical eval scores to 0-1 range and produce summary statistics.

Usage:
    python normalize_scores.py <scores.jsonl> [--rubric <rubric.json>]

Input: JSONL file where each line has at minimum: {"id": "...", "grade": "A"}
Output: Prints normalized scores and aggregate statistics to stdout.

If --rubric is provided, uses custom grade-to-score mapping from the rubric file.
Otherwise uses the default 3-level mapping: A=1.0, B=0.5, C=0.0.
"""

import json
import sys
import argparse
from pathlib import Path

DEFAULT_MAPPING = {"A": 1.0, "B": 0.5, "C": 0.0}

FIVE_LEVEL_MAPPING = {"A": 1.0, "B": 0.75, "C": 0.5, "D": 0.25, "F": 0.0}


def load_rubric(rubric_path: str) -> dict[str, float]:
    """Load grade-to-score mapping from a rubric JSON file."""
    with open(rubric_path) as f:
        rubric = json.load(f)

    mapping = {}
    if "categories" in rubric:
        for grade, info in rubric["categories"].items():
            mapping[grade] = info["score"] if isinstance(info, dict) else info
    elif "dimensions" in rubric:
        # Multi-dimension: use first dimension's categories as default
        first_dim = rubric["dimensions"][0]
        mapping = first_dim["categories"]
    else:
        mapping = rubric  # Assume flat mapping

    return mapping


def normalize(scores_path: str, mapping: dict[str, float]) -> list[dict]:
    """Read scores JSONL and normalize grades to 0-1."""
    results = []
    with open(scores_path) as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError:
                print(f"Warning: skipping malformed line {line_num}", file=sys.stderr)
                continue

            grade = record.get("grade", "").upper()
            if grade not in mapping:
                print(
                    f"Warning: unknown grade '{grade}' on line {line_num}, skipping",
                    file=sys.stderr,
                )
                continue

            record["normalized_score"] = mapping[grade]
            results.append(record)

    return results


def summarize(results: list[dict]) -> dict:
    """Compute aggregate statistics."""
    if not results:
        return {"count": 0, "mean": 0.0, "min": 0.0, "max": 0.0, "distribution": {}}

    scores = [r["normalized_score"] for r in results]
    grades = [r.get("grade", "?") for r in results]

    distribution = {}
    for g in grades:
        distribution[g] = distribution.get(g, 0) + 1

    return {
        "count": len(scores),
        "mean": round(sum(scores) / len(scores), 3),
        "min": min(scores),
        "max": max(scores),
        "distribution": distribution,
    }


def main():
    parser = argparse.ArgumentParser(description="Normalize eval scores to 0-1")
    parser.add_argument("scores", help="Path to scores JSONL file")
    parser.add_argument("--rubric", help="Path to rubric JSON file (optional)")
    parser.add_argument(
        "--output", help="Write normalized JSONL to file (default: stdout)"
    )
    args = parser.parse_args()

    if not Path(args.scores).exists():
        print(f"Error: {args.scores} not found", file=sys.stderr)
        sys.exit(1)

    # Load mapping
    if args.rubric:
        mapping = load_rubric(args.rubric)
    else:
        mapping = DEFAULT_MAPPING

    # Normalize
    results = normalize(args.scores, mapping)

    # Summary
    stats = summarize(results)
    print(f"\n=== Eval Summary ===", file=sys.stderr)
    print(f"Total scored: {stats['count']}", file=sys.stderr)
    print(f"Mean score:   {stats['mean']}", file=sys.stderr)
    print(f"Min/Max:      {stats['min']} / {stats['max']}", file=sys.stderr)
    print(f"Distribution: {stats['distribution']}", file=sys.stderr)

    # Output normalized results
    output = sys.stdout
    if args.output:
        output = open(args.output, "w")

    for r in results:
        print(json.dumps(r), file=output)

    if args.output:
        output.close()
        print(f"\nNormalized scores written to {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
