# Proposal: set UI direction before implementation

Status: accepted for local implementation, 2026-11-22. ChouBokYann explicitly answered "Approve and waive those gates for this local addition" to the scoped proposal/issue-first/other-maintainer question. This authorizes the listed skill, workflow links and validation; it is not independent maintainer review or main adoption. No GitHub publication requested.

## Change and lifecycle process

Add one Planning skill: skills/planning/set-ui-direction/SKILL.md. It turns the user's intent into a concise UI direction brief before UI implementation. Actual UI construction remains with a project-approved specialist such as Impeccable or TasteUI. Technical planning remains with set-development-direction.

## Problem and overlap

The document-chatbot trial exposed a missing handoff: functional requirements did not establish the user's visual and interaction intent before implementation. understand-expectations defines the quality bar, while set-development-direction defines technical choices. The existing deliver-change workflow delegates artistic direction directly to a specialist. A reusable, user-owned direction brief is missing between those steps.

GitHub search for UI direction returned broad existing proposals including deferred visualization work, not an accepted scope for this new skill. Issue #7 is related lifecycle-selection work, not acceptance of this addition. This skill does not revive the project's deferred visualization platform.

## Proposed approach and source comparison

| Source inspected | Useful idea | Adaptation boundary |
|---|---|---|
| Superpowers brainstorming, commit 22f0b463e7a5e579904dd6211a520321035526f7 | Read existing context, elicit unresolved intent, play it back; scale the design to the task | Keep targeted discovery. No compulsory fresh interview, commit, or additional approval when the user already delegated the choice. |
| Superpowers visual companion, same revision | Visual comparisons help when the decision itself is visual | An optional rough comparison, not a mandatory browser server or pixel-perfect prototype. |
| BMAD UX, commit e435a22574fe55722841086e5566420178b98df3 | Distinguish visual direction from interaction behavior; inherit existing UI conventions and make missing decisions visible | Use two sections in the existing brief rather than requiring two new documents, BMAD installation, memory tooling or agent fanout. |
| Installed Impeccable 4.4.0 and design-taste-frontend | Specialist implementation needs concrete context and can impose strong aesthetic defaults | Treat as downstream consumers. User direction overrides tool defaults; no extra installation, schema-compatibility claim or copied implementation rules. |

Selected: a small project-native adaptation, with original wording and pinned attribution. Reusing only understand-expectations misses a concrete design handoff; importing an entire UX framework adds unnecessary runtime and document requirements. Revisit a fuller UX process for a larger research/design engagement, not a routine app increment.

## Scope and affected paths

- New canonical skill and its upstream-notices reference under skills/planning/set-ui-direction/.
- Link from skills/planning/README.md and skills/README.md.
- Route UI work through it in docs/workflows/deliver-change.md and the UI row of docs/workflows/engineering.md.
- Add a conditional handoff check to skills/implementation/implement-increments/SKILL.md; no new interview when accepted direction already exists.
- Add validation evidence for the scenarios below in docs/proposals/ui-direction-walkthrough.md.
- Excluded: application redesign, installing BMAD/Impeccable/TasteUI, generating production UI, a new design system, new machine-readable schema, mandatory mockups, commits/pushes/publication.

## Output contract

One UI Direction section in the existing brief, or UI-DIRECTION.md if there is no suitable artifact. Reuse project metadata and shared output-contract references; no parallel source of truth.

1. Target: affected surfaces, audience, primary journey, platforms and desired feeling in the user's words.
2. Existing baseline: design system, relevant screens, constraints and references actually inspected.
3. Visual direction: hierarchy, density, tone, reference attributes to keep/avoid; typography/color/motion only where consequential or already fixed. Exact tokens may remain delegated.
4. Interaction direction: navigation, primary action, feedback and relevant loading/empty/error/success states, responsive/accessibility constraints.
5. Decisions: stated choice vs agent recommendation vs delegated assumption; rationale, rejected alternatives if considered, source and decision owner.
6. Specialist handoff: immutable intent, flexible choices, chosen tool if supplied, first representative screen/journey, observable checks and unresolved items.
7. Readiness: Ready for UI implementation planning / Conditional / Blocked; distinguish readiness from authorization and design intent from verified UI behavior.

## Tools, services, ownership and risks

Human owner: ChouBokYann. Agent: research, draft, implement only accepted paths, validate scenarios, preserve unrelated work. No external writes, paid inference, new dependencies or document-content upload are required by the skill. Read-only public-source research occurred. Optional reference browsing or mockups follow the target project's existing permissions and privacy constraints.

Risk: a new step could create repetitive questions or aesthetic overreach. Mitigate through reuse-first, narrow triggers, explicit delegation, and no generic style prescription. Unavailable references remain unverified; never claim to have seen them. Undo by removing the new routing and skill without altering project briefs already produced.

## Acceptance and validation

- [ ] New UI project with vague 'clean/premium' wording: asks the decisive preference or uses explicitly delegated assumptions; never silently treats a fashionable style as approved.
- [ ] Established design system and a small new settings screen: inherits the baseline, records only the delta, does not force an interview or redesign.
- [ ] Conflicting references: names the exact conflict and owner; does not blend contradictory directions without a choice.
- [ ] User says 'use your judgment': recommends a bounded direction, labels assumptions and proceeds within authority; does not demand a new approval ritual.
- [ ] Existing UI-direction brief plus backend-only change: skips the skill and preserves the brief.
- [ ] Missing/unreachable visual reference: states the gap, uses supplied descriptions as attributed inputs, never claims visual inspection.
- [ ] Specialist handoff preserves user intent, relevant states, accessibility and responsive constraints; specialist defaults cannot override it.
- [ ] Pressure scenarios run before and after the skill where permitted; record real results and limits, not a self-declared pass. Check affected links and canonical-copy uniqueness.

## Sources and licensing

- https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/brainstorming/SKILL.md
- https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/brainstorming/visual-companion.md
- https://github.com/bmad-code-org/BMAD-METHOD/blob/e435a22574fe55722841086e5566420178b98df3/skills/method/bmad-ux/SKILL.md

Both upstream licenses inspected: MIT, copyright Jesse Vincent (2025) and BMad Code, LLC (2025), respectively; retain applicable complete notices with the installed adaptation. BMAD also has a trademark notice; this project does not claim endorsement or use its name as a new skill brand. Installed specialist files were read for compatibility research only; no source copied from them. TasteUI's exact external repository was not assumed or installed.

## Open decision

Accept the listed paths, contract and scenarios, and explicitly waive issue-first/other-maintainer gates for this local library addition, or obtain acceptance through workflow.md. The E11 waiver covers that trial only. Preparation and research do not constitute canonical adoption.

Resolved: user explicitly approved and waived those gates for this local addition. Implemented the listed canonical skill and routing paths. Seven fresh-agent textual scenarios and 73 relative-link checks passed; baseline showed a specificity gap rather than a general behavior failure. Evidence: ../../docs/proposals/ui-direction-walkthrough.md. No live UI/specialist test, commit, push or main adoption claimed.
