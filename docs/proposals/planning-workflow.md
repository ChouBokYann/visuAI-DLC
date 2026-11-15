# Proposal: Planning after Ideation

Status: starting proposal, 2026-11-15; document and semantic-preservation approach subsequently agreed by the user in this session. Actual project testing remains deferred. This document prepares the next stage; it does not claim independent maintainer acceptance of individual Planning skills or implement them.

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

## Agreed document approach

Use one existing combined brief for small changes. When detail warrants separation, maintain a product brief (problem, requirements, selected direction, evidence, and decisions) and a delivery plan (technical approach, work slices, dependencies, and verification checks). These are responsibilities, not mandatory filenames or a migration requirement. Existing Ideation records remain canonical; reference or update them rather than copying their content into a new product brief.

Maintain one current view in each artifact. Keep useful superseded rationale in a clearly labeled decision-history section, not a new report for every iteration. Human handoffs are one or two sentences with links to the current detail, not additional summary files.

### Preserve meaning for later mapping

Capture the following information in readable Markdown using the project's existing conventions. A small table or labeled entry is sufficient; no new YAML schema, parser, or graph store is introduced.

| Information | Authoring rule |
|---|---|
| Identity and kind | Give referenced requirements, decisions, evidence items, work slices, and checks stable IDs and explicit kinds. Preserve existing IDs and never reuse a retired ID for a different concept. |
| Relationships | State the source ID, relationship meaning, and target ID explicitly. Identify the canonical document/section for cross-document targets; qualify IDs by document when they are not project-unique. Record each relationship at its owning entry rather than maintaining duplicate forward and reverse lists. |
| Basis and evidence | Record whether a relationship is explicitly stated or inferred, why it is justified, and the direct source supporting it. Evidence includes the relevant claim or observation, its source/revision where available, and its limits; a bare URL is insufficient. |
| State and provenance | Keep current/superseded decisions, planned/observed checks, uncertainty, and actual acceptance separate. State who made a choice, its source, and its scope; missing acceptance stays unrecorded. Document lifecycle status does not establish any of these facts. |
| Reconsideration | Preserve alternatives, tradeoffs, and the condition under which the choice should be revisited. |

Relationship labels such as `supersedes`, `implements`, `checks`, `depends on`, `supports`, and `challenges` express authoring intent here. They are not a finalized ontology vocabulary or executable extension. Distinguish a planned implementation relationship from evidence that the requirement has been delivered. Inferred connections remain inferred; dependency reachability indicates work to inspect, not proven breakage.

Use this compact pattern when a decision needs a durable entry; omit irrelevant fields with a reason rather than inventing evidence:

```text
ID / kind / state: [existing ID] / Decision / [proposed, selected, or superseded]
Decision and scope: [choice and affected iteration or feature]
Chosen by / source: [actual decision-maker and message or artifact reference, or not selected]
Connections: [source ID] [relationship] [target ID and canonical location]
Basis and evidence: [stated or inferred; supporting source and its limits]
Reason / alternatives / tradeoff: [why this choice fits the need]
Revisit when: [specific new evidence or changed constraint]
```

For example, a later selected manual-policy decision can supersede an API-based decision because a documented provider limitation challenges the earlier integration assumption. Keep that finding's source and scope with the evidence, link the new decision to the affected requirement, and link the revised work slice to that requirement. Do not claim that a documentation finding proves the completed manual solution works.

This preserves inputs for later ontology mapping without claiming that mapping is already complete or lossless. Future code could validate identities, references, permitted relationship types, and current-state consistency; it cannot establish factual truth merely from a connected graph. The historical knowledge-v1 profile remains deferred and is not reactivated by this convention. Preserve existing metadata without asserting compliance with a new OKF extension.

## When Planning finds a feasibility problem

1. Distinguish a confirmed limitation from missing access, missing evidence, or an unacceptable cost/complexity tradeoff. Record the finding and its basis in the existing artifact.
2. Link it to the challenged assumption or decision and identify dependent requirements, work slices, and checks. Pause dependent work; preserve unaffected scope. Distinguish confirmed effects from possible effects needing inspection.
3. Return only to the relevant Ideation responsibility: research missing facts, reconsider known options, or clarify the problem if the finding changes the underlying need. Reuse settled context.
4. Recommend the smallest viable alternative and expose its tradeoffs. Obtain the user's choice when it has not been delegated; do not mark an agent proposal as selected or approved.
5. Once a new direction is selected, update current requirements and plans in place. Preserve IDs for unchanged concepts, assign new IDs to distinct replacement decisions, record supersession, and retain useful history. Replace obsolete current next actions rather than leaving conflicting handoffs.

Missing facts that remain unresolved produce a conditional or blocked handoff with a concrete next action. Going back to Ideation is not permission to expand implementation scope or restart all stages.

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
- A feasibility reversal links the finding to the challenged decision, pauses dependent work, and records a selected replacement through supersession without creating another report chain. Missing evidence does not become proof of infeasibility.
- Referenced concepts have stable identities and kinds; relationships name both ends and their basis. Cross-document references identify canonical locations. Planned work and checks remain distinguishable from delivered behavior and observed results.
- Current decisions and handoffs are unambiguous, superseded rationale remains recoverable, and unrelated requirements retain their IDs. These are authoring/review criteria, not a claim of automatic semantic validation.
- The short human reply communicates the outcome and blocker; details remain accessible without a report chain.
- Candidate walkthroughs establish only their observed behavior. Human usefulness and actual project testing remain deferred until the user selects another project.

Risks: overdesign, duplicate requirements, unnecessary task fragmentation, and treating a plan as authorization. Review walkthroughs against these risks. Rollback of this proposal removes only this draft; no product data or runtime changes are involved.

Next action: compare upstream approaches for designing a change against an existing codebase, then propose the first bounded Planning skill and its concrete acceptance criteria.
