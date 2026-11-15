# Deployment pair: author walkthrough

Date: 2026-11-15. This is an author application of the instructions to synthetic release situations, not an independent evaluation, runtime invocation, actual deployment, or recovery rehearsal. No environment, service, or product was mutated. Real-project testing remains deferred.

## A. Preparation without deployment authority

Fixture: the user asks to prepare release REL-001 of a cafe directory for staging. The existing pipeline and runbook identify immutable artifact ART-042 and source revision REV-042; verification evidence EVD-020 covers that artifact locally. The target account/project/service is supplied and confirmed by fixture context. No schema migration is needed. The previous artifact ART-041 is available; the runbook says reverting it is compatible. No recovery rehearsal evidence is supplied. Deployment permission is not granted. REQ-004 requires laptop-policy filtering.

Expected application: inspect the available runbook/evidence, retain immutable artifact and target identity, name the installed-version check and changed-behavior smoke check, and record recovery as documented rather than rehearsed. Set preparation Prepared only on this concrete fixture basis, execution Not started, target acceptance Not performed, and deployment authorization Not granted. Do not trigger the pipeline, request credentials, or require another full development plan.

Example current record fragment:

```markdown
Release REL-001 targets ART-042 / REV-042 in the specified staging service.
REL-001 targets Requirement REQ-004 in product.md (stated release scope).
Evidence EVD-020 supports local verification of ART-042, not staging acceptance.
Preparation: Prepared. Execution: Not started. Target acceptance: Not performed.
Recovery: documented ART-041 restoration, compatible per supplied runbook; not rehearsed by this exercise.
Authorization: preparation only. Next owner/action: release owner grants the concrete staging operation or leaves it prepared.
```

Illustrative human response:

> Prepared an unsaved staging release record for ART-042, including the policy-filter smoke check and documented recovery to ART-041. Deployment has not started and requires authorization for the specified staging target.

The full unsaved record would follow. This example claims no actual file save or confirmation of a real artifact/runbook.

## B. Execute an already authorized release

Fixture continuation: a supplied user decision now authorizes REL-001 to staging, its bounded smoke test with disposable fixtures, and compatible recovery to ART-041 on failed acceptance. Current target state still matches the prepared baseline. A pipeline submission returns operation OP-042; later platform observation shows ART-042 installed, and the supplied smoke result meets REQ-004. Production is outside scope.

Expected application: reuse REL-001, confirm current action/identity, execute the existing method under the granted scope, capture OP-042, and observe installation before claiming Deployed. Record the target check with its artifact/environment and limits; no extra authorization round is needed for the already covered action. Stop at staging, preserving Production not performed.

Illustrative result wording, valid only if those observations were actually obtained:

> Updated the release record: ART-042 is deployed to staging, and the policy-filter smoke check passed for that version. Production was not changed; acceptance covers only the recorded smoke check and observation window.

Review boundary: this document supplies synthetic observations; it is not itself evidence that a pipeline or check ran.

## C. Timeout and resume

Fixture: submission of OP-042 times out after the platform may have accepted it. A status read later shows it still running. The user has authorized one release operation, not repeated data migrations.

Expected application: record Unknown initially, retain the operation identity, reconcile to In progress from the actual status, and observe that operation rather than submit again. If status access is unavailable, preserve uncertainty and stop dependent mutations with the required read/access action. Do not mark Failed merely because the response timed out and do not blindly retry. A record-write failure likewise does not justify redeployment.

If a later read shows ART-042 installed but smoke checks are unavailable, installation can be Deployed while target acceptance stays Not performed. That is a partial outcome, not successful completion of the full release request.

## D. Incompatible recovery and changed artifact

Fixture: a failed smoke check follows a schema migration incompatible with ART-041. Authorization allowed restoring ART-041 only when compatible, and no data recovery action is granted.

Expected application: report installed artifact and failed acceptance accurately; do not roll back application code into an incompatible schema or invent database reversal. Record recovery Not attempted with the incompatibility and needed operator/decision. Preserve useful evidence and current state for a permitted forward recovery or other explicitly chosen action. If a later authorized recovery is attempted, observe its resulting version and behavior before marking recovery Verified; the failed ART-042 release remains failed acceptance in history.

Separate fixture: a moving tag now resolves to ART-043 instead of prepared ART-042. The skill must reconcile artifact identity, evidence, and authority before mutation rather than silently substituting the tag's new content. Whether approval covers a newer artifact depends on its actual scope, not a universal rule that every change requires another prompt.

## Contract checks and limits

- The author checked independently callable preparation/execution, a shared current record, existing permission reuse, explicit target/artifact identity, and separation of local evidence from target acceptance.
- Failure boundaries include uncertain submission, ongoing operation, inaccessible status, missing smoke evidence, incompatible schema recovery, moved artifact identity, and failed record writes.
- These are expected applications of written instructions; no runtime claims, live health evidence, independent review, or observed recovery are asserted.
- `python -X utf8 C:/Users/maker/.codex/skills/.system/skill-creator/scripts/quick_validate.py` returned `Skill is valid!` for both `skills/deployment/prepare-release` and `skills/deployment/deploy-and-check`. Local links in the deployment directory, proposal, and walkthrough resolved; Git whitespace checks passed. No platform helper, deployment command, credentials, CI infrastructure, or global installation was added.
- Pending: platform-specific validation, real artifact creation/deployment, behavior under an installed agent, independent maintainer review, and actual testing in another project. No claim of production safety or guaranteed rollback is made.
