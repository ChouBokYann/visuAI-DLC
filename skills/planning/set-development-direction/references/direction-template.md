# Development direction template

Use for a new brief only; an existing issue or document may need just a short section. Replace prompts with grounded content or explicit unknowns. Do not expand this into a task list. Preserve an existing project's identifiers and metadata.

```markdown
---
type: Development Direction
title: [Change or outcome]
description: [Direction and decisive condition, if any]
status: draft
---

# [Development direction]

## Direction
[Selected/proposed/conditional approach; existing capability to reuse; relevant scope and exclusions. Link requirements and inspected project evidence instead of copying them.]

## Decisions and constraints
[Only consequential choices, why they fit, actual decision-maker and source, relevant alternative/tradeoff, and conditions for reconsideration. Preserve stable IDs and identify kinds. State relationships with canonical target references and their stated/inferred basis. Do not invent choices to fill this section.]

## Next useful increment
[Behavior or experiment, bounded scope, requirement reference, and observable success signal. For an experiment: the question and result that would change direction. Detailed tasks and checks belong in Implementation.]

## Evidence and open conditions
[Direct sources for findings; reported/documented/observed/inferred/unknown basis; material prerequisites or evidence limits. State what is blocked and what can safely proceed.]

## Handoff
- Readiness: [Ready for implementation planning / Conditional / Blocked; reason]
- Authorization: [Actual source and scope, or not recorded; readiness is not permission]
- Next owner/action: [Specific next increment, decision, or check]
```

Add a labeled decision-history section only when preserving superseded rationale. `status: draft` describes the document, not implementation progress, factual verification, or approval. No fixed relationship syntax or ontology extension is introduced. A short human update links to this brief; do not generate a separate summary file.
