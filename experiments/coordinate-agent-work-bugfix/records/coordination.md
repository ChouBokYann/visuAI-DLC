---
workflow_context:
  version: 1
  project: coordinate-agent-work-bugfix
  records:
    - id: E05-REQ
      kind: requirement
      status: accepted
      title: Restore final-item removal and verify the coordination loop
      summary: The shortlist stays empty after reload and a separate reviewer retests the corrected candidate.
      acceptance: Apply all seven checks in the frozen experiment brief.
      revision: "candidate manifest sha256:ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674"
      detail: "#acceptance"
      gap: This artificial fixture assesses technical behavior and coordination in a local technical setting.
      sources:
        - id: brief
          ref: brief.md
      links: []
    - id: E05-CHANGE
      kind: change
      status: implemented
      title: Persist empty shortlist selections
      summary: The storage writer handles the empty selection through the existing persistence path.
      revision: "candidate manifest sha256:ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674"
      detail: "#repair"
      sources:
        - id: brief
          ref: brief.md
      links:
        - relation: implements
          target: E05-REQ
          basis: stated
          source: brief
          reason: Persisting an empty selection keeps the final removed café from returning on reload.
    - id: E05-EVIDENCE-SEED
      kind: evidence
      status: failed
      scope: technical
      title: Seeded last-item removal reproduces at both viewports
      summary: Storage retained Nylon after removal and the café reappeared on reload.
      method: Independent Playwright execution and storage read-back through the café app.
      context: Local headless Chrome at 1440 × 1000 and 390 × 844 on the frozen seed.
      limits: Artificial fixture and local Chromium viewport emulation.
      testedRevision: "seed manifest sha256:d664e533d7e3ac9929644e782af51d22cb5bae6832b19b1b41580284f20a24ec"
      detail: "#seed-finding"
      sources:
        - id: observation
          ref: "#seed-finding"
      links:
        - relation: evaluates
          target: E05-REQ
          basis: stated
          source: observation
          reason: The seed execution exercises the frozen persistence behavior before the repair.
    - id: E05-EVIDENCE-CANDIDATE
      kind: evidence
      status: passed
      scope: technical
      title: Frozen repair passes independent retest and integration
      summary: The empty reload, storage edge cases, unit tests, production build and inherited browser journeys pass.
      method: Independent Playwright retest, coordinator unit/build and inherited journey checks, manifest comparison and cleanup.
      context: Frozen corrected source served by an owned local Vite instance and exercised in private headless Chrome contexts.
      limits: Local synthetic fixture, one Chrome version and simulated storage exceptions.
      testedRevision: "candidate manifest sha256:ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674"
      detail: "#acceptance"
      sources:
        - id: observation
          ref: "#acceptance"
      links:
        - relation: evaluates
          target: E05-CHANGE
          basis: stated
          source: observation
          reason: The checks exercise the corrected behavior and integration on the same frozen source.
---

# Experiment05 coordination

Work ID E05. Perry owns the local trial. Root owns skill, navigation, proposal, probe and final-report files. The coordinator owns this ledger, dispatch briefs, integration evidence and the owned fixture server. The [frozen brief](brief.md) governs all seven criteria. The [local proposal](../../../docs/proposals/coordinate-agent-work.md) records the direct authorization and the pending shared review. [NORTHSTAR on main](../../../NORTHSTAR.md), [repository navigation](../../../README.md) and [contribution workflow](../../../workflow.md) informed the trial boundary.

## Starting state and allocation

Base branch `first-iteration-1.1` at `6f78181c528f0d4467934562d8619f8d5dc742de`. `main` was `aad433c661a10ce4556342bd4dba8b4bd8d6ef1e`. The new fixture is untracked alongside the root's other scoped changes. The [seed patch](../evidence/seed.patch) identifies the deliberate mutation. The [seed app manifest](../evidence/integration/seed-app.sha256) SHA-256 is `d664e533d7e3ac9929644e782af51d22cb5bae6832b19b1b41580284f20a24ec`. The [original logic run](../evidence/seed-unit-tests.log) passed 8/8 and did not exercise empty writes.

