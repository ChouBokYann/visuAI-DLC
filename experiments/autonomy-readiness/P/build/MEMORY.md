# Reusable memory

## Sources and applicability
- RUN.md: applies to this isolated trial; owns app.mjs/index.html plus delivery, memory and local evidence only. Runtime loads data.json; export assess(place, preferences); DOM contract uses articles with data-id/data-state, data-select buttons and one #detail.
- TASK.md and history/notes.md: current group requirements supersede 2026-10-01 solo/silent preference. Preserve brief card comparisons, uncertain listings and explanation/contact tied to each new selection. Previous agent reports and accounts/booking suggestion are not acceptance.

## Decisions
- assess is pure. A known unmet requirement makes a place unsuitable even when another fact is unknown. Without known failures, unknown required facts mean needs-confirmation. All satisfied facts mean suitable. Exact opening/closing and seat boundaries are inclusive.
- Discussion maps to conversation policy; silent-work maps to silent policy. Step-free unknown is relevant only when required. Missing facts are never converted to false or zero.
- Cards show factual comparison and explicit status. Details hold description, reasons and original contact. Each click replaces details and updates pressed state; focus moves to detail.

## Evidence and rerun
- Run `node experiments/autonomy-readiness/P/build/check.mjs` from repository root with the assigned local server available on port 17831. Harness uses existing Playwright and browser paths from RUN.md, no installs.
- desktop.png and phone.png are actual Chromium full-page captures, visually inspected after correction. Checks pass; see DELIVERY.md.
- Windows PowerShell Set-Content defaults caused bad browser characters. Save app text explicitly as UTF-8. Absolute Windows ESM import paths require file:/// URLs.

## Limits
Synthetic catalogue, no live availability, no contact messages sent. Tested Chromium desktop and 375px phone viewport; other engines and assistive technology not checked. Preserve unknown capacity/access and contact organiser before treating them as confirmed.
