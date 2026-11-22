# Deliver a change

Entry point for an authorized end-to-end product or engineering request. This workflow selects skills; skills perform bounded tasks. Use the [engineering situation router](engineering.md) for hotfix, feature, design, module, refactoring and logic-specific branches. A request for only research, assessment or one skill stops at that scope. This is prompt guidance, not an installed scheduler.

## Choose the next skill from the current gap

Read the original request, relevant earlier preferences, current artifacts, authority and remaining budget. Do not load the entire library. Record the next skill and reason in the existing work record; a skipped skill needs no new document. Reuse sufficient evidence rather than repeating interviews.

| Current gap | Call | Exit / next decision |
|---|---|---|
| Whose problem or intended outcome is unclear | [clarify-problem](../../skills/ideation/clarify-problem/SKILL.md) | Problem sufficient for research or requirements; missing user decisions remain pending. |
| Purpose, experience or meaning of enough has not been translated into observable criteria | [understand-expectations](../../skills/ideation/understand-expectations/SKILL.md) | Functional and requested quality expectations have checks or explicit gaps. A quality label alone is insufficient. |
| Existing solutions or a decisive feasibility fact are unknown | [research-solutions](../../skills/ideation/research-solutions/SKILL.md) | Sourced options or a precise access/evidence gap. Skip a broad survey when direction is fixed. |
| Options exist but a solution must be selected | [recommend-solution](../../skills/ideation/recommend-solution/SKILL.md) | Choice within delegated authority, or a pending consequential user decision. |
| Needs and expectations are not yet mapped to requirements and evidence | [define-requirements](../../skills/ideation/define-requirements/SKILL.md) | Every material expectation is represented; agent elaborations stay labelled. |
| Technical direction or the next useful slice is unclear | [set-development-direction](../../skills/planning/set-development-direction/SKILL.md) | Lean constraints and next slice. Detailed planning belongs in Implementation. |
| A new or changed interface lacks visual or interaction direction | [set-ui-direction](../../skills/planning/set-ui-direction/SKILL.md) | One user-grounded UI brief for the specialist; reuse established direction and skip backend-only work. |
| Scope and evidence criteria suffice to build | [implement-increments](../../skills/implementation/implement-increments/SKILL.md) | Build and inspect increments, including the dominant experience risk early; hand actual artifacts to verification. |
| Project behavior lacks meaningful tests | [implement-increments](../../skills/implementation/implement-increments/SKILL.md), then Verify | Establish independent expected outcomes and checks sensitive to relevant faults; preserve correct production behavior. |
| Delivered work needs whole-request assessment | [verify-change](../../skills/verification/verify-change/SKILL.md) | Compare original expectations, requirements, actual result and evidence; report technical, experience and user-acceptance states separately. |
| A session or owner changes | [handoff-work](../../skills/implementation/handoff-work/SKILL.md) | Preserve canonical criteria, source state, evidence, pending decisions, budgets and next action. |

These are conditions, not a mandatory sequence. A well-specified hotfix may go straight to diagnose/implement/verify. A new visual product may need expectations and requirements before design implementation. Research and clarification can proceed independently where useful without starting a multi-agent run.

## Bring in a specialist when the work needs one

Before new or materially changed UI implementation, use [Set UI direction](../../skills/planning/set-ui-direction/SKILL.md) when the user's visual or interaction intent remains unresolved. Reuse a sufficient brief or existing design-system direction without another interview. Then select an available suitable design skill (for example Impeccable, Taste UI, or another project-approved specialist) for detailed UI design and implementation. Honor an explicitly chosen skill; otherwise inspect available descriptions and read only the selected skill before using it. A routine functional fix does not need a design pass. For 3D assets or motion, check that the selected capability actually covers that gap rather than assuming frontend expertise is sufficient.

