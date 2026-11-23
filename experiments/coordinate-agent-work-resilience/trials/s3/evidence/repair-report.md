# S3 correction round 1

Owner /root/e06_coordinator/s3_repair releases server/** on final. Scope: remove the injected empty-PUT early return from server/api.mjs; add server/clear-regression.test.mjs. Inspected createApp callers in CLI, provider tests and browser harness, plus API UI consumers. No caller/interface/config changes required. Other contributors' edits preserved.

R2 handler SHA256: D92E89C814820408F3D785574BD6A011CEFCA0BCEE6EDE13A757EC8E34CBBE0D
R3 handler SHA256: D701E9C20FF5F389DE954E43FA6022331B4020F8928FF9247FF7D909197EE4E4
R3 handler restores R1 exactly; no claim of distinct handler identities. Full R3 product/test manifest differs from R1 through the new focused regression. Existing provider tests unchanged SHA256: EB4F174B1F35BB276423E510096FE16091CC430799AAEB6B4F03EA326D294412. Browser harness unchanged SHA256: 12B62406AD251BC9E26D0E70708908EFCF39205C154F975784961E54C85E14A9.

TDD new regression: replace two IDs, clear, repeated GETs remain empty, subsequent ordered replacement works, then another clear/read. Actual red command node --test server/clear-regression.test.mjs exit1,1 discovered/executed,0 pass/1 fail: GET returned mill/nylon after successful empty acknowledgment. Then one-line fault removal. Same command green exit0,1/1 passed; unchanged regression SHA256 B37DFFEF3EA1D0B925C00F302D41A7647E7ADAC373EBB947C70127A347B3E089. Evidence repair-red.log/json and repair-green.log/json.

Full provider command node --test server/api.test.mjs server/clear-regression.test.mjs exit0,15 discovered/executed,15 passed; repair-provider.log/json. Existing empty-clear regression now passes too. No assertions weakened and no reviewer evidence edited.

Resources: node test processes created ephemeral loopback servers at port0; every server closes in finally, commands exited. No persistent process, port or profile remains. No packages added.

Not checked: current browser, consumer or build; independent reviewer owns R3 acceptance. Storage remains process-lifetime only. Reviewer must include new regression in provider command (server/*.test.mjs or explicit two files).
