# Skill, JSON and completion-gate pilot results

2026-11-23. Owner: ChouBokYann. Local prototype complete; no canonical skill changes, adoption on main, independent maintainer approval or publication claimed. [Protocol](README.md), [research](../../output/proposals/skill-contract-enforcement-research.md), [machine-readable results](../../output/contract-enforcement/summary.json).

## Decision

Do not mandate a new JSON document or promote the candidate wording on the strength of this pilot. All four conditions achieved the same fixed behavioral result. The controller demonstrates a useful, narrower capability: it can reject missing, stale or failed evidence instead of trusting an agent's completion claim. It cannot establish that the checks cover the user's whole intent.

The smallest next refinement to evaluate is an explicit feedback-to-action-to-current-evidence connection within the existing workflow record, plus a host-owned check for executable obligations when needed. Preserve human/visual acceptance as a separate judgment. A harder evaluation of missing requirements is needed before claiming improved brief completeness or autonomous quality.

## Comparison

Eight fresh workers: one initial repair and one transfer per condition. Six minutes and at most three correction rounds per task. Workers used the same synthetic catalogue, feedback, runtime and black-box checker. The parent reran the checker independently on every final artifact, inspected both 390px and 1280px screenshots, reviewed source/records, validated C/D records and invoked both D completion gates. There was no parent repair or gate retry. All workers finished within their budgets; exact token/tool costs and precise per-agent wall durations were not instrumented.

| Condition | Initial repair | Fresh-agent transfer | Reported correction rounds, repair / transfer | Transfer product edits |
|---|---:|---:|---:|---|
| A: existing skill snapshot | 34/34 | 34/34 | 0 / 0 | None |
| B: action-oriented candidate wording | 34/34 | 34/34 | 0 / 1 | Two plural wording fixes |
| C: B plus structured record validation | 34/34 | 34/34 | 0 / 0 | None |
| D: C plus required completion gate | 34/34 | 34/34 | 0 / 0 | None |

Every initial repair took one implementation pass. Each score comprises 14 meaning checks, 12 browser interaction checks and eight grounding/render checks. The 272 passing assertions are correlated checks across eight runs, not 272 independent experimental samples. C/D records passed structure, coverage and source-reference validation. D's two host gates accepted current real receipts. No unsupported claim of human acceptance was observed in the final deliveries.

The transfer changes party size, activity, interval, access requirement, venue identifiers/names/contacts and descriptions. Each fresh agent receives only its condition's inherited app/index/MEMORY plus current inputs. All implementations already consumed runtime preferences. Consequently, three transfers needed no product edits; this is evidence of reusable implementation and correct application in this case, not proof that memory improved learning. B's wording polish is not a functional correction or evidence of superiority.

All four retained unknown facts, applied current preferences rather than the earlier personal needs, replaced selected details/contacts and avoided the previous invented-stairs and text-corruption failures on the checked inputs. Plain baseline skills also did this. The explicit common feedback and task interface may account for much of the success.

## What the mechanism actually proves

The prototype consists of a closed JSON schema, source/coverage validation, a fixed runner, state-bound receipts and a completion function. It reuses installed jsonschema and Playwright; it installs no dependencies. No command supplied through JSON is executed.

Eleven controller tests pass. They cover valid evidence, structurally valid false claims, invalid records/coverage/references, missing or fabricated receipts, altered receipts, stale product/data/feedback, changed contract actions, failed/empty/missing evidence groups, unresolved applicability, mutation during execution and changed checker identity. The initial scaffold test failed because the controller did not exist; that alone is not a meaningful behavioral red test. The actual defective starter subsequently failed all three runner groups.

A [separate real negative control](../../output/contract-enforcement/negative-control.json) combines a schema-valid false repair claim with a real runner receipt for the defective starter. Structural validation accepts the record; the gate rejects completion because meaning checks fail. This is a mechanism demonstration, separate from the agent comparison. It was completed while the first workers were running, after their initial baseline negative run; the frozen checker was not changed.

Receipts bind declared app/index/data/task/feedback files, contract content except the receipt reference, and controller/oracle/schema bytes. Environment versions are recorded but tool binaries, transitive resources and all environment state are not hashed. This is not a general build-attestation system. Receipt sidecar hashes detect accidental alteration under the experiment's boundaries; an agent with the same filesystem privilege could alter both. Real enforcement requires a host-owned boundary and mandatory invocation, not merely another instruction saying to check.

