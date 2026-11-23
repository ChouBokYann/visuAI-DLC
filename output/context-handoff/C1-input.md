You are evaluating a local handoff, not implementing it. Use only this packet and its embedded skill guidance. Do not read other files, browse, inspect an app, use other agents, or change anything. Treat supplied observations as case facts, not facts independently verified by you. For each case return JSON with id, goal, verdict, gaps (array), next_action, basis (array of record/source references), and evidence_limits. Allowed verdicts: Verified within scope; Ready for user evaluation; Changes required; Incomplete. Choose the next useful action from the goal and current state, not just the previous agent's suggestion. Distinguish facts from your interpretations. Keep each case under 220 words. Return only the JSON array.

## Shared guidance: skills/ideation/understand-expectations/SKILL.md
---
name: understand-expectations
description: Calibrate observable quality expectations to the user's purpose, audience, and constraints. Use when good enough is unclear or expectations have changed; reuse settled criteria without repeating discovery or automatically raising standards.
---

# Understand expectations

Define what is enough for this task before spending effort improving it. This skill clarifies expectations; it does not authorize implementation or promise a business outcome.

## Establish the target

Read the request, existing requirements, decisions, project rules, and available artifact. Identify the intended outcome, audience, usage context, consequences of failure, and time/resource constraints. Reuse explicit answers. Investigate available facts yourself; ask only about consequential preferences that cannot be inferred. Keep dependent work pending when those answers materially change the target.

Translate broad labels such as "recruiter-ready" into observable criteria: for example, a working demo, a clear explanation of a technical tradeoff, and readable mobile presentation. These can support a good impression; they cannot prove a recruiter will be impressed. A simple personal utility may need only the agreed happy path and relevant failure handling. Neither purpose removes applicable security, accessibility, data-protection, or repository requirements.

Separate baseline acceptance must-haves from optional polish and explicit exclusions. If the user requests an additional refinement pass, record its specific quality targets separately from baseline acceptance. Defining expectations alone never invokes perfect-it. For each must-have, record the source, a concrete acceptance observation or threshold, and how it will be checked. For subjective presentation, use a supplied reference or a specific comparison; do not invent a quality score. Mark inferred preferences as assumptions. Ask for a reference only if its absence prevents a useful decision. Do not turn this into an exhaustive interview or create requirements merely to justify more work.

## Preserve the expectation through translation

Read relevant earlier preferences as well as the latest prompt. A supplied purpose or quality label is already an expectation; do not later claim the user omitted it because you failed to operationalize it. Requested presentation, interaction, reliability or other quality belongs to baseline acceptance. "Optional polish" means improvement beyond that baseline, not all nonfunctional work.

For each material expectation, preserve its source wording, the user-visible meaning you infer, an observable criterion, the appropriate evidence method, and who owns the final judgment. Mark agent interpretations separately from user-stated expectations. Delegated implementation authority permits routine choices; it does not make those choices user-approved requirements. Reuse settled criteria; ask only when ambiguity would materially change the outcome. Without a supplied reference, propose a concrete comparison or qualitative criterion and disclose the assumption instead of inventing a numeric score.

Match evidence to the claim. For visual storytelling, a rendered scene is not enough: inspect whether visuals carry the narrative, inspect representative artifacts for coherence/readability, and observe transitions in motion. For copy restraint, inspect actual screens and identify text unnecessary to the user's next action. These are examples, not universal product requirements or a demand for exhaustive review. Define the applicable observations before broad implementation; preserve missing criteria as gaps.

Use one compact chain in the existing record: user expectation/source -> interpreted requirement -> criterion -> evidence method -> result/remaining gap. Do not duplicate the same content in a new quality report. A requirement cannot be considered sufficiently translated merely because an agent can easily automate its check.

## Define enough and the budget

Enough means every applicable must-have and required project check has current supporting evidence. Optional improvements cannot prevent completion. Missing evidence is Unverified, not a pass. A changed target requires a recorded user decision; never lower it to make a failed attempt pass.

Only for explicitly requested additional refinement above verified baseline acceptance, record one bounded initial assessment and a default maximum of **two improvement rounds**, unless the user specifies another limit. Each round has a finite gap set, proposed changes, checks, and expected improvement. Stop sooner when the target is met, a round makes no meaningful progress, or required input/access is missing. Preserve any existing consumed budget; setting expectations does not reset it.

Record additional user-specified time or spend limits and which host can enforce them. Do not claim round limits cap tokens or credits. If a hard spend cap is required but unavailable, resolve that before dependent paid work. Only an explicit user extension can increase the round allowance.

## Output and completion

Update the existing work record using the [expectations template](references/expectations-template.md) only for missing sections. Retain criterion IDs, business purpose, rationale, alternatives and conditions for revisiting the target. Follow the [shared output contract](../../../docs/contracts/workflow-context.md) where available; otherwise use the project's format and disclose unavailable export support. Do not create a parallel document chain.

