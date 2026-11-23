# Brief realization trial: results

2026-11-23. Owner: ChouBokYann. Local trial completed: one fresh implementation, one bounded artifact-based correction and one fresh read-only handoff review. The original coffee app and canonical skills were not changed or pushed. Preview: http://127.0.0.1:17834.

## Finding

An adequate brief did not reliably become an adequate first implementation. The worker's initial build, logic tests and browser checks passed, but parent observation exposed instant camera changes, lost map pan on comparison return, weak phone navigation to cafes, and an overlapping map label. These were already covered by the brief, not newly invented preferences.

One concrete correction repaired the measured failures. Parent observations improved from 47/52 to 52/52, and a fresh agent independently reproduced the corrected journey. This supports testing the actual experience and feeding back specific evidence. It does not establish general autonomous improvement, full aesthetic quality, or that the framework alone caused the repair.

The handoff still omitted the original brief reference and named owner. The fresh reader could operate and test the app, but could not independently establish fidelity to the original authority from that handoff alone. This is a separate, observed context-continuity gap.

## Experiment and scope

The worker received [BRIEF.md](BRIEF.md), an isolated copy of the existing React coffee atlas, existing installed dependencies, and a source/asset packet. The representative journey was Guatemala/Ethiopia discovery, visible Singapore-cafe relationship, comparison and return. Six existing origins remained; this was not a complete map redesign.

The installed Impeccable 4.4.0 skill was actually used: its context command ran successfully with the cached engine, scoped existing refinement was allowed, and the worker read its guidance. The parent ran its mechanical detector once on the final changed UI files; it returned `[]`. That result is not an aesthetic endorsement. No claim of a separate TasteUI service invocation is made.

Three permitted regional/process photos were obtained; two are displayed for the representative origins, with creator/source/license links and truthful captions. They are not photos of the featured lots, farms or Singapore cafes. No suitable licensed cafe photo was found during the bounded search. The packet rechecked Nylon's El Sendero relationship/address and PPP's Suke Quto relationship/address; contradictory stock-template text means availability and serving remain unconfirmed. See [ASSET-PACKET.md](assets/ASSET-PACKET.md) for primary URLs, rights and exact limits.

The parent froze [eight review criteria](review/RUBRIC.md) before implementation. The initial worker had ten minutes and one batched self-check/fix allowance; the external correction had six minutes. The read-only handoff reviewer had four minutes. All finished within their respective bounds. No extra implementation round or parent repair followed.

## First result versus corrected result

| Observation | First implementation | After one correction |
|---|---|---|
| Camera change | Immediate 130% scale/pan; decorative route animates | Cancellable 500ms camera interpolation with observed intermediate positions |
| Comparison return | Selected origin retained, but actual pan lost: desktop 270 → 19, phone 111 → 19 | Actual pan and page position retained in parent checks; fresh reviewer also retained deliberately chosen [80,35] |
| Phone cafe access | Results around y=1532 after selection; late “Find it” action toggled them | Visible “View Singapore cafes” near the map navigates to results; “Back to map” returns |
| Singapore annotation | Overlaps Ethiopia target | Desktop annotation moved; tiny phone annotation omitted in favor of the explicit route caption |
| Photos and factual caveats | Representative licensed context photos and stock uncertainty present | Retained; no invented cafe photo or current serving claim |
| Fixed parent observations | 47/52 | 52/52 |

The five initial automated failures were normal-motion camera interpolation at desktop/phone and pan continuity in desktop/phone/reduced-motion contexts. Phone discoverability and label collision were additional visual observations, not captured by the coarse “labelled action exists” assertion. They therefore remain separately reported rather than hidden inside the numerical score.

The worker's initial tests ran reduced motion and asserted the 130% scale and selected name, which could pass while normal camera movement and actual pan retention failed. The correction introduced an additional browser regression written against the observed camera failure; the worker reported its red-to-green result. The parent independently observed the original failures and corrected behavior.

## Verification and final criterion assessment

Parent reran the production build and both logic test files: build passed, five tests passed. The parent browser observer ran desktop 1440x1000, touch-emulated phone 390x844 and reduced-motion desktop. It checked camera samples, two distinct selections, source popup state preservation, comparison return, overview reset, repeated interrupted selection, photo/credit loading, image failure fallback, empty-search recovery, text integrity, overflow and browser errors. External popup content was intercepted for the local state test; factual source verification was a separate asset-worker activity.

Actual initial/corrected screenshots and sequential focus frames were inspected. Video recordings accompany both passes, and timestamped camera traces establish intermediate state changes; no physical-device smoothness or frame-rate claim is made. Parent also inspected the fresh reviewer's phone cafe and comparison captures.