Pass the original brief, canonical UI direction when applicable, experience criteria, current artifact, design constraints, specific gap and remaining budget. The core workflow owns intent, scope, integration and verification; the specialist handles its craft. Specialist defaults must not override user direction or established constraints. Keep its decisions and evidence in the same work record, including the skill source/version when available and why it was selected. Naming a skill is not invoking it. Specialist output still needs artifact-level checks against the original expectations.

External design libraries remain optional capabilities, not copied core skills or candidates in our core-library comparison. Evaluate whether this workflow selected and integrated the right help; record the resulting quality separately and include specialist usage in overall time/token accounting where measurable. No extra refinement allowance is created by switching skills.

If a suitable specialist is unavailable, disclose the gap and a bounded fallback; seek installation/access only when needed and authorized. Do not silently install dependencies, send project data to a service, or assume new spending or delegation authority. Missing expertise cannot be reported as satisfied quality. This route does not invoke perfect-it automatically.

## Carry one small acceptance record

In the existing record, preserve: **user expectation and source -> requirement -> observable criterion -> evidence method -> current result**, plus whether the criterion is user-specified or agent-interpreted. Include relevant prior preferences. Requested quality is baseline scope even when subjective. Keep optional refinement targets separate. No new ontology schema, duplicated spec or report per skill is needed.

Before broad implementation, check a representative slice against the requirement most likely to invalidate the approach. For a visual storytelling request, that means inspecting an actual visual/animated interaction, not just a text questionnaire or a successful WebGL call. Use relevant domain skills when available and suitable; a general frontend skill is not evidence of 3D craft. Report missing expertise/tools and use a bounded disclosed fallback. Do not install tools, delegate, or add spending without existing authority.

Routine choices proceed under existing implementation authorization. A consequential unresolved preference needs a targeted question, not an invented answer. If the user reserves review until the end, perform the available author checks and preserve user acceptance as pending; do not force a new approval ceremony.

## Route failures to their cause

| Finding | Return to | Stop condition |
|---|---|---|
| Existing requirement is unmet | Implementation, then affected verification | Required evidence establishes the correction or a concrete blocker remains. |
| Requirement omitted or weakened the user's expectation | Expectations / requirements, then affected implementation | Restore the original scope; do not relabel the missing quality as optional. |
| Technical approach cannot deliver the requirement | Direction or a bounded assumption test | Evidence supports a feasible direction, or dependent work is blocked. |
| Product premise is wrong | Relevant Ideation decision | Preserve the conflicting evidence; obtain a consequential choice where required. |
| User rejects quality | Identify unmet original criteria or missing translation first | No automatic perfect-it invocation and no claim that green technical tests override the review. |
| User requests improvement beyond the established baseline | Optional [perfect-it](../../skills/implementation/perfect-it/SKILL.md) | Shared finite refinement budget; stop at enough, stagnation, blocker or limit. |

Do not bounce between skills on an unchanged blocker. Each correction attempt needs a specific gap, hypothesis and check; honor existing task/time/spend limits across workers and retries. No remaining authority or budget means an explicit incomplete handoff, never a fabricated pass. A workflow does not enforce host spending or redispatch controls.

## Decide what done means

Verification must return to the original request, not only an agent-authored checklist. All required functional behavior, requested experience qualities and project rules need evidence appropriate to their claims. Tests can prove behavior; rendered inspection can assess composition; a recording or observed interaction can assess animation. One does not substitute for another.

- A failed required criterion means **Changes required**.
- Missing required evidence or an unresolved quality criterion means **Incomplete**.
- Passing author checks with a user-reserved judgment still pending means **Ready for user evaluation**, not user acceptance.
- Claim completion only at the scope actually evidenced. Do not claim the user's judgment, business benefit or production readiness from a local technical pass.

Give a one- or two-sentence handoff identifying the result, material gap and next action. If visualization is being used, export the same canonical records and show the relevant expectation-to-evidence chain; keep failed quality evidence separate from passed technical checks. No viewer is required to use this workflow.
