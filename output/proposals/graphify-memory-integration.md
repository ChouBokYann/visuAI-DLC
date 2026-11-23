# [Proposal] Ship local Graphify memory integration for lifecycle skills

Status: Proposed, investigation only; no implementation acceptance claimed. Refines the existing local proposal rather than superseding it with a competing proposal.

## Change and lifecycle process
Provide an installable local memory integration shared by skills across all six lifecycle processes. Skills write the existing knowledge contract; the integration validates, indexes and retrieves those records through Graphify.

## Problem and need
Installing this repository currently supplies documents and validation code, but no supported memory runtime. Future skills need a consistent way to connect decisions and features to goals, retrieve their sources, and refresh knowledge after edits. The benchmark demonstrated a candidate workflow but its disposable scripts are unsuitable as a user-facing package.

## Proposed solution
Package a small Python integration with an optional `graphify` extra, provisionally using `graphifyy[mcp]==0.9.37`. Core skills, Markdown/Git navigation and canonical records must remain usable with neither Graphify nor the visualization platform installed. Reuse the existing knowledge validator and Graphify's graph/query capabilities. Keep canonical Markdown/YAML authoritative and store a rebuildable derived graph per project. Provide documented CLI operations for indexing/refreshing a selected bundle and querying a bounded neighborhood with source references. Use the supported Graphify CLI/MCP boundary where practical. Use Graphify for optional discovery suggestions; never treat its candidate set as exhaustive. Contract-compliant bounded retrieval starts from an explicitly selected canonical concept ID and enumerates the complete canonical multigraph for the selected immutable baseline using public NetworkX operations, retaining every relationship and source. This changes the original candidate-enrichment design: enrichment alone cannot recover omitted neighbors. Graphify remains the discovery/interoperability layer; the small exact traversal is our semantic adapter, not a second persistent memory database. Private Python helpers are research probes, not a promised stable integration API. Do not silently modify agent configuration. The initial interface is CLI discovery plus exact-ID retrieval; direct upstream MCP startup is an optional advanced interface with clearly documented semantic limits, not the contract-compliant skill endpoint.

## Scope
- Included: optional package metadata and installation instructions; a supported Graphify dependency; validated document-to-graph conversion; project-local cache; bounded retrieval; update/delete/rename handling; one end-to-end example; integration tests; upstream attribution.
- Excluded: benchmark reports/raw data and comparison tools; Basic Memory/CBM dependencies; rendering UI/server; automatic agent configuration changes; model-backed extraction; creation of all lifecycle skills; package-registry publication.
- Preserve unknown document metadata, relationship provenance and declared/inferred distinctions. Source documents must never be rewritten by indexing. Reject unsupported semantics rather than silently dropping them.

## Alternatives and tradeoffs
- Reuse Graphify directly: smallest dependency footprint in our code, but does not establish preservation of the contract's YAML relationships.
- Thin adapter (proposed): maintain only the translation and lifecycle boundary; Graphify remains the engine. A rebuildable cache avoids a second authoritative store.
- Own memory engine: rejected because the benchmark does not justify its implementation and maintenance cost.
- Do nothing: preserves research status but does not meet the requested install experience.
- Revisit if the integration cannot preserve evidence, baseline identity, or relation semantics with a small adapter.

## Tools and services
Python packaging, Graphify, existing PyYAML validator, and local filesystem access. Installation downloads dependencies from package sources; normal document indexing/retrieval must run locally without API credentials or model calls. No paid services. The release metadata declares Python >=3.10, Apache-2.0 with LICENSE-MIT and NOTICE retained; actual minimum-Python resolution needs a clean installation matrix. Core dependencies include NetworkX, NumPy, RapidFuzz and numerous tree-sitter grammars; the MCP extra adds mcp>=1,<3 and starlette>=1.3.1,<2. Avoid optional model, database, video, watch and rendering extras. Standard-library runtime dependencies and package-size/platform compatibility must be checked on the selected support matrix before release. Installation must fail clearly on unsupported environments. Invalid input must leave the previous valid index intact.

