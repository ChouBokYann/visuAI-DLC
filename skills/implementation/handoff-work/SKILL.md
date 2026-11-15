---
name: handoff-work
description: Prepare a concise, evidence-linked handoff so a person or agent can resume interrupted work from its actual state. Use for a session or ownership transition at any lifecycle stage; reference existing artifacts instead of duplicating specs, plans, or reports.
---

# Handoff work

Make the next action recoverable without rereading the whole conversation. A handoff records work; it does not complete it, transfer permissions, or launch the next agent.

## Reconcile before summarizing

Read the current request, existing work record, consequential decisions, and actual available state. Reuse supplied context and the intended next-session focus. Do not require earlier skills or interview the user again about settled choices.

Inspect the relevant branch/revision and staged, unstaged, and untracked work, or equivalent non-Git artifact versions. Identify relevant unfinished changes without copying unrelated private material or resetting anyone's work. A clean HEAD, old summary, or completion claim alone does not establish the current state. If inspection is unavailable, label the state as reported rather than observed.

Separate completed work from attempts, partial work, blockers, and proposed actions. Preserve the reason for consequential decisions and the conditions that would reopen them by linking their canonical sources. Do not replace the existing spec or transcript with an invented narrative.

For material checks, retain the command/observation, outcome, tested state, and evidence pointer if available. Reuse a pass only when relevant code/configuration/data still matches; later relevant edits leave it stale. Missing provenance means unverified, not passed. A suggested rerun stays a next action, not a result.

## Preserve only what the next owner needs

Update the current record's handoff section, or use the [handoff template](references/handoff-template.md) for a new authorized destination. Preserve stable IDs and canonical references; keep useful superseded rationale as history instead of competing current instructions.

Include the objective and exclusions, current state and unfinished paths, valid/stale/missing evidence, unresolved dependencies, and the smallest next action. Name the next owner only if actually assigned. Record existing authorization and pending decisions accurately; credentials, secrets, and sensitive transcript details do not belong in the handoff. Suggested skills are optional and must exist in the receiving environment; plain next-action instructions must still work without them.

Use durable repository-relative paths or accessible URLs where possible. Mark local-only/temp artifacts explicitly and identify what would be needed to make them available to the recipient. A reference to an inaccessible local file is not a successful transfer of its contents. Do not publish, push, install a memory service, automatically start another session, or silently broaden authority.

## Finish

Check that a returning reader can locate the current artifacts, distinguish observed from reported state, and identify the next action and its blockers. Reread a shared record before saving to reconcile concurrent updates. If work changes while writing, refresh affected state or mark the handoff snapshot stale.

Give one or two sentences stating where work stands, the next action, and any material limitation, linked to the saved record. With no writable destination or a failed save, label the record unsaved and provide it in one Markdown code block after the short update. A complete handoff can describe incomplete work; it must never imply implementation completion or human approval.

## Attribution

Adapted from Matt Pocock's handoff skill; see [pinned source, adaptation choices, and MIT notice](references/upstream-notices.md).
