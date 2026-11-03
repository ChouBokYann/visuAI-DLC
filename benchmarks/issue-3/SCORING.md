# Round 3 scoring protocol (fixed before scale runs)

Scope: local, no model API calls. Compare the **tested workflows**, not every possible capability of a product. Deterministic compatibility projections are allowed and identified. Canonical Markdown/YAML remains authoritative. Owner: @ChouBokYann; agent owns benchmark scripts, fixtures, observations and report under this directory and `.bench-run`.

The three requested metrics receive equal weight. Report document and code tracks separately wherever their coverage differs. Missing/unrun tests are N/A, never silently counted as successes or as failures of a whole product. Do not publish an overall score for an unmeasured track.

| Metric | Scale from 0 to 5 |
| --- | --- |
| Speed | For a useful, complete retrieval workflow: warm p95 <=50 ms: 5; <=100 ms: 4; <=500 ms: 3; <=1 s: 2; >1 s and completes: 1; fails/times out: 0. Include all retrieval calls required for the answer. Startup and indexing reported separately. |
| Completeness | 5 × fully supported expected facts / expected facts. Use the frozen 12 document and 6 code facts. Partial facts do not count as full. Distinguish supplied-path retrieval from autonomous discovery. |
| Accuracy | 5 × passed deterministic correctness checks / executed checks. Checks cover retrieved edge identity/direction, metadata preservation, evidence status, explicit inference handling, and update/delete/rename freshness. Publish the denominator and any critical stale-data failure. This is evidence/adapter correctness, not independently judged LLM-answer accuracy. |

Safety of interpretation: a stale deleted edge or incorrect evidence status blocks adoption even if the arithmetic average is high. Two or three observations are exploratory, not a stable percentile; target at least 20 warm workflows for the scale run. OS, process boundaries, resource counters, and data size must accompany comparisons. Linux-container measurements cannot establish a native Windows performance ranking.

Scale probes: 100 and 5,000 concept documents, generated deterministically as repeated independent five-document project threads. Code-only probes use a separate fixed generated corpus so unsupported document extraction cannot masquerade as cheap indexing. Report file/node/edge counts and total bytes. Small fixture results remain distinct.

Resource probes: sample process-tree RSS and CPU time at 100 ms where supported; report sampled peak RSS (not guaranteed absolute peak), CPU seconds and index size. Container statistics are labeled separately. Index/update/delete operations must retain raw output and verify resulting retrieval, not just exit status.

Compatibility probes: preserve declared vs inferred basis and source metadata; replace an edge, remove a document, rename a file while retaining its stable ID; ensure projections and retrieved relationships do not retain obsolete references. Test old authoring timestamps separately from index timestamps. These are controlled local tests, not a production deployment of an adapter.

Unresolved external limitations will remain explicit: no paid/model-backed document extraction; no independent human grading in this session; no system ACL changes to make a tool run.
