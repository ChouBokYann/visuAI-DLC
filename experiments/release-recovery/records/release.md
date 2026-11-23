---
type: Release Record
title: E07 local A/B/C release trial
description: C verified after failed B and exact A recovery; owned target stopped and preservation checked
status: draft
workflow_context:
  version: 1
  project: e07-release-recovery
  records:
    - id: E07-RELEASE
      kind: release
      status: deployed
      title: Disposable local release trial
      summary: Observe installation, user failure, retained-artifact recovery and correction.
      detail: "#e07-release"
      revision: 06ddc4afa01f56a5571585f24bbba8e7d2a01f0997a02db284723f29b4519067
      environment: disposable-loopback-staging
      observation: final-review
      sources:
        - id: final-review
          ref: ../evidence/review-C/result.json
        - id: authority
          ref: plan.md
        - id: runbook
          ref: runbook.md
      links: []
---
<a id="e07-release"></a>
# E07 release record

Current: C **Prepared / Deployed / Verified**; failed B remains failed, exact A recovery verified. Owned target cleanup and preservation now verified; retained C is not a running service. The sections below retain preparation and attempt history.

Human owner Bok explicitly approved the proposal and waived issue-first/other-maintainer gates for this local trial; exact authority and limits are in [plan.md](plan.md). This is neither Perry's approval nor main adoption. Executor owns this record and serialized control operations; root owns immutable source/A/B and the continuously running target; reviewer owns independent checks. No GitHub actions.

Source: local uncommitted E06 S3 R3, SHA-256 `785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3`; base commit is not source identity. [setup.json](setup.json) pins skills and host. Root reports baseline unit 10/10, provider 15/15 and production build passing, helper tests red 0/3 then green 3/3. Exact runtime model/token costs unavailable.

Target: loopback staging 127.0.0.1:56415, stable backend :56414, PID 39932, run `92e22675-7232-416e-96b2-ebcd705dd563`, under target/state. No active artifact before A. A and B contain the same built dist; release.json routes A to /api/shortlist and deliberately faulty B to /api/shortlists. Manifest identity and actual preflight are retained in executor evidence. No schema/data migration. Dependencies reused, no installs.

Procedure: [runbook.md](runbook.md), install A using `node target/control.mjs artifacts/A e07-install-a install`, seed synthetic IDs ['nylon','mill'] once via direct PUT with schemaVersion 1. Await independent installed-file/served-byte identity and browser/API checks at 1440x1000 and 390x844 before B. B is intentionally admitted only to this controlled failure scenario, never prepared as production ready.

Recovery trigger: independently observed B user/API failure. Restore exact retained target/state/releases/A using `node target/control.mjs target/state/releases/A e07-recover-a recover`, promptly before prolonged diagnosis. Verify A and unchanged IDs on same PID/run; never reset data or restart backend. Retained A must verify before recovery. Missing/damaged retained artifact blocks recovery rather than reconstructing it.

A command exit proves only operation result. /health proves process liveness; /__release plus installed/served digests prove version. Reviewer behavior checks establish bounded acceptance, not ongoing health or business benefit. Checks permit synthetic add/remove only with original state restoration. Recovery does not make B successful or prove durable correction.

Initial next action (completed): executor install A; independent reviewer verifies frozen A. One initial cycle, at most one setup-only retry and two corrections. No production, durable-storage, concurrent-operation or lost-ack claims.

## A installation observed
At 2026-11-21T04:05:18.612Z `e07-install-a` completed, command exit 0; /__release reports A digest `b7702a6c02e3486555d3a26cd6534e1b677db343cfd07162b4a8ebf92b7a1735`. [Preflight](../evidence/executor-preflight.json) verifies 20 manifest entries for A/B before switch; [operation](../evidence/executor-install-a.log) and [seed/target observation](../evidence/executor-a-seed.json) preserve exact state. Synthetic state seeded once from empty; target and direct backend return ['nylon','mill']; health200. Execution: **Deployed**. Independent acceptance: **pending**. Frozen for reviewer before B.

## A accepted; B installed with observed symptom
[A independent review](../evidence/review-A/result.json) passed 7/7, including all served dist bytes and browser add/remove/refresh at both viewports; backend state restored after permitted interactions. Primary harness hash `7516cb983de83d1dd424e40f4a0d4a50c39275d1ee211603f6b0c80abfa5f753` is frozen.

[Before B](../evidence/executor-before-b.json) reconciled active A and preserved backend identity/state. `node target/control.mjs artifacts/B e07-install-b install` completed exit0 at 2026-11-21T04:06:18.966Z; [B operation](../evidence/executor-install-b.log). B digest `123c4ef248862989c6fb105e04c9578e8f468d92c0b71a7b353a737781c021c4`. [Installed B observation](../evidence/executor-installed-b.json) records /__release B, health200, target shortlist404 NOT_FOUND, direct backend200 with original IDs and configured plural backend path404. B: **Deployed / target verification failed on executor API probe**, independent review pending. No retry, in-place edit or backend restart.

## Failed B; retained A recovered
[Independent B review](../evidence/review-B/result.json) failed the unchanged harness (exit1): actual target API404 despite health200 and verified installed/served B. Browser checks timed out waiting for networkidle at both viewports; error UI/API observations were preserved, so do not call these completed add/remove assertions. No backend mutation occurred.

