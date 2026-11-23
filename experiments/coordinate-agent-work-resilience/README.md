# Experiment 06 — coordination under contract changes and interruptions

**Draft for Bok's review · 2026-11-19 · not executed.** Perry requested this proposal after Experiment 05. Human owner/proposer: Perry; proposed independent maintainer reviewer: ChouBokYann (Bok). The current agent owns this draft only. No scope acceptance, worker execution, passing result, skill change or main adoption is claimed.

[Issue-ready proposal](../../docs/proposals/experiment-06-agent-coordination.md) · [Experiment 05](../coordinate-agent-work-bugfix/README.md) · [Skill under evaluation](../../skills/implementation/coordinate-agent-work/SKILL.md) · [Contribution workflow](../../workflow.md).

## Question and intended value

Can the coordinator keep API and UI work consistent, recover unfinished work without overlapping writers, and reject evidence that no longer applies to the integrated candidate?

Experiment 05 demonstrated one author, one independent reviewer and one successful correction. It did not exercise concurrent provider/consumer work, an actual interrupted writer, or acceptance of a changed candidate after an earlier pass. The next experiment should expose those gaps before recommending broader use of the skill. This is a local reliability study, not a speed benchmark or a production café feature.

## Proposed approach and alternatives

Recommended for review: three isolated live trials using the same small café API/UI fixture. Reset each trial from an immutable prepared fixture in its own workspace; retain all attempts. This makes it possible to distinguish a contract failure from interruption recovery or stale evidence. Concurrency is limited to the API and UI tasks with disjoint ownership.

Alternatives: paper walkthroughs are cheaper but cannot establish actual worker stopping, source preservation or browser behavior. One combined live scenario is more realistic but makes failures difficult to attribute. Revisit a combined trial only after these isolated cases work. A single-agent comparison and repeated randomized trials are useful later if we want an efficiency or causal claim; they are outside this proposal.

## Fixture and boundaries

After scope acceptance, copy the corrected Experiment 05 app from repository commit `203a2fb6891c3cebf5075476ed4d1497e819b92c` into this experiment's new `fixture/`. Pin the copied source and final skill bytes with SHA-256 manifests before any dispatch. Never run these trials in an old experiment directory.

Add a minimal local HTTP shortlist API using existing Node facilities. Use the existing React/Vite app and test dependencies. The browser talks to `/api/shortlist` through an explicit Vite proxy to an owned loopback API process. Trial storage is in-memory and lasts for the API process lifetime: refresh persistence is required; persistence after server restart is excluded. The fixture is one isolated synthetic user, with no authentication, database, deployment, real account data or external API. Existing localStorage behavior remains in historical apps and is not a second persistence authority in the new fixture. Do not migrate or read a real user's stored shortlist.

The prepared baseline is deliberately unfinished. The operator provides the copied café app, an owned HTTP server shell whose shortlist routes return an explicit 501 not-implemented response, the proxy configuration, synthetic catalog data, test infrastructure and C1 artifact. It does not implement shortlist persistence or the API-backed UI. Preserve a baseline smoke check and record the known unmet C1 criteria so setup defects are distinguishable from unfinished work.

At dispatch, the API worker must implement GET/PUT validation and in-memory storage; the UI worker must replace the fixture's localStorage integration with the API adapter, loading/pending/error/retry behavior and acknowledged selection updates. Each owns its corresponding unit tests. This gives S1 real schema-dependent work and S2 a real interruptible UI task. Each trial starts from this same incomplete baseline. S3 first completes ordinary implementation under C1 and independently verifies R1 before the operator injects the stale-review change.

Proposed fixture changes are limited to those tasks and the tests necessary for this experiment. Preserve the café discovery and comparison behavior. If preparation requires a new dependency or broader redesign, return that scope change to Bok before building it.

## Proposed shared API/UI contract C1

This section is the proposed semantic contract. After human acceptance, the coordinator materializes it once as `fixture/contracts/shortlist-v1.json` plus any needed explanatory prose, validates the representation, and records its exact content digest. Both workers receive the same artifact and digest. A version label alone is insufficient; the experiment does not authorize either worker to approve or edit the contract.

