---
type: Diagnosis Record
title: E07 B shortlist route failure
description: Supported configuration mismatch; exact A recovery and corrected C independently verified
status: draft
---
# E07 B shortlist route failure

Requirement references: E07-03 through E07-06 in [design](../README.md); affected release and authority in [release record](release.md). Expected: installed target /api/shortlist returns saved ['nylon','mill'] and both browser journeys work. Observed B: process health200, target API404 NOT_FOUND, direct backend200 with unchanged IDs. Synthetic local user only; no production impact claimed.

## Evidence and hypotheses
| ID / assessment | Prediction and discriminating check | Actual evidence and limits |
|---|---|---|
| E07-H1 Supported: wrong upstream path | B target API should match direct configured /api/shortlists404 while correct direct /api/shortlist200; dist unchanged | [Preflight](../evidence/executor-preflight.json), [installed B](../evidence/executor-installed-b.json), [before recovery](../evidence/executor-before-recovery.json) and independent review-B/result.json establish exactly these statuses, response bodies and configuration. A/B manifest differences are release.json only. |
| E07-H2 Contradicted in this window: backend outage | Both direct intended API and proxy should fail, or connection refusal should yield502 | Direct intended API200 with original IDs while B proxy404; stable run/PID. Does not rule out every future or intermittent outage. |
| E07-H3 Contradicted: old artifact still served | Installed identity/served assets would disagree with B manifest or operation | Independent B review checks actual B operation/config/files and every served dist file. Dist is deliberately identical, so config/release identity is essential. |
| E07-H4 Provisional: retry traffic explains browser networkidle timeout | Browser error/retry path can prevent network idle | Independent B browser raw failures were navigation networkidle timeouts at both viewports, not a completed add/remove assertion. Error UI/screenshots and API events are retained; timing mechanism is not required to establish the independently observed route defect and is not diagnosed as a separate product bug. |

First divergence: target/runtime.mjs reads installed release.json upstreamPath while handling /api/shortlist, forwarding B to /api/shortlists; fixture/server/api.mjs rejects every path other than /api/shortlist with404 NOT_FOUND. A/B app dist hashes are equal. This ties configuration to the observed response; recent release timing alone is not the diagnosis.

Mitigation: retained target A restored at2026-11-21T04:07:05.017Z, using authorized e07-recover-a after independent B failure. [Recovery observation](../evidence/executor-recovered-a.json) sees original A digest and target200 with unchanged IDs/run. Independent recovery acceptance subsequently passed7/7 (see correction evidence below). B remains failed; recovery is not durable correction.

Smallest response: package C with upstreamPath /api/shortlist and unchanged app bytes, preceded by one focused real target-route regression. Root granted isolated ephemeral target against the same read-only backend for B red/C green after recovery review, avoiding renewed B exposure on recovered staging. Keep assertions unchanged; independent installed C browser/API checks remain required. No product source edit, new dependencies, speculative guards, logging framework or global skill changes.

Temporary probes: executor-observe.mjs performs bounded GETs only; no temporary product change. Root owns live target cleanup. Cause is Supported; final correction evidence is recorded below. Model/token telemetry unavailable; guided known injection is not organic discovery or production reliability evidence.

## Correction evidence and residual observations
[Recovered-A review](../evidence/review-recovered-A/result.json) passed7/7 before correction. The new [focused regression](routing-regression.mjs) ran once against B (0/1, exit1,404) before C existed, then once unchanged against C (1/1, exit0,200 with exact original IDs). [B regression](../evidence/executor-regression-B.json) and [C regression](../evidence/executor-regression-C.json) preserve equal assertion hashes, immutable candidate digests and closed ephemeral listener identities. Neither probe wrote backend data or changed recovered staging.

Both actual B browser bodies explicitly showed 'Shortlist service unavailable. Saved shortlist unavailable.' with Retry. Reviewer additionally observed the mobile unavailable notice overlapping header/navigation. This is an error-state layout limitation exposed with the identical frontend under faulty configuration; it is outside this route correction and is not repaired or certified here. Proposed separate follow-up: reproduce that error state at390x844 and scope a layout correction. The B networkidle timeout mechanism remains unconfirmed; do not attribute retry traffic merely from its text.

C packages corrected configuration, installed at2026-11-21T04:08:51.777Z. [C target observation](../evidence/executor-installed-c.json) shows200 and same run/state. Independent final C acceptance subsequently passed7/7 (see final handoff below). Recovery, supported diagnosis and correction regression are separate established facts; final target verification remains the next gate.

## Final cause and resolution handoff
Cause **Supported**: B config routes intended singular shortlist endpoint to nonexistent plural path; direct backend healthy and preserved, actual installed configuration and matching404 establish the mechanism. Mitigation **Verified** by recovered-A7/7. Correction **Verified in this local trial** by C7/7 independent original acceptance and unchanged focused B-red/C-green regression. [Final C evidence](../evidence/review-C/result.json). No unresolved route-failure symptom observed in the C window; B remains historically failed. Mobile error-state layout and networkidle timing remain the stated separate limitations.

Executor owns no remaining temporary listener; both regression listeners closed, no source or helper changes made. Root owns live PID39932 cleanup and preservation. Next: root reconcile experiment acceptance and retained evidence; optional separate scoped layout follow-up, no automatic expansion. The maintained records distinguish technical behavior from unmeasured human adoption/business outcomes.


Root subsequently completed cleanup: [final live state](before-cleanup.json), [owned process absent](cleanup-process.json), [both listeners closed](cleanup-listeners.json), [preservation verified](preservation-result.json). C acceptance preceded shutdown; retained artifacts and incident evidence survive. There is no active local service incident after authorized teardown, and no claim that in-memory state survives API restart. Next owner root consolidates results; optional error-layout follow-up remains separately scoped.
