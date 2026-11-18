# E05-R independent review

## Corrected candidate · Verified within reviewer scope

Finding E05-R-01 is resolved on the frozen corrected candidate. From [app](../../app), `DEBUG=pw:browser node last-removal-browser-test.mjs candidate-01 --extended` exited **0**. All 68 recorded checks passed across eight scenarios. The original 16 browser checks used identical assertions. The original primary journey and its helpers are byte-identical to the seed snapshot, and the two reports have the same names, labels and expected values for those checks. [Harness delta](candidate-harness.diff) · [Structured observations](candidate-01/observations.json) · [Browser command and cleanup log](candidate-01-browser.log).

| Frozen criterion | Observed result | Evidence |
|---|---|---|
| 1 · Final removal at 1440 × 1000 and 390 × 844 | Removing Nylon Coffee immediately wrote raw `[]` in both private contexts. After reload and reopening the shortlist, both showed zero cards, `Shortlist (0/3)`, guidance on where to save cafés, and the Discover cafés action. | [Desktop after reload](candidate-01/last-removal-1440x1000-after-reload.png) · [Mobile after reload](candidate-01/last-removal-390x844-after-reload.png) |
| 2 · Retain one and persist a replacement | At 1440 × 1000, saved Nylon and Apartment, removed Nylon, and reloaded to find only Apartment. Removing Apartment emptied persisted IDs. Adding Alchemist · The Mill and reloading left only that card and stored `["mill"]`. | [Replacement after reload](candidate-01/two-items-clear-and-replace.png) |
| 3 · Blocked storage | At 390 × 844, browser-injected failures separately denied storage-object access and shortlist writes. Both kept the unavailable-persistence warning visible on the empty list, after saving and removing Nylon, in replacement details and after reload. A replacement remained usable within the session. Its card was absent after reload, and the blocked-write fixture confirmed raw storage remained `null`. | [Blocked access](candidate-01/storage-blocked-access.png) · [Blocked write](candidate-01/storage-blocked-write.png) |
| 3 · Invalid or oversized storage | Malformed JSON and a non-array value recovered to empty views and persisted `[]`. A mixed array with an unknown ID, a duplicate, a non-string and more than three valid IDs recovered to exactly `["nylon","apartment","mill"]` in its original order, both onscreen and in storage. | [Malformed JSON](candidate-01/malformed-json.png) · [Invalid shape](candidate-01/invalid-shape.png) · [Mixed IDs](candidate-01/mixed-ids.png) |

The [source patch](../integration/seed-to-candidate.patch) removes the empty-selection early return so persistence attempts and errors follow the same path at every count. This disposition covers reviewer criteria 1–3. The coordinator owns the broader inherited browser, logic, build, integration and server cleanup checks.

### Candidate identity and cleanup

- [Candidate app manifest](../integration/candidate-app.sha256) SHA-256 `ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674`. All 32 listed files matched before and after review. [Before](candidate-01-manifest-before.log) · [After](candidate-01-manifest-after.log).
- `src/shortlist.ts` SHA-256 `ca82340b226c0adae508034f43b1a94244dab2051d389d8a698c715b8c36143f`.
- `src/shortlist.test.ts` SHA-256 `b421b75ad7ed6d7698855142ccfd51028a78a4856814bda14eecfc2117437d9a`.
- Both primary contexts loaded transformed module SHA-256 `9c9312d3b5e8662059d30765736b88e847e9e70a16f5d4644489eeaf999cd8de`, matching the coordinator's freeze. Independent HTTP reads also matched. [Before](candidate-01-served-before.sha256) · [After](candidate-01-served-after.sha256).
- [Candidate harness](../../app/last-removal-browser-test.mjs) SHA-256 `33be2c0c3aa3ec6b2a63c0b3c77d8ed7349643e12a7b420037b438f5dce2ee1c`. The exact [seed harness snapshot](seed-01/harness.mjs.snapshot) remains available.
- Coordinator-owned Vite PID 43256 served `http://127.0.0.1:5191/`. Eight private contexts closed. Playwright reported reviewer-owned Chrome PID 43748 exited successfully and its temporary directories were cleaned up. A subsequent process query found no Chrome process at that PID.
- Chrome 157.0.8103.79, Playwright 1.65.1 and Node v26.13.0. No uncaught page errors. The desktop primary context again logged a resource 404 and SwiftShader WebGL performance warnings. This is local headless viewport coverage with simulated storage failures. It provides no physical-device or other-browser measurements.

