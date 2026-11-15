---
name: define-requirements
description: Turn a selected or explicitly provisional solution into bounded, sourced requirements and observable acceptance conditions for Planning. Use when direction is sufficiently clear to specify behavior, or when updating an existing requirements brief; preserve unresolved decisions without inventing features or targets.
---

# Define requirements

Translate the intended outcome and solution direction into what must be true for users. Produce a Planning handoff, not an implementation plan or evidence of delivery.

## Establish the baseline

Read the request, existing requirements, problem, research and decisions relevant to the task. A repository and prior skill execution are optional. Reuse supplied answers and terminology; ask only for missing information that changes scope, required behavior, or acceptance.

Identify whether the solution is user-selected, proposed, conditional, or undecided. Preserve the actual source and scope of approval; a recommendation is not approval. If no direction is selected, capture known needs as provisional and name the choice needed rather than choosing it here. Do not repeat research or silently treat a documented provider claim as a proven integration.

## Define only the required behavior

1. State the problem, intended outcome, included scope and explicit exclusions. Reuse supplied technical constraints without introducing a new architecture, storage choice, framework, file layout, or task breakdown.
2. Express necessary user-visible capabilities, integration inputs/outputs, and relevant quality or operational constraints. Each requirement must trace to a supplied need, decision, constraint, or clearly labeled agent proposal. Do not add standard feature lists, roles, analytics, authentication, or AI merely to fill categories. Include relevant failure behavior when supported; otherwise propose it explicitly for confirmation.
3. Assign stable identifiers using existing project conventions; if none exist, use `REQ-001` onwards. Preserve identifiers on edits, do not reuse retired ones, and flag dependent criteria affected by changes. A request to update one requirement is not permission to rewrite all requirements or add features.
4. For each requirement, give an observable acceptance condition: context/input, expected behavior or outcome, and how it could be checked. Use external behavior rather than guessed implementation internals. This is a proposed check, not a passing test. Keep functional acceptance separate from evidence of business benefit.
5. Preserve supplied numerical limits, units and scope. For vague qualities such as fast, secure or easy, record the missing criterion; ask a targeted question or label a suggested criterion as proposed. Do not invent latency, availability, freshness, user-count or cost targets. A plausible number is not an accepted requirement.
6. Carry feasibility conditions and conflicting constraints into affected requirements and the handoff. Unknown provider access is not a committed interface; custom work does not supply missing data or rights. Known provider-independent needs can be specified while implementation-dependent requirements remain conditional. Never silently relax a mandatory constraint.

Distinguish **user-stated/accepted**, **agent-proposed**, and **conditional** requirements with sources. These describe the basis for a requirement, not whether the product satisfies it. A user-approved solution does not automatically approve your added criteria. Conflicts and missing acceptance conditions remain explicit even if a draft is otherwise complete.

## Check that translation preserves the request

Before handing off, compare the requirement set with the original request and relevant prior preferences, not just the selected solution. Map each material need, experience expectation and explicit constraint to a requirement and evidence method; expose any omitted or weakened expectation. Preserve required quality as baseline scope. If its meaning needs calibration, use the existing expectations record or recommend understand-expectations within the authorized workflow rather than assuming working functionality is enough.

Keep the user's words distinct from your operational interpretation and design choices. "A questionnaire that tells a story" does not imply five prose-heavy pages; "Three.js as the main design principle" does not mean merely importing the library. Those choices need a rationale and a check against the intended experience. A self-authored criterion that can pass while plainly missing the user's intent is inadequate.

Record which observations would establish each criterion and which plausible proxy would not. Examples: screenshots can assess composition but not animation; a working renderer proves graphics capability but not asset quality; passing tests cannot demonstrate a measured business outcome. Preserve unverified quality and user-reserved judgments in the handoff. Do not silently downgrade required quality into optional refinement to make the scope look complete.

## Maintain the outputs

Read [the requirements brief template](references/requirements-brief-template.md) when producing a new brief. Maintain the existing artifact in its established location when available. Preserve unrelated content, IDs, approval scope and metadata; reread and reconcile if the file changed since inspection. Link directly to supporting evidence or named claims rather than copy all prior reports.

New briefs are complete Markdown documents with YAML frontmatter enclosed by `---`. Preserve existing approved semantic fields without inventing a schema or marking the artifact `verified`. If no established destination or file access exists, return the complete unsaved artifact in one Markdown code block. Report failed writes accurately.

Give a one- or two-sentence human update including save/unsaved status: what scope the requirements establish, and the material condition or next decision. Link to a saved brief instead of dumping it unless requested; unsaved briefs follow the short update as the fallback. The update must not conceal a blocker present in the detailed artifact.

## Completion and Planning handoff

Use **ready for Planning** only when the direction is selected, scope is bounded, decision-relevant acceptance conditions are defined, and no unresolved material contradiction or feasibility condition prevents planning the agreed work. This is a completeness assessment, not implementation authorization, human review, or proof of feasibility beyond the evidence.

Otherwise use **provisional handoff** for useful bounded requirements with unresolved choices, or **blocked** when the conflict prevents a coherent handoff. Identify what Planning can safely explore and what must remain uncommitted; do not let provisional requirements masquerade as a settled build plan. Record user acceptance separately and only where actually supplied.

Before finishing, check that every required behavior has a source and acceptance condition or explicit gap, exclusions survived, existing IDs are preserved, and the short update matches readiness. Stop at the handoff; no automatic issue creation, ready-for-agent label, installation, purchases, test execution, implementation, or invocation of downstream skills. Use existing harness/file tools only; no mandatory service or subagent.

## Business-connected outputs

Own requirements with observable acceptance conditions and explicit outcome connections; retain conditional criteria. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Matt Pocock to-spec. See [pinned source, changes and MIT notice](references/upstream-notices.md) when reviewing or redistributing this skill.
