# Frozen black-box criteria

Frozen before viewing either implementation. The only specification read was BRIEF.md.

Each case is pass/fail from observed filesystem state plus CLI JSON and exit status. A failure is not excused by an error flag if files changed. Results preserve command output, actual filenames and SHA-256 hashes. Cases are independent and continue after failures.

1. Preview is read-only and lists requested changes in order; apply preserves exact bytes and unrelated files; undo restores originals.
2. Standard quoted CSV and Unicode names work, as do swaps and longer cycles.
3. Apply refuses stale source bytes, new occupied destinations and a different root without mutation.
4. Preview rejects missing/duplicate sources, duplicate destinations (including Windows case variants), invalid/path names, occupied unrelated targets, and source/target symlinks when creation is supported.
5. Undo refuses changed target bytes and newly occupied original names without mutation.
6. Existing plan/journal files retain exact bytes; repeated apply and undo refuse without mutation.
7. A verified Windows read-sharing file lock denies rename on the second source. Mid-operation failure must restore all original names/bytes and report failure. The lock is always released.

Run `python review/evaluate.py IMPLEMENTATION_PATH OUTPUT_DIR` from the trial directory, or use absolute paths. OUTPUT_DIR must be new and resolve beneath this repository's output/workflow-transfer. Only synthetic fixtures there are operated upon. No recursive deletion occurs. `--self-check OUTPUT_DIR` verifies the evaluator's assertion mechanism and Windows lock probe without running an implementation; a separately supplied defective starter is the behavioral negative control.

Limits: finite examples, no races/crash recovery/performance coverage, no internal plan/journal schema assumptions, no exhaustive malicious serialized-plan generation. Symlink and Windows-lock support are explicitly reported as skips when unavailable. A passing lock probe establishes the OS constraint, not which internal rename step the application attempts first. CLI errors must contain a nonempty diagnostic beyond `ok`; semantic usefulness of wording remains a human review item.
