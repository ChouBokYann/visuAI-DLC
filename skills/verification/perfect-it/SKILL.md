---
name: perfect-it
description: Improve an authorized artifact against established expectations within a shared, finite round budget. Use for requested refinement or polish; stop at enough, stagnation, blockers, or the limit instead of pursuing unlimited perfection.
---

# Perfect it

Reach the agreed quality target with bounded effort. The name is not a promise of perfection. This is optional refinement, not a mandatory phase after every implementation.

## Read the target and reconcile state

Read the request, actual artifact, quality criteria, project rules, implementation authority, and existing refinement ledger. If expectations are materially unclear, use [Understand expectations](../../ideation/understand-expectations/SKILL.md); do not reinvent settled criteria. Assessment-only authority permits findings, not fixes.

Use [Verify change](../verify-change/SKILL.md) for one bounded initial assessment of the agreed criteria and required checks. Reuse valid evidence. Record Met, Not met, or Unverified against the actual revision and relevant dirty state. This assessment includes no product edits or open-ended research. If all must-haves pass, stop at zero rounds; optional polish cannot keep the loop alive unless explicitly part of the requested target.

## Reserve a round before changing anything

Use the [ledger template](references/refinement-ledger.md) within the existing work record. Default to **two improvement rounds total** only when no existing budget exists. One coordinator owns the authoritative ledger across agents, worktrees and sessions. Read and reconcile it before every attempt; if the history is unavailable or conflicting, stop dependent refinement rather than assume zero usage.

Reserve the next numbered round and increment used before starting its work. Record a finite gap set, hypothesis, owned paths, planned changes, checks and expected improvement. A round is one bounded batch of changes followed by its planned checks. Further corrective edits after assessment require another round. Failed, reverted or interrupted attempts consume their reservation. Resume only the unfinished planned actions of an existing round, never restart it as free work. Persist checkpoints; if the record cannot be saved, hand off instead of starting changes with an untracked allowance.

Delegation is optional and requires existing permission. Workers receive only a finite part of the reserved batch; they may not run independent refinement loops. The coordinator assesses their combined state. A restart, new worktree, renamed task or new agent does not renew the allowance for the same objective. If coordination cannot be guaranteed, keep refinement serial.

## Improve, check, decide

Make only the authorized changes addressing the selected gaps. Use the project's existing tools and appropriate Implementation skill, preserving others' work. Run the planned relevant checks and mandatory project checks on the resulting state. Record actual outputs and remaining gaps; a failed setup is missing evidence, not success. Do not hide retries inside a round or repeatedly rerun an unchanged failure. Finite measurement samples declared in advance are checks, not extra improvement attempts.

Compare before and after against the fixed criteria. Retain useful changes with valid evidence. If a change regresses behavior, restore only your isolated change when safe and authorized; otherwise report the unresolved state without overwriting concurrent work. Restoration is cleanup, not a fresh improvement hypothesis.

Stop when all must-haves and required checks pass, a round produces no meaningful progress, a blocker prevents assessment, or the allowance/time/spend limit is reached. Do not expand scope to use the remaining rounds. Record quality outcome separately from stop reason: **Met**, **Not met**, or **Unverified**; mixed gaps retain their individual statuses. Budget exhaustion never means the target was achieved. Surface discovered correctness/security failures even when the budget is exhausted; do not silently launch a repair loop.

Only an explicit user extension grants more rounds. Record the additional count, source and updated total without erasing used rounds. A vague request to continue after exhaustion needs a specific bounded allowance, not a fresh default. Prompt instructions cannot enforce scheduler eligibility or a hard credit limit; use host controls when available and disclose their absence.

## Output and handoff

Update the same work record with round history, artifact state, evidence, unmet/unverified criteria, stop reason and next owner/action. Preserve existing business/requirement/decision links under the [shared output contract](../../../docs/contracts/workflow-context.md); if unavailable, use the project's format and disclose unavailable export support. Do not create a report per worker or round.

Give one or two sentences: what improved, whether the target was met, rounds used/limit, and any material gap, linking to detail. A completed bounded run can leave quality unmet. No merge, deployment, external publication or independent human approval is implied.

## Attribution

Adapted selectively from pstack's measurement loop; see [sources and notices](references/upstream-notices.md). The maximum-round rule replaces its attempt floor and perseverance guidance.
