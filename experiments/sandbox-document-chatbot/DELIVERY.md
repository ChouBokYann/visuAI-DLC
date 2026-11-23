# E11: sandbox workflow demonstrated, acceptance partial

## Latest: remaining validation passed, corrected candidate separate

User authorized one additional setup attempt/correction round with **zero model requests**. OpenShell ran with no ACP host process or capability token. Existing cached images and confinement were reused. See evidence/zero-inference/ for this run; older sections below retain their original version scope.

The new HTTP tests first ran against an unchanged copy of release A. Both missing source checks passed: editing a document yields404 for its previous source URL and exposes the new content; editing during an awaited mock response returns409 stale without the answer, then releases the busy state for the next request. The obsolete-counter assertion failed as expected. These are actual HTTP/server observations with **mocked inference**, not live-provider race tests.

The candidate removes the misleading turns/limit status fields, their obsolete server argument/caller and the visible counter text/element. Only server.mjs, public/app.js and public/index.html changed in product code; a regression test was added. Source edits and tests ran inside OpenShell as UID1000. Release A in artifacts/ is unchanged; corrected source is in candidate/ with its own manifest.

All **nine targeted candidate tests passed**. The browser check confirmed the counter absent, document readiness, keyboard submission with an explicitly synthetic mock answer, source expansion, no visible error and narrow-screen no-overflow. Desktop/narrow screenshots were inspected. Its Refresh assertion observes a click/basic ready state, not completion of a new refresh request; do not overstate that result. Prior releaseA's browser refresh add/delete evidence remains separately attributed.

Fresh read-only review found no material regression: chat/request/provider paths unchanged. It identified the refresh-assertion limit above. The corrected candidate has **not** been re-run against live inference or the A→fault→A recovery scenario. ReleaseA retains that earlier evidence; do not transfer it automatically to a different artifact.

Final checks: original release hashes unchanged, all28 candidate files match their manifest, persistent counter byte-for-byte unchanged at6/16, all15 pre-existing containers preserved, no trial containers/listeners/token remain. Evidence: evidence/zero-inference/{red.txt,green.txt,result.json,browser-result.json,candidate-manifest.json,final-verification.json,cleanup.json}. No downloads, commits or pushes.

This closes the specifically authorized remaining mocked-validation scope and removes the known counter defect in the candidate. It does not claim production readiness, full accessibility testing, arbitrary provider/browser compatibility or a newly live-verified release. Cumulative used setup/correction allowances:4/4 each; model turns remain6/16.

## Earlier live run (historical)

## Current result: third authorized setup retry

User explicitly approved one further setup attempt with the remaining correction round and unchanged 16-turn cap. The fresh restricted configuration snapshot passed actual ACP startup checks. OpenShell policy was unchanged. Chromium launched with no zygote/single-process flags; ChromeDriver additionally needed its own disable-dev-shm-usage switch. The browser's internal sandbox was disabled for this test; OpenShell remained the outer execution boundary. This is not a production browser configuration or proof of arbitrary browser compatibility.

**Observed:** model-directed source edits and tests, browser interactions, application requests and local release/recovery ran inside the OpenShell sandbox as UID 1000. The host retained orchestration, restricted ACP inference and authentication. This is a purpose-built sandbox controller using cloud inference, not the native Codex runtime executing inside OpenShell or an autonomous run of every lifecycle phase.

Two development turns produced bridge-client.mjs and the compatible ACP adapter. Turn 1's actions initially failed to write because docker-copied fixtures were root-owned. The confined user made a writable copy and applied the same saved model response without spending another turn. third-development-result.txt records write hashes and passing checks; the next turn received those results and confirmed completion. The controller validates action paths and fixed check names, **not the safety of generated JavaScript**; code imported by tests remains contained by OpenShell.

Four application turns answered the known Atlas question, acknowledged unresolved conflicting dates, rejected hostile document instructions and verified recovery. The no-evidence browser question invoked no extra model turn. All six retained ACP records show no attempted tool calls. That supports observed no-tool behavior, not a live tool-denial test.

### Current acceptance and evidence

