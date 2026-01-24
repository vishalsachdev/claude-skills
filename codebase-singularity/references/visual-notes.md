# Visual notes (selected frames)

- Source video: https://youtu.be/fop_yxV-mPo?si=ufh6xRFv874mU6Ud
- Frame set: `/Users/vishal/clawd/tmp_frames/fop_yxV-mPo_15s_selected/` (clustered selection)
- Sampling cadence: 15s (timestamps below are approximate)

## selected_01_frame_0001.jpg (~00:00)
- What’s shown: Intro b-roll of hands on a laptop with stylized on-screen captions.
- Why it matters for the skill: The video positions this as a “framework” shift, not a single trick—skill should read like an operating model (repeatable process) rather than a one-off prompt.
- Actionable takeaway: Structure the skill around repeatable phases (prime → plan → execute → verify → summarize).

## selected_02_frame_0002.jpg (~00:15)
- What’s shown: Similar intro b-roll on a laptop (no slide content).
- Why it matters for the skill: Mostly transitional; reinforces that the main value is the later concrete workflow artifacts.
- Actionable takeaway: Don’t overfit to intro; focus skill on the agentic layer artifacts and guardrails.

## selected_03_frame_0004.jpg (~00:45)
- What’s shown: Caption text emphasizing “a sufficiently POWERFUL …” (setup for the agentic layer claim).
- Why it matters for the skill: Implies the core lever is adding capability/structure around the model (tools + workflows), not only choosing a smarter model.
- Actionable takeaway: In the skill, explicitly separate (a) model choice from (b) scaffolding: tools, workflows, validation.

## selected_04_frame_0005.jpg (~01:00)
- What’s shown: A quote on a dark background: “I trust them to ship more than I trust myself or my team”.
- Why it matters for the skill: The standard to aim for is autonomy + reliability. Trust is earned via observability + guardrails.
- Actionable takeaway: Bake in “trust-building” steps: logging, explicit plan, small changes, and required verification commands.

## selected_05_frame_0008.jpg (~01:45)
- What’s shown: Title card: “BUILDING AGENTIC LAYERS” (what it would take).
- Why it matters for the skill: Confirms this is about layered capability (progressive enhancement) rather than a single monolithic agent.
- Actionable takeaway: Design skill outputs as an incremental ladder (Grade 1 → Grade N) and encourage adding only what’s needed.

## selected_06_frame_0013.jpg (~03:00)
- What’s shown: Scenic “person at desk” background (transition between sections).
- Why it matters for the skill: Mostly visual pacing; doesn’t add requirements.
- Actionable takeaway: None; treat as a section break.

## selected_07_frame_0017.jpg (~04:00)
- What’s shown: Browser UI titled “Multi-Agent Orchestration” with an “Agent Observability” slide/section.
- Why it matters for the skill: Observability is key: you need a way to see plans, tool calls, state, progress, and costs.
- Actionable takeaway: Encourage a standard run format: print plan, record commands, track artifacts produced, and summarize what changed.

## selected_08_frame_0018.jpg (~04:15)
- What’s shown: The same orchestration UI with a prompt input area; it includes a long “start … plan_build …” instruction.
- Why it matters for the skill: Demonstrates a pattern: structured workflow invocation with explicit outcome requirements.
- Actionable takeaway: Prefer “workflow prompts” (goal + constraints + deliverables) over conversational prompts.

## selected_09_frame_0020.jpg (~04:45)
- What’s shown: Orchestration timeline/log view showing tool usage (e.g., bash), “pretooluse/posttooluse”, and a planner step; a right panel summarizes workflow phases.
- Why it matters for the skill: Shows closed-loop execution: plan → tool calls → review, with clear phase boundaries.
- Actionable takeaway: In `SKILL.md`, define phases explicitly and require the agent to state phase transitions and completion criteria.

## selected_10_frame_0021.jpg (~05:00)
- What’s shown: Orchestration UI with multiple workflows running; icons/steps represent a repeatable pipeline.
- Why it matters for the skill: Reinforces using a consistent pipeline for different tasks rather than bespoke behavior each time.
- Actionable takeaway: Provide a reusable checklist that works for feature work, bugfixes, and refactors.

## selected_11_frame_0028.jpg (~06:45)
- What’s shown: “Agentic Layer: Class 1 / Grade 1” over an example `prime.md` file (workflow includes `git ls-files`, read `README.md`, etc.).
- Why it matters for the skill: “Prime” is the entrypoint: teach the agent the repo shape and key docs before doing anything else.
- Actionable takeaway: Standardize a `prime.md` pattern: list files, read README(s), read key entrypoints, then summarize understanding.

