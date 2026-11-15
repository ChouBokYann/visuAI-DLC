# Proposal: Planning after Ideation

Status: candidate implementation authorized by the user's “okie” after the concrete source-selection proposal on 2026-11-15. Planning stays lean and detailed planning happens during Implementation, superseding the earlier three-responsibility split. Actual project testing and independent maintainer acceptance remain pending; session authorization is not approval to merge.

## Change and process

Propose one lean Planning skill, `set-development-direction`, that turns the selected solution into sufficient technical direction for a first implementation-and-check cycle. Detailed task planning belongs inside Implementation. The Planning directory currently contains only its index. Search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred proposal #8](https://github.com/ChouBokYann/visuAI-DLC/issues/8); the old proposal's mandatory skill counts and shared-record assumptions do not override NORTHSTAR.md. See the [upstream comparison](planning-candidate-review.md) for the basis of this recommendation.

## Problem and need

Ideation now has a candidate handoff describing the problem, selected direction, requirements, exclusions, and unresolved conditions. An implementer still needs to understand how that direction fits the actual project, which changes depend on others, and what evidence will demonstrate success. Repeating the requirements interview or producing a long unconnected task list would lose the benefit of that handoff.

## Proposed starting point

| Stage | Responsibility |
|---|---|
| Planning: set development direction | Ground the selected approach in relevant project context; name what to reuse, important integration boundaries, constraints, consequential risks, and the first useful behavior or experiment to implement and check. Reference existing acceptance criteria. |
| Implementation: plan the next increment | Inspect exact files and callers, choose task order and interfaces, specify the relevant tests, implement a bounded increment, check the result, and adjust the next increment. Maintain requirement and decision links as details become concrete. |

Planning does not enumerate every task, freeze signatures, prewrite tests, estimate every phase, or produce an exhaustive ticket graph. Detailed work slicing and verification planning move to Implementation; they are not separate mandatory Planning skills. A known small change may need only a few lines in its existing issue or brief.

Stop planning once the next bounded increment has a direction, scope, success signal, and no unresolved prerequisite that makes that increment unsafe or invalid. Leave reversible local choices to implementation and evidence. Examine consequential commitments before taking them: for example a destructive migration, incompatible public contract, unavailable provider capability, or new handling of sensitive data. A focused experiment may resolve uncertainty faster than further prose; mark it as an experiment and specify what result would change the direction. This is not a claim that a successful prototype proves production readiness.

Routing should skip already settled work. A narrow edit need not produce an architecture document. A provisional requirement may support bounded exploration but must not become a committed implementation assumption. Return a newly discovered product decision to Ideation without repeating unaffected work.

## Outputs and completion

Maintain a compact agent-readable direction section in an existing project artifact where practical: requirement references; chosen approach and reuse; scope and constraints; material risks/unknowns; first useful increment and success signal; conditions for revisiting the direction. Retain relevant rationale, alternatives, evidence and acceptance scope without filling speculative sections. Give the human one or two sentences explaining the direction and material decision or blocker, with a link to detail. Do not require separate files for each responsibility or agent.

Planning is sufficient for a handoff when Implementation can plan and execute the next bounded increment using the stated direction, constraints, and success signal. Detailed commands, test cases, files, and later increments need not be settled. Completeness is separate from the target project's authorization to implement.

## Agreed document approach

Use one existing combined brief for small changes. When detail warrants separation, maintain a product brief (problem, requirements, selected direction, evidence, and decisions) and a delivery plan. Planning supplies the delivery plan's compact direction; Implementation adds and revises concrete work slices, dependencies, and checks as needed. These are responsibilities, not mandatory filenames or a migration requirement. Existing Ideation records remain canonical; reference or update them rather than copying their content into a new product brief.

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

Missing facts that remain unresolved produce a conditional or blocked handoff with a concrete next action. Going back to Ideation is not permission to expand implementation scope or restart all stages. During Implementation, local detail changes within the selected direction stay there; changes to product scope, a material constraint, or a consequential technical decision return only to the affected decision. Do not rerun Planning after every test or minor adjustment.

