# S1 UI implementation handoff

Status: Ready for independent verification. Owner /root/e06_coordinator/s1_ui releases src/** on final response. No processes, ports, profiles or persistent resources were created. No package changes. Other contributors' paths untouched.

Initial dispatch: explicit unaccepted C2 with missing authority. Reported missing pin before any source edits (ui-initial.md and coordinator host transcript). Coordinator subsequently supplied accepted contracts/shortlist-v1.json; Get-FileHash confirmed SHA256 9d79794ba38d85eb3ffb40c9225330fd466e6be543e0029b1a1b3a8a36b82925. C2 was never implemented.

Changed src/shortlist.ts from localStorage to GET/PUT C1 with validated acknowledgments. ShortlistSession serializes requests, retains last acknowledged IDs, marks failed initial load unavailable, and retries the failed request. App.tsx connects state and disables saves/removals during load/pending. ShortlistView.tsx provides loading/error/retry without claiming an empty saved list before successful load. Story/discovery logic unchanged. No existing localStorage data read or migrated.

Tests/mapping: retained inherited addCafe unique/capacity/replacement assertions, and all five logic.test.ts checks unchanged. Replaced localStorage recovery normalization with strict API representation rejection, old empty-write storage check with empty C1 PUT acknowledgment, and storage-error check with HTTP/network/malformed/version/ID rejection plus acknowledgment retention and retry. Two session checks cover initial/pending edit prevention, no optimistic success, failed-load GET retry and invalid-write retention. Browser reviewer still owns integrated persistence/order/compare and actual DOM behavior.

Commands/results:
- npm test -> ui-red.log, exit 1: 9 tests, 6 pass/3 fail, actual legacy implementation returned storage state/boolean instead of API acknowledgment and did not reject invalid responses. Legacy function invoked supplied fetch stub as storage factory, producing retained asynchronous assertion diagnostics.
- npm test -> ui-boundary-green.log, exit 0: same four boundary assertions plus five inherited logic checks, 9/9 passed.
- Added two session tests before session implementation. npm test -> ui-state-red.log exit 1: 11 tests, 9 pass/2 fail (required session absent).
- npm test -> ui-green.log exit 0: 11/11 pass with session test bytes unchanged. npm test -> ui-final-tests.log exit 0: 11/11 pass after UI wiring. No tests weakened.
- npm run build -> ui-build.log exit 2: incomplete initial wiring due CRLF replacement mismatch. Fixed callers.
- npm run build -> ui-build-2.log exit 1: TypeScript passed, Vite hit sandbox path-access restriction. Retained failure.
- npm run build with explicit approved escalation -> ui-build-approved.log exit 0; production build passed. Existing large Room chunk warning retained.

Current source/test SHA256 values are in ui-source-hashes.json. Source is dirty/untracked trial files from immutable fixture, no commit. API and browser integration not claimed. Independent reviewer is next owner for checks/evidence only; coordinator owns acceptance.
Final text-only correction: replaced encoding replacement character in new loading copy with ASCII ellipsis after build; build evidence predates only this text substitution. Final independent build must use current manifest.
