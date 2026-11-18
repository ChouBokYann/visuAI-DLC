# E05-R — independent review and retest

## Purpose and criteria

Perry owns Experiment05. The coordinator owns acceptance and handoffs. The reviewer owns independent observation of the deliberately seeded final-removal persistence failure, followed by retest of the corrected candidate. The [frozen criteria and environments](brief.md) govern. Keep product files read-only. The original eight unit checks already passed on the seed, so that result does not establish correct final-removal behavior.

## Frozen seed and resources

Branch `first-iteration-1.1` base `6f78181c528f0d4467934562d8619f8d5dc742de`. The new app is untracked. Match the reviewed state to the [seed app manifest](../evidence/integration/seed-app.sha256) and [seed provenance](../seed.json). In particular:

- `app/src/shortlist.ts` SHA-256 `df8927c29c0d5c17d3fd038b423742a5eabbafa0095977e73c1a77077129ebca`.
- `app/src/shortlist.test.ts` SHA-256 `69f0827bfee7ed53756725600f08c84439d90922d2a37f29bab6405f4668c0e8`.
- Review the seed served by coordinator-owned Vite PID `41831` at `http://127.0.0.1:5191/`. Use only that explicit endpoint. The coordinator will send the post-repair manifest, diff and owned instance details later.

Only the reviewer writes its new Playwright harness `app/last-removal-browser-test.mjs` and `evidence/reviewer/`. The coordinator owns Vite and stops it. The reviewer owns its temporary Chrome instance/contexts, closes them on all paths, and leaves evidence outside the runtime profile. The implementation owner only receives write access after the baseline finding has been reconciled. Other contributors are working in the repository. Preserve their edits, including prior experiments. Nested delegation and issue, release or Git mutations are outside scope.

## Execute and return

1. Read [Verify change](../../../skills/verification/verify-change/SKILL.md), [Exercise user journey](../../../skills/verification/exercise-user-journey/SKILL.md) and applicable repository rules. Launch local Chrome headlessly with private Playwright contexts.
2. Before implementation, exercise the primary save/remove/reload journey at both frozen viewports. Capture both the immediate stored IDs and the post-reload count and empty-state observation. Report a real failing check and inspected source state with a stable finding ID, consequence and next check. Preserve screenshots or traces and console or structured observations under a fresh attempt path. A functional mismatch should remain a failing result, and a harness error should remain a separate setup result. Stop the baseline turn after reporting so the author can work.
3. After the coordinator sends the frozen corrected source, rerun the same primary check at both viewports without weakening assertions. Cover the two-item/replace case, blocked persistence with warning and in-session use, and malformed/unknown/duplicate/excess state as criteria 2 and 3 require. Use a distinct corrected-attempt path. The coordinator will run the pre-existing shortlist journey, full unit suite and build against the combined state.
4. Return the harness path and hash, results with commands, exit status and checks executed, source hashes, finding disposition, browser cleanup and limits. Keep per-attempt evidence under `evidence/reviewer/`. Send the coordinator a brief outcome and exact artifact paths.

<a id="corrected-candidate"></a>

## Corrected candidate · independent retest assignment

The implementation owner returned the assigned paths and reached terminal status. [Author evidence](../evidence/author/repair.md) records two relevant red failures under the seed, then 2/2 focused and 9/9 full unit checks after correction. The coordinator inspected the [actual seed-to-candidate patch](../evidence/integration/seed-to-candidate.patch) and froze the [32-file candidate manifest](../evidence/integration/candidate-app.sha256). The only two changed manifest files are the assigned shortlist writer and its tests.

- Manifest SHA-256 `ed1f0c7364303fff04eb39b0dbba68a0cc3db314c6ef652b25c14d3141e53674`.
- `app/src/shortlist.ts` SHA-256 `ca82340b226c0adae508034f43b1a94244dab2051d389d8a698c715b8c36143f`.
- `app/src/shortlist.test.ts` SHA-256 `b421b75ad7ed6d7698855142ccfd51028a78a4856814bda14eecfc2117437d9a`.
- Candidate runs at `http://127.0.0.1:5191/` under the replacement coordinator-owned Vite PID 43256. The loaded transformed shortlist module should match SHA-256 `9c9312d3b5e8662059d30765736b88e847e9e70a16f5d4644489eeaf999cd8de`. Cross-check the manifest and actual served module.

Complete steps 3 and 4 above. Preserve the original two-viewport expectations and their exact baseline harness snapshot. If adding coverage to the harness, retain the delta or record that the original primary functions stayed intact. Verify no new blocker, or return the specific new evidence with affected criteria so the coordinator can route it. Release the reviewer-owned harness after the handoff. The coordinator will close Vite after required browser runs.