| Criterion | Current result and evidence |
|---|---|
| E11-01 approval/baseline | Recorded approvals, limits and identity; third-final-verification.json distinguishes five separately approved UI-skill edits from unexpected changes (none). |
| E11-02 boundaries | Filesystem probes: non-root, workspace write, private synthetic sentinel denied, no socket. Node reached the bridge (401 without token); Python was denied to the same reachable endpoint, confirmed in supervisor logs. No host credential mounts. |
| E11-03 restricted bridge | Actual startup/config/thread checks in runtime-gate.jsonl; mocked HTTP negatives and budget tests pass. Hostile live input caused no tool attempt. Unexpected-process-exit/output-limit tests remain offline checks. |
| E11-04 model change | Turn 1 replay write events and hashes, then turn 2 completion; client tests pass inside sandbox. Generated files exported in artifacts/. |
| E11-05 handoffs | HANDOFF.md records reused requirements, technical/UI baseline, implementation and verification/release responsibilities. Host-coordinated earlier decisions are explicitly distinguished from sandbox execution. |
| E11-06 chatbot | Known/conflicting/hostile/no-evidence/fault observations pass. Retrieval edit/delete, traversal and stale checks have mixed coverage: API edited-source URL invalidation and in-flight stale-answer rejection were **not run in E11**, so this criterion is partial. |
| E11-07 browser | Keyboard Ctrl+Enter, source expansion, no-evidence response, refresh add/delete and narrow-screen overflow check passed. Desktop/narrow screenshots inspected; no full accessibility certification or complete keyboard audit. |
| E11-08 release | A served; provider-fault B returned 503; identical A restored and answered successfully. Manifest and exported artifact match across 27 files. Local deployment only. |
| E11-09 cleanup | third-cleanup.json and third-final-verification.json: no owned containers/listeners/host process/token; original 15 containers preserved; E09/E10 files unchanged. |

Authoritative current evidence: evidence/third-final-verification.json, evidence/sandbox/browser-release-result.json, evidence/third-development-result.txt, evidence/sandbox/development-complete.json, evidence/runtime-gate.jsonl, evidence/third-network-policy-log.txt. Nine sandbox test cases passed across client/documents, harness validation (including symlink rejection), and server/chunk tests. Older reports below are historical and do not override these observations.

### Remaining defect and limits

The screenshot exposes an inherited E10 display bug: the page says **0 of 12 turns**, while the actual E11 persistent bridge counter is **6 of 16** (development 2, QA 4). The host counter enforces the cap; the page counter must not be trusted. No remaining correction round was silently granted to fix it. Literal Markdown emphasis is shown as safe text, as in E10. Current result is therefore **partial acceptance**, not a clean product release.

Used allowances: setup retries 3/3, correction rounds 3/3, ACP turns 6/16. Unused model turns do not authorize another setup/correction attempt. No additional downloads for this continuation; retained image/source footprint remains bounded by the earlier package/image evidence. No commits or pushes. Next bounded scope should correct the counter and exercise API edited-source invalidation and in-flight stale answers, then recheck affected evidence; native Codex-in-sandbox and broader browser compatibility remain separate questions.

## Earlier continuation (historical)

## Latest continuation outcome

The user authorized one additional setup attempt and one additional correction round after the initial report below. Cumulative allowances are now two setup retries and three correction rounds; used counters are two and two respectively. The 16-turn cap is unchanged, with zero turns spent.

The corrected launcher created the OpenShell control plane and sandbox. Actual sandbox probes established UID 1000, no Docker socket, workspace writes allowed, and synthetic private-sentinel reads/writes denied. Node, Chromium and ChromeDriver binaries were present. An unlisted endpoint was unreachable, but no reachable control endpoint was tested; this alone is **not** proof of network-policy enforcement. See evidence/continuation-sandbox-probe.txt.

The host ACP gate rejected startup because the host Codex configuration hash changed since preparation. No attempt was made to weaken the guard or silently accept changed configuration. Evidence: evidence/host-preflight-error.txt. Model-directed development remains blocked; no controller or live application integration was delivered.

Chromium launch inside OpenShell failed with process/credential permission errors even with its own sandbox disabled for this nested-container smoke check. OpenShell confinement was not disabled. This is a failed browser-launch observation, not a successful browser journey. See evidence/continuation-browser-smoke.txt. OpenShell upload also failed destination inspection; the synthetic probe ran through the already-established exec transport instead.

Sandbox deletion completed; E11 gateway/CLI containers, control network and gateway volume were removed. No E11 sandbox/control containers or trial listeners remained. See evidence/continuation-cleanup.json. Before the separately authorized canonical UI-skill edits, final-verification.json confirmed all 12,180 baseline hashes unchanged and all 15 original containers preserved. The initial verification is retained separately. The later intentional UI-skill changes are outside E11's preserved snapshot.

E11 remains **partial and blocked**: sandbox filesystem observations are new evidence, while ACP integration, network control comparison, model-directed development, browser journey and release/recovery are unverified. A fresh configuration preflight and browser compatibility investigation are required before a further authorized runtime attempt. The remaining correction allowance does not silently extend the exhausted setup allowance.

## Initial attempt record (historical)

Date: 2026-11-22. Owner: ChouBokYann. Branch: experiments/11-sandbox-workflow at c276159. Local scope/waiver accepted in conversation ("go ahea"). No commits, pushes, GitHub publication or maintainer approval claimed.

## Outcome

The full sandbox engineering workflow was **not executed**. A Linux Node/Chromium image was built and the restricted host bridge was partially implemented/tested. OpenShell bootstrap failed before gateway initialization, host bridge startup or sandbox creation. No model turns were used. The controller, model-directed application change, sandbox browser journey and deployment/recovery remain unimplemented or unverified.

