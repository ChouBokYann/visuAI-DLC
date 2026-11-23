# S2 API handoff

Owner /root/e06_coordinator/s2_api; human Perry, acceptance Bok issue13. server/** ownership released at 2026-11-21T03:37:11.0068356Z. Other contributors' files untouched. Independently implemented from S2 stub, no finished S1 source copied.

Scope reached server/api.mjs and new server/api.test.mjs. No caller signature/config/catalog changes; createApp export and command-line server preserved. C1 digest verified 9d79794ba38d85eb3ffb40c9225330fd466e6be543e0029b1a1b3a8a36b82925.

Provider now supports initial/read/ordered replacement/empty clear and JSON400/version409/body422 validation precedence with useful error envelope and rejected writes preserving state. Additional unknown route/method responses are explicit.

TDD command node --test server/api.test.mjs: red exit 1, 14 discovered/executed, 0 pass/14 fail (fixture501); green exit 0, same14 tests all pass. Raw logs api-red.log/api-green.log and JSON command/exit/timestamps/hashes retained. Test digest compared equal after runs: 4FD191B88FB14DF74621961E59A4DE849F63C8CA701AB50E14F82D87B95EBFE3. Source digest: 675DC3CF5B12C4B0E9CEF7588AFC8A25E46CEB87C3C84ABA1A127DF12F9CC95C.

Each test owns a new loopback server on port0, closes all connections and awaits close in finally. Both Node test commands exited. No persistent process/port/browser profile remains and no resource is transferred.

Not checked: consumer integration, browser journeys, build; coordinator/reviewer own those. Storage intentionally lasts only for API process lifetime. No packages added.
