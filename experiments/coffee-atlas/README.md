# Coffee Atlas

Local engineering-workflow trial: a cream illustrated map connects six coffee origins with source-backed listings from three Singapore cafe/roaster businesses. UI direction was passed to the installed Taste skill and applied directly. See [delivery evidence and decisions](DELIVERY.md).

## Run

This trial reuses the already installed dependencies of `../cafe-personality` via a local `node_modules` junction. It does not modify that experiment or install packages. In this directory, if the junction is missing and that dependency directory exists:

```powershell
New-Item -ItemType Junction -Path node_modules -Target (Resolve-Path ../cafe-personality/node_modules)
npm.cmd run dev
```

Development: http://127.0.0.1:17820 . Build and verify logic/types/fault control with `node check.mjs`. For the built preview:

```powershell
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 17821 --strictPort
```

The package file pins the versions observed locally. A fresh checkout without the existing dependency cache needs those packages installed separately; this trial performed no downloads and does not claim a lockfile-backed clean installation.

## Browser checks

```powershell
$env:ATLAS_BASE_URL = 'http://127.0.0.1:17821'
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = "$env:LOCALAPPDATA/ms-playwright/chromium-1234/chrome-win64/chrome.exe"
node browser-test.mjs
```

Use an existing compatible Chromium executable if this machine-specific cache is absent. Observed: Playwright 1.65.1 with Chromium 151.0.7922.34. Browser checks use their own headless profile and never read personal browser tabs. Output is in `../../output/coffee-atlas/`.

## Content and boundaries

`src/data.ts` contains dated first-party product/location links and attributed culture sources. Flavours are featured-lot examples. An online listing is not confirmation of branch stock or today's brewed coffee. Sold-out listings are explicitly marked. No live inventory, database, login, paid services, runtime external requests or location tracking.

Artwork and interface code are original to this trial; no cafe logos or third-party photography were copied. The initial badges are plain text identifiers, not official marks. Short factual summaries link to their sources; no source article or image is reproduced. React/Vite/TypeScript/Playwright retain their installed upstream licenses. Taste skill guidance remains at its installed location and is not vendored here.

This is a local host preview and dedicated browser test, not OpenShell containment or a production deployment. No commit/push has been made for this trial. Final aesthetic acceptance is the user's.
