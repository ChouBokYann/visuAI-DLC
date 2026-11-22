# UI direction: scope and validation

Date: 2026-11-22. Human owner: ChouBokYann. Local implementation authorized by explicit answer: "Approve and waive those gates for this local addition." This is a local issue-first/other-maintainer exception for the described addition, not main adoption, independent maintainer acceptance or publication permission.

## Scope and rationale

User request: add a skill before implementation to understand UI direction; use Superpowers, BMAD or other repositories for inspiration, leaving actual UI development to specialists such as Impeccable and TasteUI.

Added one canonical [Set UI direction](../../skills/planning/set-ui-direction/SKILL.md) Planning skill, pinned [source attribution and notices](../../skills/planning/set-ui-direction/references/upstream-notices.md), and conditional links in the skill indexes, deliver-change workflow, engineering router and implementation intake. No runtime dependency, schema, new design system or automatic approval step was added.

Understand-expectations already handles quality criteria and set-development-direction handles technical choices. The new skill supplies a UI-specific handoff: target/baseline, visual direction, interaction direction, decisions/uncertainty, specialist handoff and readiness. It updates the existing project brief; UI-DIRECTION.md is a fallback, not a compulsory second source of truth. User direction overrides specialist defaults; trivial existing-pattern and backend-only changes skip discovery.

Source choice: Superpowers contributes targeted intent discovery and optional visual comparisons. BMAD contributes separation of appearance from behavior and reuse of existing UI conventions. This adaptation uses one brief rather than importing BMAD tooling or its document/runtime structure. Full source pins and notices accompany the skill. Installed Impeccable 4.4.0 and design-taste-frontend were inspected as potential consumers only; no live interoperability is claimed.

## Baseline walkthrough, before the skill existed

A fresh read-only agent, ui_direction_baseline, received only understand-expectations, set-development-direction and deliver-change plus six scenarios. It was not given the new proposal or skill. No application tools were invoked.

| Scenario | Observed baseline |
|---|---|
| Premium clean chatbot, Impeccable requested | Proposed restrained styling as an explicitly labelled interpretation and routed to expectations/specialist; no reusable UI-specific brief contract. |
| Existing system, settings toggle | Reused house patterns, no new interview. |
| Airy editorial versus dense console | Asked a targeted priority question; did not silently blend. |
| User delegates judgment | Proceeded with labelled agent choices, no extra approval requirement. |
| Backend-only cache change | Preserved accepted UI brief and skipped UI discovery. |
| Inaccessible warm/playful reference | Disclosed inaccessible visual content and distinguished user description from inference. |

The baseline did **not** demonstrate general behavioral failure. It demonstrated a specificity gap: concrete UI handoff fields came from agent judgment rather than an explicit reusable contract. This is not a claimed red-to-green performance improvement or proof that the added skill is necessary in every task.

## With-skill validation

A separate fresh read-only agent, ui_direction_check, received the skill and updated workflow routes. It produced a representative brief and exercised the six scenarios plus conflicting specialist defaults. All seven walkthroughs followed the contract; no material contradiction was found across the skill and routing. These are prompt walkthroughs, not rendered UI, usability testing or live execution of Impeccable/TasteUI.

| Scenario | Observed with-skill result |
|---|---|
| Vague premium/clean chatbot | Labelled recommendations, retained Impeccable, exposed the primary-task decision; no invented palette or approved aesthetic. |
| Established settings toggle | Reused conventions and limited work to the delta; no discovery ceremony. |
| Conflicting density references | Checked whether they referred to different surfaces, otherwise exposed the density tradeoff to its owner. |
| Explicit delegation | Chose bounded assumptions and continued without another approval round. |
| Backend-only change | Skipped UI direction and preserved the brief. |
| Unavailable reference | Disclosed visual uncertainty and used the attributed description without claiming inspection. |
| Restrained user motion versus cinematic default | Preserved user intent and resolved the specialist conflict without overriding it. |

### Representative hypothetical brief produced by the walkthrough

User-stated: premium, clean document chatbot; use Impeccable. Audience, device context, ingestion flow and design system are unknown in this hypothetical. Proposed, not accepted: readable answers, clear composer, restrained hierarchy. No particular font, palette, upload flow or citation behavior is assumed.

The first consequential question is whether the main task is focused reading/conversation or investigating several documents simultaneously. That choice determines whether document controls recede or remain prominent; the user owns the choice unless delegated.

Proposed interaction coverage: empty conversation, pending response, completed answer, and comprehensible failure preserving the question. Reconcile these with real requirements; do not add streaming, cancellation or retry capabilities merely because they are common.

Handoff to Impeccable: preserve discovered house conventions; keep controls keyboard-operable, focus visible, content readable on narrow screens and feedback understandable without color alone. Exact styling remains flexible. Inspect the actual representative screen and relevant states for hierarchy, answer width, composer discoverability and focus behavior. No inspection has occurred.

Readiness: Conditional until the primary-task choice is supplied or delegated; independent baseline inspection can continue. This is a synthetic walkthrough artifact, not the accepted E11 design brief.

## Structural checks

Checked 73 relative Markdown links across the eight affected skill/index/workflow/evidence files: zero broken targets. Exactly one canonical set-ui-direction/SKILL.md exists. Required name/description frontmatter is present. `git diff --check` passed; Git emitted only its line-ending normalization warning for the planning index. No application code changed; runtime/application test suites are not relevant to this documentation addition.

## Limits

Real-project use and independent maintainer review remain pending. User satisfaction, rendered accessibility, layout quality and actual specialist integration cannot be established by a written direction brief. E11's separate sandbox runtime failures neither validate nor invalidate this new skill; no E11 UI implementation was performed with it.
