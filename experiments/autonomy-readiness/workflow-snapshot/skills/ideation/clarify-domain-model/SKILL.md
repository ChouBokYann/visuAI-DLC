---
name: clarify-domain-model
description: Resolve ambiguous business terms, concept boundaries, and rules using concrete scenarios and existing project evidence. Use when conflicting meanings affect requirements or behavior; ordinary use of an already clear glossary does not require a domain-modeling session.
---

# Clarify domain model

Make the relevant concepts precise enough to reason about the requested behavior. Accept a conversation, requirement, glossary, or observed contradiction directly. No repository or prior Ideation run is required; absence of implementation limits comparison with actual behavior.

## Resolve the meaningful ambiguity

1. Find the existing definitions and decisions for the relevant business context. Reuse clear terms. Identify the specific ambiguity and why it changes a requirement, rule, relationship, or acceptance example; do not inventory the whole domain without a need.
2. Separate concepts that share a name but have different identities, owners, lifetimes, or rules. The same word may legitimately mean different things in different contexts. Do not force one global definition or rename existing concepts merely for stylistic consistency.
3. Use a normal case and a discriminating edge case where useful. Ask what should happen when a concept is created, changed, removed, or related to another. Label invented scenarios as probes, not observed user behavior. Existing explicit answers need no new interview.
4. Compare proposed meaning with available requirements, examples, and relevant code. Distinguish intended business behavior from current implementation. A mismatch may be a defect, obsolete documentation, or an unresolved product choice; code alone does not decide which.
5. Recommend a precise term or rule with its reason and relevant alternative. Ask only for a consequential unresolved choice that cannot be established from existing authority. Keep that choice provisional while continuing independent clarification. Never present an agent recommendation as the user's accepted definition.

Stop when the requested ambiguity is resolved or its concrete decision and consequence are explicit. Do not select a database model, generate an ontology, rename APIs, or implement behavior as part of terminology clarification.

## Preserve meaning without duplicating specifications

Update the existing glossary or relevant requirement/decision section when an authorized destination exists. Use the [domain template](references/domain-template.md) only when a new section is needed. Define terms concisely in business language; keep executable behavior and acceptance criteria in their canonical requirements, and link them. Do not create a glossary, ADR, and spec for the same small choice.

Retain stable IDs and context-qualified relationships, examples, sources, actual decision status, and affected references. When a definition changes, preserve the prior rationale as history and identify affected requirements; do not silently redefine past evidence. Record significant tradeoffs and revisit conditions in the existing decision record. A new ADR is useful only when the rationale has a distinct lasting need, not for every term.

Completion means the relevant concepts and differences are understandable, conflicts are resolved or explicitly pending, and the next owner/action is clear. Give one or two sentences describing the clarified meaning and material open choice with a link to detail. If no destination exists or saving fails, label the detailed record unsaved and supply it in one Markdown code block after the short update. Clarification is neither implementation proof nor approval to change the product.

## Business-connected outputs

Attach clarified terms and rules to existing requirements or decisions, preserving disagreements. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Matt Pocock's domain-modeling skill and formats; see [pinned sources, choices, and MIT notice](references/upstream-notices.md).
