# Persistent MCP and relationship compatibility comparison

This extends the initial pilot for [issue #3](https://github.com/ChouBokYann/visuAI-DLC/issues/3). The user requested continued comparison. Tool versions and frozen questions remain unchanged. Graphify's MCP extra was installed into an isolated benchmark venv; no user agent configuration was changed. Raw results and failed calls are retained; stderr display logs have trailing whitespace normalized. The MCP SDK used was 2.3.0.

**Provisional fit: Basic Memory for project understanding; Graphify for code navigation.** No all-purpose winner is established, and codebase-memory-mcp remains unmeasured because of a confirmed Windows permissions incompatibility.

## Comparison

| Metric | Graphify 0.9.37 | Basic Memory 1.0.0 | codebase-memory-mcp 0.12.1 |
| --- | --- | --- | --- |
| Persistent MCP startup | 2.319 s, one measured session | 6.615–7.544 s across three sessions | Blocked |
| Warm relevant lookup | Code graph query: 1.7–2.0 ms | Document search: 33–49 ms; full note reads: 46–47 ms | Not measured |
| Project-document completeness | Not evaluated: extraction remained code-only | Single search: 9/12 facts; guided full-note retrieval exposes all 12/12 | Not measured |
| Code behavior completeness | Graph only: 1/6 full facts + 1 partial; graph locations + explicit source reads expose all 6/6 | Symbol searches: 0/6; direct reads of supplied Python file paths expose all 6/6 | Not measured |
| Relationship accuracy | Checked call edges match source; graph lacks behavior predicates | Native-link projection: 8/8 expected edges, no extra edges; all 8 original YAML metadata objects preserved | Not measured |
| Feature → capability → goal traversal | Not tested with model-backed document extraction | YAML-only: 0 edges; native Markdown links: complete chain at depth 3 | Not measured |
| Adapter requirement for our contract | Document extraction/profile preservation still needs testing | Small deterministic projection of declared YAML relationships to native wikilinks works on fixture | Unknown |
| Current role supported by evidence | Code navigation plus source access | Project memory and scoped relationship discovery | Retain as an unevaluated code-memory candidate |

Timing ranges above are the per-operation medians of trials 1 and 2, after trial 0. They exclude server initialization and are based on only two warm observations per operation. Tools ran serially in this round. The first Basic Memory request in each session took about 1.2–1.5 s for lazy initialization; do not assume the first user query will be 50 ms. Empty code/document searches are not credited as useful fast responses. Native output budgets and task scopes still differ, so there is no defensible overall speed ratio.

## What changed in the comparison

The first pilot timed a new CLI process per query. Persistent stdio MCP sessions remove most of that startup cost. [mcp_probe.py](mcp_probe.py) uses the installed MCP SDK, saves tool schemas and full responses, times initialization separately, and closes each server after the session. [round2-summary.json](round2-summary.json) contains derived measurements; raw files are `raw/bm-mcp*.json` and `raw/graphify-mcp.json`.

The original query keys are still frozen. Additional calls are explicitly guided follow-ups, **not proof that an agent autonomously found the right files**. Basic Memory's symbol search returned no Python hits, but `bm_read` retrieved the supplied Python paths. Graphify's `get_node` returned locations, not function bodies; the separate source-read fallback follows only those returned paths within the fixture root. Its saved content is in `raw/graphify-source-fallback.json`. Reading both Python files supports all six code facts; this is not graph-only completeness.

Full-note reads of feature, capability, goal, decision, and evidence expose the twelve document facts, including pending verification. That is a retrieval-coverage review, not a measured generated-answer accuracy score. The same agent designed and reviewed this tiny synthetic fixture; independent scoring is still needed.

## Native relationship compatibility

`bm_context` at depth 3 returned zero relations for the canonical `visu.relations` YAML. We then created a **separate** project from the original corpus and appended this native representation for each declared edge:

```markdown
## Relations

- realizes [[capability-blockers]]
```

[linked_fixture.py](linked_fixture.py) performs this benchmark-only projection. It refuses inferred edges and missing target files. No canonical repository documents were modified. Basic Memory then returned all eight expected typed edges, including `realizes`, `contributes_to`, `supersedes`, `assesses`, and `uses_procedure`, with no extra edges in this fixture. [audit_round2.py](audit_round2.py) verifies exact edge-set equality and preservation of all eight original YAML metadata objects after indexing.

The warm native-link context call took 54.7 ms. It returned related entity identifiers with null bodies, so goal prose and pending evidence still require explicit note reads. It also returned both old and new decisions: retrieving `supersedes` is not the same as automatically enforcing effective-version semantics. The native link itself does not carry our full provenance fields; the YAML remains authoritative. A production adapter would need update/deletion synchronization, inference handling, and version/provenance tests before adoption.

## Failures retained and resolved

- Basic Memory rejected the initial context request's `since=2000-01-01`: the tool limits the timeframe to one year. The corrected `365d` calls succeeded. This also requires attention for long-lived project history; old related records were not tested.
- `bm_read` rejected `max_tokens` for Python files. Removing this note-only option allowed whole-file reads. For Markdown, supplying `max_tokens` returned body slices without the YAML required by this audit; whole-note reads preserved it. Initial errors are retained in `bm-mcp.json`, and corrected calls in `bm-mcp-followup.json`.
- Graphify's existing install lacked the MCP extra. An isolated `graphifyy[mcp]==0.9.37` environment resolved that setup failure; no installed global tool was modified.
- A fresh CBM cache at `C:\visuAI-DLC-benchmark-issue3-cache` passed the earlier settings stage, but initialization then explicitly rejected an untrusted-account mutation permission on the `C:\Users\maker` ancestor of its coordination directory. Upstream [main.c](https://github.com/DeusData/codebase-memory-mcp/blob/v0.12.1/src/main.c) only exposes an alternate coordination parent behind the compile-time `CBM_ENABLE_TEST_SEAMS` flag; [ipc.c](https://github.com/DeusData/codebase-memory-mcp/blob/v0.12.1/src/daemon/ipc.c) selects the Windows local-app-data directory by default. We did not weaken permissions, bypass checks, or substitute a custom build. A compatible Windows account/environment or another supported OS is needed for an unmodified-binary comparison.

## Reproduce

Use the initial pilot setup and isolated corpora. Run the plans in order; use new output filenames because observations are never overwritten:

```powershell
.bench-run/bm-venv/Scripts/python.exe benchmarks/issue-3/mcp_probe.py bm <new-output.json> --plan benchmarks/issue-3/plan-bm.json
.bench-run/bm-venv/Scripts/python.exe benchmarks/issue-3/mcp_probe.py graphify <new-output.json> --plan benchmarks/issue-3/plan-graphify.json
.bench-run/bm-venv/Scripts/python.exe benchmarks/issue-3/mcp_probe.py bm <new-output.json> --plan benchmarks/issue-3/plan-bm-followup.json
python benchmarks/issue-3/linked_fixture.py
.bench-run/bm-venv/Scripts/python.exe benchmarks/issue-3/mcp_probe.py bm <new-output.json> --plan benchmarks/issue-3/plan-bm-linked.json
python benchmarks/issue-3/audit_round2.py
```

The Graphify server interpreter is `.bench-run/graphify-mcp-venv/Scripts/python.exe`; install `graphifyy[mcp]==0.9.37` there first. The audit summarizes the committed named observations; alternate output names require a separate run directory or corresponding audit paths. The linked fixture refuses to overwrite an existing project corpus. Do not rerun it against a previously registered project without preserving the earlier run.

Remaining gaps: model-backed Graphify document extraction, successful CBM startup, true incremental updates/deletions, memory/CPU profiling, large corpora, older historical records, matched retrieval budgets, and independently scored end-to-end answers. These results support testing a small Basic Memory integration next, not building a replacement memory engine.
