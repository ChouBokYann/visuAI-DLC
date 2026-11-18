---
name: verify-sidequest
description: Drive the Sidequest café web app in an isolated Chromium context to verify story, search, saved shortlist, persistence and responsive keyboard behavior after changes.
---

# Verify Sidequest

Primary surface: Vite/React web UI; no database, auth, backend or seed step. Six curated cafés are bundled in `src/cafes.ts`. Run all commands from `experiments/cafe-personality-v2`. Existing installed dependencies include Playwright; do not reinstall unless missing.

## Launch

Run `npm run dev -- --port 5182 --strictPort` in a process session you own. Readiness is `Local: http://127.0.0.1:5182/` plus the doctor below. Keep its process/session ID for cleanup. Choose a different unused port if occupied; set `BASE_URL` for helpers to the chosen URL. Do not attach to an unknown instance.

## Doctor

`curl -fsS http://127.0.0.1:5182/src/shortlist.ts` must return the module with `sidequest-v2-shortlist`. Check the server is the process/session you just launched; an HTTP response alone does not establish ownership. Browser helper additionally requires the visible `Shortlist (0/3)` control on fresh load. If that fails, inspect the server log and checkout before driving.

## Drive

Run `npm test` and `npm run build` first. Then run:

```sh
node .cursor/skills/verify-sidequest/scripts/shortlist.mjs
```

The executable helper uses installed Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; override with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when necessary. `BASE_URL` defaults to port 5182; `EVIDENCE_DIR` defaults to `evidence/shortlist`.

The helper drives actual buttons, search results, story choices, native dialogs and keyboard events at 1440px and 390px. It verifies curated text and map destinations, the stored IDs, refresh, normalization, failed storage access and writes, removal/replacement, focus return and both page/dialog overflow. Storage seeds and failures are injected only at the browser's existing localStorage boundary. Normal journeys always save/remove through controls.

See [feature map](features/README.md). The original `browser-test.mjs` additionally checks story motion, editing, search filters, reduced motion and no-WebGL fallback. Run it against the same owned instance without replacing older evidence:

```sh
BASE_URL=http://127.0.0.1:5182 EVIDENCE_DIR=evidence/shortlist/regression PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:browser
```

It defaults to port 5175 and `evidence/` when these overrides are absent.

## Evidence

`evidence/shortlist/observations.json` records action paths, observed stored values, errors and raw timestamps. `trace-1440.zip` and `trace-390.zip` preserve actions and resulting DOM/screenshot states. Screenshots capture empty, capacity, comparison and storage-failure states. Inspect screenshots as well as assertions. Do not treat a build, a final screenshot, or internal setters as proof of the user path. A failing helper is a failed check; retain its report and fix the cause before retrying.

## Cleanup

Stop only the Vite process/session launched above (Ctrl-C in that session; never kill by process name). The helper closes its private contexts/browser in `finally`. Preserve all evidence after teardown and verify it still exists with `ls evidence/shortlist`. No shared browser, profile or database is used. localStorage and sessionStorage live in private ephemeral browser contexts, so concurrent runs can share a read-only Vite instance only when its owner agrees.

## Helpers

`node .cursor/skills/verify-sidequest/scripts/shortlist.mjs` is the executable proof harness. To inspect traces: `node node_modules/playwright/cli.js show-trace evidence/shortlist/trace-390.zip`.

When controls or journeys change, use `/maintain-verification-skill` to keep this map and helper aligned; re-run the changed recipe before claiming it works.
