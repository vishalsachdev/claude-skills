# Model registry

One place to see what every project pins, so a model change is one edit and a sweep rather
than a grep across every repo.

**Entries here are claims with verification commands, per [CONTRIBUTING.md](../../CONTRIBUTING.md).**
An entry not verified in 90 days is unproven, not true.

---

## Current defaults

Use the newest model that fits the job. For high-volume, cost-sensitive work (triage,
classification, summarization) prefer a nano/small tier; reserve frontier models for
reasoning-heavy work.

| Provider | Tier | Model id |
|---|---|---|
| Anthropic | frontier | `claude-opus-5` |
| Anthropic | balanced | `claude-sonnet-5` |
| Anthropic | fast/cheap | `claude-haiku-4-5-20251001` |
| OpenAI | frontier | `gpt-5.6-terra` |
| OpenAI | cost-sensitive | `gpt-5.6-luna` |

Verify a model id is real and current before pinning it:

```
claim:  the model id is valid and not retired
verify: check the provider's model docs page, or for Azure:
        az cognitiveservices account list-models -n <account> -g <rg> \
          --query "[?name=='<model>'].{v:version,retire:deprecation.inference}"
```

---

## Per-repo pins

Audited 2026-08-01. Several repos sit on 2024-era models; each is a candidate for a bump.

| Repo | Provider | Pinned | Override? | Note |
|---|---|---|---|---|
| VentureBot | OpenAI (via CrewAI/LiteLLM) | `openai/gpt-5-mini` | `OPENAI_MODEL` | Prefix is CORRECT for LiteLLM, not a typo (verified: `crewai==0.193.0`) |
| badm554-bot | OpenAI | `gpt-4o-mini` | `AI_MODEL` | Old; bump candidate |
| giesclaw | OpenAI | `gpt-4o` | `OPENAI_MODEL` | Old; bump candidate |
| giesclaw | Anthropic | `claude-sonnet-4-20250514` | `ANTHROPIC_MODEL` | Old; bump candidate |
| giesclaw | HuggingFace | `moonshotai/Kimi-K2.5` | env | |
| badm554-survey-bot | OpenAI | `gpt-4o` | env | Old; bump candidate |
| badm554-survey-bot | Google | `gemini-2.0-flash` | env | |
| ai-model-evaluation | OpenAI | `gpt-4.1` | `SCENARIO_GENERATOR_MODEL` | Judge model |

Re-run the inventory:

```bash
for r in VentureBot badm554-bot giesclaw badm554-survey-bot ai-model-evaluation; do
  echo "== $r"; grep -rnhoE "(gpt|claude|gemini|o[0-9])[-.a-z0-9/]*" --include="*.py" \
    --include="*.ts" --include="*.js" "$r" 2>/dev/null | sort -u | head -5
done
```

---

## Azure OpenAI: availability and price lag the OpenAI API

Azure is a separate catalog with separate pricing. **Do not assume an OpenAI API price
applies to Azure.**

```
claim:  gpt-5.6-luna is deployable on the university tenant (northcentralus)
verify: az cognitiveservices account list-models -n dl-foundry-mykai -g DL_ResourceGroup_01 \
          --query "[?name=='gpt-5.6-luna'].{version:version,skus:skus[].name}"
expect: version 2026-07-09, SKUs GlobalStandard + DataZoneStandard
checked: 2026-08-01
```

```
claim:  Azure's luna price is still well above the OpenAI API list price
verify: curl -s "https://prices.azure.com/api/retail/prices?\$filter=contains(meterName,'luna')%20and%20armRegionName%20eq%20'northcentralus'" \
          | python3 -c "import json,sys;[print(i['meterName'],i['retailPrice']) for i in json.load(sys.stdin)['Items']]"
note:   as of 2026-08-01 Azure is still ~5x the openai.com list price for the same model.
        Re-check before assuming a price drop has propagated.
checked: 2026-08-01
```

### Deployment SKU controls where inference runs

Not the resource's region. `GlobalStandard` may route the request to any Azure OpenAI region
worldwide; `DataZoneStandard` confines processing to the data zone (US) and costs ~10% more.
Data at rest stays in the resource region either way.

**Prefer `DataZoneStandard` for anything touching mail, student data, or other sensitive
content.** The 10% premium is cheap insurance.

```
claim:  DataZoneStandard is ~10% above GlobalStandard on every luna meter
verify: same Azure retail price query above; compare 'Std Gl' vs 'Std DZ' meters
checked: 2026-08-01
```