## An accepted gate still missed a broader case

Parent source review found D's opening-hours branch stops evaluating known hours when either endpoint is unknown. Two [post-hoc probes](../../output/contract-enforcement/posthoc-hours.json) were applied equally to all four completed builds:

- Opening time unknown, closing time known to be too early.
- Opening time known to be too late, closing time unknown.

Both should be unsuitable if unknown hours are supported: the known failure already prevents the visit. A/B/C return unsuitable; D returns needs-confirmation. D's transfer inherits the same unchanged implementation.

These exploratory probes extend the supplied fixture types to nullable hours and were devised after source inspection. They are not part of the frozen 34-check score, were not fed back to workers and do not establish a comparative performance ranking. They expose an input-domain boundary and an incomplete checker. The gate correctly means "passed registered checks"; it would be misleading to expand that to "all meanings are correct." The observed limitation is preserved rather than repaired after comparison.

## Visual review and connection to the original goal

The parent inspected all 16 final desktop/mobile screenshots. All show legible cream layouts, six visible options, source-grounded access text, current preferences and the selected Fern details. No visible text corruption or horizontal clipping was found. A/C/D transfer retain minor "1 people" wording; A/D also retain plural confirmation wording. B corrected those. Layouts remain simple cards and a detail panel below the list. This is not a visual-quality ranking or a usability study; a full-page screenshot does not prove that a mobile selection is easy to discover in the viewport.

The original coffee-map problems concerned omissions and interpretation: a coherent illustrated map, distinct places, imagery, place-centered zoom, movement to selected details and adequate motion. This finder test does not establish that an agent can discover those missing requirements, judge their quality, or improve indefinitely without feedback. The new wording/JSON/gate must not be described as having solved that problem.

## Implications for the skills

| Concern | Supported conclusion | Minimal candidate direction |
|---|---|---|
| Consuming feedback | Explicit sources and current applicability worked in every condition | Make the resulting preventive action/check observable in the existing record; avoid another checklist |
| JSON output | Structure, IDs and coverage can be validated; content can still be wrong | Use a derived machine-readable view when a downstream consumer needs it; retain one authoritative source |
| Completion claims | Runner evidence can reject observed failure and stale state | Make any integrated host gate mandatory for its declared checks and state exactly what it establishes |
| Understanding completeness | Fixed successful checks missed a broader case; original UI omissions remain untested | Before implementation, identify a few goal-specific failure examples and missing decisions; test them separately from format validity |
| Autonomous improvement | All functional tasks passed without correction, so no useful correction-loop comparison occurred | Next evaluate ambiguous briefs and a seeded observed failure with bounded recovery; do not claim reduced feedback effort from this pilot |

No new ontology, graph engine, broad skill rewrite or always-on retry loop is justified by these results. Candidate wording was appended to three isolated snapshot skills; it has not yet demonstrated that its extra instructions earn their cost. Any eventual adoption should consolidate existing guidance and use the existing workflow-context contract rather than add a competing schema.

## Evidence and limitations

[summary.json](../../output/contract-enforcement/summary.json) links each independent parent receipt and screenshot directory. Each trial's DELIVERY.md and MEMORY.md preserve worker actions, checks and limits. [Initial hashes](../../output/contract-enforcement/input-hashes.json), [setup](../../output/contract-enforcement/setup.json) and transfer-input hashes record the inputs; the final audit found no changes to frozen helpers, snapshots or task/feedback/data inputs. Only authorized initial app/index files changed among the original hashed inputs.

Runtime: Python 3.12.7, jsonschema 4.23.0, Node v22.15.0, Chromium 151.0.7922.34. Source snapshots and synthetic fixtures are local reuse; no external contacts, installs, paid service purchases, Git mutations or deployment occurred. The localhost server was trial-only.

This is a small, unblinded exploratory pilot with one run per condition/task, shared filesystem isolation by instruction, explicit feedback for all workers and a parent-designed checker. Parent reruns are independent of worker self-reports, not independent organizations/models designing the evaluation. There is no no-memory control, harder ambiguous-brief task, repeated sampling, RL training, broad browser/accessibility audit, real-world availability check or human acceptance. A general understanding, visual-quality or learning-efficiency claim would exceed the evidence.