## Acceptance criteria and validation
- [ ] Base installation and a Markdown/Git skill walkthrough work without Graphify, MCP, a server or the visualization platform. Optional dependency failure leaves source records usable and gives actionable setup guidance.
- [ ] Every result names repository, immutable knowledge commit, bundle, selected concept, checkpoint reference when supplied, filters, traversal limits and omitted/truncated scope. Reject unpreserved dirty inputs for checkpoint queries rather than silently labeling them reproducible.
- [ ] Each source reference resolves to the selected revision, not the live working-tree file. Two checkpoints with the same concept IDs stay isolated; querying an older checkpoint still retrieves its historical rationale/evidence.
- [ ] Direct `affects` relationships remain distinct from potential downstream dependencies. An impact walkthrough identifies inspected scope and unknowns; reachability never proves breakage or goal achievement.
- [ ] Parallel relationships, multiple sources and declared/inferred variants survive exact-ID retrieval independently of Graphify discovery omissions. Test the fixture and bounded-completeness rules in the design decisions below.
- [ ] A two-checkpoint walkthrough retrieves a changed decision, goal contribution and mixed evidence without promoting old tested revisions to current verification. Checkpoint/architecture records remain ordinary source-linked Markdown outside the validated concept bundle; no new schema types are introduced.
- [ ] Fresh-environment installation with the Graphify extra includes the supported Graphify runtime and exposes documented commands without benchmark directories or manually configured benchmark environments.
- [ ] An example skill-produced bundle can be indexed, then queried to retrieve Feature -> Capability -> Goal with source paths and relationship metadata.
- [ ] Retrieval supports explicit scope/baseline and bounded results, including a truncation indication where applicable.
- [ ] Edits, deletes and stable-ID renames are reflected after refresh; failed validation leaves the previous valid cache usable.
- [ ] Duplicate identities, malformed YAML, unresolved targets and unsupported schemas fail clearly without changing source files.
- [ ] Inferred relations and pending/failed evidence remain distinguishable; no inference or status is promoted to verified.
- [ ] Indexing, refresh and retrieval work without model API calls; test with model credentials absent and audit upstream paths used.
- [ ] Two project directories remain isolated; competing refreshes cannot publish a mixed or corrupt graph.
- [ ] A fresh-install smoke test and integration tests cover the above; package contents exclude research artifacts.
- [ ] Usage documentation covers optional installation, refresh, querying, advanced MCP startup limitations and cache removal/rebuild.

Example walkthrough: provide a goal, capability, feature and decision bundle, index it, query the feature's contribution, change the decision, refresh, and retrieve the revised source-backed relationship. Missing target: reject the refresh with the offending path and ID, preserving the last valid index.

## Ownership and dependencies
- Human owner: ChouBokYann.
- Agent responsibility: integration proposal, package implementation and validation once accepted.
- Proposed affected paths: pyproject.toml, src/visuai_dlc/, tests/, scripts/validate_knowledge.py only if extraction/reuse requires it, README.md, docs/integration/. Retain existing validator callers.
- Related: #1 knowledge contract, merged PR #2; #3 benchmark and draft PR #4 as research evidence only.
- Branch: existing graphify-memory-integration currently points to the earlier post-PR-2 base. Investigation observed main at `910427ed04a4e9e57ec2bf32e0017725823201ee` after merged PR #5. Before implementation, reconcile/update the integration branch in an isolated worktree against that approved baseline; do not switch the shared checkout or overwrite coordinator work. No benchmark merge dependency.
- Review: another maintainer accepts scope/criteria before implementation, as required by workflow.md. Human sponsor: ChouBokYann; eligible independent maintainer: perryong. This investigation does not create a grant or self-approve work.
- Direction: NORTHSTAR.md, methodology.md and automation.md at the inspected main revision remain draft even though PR #5 merged. Use their optionality/digital-thread intent as proposal inputs, not adopted authority. Existing AGENTS.md/workflow.md remain the contribution gate.

## Sources, impact, and risks
Upstream: https://github.com/Graphify-Labs/graphify. Benchmark evaluated Graphify 0.9.37; release/interface verification is recorded below. A provisional pin still needs clean-install and integration validation before release. Reuse through dependency installation rather than copying the upstream engine. Preserve required notices for any adapted code.

Main risks: upstream graph format changes, metadata loss, stale cached relationships and unsafe concurrent refresh. Tests must cover these boundaries. Rollback removes the integration and derived cache while leaving canonical documents intact. The measured synthetic benchmark is not production-readiness evidence.

## Investigation evidence (2026-11-04)