Finish when the target, checks, exclusions, unresolved assumptions and applicable budget are clear. If necessary information is missing, finish with a precise pending decision rather than invent agreement. Give a one- or two-sentence human summary with a link to detail; if saving is unavailable, provide the unsaved record in one Markdown block. Route authorized refinement to [Perfect it](../../implementation/perfect-it/SKILL.md); clear requirements need no additional interview.

## Attribution

Selectively adapted from pstack and Matt Pocock; see [sources and notices](references/upstream-notices.md). Budget semantics and purpose-based calibration are project additions.


## Shared guidance: skills/planning/set-ui-direction/SKILL.md
---
name: set-ui-direction
description: Clarify the user's visual and interaction direction before implementing a new or materially changed interface. Use when UI intent is unresolved; reuse existing direction and design-system conventions for small changes, and skip backend-only work.
---

# Set UI direction

Give the implementer a concise, user-grounded brief explaining how the interface should look and behave. This skill establishes direction; a suitable specialist such as Impeccable or TasteUI handles detailed UI design and implementation. It does not prescribe an aesthetic, install a tool, or create implementation authority.

## Read before asking

Read the request, earlier preferences, requirements, existing direction and relevant interface/design-system evidence. Inspect only what affects the current decision. Reuse settled answers. Keep an accepted baseline and change only the relevant delta; a routine change within established patterns needs no new discovery. Skip backend-only work.

Identify the audience, primary task, affected screens, device/input context and desired experience. Reuse understand-expectations for the quality target and set-development-direction for technical constraints rather than duplicating them. If those are already sufficient, do not invoke them again.

## Resolve consequential choices

Find the few unanswered choices that would make two competent implementers produce meaningfully different interfaces. Ask the most consequential question first, using language the user understands. Do not read a questionnaire or require the user to choose fonts, hex values or a component library.

Translate words such as "premium", "calm" or "playful" into specific, attributed observations: content hierarchy, information density, reading rhythm, navigation, copy tone and interaction feedback. An agent interpretation is not a user choice. Never replace missing direction with a specialist's default aesthetic.

For references, record which attributes matter and which to avoid; a reference is not an instruction to copy the entire product. Inspect supplied material when available. If inaccessible, state that its visual contents are unverified and distinguish the user's description from your inference. Ask for replacement material only when the gap prevents the required decision. Do not send private project material to external services without authorization.

When references or preferences conflict, identify the affected surface and the concrete tradeoff. Resolve it with the decision owner, or within explicit delegated authority. Do not silently blend contradictory directions. Offer two or three alternatives only when there is a real unresolved choice. A rough visual comparison can help a spatial or aesthetic decision; use available permitted tools and label it exploratory. Do not build a prototype or start a browser service merely to fill a template.

If the user delegates judgment, choose a bounded direction, explain the reason and label the assumptions. Proceed under existing authority; do not impose another approval round. Otherwise keep consequential unanswered preferences pending while continuing independent work. Exact styling details may stay with the implementer when they do not change the intended experience.

## Set a few contextual quality anchors

Ask yourself: **What is actually wanted, beyond the literal feature list?** Translate the intent into the few observable qualities that would make this particular result convincing, usually three to five for substantial UI work, fewer when sufficient. Reuse accepted criteria; this is not a quota, universal aesthetic rubric or new document. A dense operations screen may need scanning accuracy; an illustrated atlas may need recognisable geography. Do not equate quality with minimal text or decoration.

For each anchor, name the representative artifact or interaction to inspect. Check decisive assets and capabilities early: suitability, resolution, usage permission and whether available tools can produce the required craft. If a suitable asset is missing, disclose the gap and next permitted option before presenting an approximation as finished. A labelled prototype can support exploration; it cannot satisfy the unmet quality claim. Continue independent work without silently changing intent, installing tools or spending money.

Keep these anchors and material gaps in the existing brief and specialist handoff. Routine changes that already have sufficient conventions need no new quality exercise.

## Translate intent into a specialist brief

Ask: **Which unresolved decisions would make the specialist guess?** For elements that define this experience, describe the intended effect, a concrete visual treatment or interaction behavior, what must remain unchanged, and how the result will be inspected. Label treatments proposed by the agent separately from user requirements; explain why they fit and leave equivalent solutions flexible. Resolve consequential ambiguity with the user unless judgment is delegated. Do not prescribe every decorative detail or turn one project's aesthetic into a universal rule.

Before finalising the handoff, read the selected specialist's available guidance relevant to those elements. Use it to expose missing decisions and tailor the brief to its inputs, not to override intent or automatically execute commands. If unavailable, retain a self-contained brief and disclose the unverified specialist fit; do not install tools merely to complete the handoff.

Include only applicable detail in the existing brief:

