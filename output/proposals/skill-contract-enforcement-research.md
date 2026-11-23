# Research: skill instructions, structured contracts and executable evidence

Date: 2026-11-23. Owner: ChouBokYann. Scope: research and candidate design only, following the request to investigate before changing skills. No canonical skill/schema/helper/runtime changes, new dependencies, hooks, experiments, publication or implementation approval are implied. Existing contributor edits are preserved.

## Conclusion

Use a small hybrid: clearer actions in the existing skills, the existing structured source record, and a narrowly scoped execution/evidence check. JSON improves interoperability and validation; it is not proof of understanding. Code can enforce known obligations and detect observed failures, but cannot guarantee that the obligations completely capture the user's goal. Evaluate understanding through behavior in new and changed situations.

The most relevant missing connection is feedback -> applicability -> preventive action/check -> current evidence. Much of the record structure and verification guidance already exists. Do not create a competing JSON specification, require a graph engine, or add another general skill before testing a smaller refinement.

## What the local evidence actually establishes

- [Autonomy trial](../../experiments/autonomy-readiness/RESULTS.md): agents could retrieve and apply preferences, yet the visuAI arm repeated an encoding failure and retained an unsupported Stairs claim while reporting completion. Both passed the limited automated oracle. This is a gap in applying lessons and calibrating completion, not solely retrieval.
- [Graphify trial](../../experiments/graphify-feedback/RESULTS.md): both ordinary-search and graph-assisted workers recovered the explicit feedback and avoided those regressions. No measured outcome benefit from Graphify on the small corpus. More explicit feedback, new agents and a different task setup prevent attributing the improvement to any one change.
- The same author chose many checks and assessed quality in those trials. The independent parent evaluator also missed the factual label until source/rendered inspection. Adding code around an incomplete oracle would have preserved that blind spot.
- These were small, synthetic, unblinded pilots. They justify a hypothesis and targeted test, not a claim that a wording, JSON or enforcement change is already effective.

## Primary research and what to borrow