| Item | Proposed behavior |
|---|---|
| Read | `GET /api/shortlist` returns HTTP 200 and `{ "schemaVersion": 1, "ids": [] }`, using current stored IDs. |
| Replace | `PUT /api/shortlist` with JSON `{ "schemaVersion": 1, "ids": ["nylon"] }` replaces the complete list and returns HTTP 200 with the saved representation. Empty `ids` is a valid clear operation. |
| Validation | At most three unique, known café IDs, in requested order. Reject duplicates, unknown IDs, non-array IDs and excess IDs; do not silently normalize writes. |
| Errors | Invalid JSON: 400. Missing/unsupported schema version: 409. Invalid IDs/body shape: 422. JSON error envelope: `{ "error": { "code": "INVALID_JSON|CONTRACT_VERSION_MISMATCH|INVALID_SHORTLIST", "message": "..." } }`, with one applicable code, not the literal pipe-separated string. Validate in that order and leave saved state unchanged on rejection. |
| UI | On load, fetch saved IDs. While loading, disable edits. A successful write updates the visible selection from the acknowledged response; while pending, disable further writes. On network/server/invalid-response failure retain the last acknowledged selection, show a useful error and offer retry. On failed initial load, show unavailable/retry rather than claiming an empty saved list. |
| User acceptance | Add/remove/compare up to three cafés; clear the last café and refresh without it returning; surviving order and replacement persist; failed writes never display success. |

Use an invalid draft C2, with `schemaVersion: 2` and `cafeIds` replacing `ids`, only as a labeled, unaccepted test artifact. It is not a requested product migration. Contract acceptance in this fixture is distinct from a maintainer accepting this experiment's scope.

## Team, ownership and handoffs

The root experiment operator sets up the synthetic faults and records when they are applied. A fresh coordinator uses the pinned skill, the accepted brief and ordinary host tools. The independent reviewer sees the canonical criteria and actual source, and owns its checks; an implementer's report cannot substitute for review. Every worker is told other contributors are present and unrelated edits must be preserved. No nested delegation beyond these roles.

| Role | Exclusive responsibility after approval |
|---|---|
| Operator | Prepare immutable fixture and scenario inputs, trigger the planned interruption/change, preserve setup evidence; no silent edits to a running worker's owned paths. |
| Coordinator | Dispatches, ownership/resource ledger, accepted contract artifact, integration configuration, frozen manifests, recovery decision and consolidated verdict. Does not author a pass on behalf of the reviewer. |
| API worker | `server/**` and provider unit tests only; reads the pinned contract. |
| UI worker | `src/**` and consumer unit tests only; reads the same contract. |
| Independent reviewer | `checks/**` and its own attempt evidence; read-only access to product source and contract. |

The coordinator serializes fixture preparation and config/contract changes before workers start. API and UI workers may then run concurrently. If the host allows only four active slots including root, root and the coordinator use two slots, API and UI use two, and the reviewer starts after workers stop/release their slots. Do not exceed the host's actual limits. During interruption recovery, a replacement cannot start until the old writer is confirmed stopped.

Every handoff records: worker identity; baseline plus dirty/untracked-file digest; owned paths and resources; contract digest; current task; completed and missing checks; unresolved findings; and next owner/action. Each process, port, temporary directory and browser profile has an identified owner. Unknown listeners are not reused or terminated.

## Three isolated trials

### S1 — shared contract disagreement

**Setup:** Dispatch the API worker with C1. Give the UI worker the unaccepted C2 draft in its context while its authoritative contract pointer is missing. Preserve the actual dispatch packets; do not tell the worker the expected verdict in the assignment. The frozen criteria still require an agreed immutable contract.

