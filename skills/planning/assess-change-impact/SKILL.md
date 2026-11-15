---
name: assess-change-impact
description: Investigate what a proposed or completed change could affect across code, data, interfaces, consumers, and release behavior. Use for impact questions or consequential cross-boundary changes; reconcile expected impact with the actual diff without making every edit require another planning stage.
---

# Assess change impact

Identify the dependencies and assumptions that matter to this change, then establish which are supported and which remain unknown. Accept an existing requirement, proposal, or diff; prior workflow runs are optional. Reuse a current adequate impact assessment instead of repeating it.

## Establish the change

Read the intended behavior, exclusions, relevant project rules, and actual source context. For a completed change, establish baseline and target and include relevant uncommitted files; do not silently substitute the last commit or assume HEAD contains the working tree. If only a proposal exists, label all expected effects as predictions. Missing access or an unresolved requirement bounds the assessment, not evidence of no impact.

## Follow consequential dependencies

- Trace direct callers and indirect consumers using actual imports, routes, serialization, configuration, schemas, generators, and existing tests. Follow persistent data, caches, wire/file formats, feature flags, and independently deployed clients when relevant. A search with no matches only establishes what was not found in that search's scope.
- For each material effect, identify the affected object/consumer, causal path, possible failure, evidence, and cheapest meaningful check. Distinguish confirmed effects, plausible but unverified risks, and risks cleared within a stated boundary. Do not invent probabilities or enumerate unrelated hypothetical failures.
- Identify the assumptions on which compatibility depends. Use available source or existing checks to test them within the task's permissions. Record observed output, tested state, and limits; proposing a test does not prove the assumption. New executable probes are warranted only when they answer a concrete gap and are authorized.
- Where persistent data or independently deployed components change, identify deployment order, compatibility window, recovery approach, and irreversible effects. Missing information is a readiness gap for the affected action, not a reason to stop unrelated analysis. A code rollback is not necessarily data recovery.

Keep success criteria in their canonical source. Name affected tests, documentation, and decisions only where the dependency requires it; do not introduce a registry or full implementation plan. Investigation does not authorize product changes, migration, rollback, publication, or deployment.

## Reconcile and report

If implementation exists, compare its actual diff with the intended scope and recorded predictions. Mark material added/missed effects, changed assumptions, and stale evidence. An unavailable baseline prevents that comparison; report it rather than claiming alignment. Do not equate impact coverage with full correctness or independent approval.

Update the current direction/delivery record, using the [impact template](references/impact-template.md) only when a new section or record is needed. Preserve requirement, decision, and evidence IDs and their canonical targets, reasons, and stated/inferred basis. A changed premise returns to its decision; a known local fix can proceed through existing authorized implementation scope.

Finish with one or two sentences naming the main consequence and any material unresolved dependency, linked to the record. With no destination or a failed save, label the full record unsaved and supply it in one Markdown code block after that update. The assessment is complete when relevant impact paths have evidence or explicit gaps with next checks; it need not invent certainty to finish. No mandatory subskill, agent fanout, or extra planning gate is introduced.

## Business-connected outputs

Reference affected records and distinguish documented dependencies from uncertain impact; do not infer business causation. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from pstack and ECC; see [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md).
