# Brief completeness and fresh-agent handoff results

2026-11-23. Local comparison completed for ChouBokYann. Canonical skills, existing contributor edits and Git history were unchanged. No push, deployment, external research or product implementation occurred.

## Decision

Do not add the experimental interpretation checkpoint to the canonical skill on this evidence. The existing skill already produced actionable, calibrated briefs and preserved their goals through new feedback and a fresh-agent handoff. The candidate added useful specificity but did not repair a measured baseline omission. Both conditions reached the rubric ceiling.

This narrows the working hypothesis: in these bounded cases, the missing link was not generating or transferring a sufficiently explicit direction document. Whether an implementation agent realizes that direction and verifies the actual experience remains unanswered. It would be premature to claim that downstream execution is proven to be the cause, but it is the next stage worth isolating.

## What was tested

Two sparse requests: a clean cream cartoon coffee atlas connecting origins to sourced Singapore cafes, and a calm handmade Singapore weekend-ceramics discovery/comparison/enquiry site. Neither supplied actual listings, images or map art. The coffee request is adapted from the user's original request, without later complaints supplied to producers. Ceramics and the later feedback are synthetic test material, not new real user projects or approvals.

Four fresh workers, each handling both cases: baseline producer, candidate producer, baseline consumer and candidate consumer. Producers had identical requests and a copy of set-ui-direction; only the candidate copy contained the proposed interpretation checkpoint. Consumers received only their condition's two briefs and identical later feedback/task instructions, with no original requests, skill, conversation or evaluator rubric. The consumer therefore tested the handoff artifact, not continued access to the candidate instruction.

A fifth fresh agent independently wrote a source-grounded rubric before seeing outputs. It then assessed all stages without reading the candidate skill, parent rationale or parent observations. The rubric was frozen and remained unchanged. The evaluator knew stage/condition folder names and saw baseline first, so this is not a blinded or randomized study. Independence here means separate authoring/context, not a separate model family or human assessor.

Each worker had five minutes and a 600-word limit per brief. One later consolidated correction could have been requested for a substantive blocker; none was justified. Initial and revised outputs were archived before evaluation. The parent reviewed all eight briefs, checked counts and immutable inputs, and ran a separate encoding check. No parent repairs or feedback retries occurred.

## Frozen rubric results

| Condition / stage | Coffee: original obligations | Ceramics: original obligations | New feedback, coffee / ceramics | Inherited goal loss | Evaluator correction requests |
|---|---:|---:|---:|---|---:|
| Existing skill, initial | 8/8 | 8/8 | Not applicable | Not applicable | 0 |
| Added checkpoint, initial | 8/8 | 8/8 | Not applicable | Not applicable | 0 |
| Existing brief, fresh consumer | 8/8 | 8/8 | 4/4 / 4/4 | None observed | 0 |
| Candidate brief, fresh consumer | 8/8 | 8/8 | 4/4 / 4/4 | None observed | 0 |

There were no established hard failures under the frozen content rubric. Scores are judgments of actionable text and calibrated uncertainty, not percentages of general understanding or aesthetic quality. Do not add stages together into an improvement score or interpret the criteria as independent statistical samples.

The evaluator checked explicit original obligations, necessary journey implications and honest missing-input handling. It did not penalize initial briefs for failing to predict later preferences about photography, coherent scenery or selection focus. Later feedback was scored only after it was supplied.

Both coffee revisions covered one coherent illustrated scene, an appropriate photography role, selection focus, visible origin-to-Singapore-cafe connection, comparison and retained orientation. Both ceramics revisions covered beginner suitability, total cost/inclusions, rejection of full/time-incompatible recommendations, honest unknown availability and enquiry without booking claims. Both retained factual research and asset-permission gaps instead of inventing results.

## Useful differences, without overstating them

The candidate coffee brief explicitly questioned drinks versus retail beans and warned that a generic cafe homepage might not substantiate the claimed origin relationship. Its ceramics brief used examples such as a weekly schedule without a dated session and later firing/collection commitments. These are useful concrete failure examples. However, the baseline already required evidenced origin matching, actual workshop dates, total commitments and later collection where applicable. The independent evaluator found no consequential blocker fixed by the added instruction.

Whole-file word counts, including initial metadata:

| Stage | Baseline coffee / ceramics | Candidate coffee / ceramics |
|---|---:|---:|
| Initial | 559 / 598 | 572 / 597 |
| Fresh revision | 525 / 569 | 552 / 557 |