`node target/control.mjs target/state/releases/A e07-recover-a recover` returned exit0 at2026-11-21T04:07:05.017Z, immediately after independent handoff, before prolonged diagnosis. B installed-to-recovery interval46.051s. [Pre-recovery](../evidence/executor-before-recovery.json), [operation](../evidence/executor-recover-a.log), [restored A](../evidence/executor-recovered-a.json) retain identities/state. Execution: exact A **Deployed**, API recovery observed; independent recovery **pending**. B remains **Failed**. No replay, source mutation, API restart or hidden reset. [Diagnosis](diagnosis.md) separates supported routing cause from browser timing uncertainty and pending correction.

## Recovered A accepted; C prepared
[Recovered A independent review](../evidence/review-recovered-A/result.json) passed7/7, same frozen harness and original data/run. A recovery is **Verified**; B remains **Failed**.

Before creating C, `node records/routing-regression.mjs B` failed0/1 (exit1) on actual HTTP404 versus expected200 through an isolated loopback target built from immutable B and the same live backend. Then `node records/package-release.mjs C /api/shortlist` completed exit0. Unchanged `node records/routing-regression.mjs C` passed1/1 (exit0). Script SHA-256 both runs `2a3611da16cc023f6908ab2efafa9d8b14c62c4b4013a67338c9b493d4822328`. [Red](../evidence/executor-regression-B.json), [green](../evidence/executor-regression-C.json), [package](../evidence/executor-package-c.log). Each candidate listener was closed in finally; evidence preserves PID/port/state/digest. Recovered staging was not re-exposed to B.

C **Prepared**, digest `06ddc4afa01f56a5571585f24bbba8e7d2a01f0997a02db284723f29b4519067`,20 manifest files. Only release identity/configuration changes; same production dist and baseline unit/provider/build evidence remain applicable. Corrected route /api/shortlist. Same target, authority, data compatibility and retained-A recovery as above. Correction round1 of2. Next authorized action installs C, followed by independent full target acceptance; green regression alone is not acceptance.

## Final deployment assessment
[C independent review](../evidence/review-C/result.json) passed7/7 with the same frozen primary harness, installed/served C identity, desktop/mobile load-add-remove-refresh and unchanged initial/final IDs on the same backend. C is **Deployed / Verified** within this observation window. B is **Deployed / Failed**; retained A recovery is **Verified**. [C operation](../evidence/executor-install-c.log) exit0 and [installed observation](../evidence/executor-installed-c.json) are subordinate to these independent target checks.

Counts: one initial cycle; zero setup-only retries; one correction round of maximum two; four main target operations (A, B, recovered A, C), all exit0. Primary phases A7/7, B4/7 (three failed checks), recovered A7/7, C7/7. Focused regression B0/1 exit1, C1/1 exit0; assertion bytes unchanged. Root unit10/10, provider15/15 and build0 apply to unchanged source/dist; [baseline exits](baseline-exits.json), [helper checks](helper-checks.json). The two ephemeral regression copies are probes, not main staging redeployments.

Workflow learning: prepare-release made artifact/config identity and retained recovery concrete; deploy-and-check separated installed B/healthy process from failed behavior and kept failed B distinct after recovery; diagnose-issue discriminated backend health from wrong mapping and required a real route regression. Configuration must stay inside release identity (ECC-derived practice); build/branch identity is not target evidence (Superpowers boundary); direct-versus-proxy predictions support the mechanism (Superpowers/Matt diagnosis); one routing regression is proportionate prevention (pstack/Matt root-cause/retro). Pinned upstream provenance is in design/setup, with existing notices preserved. This single guided scenario does not establish superiority, full lifecycle coverage, business benefit or production readiness.

Limits: B browser navigation timed out before the later journey assertions, but independently observed API404 and rendered unavailable UI establish the useful failure. Mobile error notice overlaps header/nav; preserve as a separate layout follow-up, not fixed here. Exact model/token/cost telemetry unknown. No durable data storage/restart, migration, cloud, concurrency, lost acknowledgment, long-term health or full accessibility assurance was checked.

Executor handoff: records saved and ownership of release/diagnosis, regression/C and control operations released to root. No further switches. At that handoff root owned final preservation, listener cleanup and overall acceptance report; the subsequent cleanup section records completion.


## Root cleanup and preservation reconciled
Root's [before-cleanup observation](before-cleanup.json) retains verified C and ['nylon','mill'] on the original run. [Process cleanup](cleanup-process.json) confirms owned PID39932 absent after an initial sandbox access denial and an approved exact-process retry; [listener checks](cleanup-listeners.json) confirm both ports refused connections. This cleanup retry is not a deployment/setup-cycle retry. The backend was stopped only after final acceptance and data capture; no state-durability claim follows from its intentional shutdown.

[Preservation](preservation-result.json) finds no changes in382 prior tracked experiment files,464 E06 files, frozen fixture source/helper/skills or protected refs, and no outside-scope changes. Current trial state: **complete local deployment/recovery/correction evidence; target intentionally stopped, artifacts retained**. Earlier pending statements are timestamped handoff history, superseded by final review and this cleanup entry. Root consolidates overall results; independent human adoption remains unclaimed.

