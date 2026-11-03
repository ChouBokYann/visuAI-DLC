# Local memory retrieval pilot

Follow-up to [issue #3](https://github.com/ChouBokYann/visuAI-DLC/issues/3), using the draft contract from PR #2. Human owner: @ChouBokYann. Agent responsibility: isolated setup, measurement, and this report. The user authorized proceeding in the session. Independent maintainer review is still pending.

**No overall winner is established.** Graphify returned code relationships quickly. Basic Memory returned decision/evidence text. codebase-memory-mcp could not initialize on this machine. None of these results demonstrates the complete question-to-project-goal experience or performance at 5,000 documents.

## Setup and protocol

Measured on Windows 11, Python 3.12.7; exact OS, fixture hashes, source revision, and frozen answer-key hash are in [manifest.json](manifest.json). Versions:

| Tool | Version and mode |
| --- | --- |
| [Graphify](https://github.com/Graphify-Labs/graphify) | installed `graphifyy` 0.9.37; AST `--code-only --no-cluster --max-workers 1`; query budget 2,000 |
| [Basic Memory](https://github.com/basicmachines-co/basic-memory) | 1.0.0 in isolated Python venv; local text indexing and `grep`, context 10 lines, max 20 matches; no embeddings |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp/releases/tag/v0.12.1) | 0.12.1 official Windows amd64 release; SHA-256 verified against release checksums |

CBM archive SHA-256: `4e4e0f16b45233af5c757a1fcbe3c3b16e9056375b1fbe2ce020b6de75dedcc0`.

Each tool received a separate identical copy of eight Markdown concepts and two synthetic Python files. [prepare.py](prepare.py) defines the source and checks dependency behavior. No private project code or model calls were used. One procedure reference points outside the copied corpus; it was not silently resolved.

[answer-key.json](answer-key.json) was frozen before query execution. Six exact-ID/symbol queries ran three times each through fresh CLI processes. Each process includes startup overhead; OS caches were not flushed. These are repeated CLI measurements, **not cold-cache or persistent MCP server measurements**. Initial query loops for the two tools overlapped, so contention also limits timing comparisons. Queries used native output budgets that are not equivalent; no combined leaderboard is appropriate.

## Speed

| Measurement | Graphify | Basic Memory | codebase-memory-mcp |
| --- | ---: | ---: | --- |
| Initial index, one observation | 1.200 s | 5.214 s | Blocked |
| Document query median, 9 observations | 0.613 s, no matches | 7.746 s | Not run |
| Code query median, 9 observations | 0.619 s | 7.666 s, no matches | Not run |
| Full refresh after two-file update, one observation | 0.848 s | 4.882 s | Not run |
| Freshness query, one observation | 0.703 s | 7.886 s | Not run |

Basic Memory project registration took another 13.669 s, excluded from its index measurement. Its index command reported ten observed/indexed files; that did not mean its `grep` interface retrieved the Python symbols. Graphify reported five nodes and seven edges from the two code files and skipped the eight documents.

[timings.json](timings.json) includes ranges. [raw/](raw/) preserves exit codes, stdout, stderr, exact command arguments, and wall-clock durations. Failed startup timings are not treated as successful indexing. A no-match response being fast does not make it useful.

The update probe appends a distinctive marker to one decision document and adds a same-named Python function. Both tools retrieved the marker in their supported track after refresh. These were **full refresh commands**, not a measurement of either tool's incremental/watch mode. The update happens after the initial queries and does not alter their answer key.

## Completeness and accuracy

This is an agent-reviewed retrieval audit, not a human-scored end-to-end answer benchmark. Only facts visible in the saved query payload count; opening another source file during evaluation does not fill a retrieval omission. No model generated answers, so answer hallucination rates and answer-level accuracy are unmeasured.

| Question | Basic Memory evidence | Graphify evidence |
| --- | --- | --- |
| D1: feature's goal contribution | 1/4 facts: feature realizes capability. Missing capability-to-goal edge, goal explanation, and unverified-benefit evidence. | No matches in code-only mode |
| D2: scope decision and impact | 4/4: affects feature, supersedes earlier decision, direct blockers first, transitive exploration deferred | No matches in code-only mode |
| D3: walkthrough passed? | 4/4: pending, no passing execution, assesses feature, uses procedure | No matches in code-only mode |
| C1: `can_start` behavior | No matches | 1/2: call to `blocked_dependencies`; return condition absent |
| C2: states that block | No matches | 0/2: symbol and call edges present; state predicates absent |
| C3: deployment conditions | No matches | 0/2 fully supported; partial support for the second fact: calls `can_start`, but no body/condition explaining readiness; verified-evidence condition absent |

Strict supported-fact recall: Basic Memory **9/12 document facts**, **0/6 code facts** through the tested grep interface. Graphify **1/6 full code facts plus one partial fact**; document extraction was disabled, so its empty document results are a mode limitation, not a rating of its semantic extraction capabilities.

All nine relevant document assertions retrieved by Basic Memory matched the fixture (9/9 checked). Both relevant call assertions returned by Graphify matched the Python source (2/2 checked, including the partially answered C3 fact). These tiny, different assertion sets are **retrieval fidelity checks, not comparable overall accuracy scores**. Extra contextual graph nodes/edges are not automatically false assertions. Raw evidence is in `bm-D1-0.json`, `bm-D2-0.json`, `bm-D3-0.json`, and `graphify-C1-0.json` through `graphify-C3-0.json`; the other trials are retained too. A second reviewer should verify this scoring.

## Setup failure and compatibility findings

codebase-memory-mcp exited before indexing with `could not load saved runtime settings`. An unrestricted retry and a fresh user-local cache attempt also failed. The isolated workspace cache was owned by the sandbox account. Upstream [runtime settings](https://github.com/DeusData/codebase-memory-mcp/blob/v0.12.1/src/cli/runtime_settings.c) and [Windows IPC directory checks](https://github.com/DeusData/codebase-memory-mcp/blob/v0.12.1/src/daemon/ipc.c) validate cache ancestry, ownership, and permissions. This suggests an environment/security-check compatibility issue; the exact failing check is not proven. No security checks were disabled or ancestor permissions changed. No CBM speed/completeness/accuracy score is assigned.

Basic Memory rewrote the isolated Markdown copies: it added `permalink` and reformatted YAML. Original contract fixtures remain unchanged. Its native text query exposed custom `visu.relations` as text but did not automatically traverse them to the goal. Adoption needs a round-trip compatibility check and a test of native relation/context APIs before writing an adapter. Its installed CLI also advertises OKF commands; their compatibility has not been validated here.

Graphify code-only queries returned graph structure, not the function bodies needed for behavior questions. Test its existing source retrieval and model-assisted document extraction before judging full capability or adding custom extraction.

## Reproduce and next comparison

Use a fresh checkout or preserve the previous `.bench-run` directory elsewhere first. Preparation refuses to overwrite an existing corpus. Install the recorded tool versions; the runner expects Basic Memory at `.bench-run/bm-venv/Scripts/basic-memory.exe` and CBM at `.bench-run/tools/cbm/codebase-memory-mcp.exe`. Graphify must be on PATH. Basic Memory's config and home are isolated by the runner; no agent configuration install command is used.

```powershell
python benchmarks/issue-3/prepare.py
# Preserve committed observations; suffix all new outputs on reruns.
$env:BENCH_RUN_SUFFIX = '-repeat'
python benchmarks/issue-3/run_pilot.py index graphify
python benchmarks/issue-3/run_pilot.py index bm
python benchmarks/issue-3/run_pilot.py query graphify
python benchmarks/issue-3/run_pilot.py query bm
python benchmarks/issue-3/refresh.py graphify
python benchmarks/issue-3/refresh.py bm
# Summarizes the original unsuffixed observations, not a suffixed rerun:
python benchmarks/issue-3/summarize.py
```

The next benchmark needs CBM initialization resolved, persistent MCP sessions, serial timing under a shared budget, real incremental updates, equal retrieval budgets, and native multi-step retrieval for each tool. For example, follow feature -> capability -> goal and retrieve source bodies for behavior questions. Keep those results separate from this initial one-query pilot. Any model-backed extraction needs a selected provider and cost/data agreement first.

Do not adopt a winner from these numbers. The useful finding for our contract is that **storing relationships is not enough: the selected retrieval path must follow them and return the evidence needed by the user's question**.
