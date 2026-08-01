# Scoring Rubric Templates

## Binary Rubric (Pass/Fail)

Use for factual correctness, constraint adherence, or safety checks.

```json
{
  "rubric_type": "binary",
  "categories": {
    "A": { "label": "Pass", "score": 1.0, "criteria": "Output meets all specified requirements" },
    "C": { "label": "Fail", "score": 0.0, "criteria": "Output fails one or more requirements" }
  }
}
```

## Three-Level Rubric (Standard)

Use for most quality evaluations. The default choice.

```json
{
  "rubric_type": "categorical_3",
  "categories": {
    "A": { "label": "Excellent", "score": 1.0, "criteria": "Fully correct, well-structured, addresses all aspects of the input" },
    "B": { "label": "Partial", "score": 0.5, "criteria": "Partially correct or missing key elements, but demonstrates understanding" },
    "C": { "label": "Poor", "score": 0.0, "criteria": "Incorrect, off-topic, harmful, or fails to address the input" }
  }
}
```

## Five-Level Rubric (Granular)

Use when fine-grained quality distinctions matter (e.g., content generation, summarization).

```json
{
  "rubric_type": "categorical_5",
  "categories": {
    "A": { "label": "Excellent", "score": 1.0, "criteria": "Exceptional quality, exceeds expectations on all dimensions" },
    "B": { "label": "Good", "score": 0.75, "criteria": "Meets expectations with minor issues" },
    "C": { "label": "Adequate", "score": 0.5, "criteria": "Acceptable but with notable gaps or weaknesses" },
    "D": { "label": "Below Average", "score": 0.25, "criteria": "Significant issues that undermine usefulness" },
    "F": { "label": "Unacceptable", "score": 0.0, "criteria": "Fails to meet minimum quality standards" }
  }
}
```

## Multi-Dimension Rubric

Use when evaluating multiple independent quality axes. Final score = weighted average.

```json
{
  "rubric_type": "multi_dimension",
  "dimensions": [
    {
      "name": "Correctness",
      "weight": 0.4,
      "categories": { "A": 1.0, "B": 0.5, "C": 0.0 }
    },
    {
      "name": "Completeness",
      "weight": 0.3,
      "categories": { "A": 1.0, "B": 0.5, "C": 0.0 }
    },
    {
      "name": "Style",
      "weight": 0.3,
      "categories": { "A": 1.0, "B": 0.5, "C": 0.0 }
    }
  ]
}
```

## Scorer Output Format

Every scorer invocation must return this structure:

```json
{
  "input_id": "test_001",
  "grade": "B",
  "score": 0.5,
  "rationale": "The response correctly identified the main topic but omitted the secondary constraint about format. The reasoning was sound but incomplete.",
  "dimension_scores": {}
}
```

The `rationale` field is mandatory. Scores without rationale cannot be debugged or improved.