## Seed history · Changes required on the original fixture

The separate reviewer reproduced the artificial Experiment05 failure at both required viewport sizes, before implementation was released. The reviewed untracked app matches the [seed manifest](../integration/seed-app.sha256) on branch `first-iteration-1.1` with base `6f78181c528f0d4467934562d8619f8d5dc742de`. The [frozen brief](../../records/brief.md) and [review dispatch](../../records/dispatch-review.md) govern.

From [app](../../app), `DEBUG=pw:browser node last-removal-browser-test.mjs seed-01` exited **1** for behavioral failures. Both contexts completed, with 6 passed and 10 failed assertions in total. The harness requires zero cards, zero in the navigation count, visible empty-state heading and discovery action after reopen, and stored IDs `[]` immediately after removal.

| Viewport | Immediately after removing Nylon Coffee | After reload and opening shortlist | Evidence |
|---|---|---|---|
| 1440 × 1000 | Zero cards, `Shortlist (0/3)`, empty heading and discovery action visible. Stored IDs still `["nylon"]`. | One Nylon Coffee card, `Shortlist (1/3)`, empty heading and action absent. | [After removal](seed-01/last-removal-1440x1000-after-remove.png) · [After reload](seed-01/last-removal-1440x1000-after-reload.png) |
| 390 × 844 | Zero cards, `Shortlist (0/3)`, empty heading and discovery action visible. Stored IDs still `["nylon"]`. | One Nylon Coffee card, `Shortlist (1/3)`, empty heading and action absent. | [After removal](seed-01/last-removal-390x844-after-remove.png) · [After reload](seed-01/last-removal-390x844-after-reload.png) |

The journey uses the public Find a café button, Search cafés field, Nylon Coffee detail dialog, Save to shortlist and View shortlist buttons, Remove Nylon Coffee button, then reload and the Shortlist navigation button. Before removal both contexts verified the saved Nylon article and stored `["nylon"]`. [Structured observations](seed-01/observations.json) · [Command and cleanup log](seed-01-browser.log).

### E05-R-01 · Last removal is lost on refresh

Criteria 1 and 3 require an empty shortlist after reload and empty persisted IDs after removing the last item. [App.tsx](../../app/src/App.tsx#L12) writes each changed selection through [writeShortlist](../../app/src/shortlist.ts#L32). The seed returns success on the empty selection before calling `setItem`. Reload reads the previous stored ID, so the user sees a café that they removed. The immediate empty UI is correct in both viewports.

The implementation owner should exercise a previously populated storage state, then confirm that writing the empty selection clears the saved IDs and still surfaces an unavailable store as unavailable. Retest the same browser assertions against the frozen repair. The two-item, replacement and storage error or malformed-data journeys were reserved for the corrected candidate. The seed's eight passing logic tests are retained as prior evidence in the [seed unit log](../seed-unit-tests.log).

### Identity and environment

- `src/shortlist.ts` SHA-256 `df8927c29c0d5c17d3fd038b423742a5eabbafa0095977e73c1a77077129ebca`.
- `src/shortlist.test.ts` SHA-256 `69f0827bfee7ed53756725600f08c84439d90922d2a37f29bab6405f4668c0e8`.
- `shasum -a 256 -c ../evidence/integration/seed-app.sha256` matched all 32 files before and after the run. [Before](seed-01-manifest-before.log) · [After](seed-01-manifest-after.log).
- Both contexts loaded identical transformed shortlist module bytes with SHA-256 `98fc99051673e20e51af11f849e5464b082f1b23c6005832666ac14576cec261`. An independent HTTP read of the module at the same endpoint matched.
- [Harness](../../app/last-removal-browser-test.mjs) SHA-256 `bb9c9f1d9ebea8099bcac3688917109fd708cf5cfb31300f763df266d2af7e1a`. The [exact seed version](seed-01/harness.mjs.snapshot) is retained for comparison.
- Coordinator-owned Vite PID 41831 served `http://127.0.0.1:5191/`. The reviewer used headless local Chrome 157.0.8103.79, Playwright 1.65.1 and Node v26.13.0. Both private contexts and the browser closed. Playwright logged Chrome PID 42429 exiting successfully and confirmed temporary-directory cleanup. The coordinator's listener remained live.
- No uncaught page errors occurred. Desktop emitted one unidentified resource 404 and SwiftShader WebGL performance warnings. The journey completed and captured all expected checkpoints. These are viewport-emulated local Chrome results. Physical devices, other browsers and shared adoption are outside this evidence.
