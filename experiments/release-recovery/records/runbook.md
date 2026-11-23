# Disposable local staging runbook

Run commands from this experiment directory. Only one owner may issue control commands; no nested deployment and no concurrent switch. No production target or credentials exist. Root starts `node target/start.mjs` once; `target/state/run.json` identifies the actual owned PID, run ID, backend port and target port. Both listen on 127.0.0.1 with OS-assigned ports. The same API process must survive all four artifact transitions. Do not use Vite as the target.

Artifact bundles live at artifacts/A, artifacts/B and later artifacts/C. Their manifest.json names every dist/config file and SHA-256. A and C route /api/shortlist to /api/shortlist; B deliberately routes it to /api/shortlists. All share the built app. B is admitted only to this controlled failure experiment.

## Prepare and install

Read the frozen artifact manifest, current `target/state/active.json` if present, run identity and prior operation log before each action. Inspect host process/ports without reusing unknown listeners. All normal install/recover actions below are authorized for the local trial; no new permission is needed per switch.

`node target/control.mjs artifacts/A e07-install-a install`

This verifies manifest bytes, copies into target/state/releases/A, verifies the installed copy, atomically replaces active.json, and appends the operation to operations.jsonl. It rejects operation replay, release replacement and artifact tampering. A successful command proves switch completion only; `/__release`, installed file hashes, served asset hashes and browser behavior establish target state. `/health` proves only that the process answers.

If a command errors, inspect active.json, retained artifacts and operations.jsonl before considering a retry. Do not create another operation merely because output was uncertain. An unresolved outcome remains unknown and blocks dependent switching. Lost-acknowledgment reliability is not a scenario in this trial.

Before B, establish synthetic API IDs ['nylon','mill'] once and capture target/backend run identity and direct GET response. Browser checks may exercise add/remove only if they restore that known state and preserve intermediate evidence. They must not reset the backend between phases.

`node target/control.mjs artifacts/B e07-install-b install`

Observe actual installed B, health200, and the same user/API check failing. Record Installed / target verification failed. Do not silently fix B or edit its immutable directory.

## Recover promptly

After B's failure is independently recorded, preserve error/state/identity evidence and restore retained A:

`node target/control.mjs target/state/releases/A e07-recover-a recover`

The helper verifies retained A before switching. Independently check installed A, actual behavior and IDs ['nylon','mill'] on the same backend/run ID. Application rollback does not authorize a data reset or API restart. If retained A is damaged/missing or ownership is unknown, stop and report recovery incomplete. Do not reconstruct evidence or invent a backup.

## Diagnose and correct

Compare A/B configuration and direct backend /api/shortlist with B's configured route, retaining bounded observations. Correctness of A after rollback is mitigation evidence, not alone root-cause proof. Write one target-route regression before making C, demonstrate it fails B, keep its assertion bytes unchanged for C. Package C with `node records/package-release.mjs C /api/shortlist` after the failure is established. Relevant app tests/build may reuse valid exact-byte evidence; new target/config evidence must apply to C.

`node target/control.mjs artifacts/C e07-install-c install`

Independently check installed/served artifact identity, same browser checks at1440x1000 and390x844, unchanged state and stable backend. Record C verification separately from B failure and A recovery. No optional improvements consume the remaining correction allowance.

## Cleanup

Reviewer owns and closes only its Playwright browser/context. Root owns the API/target PID from run.json and its matching Start-Process record. Stop that exact owned process after final evidence; verify PID and listener closure. Do not terminate unknown listeners. Retain all source, artifacts, partial failures, logs and operations. Preserve previous experiments and protected refs using before/after hashes. No push, merge or issue publication authorized by this runbook.
