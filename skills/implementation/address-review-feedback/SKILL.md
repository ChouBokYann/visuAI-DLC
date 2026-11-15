---
name: address-review-feedback
description: Evaluate existing review findings against requirements and actual code, resolve authorized corrections, and track evidence-backed dispositions. Use when responding to feedback; it does not initiate a new general review or automatically accept a reviewer's proposed scope.
---

# Address review feedback

Resolve what the review actually found. Read the findings, originating criteria, relevant decisions, and the artifact/revision reviewed. Identify current working-tree changes and whether a finding still applies. Reuse supplied context; no earlier workflow run is required.

## Evaluate each finding

- Preserve the reviewer's finding ID or source link. Establish the claimed problem, location, consequence, and proposed remedy separately: a valid defect can have an unsuitable suggested fix.
- Check the claim against actual behavior, callers, contracts, supported environments, and project standards. A reviewer title or confident assertion is not evidence. An absent local caller does not prove a public interface is unused. If access or provenance is missing, retain the specific uncertainty.
- Distinguish correctness blockers, requirements conflicts, optional improvements, duplicates, and stale findings. Support a disagreement with evidence and a proposed next check, not automatic dismissal. Preserve unresolved disagreement when the evidence does not settle it.
- A new requirement or consequential change to agreed scope returns to its decision owner. Do not turn preference into a required criterion. Clarify ambiguous findings only where they block a sound decision; continue independently understood and authorized work.

## Correct within existing authority

If the task is response drafting or assessment only, stop at dispositions and recommended actions. If corrections are authorized, order them by consequence and dependencies and make the smallest complete fixes using the project's implementation/testing contract. Preserve other contributors' changes. Reuse the core implementation method; no mandatory invocation or new execution engine is needed.

Run checks that address the actual reported failure and relevant regression risk. Record the tested state and observed results; distinguish baseline failures and missing prerequisites. Do not weaken assertions or change acceptance criteria merely to close a finding. A code edit or passing unrelated suite alone does not establish resolution.

Reassess affected findings after fixes; a newer diff may invalidate an earlier review or pass. Unresolved required checks stay visible. Addressing a finding is not independent reviewer acceptance, thread closure, merge permission, or deployment authority. Publish replies or change external review state only when the user has authorized that action; otherwise retain the proposed response locally.

## Maintain one review record

Update the existing findings/delivery record, using the [feedback template](references/feedback-template.md) only for a new section. Keep the original claim, current disposition, rationale, evidence, and next action together. Use existing project statuses; otherwise distinguish **Resolved**, **Valid / pending fix**, **Disputed**, **Needs clarification**, **Duplicate**, and **No longer applicable** with reasons. Do not silently drop findings. Link duplicates to their canonical finding and retain history when a disposition changes.

Finish when every in-scope finding has a supported disposition and required unresolved work is explicit. For an authorized fix request, continue through the requested corrections rather than stopping after classification; report blocked or partial work accurately. Give one or two sentences stating the outcome and material outstanding issue, linked to detail. If no destination or saving fails, label the full record unsaved and provide it in one Markdown code block after the short update.

## Business-connected outputs

Update affected decisions, changes and evidence; retain unresolved disagreement and superseded findings. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Superpowers receiving-code-review; see [pinned source, choices, and MIT notice](references/upstream-notices.md).