One repair writer and one separate reviewer are sufficient. The reviewer can obtain independent runtime evidence before and after the repair and authoring can remain sequential because the original failing state must be observed first. The acceptance criteria and port are shared resources owned by the coordinator. Each browser launch gets a private context and its launching agent owns cleanup.

| Role | Identity and owned output | Handoff status |
|---|---|---|
| Coordinator | `/root/coord_bugfix_run` · this ledger, dispatches and `evidence/integration/` | Verified integration and cleaned up |
| Reviewer | [E05-R dispatch](dispatch-review.md) · its Playwright harness and `evidence/reviewer/` | Released after seed and candidate review |
| Implementation | `app/src/shortlist.ts`, `app/src/shortlist.test.ts`, `evidence/author/` | Released after red and green checks |
| Human / root | Perry and `/root` · scope, shared decision and final report | Root verifies prior-file preservation |

From the new `app/`, port 5191 was unused before launch. The coordinator started `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5191 --strictPort` and identified PID 41831 from the new listener and matching command. HTTP served the Sidequest entry point and transformed shortlist module containing the seeded early return. [Seed server log](../evidence/integration/seed-vite.log). Environment macOS 26.5.2, Node v26.13.0, npm 11.20.0 and local Google Chrome 157.0.8103.79.

## Independent seed finding and repair assignment

`/root/coord_bugfix_run/reviewer` executed the initial [E05-R dispatch](dispatch-review.md). The [seed browser observations](../evidence/reviewer/seed-01/observations.json) recorded 16 checks with 10 failures, exit 1 and no setup failure. At both 1440×1000 and 390×844 the immediate UI emptied, but stored IDs remained `["nylon"]`. After reload the menu read `Shortlist (1/3)`, one Nylon Coffee card rendered and the empty-state heading and action were absent. Both browser contexts loaded the same transformed module, SHA-256 `98fc99051673e20e51af11f849e5464b082f1b23c6005832666ac14576cec261`. The product source and test hashes matched the seed before and after the run. The [browser log](../evidence/reviewer/seed-01-browser.log) records PID 42429 exiting and removing its private temporary directories. The coordinator confirmed all 32 seed manifest entries still matched, then stopped Vite PID 41831 and confirmed port 5191 was idle. [Seed instance ownership and cleanup](../evidence/integration/seed-vite-ownership.log).

<a id="seed-finding"></a>

**E05-R-01 · seed disposition, valid and pending fix.** In `App.tsx:11–12` the persisted state is read at initialization and written when selected IDs change. At `shortlist.ts:32–38` the seeded empty-array return skips storage and reports success. That explains the stale persisted ID in both observations and blocks criteria 1 and 3. The correction must persist an empty selection and retain failure signaling. The coordinator routes this finding to the single author in [E05-A](dispatch-author.md). The same reviewer will recheck it on the frozen candidate. The base evidence and failed checks remain visible.

The author `/root/coord_bugfix_run/author` received the two-file write assignment after the reviewer returned the preserved baseline. The shared browser/storage interface is pinned by the frozen brief, the app manifest, and the reviewer harness snapshot. This single repair writer consumes the existing app interface with the reviewer as a read-only client.

The coordinator started with the skill revision SHA-256 `10a44fb23b3cea2a009816300e6ceae1876111cec0d546b0b7ef26adfcc7b156`. During the run the root applied independent skill review, producing `145d2ce3da83f5b037ae78fa62405a9ff1f262e0678f2b8b116fc82ebce92117`. The one-line addition asks assignments to pin a shared contract artifact. This trial already pins the frozen brief and the relevant source, and the reviewer works as a read-only consumer. The [skill review](skill-review.md) records the revision and scope.

<a id="repair"></a>

## Author return and frozen candidate

The author independently reproduced both stale stored IDs and a false success on a rejected empty write. The focused command exited 1, with two relevant assertion failures and the production module still at the seed hash. The author removed the early return and ran the identical test bytes against the repaired module. Both focused checks and all nine full unit checks passed. [Author record](../evidence/author/repair.md) · [Red](../evidence/author/01-red-focused.log) · [Focused green](../evidence/author/02-green-focused.log) · [Full green](../evidence/author/03-green-full-unit.log).

