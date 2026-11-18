# Shared independent acceptance comparison

Both candidates passed all22 frozen criteria. No confirmed first-pass product defects. Same Chrome 157.0.8103.79, Node v26.13.0, SwiftShader launch flags, viewport sizes and fact fixtures; runs sequential in isolated browser contexts. This is a nonstatistical comparison.

| Criterion | A | B |
|---|---|---|
| S01 | PASS | PASS |
| S02 | PASS | PASS |
| S03 | PASS | PASS |
| S04 | PASS | PASS |
| S05 | PASS | PASS |
| S06 | PASS | PASS |
| S07 | PASS | PASS |
| S08 | PASS | PASS |
| S09 | PASS | PASS |
| S10 | PASS | PASS |
| D01 | PASS | PASS |
| D02 | PASS | PASS |
| D03 | PASS | PASS |
| D04 | PASS | PASS |
| D05 | PASS | PASS |
| K01 | PASS | PASS |
| K02 | PASS | PASS |
| K03 | PASS | PASS |
| M01 | PASS | PASS |
| R01 | PASS | PASS |
| R02 | PASS | PASS |
| R03 | PASS | PASS |

A uses a dedicated comparison page; B uses a dismissible comparison dialog over the current view. Both show three columns on desktop and stacked cards on mobile. A mobile content scrolls at page level; B content scrolls within the dialog. These are interaction differences, not failed criteria.

A had two harness corrections (empty-state control label and early popup URL capture), both resolved by targeted live reruns. Original attempts retained. B required no harness corrections. Both emitted only a missing favicon404; no pageerrors. Source hashes unchanged during both reviews.

Evidence folders: `evidence/bok-perry/` (A) and `evidence/pstack/` (B). Actual browser scripts are archived under `reviewer-scripts/`: run-A.mjs, run-B.mjs, run-A-initial.mjs and check-A-followup.mjs. See README for local-path adaptation notes.
