# Trial A build delivery

Status: Verified within trial scope by author checks; human acceptance not claimed.

## Authority and boundaries
Task: TASK.md and continuing FEEDBACK.md. Trial controller delegated implementation; no separate human owner identity was supplied in trial inputs. This worker owned only app.mjs, index.html, matching.test.mjs, DELIVERY.md and MEMORY.md in A/build. Shared input, snapshots, other arms and evaluator sources were neither edited nor inspected. No network services, installs, messages, deployment or git mutations.

## Selected workflow and scope
Read baseline/docs/workflows/deliver-change.md, then baseline/skills/implementation/implement-increments/SKILL.md and baseline/skills/verification/verify-change/SKILL.md. Gap: broken assess and selection behavior with sufficient criteria to implement and verify. Existing cream direction was sufficient for a routine functional repair; no external visual specialist used. Bounded CSS adjustments retained the existing grid and cream palette. No unresolved visual direction required another interview.

Affected callers: assess export and its browser rendering caller; cards and single detail section; matching regression checks. No config, dependencies, fixtures or exports beyond the existing assess interface needed changes. Source text enters DOM using textContent; contact accepts source mailto only.

## Expectation to evidence
| Source | Criterion | Action | Evidence / result |
| --- | --- | --- | --- |
| FEEDBACK REQ-MATCH | Current interval, seats, activity and requested access determine fit; failure dominates unknown | assess uses runtime preferences, returns reasons, retains null as uncertainty | matching.test.mjs regression checks plus black-box meaning 14/14 passed |
| FEEDBACK REQ-SELECT | All places remain visible; selection replaces entire detail and source contact | Fresh detail children, current data-id, current contact and aria-pressed; cards show short facts | black-box interaction 12/12 passed; desktop and phone rendered detail inspected |
| FEEDBACK REQ-FACTS | Do not infer stairs; preserve actual unknown facts and clean punctuation | Not step-free label; explicit unknowns; source description retained; UTF-8 writes and ASCII punctuation | black-box grounding 8/8 passed; both actual rendered screenshots inspected without visible corruption |
| TASK cream readable comparison/contact UI | Readable desktop and phone, fuller details and contact | Responsive cream grid and single-column phone layout with visible status labels | 1280.png and 390.png inspected: readable wrapping, no overlapping or clipped text, detail question and contact visible |

The prior solo/group preference is explicitly inapplicable: current runtime preferences govern all matching. Earlier all-cards-rendered claims are not treated as acceptance. The previous punctuation corruption feedback is applicable: writes explicitly used UTF-8 and screenshot text was inspected.

## Checks and provenance
1. Added matching.test.mjs first. Running node experiments/contract-enforcement/A/build/matching.test.mjs failed at the expected unsuitable assertion against the original unconditional suitable implementation.
2. Implemented app.mjs and index.html, then repeated that command: Matching checks passed. Includes boundary hours, opening too late, closing too early, insufficient seats, silent/discussion mismatch, required false/unknown access, unknown noise/hours, failure plus unknown, and changed party size.
3. Ran python experiments/contract-enforcement/controller.py run A build once. Evidence reference: 5e092db2542f47ccb99411055238b3a6. All groups passed (meaning 14, interaction 12, grounding 8).
4. Inspected actual images with view_image: output/contract-enforcement/receipts/artifacts-135aabe459a94c49ba82ac87a7828713/1280.png and 390.png. Desktop has three columns, phone one column; current preference summary wraps cleanly. Fern detail includes the seat-confirmation question and contact. Oak card says Not step-free; no inferred stairs. These screenshots cover the implementation state recorded here; no production edits followed them.

## Rounds, stop reason and limits
One initial implementation round; zero post-check correction rounds (one runner invocation). Stopped because stated criteria passed available checks and actual desktop/phone renders were inspected, within six-minute/three-correction budget.

This is author verification of a synthetic local finder, not independent review, real venue suitability or user approval. No live mail client/contact delivery tested or requested. Runtime accepts the supplied valid same-day time and field types; no unrequested booking, accounts, search, preference editor, third-party dependency or cross-day scheduling was added. Full assistive-technology and cross-browser audits were not performed. Next action: parent trial comparison / human evaluation with preserved receipts.