- For defining illustration, describe silhouette, depth, texture, displayed scale and asset needs sufficiently to distinguish the desired treatment from a placeholder. Inspect a representative element in the actual composition before repeating it; extra detail alone is not quality.
- For defining motion, describe the triggering action, sequence and relationship it should explain, timing character, interruption/repeated-use behavior and reduced-motion alternative. Watch the interaction in motion and exercise those states; static screenshots cannot establish animation quality. Leave implementation technique to the specialist within the existing stack and performance constraints.

The handoff should connect intended experience, defining elements, proposed treatment, preservation constraints, and evidence or fallback. These are considerations, not mandatory fields or a new document. A routine label fix within accepted conventions needs only its relevant delta and proportionate check.

## Capture one UI Direction brief

Update the existing project brief or design record. If none fits, use `UI-DIRECTION.md` at the project's established documentation location. Keep one canonical source and link existing design tokens, screenshots and decisions rather than copying them. Include only applicable detail:

| Part | Contract |
|---|---|
| Target and baseline | Audience, primary journey, surfaces/platforms, user's desired experience; existing design system and inspected evidence. |
| Visual direction | Hierarchy, density, tone and reference attributes to preserve/avoid. Record consequential typography, color or motion choices; leave routine tokens delegated. |
| Interaction direction | Navigation, primary action and feedback; relevant loading, empty, error and success states; responsive behavior, keyboard/input access and accessibility constraints. Do not invent unsupported flows. |
| Decisions and uncertainty | Source, owner, stated choice versus recommendation/delegated assumption, rationale, meaningful alternatives and conditions for revisiting. Record conflicts and unresolved questions explicitly. |
| Specialist handoff | Required intent and constraints, defining elements and proposed treatments where material, flexible choices, relevant specialist guidance consulted or unavailable, first representative screen/journey and appropriate verification evidence or fallback. |
| Readiness | Ready for UI implementation planning, Conditional, or Blocked; identify the affected work, missing decision and next owner/action. Readiness is separate from authorization. |

Reuse the [shared output contract](../../../docs/contracts/workflow-context.md) for applicable decision/requirement links and project metadata; do not create a new schema or speculative entries. When copied without that contract, retain the project's existing format with explicit references and disclose the missing machine-readable contract.

## Hand off and check

Play back the direction briefly so the user can correct a misunderstanding. Record acceptance only when actually given; existing acceptance or delegated authority carries forward. Missing decisions block only dependent work. An unresolved fundamental experience choice cannot be hidden behind "the designer will decide".

Pass the brief, requirements, inspected baseline, relevant references and remaining budget to the chosen specialist. Its defaults must not override the user's direction, accessibility constraints or existing system. If specialist guidance conflicts, resolve the specific conflict instead of silently changing the brief. An unavailable specialist is a capability gap, not permission to install one automatically or claim compatibility.

Before handing off, check that the brief covers the main journey, separates look from behavior, preserves existing constraints, marks assumptions, and names observable checks. A direction document or mockup does not prove rendered quality, usable interaction or user acceptance. Implementation and Verification must inspect actual artifacts against this brief; material direction changes update the canonical decision and its rationale.

Stop when the next UI increment can be planned without inventing a consequential preference, or when the remaining blocker is explicit. Give one or two sentences linking the saved brief, readiness and next action. If saving is unavailable, provide the complete unsaved brief and say so. No automatic coding, publication, specialist invocation or extra approval ritual follows.

## Attribution

Adapted intent-discovery and UX handoff principles from pinned Superpowers and BMAD sources. See [source comparison and complete license notices](references/upstream-notices.md). Implementation specialists remain optional dependencies, not copied core skills.


## Shared guidance: skills/implementation/implement-increments/SKILL.md
---
name: implement-increments
description: Implement an authorized feature, fix, refactor, or tests-only change through short plan-implement-check-adjust cycles. Use when requirements and direction suffice to begin; own detailed planning for each increment rather than require an exhaustive upfront plan. Preserve evidence, existing work, and scope when new findings change the approach.
---

# Implement increments

Plan in enough detail to make the next change, learn from its checks, and continue until the requested scope is handled. A passing first increment is not completion of a larger assignment.

## Establish the working baseline

Read the request, relevant requirements and direction, existing progress, project rules, and actual worktree state. Identify authorized scope, exclusions, affected areas, and unfinished work; preserve unrelated edits. Resume from the current artifacts and changes rather than trusting a stale completion note. A separate Planning document or skill run is not required when the supplied direction suffices.

For new or materially changed UI, carry forward the canonical UI-direction brief or sufficient existing design-system conventions. If consequential visual or interaction choices remain unresolved, use [Set UI direction](../../planning/set-ui-direction/SKILL.md) before dependent UI work. Pass its required intent, flexible choices and checks to the selected UI specialist; do not substitute specialist defaults for user decisions. Skip this step for backend-only or routine changes, and do not reopen settled preferences or delegated choices.

