# Experiment 07 results: local deployment, recovery and diagnosis

The live A → faulty B → recovered A → corrected C cycle completed within the accepted bounds. Installed A, recovered A and C passed the same independent target/browser checks. B remained an observed failed release despite process health 200 and successful installation. Recovery preserved the synthetic shortlist on the same backend process. Diagnosis supported a configuration routing fault, and the unchanged focused regression failed B and passed C.

This is bounded local staging evidence, not production readiness, a fresh all-six-phase run, or general workflow reliability. No main adoption or human maintainer review is claimed.

## Authority and isolation

Bok approved the complete proposal and explicitly waived issue-first/other-maintainer acceptance for this local trial. [Operator record](records/operator.md) and [execution plan](records/plan.md) retain the actual instruction, scope and bounds. No issue was published, no GitHub message sent for this trial, and no commit, push or merge performed. Branch: `experiments/07-release-recovery`, isolated under `output/e07-worktree`.

Starting source was the local, uncommitted Experiment 06 S3 R3 source/test manifest, digest `785f9a182a095ba8a06b4e874b2ed29045d9f0c89873c51dad7908d2d1e030f3`. It was verified by bytes before copying. `c276159` identifies the branch base, not those uncommitted source contents. [Setup and skill pins](records/setup.json), [source manifest](records/source-manifest.json).

## Observed cycle

| Phase | Installation and health | Independent target acceptance | State and result |
|---|---|---|---|
| A | Exact manifest installed; all served dist bytes matched; health 200 | 7/7 checks, including full browser journeys at 1440×1000 and 390×844 | Verified local release; initial and final IDs `['nylon','mill']` |
| B | Exact B installed; served files matched; health 200 | 4/7; target API 404, browser unavailable UI captured at both sizes | Failed release; direct backend stayed 200 with original IDs |
| Recovered A | Exact retained original A restored, new recovery operation | 7/7, same primary assertions | Recovery verified without resetting data or restarting backend; B remains failed |
| C | Exact corrected configuration artifact installed; health 200 | 7/7, same primary assertions | Corrected local release verified; original IDs and backend identity preserved |

Per-phase raw results, observations and screenshots: [A](evidence/review-A/result.json), [B](evidence/review-B/result.json), [recovered A](evidence/review-recovered-A/result.json), [C](evidence/review-C/result.json). [Independent assessment](evidence/review-assessment.md). Seven checks are groups, including browser interactions, not seven independent experiments.

All phases used the same frozen primary harness, SHA-256 `7516cb983de83d1dd424e40f4a0d4a50c39275d1ee211603f6b0c80abfa5f753`. One stable root-owned Node process hosted distinct API and static/proxy listeners. Backend identity: PID39932, run ID `92e22675-7232-416e-96b2-ebcd705dd563`; API56414 and staging56415, both loopback. The process remained alive until final cleanup. Only the installed artifact pointer changed.

Artifact digests:

- A: `b7702a6c02e3486555d3a26cd6534e1b677db343cfd07162b4a8ebf92b7a1735`
- B: `123c4ef248862989c6fb105e04c9578e8f468d92c0b71a7b353a737781c021c4`
- C: `06ddc4afa01f56a5571585f24bbba8e7d2a01f0997a02db284723f29b4519067`

The app dist files are identical across A/B/C; release IDs and proxy configuration provide release identity. A/C use the same correct runtime route. C's new evidence/provenance does not imply a new frontend implementation.

## Failure, recovery and diagnosis

B forwarded `/api/shortlist` to `/api/shortlists`. The actual backend rejects that path with 404. Direct `/api/shortlist` remained available with the expected saved IDs. Installed config and response evidence distinguish this fault from a backend outage or accidentally serving the old release. Full hypotheses and limits: [diagnosis](records/diagnosis.md).

The unchanged browser harness timed out waiting for `networkidle` on B before its add/remove sequence could run. Those are retained browser-navigation failures, not falsely reported completed journey assertions. Separately, direct target API assertions failed 404 versus 200, response events showed 404, and captured body/screenshots showed "Shortlist service unavailable" at both viewports. Those observations establish user-facing failure despite healthy process and valid artifact installation. The exact cause of prolonged network activity was not separately established.

B was installed at 04:06:18.966Z and A recovered at 04:07:05.017Z on 2026-11-21, an observed 46.051-second exposure including review. This is descriptive timing for one guided run, not a recovery-time guarantee. Recovery happened before prolonged diagnosis and preserved original IDs. [Release/operation record](records/release.md), [operation history](target/state/operations.jsonl).

The executor wrote a focused route regression before C. It mounted an isolated immutable B snapshot against the same read-only backend, observed actual 404 failure (0/1, exit1), closed its owned listener, then ran unchanged assertion bytes against C and observed 200 success (1/1, exit0). The recovered staging target was not switched back to B for diagnosis. The reviewer independently checked the regression's source hash, evidence, artifact identities and listener cleanup. Final installed C then passed the unchanged primary browser/API checks. One correction round was used.

## Acceptance coverage

