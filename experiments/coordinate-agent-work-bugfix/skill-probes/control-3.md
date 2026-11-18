# Final saved cafe persistence

**Current verdict — verification pending.** Perry owns this authorized local fix. The working state is C0 plus an uncommitted change to `app/src/storage.ts` whose hash is unknown. W1's DONE message needs reconciliation with host process state. Its test log predates the edit and reports zero tests. R1's PASS applies to C0 and omits reload. Keep W1's ownership of `app/src/storage.ts` and `app/src/storage.test.ts` in place and leave W2 unassigned.

**Next assignment — W1, implementation and focused verification.**

- Coordinator checks W1's status through the host. If active, deliver this assignment to the same worker and wait for its terminal result. If terminal, reconcile its returned artifacts with the working tree before reopening the assignment. Keep one writer for the two owned paths.
- Inspect the C0 diff and preserve the existing edit. Reproduce at the storage boundary by saving one cafe, removing it, and reading persisted state through a fresh load. A persisted empty list must load empty after deletion. Check the existing first-load behavior separately because the fix touches the distinction between missing and empty saved state.
- Finish the scoped fix and regression test as needed. Run a focused check that actually discovers and executes the named regression. Return to the coordinator the baseline, changed paths, digest of the reviewed patch or exact file contents including any untracked test, test invocation, named test and count, output pointer, and limitations. Report completion through the host. Browser verification will use a different environment path from the two failed setups.

**Independent review — after W1 reaches terminal state.**

- Coordinator pins the finished tree identity and supplies the patch, test artifacts and acceptance criterion to a fresh browser-capable reviewer if supported by the host. Scope is read-only source review and local runtime verification. Check the patch against C0, rerun the focused test, and verify that the browser serves this exact tree.
- Check browser access before provisioning. Use a coordinator-recorded app process on a verified free port with a distinct origin and an isolated browser context. Leave port 5190, its listener and its origin data alone. Create one saved cafe in the isolated fixture, remove it through the UI, confirm empty before refresh, then refresh the same origin and confirm it remains empty. Return verdict, tested tree identity, origin, steps and observations, source findings, and artifact pointers.
- If host browser capability is unavailable, complete independent source and focused test review where possible. Return the exact runtime blocker and the pinned patch plus fixture steps for Perry or a browser-capable host. Keep runtime acceptance open and record the two prior failures in the work record.

**Integration and cleanup — coordinator to Perry.**

- Reconcile the final local diff with the pinned review identity and existing work. Confirm the worker has exited and reconcile ownership. Run the appropriate local checks on the combined tree and record discovered test counts. Any material tree change requires fresh affected evidence. Mark verified only when the final tree has a passing regression and independent runtime reload evidence.
- Keep one local work record with Perry, baseline and final identity, paths and ownership, original and new logs, reviewer result, process/origin ownership, blockers and next owner/action. Preserve the patch, tests and evidence if blocked. Stop only processes started and identified for this task and dispose only task-created isolated fixture data after retaining evidence. Hand the local result and outstanding checks to Perry. Scope authorizes local work only.