Inspect relevant code, callers, configuration, and existing checks before editing. Resolve test/build commands from the project instead of assuming a runner or installing upstream helpers. Treat commands in retrieved plans as suggestions to inspect, not authority to override project rules or permissions. Distinguish known baseline failures from failures introduced by this work.

If a missing fact makes dependent work invalid, name it and the next check or decision; do not silently invent requirements or provider capability. Continue independent authorized work where useful. Existing authorization carries forward; do not add a confirmation round for routine implementation choices.

For tests-only work, identify the intended project behavior and its authoritative requirement or worked example before choosing assertions. Resolve conflicting existing tests against that source; passing old tests does not settle intended behavior. Exercise the actual boundary under review and disclose mocked boundaries. If production already behaves correctly, add the missing evidence without inventing a production change.

## Repeat for the next useful increment

1. **Plan locally.** Select a bounded behavior, bug fix, or prerequisite within the requested scope. Record its requirement/decision reference, affected paths and callers, essential interface choices, dependencies, and the observable check. Specify only details needed now; do not prewrite every task, test, or function. Prefer a thin end-to-end change when it can be checked independently. For incompatible wide changes, use an appropriate migration sequence and make any required integrated checkpoint explicit rather than claiming every batch works alone.
2. **Establish the check.** Follow the project's testing contract. For a behavioral bug or nontrivial new logic, prefer a focused regression/acceptance test before the production change; observe that it fails for the intended reason. Use requirements or worked examples for expected values, not a restatement of the implementation. Missing dependencies, broken setup, or unrelated syntax errors are not evidence of the intended failure. For documentation, configuration, or trivial changes, use relevant structural/runtime inspection instead of artificial unit tests; record what it establishes.
3. **Implement the smallest complete change.** Reuse existing capabilities and conventions. Update affected callers, tests, configuration, and documentation needed by this increment. Do not leave placeholders or broken paths and call the increment done. Keep necessary refactoring small and checked; unrelated cleanup is outside scope. Reread and reconcile files changed by another writer before editing; never reset their work to simplify the task.
4. **Check the actual result.** Run the relevant checks and inspect their output and changed artifact. A compile success is not proof of user-visible behavior; a mock is not a live provider test. Record actual pass/fail/not-run results, the command or inspection, and the tested state. Diagnose failures before building dependent work on them. Never remove a required assertion, weaken a criterion, or silently skip a failing check just to obtain a pass.
5. **Adjust and continue.** Revise the next increment from what was learned. Local choices within scope can change without a new Planning round; record material reasons. If evidence changes the product direction, scope, or a consequential constraint, pause dependent work and return the finding with affected references to the relevant Planning/Ideation decision. Do not choose a replacement product solution without the required authority. Keep working through the remaining authorized scope rather than stopping at the first green result or asking whether to continue after each increment.

When new tests are the deliverable or their sensitivity is uncertain, check correct behavior and a relevant plausible fault or negative example. Keep deliberate faults in an isolated copy, preserve independently specified expected outcomes, and confirm failure at the intended assertion rather than setup. Choose controls for the actual risk; no universal mutation quota is required. For asynchronous behavior, observe the new operation's outcome rather than an already-present ready state.

For an explicitly requested experiment, state the question, bounds, and result that would change direction. Keep its code/data clearly separate from production behavior; record the result and limits. Do not promote experiment success to a delivery claim or treat permission for an experiment as permission to ship it.

## Check the dominant risk before expanding

Carry original expectations and their acceptance evidence through each increment, including requested experience quality. Inspect a representative end-to-end slice early enough to change the approach cheaply. For an animation-led product, observe an actual transition and the artifacts in context before replicating the same scene across pages; a static screenshot or functioning canvas cannot establish motion quality. For other work, select the slice around its actual dominant risk rather than imposing visual review universally.

