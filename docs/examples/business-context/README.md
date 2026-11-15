# Business-connected cafe example

All decisions, implementation states and test results here are synthetic. They are fixtures for the [shared output contract](../../contracts/workflow-context.md), not actual application work.

Each baseline contains one source brief and one delivery document owning several entries. In A, a provider-reuse decision implements suitability filtering. In B, a replacement decision adds manually sourced amenities because coverage is insufficient. Original decision history remains and the implementation revision changes from fixture-v1 to fixture-v2. The old functional result remains tied to fixture-v1, so the viewer must show it as stale. The business outcome remains unmeasured in both baselines.

Generate snapshots outside these source folders:

```powershell
python -B scripts/export_workflow.py docs/examples/business-context/baseline-a output/business-a.json --project cafe-trial --baseline synthetic-a --sample
python -B scripts/export_workflow.py docs/examples/business-context/baseline-b output/business-b.json --project cafe-trial --baseline synthetic-b --sample
```

Import either into the existing project overview. Start at the outcome, follow its incoming requirement and decision links, then the implementing change and evidence. Source paths and explanations remain available. A technical pass must never be described as measured business benefit. A partial snapshot explicitly warns about omitted context.

The exporter tests mutate copies of these fixtures to exercise missing rationale, partial references, business observations, path escape, conflicts and failed publication. These checks are not an independent human comprehension trial.