| Frozen criterion | Final assessment |
|---|---|
| Coherent illustrated scene | Recognizable continuous geography and consistent inherited treatment observed. Broader illustration craft and regional detail remain human judgments, not solved by this trial. |
| Location-directed camera | Met for the tested selections/reset. Focus is modest 130% framing of the origin–Singapore relationship, not detailed regional exploration. |
| Connected selection | Met in the tested journey: correct origin/notes/cafes, explicit relationship and direct phone navigation. |
| Comparison and continuity | Met for tested add/return/source behavior. Worker regression additionally checks removal; fresh reviewer independently verified arbitrary pan retention. |
| Meaningful permitted imagery | Partial: two relevant contextual photos load and are credited; actual cafe photography and broader coverage remain unavailable. |
| Motion and access | Measured motion, cancellation and reduced-motion behavior pass; basic keyboard and touch-emulated interactions observed. Exhaustive accessibility and physical-device performance unverified. |
| Truth and recovery | Representative source/stock distinctions, image failure and empty search are handled. Static bundled data has no live source-fetch service to exercise; no live inventory claim. |
| Evidence and handoff | Build/tests/current artifact evidence and UTF-8 pass. Handoff provenance is partial: missing original brief reference and named owner; old and current delivery claims require reading the correction section. |

All source and handoff files passed strict UTF-8 decoding. The worker caught and repaired newly introduced text corruption during its initial visual self-check. Rendered substitution checks also passed; a UTF-8 decode alone would not detect a validly encoded but wrong question-mark character.

## Fresh handoff result

The fresh reviewer began only with HANDOFF.md and followed its declared local references. It did not receive the parent rubric, tests, results or original conversation. It wrote its own browser probe, ran desktop/phone journeys and inspected five screenshots. It observed intermediate zoom, independent [80,35] camera preservation, correct cafe navigation, reset retaining selection, and no overflow or JavaScript errors. It also reran five logic tests.

Its [review](app/HANDOFF-REVIEW.md) explicitly declined to claim verification against the original approved brief: HANDOFF.md says “requesting human” and does not link BRIEF.md, an approval record or a named owner. DELIVERY.md preserves a historical “Final visual confirmation” before a later superseding correction, increasing the risk of stale-state reading. These defects were preserved rather than repaired after the bounded comparison. The parent protocol separately records actual user authority; no missing external maintainer approval was fabricated.

## What this suggests for visuAI-DLC

The next small workflow refinement should target execution and handoff consumption, not add another large briefing template:

1. For a defining experience, link the requirement to an observation that can actually falsify it. “Zoom is 130%” is a poor substitute for “selection moves through distinct camera states toward this place.” “Selected origin unchanged” does not establish preserved pan.
2. Inspect one complete rendered journey, including normal motion and phone navigation, before calling the increment verified. Keep visual judgments, code assertions and unresolved asset gaps distinct.
3. Return one consolidated evidence-based correction, with a bounded budget and preserved first result. This trial needed an external correction; it did not self-achieve the whole brief uninterrupted.
4. Put the current verdict first and carry a resolvable original brief/authority reference and named owner into the handoff. A fresh agent should not need the parent conversation to know what it is checking.

These are candidates for a small change to the existing implementation/verification/handoff guidance. They have not been promoted to canonical skills here. One successful correction is feasibility evidence, not proof of reduced feedback effort across future projects or reinforcement learning.

## Reproduction, evidence and limits

- [Summary](../../output/brief-realization/summary.json), [initial observations](../../output/brief-realization/initial/results.json), [corrected observations](../../output/brief-realization/corrected/results.json), and [correction request](review/CORRECTION.md).
- Original-byte source/build snapshots: output/brief-realization/source-initial and source-corrected. Screenshots, camera traces and recordings: initial/ and corrected/. Fresh independent evidence: output/brief-realization/handoff/.
- [Observer](review/observe.mjs) runs against localhost:17834 and refuses to overwrite evidence. One corrected observation attempt stopped because the old generic toolbar selector now matched two buttons; that harness error is preserved in corrected-harness-first. The selector was narrowed to the accessible “Compare origins” name; no scoring criterion changed.
- Original app hashes, trial brief/rubric/source packet and licensed asset hashes all remained unchanged. Only the isolated app changed. An initial Vite setup run re-optimized the shared generated dependency cache before cacheDir was isolated; [setup-notes.md](../../output/brief-realization/setup-notes.md) records that side effect. No package installation or original source modification occurred.
- Start the preview from experiments/brief-realization/app with `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 17834 --strictPort`. Dependencies and browser executable reuse this local installation; this is not a portable deployment bundle.

One unblinded implementation trial, parent-authored observations, known inherited UI and small source set. No no-feedback control, repeated sampling, independent human design review, full keyboard/screen-reader/contrast audit, physical phone, broad browser matrix or production deployment. The long stacked phone comparison is readable but still warrants user review. Current cafe stock, complete image coverage, more ambitious map illustration and full aesthetic acceptance remain unverified. The preview is intentionally left running for local inspection.
