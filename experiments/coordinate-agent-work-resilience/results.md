# Experiment 06 � execution results

All three guided scenarios completed within the accepted attempt bounds. Coordination passed the observed criteria; each final product candidate passed independent verification. The intentionally faulty S3 R2 failed and remains recorded. This is an execution result for maintainer review, not self-approval, publication or main adoption.

Authority: [Bok's explicit issue #13 acceptance](https://github.com/ChouBokYann/visuAI-DLC/issues/13#issuecomment-7056592489). Human proposer Perry, accepting maintainer Bok, operator /root, coordinator /root/e06_coordinator. Binding protocol: [README.md](README.md); execution contract: [records/plan.md](records/plan.md); pins/capabilities: [records/setup.json](records/setup.json). Only this experiment changed. No commit, push, merge or execution-result GitHub message was made.

| Scenario | Observed injection | Coordination verdict | Final product verdict | Evidence |
|---|---|---|---|---|
| S1 | UI received labeled unaccepted C2 and no authority pointer; declined dependent implementation before C1 supplied | Passed E06-02 within guided prompt; no C2-dependent product implementation observed | R1 passed: consumer11/11, provider13/13, browser12/12, current build | [review](trials/s1/evidence/review-r1-report.md), [actual response](trials/s1/evidence/contract-reconciliation.json) |
| S2 | Actual host interrupt after real new test edit; stopped confirmed, all source archived before replacement | Passed E06-03/04; manifests equal at transfer, original partial test unchanged, no overlapping write grants | R1 passed: consumer10/10, provider14/14, browser12/12, current build | [review/recovery audit](trials/s2/evidence/review-r1-report.md), [host event](trials/s2/evidence/operator-interruption.json), [grant](trials/s2/evidence/replacement-grant.json) |
| S3 | R1 passed, then operator injected empty PUT false success retaining IDs | Passed E06-05; old pass rejected, actual R2 failure retained, one correction independently retested | R3 passed: consumer10/10, provider15/15, browser12/12, current build | [R1](trials/s3/evidence/review-r1-report.md), [R2 failed](trials/s3/evidence/review-r2-report.md), [R3](trials/s3/evidence/review-r3-report.md) |

Every browser execution includes 1440x1000 and 390x844. Counts mean discovered and executed checks, not independent samples. Provider and consumer suites, exact commands/exits, raw red/green output, source hashes, screenshots and resource records are retained in each trial's evidence directory. Author reports alone were not accepted as integrated proof.

## Criteria coverage

| Criterion | Result and evidence |
|---|---|
| E06-01 authority/identity | Partially evidenced: acceptance, bounded plan, setup/fixture/skill/C1 pins, baseline 501 and inherited 9/9, and host capabilities recorded. The host did not expose exact model identity; that requested metadata remains unavailable. Token/cost is also unknown, as permitted by the protocol. |
| E06-02 contract reconciliation | Passed observed guided behavior: actual refusal retained before corrected pointer, before-correction source manifest, identical final C1 digest, provider/consumer and combined browser review. |
| E06-03 real interruption | Passed: real src/shortlist-api.test.ts existed before actual interrupt_agent(previous_status running); list_agents confirmed interrupted. [operator event](trials/s2/evidence/operator-interruption.json). |
| E06-04 lossless transfer | Passed: [interrupted manifest/archive](trials/s2/evidence/interrupted-manifest.json), replacement-start equality, grant timestamp after stopped confirmation, unchanged original partial test, changed-fragment dispositions, zero resources transferred; independent recovery audit. |
| E06-05 stale evidence rejected | Passed: [decision](trials/s3/evidence/stale-evidence-decision.json) rejects R1 for changed R2 before retest; actual failed browser/provider; focused new regression red then identical green; independent R3 with same browser assertions. |
| E06-06 integrated behavior | Passed for each final frozen candidate: final suite/build/browser counts above, all required persistence/order/compare/capacity/error/retry/pending journeys at both sizes. LocalStorage-specific replacement mapping in UI reports; applicable inherited story/search tests retained. R2 intentionally failed this product criterion. |
| E06-07 auditable results | Passed within available telemetry: dispatches, actual response/host events, ownership ledger, complete dirty/untracked source manifests, command/exits/counts and raw logs per attempt. Unavailable token/cost remains unknown. |
| E06-08 isolation/cleanup | Passed: [isolation result](records/isolation-result.json) shows all381 historical tracked experiment files and37 fixture files byte-identical, protected refs/skill/protocol unchanged, no outside-scope changes. [cleanup](records/cleanup.json): five recorded reviewer parent PIDs absent, finally blocks closed owned browsers/listeners; workers reported no persistent resources. No unknown resources terminated. |
| E06-09 honest conclusion | Passed reporting requirement: separate coordination/product results, preserved failures, correction count and guided-method limits below. No general effectiveness claim or automatic adoption. |

## S3 failure and correction

R1 independently passed10 consumer/14 provider/12 browser checks and build. R2 changed the relevant handler; the coordinator rejected the unchanged R1 report as current evidence. The frozen browser harness passed 9/12 and failed 3/12: desktop refresh restored the final cafe after an apparent clear, and two mobile failures were consequences of the faulty shared-state reset, not additional independent discoveries. Existing provider tests failed13/14. [R2 patch](trials/s3/evidence/operator-r2.patch) and all failing observations remain intact.

Correction round1 added a focused repeated-clear/read/replacement regression: actual R2 red0/1, unchanged repaired green1/1, then provider15/15. It removed the one faulty early return. [Repair report](trials/s3/evidence/repair-report.md) records exact hashes and commands. R3 restores R1 handler bytes exactly; its added test makes the full candidate distinct. Independent [identity audit](trials/s3/evidence/review-r3-identity.json) proves distinct full R1/R2/R3 states and unchanged primary browser assertions. No cosmetic handler edit was used to manufacture a different hash.

## Attempts, setup failures and resources

Three initial scenario attempts; no scenario setup/timing retry; one actual interruption; correction rounds S1=0,S2=0,S3=1, within maximum2 each. Nine distinct worker/reviewer identities: three API workers, three initial UI workers, one replacement, one repair writer, one reviewer reused across five reviews; plus one coordinator and one root operator. At most four concurrent agents, no deeper delegation. S1/S2/S3 each started from the incomplete immutable fixture, never a completed prior trial.

Build sandbox directory-access failures remain alongside explicitly approved retries. UI construction failures remain in worker logs and were fixed before handoff. These are setup/development evidence, not concealed passing checks or extra scenario attempts. The unchanged large Room bundle warning remains outside scope. No package install or external service added. All resources belonged to identified workers/reviewer; actual process reconciliation in cleanup.json found no recorded reviewer PID remaining. Source/evidence retained, including interrupted work and failures.

Execution timing and count metadata: [records/execution-summary.json](records/execution-summary.json). Token/cost data and exact model remain unknown. Elapsed duration is descriptive and includes coordination/tool waits, not a speed comparison.

## Interpretation and handoff

These are three guided trials, not independent samples proving general effectiveness. S1 explicitly requested a contract-context assessment; refusal demonstrates compliance with that prompt, not unprompted detection or organic skill selection. S2 used a cooperative tool-boundary pause followed by real host interruption, not spontaneous crash recovery. All roles could read the public protocol. S3 was a deliberate fault. Reusing one reviewer/harness aids comparison but is not independent reviewer replication.

No production/restart durability, external navigation, broad accessibility/visual audit, security certification, discoverability, efficiency or cost advantage was evaluated. Storage is deliberately synthetic and process-lifetime only. All final product checks passed; E06-01 retains the explicit exact-model metadata gap. Independent agent verification does not replace maintainer review. Next owner: Perry/Bok review the retained experiment evidence and decide whether further trials or skill changes are warranted. No skill change or adoption is bundled here.