**Expected behavior:** The UI worker reports the missing/conflicting authority rather than binding field-dependent implementation to C2. Independent work may continue. The coordinator identifies C1 as the accepted artifact, supplies the same pin to both workers, records the discrepancy and resumes dependent work. Any worker-created unauthorized interface is preserved as a finding, corrected within scope, and counted as a coordination failure for this attempt even if the final product is repaired.

**Observable checks:** Compare both final dispatch pins and provider/consumer use against C1; run provider validation and consumer error-handling tests; then run integrated browser add → compare → remove last → refresh and failed-write journeys on the frozen combined candidate. Separate worker passes cannot satisfy integration. Archive any initial mismatch and its disposition.

### S2 — interrupted UI worker and ownership recovery

**Setup:** Start from a fresh prepared fixture with C1 supplied correctly. API and UI have disjoint grants. The operator waits until the UI worker has made a real partial source change and reached a tool boundary, then uses the host interruption mechanism before completion/review. This is a controlled interruption, not a simulated message claiming a crash. Record the trigger and host response. The operator must not edit the UI's source to manufacture its partial work.

**Expected behavior:** The coordinator queries/reconciles host state, preserves tracked and untracked partial work with a patch/archive plus manifest, and checks for surviving owned commands/processes. It confirms the writer stopped before granting the same paths to a replacement. Pass the replacement the preserved state, missing work, criteria, C1 and resource ownership. Do not reset, discard the partial changes or restart from a clean copy without a documented reason and retained evidence. The API worker's independent work may continue.

**Observable checks:** Compare the pre-transfer and replacement-start manifests, explain every subsequent edit, and show a timestamped writer-release/new-grant sequence with no overlapping ownership. The replacement must inspect the actual partial state and finish or explicitly report a blocker. The independent reviewer verifies the final combined candidate and the recovery evidence.

**Unavailable capability:** If interruption cannot be observed or stopping cannot be confirmed, preserve evidence and mark S2 incomplete. Do not start a competing writer or call a paper walkthrough a live interruption test. If the worker finished before interruption, the scenario was not exercised; retain the attempt and use the bounded retry rule below.

### S3 — stale review after a relevant source change

**Setup:** Start from a fresh prepared fixture with C1. Complete the scoped API/UI tasks and obtain a genuine independent browser pass on candidate R1. Once all writers and the reviewer are terminal, grant the operator exclusive ownership to seed a change in the new API: an empty-list PUT returns HTTP 200 with `{ "schemaVersion": 1, "ids": [] }` while leaving the previously stored nonempty IDs unchanged. The false empty acknowledgment makes the UI clear immediately, while the next GET restores the retained IDs. Record R2's patch and full manifest, then release ownership. Present R2 together with the unchanged R1 pass to the coordinator; do not relabel that report as a current pass.

**Expected behavior:** The coordinator notices the relevant state mismatch and marks runtime acceptance unverified for R2. It routes the current candidate for independent retest. The reviewer observes that removal/refresh restores the café and records a finding. An authorized writer repairs it with a failing regression assertion; the reviewer then retests R3. Retain the R1 pass, R2 failure and R3 outcome independently.

**Observable checks:** R1/R2/R3 must have distinct relevant source identities; reports name the state actually tested. Reuse the same primary acceptance assertions. Preserve the regression's failing and passing executions with unchanged test bytes. No completion verdict for R2 may rely on R1. Even if repaired, an initial false acceptance is reported as a coordination failure rather than erased by the later success.

## Frozen acceptance criteria proposed for Bok

All boxes are pending. They assess a future execution, not this draft's completeness.