The author explicitly returned ownership and reached terminal status. The coordinator compared all 32 manifest entries to the frozen seed and inspected the [actual patch](../evidence/integration/seed-to-candidate.patch). Only `src/shortlist.ts` and `src/shortlist.test.ts` differ. The module now serializes each selection through the existing storage write and exception handling, including the empty array. The new test saves Nylon, clears it, and reads the stored result. An additional assertion checks the false return on write rejection.

| Frozen identity | SHA-256 |
|---|---|
| [Candidate manifest](../evidence/integration/candidate-app.sha256) | `ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674` |
| `src/shortlist.ts` | `ca82340b226c0adae508034f43b1a94244dab2051d389d8a698c715b8c36143f` |
| `src/shortlist.test.ts` | `b421b75ad7ed6d7698855142ccfd51028a78a4856814bda14eecfc2117437d9a` |
| [Served transformed module](../evidence/integration/candidate-served-module.sha256) | `9c9312d3b5e8662059d30765736b88e847e9e70a16f5d4644489eeaf999cd8de` |

The coordinator started a new Vite PID 43256 on the confirmed idle port for the candidate. [Candidate server log](../evidence/integration/candidate-vite.log) · [Instance ownership](../evidence/integration/candidate-vite-ownership.log). The same independent reviewer received the [frozen candidate retest assignment](dispatch-review.md#corrected-candidate). Finding E05-R-01 remains pending independent retest.

## Independent retest and integration

**E05-R-01 · resolved.** The separate reviewer ran the unchanged 16 primary assertions plus 52 checks for the two-item/replacement path, blocked storage and malformed data. All 68 recorded checks across eight scenarios passed. At both sizes, the final removal wrote `[]`, the reopened count was zero, and the visible empty state offered the discovery action. The reviewer preserved its first harness version and checked that the primary expectations remained unchanged. The coordinator matched those original expectation labels and values to the raw corrected results and verified the candidate hash, manifest and served module. [Independent review](../evidence/reviewer/review.md) · [Candidate observations](../evidence/reviewer/candidate-01/observations.json) · [Harness delta](../evidence/reviewer/candidate-harness.diff).

The reviewer released the independent harness and report paths and reached terminal status. Its final harness SHA-256 is `33be2c0c3aa3ec6b2a63c0b3c77d8ed7349643e12a7b420037b438f5dce2ee1c`; the original snapshot remains at `bb9c9f1d9ebea8099bcac3688917109fd708cf5cfb31300f763df266d2af7e1a`.

The coordinator ran these additional commands against the frozen candidate from the new `app/`:

| Check | Outcome | Evidence |
|---|---|---|
| `npm test` | 9/9 including eight original test names, exit 0 | [Unit output](../evidence/integration/candidate-unit.log) |
| `npm run build -- --outDir <owned scratch>/build` | TypeScript and Vite production build, 39 modules, exit 0 | [Build output](../evidence/integration/candidate-build.log) |
| Existing `shortlist-browser-test.mjs` with `BASE_URL=http://127.0.0.1:5191`, local Chrome and private TMPDIR | 7/7 observed scenario results, zero uncaught page errors, exit 0 | [Observations and recipe scope](../evidence/integration/inherited-01/evidence/shortlist/observations.json) · [Invocation and cleanup](../evidence/integration/inherited-01/browser.log) |
| `shasum -a 256 -c ../evidence/integration/candidate-app.sha256` after cleanup | All 32 entries match, exit 0 | [Final manifest comparison](../evidence/integration/candidate-manifest-after.log) |

The inherited harness writes a fixed relative path. To keep those files with the current attempt and avoid altering the inherited script, the coordinator ran the unchanged file from the new app using a Node ESM launcher and switched only the output working directory before import. The value for `attempt_dir` is a new attempt-specific folder under this experiment's integration evidence.

```sh
BASE_URL=http://127.0.0.1:5191 \
  PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  DEBUG=pw:browser TMPDIR="$owned_browser_tmp" \
  node --input-type=module -e 'const harness = new URL("./shortlist-browser-test.mjs", `file://${process.cwd()}/`); process.chdir(process.argv[1]); await import(harness);' "$attempt_dir"
```

The inherited harness produced screenshots and two traces in its [evidence directory](../evidence/integration/inherited-01/evidence/shortlist). The primary candidate screenshots show [desktop](../evidence/reviewer/candidate-01/last-removal-1440x1000-after-reload.png) and [mobile](../evidence/reviewer/candidate-01/last-removal-390x844-after-reload.png) after reopen. The production build emitted out-of-tree output and bundle-size notices. Headless Chrome emitted display/GPU diagnostics, and the review harness observed a resource 404. Both candidate browser runs reported zero uncaught page errors and completed all required checks.

## Cleanup and preservation

The coordinator stopped and checked the exact owned Vite PIDs 41831 and 43256. Port 5191 was idle afterward. Reviewer Chrome PIDs 42429 and 43748 and inherited suite Chrome PID 43892 were absent. All three private profiles were gone. The temporary build and copied seed source were removed after the source patch and build output log were retained. The coordinator checked that raw reviewer observations, author red/green logs, repair patch, build/unit logs and inherited observations survived. [Cleanup evidence](../evidence/integration/cleanup.log).

The coordinator compared the [preservation manifest](../evidence/previous-experiments-sha256.json) against all 265 prior tracked experiment paths from base `6f78181`, excluding the experiment navigation index as specified. Every expected path matched its SHA-256. The `main` and `first-iteration` refs matched their starting values. Trial agents made no GitHub or release changes. Root owns final archive and publication decisions.

<a id="acceptance"></a>

## Acceptance and handoff

**Verified within scope · local technical trial.** The candidate passed the required behavior, review and integration checks.

| Frozen criterion | Status | Basis |
|---|---|---|
| 1. Last removal stays empty at both viewports | Met | Both independently observed user journeys persisted empty IDs and displayed the zero count and discovery action on reopen. [Retest](../evidence/reviewer/review.md) |
| 2. Surviving and replacement cafés persist | Met | The 11-check two-item and replacement scenario survived both reloads. [Observations](../evidence/reviewer/candidate-01/observations.json) |
| 3. Storage success, failure and malformed data | Met | Empty writes persisted. Blocked access and rejected writes retained a usable in-session list with warnings. Malformed, invalid-shape and mixed IDs recovered to a valid bounded list. [Observations](../evidence/reviewer/candidate-01/observations.json) |
| 4. Genuine red check and existing checks pass | Met | Two focused seed failures were retained. The same test bytes passed after repair, and coordinator runs passed nine unit tests, production build and all seven inherited browser scenarios. [Red](../evidence/author/01-red-focused.log) · [Green](../evidence/author/02-green-focused.log) · [Integration](../evidence/integration) |
| 5. Independent reproduction and retest | Met | Same independent reviewer in two turns, with concrete seed observations and corrected source hashes. [Review](../evidence/reviewer/review.md) |
| 6. Bounded ownership, routing, integration and retained evidence | Met | [Reviewer dispatch](dispatch-review.md), [author dispatch](dispatch-author.md), candidate manifests and owned resource cleanup. |
| 7. Trial isolation and prior preservation | Met | 265 prior tracked paths and the `main` and `first-iteration` refs preserved. Trial Chrome profiles were removed and owned port was closed. [Manifest](../evidence/previous-experiments-sha256.json) · [Cleanup](../evidence/integration/cleanup.log) |

Runtime acceptance applies to this local headless Chrome environment, with viewport emulation and simulated storage exceptions. Evidence covers one deliberate bug and one correction round. Other browsers, physical devices, shared maintainer adoption and any production release remain unverified. Root receives the ledger, dispatches and retained evidence for the experiment archive. The optional machine-readable workflow export was not run because the local Python environments lack PyYAML.
