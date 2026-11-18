---
name: verify-change
description: Assess an implemented change against requirements and project standards using the actual artifacts and revision-linked evidence. Use for a bounded review or verification handoff; distinguish failed criteria, missing evidence, and target-environment acceptance without automatically fixing, merging, or deploying.
---

# Verify change

Establish what the selected change demonstrably satisfies and what remains unresolved. Verify the whole requested scope; do not treat a passing suite or an implementer's summary as proof of every requirement.

For a user path that needs repeatable runtime evidence, use [Exercise user journey](../exercise-user-journey/SKILL.md) and consume its observed results in this assessment.

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
