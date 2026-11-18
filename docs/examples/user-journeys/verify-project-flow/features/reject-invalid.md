# Reject invalid input

A reader sees an error for malformed JSON and can continue using the previously imported snapshot.

## Sub-features

reject-invalid covers an invalid import, an error message and retention of the prior project's records.

## How to get to it (user POV)

With the valid imported snapshot loaded, choose Import snapshot again and select a malformed JSON file.

## Driving it with run.mjs

Create a malformed JSON file in the evidence directory. Select it through the same Import snapshot button and file chooser. Expect a visible alert. Confirm the unique project identity and previous record count, then open PROBLEM-001 and verify its summary again. Capture the rejected-input state and resulting usable record.

## Gotchas

This is an expected input rejection. Its message can vary with the browser's JSON parser, so assert a visible error and retained state. Runtime exceptions are unexpected failures. Missing prerequisites remain incomplete coverage.
