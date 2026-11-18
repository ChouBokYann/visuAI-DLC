# E05-A — final-removal persistence repair

## Purpose and criteria

Perry owns this local trial. The coordinator owns acceptance and grants the implementation owner the two source files below. Resolve reviewer finding **E05-R-01** using the [frozen task and criteria](brief.md). Restore actual persistence of an empty shortlist while preserving existing selection and failure behavior. Handoff for independent retest after the authorized repair.

## State and finding

The untracked fixture is copied from branch base `6f78181c528f0d4467934562d8619f8d5dc742de` with a [deliberate seed patch](../evidence/seed.patch). The [seed manifest](../evidence/integration/seed-app.sha256) matched all 32 files after review. `app/src/shortlist.ts` SHA-256 is `df8927c29c0d5c17d3fd038b423742a5eabbafa0095977e73c1a77077129ebca` and the initial `app/src/shortlist.test.ts` is `69f0827bfee7ed53756725600f08c84439d90922d2a37f29bab6405f4668c0e8`. The [original unit run](../evidence/seed-unit-tests.log) passed 8/8.

On the seed, both viewports displayed zero items after removal while storage retained `["nylon"]`. After reload both returned to one Nylon card and lost the empty-state heading and discovery action. The independent harness ran 16 checks with 10 substantive failures and exited 1. [Browser observations](../evidence/reviewer/seed-01/observations.json) and [command log](../evidence/reviewer/seed-01-browser.log). `App.tsx` filters the removed ID out of its session array and calls the storage writer from an effect. The empty-array early return in `writeShortlist` bypasses the existing write and error handling. This blocks criteria 1 and 3. Criterion 2 requires coverage on the corrected source.

## Ownership and execution

Only the implementation owner edits `app/src/shortlist.ts`, `app/src/shortlist.test.ts` and `evidence/author/`. The reviewer owns its harness and evidence and remains read-only on product files. The coordinator review server has been stopped and will be relaunched for the frozen candidate. You need no browser or server for this assignment. Use the installed npm tools from `app/` with an explicit workdir. Other contributors are present. Preserve all their edits and prior experiments. No extra delegation, Git/external state changes, new dependencies or related cleanup.

Read [Implement increments](../../../skills/implementation/implement-increments/SKILL.md) and [Address review feedback](../../../skills/implementation/address-review-feedback/SKILL.md). Establish a focused behavior-level regression in the existing test file, exercising a prior saved ID then clearing it and reading the result. Run it against unchanged seeded production source and retain observed failure, command/status/counts and the test/source hashes before repairing. A synthetic forced failure or setup error cannot establish the defect. Deliver the smallest repair that makes the original failed assertion pass and preserves explicit failure when the empty write is blocked. Retain all attempts. Run the checked-in unit command on fixed source. Keep production build and browser retest to the coordinator and reviewer.

## Return

Leave a short `evidence/author/` record linking exact paths/hashes, the red and green commands, exit codes, counts and relevant messages, the finding disposition proposed and any remaining uncertainties. Return full ownership to the coordinator when finished. Report **Ready for verification** only after the focused and existing unit checks pass. Independent browser and integration verification remain with their owners.
