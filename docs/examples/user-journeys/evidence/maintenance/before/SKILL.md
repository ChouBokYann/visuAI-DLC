---
name: verify-project-flow
description: Use when verifying fresh workflow export, viewer import and record inspection, or invalid snapshot rejection in this repository's React project viewer.
---

# Verify project flow

This is the project recipe exercised by [Exercise user journey](../../../../skills/verification/exercise-user-journey/SKILL.md). It covers the three features in the [feature map](features/README.md). It uses synthetic cafe records.

## Setup

From the repository root, install the React app's locked dependencies with `npm ci --prefix experiments/project-overview/react`. Node 22.12 or later is recommended by the app README.

Install isolated trial tools if they are unavailable. The author trial used Python 3.13 and PyYAML 6.0.2, which provides a wheel for that interpreter. The repository's general validation requirements pin PyYAML 6.0.1. This example's dependency choice applies to this local trial.

```sh
journey_tools=$(mktemp -d)
python3 -m venv "$journey_tools/python"
"$journey_tools/python/bin/pip" install PyYAML==6.0.2
npm install --prefix "$journey_tools/browser" playwright@1.58.2
export JOURNEY_PYTHON="$journey_tools/python/bin/python"
export PLAYWRIGHT_MODULE="$journey_tools/browser/node_modules/playwright/index.mjs"
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

Set CHROME_PATH to an existing supported Chrome/Chromium executable on the machine running the trial. The browser uses a fresh private profile. Dependencies may require network access during installation.

## Launch and doctor

Run the helper with a new absolute evidence-directory path outside the repository. Its parent must exist, and the evidence directory itself must not already exist.

```sh
journey_parent=$(mktemp -d)
node docs/examples/user-journeys/verify-project-flow/run.mjs "$journey_parent/evidence"
```

The helper launches this checkout's Vite app on an OS-assigned localhost port. It opens the page in its own browser and checks that Import snapshot is available. A failure to reach that state fails the run. It never attaches to a pre-existing listener.

## Drive and evidence

The helper executes all three mapped features through the real exporter CLI and browser controls. It preserves a uniquely named source fixture, the exported JSON, CLI output, browser proof and a machine-readable result in the evidence directory. Inspect the result and screenshots before claiming user-visible correctness. A nonzero exit means the run needs investigation.

The unique project name distinguishes a fresh import from the viewer's bundled sample. The helper checks exported values against the fixture, then compares the displayed summary with the exported record. Browser runtime errors fail the run.

## Cleanup and limits

The helper closes its own browser and server on success and failure. Evidence remains at the requested path. Keep it until reviewed or copied to the work record. Remove the isolated dependency directory only after its tools are no longer needed.

This recipe covers export, import, summary inspection and rejection. Lifecycle filters, keyboard navigation, chat focus, storytelling, worktree comparison, mobile layout and production deployment have separate verification needs. The existing browser-check.mjs covers additional viewer interactions with its own setup requirements.
