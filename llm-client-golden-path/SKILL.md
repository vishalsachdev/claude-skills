---
name: llm-client-golden-path
description: Wire up an LLM client (OpenAI, Azure OpenAI, Anthropic, Gemini) correctly the first time. Use when adding AI calls to a project, when choosing which model to pin, when an LLM call returns empty output or a token/parameter error, or when auditing existing LLM integrations. Covers key sourcing, client placement, reasoning-model parameter and budget traps, and points at the shared model registry so model ids live in one place.
---

# LLM Client Golden Path

Wiring an LLM client is easy to do adequately and easy to get subtly wrong. This is the
shape that avoids the traps, plus the failure modes worth knowing before you hit them.

Model ids are deliberately **not** in this file. They live in
[references/model-registry.md](references/model-registry.md) so there is one place to update
when a model is superseded, rather than a grep across every repo.

## The shape

1. **Read the key from the environment. Never hardcode it, never commit it.**
   Put the variable name in `CLAUDE.md`, and the value in `.env.local` (gitignored), a CI
   secret, or a password manager. If a key is ever committed, rotate it: deleting the file
   does not remove it from git history.

2. **Instantiate the client inside the handler, not at module scope.**
   Module-level init runs at build time on platforms that analyze routes (Vercel's page-data
   collection, for instance) and fails when env vars are absent, producing a build error
   that looks nothing like its cause. Local builds often pass while the deploy fails.

3. **Pin the model from an env var with a registry-backed default.**
   `MODEL = os.environ.get("AI_MODEL", "<default from registry>")`. Hardcoding with no
   override means every model change is a code change in every repo.

4. **Set an explicit timeout.** Default client timeouts are often far longer than any
   request you actually want to wait on.

5. **Handle the reasoning-model parameter split.** See below - this is where most of the
   real bugs are.

## The traps

### Empty output from a reasoning model (SILENT)

The most expensive one, because nothing errors. On reasoning models the output-token budget
covers **reasoning tokens as well as visible output**. Set it too low and the model spends
the entire budget thinking, returning an empty or truncated message with no error at all. It
reads like the model refused or the prompt failed.

**Fix:** budget generously on reasoning models. If output comes back empty, raise the token
cap before debugging the prompt.

### `max_tokens` vs `max_completion_tokens` (LOUD)

Reasoning models (`gpt-5*`, `o*`) reject `max_tokens` and require `max_completion_tokens`.
This errors clearly, so it is cheap to find, but the detection logic gets rewritten in every
repo. Detect on the model id prefix rather than maintaining a list.

### Provider-prefixed model ids are not typos

Frameworks that route through LiteLLM (CrewAI among them) use `provider/model` format, so
`openai/gpt-5-mini` is **correct** there and wrong elsewhere. Do not "fix" a prefixed id
without checking whether the framework routes through LiteLLM.

Verify: `grep -iE "crewai|litellm" requirements.txt package.json` - a hit means the prefix
belongs.

### Azure OpenAI is not OpenAI

Different endpoint, an API version parameter, deployment names rather than model names, and
its own key. Azure model availability and pricing lag the OpenAI API, sometimes by a lot, so
confirm both before switching a workload. See the registry for how to check.

## Auditing an existing integration

```bash
# what model does this repo pin, and can it be overridden?
grep -rnE "gpt-[0-9]|claude-|gemini-|max_tokens|max_completion_tokens" \
  --include="*.py" --include="*.ts" --include="*.js" . | grep -v node_modules

# is a key hardcoded rather than read from env?
grep -rnE "(sk-|api[_-]?key\s*=\s*[\"'])" --include="*.py" --include="*.ts" . | grep -v node_modules

# is a flagged .env actually committed, or just a local file?
git ls-files --error-unmatch .env 2>/dev/null && echo COMMITTED || echo "not tracked"
git log --oneline --all -- .env | head
```

That last check matters: an agent auditing a repo will report local `.env` files as
"committed secrets." Untracked and gitignored is normal and needs no action. Verify before
rotating anything.

## Related

- [references/model-registry.md](references/model-registry.md) - current model ids, per-repo
  pins, and the commands to verify availability and price
- [../CONTRIBUTING.md](../CONTRIBUTING.md) - why this is a golden path rather than a shared
  library
