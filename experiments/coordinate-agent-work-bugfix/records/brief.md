# Experiment05 — coordinated bug fix

Human owner: Perry. User authorized adding coordinate-agent-work and testing it with a bug-fixing task as a new experiment. Root owns the skill, navigation updates, proposal, probe records and final experiment report. A fresh coordinator will own the experiment execution record and dispatch bounded author/reviewer responsibilities. Only the new experiment app may be changed by those workers.

## Task
A saved cafe reappears after the last shortlist item is removed and the page is refreshed. Diagnose and repair this in the new app. The experiment is deliberately seeded; it is not a previously undiscovered defect in Experiment03. Work on actual app controls and preserve evidence.

## Frozen acceptance
1. Through search/details save Nylon, open shortlist, remove Nylon, reload and reopen shortlist: zero cafes and a useful empty state. Repeat at1440x1000 and390x844.
2. Removing one of two preserves the other across reload; removing all then adding a replacement persists the replacement.
3. Stored IDs after last removal are empty when storage works; blocked reads/writes retain a usable session and truthful warning. Malformed/unknown/duplicate/excess data stays safe.
4. Existing8 logic tests, production build and existing shortlist browser journeys pass. Add a behavioral regression test that fails for the observed bug before changing source.
5. A separate reviewer records the failure before implementation, then checks the corrected frozen source; final findings reference tested hashes. No author self-approval.
6. Coordinator grants one writer per path, supplies baseline/criteria/report destination, checks returned artifacts, routes findings to the owner, verifies integration and cleans up only owned resources. Each evidence attempt survives.
7. Previous experiments unchanged; no runtime profiles, unknown listeners, main branch, GitHub issues or external release changes.

## Ownership contract
The coordinator owns records/coordination.md and its dispatch briefs. Implementation owns app/src/shortlist.ts, app/src/shortlist.test.ts and its evidence/author/ reports. Reviewer owns reviewer helper/scripts and evidence/reviewer/ reports only; product source is read-only. Coordinator may arrange commands and evidence paths within this experiment. No commits/push from children. Root handles final commit and full preservation verification. Other contributors are present; never revert their work.

## Environment
Use existing locked npm dependencies and local Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome. npm ci is authorized in the new app. New owned Vite port5191 (choose another unused port if occupied; never attach to or stop an unknown instance). Playwright comes from app/node_modules. Run commands from app with explicit workdir; browser contexts are private. Older apps on other ports belong to earlier previews.

## Boundaries
Bug-fix only; no cross-tab synchronization, redesign, new dependency or skill changes by experiment workers. Missing tool/input blocks dependent work; continue independent checks. Repeated identical setup failures need diagnosis or a changed approach. There is no requirement to manufacture an additional faulty repair round. Report what actually happened, including limitations and any baseline checks that already pass.
