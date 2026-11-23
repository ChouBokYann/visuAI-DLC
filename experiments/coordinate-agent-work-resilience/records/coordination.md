# Coordination ledger

Acceptance: Bok, issue #13 comment 7056592489. Human proposer Perry; operator /root; coordinator /root/e06_coordinator. Full pinned protocol and limits in README.md and records/plan.md. Skill coordinate-agent-work applied. Ruflo discovery returned no tools; supported host collaboration API used.

S1 preparation: copied immutable incomplete fixture excluding dist/node_modules; baseline-manifest.json includes all source, dirty/untracked by filesystem enumeration. Coordinator owns configuration/contracts/evidence. API owns server/**; UI owns src/**. No worker may delegate or touch another owner's paths. Workers own only processes they start and must record/stop them. No runtime resources currently granted. Contract C1 SHA256 9d79794ba38d85eb3ffb40c9225330fd466e6be543e0029b1a1b3a8a36b82925.

2026-11-21T03:29:50.4543662Z S1 initial C2 context rejected by UI before schema-dependent implementation. Actual response and before-correction source manifest retained. Accepted C1 pin supplied afterward. API/UI active; no reviewer started. Fresh S2 and S3 incomplete baseline copies prepared independently from fixture.

2026-11-21T03:32:30.5331127Z S1 API terminal and UI explicit ownership release received. Provider 13/13, consumer 11/11 worker checks. Final r1-manifest.json frozen; reviewer must build latest text change and independently verify browser integration. Workers report no persistent resources.

2026-11-21T03:36:27.1398728Z S1 independent reviewer released; exact R1 unit11/provider13/browser12 and approved build passed. S2 fresh API/UI agents granted disjoint source paths, common C1 pin. UI instructed notify actual first partial edit then pause at tool boundary; root alone performs interruption.

2026-11-21T03:37:29.4270430Z S2 root host interrupt returned previous_status running, root and coordinator list_agents independently confirmed s2_ui interrupted. Root operator-interruption.json retained. Real new src/shortlist-api.test.ts SHA25643a31064cfccd89209de52be4be192768ceaa76cdae83c8d5a5dddf13f285ec4 archived with all source in interrupted-source; manifest records changed/untracked files. UI reports zero processes/resources; no command had started. API also terminal14/14. Replacement-start manifest frozen AFTER stopped confirmation; replacement grant follows. This is cooperative controlled interruption, not spontaneous crash.

2026-11-21T03:40:28.7751567Z S2 replacement explicitly released src after consumer10/10 and approved build. Original partial test unchanged; inherited red9/10 and expanded red6/10 retained. Frozen r1 manifest for independent review. No persistent resources reported.
## Coordinator commands

All commands below executed from output/e06-worktree via PowerShell/Node; exits 0, unless separately reported. No product tests claimed by these helper commands.
- node experiments/coordinate-agent-work-resilience/records/trials.mjs prepare s1 baseline
- node experiments/coordinate-agent-work-resilience/records/trials.mjs freeze s1 before-contract-correction
- node experiments/coordinate-agent-work-resilience/records/trials.mjs prepare s2 baseline
- node experiments/coordinate-agent-work-resilience/records/trials.mjs prepare s3 baseline
- node experiments/coordinate-agent-work-resilience/records/trials.mjs freeze s1 r1
- node experiments/coordinate-agent-work-resilience/records/preserve-interruption.mjs
- node experiments/coordinate-agent-work-resilience/records/trials.mjs freeze s2 replacement-start
- node experiments/coordinate-agent-work-resilience/records/trials.mjs freeze s2 r1

Helpers are minimal evidence utilities, not product code. Manifests enumerate actual filesystem source including dirty/untracked files; dist/node_modules/evidence/checks excluded from product identity. Reviewer owns checks separately; reviewer source captures include their own product identity. Preservation copied all enumerated source bytes into retained archive.

2026-11-21T03:42:44.0308421Z S2 independent review unit10/provider14/browser12/current approved build passed; transfer manifests equal, archive intact, original partial test unchanged, confirmed stop precedes grant. Reviewer released. S3 fresh API/UI workers granted disjoint paths common C1 pin, no source copied from completed trials.

2026-11-21T03:45:25.7372844Z S3 API terminal14/14 and UI explicit release10/10/current approved build. Coordinator freeze s3 r1 exit0; independent review requested. R1 evidence must precede exclusive operator fault; no fault yet.

2026-11-21T03:46:55.9808958Z S3 independent R1 passed unit10/provider14/browser12/current build; reviewer final and host list confirms completed. Both writers released/terminal, no resources. Grant root EXCLUSIVE server/api.mjs mutation for prescribed empty-success retaining-state fault. No writer/reviewer active during grant. Await root R2 manifest/patch and release before retest.

2026-11-21T03:47:47.7294475Z Root released R2 handler mutation. Current handler hash differs R1; coordinator rejected old pass for R2 (stale-evidence-decision.json). Runtime acceptance unverified; independent same-harness/browser and provider regression failure required before repair. No false R2 acceptance.

2026-11-21T03:49:27.7799951Z S3 R2 independent reviewer terminal: provider13/14, frozen browser9/12, actual desktop removal-refresh restores final cafe and mobile reset contamination observed. No R2 acceptance. Correction round1 grant /root/e06_coordinator/s3_repair server/** only; add focused regression, run red R2, minimal fix, identical test green. Preserve R1/R2 reports and frozen browser bytes. R3 identity differs via new regression; restored handler may match R1.

2026-11-21T03:50:29.6673065Z S3 correction1 writer released; new regression red R2 and identical green R3, full provider15/15. Freeze s3 r3 exit0. Handler restored R1 bytes, new regression gives distinct full R3 identity. Independent R3 final review next; no completion claimed yet.

2026-11-21T03:52:52.6890644Z S3 R3 independent final passed consumer10/provider15/browser12/current approved build; unchanged primary assertions, distinct full candidates, retained R2 red. All workers/reviewer released. Cleanup recorded five reviewer PIDs absent, no processes killed. Root isolation passed381 historical/37 fixture/ref pins. results.md and execution-summary.json complete; all planned tasks marked checked based on linked evidence. No publication/commit/push/merge.