## selected_12_frame_0030.jpg (~07:15)
- What’s shown: “Example project structure” with folders like `.claude/commands/prime.md`, `apps/…`, plus `AGENTS.md` / `CLAUDE.md` / `README.md`, with labels suggesting “agentic layer” vs “app layer”.
- Why it matters for the skill: Shows the “agentic layer” as a first-class directory of reusable instructions (commands/skills/prompts), separate from product code.
- Actionable takeaway: For any repo, create/maintain an “agentic layer” folder (e.g., `./.claude/`, `./agents/`, or `./docs/agent/`) that holds:
  - priming instructions
  - task workflows
  - domain-specific notes

## selected_13_frame_0031.jpg (~07:30)
- What’s shown: “Compute Advantage” slide for Grade 1: benefits include “Single prime prompt or/and memory file…”, “Minimal setup…”, “Foundation for incremental agentic growth…”, “Agents understand project context immediately”. Tradeoffs include “Useless for large codebases”, “Limited capability”, “Low agency”.
- Why it matters for the skill: Grade 1 is lightweight and fast but breaks down as complexity grows.
- Actionable takeaway: Document a progression: start with Grade 1 (prime + basic instructions), then add specialization and validation as complexity demands.

## selected_14_frame_0037.jpg (~09:00)
- What’s shown: “Agentic Layer: Class 1 / Grade 2” with a `test_writer.md` role prompt (create pytest tests; read module, identify public methods, create tests, run pytest).
- Why it matters for the skill: Grade 2 introduces specialized roles/agents with explicit responsibilities and a built-in verification step.
- Actionable takeaway: Add role prompts like `test_writer`, `docs_fetcher`, `reviewer` that always include “how to verify” commands.

## selected_15_frame_0038.jpg (~09:15)
- What’s shown: Project structure now includes `agents/` with files like `fetch_docs.md`, `test_writer.md`, and an `ai_docs/` folder with domain docs; still shows layered separation.
- Why it matters for the skill: Highlights maintaining curated domain documentation alongside the code for retrieval/grounding.
- Actionable takeaway: Encourage a `references/` or `ai_docs/` folder per skill/project: short, stable docs the agent can rely on.

## selected_16_frame_0046.jpg (~11:15)
- What’s shown: “Agentic Layer: Class 1 / Grade 3” + “Compute Advantage” describing: MCP servers/skills/prime prompts with tools; skills encapsulate multi-step workflows with progressive disclosure; tools enable direct invocation; agents can interact with external/custom services. Tradeoffs mention config complexity and careful design.
- Why it matters for the skill: Grade 3 adds “tools as primitives” (skills/MCP) to expand capability beyond text.
- Actionable takeaway: Treat tools as part of the contract: declare required tools, expected side effects, and safety constraints.

## selected_17_frame_0047.jpg (~11:30)
- What’s shown: A `prime_db_w_tools.md` (or similar) prompt for “User Management Database” with allowed tools and concrete `psql` connection commands + schema overview.
- Why it matters for the skill: Shows “tool-aware priming” for a subsystem (DB) including how to connect and what to inspect.
- Actionable takeaway: For complex systems, create subsystem-specific priming docs (DB, queue, auth, deployment) with exact commands.

## selected_18_frame_0048.jpg (~11:45)
- What’s shown: “The Core Four” Venn diagram labeled CONTEXT, TOOLS, MODEL, PROMPT.
- Why it matters for the skill: Provides a clean mental model for designing reliable agents: you need all four.
- Actionable takeaway: Add a checklist in the skill: confirm Context is loaded, Tools are available, Model choice fits, Prompt specifies deliverables + constraints.

## selected_19_frame_0063.jpg (~15:30)
- What’s shown: “Agentic Layer: Class 1 / Grade 4” + “Compute Advantage” emphasizing closed-loop prompts (Request → Validate → Resolve), self-correcting agents, specialized test commands, coordinated full-stack dev. Tradeoffs mention loops can get stuck, more prompt engineering, and need real engineering validation commands.
- Why it matters for the skill: Grade 4 is “trustable autonomy” via explicit validation and fix loops.
- Actionable takeaway: Require an explicit validation step and an exit condition (“stop if X fails twice, escalate with diagnostics”).

## selected_20_frame_0065.jpg (~16:00)
- What’s shown: Another Grade 4 tradeoffs slide highlighting risk of getting stuck without proper exit conditions, increased prompt complexity, and the need for useful validation commands.
- Why it matters for the skill: Highlights the failure mode of agent loops: endless iteration without a real-world check.
- Actionable takeaway: In this skill, enforce:
  - Max iteration count
  - “Evidence of progress” requirement
  - If validation fails, surface logs + hypotheses, then stop for human input
