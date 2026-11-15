---
name: refactor-safely
description: Restructure an existing system around clearer responsibilities while preserving agreed observable behavior. Use for modularisation or demonstrated architectural friction; distinguish refactoring from intentional product, data, or interface changes.
---

# Refactor safely

Read the requested restructuring, actual code and callers, existing decisions, and project checks. Identify the concrete friction: repeated cross-module edits, leaked responsibilities, difficult behavioral testing, or another evidenced problem. Reuse sufficient direction; do not require an architectural redesign for a local extraction.

## Establish what must survive

Record the affected public behavior, contracts, data representation, error behavior, ordering, and side effects that callers rely on. Pin the starting state, including relevant dirty files. Existing behavior can contain defects: explicitly separate agreed corrections from behavior-preserving work instead of changing semantics silently.

Locate actual consumers and configuration, generated outputs, tests, and release dependencies. Missing external consumers are unknown, not absent. Establish relevant baseline checks before changing structure; characterize important untested behavior with independent examples where useful. Do not preserve a known defect as an unquestionable requirement or invent expected values from the proposed replacement.

## Change in checked increments

Choose the smallest boundary that addresses the friction. Compare retaining the current design, consolidating responsibilities, and extracting a module where those alternatives are meaningful. Prefer an interface that hides necessary complexity without adding speculative adapters or wrappers. Preserve project terminology rather than force a new architecture vocabulary.

Move behavior, migrate callers, and check each useful increment through the interface consumers actually use. Keep error handling and data protections. For staged compatibility, name its owner and removal condition; do not delete externally used interfaces merely because local searches are empty. If an intermediate state cannot work independently, record the integrated checkpoint explicitly.

Assign one owner for shared interfaces during parallel work. Independent worker passes do not prove the combined revision; reconcile changes and test through real consumer paths. Mocks can bound external behavior but do not prove deployment compatibility.

Retain tests for required behavior. Remove obsolete implementation-coupled tests only after their relevant behavioral protection is demonstrably preserved; fewer tests is not itself success. If a necessary change alters an agreed contract or stored data, return that decision to its owner and coordinate migration rather than calling it a refactor.

## Result

Update the existing delivery record: friction addressed, old/new responsibility, preserved invariants, affected consumers, checks with tested state, compatibility work remaining, and decision rationale. Keep canonical references and useful superseded history. No new architecture report is mandatory.

Complete only when the requested restructuring and required integration checks are handled; otherwise name partial work and the next action. Give one or two sentences with the outcome and material limitation linked to the record. Without a writable destination, label the detailed record unsaved and provide it in one Markdown code block. This does not authorize merge or release.

## Business-connected outputs

Own refactor changes and evidence for preserved behaviour; reference existing constraints and expose missing business rationale. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Matt Pocock's codebase-design methods; see [sources and MIT notice](references/upstream-notices.md).
