# Experiment 06 operator record

## Acceptance and preparation — 2026-11-21

Bok replied: "Accept and record on #13; use those attempt limits" to the explicit question covering C1, E06-01–09, three trials, one initial attempt each, one setup/timing retry, and two correction rounds per trial. Recorded at https://github.com/ChouBokYann/visuAI-DLC/issues/13#issuecomment-7056592489. No additional spend/time limit was specified. No main adoption or production action authorized.

Worktree: output/e06-worktree on experiments/06-coordination-resilience, based on c276159. Main and first-iteration retained. A local Git exclusion protects the nested worktree from accidental staging in the parent checkout. Source fixture copied from unchanged corrected Experiment 05 at 203a2fb; prepare.mjs checks that source directory has no diff through c276159. The plan is records/plan.md.

Environment: Windows; Node v22.15.0; Chrome installed; existing app dependencies reused through an experiment-local node_modules junction. The inherited package-lock SHA-256 matches the installed baseline's lock: 63B074154253B2E5337AB090D8555171D2322B964597524F085873A159B71C67. No package install performed. Google Fonts import removed only in the new fixture to remove that remote dependency.

Baseline: 9 inherited unit tests passed; explicit 501 server response asserted. Initial build failed because the sandbox blocked esbuild directory reads; retry through approved escalation passed (baseline-build-approved.log), with inherited large chunk warning. This is a preparation environment restriction, not a scenario coordination or product failure. baseline-exits.json deliberately retains the first run's exit 1.

Root spawned fresh coordinator /root/e06_coordinator with fork_turns=none. Coordinator received accepted protocol, pinned skill, plan, source and evidence pointers, ownership and attempt bounds; it may dispatch two disjoint workers then an independent reviewer within four active slots. No model override: inherited host configuration; exact model and token/cost telemetry unavailable. Coordinator owns records/coordination.md and trial integration; root owns this operator record and planned fault events only.

## Pending operator actions

- S2: observe genuine partial source and tool-boundary pause; interrupt actual UI agent, retain host response and state; release ownership only after stopped confirmation.
- S3: after R1 review and all writers stopped, inject exact protocol bug into server, retain patch and source identity, release ownership. Do not alter R1 review.
- Final: compare protected source hashes and refs, verify cleanup, retain evidence.

S2 actual interruption: root observed src/shortlist-api.test.ts (SHA256 43a31064cfccd89209de52be4be192768ceaa76cdae83c8d5a5dddf13f285ec4), then collaboration.interrupt_agent returned previous_status=running. Subsequent collaboration.list_agents confirmed s2_ui status=interrupted. No replacement had been granted. Raw host response transcribed in trials/s2/evidence/operator-interruption.json. Worker reported no owned processes; coordinator must preserve/reconcile source and resources before replacement. This is a controlled cooperative tool-boundary interruption, not an unannounced crash.

S3 R1 independent review passed unit10/provider14/browser12 and build. Coordinator granted exclusive server/api.mjs ownership after writer releases; root list_agents confirmed reviewer completed and UI released. Root asserted handler matched frozen R1 (SHA256 d701e9c20ff5f389de954e43fa6022331b4020f8928ff9247ff7d909197ee4e4), retained original, injected exactly one early return for empty PUT, and froze R2 (handler SHA256 d92e89c814820408f3d785574bd6a011cefca0bcee6ede13a757ec8e34cbbe0d). Original R1 report untouched. Mutation patch and timestamped event are in trials/s3/evidence/operator-r2.patch and operator-r2-event.json. Root releases handler ownership now; coordinator must assess R2 against unchanged R1 evidence and obtain current review.

Final operator review: S1/S2/R3 independent final reports and S3 stale-evidence/regression identities inspected. All final product checks passed. Results corrected to describe R2 as 9 passed and 3 failed browser groups, not 9 failures. E06-01 marked partially evidenced because exact host model identity is unavailable; no blanket claim that every acceptance detail is satisfied. Recorded reviewer PIDs absent and owned-browser cleanup reports retained. No commit/push/merge or result publication performed.
