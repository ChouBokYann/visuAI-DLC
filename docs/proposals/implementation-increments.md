# Proposal: implement in bounded increments

Status: candidate work on `first-iteration`, following the user's “okie go ahead” after delivery of lean Planning. This continues the session-authorized candidate exploration; it does not imply independent maintainer acceptance or permission to merge. Actual testing in another project remains deferred.

## Change, need, and scope

Planning now sets direction and the next useful increment. Implementation needs to own concrete task planning, code, checks, and adjustment without waiting for a detailed plan of the entire feature. The proposed single skill is `implement-increments`: inspect the real project, plan the next bounded change, implement and check it, and continue until the authorized scope is complete or a concrete blocker prevents dependent work.

Root agent owns `skills/implementation/implement-increments/SKILL.md`, its record template and upstream notices under `references/`, `skills/implementation/README.md`, this proposal, and `docs/proposals/implementation-increments-walkthrough.md`. Human owner: ChouBokYann. Existing Ideation/Planning skills, `.bench-run/`, and `output/` are untouched.

Included: incremental detailed planning, behavioral checks, scope-aware feedback, current-state records, and a concise handoff to Verification/review. Excluded: product implementation in this repository, new runtime/helpers, automatic delegation, tracker publication, mandatory commits per test cycle, merges, deployment, and ontology tooling.

Issue search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred implementation/verification slice #9](https://github.com/ChouBokYann/visuAI-DLC/issues/9). The latter's historical criteria are not revived. No issue was published or independently accepted by this work.

## Source comparison and selection

Sources are pinned to the same revisions used for preceding candidates; this is not a latest-version survey. Referenced source bodies were inspected, but their linked scripts and runtime dependencies are not adopted.

| Candidate | Take | Omit or adapt |
|---|---|---|
| Superpowers [writing-plans](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/writing-plans/SKILL.md) and [executing-plans](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/executing-plans/SKILL.md) | Concrete affected paths/interfaces for the active increment, output inspection, durable reasons for deviations, continuous execution within scope. | Full upfront plan, custom ledger scripts, mandatory reviewer/model choices, deleting evidence on completion, fixed one-pass review limits, and requiring a new approval for already authorized routine work. |
| Matt Pocock [TDD](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/tdd/SKILL.md) and [to-tickets](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md) | Behavioral tests with independently derived expectations, short vertical cycles, verifiable increments, and expand/contract for incompatible wide changes. | Mandatory user confirmation of every test interface, ticket publication/files, speculative full task graphs. Permit necessary small refactoring while checks stay green instead of deferring all refactoring to review. |
| pstack [sequence verifiable units](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-sequence-verifiable-units/SKILL.md) and [prove it works](https://github.com/backnotprop/pstack/blob/4161d4ef5051574e825ffe70e2f43a2e49e4b3db/skills/principle-prove-it-works/SKILL.md) | Check the changed behavior before building on it; inspect the actual artifact/result instead of trusting compilation or a report. | Automatic rebasing, fixed commit structures, and new proof scripts when an existing meaningful check suffices. |
| ECC [TDD workflow](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/tdd-workflow/SKILL.md) | Identify the actual runner, distinguish expected behavioral failure from setup failure, map behavior to actual check results. | Runtime helper dependency, blanket 80% coverage/latency targets, mandatory stage commits, a separate evidence report per cycle, or new approval for every normal test command. |

Matt's [prototype](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/prototype/SKILL.md) remains an optional reference for a separately requested experiment, not a required subskill. An experiment answers a question; it does not excuse inadequate production checks.

## Outputs and stage boundary

Update the existing delivery record: current increment and requirement/decision links, concrete affected paths, observed evidence tied to the tested state, material adjustments, outstanding work, and next action. Use the template only for a new record. Retain stable identities and supersession without a report chain. Give the human one or two sentences linking to detail and naming the delivered outcome and material gap.

Implementation owns checks needed to establish its work, including required project checks; it cannot postpone known failures to Verification. Its completion is a handoff for Verification/review, not self-approval, release readiness, or deployment. Local details change within the implementation loop. Changed scope or a consequential constraint revisits only the affected Planning/Ideation decision.

## Alternatives, tools, and risks

Unchanged upstream execution assumes a detailed plan or introduces reporting/runtime overhead. A separate task-planning skill would add a handoff at every increment. One bounded loop keeps planning close to the evidence that changes it. Revisit decomposition if real use reveals independently useful responsibilities.

No new dependency or service. The skill uses the target project's existing file tools, test/build commands, and authorized runtime. Project code may be processed by the user's selected agent service under its existing terms; no additional upload or paid service is required. Missing tools/credentials are reported, not installed or invented implicitly. Ruflo tools were not exposed in this session.

Risks: endless local optimization, stopping after only one increment, scope drift, rewriting another contributor's work, and claiming success from insufficient checks. The candidate must explicitly address these. Rollback removes the candidate and its index entry; preserve project execution records.

## Acceptance and validation

- A clear direction reaches a concrete next-increment plan without requiring full-feature task decomposition or repeating Ideation.
- The loop continues through the requested scope; a first passing increment is not whole-task completion.
- Checks exercise requested behavior through appropriate interfaces; expected values are independent of implementation. Setup failure, failing behavior, passed checks, skipped checks, and unverified claims remain distinct.
- Existing user edits survive; local implementation decisions can change with evidence while scope/constraint changes return to the affected decision.
- Current records connect requirements, decisions, actual changes, and evidence; stale test results are not claimed against a changed artifact.
- A blocked dependency pauses only dependent work and produces an accurate partial handoff. A successful mock or prototype does not prove a live integration.
- Two-sentence human output states the outcome and material gap; detailed evidence remains in the maintained artifact.

Validation is structural checks plus a bounded author walkthrough, including a missing-tool case. No new executable helper is introduced, and no installed-runtime or real-project test is claimed. Independent review and practical evaluation remain pending. Pinned attribution and MIT notices ship with the skill.

## Candidate result

Implemented [implement-increments](../../skills/implementation/implement-increments/SKILL.md), its optional new-record template, and pinned attribution/notices; linked from the Implementation index. Format validation, local links, and whitespace checks passed. The [author walkthrough](implementation-increments-walkthrough.md) records expected applications and failure boundaries, explicitly without claiming product execution. Real-project testing and independent review remain pending; no merge is authorized by this record.
