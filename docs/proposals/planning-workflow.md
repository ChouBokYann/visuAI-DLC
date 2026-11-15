# Proposal: Planning after Ideation

Status: starting proposal, 2026-11-15. The user asked to move on and defer actual Ideation testing to another project. This document prepares the next stage; it does not claim acceptance of individual Planning skills or implement them.

## Change and process

Explore independently callable Planning skills coordinated by a small workflow, following the same selective loading and concise human output approach as Ideation. The Planning directory currently contains only its index. Search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred proposal #8](https://github.com/ChouBokYann/visuAI-DLC/issues/8); the old proposal's mandatory skill counts and shared-record assumptions do not override NORTHSTAR.md.

## Problem and need

Ideation now has a candidate handoff describing the problem, selected direction, requirements, exclusions, and unresolved conditions. An implementer still needs to understand how that direction fits the actual project, which changes depend on others, and what evidence will demonstrate success. Repeating the requirements interview or producing a long unconnected task list would lose the benefit of that handoff.

## Proposed starting point

| Candidate responsibility | Input | Output and boundary |
|---|---|---|
| Design the change | Requirements, actual project context, selected integration direction | Smallest sufficient technical approach; affected components, interfaces, alternatives, risks, and decisions. Reuse existing capabilities; distinguish inspected facts from assumptions. |
| Slice the work | Sufficiently settled approach and requirements | Bounded, verifiable work slices with dependencies and requirement references. Each slice describes an outcome and affected areas; no automatic ticket publication. |
| Plan verification | Requirements, risks, and proposed slices | Observable checks and required evidence, using existing checks where possible. Planned checks are not passing results. |

These are responsibilities to compare against upstream candidates, not a fixed commitment to three skills. Verification planning may belong inside work slicing if a separate skill adds no independently useful entry point. Begin with design of the change because it bridges the selected product solution and concrete work.

Routing should skip already settled work. A narrow edit need not produce an architecture document. A provisional requirement may support bounded exploration but must not become a committed implementation assumption. Return a newly discovered product decision to Ideation without repeating unaffected work.

## Outputs and completion

Maintain a detailed agent-readable plan in an existing project artifact where practical. Retain requirement IDs, direct evidence references, rationale, alternatives, unresolved conditions, and affected areas. Give the human one or two sentences explaining what the plan enables and the material decision or blocker, with a link to detail. Do not require separate files for each responsibility or agent.

Planning is sufficient for an implementation handoff when the next work is bounded, its dependencies and relevant interfaces are understood, its acceptance evidence is specified, and unresolved conditions are explicit. Completeness is separate from the target project's authorization to implement.

## Scope and alternatives

Included now: this starting proposal and later source comparison. Proposed implementation paths, if selected, are `skills/planning/<skill-name>/`, the Planning index, and a workflow/evaluation record. Exact names and paths will be settled after comparison.

Excluded: implementing product features, publishing tickets, a scheduler, a new knowledge schema, visualization, and further Ideation trials before the user selects another project.

Alternatives: one combined planning skill is simpler to invoke but can load unnecessary instructions; three fixed skills could create artificial boundaries. Compare candidates around independently useful tasks, retaining the smallest useful set. Reuse the existing Ideation requirements skill rather than duplicate it in Planning.

## Tools, ownership, and sources

Human owner: ChouBokYann. Root agent prepares scope and source comparisons; independent maintainer review remains pending. This proposal adds no executable helper, dependency, service, cost, or data transfer. Later source research uses public upstream content; runtime trials would use the declared target environment. No ruflo tools were exposed in the current inventory.

Sources for this starting design: NORTHSTAR.md, workflow.md, the existing Ideation workflow and requirements skill, and the user's instructions. No upstream Planning skill has been selected or copied by this proposal. Compare pstack, Superpowers, Matt Pocock, and relevant ECC candidates; record exact revisions, licenses, adaptation reasons, and overlaps before implementation.

## Acceptance and validation to refine with selection

- A clear Ideation handoff enters Planning without a repeated interview; an unresolved provider assumption remains conditional.
- A small change stays small; an integration change identifies affected boundaries and meaningful checks without inventing new infrastructure.
- Work slices trace to requirements and expose dependencies. Verification guidance distinguishes proposed checks from observed evidence.
- Changed context updates affected plan sections and preserves stable references, prior rationale, exclusions, and actual approval scope.
- The short human reply communicates the outcome and blocker; details remain accessible without a report chain.
- Candidate walkthroughs establish only their observed behavior. Human usefulness and actual project testing remain deferred until the user selects another project.

Risks: overdesign, duplicate requirements, unnecessary task fragmentation, and treating a plan as authorization. Review walkthroughs against these risks. Rollback of this proposal removes only this draft; no product data or runtime changes are involved.

Next action: compare upstream approaches for designing a change against an existing codebase, then propose the first bounded Planning skill and its concrete acceptance criteria.
