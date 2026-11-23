# Independent Experiment 07 assessment

Reviewer /root/e07_reviewer owns checks/** and review evidence only. No product, target, release configuration, source or executor records were edited. No server was started/restarted by the primary checks, and no backend reset/reseed occurred. Only owned Chrome contexts/browsers were opened and closed. Main target ownership was returned after every phase. This review accepts observed local runtime behavior, not human adoption or ordinary maintainer approval.

| Phase | Actual installed release / operation | Primary exit / result | Backend before and after |
|---|---|---|---|
| A | A / e07-install-a | 0, 7/7 pass | exact nylon,mill |
| B | B / e07-install-b | 1, 4/7 pass; release failed | exact nylon,mill |
| recovered-A | original A / e07-recover-a | 0, 7/7 pass; recovery verified | exact nylon,mill |
| C | C / e07-install-c | 0, 7/7 pass; corrected release verified | exact nylon,mill |

All four runs used checks/review-phase.mjs SHA-256 `7516cb983de83d1dd424e40f4a0d4a50c39275d1ee211603f6b0c80abfa5f753`, unchanged assertions expecting correct behavior even on B. Per-phase result.json preserves timestamps, assertion stacks, exact identity, independent disk hashes, every served dist asset hash (index, JS, CSS, models and notices), HTTP observations, browser body text and API events. Screenshots preserve initial/added/final states where those steps were reached. A, recovered-A and C completed load, exact shortlist comparison, Apartment Coffee addition, refresh persistence, removal and refresh at 1440x1000 and 390x844. State was restored through UI removal, never reseeded.

Every phase verified PID39932 alive and unchanged run record `92e22675-7232-416e-96b2-ebcd705dd563`. Direct backend GET200 returned exactly schemaVersion1 with IDs nylon,mill before/after; intermediate added states are retained. Independently obtained listener evidence identifies loopback ports56414 and56415 as PID39932. The first unprivileged Get-NetTCPConnection read returned Access denied; the explicitly escalated read succeeded. Browser launches succeeded without a setup retry.

B's installed bytes and process-health200 passed, but its target API404 failed the frozen expected200 assertion. Both rendered browser bodies and inspected screenshots show “Shortlist service unavailable. Saved shortlist unavailable.” and Retry shortlist, with browser API404. This is decisive user-visible failure while direct backend remained good. Both browser journeys stopped at page.goto's networkidle timeout before shortlist interaction. That timeout is a harness/navigation limitation with undetermined timing cause, not itself proof of the routing fault or a completed add/remove check. No retry rewrote those failures. Recovery followed promptly after evidence handoff.

Inspection of helper/config/API code supports the executor's diagnosis: B forwards /api/shortlist to /api/shortlists; backend accepts only singular /api/shortlist. A/B/C built assets are identical. Direct intended backend200 alongside B proxy404 contradicts backend outage in the observed window. Restored A is mitigation evidence, separately from C correction.

Independent review-integrity.json checks49 hashes covering frozen helper/runbook/plan, fixture source and selected skills. Source manifest digest matches `785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3`; source is a copied local uncommitted E06 R3 artifact, not identified solely by branch HEAD. All ABC dist hashes match. Helper code review found no defect invalidating this serialized trial. /__release is a pointer claim, so this review independently compared disk/served bytes; pointer/log crash atomicity is outside this bounded scenario.

review-regression.json independently matches actual records/routing-regression.mjs hash `2a3611da16cc023f6908ab2efafa9d8b14c62c4b4013a67338c9b493d4822328` against retained executor red and green records. The assertion uses HTTP through an isolated real target against the still-live backend: B404 red0/1 before C packaging, C200 green1/1, both ephemeral listeners closed. This is inspected executor regression evidence; independent installed-C browser/API evidence is the separate primary run. Root author tests/build are retained and tied by exact source/helper hashes; reviewer did not relabel them as independently rerun tests.

## Acceptance status and limits

- E07-01: local exception/limits recorded in records/plan.md and setup.json; exact model/token/cost telemetry unavailable. No Perry acceptance is claimed.
- E07-02: independently verified ABC installed identities, actual manifest bytes, all served dist bytes and operation records; recovered A uses original digest.
- E07-03: supported with explicit limitation: same primary API assertion fails B, rendered UI unavailable at both sizes; browser navigation timeout prevents completing B's later journey steps. Health alone never passed B.
- E07-04: independently verified exact A recovery, both complete journeys and original state on stable backend/run.
- E07-05: supported routing diagnosis from config/code/direct-backend/proxy observations, not release timing alone.
- E07-06: installed C passes frozen primary suite at both sizes; unchanged focused regression red/green inspected. Source/helper hashes tie existing relevant author tests/build to unchanged code.
- E07-07: independent live review and retained raw failures complete within stated ownership; no acceptance retuning.
- E07-08: reviewer browser cleanup complete; root must finalize owned main listener cleanup and prior-source/ref preservation evidence. This report does not preclaim those later actions.
- E07-09: evidence supports separating submitted/installed/healthy/behaviorally verified releases, preserving recovery separately from fix, and checking configuration as release identity. Root synthesis should connect these observations to pinned practices without causal superiority claims.

The B unavailable notice overlaps the brand/header/navigation in both inspected screenshots, most prominently on mobile. The error is visible but this is a real error-state layout limitation; no unrelated UI fix was added to this route-configuration trial. A normal mobile shortlist screenshot was inspected and displays both saved cards and controls.

This is one guided known-fault synthetic cycle on one local Windows/Chrome host, not organic fault discovery, production readiness, cloud deployment assurance, a controlled comparison of upstream skills or all-six-lifecycle coverage. In-memory state continuity does not establish persistence across restart. No durable database, concurrent switches, crash/lost-ack handling, external integrations, broad accessibility/security or real user data was tested. Browser external requests were blocked and no external links clicked. Exact model identity is unknown.

Skipped broader production checks and a rerun of already tied author unit/helper suites; main process cleanup/preservation remains root-owned. Risks: B error banner overlap and networkidle sensitivity are retained limitations, not silently corrected outcomes.
