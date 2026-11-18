# Experiment 04 — café shortlist with pstack-inspired

This is a separately runnable snapshot of the completed shortlist trial, preserved from `ebb5068`. It adds a three-café shortlist, comparison, removal/replacement and refresh persistence to Experiment02. Earlier experiments are unchanged. Packaging this snapshot is not another measured development run.

[Workflow and agent comparison](../cafe-shortlist-comparison/README.md) · [Independent22-case report](../cafe-shortlist-comparison/evidence/pstack/report.json) · [Source provenance](provenance.json) · [Experiment index](../README.md)

## Run

From this directory:

```sh
npm ci
npm run dev -- --port 5188 --strictPort
```

Open http://127.0.0.1:5188/. Use Find a café → café details → Save to shortlist. Save up to three, then open Shortlist. Story-result details also support saving. Try removal, replacement and refreshing.

## Verify

```sh
npm test
npm run build
BASE_URL=http://127.0.0.1:5188 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node .cursor/skills/verify-sidequest/scripts/shortlist.mjs
```

Use an installed compatible Chromium path on other platforms. The author helper drives private browser contexts and generates new local evidence under `evidence/shortlist/`. Save that directory under a unique run name before another run. Stop only the server you launched. Original independent evidence remains in the comparison archive; running this helper does not overwrite it.

App and helper files are unchanged from the reviewed source; the manifest records their hashes. Helper comments or the embedded project verification skill may retain the original worktree path/default port. Run from this new directory and use the URL override above. Historical author records and previous experiment metrics were intentionally not relabeled as this experiment.

## Result and limits

The original independent review passed22/22 checks. Unit tests and build also passed. See the comparison for exact test counts, author rework, shared coordination and verification differences. This is local Chrome verification, not physical-device testing, human design acceptance or production release. Existing café facts, model assets/license notices, lockfile and Google Fonts behavior are retained.
