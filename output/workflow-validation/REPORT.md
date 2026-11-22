# Engineering workflow validation ? 2026-11-22

Status: local validation complete, subject to the explicit evidence boundaries below. Human owner: ChouBokYann. Scope accepted with a local issue-first/other-maintainer waiver in [proposal](../proposals/workflow-validation-completion.md). This is technical validation and agent review, not independent maintainer adoption, publication or production certification.

## Outcome and changes

The requested feature, bug and project-aligned testing paths have executable evidence. The strongest guidance gap was tests-only work: it lacked an explicit entry route and a concrete way to establish test sensitivity when production already works. Updated only implement-increments and the two engineering routers. They now select independent expectations, exercise the relevant boundary, check correct behavior and a plausible fault, and avoid manufacturing product changes. Async assertions must observe the new operation. Existing diagnosis, requirements and verification guidance was sufficient; no extra skills, framework, dependency or visualization was added. Previously approved UI-direction work is preserved.

## Goal-to-evidence audit

| Requested outcome | Evidence and conclusion |
|---|---|
| Build a feature | Frozen F1?F5 in REQUIREMENTS.md; feature.test.mjs exercises real local HTTP and filesystem indexing. Baseline fails filename filtering; candidate passes normalized filename matching, empty/no matches, stable IDs, excluded-document chat/source access, no-evidence abstention without provider use, and unfiltered refresh. Source change is confined to existing listing logic. |
| Fix a bug | Frozen B1?B3; bug.test.ts plus the existing four test groups. Original passes, deliberately seeded empty-write early return fails reload-after-clear, minimal removal passes. The cause is skipped persistence, not parsing or UI state. The literal existing key and parser/limit/error handling are unchanged. This is a seeded exercise, not discovery of an unknown production defect. |
| Tests aligned with the project | Seven isolated faulty variants fail relevant assertions while correct controls pass. Independent expected filenames and persisted empty state come from the frozen criteria. Weak-check examples expose mirrored expectations, call-count-only mocks and old-ready-state assertions; their passing demonstrations are not product acceptance. |
| Avoid unnecessary generated work | Reused actual E11/E05 modules, installed Node/TSX, existing endpoint, storage interface and runner. No generic persistence layer, new dependency, new endpoint, invented production patch or unrelated cleanup. Fresh review found only the tests-only guidance gap warranted edits. |
| Handle difficult workflow situations | Before/after read-only walkthroughs cover ambiguity, contradictory tests, tests-only oracles, no-op work, unreproduced bugs, stale evidence, unavailable integration and overbuilding. Decisions recorded below. |
| Preserve evidence and integration | integration-audit.json verifies 31 original input files unchanged, frozen oracle hashes, 45 local links and exactly three intended canonical changes since the captured baseline. Historical pins are not silently promoted to current skills. |

## Observed checks

From repository root:

- `node output/workflow-validation/run-scenarios.mjs baseline` ? three expected outcomes verified: feature red, original bug module green, seeded bug red.
- `node output/workflow-validation/run-scenarios.mjs candidate` ? both candidates green; the bug run includes the existing tests.
- `node output/workflow-validation/fault-controls.mjs` ? seven faults detected: ignored filter, case handling, whitespace, content instead of filenames, filtered refresh, skipped empty write, false success after denied write.
- `node --test output/workflow-validation/weak-checks.test.mjs` ? three demonstrations of insufficient checks, not product passes.
- `python output/workflow-validation/audit.py` ? provenance, oracle freshness, changed-path and local-link assertions pass.

Raw outputs and exact oracle hashes are under evidence/. The initial whitespace-fault classifier expected F2, but the legitimate first failure was F1. Corrected classification and clarified the assertion label without changing expected behavior; preserved the initial log and earlier result JSON. Fresh reviewer identified missing F4 no-evidence coverage; added the HTTP assertion and reran baseline, candidates and all fault controls. Before-review result JSON remains available. No failing requirement was weakened to obtain green results.

Tests use real local HTTP and synthetic files, an injected mock answer provider, and an in-memory storage adapter. They do not establish live inference, browser persistence or external deployment behavior. Seven faults are chosen examples, not a mutation coverage claim.

## Pressure walkthrough and review

The baseline reviewer found existing guidance sufficient for most cases and identified the absent tests-only route/sensitivity procedure. A fresh reviewer inspected actual criteria, source, tests and logs after the edits. Decisions:

