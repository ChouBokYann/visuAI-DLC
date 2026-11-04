# Shared lifecycle, checkpoint, and impact contract

Status: draft for review, 2026-11-04. Specifies the shared method and record formats that the product's skills and workflows support, following [NORTHSTAR.md](../../NORTHSTAR.md). It does not introduce a runtime or change the existing knowledge schema.

This is a product-method specification. When developing this repository, apply the separate [development rules](automation.md) for human authority, worker grants, and review/merge gates. References below to approval or grants describe handoff context; they do not impose this repository's named maintainers or review commands on downstream users.

## Canonical records

Use versioned Markdown and source links for durable project knowledge, Git for artifact history, and GitHub issues/PRs for review and delivery decisions. The private board and optional platform are projections, not independent approval stores. Do not copy approval claims into metadata without their source event and revision.

Reuse [knowledge-v1.md](knowledge-v1.md) for concept identities, typed relations, provenance, baselines, and evidence semantics. Goal, Capability, Feature, Decision, Evidence, Release, and Procedure remain its current types. Requirements may be described in accepted feature criteria and architectural entities linked through ordinary source references for now. Do not invent unsupported types or predicates and claim they pass the existing validator. A typed C4 or checkpoint schema extension requires a separate accepted change and migration rules.

The records below are Markdown templates outside the validated concept bundle unless an accepted schema extension says otherwise. Their links connect to bundle concepts; they are not additional concept types.

## Required lifecycle handoffs

Reuse existing records when they contain the information; one small change need not create one document per cell. Record not applicable with a reason where appropriate.

| Process | Required handoff |
|---|---|
| Ideation | User problem, intended outcome, boundaries, alternatives, assumptions, unresolved questions |
| Planning | Accepted criteria, feature-to-outcome mapping, relevant architecture, dependencies, initial impact assessment, validation approach, ownership |
| Implementation | Work grant, baseline, scoped changes, decisions and reasons, updated records, tests appropriate to the change |
| Verification | Criterion-to-evidence mapping, exact tested revisions, actual results, impact reconciliation, failures and unverified claims |
| Deployment | Explicit applicable authorization, delivered revision/environment, release evidence, recovery procedure; merging alone is not deployment |
| Maintenance | Observations or incidents with sources, affected outcomes, revised assumptions, proposed follow-up, new checkpoint when state changes materially |

Every handoff names the next owner/action and links the current checkpoint. Loop back when learning changes the plan; obtain renewed scope acceptance for material changes before implementing them.

## Checkpoints

Create a checkpoint at accepted planning, meaningful implementation handoff, human-review submission, merge/release, and interruption or reassignment. Small milestones may share one checkpoint; do not generate one for every tool call. Preserve previous checkpoints rather than rewriting history.

Minimum checkpoint record:

```text
Checkpoint ID / recorded-at UTC / author:
Issue / accountable human / worker or coordinator grant:
Previous checkpoint:
Artifact repository and immutable revision(s):
Knowledge baseline revision:
Uncommitted work: none OR saved patch/artifact path and content hash
Agreed scope and acceptance-criteria revision:
What changed and why / decision links:
Outcome and architecture references:
Impact assessment:
Evidence: criterion -> result -> tested revision -> source
Review state and source events:
Blockers / unknowns / deliberately excluded scope:
Next action / owner / resume instructions:
Recovery reference and any limitations:
```

The checkpoint's own storage commit may follow the artifact commit; name each separately to avoid self-referential hashes. Multiple repositories require explicit revisions for each. A dirty tree is not reproducible unless its patch or artifact is preserved; otherwise label the checkpoint incomplete and do not use it as verified handoff evidence. Never include secrets in saved patches or records.

A checkpoint is a record, not a database backup or automatic rollback permission. External state and irreversible effects require their own recovery evidence. To resume, read the checkpoint, verify current revisions and the grant, reconcile intervening changes, and rerun invalidated checks.

## Impact assessment and zoom

Assess impact before work and reconcile predicted versus observed impact at handoff. Each assessment names the baseline, changed item, direct affected entities, relationship/evidence source, potential indirect effects, verification needs, unknowns, and scope of traversal. A finding of no identified impact must state what was inspected; it is not proof of no impact everywhere.

