# Visual Prompt Six Levers

Created: 2026-10-03 | Last Updated: 2026-10-03

A self-contained [prompting reference](SKILL.md) for Blender scenes, diagrams, images, and animations.

- Six concerns: purpose, constraints, contents, appearance, behavior, and viewpoint.
- Concise prompt template and fictional JOIN fan-out example.
- Recall aliases include “six Blender levers”, “Blender mental model”, and the older “four Blender levers”.
- Flexible use: ask only about missing details that would change the result.

## Use

Ask: “Use the six Blender levers to draft a prompt for a still image explaining JOIN fan-out.”
No rendering tools are required to use the reference. Rendering the resulting prompt requires a suitable tool.

## Optional project installation

From a checkout of this repository, copy only this folder into the target project:

```bash
mkdir -p /path/to/project/.claude/skills
cp -R visual-prompt-six-levers /path/to/project/.claude/skills/
```

This PR does not install the skill. The repository treats the live `~/.claude/skills` installation as upstream; a maintainer must reconcile an approved new entry with that workflow before future mirror syncs.

## Verification and credits

Run the verification command in [SKILL.md](SKILL.md). It checks the fictional JOIN arithmetic, not rendered output or the framework's universal effectiveness.

Source: contributor-provided six-lever prompting model. MIT license; see [LICENSE.txt](LICENSE.txt).
