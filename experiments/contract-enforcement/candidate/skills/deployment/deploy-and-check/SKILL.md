---
name: deploy-and-check
description: Execute an authorized release through an existing deployment process, reconcile actual target state, and check the installed version and behavior. Use with a prepared release or equivalent context; preserve uncertain outcomes and recovery limits rather than infer success from a submitted command.
---

# Deploy and check

Deliver the specified artifact to the specified target and observe the result. Use the existing release record; a separate preparation skill run is not required when its information is already present.

## Reconfirm the concrete action

Read the request, release scope, verification evidence, project deployment procedure, and actual authorization. Identify the artifact/source and build strategy, account/project/service/environment, relevant current target state, prerequisites, acceptance checks, and recovery approach. Do not infer these from a branch name or a prior successful release.

Use permitted reads to reconcile recorded and current state before mutation. Check for an existing operation for this release, changed configuration/migrations, another deployment, or a moved artifact tag. Resume the actual operation where appropriate instead of starting a duplicate. If the target or artifact differs, establish whether existing authorization covers it; do not silently deploy a substitute. Preserve another operator's work.

Keep material prerequisites explicit. Relevant verification evidence must apply to the intended release; human approval and release authority remain separate. Required missing access or unsafe/unknown migration recovery blocks dependent actions. Prepare what can be prepared without mutation, then name the precise missing decision. Do not ask again when existing permission already covers the concrete action.

## Execute through the existing process

Follow the project's actual pipeline/runbook and inspect the available interface; do not invent commands, install new services, or assume example rollback commands are valid. Execute only the authorized environment/action, with required configuration supplied through existing secure mechanisms. Do not print secrets or include them in the record.

Capture the operation/run ID, intended source/artifact, target, and initial result. If this process builds an artifact, record its resulting identity and required checks before promotion; an unverified replacement build is not the previously tested artifact. Respect dependency and migration ordering rather than rerunning completed steps blindly.

A successful submission, zero command exit, or elapsed time is not deployment proof. Observe status through the platform and target within its applicable bounded observation window. If no required window is known, make the bounded observation and its limit explicit rather than claiming long-term health. A timeout, disconnection, or ambiguous response means **Unknown** until reconciled, not automatically Failed or Deployed.

Before any retry, inspect operation identity and actual target state. Determine whether the action completed, is still running, failed without effects, or partially changed state, and whether retry is safe/idempotent and authorized. Never repeat a deployment, migration, or rollback solely because its response was lost. If state cannot be established, stop dependent mutations and identify the read/access/operator action needed; do not run an unbounded polling or retry loop.

## Check the actual target

Confirm the installed artifact/version on the intended target, then perform the release's permitted health and changed-behavior smoke checks. A healthy old version is not a successful new release. A passing local test or mock is not a target check. Respect test-data and cleanup boundaries; request missing authority for a necessary mutating check rather than silently exercising real users' data.

Record actual observations with their artifact, environment, operation identity, and scope. Distinguish **Deployed** (installation observed) from target acceptance **Verified**, **Failed**, or **Not performed**. Missing required checks prevent a successful full-release claim even when installation is confirmed. Limited smoke evidence does not establish every requirement or continuing health beyond the observed window.

## Recover only when applicable and authorized

If failure triggers the project's recovery procedure, recheck its applicability to the actual partial state and its authority. Restoring an application artifact does not necessarily reverse migrations, external side effects, or data writes. Do not claim recovery is safe because a previous version exists. Do not improvise a destructive database rollback.

Execute an already authorized applicable recovery action without a redundant permission round. If it is unsafe, unavailable, or outside the granted scope, preserve observed state and evidence and name the next owner/decision; do not silently escalate privileges or substitute a different recovery plan. After recovery, confirm the resulting artifact/data compatibility and relevant behavior. Report attempted, in-progress, failed, unknown, or verified recovery accurately. A verified recovery does not make the requested new release successful.

## Maintain the record and finish

Update the same release section in place, preserving stable release/requirement/decision/evidence IDs, explicit relationships, provenance, and useful attempt history. Keep the current target and next action unambiguous; reread and reconcile concurrent edits before writing.

If no release record exists, create a compact Markdown record with `type: Release Record`, `title`, `description`, and `status: draft` in complete YAML frontmatter. Include identity/scope, evidence/authorization, procedure/prerequisites, checks/recovery, current execution/observations, and next owner/action. These sections are sufficient without installing another skill or loading a separate workflow. Without destination/write access, return the complete unsaved record after the short update; a record-write failure must not cause a deployment retry.

Give one or two sentences linking to the saved record: actual target/version and outcome, check or recovery result, and any material gap or next action. Include save status/limitations within that budget. Do not label a partial, unchecked, or uncertain release successful. Retain current evidence for maintenance rather than deleting release history or cleaning up branches.

Stop at the requested target. No automatic promotion to production, merge, PR publication, branch deletion, or new infrastructure. Existing permissions persist but do not expand to a different environment or irreversible operation. Report human review/approval separately; technical observations do not grant it.

## Business-connected outputs

Update observed release state and target-environment evidence, keeping business benefit distinct. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

See [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md) when reviewing or redistributing this skill.