1. Ambiguous feature: identify the consequential missing requirement; continue independent inspection, hold dependent implementation.
2. Old alphabetical test versus accepted insertion order: use accepted intent and literal expected sequence; repair obsolete tests rather than preserve incorrect behavior.
3. Tests-only correct filtering: replace implementation-derived expectations, exercise real filtering, mock only external service, prove a relevant fault is detectable.
4. Feature already exists: demonstrate it and report a no-op; no artificial product edit.
5. Intermittent unreproduced bug: keep cause provisional and seek bounded discriminating evidence; deployment timing is not causation.
6. A live-tested artifact followed by UI-only B: compare actual affected boundaries, reuse unaffected evidence with provenance and check B changes; never relabel A as a fresh B live run.
7. Unavailable integration and unnecessary framework: disclose missing live evidence and next permitted action, continue useful local checks, reuse existing interfaces for the small repair.

Fresh review also directly confirmed the unchanged literal storage key. It found the missing F4 assertion described above and no canonical-guidance blocker. Agent review does not impersonate human acceptance.

## Historical evidence and current baseline

Current source baseline is root 4f170cf plus approved uncommitted UI direction; exact hashes are in evidence/source-baseline.json. Current library has 22 skills versus 25 at historical experiment pin c276159. Current-only: set-ui-direction. Historical-only: coordinate-agent-work, diagram-system, maintain-user-journeys and exercise-user-journey. Their experimental successes do not prove they exist in this checkout; no automatic adoption occurred.

Prior evidence remains bounded: E03/04 feature comparison was non-statistical; E05 demonstrated a passing suite missing a seeded persistence defect; E06 coordination/model-identity evidence was partial; E07 demonstrated local release/failure/recovery, not production deployment; E08 used real PostgreSQL but retained an inherited unrelated budget-test failure and late preservation-baseline limitations. E09 established limited OpenShell/Headroom compatibility, not universal tool compatibility. These results support scenario selection, not a blanket current-version green badge.

E11 releaseA had live provider and recovery checks. Its corrected candidate changed only server.mjs, public/app.js and public/index.html plus a test, removing misleading budget display plumbing. Direct server diff preserves chat/provider/source handling; audit hashes confirm acp.mjs, bridge-client.mjs and documents.mjs are identical. Prior live evidence is reusable for those unchanged boundaries with its original identity. Candidate-specific local tests cover changed behavior; no fresh live-provider or recovery run is claimed or needed for the present guidance validation. Its older browser refresh assertion only proved the action/basic state, not completion of a new refresh; do not cite that as full refresh evidence. This pass exercises the HTTP refresh contract, not browser completion. Original E11 setup/correction limits remain exhausted; no new inference or budget reset occurred.

## Optional capabilities and remaining limits

OpenShell can provide an execution boundary when needed; prior E11 still used a host ACP bridge/cloud inference and a browser with its inner sandbox disabled inside the outer OpenShell boundary. Impeccable/Taste UI can implement an agreed UI direction. Headroom needs a workload-specific benefit check; prior offline lossless trial showed no savings. None becomes a mandatory core dependency through this work.

This closes the accepted bounded workflow-validation scope, not every conceivable engineering scenario. Future real projects still need their own acceptance criteria, integration access and required deployment checks. No new live cloud, Supabase, browser-refresh-completion or production deployment claim is made. No commit, push, merge or external write was performed. Visualization remains deferred.

Final structural checks: git diff --check passed. Ledger lint passed with eight advisory warnings because seven semantic gates require human/agent inspection; four executable subgates provide runnable checks. These warnings are disclosed, not treated as automated proof of the semantic conclusions. Fresh reviewer subsequently confirmed the added F4 assertion and current raw passing output resolve its sole evidence gap.

## Publication follow-up

The user subsequently authorized committing and pushing this work to first-iteration on 2026-11-22. The local-only authority statements above describe the completed validation phase. This does not constitute adoption on main. Included fixtures and logs preserve the evidence; setup/audit helpers reference local historical worktrees and the scenario runner uses the existing locally installed TSX. A fresh checkout needs those prerequisites for full reproduction; archived results are not a claim of standalone CI readiness. Historical worktrees, runtime credentials and unrelated output are excluded from this publication.