The original E10 application under app/ is a copied starting point. It is not an E11 implementation or release. Do not start it as evidence of sandbox compatibility.

## Attempts and failures

1. Initial image build used a local image ID in Dockerfile FROM; BuildKit interpreted it as a registry reference and failed. Evidence: evidence/workload-build-initial.txt.
2. The single setup retry used the local image tag after verifying its exact ID. The image build completed. Evidence: evidence/workload-build.txt, records/workload-image.txt and records/resolved-image.txt.
3. Continuing that setup attempt, checks/start-infrastructure.ps1 passed an unquoted comma-separated mount specification. PowerShell turned it into an array; Docker returned invalid reference format. Execution stopped at certificate-init container creation. Evidence: evidence/infrastructure-start.txt.
4. Corrected both mount argument strings offline. checks/launcher-arguments.ps1 reproduces the original array parsing and checks the quoted form without invoking Docker. Evidence: evidence/launcher-arguments.txt. The launcher was **not retried**. This consumes one correction round; it does not grant an extra setup attempt.
5. Read-only review identified unexpected adapter-exit handling that could allow replacement inference and unbounded runtime output. Offline correction round 2 now persists a termination block on unexpected exit/error and caps raw ACP stdout at 2 MiB per adapter lifetime before parsing. Tests were observed failing then passing: evidence/acp-limits-red.txt and evidence/acp-limits-green.txt. No runtime or model was started to test these fixes; actual process-tree behavior remains unverified.

Preparation also exposed a wrong relative baseline path and Windows Git identity restrictions; corrected the path and used the normal authorized host identity without changing global Git configuration. These occurred before runtime setup. The Windows symlink test failed with EPERM; its original failure remains in evidence/harness-green.txt (the filename is historical, not a pass claim). Linux symlink validation remains pending.

## Checks completed

- Two host-supported harness tests: development cannot consume the four reserved QA turns, total reservations never exceed sixteen; malformed/oversized/extra-field packets rejected. evidence/harness-host-supported.txt.
- One bridge HTTP test: missing authorization, wrong route, extra command field and oversized body rejected with no inference; valid synthetic request exercises a mock callback. evidence/host-tests.txt. This does not establish actual ACP startup or network confinement.
- Offline PowerShell argument regression: passes, no Docker invocation. evidence/launcher-arguments.txt.
- Two offline ACP regression tests: unexpected exit persists a block and prevents a replacement bridge starting; output overflow persists a block. The HTTP bridge regression also passes in the same run. evidence/acp-limits-green.txt.
- Build: Linux Node 20.19.2 Debian package and Chromium/driver 156.0.8078.79, resolved through recorded signed-distribution package metadata. Exact package URLs/versions/sizes: records/package-resolution.txt. No local model weights.

## Criteria

| Criterion | Result |
|---|---|
| E11-01 approval, baseline, ownership | Recorded; baseline verification in evidence/final-verification.json |
| E11-02 sandbox boundaries | Not run |
| E11-03 bridge/runtime restrictions | Mock HTTP negatives pass; actual ACP startup and host tool restrictions not verified in E11 |
| E11-04 model-directed sandbox change | Not run; controller not implemented |
| E11-05 skill handoffs | Host requirements/design/plan only; no sandbox skill walkthrough |
| E11-06 chatbot behavior | Not run in E11; E10 evidence is not substituted |
| E11-07 sandbox browser | Image built; browser not launched |
| E11-08 deployment/recovery | Not run |
| E11-09 cleanup and preservation | See final verification and owned-resource evidence; retained images/files below |

## Budget, retained resources and continuation

ACP turns: 0/16 (development 0/12). Setup retry: 1/1 used. Correction rounds: 2/2 used for offline launcher and reviewed ACP fixes. Trial stopped because setup allowance was exhausted, not because inference budget was exhausted.

Resolved package payload: 244,692,772 bytes. Package-index and protocol overhead were not measured precisely; no claim of exact total transferred bytes. Retained Docker image reported sizes: workload 386,749,057 bytes, resolver 59,887,138 bytes; these are Docker-reported sizes, not total physical disk including shared layers/build cache. Trial files approximately 4 MB. No broad Docker prune is authorized or performed.

Cleanup verification: all 12,180 baseline file hashes unchanged; all 15 original containers preserved with matching identities and states. Ownership-checked E11 package-resolution container, gateway volume and control network removed. No E11-labelled containers or listeners on ports 17689/17820 remained. Workload and resolver images retained. Evidence: evidence/final-verification.json and evidence/cleanup.json (explicit empty arrays and absence checks).

Future execution needs explicit additional setup/correction allowances; existing E11 request counters must carry forward. Before that execution, resolve any remaining material review findings and validate launcher arguments without live services. Do not reset limits, call the copied E10 app complete, or quietly run the remaining steps on the host.
