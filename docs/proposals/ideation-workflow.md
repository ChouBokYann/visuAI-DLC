# Proposal: route the Ideation skills

Status: candidate implementation on `first-iteration`, requested by the user's “continue” on 2026-11-15 after the four skill candidates were implemented. This follows the session-authorized candidate process; independent maintainer acceptance and merge permission remain unrecorded.

## Change and lifecycle process

Add `docs/workflows/ideation.md` and link it from `skills/ideation/README.md`. Evaluate the workflow and existing skills together in `docs/proposals/ideation-workflow-walkthrough.md`. Change an existing skill only if the integrated trial demonstrates a defect, with evidence and a targeted rerun.

## Problem and need

The four independent skills have no shared entry-point or transition rules. Users who already know their options should not repeat discovery; users starting from a vague problem need the outputs to carry meaning, uncertainty and decisions into requirements. A new report per handoff would recreate the reading burden this workflow is intended to avoid.

## Proposed solution

A short, project-authored workflow selects the earliest necessary skill from available context, loads only that skill and relevant supporting records, and carries unresolved conditions through each transition. Running an individual skill stays bounded; requesting the workflow permits progression through applicable Ideation steps but does not invent a user's answers or acceptance. Maintain a short current human summary within an existing artifact rather than producing a separate orchestration report.

## Scope

- Included: entry routing, explicit handoff conditions, stopping/resuming, concise human updates, artifact reuse, and integrated walkthrough evidence.
- Excluded: executable scheduler, installer, UI, ontology/schema implementation, new agent definitions, implementation planning, external publication, and changes to the contribution contract.

## Alternatives and tradeoffs

- One combined skill repeats instructions and loads stages the user may not need; the user explicitly chose separate skills.
- An executable router would require a runtime and machine-readable state not yet selected. A documented workflow is sufficient to test these human/agent handoffs first.
- An index alone cannot resolve recommendation versus acceptance, partial evidence, or changed-context routing. Add only those coordination rules, leaving detailed steps in the canonical skills.

## Tools and services

The workflow introduces no dependency or service. Individual skills retain their existing boundaries and data handling; research may use authorized sources. No mandatory fanout, installation, spending, account access, publication or production probes. Validation uses a separate agent with supplied synthetic evidence and scripted user replies; it creates only an evidence record, not a real product or provider integration.

## Acceptance criteria and validation

- Vague initial need reaches a bounded requirements handoff through the necessary stages using actual prior outputs; adequate supplied evidence may skip research. Separately exercise research-to-recommendation when research is requested. Scripted replies are explicitly fixtures, not fabricated real-user decisions.
- Clear options begin at recommendation; an existing selected direction begins at requirements. Record which skill files were loaded to check progressive disclosure, without claiming token savings from file count.
- A conditional recommendation stays conditional in the requirements and short update; a missing evidence source does not become verified through a handoff.
- A narrow single-skill request stops there even if later steps are possible.
- Repeated unresolved evidence does not trigger an endless research/recommendation loop. Changed context revisits only affected work.
- Existing artifacts are updated or referenced rather than copied into a new chain; IDs, sources, approval scope and uncertainty remain available.
- Short human updates state the current outcome and decisive blocker in at most two sentences; detail is accessible separately. Unsaved mode clearly returns required artifacts rather than pretending they were saved.
- Check all local links and record actual trial outputs, defects, corrections and limits. No executable helper tests are needed because none is introduced.

Example: cafe discovery starts vague, becomes a staff laptop-policy record need, and uses supplied evidence for an existing manual workflow. Explicit fixture selection then permits a bounded requirements handoff. A second branch with unknown API access must remain provisional.

## Ownership and dependencies

- Human owner: ChouBokYann. Independent reviewer: Perryong, subject to participation.
- Root agent owns proposal, workflow, index and any justified corrective edits, validation and push. Evaluation agent owns only `docs/proposals/ideation-workflow-walkthrough.md`; other work must be preserved.
- Depends on the four candidate skills already present on `first-iteration`. Issue search repeated: #7 covers exploration, #8 remains deferred; no independent acceptance is inferred or new issue published.

## Sources, impact, and risks

Project-authored routing based on the four local skill contracts and this conversation's requirements. Their upstream licenses remain beside the skills; no additional upstream prose is copied here. Scope is the product-oriented Ideation workflow, not a claim of full CRISP-DM compliance.

Risks: reading all skill instructions up front, silently treating proposals as accepted, losing uncertainty across stages, repeated reports, and runaway loops. Walkthroughs target these. Rollback removes the workflow link/document; no project knowledge or runtime is migrated.

## Open questions

Runtime discovery, human comprehension testing and semantic-extension design remain separate. No new user preference is required for this bounded candidate.

## Candidate validation

- [Integrated walkthrough](ideation-workflow-walkthrough.md) records five synthetic paths: clarification through selection/requirements using adequate supplied evidence; recommendation only; conditional requirements without research access; direct requirements; and supplied-document research through deferred selection. This covers all four skills across cases, not one compulsory all-four path.
- The interrupted first evaluation saved no evidence and is not counted. The completed evaluation shares one agent context, with case facts kept separate; its recorded file-loading sequence is not a measured token saving or cold-start test.
- Parent review found stale intermediate handoffs still presented beside the final state. Workflow guidance now requires updating current status in place and labeling useful superseded decisions as history; targeted artifact-update reruns are recorded with the original results.
- Workflow/index local links passed. All newly staged files undergo whitespace checks before commit. No runtime code was added or executed.
- Not verified: installed-runtime routing, real human comprehension, production integration, concurrent artifact updates, changed-source loop behavior, or the semantic extension. Synthetic user choices are not maintainer approval or real product acceptance.
