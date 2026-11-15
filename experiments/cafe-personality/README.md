# Sidequest: Singapore coffee personality trial

React + TypeScript + Three.js portfolio demo. The five-chapter questionnaire builds a playful preference portrait and ranks a curated shortlist; independent search combines text, neighbourhood and coffee-style filters. Facts link to first-party sources, while matching and brew tags are explicitly editorial. No live menu, availability or diagnostic personality claim.

## Run

From this directory, install with `npm ci`, then run:

```powershell
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5174 --strictPort
```

Open http://127.0.0.1:5174. `npm run build` creates the static dist directory. No public deployment has been performed.

## Check

`npm test` runs scoring/search/data checks. With the dev server running, `npm run test:browser` uses a fresh isolated headless Chromium. Install its browser with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a compatible installed Chromium. Screenshots are written only to the repository-local output/cafe-trial directory. Browser tests do not use a personal Chrome profile.

## Trial and visualization

[One current work record](records/trial.md) holds the business goal, expectations, rationale, skill use, checks and accounting. [verification-state.json](verification-state.json) identifies tested source files. [public/workflow.json](public/workflow.json) is a derived export for the existing project viewer; import it in http://127.0.0.1:5173 and enable Follow agent to receive this trial's story event. The viewer cannot directly read this chat.

## Data and limits

Six locations across Nylon, Apartment, Tiong Hoe and Alchemist, sourced 15 Nov 2026. No paid API, backend, account or analytics. Questionnaire answers remain in tab-scoped sessionStorage; refresh restores them and restart clears them. Google Fonts requests disclose ordinary connection metadata; system fonts remain a fallback. Official and map links leave the site when clicked. Illustrations are original code-generated artwork, not photographs of actual cafes. Three.js is lazy-loaded, pixel ratio capped, motion pausable and reduced-motion aware. Without WebGL the usable HTML journeys remain available.

Author functional verification passed; physical-device performance, cross-browser coverage, independent review and the user's completeness/quality judgment remain pending. No perfect-it pass was run.
