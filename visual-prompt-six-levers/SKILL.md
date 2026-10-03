---
name: visual-prompt-six-levers
description: Use when drafting or revising prompts for Blender scenes, diagrams, images, or animations, or when asked for "six Blender levers", "Blender mental model", or the older "four Blender levers".
license: MIT
---

# Visual Prompting: Six Blender Levers

Created: 2026-10-03 | Last Updated: 2026-10-03

Recall this reference with **six Blender levers** or **Blender mental model**. The older phrase **four Blender levers** points here too: the corrected framework has six levers.

Use these levers to shape a Blender scene, diagram, image, or animation. They are a flexible prompting aid. Use what matters to the task; infer reasonable defaults and ask only about gaps that would change the result. Do not turn every request into six questions.

| Lever | Prompt focus |
|---|---|
| 1. **Why it exists** | Purpose, audience, or learning goal. What should the viewer understand? |
| 2. **What's off limits** | Constraints: facts to preserve, privacy, scope, output limits, or effects to avoid. |
| 3. **What exists** | Objects, scene contents, labels, data, and relationships. |
| 4. **How it looks** | Materials, style, color, lighting, and visual hierarchy. |
| 5. **What it does** | Motion, behavior, timing, and what each change reveals. For a still image, omit motion. |
| 6. **How we see it** | Camera, viewpoint, framing, scale, and label legibility. |

## Concise template

```text
Create [visual and output format].
Why it exists: [purpose or learning goal].
What's off limits: [constraints and facts to preserve].
What exists: [objects, labels, relationships, or scene contents].
How it looks: [materials, style, color, lighting].
What it does: [motion or behavior, if needed].
How we see it: [camera, viewpoint, framing].
```

When revising a result, name the lever to change and preserve the others where they still work. Common failures: polishing before checking facts, decorative motion that hides the concept, or a camera that makes labels unreadable.

## Teaching example: JOIN fan-out

Create a short Blender animation showing why summing an order total after a one-to-many JOIN can overcount.

- **Why it exists:** Reveal that changing row grain can repeat a measure without creating new value.
- **What's off limits:** Use fictional rows only. Preserve the arithmetic and label each grain. Do not imply that the repeated total is new revenue.
- **What exists:** One order row, `order_id=101, order_total=60`; two item rows, `(101, A, 20)` and `(101, B, 40)`. JOIN on `order_id` to show two joined rows, each carrying `order_total=60`. Label the source as one row per order and the result as one row per item.
- **How it looks:** Flat cards, high-contrast labels, and consistent color for the order total. Use simple lighting so the numbers remain clear.
- **What it does:** Split the order card into the two joined rows. Highlight the repeated `60`, then show `SUM(order_total)=120` beside the original order total `60`. Show item amounts `20 + 40 = 60` as the valid sum at item grain for this example.
- **How we see it:** Keep a fixed, front-facing camera. Frame the source, JOIN result, and comparison together, with labels legible at the target output size.

The motion reveals the repetition; the grain labels explain it. Check the numbers and labels before judging the render's polish.

## Verification and scope

Tier: **decision record**. Keep the six prompt concerns separate so each visual can vary without a shared rendering implementation. Revisit if application tests show confusion between levers. Source: contributor-provided prompting model; the rows above are fictional.

This is a prompting aid, not a claim of universal effectiveness. That claim cannot be verified by a command. Review date: 2026-10-03.

Verify the example with this read-only, in-memory command:

```bash
python3 -c 'import sqlite3; c=sqlite3.connect(":memory:"); r=c.execute("WITH orders(id,total) AS (VALUES(101,60)), items(id,amount) AS (VALUES(101,20),(101,40)) SELECT COUNT(*),SUM(total),SUM(amount) FROM orders JOIN items USING(id)").fetchone(); assert r==(2,120,60),r; print(r)'
```

Expected: `(2, 120, 60)`. Checked: 2026-10-03. Verify the actual output's arithmetic, grain, and legibility separately.