| Criterion | Evidence and conclusion |
|---|---|
| E07-01 authority/identity | Met within accepted scope: explicit local exception, frozen design/plan, verified actual source/skills/artifacts, target and bounds. Host/node/browser recorded; exact model/token telemetry unavailable and explicitly unknown. |
| E07-02 installation | Met: copied artifacts, immutable per-release paths, independent installed-file and every served dist-file hash checks. Actual production build served from target directory, not Vite. |
| E07-03 useful target checks | Met: A passes; B API assertion fails with visible unavailable UI while process health passes. Browser navigation timeout limitation is separated from decisive user-failure observations. |
| E07-04 recovery | Met: exact retained A, independent 7/7, same backend PID/run and original state. B remains failed. No database/API restart or hidden reset. |
| E07-05 diagnosis | Met within this incident: actual config and direct/proxy route probes support routing cause and contradict backend outage during the observed window. No general outage claim. |
| E07-06 correction | Met: unchanged focused regression red B then green C; source-identical app baseline unit10/10, provider15/15 and build reused with verified identity; independent installed C7/7 at both viewports. |
| E07-07 independent evidence | Met: fresh reviewer owned checks/evidence only; exact identities, raw failures, commands/exits, screenshots and stable state records retained. Root author checks remain labeled as author evidence. |
| E07-08 preservation/cleanup | Met by final root checks: 382 historical tracked experiment files and 464 local E06 files unchanged; fixture/helper/skill pins and protected refs unchanged; no outside-scope changes. Owned browser closed, root process absent and both listeners refused after cleanup. |
| E07-09 learning/conclusion | Met as reporting criterion: supported observations linked to upstream-derived practices below; unsupported scenarios and follow-ups explicit. No claim of superiority, production readiness or complete workflow coverage. |

The independent review initially left root-owned cleanup/preservation pending; the later root evidence below resolves that handoff. This does not retroactively claim the reviewer performed root's checks.

## Checks, resources and limits

- New target helper: tests written against unfinished exports, actual red0/3 then unchanged green3/3. [Helper evidence](records/helper-checks.json). Covers verified copying, tamper rejection, repeat-operation/release protection, static path boundaries, real proxy and retained-artifact recovery. Independent helper review found no blocker for the bounded serialized run.
- Copied app: consumer/logic10/10, provider/regression15/15, production build exit0. Existing large Room chunk warning remains. No new dependency installation or external service.
- One initial cycle, zero setup-only cycle retries, one correction of maximum two. Three agents at most: root, executor and reviewer. No nested delegation. Exact inference cost/model unavailable; no efficiency comparison.
- Process cleanup first encountered sandbox access denial. Explicit approved retry verified exact PID/command and stopped only the owned process. [Before cleanup](records/before-cleanup.json), [process result](records/cleanup-process.json), [listener closure](records/cleanup-listeners.json).
- [Preservation result](records/preservation-result.json) verifies old work and scope. Frozen helpers/runbook/plan remained unchanged; completed work is evidenced here rather than rewriting frozen inputs.

No production/cloud IAM, public networking, backend restart durability, data/schema migration, concurrent deployment race, crash-atomic operation history, lost deployment acknowledgment, broad security/accessibility certification, cold-host portability, or statistical generalization was tested. Target pointer change and log append are not a crash-safe transaction; crash/lost-ack cases were explicitly excluded. Source/evidence remains local and uncommitted.

## What this adds to the framework

| Existing upstream-derived practice | Observed support in this trial | Limit |
|---|---|---|
| ECC deployment principles: config/environment and recovery checks | B's valid build and health were insufficient; exact config plus target behavior exposed failure. Retained A recovered behavior and state. | No provider/platform comparison. |
| Superpowers branch completion separated from deployment | Local tests/build were distinct from actual copied artifact and live target verification. | Does not evaluate upstream branch-finishing efficiency. |
| Superpowers/Matt diagnosis: reproduce and distinguish hypotheses | Direct backend versus configured proxy separated routing fault from service outage. | One deliberately seeded, known class of fault. |
| pstack root-cause discipline and Matt's bounded prevention | One routing regression protects the observed mechanism; no speculative infrastructure added. | Does not establish general prevention effectiveness. |

Sources, pins and retained notices are in [the accepted design](README.md) and canonical skill references. This evaluates current adaptations; it does not re-audit every upstream source or prove causal advantage over another workflow.

## Follow-ups and next owner

1. **Observed product limitation:** B's error notice overlaps the header/navigation at desktop/mobile sizes. The same frontend bytes are used across releases; this trial exposes the error-state layout rather than changing it. Preserve the screenshots for a separately scoped UI fix; it was not repaired here.
2. **Harness limitation:** `networkidle` delayed failing-browser observations during B. A future harness revision should wait for explicit application readiness/error states, with its own before/after evidence. The current frozen assertions were not altered to improve the result.
3. **Next evaluation priority:** an unfamiliar existing application with an API and persistent data. This would broaden evidence beyond the café lineage and exercise compatibility/data change risks that this intentionally stateless rollout did not cover.

Bok/Perry can review the retained evidence and decide on adoption or the next scoped trial. This experiment adds observed release/recovery/diagnosis coverage; it does not close the full engineering-workflow evaluation programme.