**Repository findings:** issues #1 and #3 remain open, PR #2 is merged, PR #4 remains a draft benchmark against issue-1-document-contract, and PR #5 merged the direction drafts. No existing integration issue or PR was found. Preserve `.bench-run/`, `output/` and other contributors' branches. The old reuse assessment is a dated pre-benchmark assessment, not current runtime evidence. No Ruflo tools were exposed in this session's tool inventory.

**Verified release/interface facts:** the PyPI distribution is `graphifyy`, not `graphify`. Version 0.9.37 has entry points `graphify = graphify.__main__:main` and `graphify-mcp = graphify.serve:_main`. `python -m graphify.serve --graph PATH --transport stdio` is supported by the inspected CLI; HTTP exists but is out of this integration's initial scope. MCP exposes query_graph, get_node, get_neighbors, shortest_path and graph statistics, plus unrelated GitHub PR tools. Avoid those GitHub/network operations in the local skill path. CLI `extract` supports model-backed document extraction; `--code-only` skips documents, so neither directly replaces deterministic knowledge-v1 projection.

**Artifact identity:** verified the published wheel SHA-256 `ffaccb4bbe70334674e14cf6e24cc6e22c52d2fc3674d1a38f4a903db10cbb3e`. The installed serve.py exactly matches that wheel, SHA-256 `8b3ea9065bc1aaa7f686162ac9830592a09a147e9cde995b143175f8a5ca889d`. This is a verified release candidate, not a claim that it is the latest version or that private helpers are stable. Package source: https://pypi.org/pypi/graphifyy/0.9.37/json ; upstream: https://github.com/Graphify-Labs/graphify . The wheel supplies LICENSE, LICENSE-MIT and NOTICE; preserve notices if redistributing/adapting material. Full transitive license audit remains a packaging check.

**Source inspection:** node-link JSON accepts edges/links and multigraph metadata. Graph loading retains custom metadata, but text query formatting does not return arbitrary provenance fields. get_neighbors selects representative edge data per neighbor. Graph contexts reload based on file mtime/size; this alone does not establish immutable checkpoints or transactional publication. Query logging is opt-in, with `GRAPHIFY_QUERY_LOG_DISABLE=1` available to force it off. Graph loading can read an adjacent learning overlay; do not generate/use such overlays for authoritative checkpoint answers. Generic MCP tools accept project_path overrides; a baseline-bound skill wrapper must not permit silent project switching.

**New measured probe:** in the installed 0.9.37 load/query path, a two-node MultiDiGraph with two parallel realizes edges (declared/source-1 and inferred/source-2) loaded both edges and both provenance values. The query returned one EXTRACTED edge, omitted the inferred edge, and omitted provenance IDs. socket.connect was blocked in this in-process probe; this is not a complete network audit. Raw local evidence: output/proposals/graphify-interface-probe.json and graphify-wheel-check.json. This limits the earlier benchmark's completeness result to its fixture; it does not invalidate those measured results or prove general semantic completeness.

**Prior measured evidence:** PR #4, benchmark head `07c4bcbf810a9a639c9cb271d66243f8fce2af7f`, ROUND3.md: Graphify plus declared-edge projection/source reads achieved 12/12 frozen facts and 8/8 controlled checks; 11.5 ms small-workflow warm p95 and 104.98 ms at 5,000 short synthetic notes. No model calls. That adapter excluded inferred edges from its graph while retaining them in source metadata. It did not test production checkpoint isolation, parallel-edge completeness or concurrent publication. No new speed claim or dependency adoption follows from the study.

Evidence link: https://github.com/ChouBokYann/visuAI-DLC/blob/07c4bcbf810a9a639c9cb271d66243f8fce2af7f/benchmarks/issue-3/ROUND3.md

## Coordinator feedback resolution / proposed design decisions

This revision answers the agent feedback at https://github.com/ChouBokYann/visuAI-DLC/issues/6#issuecomment-6634926526 . It is still a proposal awaiting independent human acceptance, not an implementation grant.

### 1. Initial support and delivery gates

Initial supported integration environment: Windows 11 x86-64, CPython 3.12.x, local NTFS storage, Git installed. The investigation environment used CPython 3.12.7. Linux, macOS, other Python minors, network shares and cloud-synchronized caches are unverified/out of the first delivery's supported matrix. This integration boundary does not restrict reading the core Markdown skills on those systems. Package metadata/documentation must clearly distinguish this narrow support promise from upstream's Python >=3.10 declaration.

