---
name: prepare-release
description: Prepare a concrete release handoff identifying artifact, target, verification evidence, existing deployment method, checks, and recovery limits. Use before deployment or for release-readiness assessment; preparation does not deploy, merge, publish, or authorize execution.
---

# Prepare release

Make the next release action concrete and reviewable using the project's existing process. Do not create infrastructure or rerun the entire development lifecycle to fill a release checklist.

## Establish the release identity

Read the request, current delivery/release record, relevant verification evidence, project deployment instructions, and actual scope of authorization. Reuse supplied decisions; ask only for missing choices that affect the artifact, environment, release behavior, or permission.

Identify the exact artifact/version and source revision, including whether it has been built. Prefer an immutable digest or platform artifact identity over a moving branch/tag. If building occurs during deployment, record the exact source and build inputs known, when the resulting artifact identity must be captured, and the evidence gap; do not claim an unbuilt artifact was verified. Account for relevant local changes rather than equating HEAD with the release contents.

Identify the target account/project/service/environment and, where relevant, region and current version. Use available authorized reads to confirm identity; a staging URL or project name alone may not establish which account will be mutated. Unknown identity remains a prerequisite, not a guessed default.

## Prepare only relevant prerequisites

1. **Evidence:** inspect the verification findings and actual outputs relevant to this artifact. Confirm their tested state and scope; preserve gaps and human review still required. Reuse valid evidence rather than rerunning everything. Local checks do not prove target acceptance, and a technically prepared release is not approval to deploy.
2. **Method:** identify the existing pipeline/runbook/tool and exact intended operation. Check commands against the actual project and available platform interface; do not copy generic examples blindly. If no deployment method exists, hand that implementation need back rather than installing a platform or inventing a command here.
3. **Configuration and data:** identify changed configuration, required secret references, migrations, compatibility, and relevant ordering. Record presence/absence and names or safe references, never secret values. A destructive migration, incompatible contract, or new cost/data effect needs an explicit applicable decision and authorization, not an assumed routine release.
4. **Acceptance:** specify a bounded smoke check tied to the changed user behavior, how to identify the installed version, and any required observation conditions/window from the project. Choose checks meaningful to this release; a generic healthy endpoint may be insufficient. Identify test data and side effects requiring authorization, and how temporary test effects are handled.
5. **Recovery:** record the existing previous artifact or other recovery approach, applicability to current data/schema, trigger, authority, and next owner. Distinguish documented, rehearsed, and observed recovery. If reversal is unavailable, state the forward-recovery decision needed; do not invent rollback capability or assume application rollback restores data.

Release authorization must identify its actual action and target scope. Existing authorization persists; do not add a new confirmation round when it already covers the concrete action. If permission is missing, finish all permitted preparation first and name the exact remaining decision. A new artifact, target, or migration may fall outside the original scope; verify rather than silently expanding it.

## Maintain the shared release record

Use the existing delivery record or release section. Read the [release template](references/release-record-template.md) only for a new record. Preserve stable release, decision, requirement, and evidence IDs and canonical references; state relationship meaning and basis without a separate graph. Retain unresolved conditions, actual decision sources, and relevant history. Reread and reconcile another writer's changes before updating.

Set preparation to **Prepared** when the artifact strategy, target, method, relevant prerequisites, checks, and applicable recovery approach are sufficiently concrete; **Conditional** for named prerequisites before execution; or **Blocked** when the next release action cannot be specified or taken safely. Report execution authorization separately. No target deployment is implied by any preparation state.

Give one or two sentences linking to the saved record: what is prepared, for which target, and the material remaining condition or next action. Include save status and limitations within that budget. Without a destination/write access, give the short update followed by the complete unsaved release record in one Markdown code block; report failed writes accurately.

Stop at the preparation handoff. Do not build/publish an artifact, trigger a pipeline, merge, deploy, mutate configuration/data, clean up branches, or automatically invoke an execution skill. Those actions require their own requested scope. No mandatory service, framework, runtime, or agent delegation is introduced.

## Business-connected outputs

Maintain release membership and prerequisites; preparation is not observed deployment. When creating or updating a project record, follow the [shared output contract](../../../docs/contracts/workflow-context.md). Reuse the existing document and IDs; add only the applicable entries and links. Preserve business intent through the handoff, distinguish technical checks from measured business outcomes, and give a one- or two-sentence human update with material gaps. No extra business analysis is required when existing context suffices.

If this skill was copied without the shared contract, keep the project's established document format, include explicit source/target references and missing-context notes, and report that machine-readable export is unavailable; do not invent a schema or silently claim compatibility.

## Attribution

See [pinned sources, adaptation choices, and MIT notices](references/upstream-notices.md) when reviewing or redistributing this skill.