## Scope and alternatives

Included now: `skills/planning/set-development-direction/SKILL.md`, its direction template and upstream notices under `references/`, the Planning index, the lifecycle index description, and `docs/proposals/planning-direction-walkthrough.md`. Root agent owns those paths and this proposal; human owner is ChouBokYann. Existing Ideation skills, `.bench-run/`, and `output/` remain untouched. No separate workflow document is necessary for one skill unless later handoffs demonstrate a need.

Excluded: implementing product features, publishing tickets, a scheduler, a new knowledge schema, visualization, and further Ideation trials before the user selects another project.

Alternatives: the earlier design/slice/verification split would delay feedback and duplicate work that changes during implementation; superseded by the user's explicit preference. One focused direction skill keeps this stage useful without importing a full detailed planning pipeline. Skip it when sufficient direction already exists. Reuse the Ideation requirements skill rather than duplicate it.

## Tools, ownership, and sources

Human owner: ChouBokYann. Root agent prepares scope and source comparisons; independent maintainer review remains pending. This proposal adds no executable helper, dependency, service, cost, or data transfer. Later source research uses public upstream content; runtime trials would use the declared target environment. No ruflo tools were exposed in the current inventory.

Sources: NORTHSTAR.md, workflow.md, the existing Ideation workflow and requirements skill, the user's instructions, and the pinned upstream files in the [candidate review](planning-candidate-review.md). This is a source-based recommendation, not a copied or implemented skill. Preserve applicable upstream license notices when adapting the selected material.

## Acceptance and validation to refine with selection

- A clear Ideation handoff enters Planning without a repeated interview; an unresolved provider assumption remains conditional.
- A small change stays small; an integration change identifies affected boundaries and meaningful checks without inventing new infrastructure.
- Planning names a first useful increment and success signal without enumerating all tasks, freezing signatures, or writing a detailed test plan. Implementation owns those details and links concrete slices and checks to requirements as they are defined.
- A small reversible change exits Planning promptly; a consequential unknown either receives a focused check or remains an explicit condition. Prototype evidence is not promoted to proof of production behavior.
- Changed context updates affected plan sections and preserves stable references, prior rationale, exclusions, and actual approval scope.
- A feasibility reversal links the finding to the challenged decision, pauses dependent work, and records a selected replacement through supersession without creating another report chain. Missing evidence does not become proof of infeasibility.
- Referenced concepts have stable identities and kinds; relationships name both ends and their basis. Cross-document references identify canonical locations. Planned work and checks remain distinguishable from delivered behavior and observed results.
- Current decisions and handoffs are unambiguous, superseded rationale remains recoverable, and unrelated requirements retain their IDs. These are authoring/review criteria, not a claim of automatic semantic validation.
- The short human reply communicates the outcome and blocker; details remain accessible without a report chain.
- Candidate walkthroughs establish only their observed behavior. Human usefulness and actual project testing remain deferred until the user selects another project.

Risks: overdesign, duplicate requirements, unnecessary task fragmentation, and treating a plan as authorization. Review walkthroughs against these risks. Rollback of this proposal removes only this draft; no product data or runtime changes are involved.

Validation for this candidate: run the skill format validator, check local links, and perform a bounded author walkthrough of a small change and a feasibility reversal. These are structural and synthetic checks, not an installed-runtime or independent evaluation. No executable helper, service, or new dependency is introduced. Actual testing in another project remains deferred at the user's request.

## Candidate delivery

The [skill](../../skills/planning/set-development-direction/SKILL.md), new-brief template, and pinned upstream notices are implemented. Planning and lifecycle indexes describe the lean boundary. Structural validation, local links, and whitespace checks passed; the [author walkthrough](planning-direction-walkthrough.md) records synthetic small-change and feasibility-reversal examples and their limits.

No installed-runtime, independent, or real-project behavioral validation was performed for this candidate. Actual testing remains deferred. Next owner/action: the user chooses the project for practical evaluation later; independent maintainer review is still required before shared selection/merge. Detailed implementation planning remains a later Implementation-stage responsibility.