Required clean-install gates: build wheel/sdist; install the base package in a fresh 3.12 venv with no system site packages and confirm no Graphify/MCP dependency; run the core walkthrough; install the extra in a second fresh venv, run pip check, record resolved versions, and exercise installed CLI commands outside the source checkout. Run index/query/refresh, missing dependency, checkpoint isolation, malformed input, parallel-edge and interrupted/concurrent writer tests on Windows 11/NTFS. Block network attempts during runtime tests after dependency installation, with provider credentials absent. Record package size, dependency footprint, startup and representative query timings without claiming a performance target established by the benchmark. A failed required check blocks release. No clean-install success is claimed yet.

### 2. Lossless retrieval boundary

The first version has two explicitly different modes: Graphify-backed discovery returns suggestions and states that recall is unverified; exact-ID retrieval provides a bounded structural answer. A skill supplies or resolves a canonical ID before asking for a completeness-bearing answer. Ambiguous discovery must request/require ID selection, not silently choose a seed and claim complete impact.

Build the derived NetworkX MultiDiGraph from **all** validated `visu.relations` in the selected Git snapshot, including inferred relations and every source. Preserve each relation occurrence with a deterministic per-record key and keep original metadata/source references. Serialize the same complete graph for Graphify interoperability. Use NetworkX's public multigraph adjacency, not Graphify's lossy text output, to enumerate incoming/outgoing relationships for exact-ID queries. Source reads use the same immutable snapshot. This adapter explicitly accepts a small traversal responsibility; it does not recreate extraction, semantic search, graph storage or a general memory engine.

Define scope as seed ID, edge direction, allowed predicates/bases, hop bound, node cap and edge cap. Traverse eligible edges in deterministic order, retaining parallel edges independently. At the hop boundary inspect adjacency only to identify excluded continuation; report it as omitted scope. If node/edge caps prevent returning any eligible in-scope item, set truncated=true and complete_within_scope=false with the reason and unresolved frontier; do not call it exhaustive. Otherwise complete_within_scope means all structural edges/nodes reachable under those declared filters and depth, never complete real-world impact. Return excluded basis/filter categories, sources and unknowns. Potential dependency paths stay potential.

Regression fixture: F realizes C twice (declared/source-1 and inferred/source-2), C contributes_to G, D affects F with two source-backed occurrences, and F depends_on F2 depends_on F3; include a cycle and an incoming-only edge. Exact-ID traversal must match an independently enumerated expected edge-key set, retain both provenance paths and uncertainty, and terminate on the cycle. Stub discovery to omit C and D: exact-ID results must remain unchanged. Run depth, basis, direction, node and edge limits (including a cap splitting parallel edges); verify every omission is marked and no truncated answer is called complete. Repeat at a second immutable checkpoint with changed/deleted edges and evidence, preserving old answers at the first checkpoint.

### 3. Cache, writer and recovery boundary

Chosen initial layout under a user-selected project-local cache root: `<repo-key>/<bundle-key>/writer.lock`, `current.json`, and `generations/<commit>-<uuid>/{manifest.json,graph.json,records.json}`. Keys include repository identity/canonical path and bundle path; manifests include schema/adapter version, immutable commit, source blob IDs/content hashes and generated-file hashes. Stage in a uniquely named sibling directory on the same volume. Validate containment and reject linked/reparse cache paths in the initial supported implementation. No global memory store or automatic cache pruning.

Serialize refreshes per bundle using a fixed byte-range lock with stdlib `msvcrt.locking(..., LK_NBLCK, 1)` on a persistent lock file, held for the whole refresh. Fail fast with a busy error on contention. Never delete/recreate the lock file or steal a lock by age/PID. Process exit releases the OS handle; readers do not need the writer lock because published generations are immutable.

Write and flush/fsync generation files, verify hashes and schema, close handles, then rename the staging directory to its unique immutable generation name. Publish only a small current-pointer JSON using a unique temporary file, flush/fsync and `os.replace` on the same filesystem. Readers open/read/close the pointer once, then validate and use only that generation. An explicitly requested checkpoint must match its commit; never fall back silently to current. Windows sharing/replace errors are surfaced while retaining the old pointer. Retain all previous generations and abandoned staging directories for explicit later cleanup; no deletion on the critical path.