All briefs stayed within the cap. This shows comparable output length, not equal token cost or elapsed effort. Exact token/tool cost was not instrumented. One producer authored two cases in each condition, so the cases are not independent agent samples. No conclusion about reduced user effort or learning efficiency is supported; neither condition required a correction in this trial.

## Separate interoperability finding

A parent audit after text evaluation attempted strict UTF-8 decoding and failed on both baseline initial briefs and both baseline revisions. They contain Windows-1252 smart punctuation; Windows text tools read them, and the fresh consumer successfully interpreted them, but a strict UTF-8 downstream reader cannot. The same files also contain literal question-mark separators in journey lines. All four candidate briefs decode as UTF-8. Delivery files decode as UTF-8 in both conditions.

This was not a preregistered content criterion or an explicit worker encoding requirement. It is reported separately, without retroactively changing rubric scores or claiming that the interpretation checkpoint caused the difference. The parent used Windows-1252 only to calculate counts after the strict decoding failure; it did not rewrite the artifacts. The failures remain archived in [encoding-and-counts.json](../../output/brief-completeness/encoding-and-counts.json).

The finding reinforces a narrow engineering improvement: use explicit UTF-8 writes and validate the actual handoff with the downstream reader. A prose handoff can preserve meaning while failing a machine interface. That needs a small mechanical check, not another semantic framework. No canonical helper or skill change was introduced during this comparison.

## Method deviation and limits

The [protocol](README.md) initially made a candidate conditional on an observed baseline gap, following baseline-first skill testing. The baseline had no failing criterion. To finish the user's requested comparison, the parent nevertheless ran the previously proposed generic checkpoint as an exploratory contrast. This decision was recorded in [CANDIDATE-RATIONALE.md](review/CANDIDATE-RATIONALE.md) before candidate execution. There is no red-to-green result and no justified claim of a repaired skill. The candidate includes no case-specific expectations or evaluator criteria, but it was authored after the parent saw baseline outputs; same-case adaptation remains a confound.

Other limits: two short text tasks, strong existing skill guidance, unavailable user handled through labelled assumptions, synthetic later feedback, no repeated sampling, shared-filesystem boundaries enforced by instruction, and a single unblinded evaluator. The coarse rubric may have a ceiling. Frozen hashes prove file preservation, not that an agent could not access another file. No rendered UI, motion, usability, real listings, image quality, asset licensing or source truth was verified. Workflow metadata was not exporter-tested; consumers produced self-contained prose revisions rather than a machine-record migration. The actual coffee website was not changed.

## Direction for the next improvement

1. Keep the canonical set-ui-direction skill unchanged for now. Concrete counterexamples can remain an optional technique when a brief has a real ambiguity, rather than another mandatory section.
2. Test realization of an already adequate brief. Give a fresh implementer one representative origin-selection-to-cafe journey, available permitted assets and a bounded budget. Separately inspect the original goal and rendered behavior: coherent composition, selected-place focus, visible result connection and preserved context. Do not substitute a passing DOM check or a prose promise for observing the journey.
3. If implementation misses an explicit anchor, test whether one concrete artifact-based correction repairs it and survives a fresh handoff. Preserve the first failure and cap retries; do not chase undefined perfection.
4. Keep mechanical handoff validation separate from judgment. UTF-8 readability, resolvable sources and current executable evidence are appropriate code checks. Composition, motion and user-reserved preferences still need observation and calibrated acceptance.

That next implementation trial is a recommendation, not work already done or an automatic expansion of this experiment. It should isolate a representative slice before rebuilding the entire coffee site or adding more workflow machinery.

## Evidence

- [Frozen rubric](review/RUBRIC.md) and [freeze hash](../../output/brief-completeness/rubric-freeze.json).
- [Baseline initial review](review/BASELINE-INITIAL.md), [baseline transfer review](review/BASELINE-TRANSFER.md), [candidate initial review](review/CANDIDATE-INITIAL.md), [candidate transfer review](review/CANDIDATE-TRANSFER.md), and [independent comparison](review/COMPARISON.md).
- [Machine-readable summary](../../output/brief-completeness/summary.json), initial/candidate manifests and original-byte archives under output/brief-completeness.
- [Baseline brief](baseline/COFFEE.md), [candidate brief](candidate/COFFEE.md), and the corresponding CERAMICS.md and transfer directories.

No files were promoted or pushed. Human aesthetic acceptance, rendered realization and reduced feedback effort remain unverified.
