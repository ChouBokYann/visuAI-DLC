# Import and inspect a snapshot

A reader imports a fresh export and opens a record's summary.

## Sub-features

import-inspect covers file selection, successful import and reading PROBLEM-001.

## How to get to it (user POV)

Open the viewer, choose Open records, select the freshly exported JSON, then select Finding a work-friendly cafe to open its summary.

## Driving it with run.mjs

Start with export-records complete and the owned viewer ready. Use the button named Open records and its file chooser to upload the exact CLI output. Wait for the unique project name. Select the node with data-id PROBLEM-001 and compare the visible Record summary text with that record in the exported JSON. Capture the browser actions and the resulting summary screenshot.

## Gotchas

The initial screen contains similar sample records, so a screenshot of a cafe node alone cannot prove import. Check the unique project identity. Snapshots are held in memory and a refresh requires another import.