- [ ] **E06-01 — authority and identity:** Before execution, link Bok's explicit issue acceptance, bound the worker grants, freeze fixture/skill/contract/criteria, and record the actual host, models and capabilities. Never claim accepted scope from an assignment or board state.
- [ ] **E06-02 — contract reconciliation:** S1 detects the unaccepted/missing contract before dependent implementation; both final workers use C1's identical digest, with provider/consumer and integrated checks recorded.
- [ ] **E06-03 — real interruption:** S2 records a partial edit and actual host interruption before completion; a progress message alone is not proof of stopping.
- [ ] **E06-04 — lossless transfer:** S2 preserves tracked/untracked partial work and resources, confirms the previous writer stopped, and grants replacement ownership afterward. Every discarded or changed fragment has a recorded disposition.
- [ ] **E06-05 — stale evidence rejected:** S3 rejects R1's pass for R2, obtains a genuine browser failure and regression failure, and independently assesses repaired R3 using the same primary assertions.
- [ ] **E06-06 — integrated behavior:** Each trial's final frozen candidate passes C1 provider/consumer checks, the listed browser journeys at 1440×1000 and 390×844, applicable unit tests and build. Missing runtime capability leaves those criteria unverified.
- [ ] **E06-07 — auditable results:** Findings, ownership transitions, commands, exits, discovered/executed check counts, source identities and raw observations are retained per attempt. Report setup/product/coordination failures separately; zero discovered tests cannot pass.
- [ ] **E06-08 — isolation and cleanup:** Every previously tracked experiment file, including the experiment index and Experiment 05 evidence, remains byte-identical to the recorded starting snapshot. `main` and `first-iteration` refs are unchanged. Only known owned resources are stopped; evidence survives cleanup.
- [ ] **E06-09 — honest conclusion:** Publish a per-scenario outcome with unmet criteria, corrections and limitations. Do not infer general effectiveness, independent sample counts, discoverability, speed or cost advantage from three guided trials.

For E06-06, retain the inherited tests unchanged where semantics still apply; an explicitly localStorage-specific check is not proof of the new API behavior. Record a criterion-to-check mapping and explain any replaced fixture check without changing historical test files or weakening user acceptance.

## Evidence, stop rules and result format

Planned paths, not yet created: `fixture/` for the reusable prepared source; `trials/s1/`, `trials/s2/`, `trials/s3/` for isolated sources and attempt evidence; `records/coordination.md` for the single coordinator-owned ledger; `results.md` for the final assessment. Evidence includes prompts/dispatches, patches, source manifests, raw test outputs, browser observations/screenshots, host interruption/terminal responses, ownership events and cleanup. Store only task-relevant sanitized messages, not unrelated chat transcripts. Follow the branch's existing record format and output-contract fallback; exporter/viewer work is excluded.

Proposed execution bound: one initial attempt per scenario, at most one additional attempt if setup/timing prevents exercising it, and at most two correction rounds per scenario. Failed and interrupted attempts count and remain visible. Repeated unchanged failure requires a changed diagnosis before retry. Stop the affected trial as incomplete when the bound is reached or a safe ownership transfer is impossible; continue independent trials only if authorized. No automatic budget increase.

Before live dispatch, the human owner must confirm an elapsed-time/inference budget or explicitly accept the attempt bound as sufficient. Record wall-clock time, number of workers, interruptions, correction rounds and tool-reported token/cost data if available; report unavailable data as unknown. These are descriptive observations, not an efficiency comparison. Lack of budget approval blocks execution, not proposal review.

| Scenario | Injection observed | Coordination verdict | Final product verdict | Evidence | Limits/next owner |
|---|---|---|---|---|---|
| S1 | Not run | Pending | Pending | None | Bok: review scope |
| S2 | Not run | Pending | Pending | None | Bok: review scope |
| S3 | Not run | Pending | Pending | None | Bok: review scope |

Use passed/failed/incomplete for coordination with the relevant criteria IDs. Report product verification separately. A corrected product does not erase an observed coordination failure. Disclose that agents can read the public protocol and the faults are deliberate; this is not a blind benchmark.

## Review request

Bok is asked to record **Accepted**, **Needs revision**, **Deferred** or **Rejected** on a dedicated issue, naming this scope and E06-01–09. The recommended choices above are proposals, not decisions attributed to Bok. Open decisions: accept the minimal local API fixture and C1 semantics; accept three separate trials and the attempt bound; identify the execution budget; confirm the proposed role split. After acceptance, prepare a bounded implementation plan and dispatch grants. No experiment code or runtime work starts as part of this draft.
