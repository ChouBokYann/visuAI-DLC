---
name: set-development-direction
description: Set a lean technical direction from a selected solution and requirements, or revise it when evidence changes a consequential decision. Use before implementation when approach, constraints, or the first useful increment need clarification; leave detailed tasks and test commands to Implementation.
---

# Set development direction

Give Implementation enough direction to plan and check the next bounded increment. Prefer the smallest sufficient change and stop before predicting the whole implementation.

## Reuse the baseline

Read the relevant requirements, selected solution, existing decisions, and requested scope. Reuse supplied answers and project terminology. If sufficient direction already exists, reference it and identify the next increment without restarting planning. A narrow update changes only affected sections.

Distinguish a selected direction from an agent proposal or conditional choice. When the product direction is undecided, name the missing choice; do not select it here unless delegated. Explicitly requested provisional exploration can proceed with its conditions visible. Ask only about missing information that changes the direction or the validity of the next increment.

## Ground the direction

Inspect only the existing capabilities and project areas needed to decide how the selected solution fits. Identify what to reuse, relevant callers or integration boundaries, and constraints that an implementer cannot safely infer. Reference inspected paths or supplied evidence; if project access is absent, label the approach provisional rather than inventing a stack or verified fit.

Record consequential choices with reasons and relevant alternatives. Do not manufacture multiple designs when an existing pattern suffices. Prefer useful, small interfaces where a real interface choice matters; leave exact signatures, file lists, internal abstractions, and local reversible choices to Implementation.

Expose prerequisites that affect whether the next increment is valid: for example unavailable provider data, a destructive migration, or an incompatible public contract. Resolve a decisive fact through permitted, bounded inspection where possible; otherwise state the missing check. Failed access or missing evidence is not proof of infeasibility. Do not research indefinitely when a focused implementation experiment could answer the question.

When a reader requests a diagram of the design, pass the current flow and proposed changes to [Diagram system](../../implementation/diagram-system/SKILL.md). Keep the decision and its rationale in the direction brief.

## Pick the next useful increment

Name the first useful behavior or experiment, its scope, and an observable success signal linked to the existing requirement. For an experiment, state the question and what result would change the direction; a successful prototype does not establish production readiness. Do not execute the experiment as part of this skill.

Leave task decomposition, exact interfaces, test cases and commands, and later increments to Implementation's plan-implement-check-adjust loop. Retain existing acceptance criteria and material risks; lean planning is not permission to defer a prerequisite until after an irreversible action. Planned checks are not passing results.

## Preserve meaning while updating

Use the existing project brief or direction section. Keep stable IDs and explicit kinds for referenced requirements, decisions, and evidence; create IDs only for concrete entries, using existing conventions. Identify cross-document targets by canonical location. State relationships explicitly, such as a decision affecting a requirement or evidence challenging a decision, with their stated/inferred basis and supporting source. Do not build a speculative task graph or duplicate reverse relationships.

Keep source, uncertainty, actual decision-maker, and acceptance scope visible. A recommendation is not a user choice. When a selected decision changes, assign a new decision ID and mark which decision it supersedes; keep useful prior rationale in labeled history and replace obsolete current actions. Reread and reconcile an artifact changed by another writer before editing it.

Implementation can adjust local details without returning here. If evidence changes scope, a material constraint, or a consequential decision, revisit only that decision. Pause dependent work and distinguish confirmed impact from possible impact. When the product solution must change, carry the finding and affected requirement references back to Ideation for research or recommendation; preserve unaffected work and do not silently select a replacement.

## Output and stopping point

Read the [direction template](references/direction-template.md) only when creating a new brief. Existing documents retain their format and metadata. New standalone briefs use the template's complete Markdown frontmatter. Use the shared output contract for typed links; structural validation does not establish truth.

Give one or two sentences linking to the saved detail: direction, first useful increment, and any material condition or next decision. Include save status and necessary limitations within that budget. If no destination or file access exists, give the short update followed by the complete unsaved brief in one Markdown code block; report a failed write accurately.

Stop when Implementation can plan the next bounded increment from the direction, constraints, and success signal. Mark the handoff **Ready for implementation planning**, **Conditional**, or **Blocked**, with the reason and next owner/action. A condition that prevents one increment need not block unrelated work. Keep readiness separate from authorization to implement.

Before finishing, check that claims have a source or uncertainty label, requirements and exclusions survived, current decisions are unambiguous, and no detailed task plan has slipped in. No automatic coding, ticket publication, installation, downstream skill invocation, or additional approval round. Use the target project's existing authorization rules.

## Business-connected outputs

Own technical direction decisions linked to existing requirements and intended outcomes. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted principles from pstack, Matt Pocock, ECC, and Superpowers. Read [pinned sources, adaptation details, and MIT notices](references/upstream-notices.md) when reviewing or redistributing this skill.