For artistic direction or frontend UI work, select and read a suitable available specialist skill, such as Impeccable or Taste UI, following the [specialist handoff](../../../docs/workflows/deliver-change.md#bring-in-a-specialist-when-the-work-needs-one). Pass the brief, criteria, current artifact, specific gap and remaining budget; retain its decisions and evidence in the existing record. If this workflow is unavailable, preserve those inputs and check the actual result against the original expectations. Use other domain skills where suitable within existing authority, and record missing capabilities honestly; a routine functional fix needs no design pass. This is author validation, not a mandatory new user approval gate. If the user defers review, continue bounded authorized work with final user judgment pending. A failed original expectation returns to implementation or its requirement translation; perfect-it is not required to repair baseline scope.

For UI work, use the brief's [contextual quality anchors](../../planning/set-ui-direction/SKILL.md#set-a-few-contextual-quality-anchors) to inspect a representative result before expanding it. If it misses the intent, revise the specialist prompt around the largest observed mismatch: intended result, current artifact, concrete correction, constraints to preserve and next observation. Repeating "make it better" is not a new approach. If attempts yield no meaningful improvement, stop that repetition and disclose the capability gap or unresolved choice; pursue a different evidence-backed approach within authority. Do not stop independent fixes or label a known essential failure complete. Stop optional polishing when enough is evidenced; preserve existing budgets and pending user judgment.

## Maintain one current record

Update the existing delivery record at meaningful increments, decisions, and interruptions. Use the [record template](references/implementation-record-template.md) only when a new record is needed. Preserve stable requirement, decision, work, and evidence IDs using project conventions; name kinds and explicit relationships with canonical targets and stated/inferred basis. Create entries as they become concrete, not a speculative graph.

Record what changed and why, observed checks and limitations, remaining work, and the next owner/action. Tie evidence to a commit or a described working-tree state; identify uncommitted changes when HEAD alone would misrepresent what ran. Later edits invalidate affected checks: rerun those before claiming they support the new state. Keep useful superseded decisions in history and replace obsolete current actions. Do not make a new report per task or agent, or delete the rationale when finishing.

## Finish or hand off accurately

Review the full requested scope against the actual diff and evidence. Run required project checks and proportionate integration checks that exercise how the increments work together. Targeted checks do not excuse skipping an explicitly required suite. Avoid repeating successful checks unless subsequent edits or unresolved risks invalidate them.

Mark the current handoff **Ready for Verification**, **Partial**, or **Blocked**, with delivered behavior, evidence, remaining scope, and the material limitation. Use Ready only when requested implementation is complete and required implementation checks passed; missing required checks or unresolved failures remain Partial/Blocked. Record the concrete recovery step for unavailable tools or credentials. Do not fabricate results or silently substitute mocks for required integration evidence.

Give one or two sentences linking to the saved record: what now works or changed, how it was checked, and any material gap or next action. Keep necessary limitations within that budget. If no destination/write access exists, provide the complete unsaved record in one Markdown code block after the short update; do not claim it was saved. Failed code writes are not completed implementation.

This handoff is not independent review, human approval, merge, or deployment. Follow existing project review requirements; report review still pending rather than impersonating it. No mandatory agent fanout, external publication, automatic commits/pushes, new service, or downstream skill invocation is introduced.

## Business-connected outputs

Own change entries linked to requirements or decisions and record revision-specific technical evidence. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Superpowers, Matt Pocock, pstack, and ECC. See [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md) when reviewing or redistributing the skill.


## Shared guidance: skills/verification/verify-change/SKILL.md
---
name: verify-change
description: Assess an implemented change against requirements and project standards using the actual artifacts and revision-linked evidence. Use for a bounded review or verification handoff; distinguish failed criteria, missing evidence, and target-environment acceptance without automatically fixing, merging, or deploying.
---

# Verify change

Establish what the selected change demonstrably satisfies and what remains unresolved. Verify the whole requested scope; do not treat a passing suite or an implementer's summary as proof of every requirement.

## Fix the assessment scope

Read the request, requirements/acceptance criteria, relevant decisions, implementation record, and applicable project rules. Distinguish accepted criteria from proposals or unresolved thresholds. Use already supplied context; ask only when a missing baseline or criterion materially changes what must be assessed.

Identify the requested comparison baseline and target, resolve moving references to commits when using Git, and inspect the actual diff plus relevant staged, unstaged, and untracked files. Do not default to the last commit or silently omit dirty changes. Distinguish direct baseline comparison from branch changes since a merge-base according to the request. Record which scope was inspected; an empty diff may mean there is no change to assess, not that requirements passed. For non-Git artifacts, identify the actual versions/files inspected.

Inspect current code/artifacts and affected callers/interfaces, not just summaries. Preserve other contributors' work. If sources or criteria are unavailable, assess the reachable portion and keep the missing portion explicit; absence of a spec does not prove correctness.

## Match claims to evidence

For each material acceptance criterion, link the relevant behavior and evidence and mark **Met**, **Not met**, or **Unverified**. Use **Not applicable** only with a reason grounded in the agreed scope, not to erase an unmet requirement. Preserve requirement/decision/evidence IDs and canonical cross-document references; distinguish stated relationships from inferred ones.

Read the actual check outputs and artifacts. Reuse an earlier check only when its provenance, command or inspection, outcome, tested revision and relevant working-tree state, environment, and coverage of the claim can be established. Label it reused evidence rather than a new run. A status line, old green badge, timestamp, or agent report alone is insufficient. Later code, configuration, dependency, data, or environment changes can invalidate it; compare relevant state rather than assuming HEAD represents uncommitted work.

Run missing or invalidated checks within existing permissions using the project's actual runner and commands. Follow explicit required-check policies even when some evidence is reusable. Inspect exit status and meaningful output; zero tests, skipped checks, truncated failures, missing dependencies, and setup errors cannot establish the intended behavior. A passing mock does not prove a live provider contract; compilation does not prove user-visible behavior. Use direct artifact inspection for claims not established by tests.

Select additional checks for concrete gaps, changed interfaces, and relevant failure behavior; do not add a fixed test pyramid, coverage number, or a generic audit to every change. Required broader checks still apply. Stop repeated runs when valid evidence suffices; if a check cannot run, record the exact missing capability and next permitted action instead of inventing a result.

## Audit original expectations, including quality

Compare the actual result against the original request and relevant prior preferences as well as the requirements document. An agent-written checklist can omit or weaken the request. Add an explicit finding for every material expectation lacking a criterion or suitable evidence; do not let an all-green subset establish whole-request completion.

Assess required functional behavior and requested experience quality separately. Use evidence appropriate to the claim: runtime checks for behavior, rendered inspection for composition/readability, observed interaction or recordings for animation, and actual user evidence for judgments reserved to the user. Report what was inspected and what failed, not "looks polished" based on a screenshot existing. A WebGL draw call is not evidence of good 3D artifacts; a static image is not evidence of good animation. Do not invent numerical aesthetic scores or require unrelated audits.

Requested quality is baseline acceptance, not automatically optional refinement. An observed unmet criterion means Changes required; an undefined material quality criterion or missing required observation means Incomplete. When author checks pass but the user has reserved the final subjective judgment, report Ready for user evaluation and keep that judgment pending. Do not describe technical completion as user acceptance or invoke perfect-it to compensate for an unmet original requirement.

If later user feedback rejects quality, preserve the technical evidence within its original scope and record the failed user assessment separately. Determine whether the cause is incorrect implementation, weak requirement translation, or a genuinely new request before routing more work. Only the last case may be additional refinement, and it still needs existing authorization.

For UI work, assess the brief's contextual quality anchors against the actual representative artifact, including whether essential assets are suitable and permitted. Anchor counts, word counts and specialist invocation are not quality evidence by themselves. Avoid inventing new standards after the fact: minor imperfections need not trigger further polish, but known essential failures or missing evidence stay Not met/Unverified unless the user explicitly changes the target. Report functional evidence, visual readiness and user acceptance separately; no universal score or promise of perfection is required.

## Review requirements and standards separately

Assess both whether the requested behavior is implemented and whether the change meets applicable project rules. One cannot compensate for the other. Inspect how affected parts work together; individual passing increments may leave an integration gap. Consider actual changed trust boundaries and data handling where relevant, without claiming a broad security assessment from grep matches or unrelated scans.

Record findings with the affected requirement/rule, path or artifact location, observed evidence or clearly labeled inference, consequence, and concrete next check/fix. Distinguish correctness/acceptance blockers from optional suggestions. Do not invent requirements to justify stylistic preferences. Separate known pre-existing failures from introduced regressions while preserving their impact on required criteria.

Verification alone does not authorize product edits. Route a code defect to Implementation; a failed premise to the affected Planning/Ideation decision. If the user also authorized fixing, use that scope and then reassess the changed artifact and affected evidence. Do not claim the old review still covers new code, automatically accept a changed criterion, or invent a correction budget. Honor an existing user-agreed refinement limit, including consumed rounds; verification does not reset it. Verification does not automatically invoke refinement. Only an explicit request for additional quality improvement calls for [Perfect it](../../implementation/perfect-it/SKILL.md); ordinary acceptance defects return to Implementation.

## Maintain the result and handoff

Update the existing delivery record; read the [verification template](references/verification-record-template.md) only when creating a new record. Preserve stable IDs, basis, provenance, and useful history. Reread and reconcile concurrent changes before editing. Keep one current finding/verdict per entry; retain superseded results as history rather than competing current claims.

Report requirements and standards separately, then give an overall **Verified within scope**, **Ready for user evaluation**, **Changes required**, or **Incomplete**. Ready for user evaluation requires passing author checks and explicitly pending user-reserved judgment; it is not an acceptance claim. Verified requires all applicable agreed criteria and required checks to be satisfied for the recorded state. A failed criterion means Changes required even if other checks passed; missing evidence remains visible alongside it. With no established failure but required evidence missing, use Incomplete. A narrowed assessment must explicitly identify excluded portions and cannot establish completion of the wider task.

Report target-environment acceptance separately as **Verified**, **Failed**, **Not performed**, or **Not applicable**, with environment/version and evidence when available. If target evidence is required for the requested outcome, its absence prevents a full completion claim even when local checks pass. Do not access a live environment without authorization.

State whether this was author self-review or a separate reviewer and identify human review still pending. A technical verdict is not human approval, merge permission, or release authorization. No mandatory agent fanout, publication, deployment, or downstream skill invocation is introduced.

Give one or two sentences linking to the saved record: the bounded outcome, material finding/evidence gap, and next action. Include necessary limitations and save status within the sentence budget. Without a destination or write access, provide the complete unsaved record in one Markdown code block after the short update; report failed writes accurately.

## Business-connected outputs

Own technical evidence for exact tested states; record business evidence separately only when actually assessed. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

Adapted from Superpowers, Matt Pocock, pstack, and ECC. See [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md) when reviewing or redistributing the skill.


# Cases
{
  "id": "C01",
  "types": [
    "experience",
    "revised-direction",
    "media"
  ],
  "records": [
    {
      "id": "G1",
      "kind": "outcome",
      "source": "user-1",
      "text": "Explore coffee-growing places through a cream cartoon world map, flavour/culture context and real Singapore cafe matches."
    },
    {
      "id": "R1",
      "kind": "requirement",
      "supports": "G1",
      "source": "user-1",
      "text": "Readable coherent illustrated discovery journey, with correct source-backed origin/cafe mapping."
    },
    {
      "id": "D1",
      "kind": "decision",
      "source": "agent-at-revision-a",
      "basis": "agent interpretation",
      "text": "A map with separate mountain symbols and a text-only detail panel is enough.",
      "status": "historical"
    },
    {
      "id": "E1",
      "kind": "evidence",
      "evaluates": "R1",
      "scope": "technical",
      "revision": "b",
      "result": "passed",
      "text": "Twenty-five behavior groups pass: mapping, controls, animation progression, zoom percentage and pan."
    },
    {
      "id": "E2",
      "kind": "evidence",
      "evaluates": "R1",
      "scope": "experience",
      "revision": "b",
      "source": "latest-user-2",
      "result": "failed",
      "text": "User rejects the whole experience: map reads as assembled pieces; photos are missing; selection and camera/details movement do not feel connected."
    },
    {
      "id": "R2",
      "kind": "requirement",
      "supports": "G1",
      "source": "latest-user-2",
      "basis": "later explicit feedback",
      "text": "Relevant real photographs and place-centred exploration with coordinated camera/detail movement."
    },
    {
      "id": "S1",
      "kind": "observation",
      "text": "No cleared photographs selected. Current app is revision b. No paid assets or production publication authorized. Layout choices delegated; earlier ready-for-review prose describes revision a."
    }
  ]
}
Applicable conditional knowledge (not observed outcomes):
[
  {
    "id": "K1",
    "applies": [
      "experience"
    ],
    "text": "An evidence record supports only claims its method can assess. Behavior checks alone cannot establish composition or whole-experience quality; compare the applicable experience requirement to observed artifacts and feedback."
  },
  {
    "id": "K2",
    "applies": [
      "revised-direction"
    ],
    "text": "Later applicable feedback or a changed target can invalidate a readiness claim without erasing earlier narrow evidence. Reconcile current versus historical state before choosing work or reporting completion."
  },
  {
    "id": "K3",
    "applies": [
      "media"
    ],
    "text": "When media is required or proposed to support the goal, check subject suitability and usage permission. Missing assets remain gaps; neither fabricate provenance nor silently omit a confirmed requirement."
  }
]

---

{
  "id": "C02",
  "types": [
    "revision-sensitive",
    "missing-link"
  ],
  "records": [
    {
      "id": "G2",
      "kind": "outcome",
      "source": null,
      "text": "Business purpose is not present in this handoff."
    },
    {
      "id": "R3",
      "kind": "requirement",
      "supports": null,
      "source": "supplied export acceptance record",
      "text": "CSV export retains all filtered rows, Unicode and valid escaping."
    },
    {
      "id": "W2",
      "kind": "change",
      "implements": "R3",
      "revision": "b",
      "text": "Quote escaping changed after revision-a tests. Current worktree is revision b; no run since that change."
    },
    {
      "id": "E3",
      "kind": "evidence",
      "evaluates": "R3",
      "scope": "technical",
      "revision": "a",
      "result": "passed",
      "text": "Checks covered row count, Unicode and quotes on revision a."
    },
    {
      "id": "S2",
      "kind": "observation",
      "text": "Only local verification and correction are authorized; no production access. The missing goal source is not available elsewhere in the supplied packet."
    }
  ]
}
Applicable conditional knowledge (not observed outcomes):
[
  {
    "id": "K4",
    "applies": [
      "revision-sensitive"
    ],
    "text": "Evidence about one revision is not automatically evidence about a changed behavior at another revision. Determine applicability and name the necessary current-state check."
  },
  {
    "id": "K5",
    "applies": [
      "missing-link"
    ],
    "text": "An absent goal/source link is unresolved meaning, not permission to invent intent. Preserve the gap while progressing independently authorized work supported by explicit requirements."
  }
]

---

{
  "id": "C03",
  "types": [
    "routine-change"
  ],
  "records": [
    {
      "id": "G3",
      "kind": "outcome",
      "source": "user-3",
      "text": "Correct the misspelt label Reciept to Receipt; keep everything else unchanged."
    },
    {
      "id": "R4",
      "kind": "requirement",
      "supports": "G3",
      "source": "user-3",
      "text": "Correct visible and accessible label in the established component without truncation or behavior changes."
    },
    {
      "id": "W3",
      "kind": "change",
      "implements": "R4",
      "revision": "c",
      "text": "The single shared label string was corrected."
    },
    {
      "id": "E4",
      "kind": "evidence",
      "evaluates": "R4",
      "scope": "technical and rendered",
      "revision": "c",
      "result": "passed",
      "text": "Affected desktop/mobile rendering and accessible name inspected; required build passes; no relevant edits afterward."
    },
    {
      "id": "S3",
      "kind": "observation",
      "text": "No unresolved criteria, additional project checks or user-reserved aesthetic decision. Task ends at the local correction; no push requested."
    }
  ]
}
Applicable conditional knowledge (not observed outcomes):
[
  {
    "id": "K6",
    "applies": [
      "routine-change"
    ],
    "text": "Completion is relative to authorized scope. A routine correction with sufficient current evidence needs no new design process, unrelated features or invented acceptance gate."
  }
]

---

{
  "id": "C04",
  "types": [
    "experience",
    "discovery",
    "media"
  ],
  "records": [
    {
      "id": "G4",
      "kind": "outcome",
      "source": "user-4",
      "text": "Help families discover calm rural guesthouses and decide which are worth contacting. Make the experience inviting and trustworthy; design judgment delegated."
    },
    {
      "id": "R5",
      "kind": "requirement",
      "supports": "G4",
      "source": "user-4",
      "text": "A small sourced catalogue with property names, locations and contact links. No booking, accounts or payments."
    },
    {
      "id": "S4",
      "kind": "observation",
      "text": "No implementation or visual assets yet. Catalogue facts include only names, locations and contact links. Image permissions and family-suitability details have not been checked; no purchases authorized."
    },
    {
      "id": "D4",
      "kind": "decision",
      "basis": "agent draft",
      "status": "proposed",
      "text": "Render the three catalogue fields in uniform cards and declare the experience finished."
    }
  ]
}
Applicable conditional knowledge (not observed outcomes):
[
  {
    "id": "K1",
    "applies": [
      "experience"
    ],
    "text": "An evidence record supports only claims its method can assess. Behavior checks alone cannot establish composition or whole-experience quality; compare the applicable experience requirement to observed artifacts and feedback."
  },
  {
    "id": "K3",
    "applies": [
      "media"
    ],
    "text": "When media is required or proposed to support the goal, check subject suitability and usage permission. Missing assets remain gaps; neither fabricate provenance nor silently omit a confirmed requirement."
  },
  {
    "id": "K7",
    "applies": [
      "discovery"
    ],
    "text": "For a discovery goal, reason about what the audience needs to understand, compare and trust before deciding. Identify missing supporting content or interaction, label inferred needs and verify factual claims; do not infer new transactional capabilities."
  }
]

---

{
  "id": "C05",
  "types": [
    "recovery",
    "revised-direction"
  ],
  "records": [
    {
      "id": "G5",
      "kind": "outcome",
      "source": "user-5",
      "text": "Demonstrate this release can recover safely from a failed upgrade in an isolated rehearsal."
    },
    {
      "id": "R6",
      "kind": "requirement",
      "supports": "G5",
      "source": "user-5",
      "text": "Rehearsal restores service and synthetic data to the agreed previous state; successful initial deployment alone is insufficient."
    },
    {
      "id": "E5",
      "kind": "evidence",
      "evaluates": "initial deployment health",
      "scope": "technical",
      "revision": "d",
      "result": "passed",
      "text": "Before rollback, health endpoint returned 200 and smoke test passed."
    },
    {
      "id": "E6",
      "kind": "evidence",
      "evaluates": "R6",
      "scope": "technical",
      "revision": "d",
      "result": "failed",
      "text": "Rollback rehearsal could not read synthetic records under the previous schema. Recovery state differs from the agreed snapshot."
    },
    {
      "id": "S5",
      "kind": "observation",
      "text": "Synthetic environment only. Production deployment is not authorized. No correction has been attempted; the original health evidence remains a true observation of that earlier state."
    }
  ]
}
Applicable conditional knowledge (not observed outcomes):
[
  {
    "id": "K2",
    "applies": [
      "revised-direction"
    ],
    "text": "Later applicable feedback or a changed target can invalidate a readiness claim without erasing earlier narrow evidence. Reconcile current versus historical state before choosing work or reporting completion."
  },
  {
    "id": "K8",
    "applies": [
      "recovery"
    ],
    "text": "Initial service health and recovery to an agreed state are distinct claims. A failed recovery obligation is not discharged by health evidence from before the recovery attempt."
  }
]