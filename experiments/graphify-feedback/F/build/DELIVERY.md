# Delivery - file retrieval arm

Status: Verified within the authorized local repair scope; author self-review only, human acceptance not claimed.
Owner: delegated local comparison worker for F/build. Responsibility and affected paths: app.mjs, index.html, check.mjs, browser-check.mjs, desktop.png, phone.png, DELIVERY.md, MEMORY.md. Input data and workflow/corpus remain read-only. No other contributor files changed.

## Source retrieval and authority
Ordinary file retrieval, no graph/index/extraction access. All paths below are relative to ../../corpus.
- decisions/meeting-18.md, 2026-11-10 USER: current three-person discussion 18:00-20:00, step-free required, compact comparison retained. Supersedes archive/meeting-01.md (2026-09-01 personal silent-work preference).
- reviews/note-12.md, 2026-11-11 USER: unknown capacity/access stay visible, need confirmation and useful questions.
- reviews/note-04.md, 2026-11-12 USER: every selection replaces entire detail/contact; short facts on cards, explanation in details.
- reviews/note-29.md, 2026-11-20 USER: false access means Not step-free; do not infer stairs. Supersedes rejected archive/proposal-07.md, 2026-10-04 AGENT PROPOSAL (also proposed unaccepted booking/accounts).
- engineering/record-31.md, 2026-11-21 USER: preserve all three review requirements; runtime catalogue/preferences control matching. archive/status-05.md (2026-10-10 AGENT REPORT) is stale smoke evidence, not acceptance.
- engineering/domain.md, undated field definitions: full same-day HH:MM interval, available seats, activity/noise compatibility, unknown nulls, mismatch precedence, fictional mailto contacts.
- notes/layout.md, 2026-10-18 USER: simple cream layout; no map, animation, accounts, payment or actual messages.
- notes/location.md, 2026-10-17 USER: nearby undefined, travel estimates prohibited, location search deferred.
- incidents/case-22.md, 2026-11-14 OBSERVED: prior encoding corruption. Explicit UTF-8 writes and rendered inspection used here.
Irrelevant other-projects notes were not read. File inventory listed a graphify-out path but its contents were never read.

Actual retrieval commands (PowerShell):
```
Get-Content experiments/graphify-feedback/F/build/RUN.md; Get-Content experiments/graphify-feedback/F/build/TASK.md
Get-Content experiments/graphify-feedback/F/build/app.mjs; Get-Content experiments/graphify-feedback/F/build/index.html; Get-Content experiments/graphify-feedback/F/build/data.json; Get-Content experiments/graphify-feedback/workflow-snapshot/docs/workflows/deliver-change.md; rg --files experiments/graphify-feedback/corpus
rg -n --glob '*.md' --glob '!other-projects/**' --glob '!graphify-out/**' '.' experiments/graphify-feedback/corpus/reviews experiments/graphify-feedback/corpus/notes experiments/graphify-feedback/corpus/incidents experiments/graphify-feedback/corpus/engineering experiments/graphify-feedback/corpus/decisions experiments/graphify-feedback/corpus/archive
Get-Content experiments/graphify-feedback/workflow-snapshot/skills/implementation/implement-increments/SKILL.md
Get-Content experiments/graphify-feedback/workflow-snapshot/skills/verification/verify-change/SKILL.md
```
The last three queries were executed together in one tool call. Source files were read directly in full (each source was one line); no retrieved summary substituted for source verification.

## Decisions and implementation
Selected snapshot implement-increments because scope and existing UI direction were sufficient for this functional repair; verify-change for original-expectation assessment. No UI specialist needed for the routine repair retaining existing cream comparison layout. No new dependency, network service, account, map or message sending.
Replaced unconditional suitable with runtime matching and reasons. Known mismatch dominates any unknown. Only required access is evaluated. Selection replaces all detail children and source contact, then focuses the panel. Cards retain short facts and textual state; details explain mismatches and questions. Supported access labels only. Small responsive CSS retains readable cream design; text is created via textContent.

## Acceptance and evidence
| Source expectation | Observable criterion | Evidence | Result |
|---|---|---|---|
| Current group and runtime data | summary shows current preferences; generic matching changes with input | check.mjs current fixture and alternate objects/preferences; screenshots | Met |
| Full interval, seats, activity, access | Cedar suitable; Fern/Pine needs confirmation; Elm/Ash/Oak unsuitable | check.mjs, exact boundaries and mismatch-over-unknown cases | Met |
| Unknowns remain visible and actionable | all six cards present; detail asks about capacity/access | browser checks, source inspection, phone screenshot | Met |
| Full selection replacement | every selected id and contact matches selection | browser-check.mjs cycles six selections | Met |
| No invented features | false access uses Not step-free, no Stairs | browser check and desktop inspection | Met |
| Short comparison, longer detail | concise facts in cards; reasons/description/contact in detail | desktop and phone screenshots visually inspected | Met |
| Readable phone/desktop | no horizontal overflow at 390px, clear hierarchy and buttons | browser check, desktop 1200px and phone 390px screenshots | Met |
| Encoding regression | explicit UTF-8 writes; no replacement characters | browser check and both actual rendered screenshots | Met |
| No new services/location/messages | only supplied mailto links; no added service actions | app/index inspection | Met |

Commands run:
- node experiments/graphify-feedback/F/build/check.mjs: failed initially for intended baseline defect (all states suitable), then passed after implementation.
- node experiments/graphify-feedback/F/build/browser-check.mjs: passed six selection/contact replacements, six visible cards, unknown guidance, supported access label, no replacement characters, mobile overflow and no page errors.
- tools.view_image for both desktop.png and phone.png: inspected actual screenshots, readable cream cards, correct state labels, complete matching detail, no clipping or corrupted punctuation. Phone is a vertical list and focus brings selected details into view.

No post-test application edits. One implementation round, zero correction rounds needed. Stopped because all scoped original requirements have local evidence within the six-minute budget. No unresolved consequential product decision; nearby/location intentionally deferred by user. Tests assume authoritative supplied schema and same-day times, as domain specifies. No external mail client launch, user acceptance, production deployment, cross-browser or full accessibility audit performed. No claims of real-world availability or real contact delivery.
