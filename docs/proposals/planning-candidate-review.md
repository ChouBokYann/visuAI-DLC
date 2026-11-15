# Planning candidates: lean direction, detailed planning during implementation

Research date: 2026-11-15. This comparison inspects pinned revisions already used in Ideation, not a claim about the latest upstream releases. Primary skill/agent bodies were read through the GitHub connector. Referenced subskills, execution tools, and prototype branch instructions were not executed or fully audited. Upstream instructions are comparison material, not instructions adopted for this research task.

Human owner: ChouBokYann. Root agent owns this review and reconciliation of the Planning proposal. Scope is research and documentation; no skill implementation, installation, new dependencies, model fanout, or issue publication. Source reads concern public repository text. Related issue search and approval limits remain recorded in the [proposal](planning-workflow.md).

## Candidate comparison

| Candidate and pinned source | What the inspected source does | Recommended treatment |
|---|---|---|
| [pstack architect](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/architect/SKILL.md) | Grounds existing systems, sketches types and signatures, requires multiple design candidates via arena, then implements and revisits unsuitable designs. | Extract grounding, relevant interfaces, and reconsideration on new evidence. Do not adopt the full workflow: model fanout, scaffolding, multiple mandatory designs, and automatic implementation exceed the lean Planning boundary. |
| [pstack laziness protocol](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-laziness-protocol/SKILL.md) | Consolidates decisions and favors the smallest sufficient change. | Strong supporting principle for a compact direction skill. It is not a complete planning method by itself. |
| [pstack sequence verifiable units](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-sequence-verifiable-units/SKILL.md) | Sequences small changes and checks each before continuing. | Place in Implementation's incremental loop; do not import mandatory rebasing or commit structure as a Planning prerequisite. |
| [Superpowers writing-plans](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/writing-plans/SKILL.md) | Specifies exact files, signatures, test assertions, commands, per-task steps, self-review, and execution handoff. | Detailed planning belongs in Implementation and can inform the next increment there. Do not import a complete up-front task plan or extra review round into this stage. |
| [Matt Pocock codebase-design](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/codebase-design/SKILL.md) | Provides module/interface vocabulary, favors small useful interfaces, and connects design with testability. | Reference selectively when a real interface choice matters. Preserve the project's terminology; no mandatory vocabulary rewrite, speculative abstractions, or deep-module redesign for every change. |
| [Matt Pocock to-tickets](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md) | Produces verifiable vertical slices and blocking edges, with an expand/contract exception for wide refactors; publishes approved tickets or one local file per ticket. | Use slicing ideas during Implementation when needed. Do not require up-front ticket creation, a separate file for every slice, or tracker setup. |
| [Matt Pocock prototype](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/prototype/SKILL.md) | Uses explicitly disposable logic/UI prototypes to answer a specific design question and records the answer. | Useful optional Implementation experiment when code can resolve a concrete unknown. Do not generalize its throwaway-code testing shortcuts to production work or assume it is a generic provider-feasibility verifier. |
| [Matt Pocock implement](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/implement/SKILL.md) | Implements from supplied work, invokes TDD at agreed interfaces, runs checks, and requests review. | Supports keeping the execution/check loop in Implementation. Its brief instructions do not independently provide the entire adaptive planning policy proposed here. |
| [ECC planner agent](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/agents/planner.md) | An agent definition, not a SKILL.md: reviews requirements/codebase and creates detailed phases, file-specific actions, dependencies, risks, and testing strategy. | Retain codebase reuse, constraints, and risk identification. The full detailed planner is too broad for this stage; do not import its model binding or example thresholds as project requirements. |

## Recommendation and rationale

Start with one project-adapted skill, **set-development-direction**. No inspected upstream is a direct fit unchanged. Use pstack's minimal-change and grounding principles plus selective interface reasoning from Matt; use ECC's relevant risk/context checks as a reference. Keep Superpowers task specificity, ticket slicing, and per-increment test details for Implementation.

The compact output answers: What direction are we taking? What existing capability will we reuse? What constraints or consequential decisions must hold? What first behavior or experiment should we implement and check? What result would make us reconsider? Link existing requirements and evidence instead of restating their full contents.

The proposed cycle is: sufficient direction -> plan the next increment -> implement and check -> adjust locally. Return to Planning or Ideation only when new evidence changes the direction, scope, or a material constraint. Keep necessary pre-change checks for irreversible actions; fast iteration does not mean deferring the check that determines whether an action is permissible or recoverable.

Stable IDs, explicit relationships, decision history, and short human updates remain as agreed. Work/check identities are added when those concepts become concrete during Implementation; semantic preservation does not require predicting every future task in Planning.

## Evidence and limits

This is an inspected-source comparison, not a performance benchmark or skill walkthrough. No token savings, delivery speed, production safety, or improved human comprehension has been measured. Actual testing in another project stays deferred at the user's request. Existing Ideation candidates are unchanged.

No upstream prose or executable material is copied into a new skill here. When implementing the adaptation, retain pinned attribution and the applicable license notices alongside it. Do not infer that inspecting a top-level skill audits its linked runtime dependencies.