Navigate along two connected dimensions:

- Outcome view: goal -> capability -> feature/accepted requirements -> work and evidence -> release.
- Architecture view: system context -> containers -> components -> code, using only useful levels and explicit mappings to relevant features and decisions.

The arrows above describe navigation, not new knowledge-v1 predicates. Reverse navigation must resolve to the same canonical records. A C4 container means an application or data store; it does not necessarily mean a deployment container.

Every focused answer or optional visual view identifies the checkpoint/baseline, selected entity and level, sources, relationship basis, filters, and omitted/truncated scope. Expanding scope must not silently mix revisions. Rollups must expose failed, blocked, unknown, and stale children; a summary cannot mark an outcome verified merely because one child passed. Show counts or criterion-level status with drill-down instead of invented completion percentages.

For comparisons, align stable identities across the two checkpoints and report additions, removals, changed decisions, changed relationships, and verification changes. Preserve superseded decisions. Distinguish intended outcome contribution from demonstrated user impact and potential dependency reachability from confirmed breakage.

## Skill adoption

Candidate sources, inspected as references on 2026-11-04:

- [pstack](https://github.com/backnotprop/pstack): candidate pool for lifecycle-specific engineering practices. This is the working source identification for the user's reference to pstack; confirm it before adopting material.
- [Superpowers](https://github.com/obra/superpowers): candidate process skills for discovery, planning, execution, debugging, verification, and review.
- [Matt Pocock's skills](https://github.com/mattpocock/skills): candidate skills for requirements clarification, domain modeling, and engineering work.

These are adoption candidates, not installed dependencies or a claim of compatibility. Select exact skills through their accepted issues. For each, record lifecycle role, source URL and immutable commit/version, license and required notices, inputs/outputs, adaptations and reasons, tool/service permissions, data handling, costs, fallback, and walkthrough evidence. Do not copy upstream content before checking its license.

Use one canonical skill under `skills/<process>/<skill-name>/SKILL.md`. Select one lead process for a task, add complementary practices only where needed, and reconcile conflicting gates explicitly. Every adapted skill must preserve this method's evidence, checkpoint, impact, and human-authority rules. Upstream defaults cannot authorize merge, introduce services, or replace the shared records.

## Product validation procedure

For the first complete walkthrough, use one bounded feature with a goal, an architecture mapping, a meaningful decision change, an implementation artifact, and mixed verification outcomes across two checkpoints. Have a maintainer who did not author the walkthrough answer the six questions in [NORTHSTAR.md](../../NORTHSTAR.md#who-this-serves), citing the supporting records.

Record expected facts before the walkthrough. Evaluate clarity through the reader's answers and difficulties, completeness through coverage of expected facts and accepted scope, and accuracy through supported assertions and correctly disclosed uncertainty. Required facts must be recoverable; unsupported certainty and hidden failed verification fail the walkthrough. Record actual findings rather than declaring success because links resolve.

Run the core walkthrough without the platform. When the platform exists, repeat with it and check that zoom and comparison preserve the same meanings, sources, and uncertainty. For platform delivery, agree corpus size, hardware, startup time, query latency, update time, memory, and package-size budgets in its proposal before implementation. No numerical speed or scalability guarantee is established here.

## Walkthrough and failure cases

Use a feature that changes from showing direct blockers to showing additional dependency context. Record the first checkpoint, map the affected component and goal, revise the decision, implement the accepted slice, and record a second checkpoint with one passed check and one pending check. A returning reader must recover the change, rationale, goal contribution, affected area, and pending verification using links alone. Repeat through the platform when available.

Check these negative cases in relevant future implementations: missing relationship target; stale evidence for a changed revision; inferred dependency presented as confirmed impact; unpreserved dirty state; mixed checkpoints; partial retrieval presented as exhaustive; conflicting edits; unavailable platform. Expected behavior is explicit failure or uncertainty with preserved source records, never fabricated completion. This document defines acceptance scenarios; it does not claim they have been executed.
