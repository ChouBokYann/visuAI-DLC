# Reusable handoff

Source/applicability: TASK.md, RUN.md and supplied history, for this synthetic study-space finder. November group discussion requirements supersede October solo silent-work preference. Keep short card summaries and longer detail explanations. Earlier agent readiness claims and accounts/payment proposals are not user acceptance.

Runtime: app.mjs exports assess(place, preferences), loads data.json; do not hardcode current IDs/preferences. Known incompatibility dominates unknown facts; relevant missing facts require confirmation rather than rejection or a confirmed match. Compare the entire same-day interval inclusively; seats >= partySize; activity needs matching conversation/silent mode; require known step-free access only when requested. Keep unknown options visible and tell users exactly what to ask.

Selection: article[data-id][data-state], button[data-select], one replaceable #detail[data-id], current #preference-summary. Contact href comes from selected place's source mailto; switching selection must update all details and pressed state.

Verification: node check.mjs and node browser-check.mjs from this directory. Browser check uses the RUN.md-approved existing Playwright runtime and executable, assigned loopback server; replaces data only via browser route for a dynamic fixture test. Screenshots desktop.png/phone.png inspected. On Windows, ESM absolute imports need file:/// and PowerShell Set-Content must specify UTF8 for non-ASCII UI text; behavior assertions alone missed bad rendered encoding until screenshot inspection.

Process applied: read-only workflow snapshot deliver-change, implement-increments and verify-change. Existing simple style retained for functional repair; no design specialist or additional skill needed. One correction round, then checks passed and fresh screenshots were inspected. DELIVERY.md holds evidence and limits. Do not infer real availability, sent contact, human acceptance, screen-reader compatibility or cross-browser results from these checks.
