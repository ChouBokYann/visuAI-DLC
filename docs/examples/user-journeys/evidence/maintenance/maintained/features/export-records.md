# Export workflow records

An author turns a Markdown record bundle into a JSON snapshot for the viewer.

## Sub-features

export-records covers a successful CLI export and read-back of its project, record IDs and problem summary.

## How to get to it (user POV)

Run scripts/export_workflow.py with the source directory, output file, --project, --baseline and --sample. The output must be outside the source bundle.

## Driving it with run.mjs

The helper copies docs/examples/business-context/baseline-b into the evidence directory and gives its authored metadata a unique project name and appends a per-run marker to PROBLEM-001’s summary. It invokes the actual exporter with JOURNEY_PYTHON, records its arguments, exit code and output, then reads the resulting file. Expect eight records and PROBLEM-001’s original summary followed by the exact per-run marker. The helper establishes this expected string before export. Expect the unique project name.

Retain the fixture, CLI output and snapshot for checking the source-to-output relationship.

## Gotchas

PyYAML must be installed in the chosen interpreter. The project argument must match the authored metadata. Fixture data is synthetic. Readable output alone does not establish the truth of its business claims.