| Source | Relevant finding | Adaptation and limit for visuAI |
|---|---|---|
| [Structured Outputs, OpenAI](https://developers.openai.com/api/docs/guides/structured-outputs.md) | Supported schemas constrain completed, non-refusal output structure. Refusals, incomplete responses and business rules still need handling; structured output can contain mistakes. | Use typed interfaces where supported, with local validation. A schema-valid source citation or pass declaration is not evidence of truth. This is an API capability, not something a SKILL.md automatically enables in every host. |
| [JSON Schema conditionals](https://json-schema.org/understanding-json-schema/reference/conditionals) and [objects](https://json-schema.org/understanding-json-schema/reference/object) | Required fields, controlled properties and conditional constraints express structural dependencies. | Useful for record shape. Cross-document identity, source availability, real artifact fingerprints and actual test outcomes require application code. Provider structured-output subsets may differ from the local schema vocabulary. |
| [ACE, v3](https://arxiv.org/html/2510.04618v3) | Separates generation, reflection and curation; preserves itemized context through incremental delta updates rather than repeatedly rewriting a whole summary. Uses identifiers and deterministic merging of updates. | Closest fit for durable feedback. Keep specific applicability and provenance in small entries; update the affected entry rather than compressing away its mechanism. Helpful/harmful labels are signals to review, not proof of correctness. Reported benchmark gains are not evidence for our workflow or UI tasks. No need to adopt its full multi-role system. |
| [Reflexion, v4](https://arxiv.org/html/2303.11366v4) | Uses feedback and episodic textual reflection to influence later attempts without weight updates. Discusses imperfect optimization and limits of executable tests for complex behavior. | A source-linked lesson and a better next action can be useful without model training. Repeated reflection is not a completion oracle; feedback quality and the next action still matter. |
| [CheckList, ACL 2020](https://aclanthology.org/2020.acl-main.442.pdf) | Tests capabilities through minimum functionality, invariance and directional expectations, including perturbations whose effects should be predictable. | Adapt behavioral testing to whether downstream agents apply meaning correctly under changed conditions. This is an engineering analogy; the paper evaluated NLP behavior, not visuAI or aesthetic quality. |
| [Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Describes simple composable workflows, evaluator/optimizer loops when criteria and useful feedback exist, environmental observations and bounded stopping. | Use a small correction loop only for a concrete gap. This 2024 architecture guidance is not a current API integration specification. A second model call is not automatically an independent or correct judge. |
| [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) | Separates final environmental outcome from the agent's account; distinguishes code, model and human graders. Warns against overly rigid tool-sequence grading and calls for human calibration of model graders. | Judge actual artifacts and source applicability. Do not require one fixed sequence of skills when another valid path meets the goal. Keep subjective evaluation separate from deterministic checks. |

The earlier ontology papers motivate supplying relevant relationships and constraints. Neither a graph nor a structured record makes an unsupported relationship true. The research above supplies more directly applicable mechanisms for preserving context, consuming it and checking behavior; no paper establishes guaranteed general understanding.

## Reuse what is already in the repository

[workflow-context.md](../../docs/contracts/workflow-context.md) already defines one authoritative Markdown record with structured YAML, derived JSON, stable IDs, source references, stated/inferred relationships, requirements, revisions, evidence and supersession. It explicitly keeps business outcomes separate from technical checks. This can represent most of the desired chain without inventing another ontology.

[export_workflow.py](../../scripts/export_workflow.py) validates source/anchor resolution, record kinds/states, link endpoints, authority references, required evidence fields and supersession cycles; it hashes source documents. Completed technical evidence requires a testedRevision string. Its opening statement explicitly limits it to structure, not semantic truth. It does not execute the claimed check, establish that a citation entails a claim, or prove that a supplied testedRevision identifies the actually tested artifact. Files without workflow_context are skipped: a valid export cannot establish that all relevant user feedback was included.

[test_workflow_export.py](../../tests/test_workflow_export.py) has cases for provenance/history retention, invalid records, source hashes and supersession. Those tests were inspected, not rerun or expanded during this research. They are not an autonomous-completion controller.

[implement-increments](../../skills/implementation/implement-increments/SKILL.md) already requires a concrete check, bounded implementation, affected verification and current evidence. [verify-change](../../skills/verification/verify-change/SKILL.md) already distinguishes scope, truth, visual inspection and human acceptance. [handoff-work](../../skills/implementation/handoff-work/SKILL.md) already preserves sources, stale evidence and unfinished actions. The problem is not the complete absence of these instructions. Prefer making the critical consumption step observable and removing redundancy over appending another checklist.

## What each layer can enforce

| Layer | Can establish | Cannot establish by itself |
|---|---|---|
| Clear skill instruction | What the agent is expected to do and when to stop | That it performed the action or interpreted the goal correctly |
| Valid JSON/YAML contract | Required fields, legal enum values, explicit unknowns, predictable consumption | That an applicability decision, source claim or success statement is correct |
| Referential/state checks | IDs resolve, no contradictory structural transitions, evidence matches recorded input state | That source prose supports the relationship or the intended requirement was not omitted |
| Runner-observed evidence | An authorized check actually ran, produced outcomes/artifacts, and applies to the recorded state | That the test is a good oracle, covers all user intent, or cannot share the implementation's mistake |
| Behavioral and rendered evaluation | Specific meanings hold on representative/changed cases; observed interactions and factual labels match expectations | General internal understanding, untested cases, or subjective user acceptance |

For example, `{ "source": "feedback.md#access", "claim": "stairs", "status": "passed" }` can be valid JSON and satisfy a plausible schema while being false. Checking that the anchor exists still does not prove the claim. A domain check comparing the rendered label with supported structured facts can catch this specific error. The narrow source-to-label rule must itself be justified; a generic validator cannot derive every domain rule correctly from prose.

## Small candidate contract, not an implemented schema

Keep Markdown/YAML authoritative and expose validated JSON at an agent/tool boundary. Do not manually maintain parallel Markdown and JSON versions of the same requirement. JSON versus YAML is primarily an interface/serialization choice here; the enforcement and consumption rules matter more.

Illustrative extension/view of an existing record (IDs and paths below are examples, not existing approved records):

```json
{
  "requirement_id": "REQ-ACCESS-01",
  "source_ref": "feedback.md#access-labels",
  "applicability": {
    "state": "applies",
    "reason": "This change renders the source accessibility field."
  },
  "action": "Render only the supported access state; do not infer its physical cause.",
  "check_ids": ["access-label-regression"],
  "evidence_refs": []
}
```

Most content can map to existing sources/links/reason/next and requirement/evidence records. Before extending the schema, check which information cannot already be represented without awkward duplication. Use applies/not-applicable/unresolved with a source-based reason; an unresolved material condition remains unresolved. A model's not-applicable choice still needs assessment: requiring a reason does not make the reason sound.

The agent proposes an action and check reference; it does not author the authoritative pass receipt. A runner-generated receipt would capture check identity/version, executed result, tested code/configuration/data state and evidence artifact pointers. A small host check can then distinguish missing, failed, stale and current evidence. A hash establishes identity, not semantic correctness or trustworthy execution by itself.

## Minimal code role to investigate

1. Validate the selected record and resolve references using existing helpers. Report missing context instead of accepting an empty subset as complete scope.
2. Check known required criteria against a small registered check set, not arbitrary shell commands embedded in retrieved JSON. New checks remain inspectable code under normal task authorization. Do not turn an untrusted document into executable authority.
3. Collect outcomes and exact state from execution, rather than trusting agent-written `passed`. Retain missing/skipped/zero-test outcomes explicitly. Reuse existing test runners and artifacts.
4. Recompute a bounded verdict from applicable required checks and unresolved findings. Invalidate receipts after relevant code, data, configuration or criteria change. When dependency scope is unknown, rerun the small relevant suite conservatively rather than building a complex dependency engine.
5. Leave visual interpretation, source entailment and user-reserved acceptance separate. A missing required observation prevents a full claim; a code pass cannot erase a user rejection.

This only enforces behavior if the host actually invokes the check at the boundary. A standalone skill saying “run the validator” remains advisory. The current repository is not an enforcing runtime. If the same agent can freely rewrite the required criteria, checks, receipts and verdict logic, apparent enforcement can be bypassed; exact ownership and host integration must be part of any implementation proposal. No hook or runtime adapter is installed by this research.

## Assessing understanding through code

Use a few domain-grounded counterfactual checks, plus independent held-out cases, rather than treating acknowledgment or a paraphrase as proof:

| Perturbation | Expected implication |
|---|---|
| Required access changes true -> false | Non-step-free location is no longer rejected solely for access; source facts themselves remain unchanged. |
| Confirmed fact becomes unknown | Confidence decreases appropriately; unknown is neither silently false nor confirmed true. |
| Irrelevant project note is added | Current requirement interpretation remains unchanged. |
| User supersedes a personal preference | Apply the new preference while retaining applicable general feedback. |
| Source changes after a passing run | Old evidence is stale; a prior successful run cannot establish the new state. |
| Implementation is deliberately mutated to invent stairs | A meaningful grounded-label check fails, rather than merely checking that six cards exist. |
| A novel scenario uses different IDs and wording | Rules transfer rather than memorizing the original fixture. |

Expected relationships must be justified by the task; arbitrary changes do not always preserve behavior. Freeze independent acceptance cases before exposing outcomes. The builder can add useful tests, but should not be the sole authority for whether the original goal is met. Avoid requiring a scripted sequence of tool calls or exhausting a fixed number of correction rounds.

For Coffee Atlas, code can check that selecting an origin updates the camera target, details and café association, and that photo references load. It cannot establish that the map is one coherent visual world, the photos are well chosen, or the movement feels appropriate merely by counting assets and transitions. Inspect the whole rendered journey against a stated visual reference and retain human judgment where necessary. Missing criteria need discovery; JSON cannot recover an omitted requirement automatically.

## Research recommendation and evaluation design

Propose a narrow refinement of implement-increments and verify-change first, with a small handoff adjustment: name the applicable lesson, concrete preventive action/check and current evidence in the existing record. Do not make every task use every skill or create a new report per stage. Preserve the reason and supersession when a lesson is updated, following the useful incremental-context idea from ACE without adopting its entire framework.

To determine which mechanism helps, compare four conditions with the same facts, task budgets and retrieval:

A. Current skills and records.
B. Revised action-oriented skill wording only.
C. B plus a consistently consumed structured record with local structural validation.
D. C plus runner-observed receipts and a host-invoked completion check.

First validate the proposed checker against seeded stale/missing/contradictory records and broken implementations; do not spend agent runs on a checker that cannot reject those. Then use repeated paired tasks across functional meaning, feedback transfer and a visual interaction case. Keep Graphify constant or disabled, keep evaluator cases outside the worker's writable area, and record actual host/model/version/budget. Determine repetitions and cost before execution; no new trials are run here.

Primary outcomes: false completion claims, repeated mistakes, correct adaptation under changed requirements, required checks actually exercised, and unresolved uncertainty reported correctly. Secondary outcomes: total time/tokens and human clarification/correction needed to reach an independently acceptable outcome. Include a no-memory transfer control before claiming learned efficiency. Record schema retry overhead and unnecessary blocking; a rigid contract can make valid work slower or reject useful alternatives.

Prefer B if C/D add no measured value. Adopt a code gate only where it demonstrably catches a real failure at acceptable cost. Keep the claim bounded: verified behavior under stated conditions, never guaranteed understanding or perfection.

## Boundaries and remaining questions

This is a primary-source review and repository inspection, not implementation validation or a formal proof. No new schema/runtime code was written or executed and no canonical tests were changed. Remaining decisions for any later proposal: the first host boundary to integrate, who owns required checks/receipts, the smallest artifact-state identity, and which source/visual judgments remain human or calibrated model review. None requires choosing a database, ontology engine, new model provider or training method now.
