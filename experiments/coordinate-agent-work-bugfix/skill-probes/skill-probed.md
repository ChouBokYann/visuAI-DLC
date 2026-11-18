---
name: coordinate-agent-work
description: Use when an authorized task involves agent delegation, shared ownership, implementation and independent review handoffs, or integrating results from multiple workers.
---

# Coordinate agent work

Keep one accountable coordinator, explicit ownership, and evidence for the actual integrated result. Skills guide work; the host supplies agent tools and isolation. Use this skill for coordination, not as a replacement for implementation, diagnosis or verification.

## Establish scope and the working state

Read the request, canonical criteria, applicable project rules, current work record, baseline and working-tree changes. Identify the human owner, integrating coordinator, existing authority and unfinished work. Reconcile previous dispatches with the host and current artifacts before starting another worker; a progress message is not confirmation that a writer has stopped.

Reuse the existing record. Keep the scope, decisions and acceptance criteria there rather than rewriting them in every worker prompt. Missing source, criteria, tools or ownership must be named with the next check. Continue independent authorized work; do not invent a decision or evidence to unblock dependent work.

## Choose the smallest useful team

Identify blocking prerequisites, independently reviewable outputs, shared mutable state and why the proposed split helps. One implementation owner plus a separate reviewer usually suffices for a coupled feature or bug fix. Keep a small single-owner task inline when delegation adds no useful separation. Do not create a worker for every lifecycle phase.

Parallelize only independently owned work when the host supports and authorizes it. One writer owns each shared file or contract. Worktrees do not isolate databases, ports, browser profiles or external issue state; assign those resources too. A read-only reviewer can own its own harness and evidence without editing product code. Before transferring write ownership, confirm the old worker is terminal or stopped, preserve its changes, and record the transfer.

If agent tools are unavailable, carry out permitted work inline and label review as self-review or pending. Do not claim an independent agent ran. Choose supported tools/models under the host's actual configuration; this skill does not install a runtime, select a vendor or grant additional access.

## Dispatch a bounded assignment

Each assignment needs these fields, in the existing record or a linked brief:

| Field | Required information |
|---|---|
| Purpose | Work ID, objective, scope and exclusions; canonical acceptance criteria |
| State | Baseline and exact candidate state, including relevant dirty/untracked files; evidence already available |
| Ownership | Human owner, coordinator, worker, owned paths/resources, shared-contract owner and dependencies |
| Execution | Next relevant skill, permitted actions, required observations/checks and missing prerequisites |
| Return | Report destination, artifact pointers, tested state, command/results/coverage, unresolved findings and next action |

Give the worker only relevant context and accessible references. Include critical facts inline if the worker cannot access a referenced artifact. State that other contributors are present and their edits must be preserved. The coordinator owns delegation; nested delegation needs an explicit grant with disjoint ownership, otherwise workers return directly to the coordinator.

For a persistence repair, a useful assignment is: “Own the storage module and its regression test. Reproduce the final-item removal/reload failure against the stated baseline, preserve the failing assertion, repair within scope, and return changed files, their tested identity, passing evidence and remaining gaps. The reviewer owns browser acceptance.” This is a bounded assignment, not permission to change the acceptance criterion.

Use [Implement increments](../implement-increments/SKILL.md) for the fix and [Diagnose issue](../../maintenance/diagnose-issue/SKILL.md) when the cause is unknown. Existing authorization carries through routine steps; coordination does not require another permission request at every handoff.

## Reconcile the returned work

Inspect actual changes and evidence. A worker's “done” is a handoff, not an acceptance verdict. Identify the returned commit or content fingerprint, relevant working state, changed paths, commands, exit status, discovered/executed checks and coverage. A zero-test success, missing log, inaccessible artifact or check from an older candidate leaves the corresponding criterion unverified.

Match reports to the current files before using them. If a worker stops early or becomes unreachable, preserve its work, record the unfinished scope and reconcile ownership before replacing it. Never reset another writer's work or treat a missing result as a pass.

## Review, correct and retest

Give the independent reviewer canonical criteria, the actual frozen candidate and diff, source/evidence pointers and known environment limits. The author report provides context; it cannot be the only review input. Use [Verify change](../../verification/verify-change/SKILL.md) for the verdict and [Exercise user journey](../../verification/exercise-user-journey/SKILL.md) for required runtime proof.

Keep each finding's ID, observed failure, consequence, affected criterion, inspected state and next check. Route authorized corrections back to the implementation owner through [Address review feedback](../address-review-feedback/SKILL.md). Preserve disputed findings and evidence for their disposition. Changed scope or a product decision goes to its decision owner; a reviewer preference is not a new requirement.

After a correction, freeze the new candidate and independently recheck affected findings and integration risks. Do not reuse an earlier pass for changed behavior. Preserve each attempt's evidence before rerunning; distinguish harness/setup failures from product failures. An unavailable browser leaves runtime acceptance unverified even if unit tests pass.

Honor existing budgets and stop conditions. A repeated unchanged failure needs a revised diagnosis, setup, dependency or approach before another attempt. Continue unaffected work and hand off the blocked dependency precisely. Do not silently relax criteria, manufacture an extra repair round, or retry an uncertain external action without reconciling whether it already happened.

## Verify integration and finish

The coordinator checks the actual combined state, ownership release and required evidence. Separate worker passes do not prove integration. Run missing or invalidated checks; reuse valid evidence with its source and limitations explicitly recorded. Preserve known failures and required missing checks in the verdict.

Stop only resources created and identified for this run; leave unknown listeners, profiles and data alone. Confirm evidence survives cleanup, and record any resource deliberately handed over to a new owner. An HTTP response alone does not establish server ownership.

Return one consolidated result: delivered behavior, current tested state, requirement/review status, evidence, remaining work and next owner/action. Use the project's statuses; otherwise distinguish **Ready for verification**, **Changes required**, **Verified within scope**, and **Incomplete**. A required failure or missing check cannot be a verified result. Independent agent review does not replace required human acceptance or authorize publication, merge or deployment. Use [Handoff work](../handoff-work/SKILL.md) if the session or owner changes.

## Business-connected outputs

Keep assignments, findings, decisions and evidence in the existing work record; do not create competing reports per skill. Follow the [shared output contract](../../../docs/contracts/workflow-context.md) when creating or updating canonical project records. If unavailable, retain the established format and explicit source links, and disclose unavailable machine-readable export. Technical verification is not measured business benefit.

## Attribution

Adapted from the repository's engineering router and pstack's feature/delegation practices. See [pinned sources, adaptation decisions and MIT notice](references/upstream-notices.md).
