# E09 canonical synthetic delivery record

Owner root; sponsor Bok. Approval: user explicitly approved the proposal and waived issue-first/other-maintainer gates for this local trial. Limits: one initial attempt per available mode, one setup retry per tool, two correction rounds total. Original authority and hashes are captured in baseline.json before fixture edits or installs.

| User expectation / basis | Requirement | Criterion and artifact | Observed evidence |
|---|---|---|---|
| User asked to test engineering workflow and repository compatibility; synthetic API task is an agent-proposed accepted test fixture | REQ-01 | Optional nullable note; POST omission→null, PATCH omission preserves, exact strings up to500 codepoints, invalid mixed updates leave state unchanged. fixture/service.cjs | checks/service.test.cjs against real loopback HTTP; evidence/service-red.log missing module, evidence/service-green.log passes. |
| Preserve work and distinguish missing runtime from failed behavior | REQ-02 | Baseline captured before mutable trial work; missing/changed/wrong-revision/runtime blocks dependent action | records/baseline.json, checks/readiness.test.cjs, evidence/readiness-red.log and readiness-green.log; timestamped successful gate records. |
| Follow requirements through deployment and failure | REQ-03 | Build identified local artifact, verify A, observe bad-route B, recover exact A and retained note | checks/release.cjs, evidence/local-release.json:200→404→200; A digest equals recoveredA; listener closed. In-process loopback target, not remote/cloud. |
| Tool integration must retain contracts, authority and failure evidence | REQ-04 | Headroom preserves message order/tool IDs, critical instructions and complete typed data; reports any zero savings honestly | records/headroom-input.json, checks/probe_context.py, evidence/headroom-output.json and headroom-result.json:19 assertions pass; no useful compression demonstrated. |
| Runtime sandbox compatibility | REQ-05 | Actual OpenShell policy allow/deny and restart checks, then combined mode only after individual pass | Not run: supported OpenShell CLI backend not available within approved no-new-OS scope. Docker engine availability alone is insufficient. |

Decision DEC-01: select Headroom library agent/lossless mode with ML disabled to exercise a low-cost local boundary without paid inference, model weights or active-host wrapping. It exposes a conservative fallback; it does not represent all modes. Revisit with an accepted tokenizer/model/proxy setup and actual model budget if useful compression or agent performance needs measurement.

Decision DEC-02: do not install a new WSL distro, build native Windows OpenShell, or launch a substitute containerized gateway without a supported scoped plan. Stop its mode as not-ready and retain findings. Revisit on an explicitly selected supported Linux/WSL environment.

Decision DEC-03: retain the existing Docker service running because it now hosts15 unrelated running containers. The operator started Docker during this trial, but those workloads were not created or owned by E09. No container stop/delete was performed. A later owner can decide when to stop Docker; cleanup must not interrupt unrelated work.

Attempt ledger: readiness test initial red (implementation absent), then green; fixture test initial red (implementation absent), then green. These do not demonstrate a behavioral wrong implementation in the red phase; negative gate cases and HTTP assertions supply actual behavioral checks. Headroom install first attempt succeeds, no setup retry used. Correction round1 fixes a probe named headroom.py that shadowed the installed package; initial failure retained as headroom-correction1-before.log/json. Assertions unchanged. Final Headroom run completes. No second correction, no OpenShell or combined execution. Shared allowance never reset.

No human product-acceptance claim, independent reviewer claim, live-agent comprehension claim, or universal compatibility claim. Exact model/token usage for the host is unavailable. SDK-reported estimated token counts do not measure this conversation's spending.