Failure tests: kill writer before generation completion, after generation rename and before pointer replacement, and immediately after replacement; readers see the previous complete generation or the new complete generation, never mixed files. Start two writers with a barrier, ensure exactly one lock holder and a clear busy result; kill the holder and verify a new process can acquire the lock. Inject write/fsync/rename/replace failures; prior pointer/hash set remains valid. Run a reader during publication and verify one-generation consistency. Corrupt a referenced file and require an integrity error, never fabricated fallback. Record that this promises process-crash consistency on tested local NTFS, not hardware power-loss durability. Windows atomic-publication behavior is a delivery test gate, not established by documentation alone.

Design references: [Python 3.12 msvcrt locking](https://docs.python.org/3.12/library/msvcrt.html#msvcrt.locking), [os.replace](https://docs.python.org/3.12/library/os.html#os.replace), and [NetworkX MultiDiGraph](https://networkx.org/documentation/stable/reference/classes/multidigraph.html).

### 4. Accessible probe evidence

The following raw outputs are embedded in this issue so reviewers do not need local output files. They establish the inspected 0.9.37 behavior only, not acceptance of the proposed adapter.


graphify-interface-probe.json
```json
{
  "version": "0.9.37",
  "python_requires": ">=3.10",
  "graph_class": "MultiDiGraph",
  "loaded_edges": 2,
  "loaded_provenance": [
    "source-1",
    "source-2"
  ],
  "edge_data_selection": {
    "relation": "realizes",
    "confidence": "EXTRACTED",
    "basis": "declared",
    "provenance": "source-1"
  },
  "query_text": "Traversal: BFS depth=2 | Start: ['feature-a'] | 2 nodes found\n\nNODE feature-a [src=feature.md loc= community=]\nNODE capability-a [src=capability.md loc= community=]\nEDGE feature-a --realizes [EXTRACTED]--> capability-a",
  "query_has_second_relation_provenance": false,
  "query_has_inferred": false,
  "source_sha256": "8b3ea9065bc1aaa7f686162ac9830592a09a147e9cde995b143175f8a5ca889d",
  "probe_scope": "in-process load/query functions with socket.connect blocked; not complete network audit"
}
```

graphify-wheel-check.json
```json
{
  "wheel_sha256_verified": true,
  "installed_serve_matches_published_wheel": true,
  "serve_sha256": "8b3ea9065bc1aaa7f686162ac9830592a09a147e9cde995b143175f8a5ca889d"
}
```

graphify-package-verification.json
```json
{
  "source": "https://pypi.org/pypi/graphifyy/0.9.37/json",
  "name": "graphifyy",
  "version": "0.9.37",
  "requires_python": ">=3.10",
  "license_expression": "Apache-2.0",
  "files": [
    {
      "filename": "graphifyy-0.9.37-py3-none-any.whl",
      "sha256": "ffaccb4bbe70334674e14cf6e24cc6e22c52d2fc3674d1a38f4a903db10cbb3e"
    },
    {
      "filename": "graphifyy-0.9.37.tar.gz",
      "sha256": "a7fb0bc0c08ae5e62ba7b5a5fd62d1e5c4eea751da9e5961be8214a26f811536"
    }
  ]
}
```

## Shared-path ownership request

Worker-owned proposed files: src/visuai_dlc/memory/, tests/test_graphify_memory_*.py, docs/integration/graphify.md. Coordinate creation of pyproject.toml with the coordinator because it affects every worker's package. README change limited to one optional-install/usage link, submitted to the coordinator to apply or explicitly assign. Validator reuse requires making scripts/validate_knowledge.py importable from the installed package without breaking its existing CLI; proposed extraction to src/visuai_dlc/knowledge.py plus a compatibility entry point requires explicit coordinator ownership before editing. No other skills, north-star, methodology or automation edits are requested.

## Open questions / next review

The above choices are proposed resolutions for coordinator review. Confirm acceptance of the narrowed Windows/Python matrix and the exact-ID traversal boundary (Graphify discovery is advisory). If maintaining a canonical traversal layer exceeds the intended thin-adapter scope, return the proposal for revision before implementation. The independent human scope review required by workflow.md remains outstanding. No production code or tracked shared file has been changed.
