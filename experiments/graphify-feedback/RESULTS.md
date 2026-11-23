# Graphify + visuAI feedback trial results

2026-11-23. Completed local comparison; no canonical integration, skill edits or push.

## Finding

Graphify paired successfully with the existing visuAI workflow, but produced no better observed result than ordinary file search on this corpus. Both fresh autonomous workers recovered the relevant user feedback, rejected obsolete/unaccepted instructions, implemented the repair and stopped without post-implementation correction rounds. The prior encoding and invented-stairs mistakes did not recur in either arm. This is compatibility evidence, not evidence that graph retrieval improves outcomes or efficiency.

| Fixed assessment | File search F | Graphify-assisted G |
|---|---:|---:|
| Defective starter automated checks | 9/30 | 9/30 |
| Independent final automated checks | 30/30 | 30/30 |
| Current-feedback/applicability categories, parent review | 6/6 | 6/6 |
| Correction rounds, worker-recorded | 0 | 0 |
| Current requirements and scope preserved | Yes | Yes |
| Unsupported Stairs label or corrupted UI punctuation observed | No | No |

The six context categories were fixed in the protocol: current group, uncertainty, complete selection update, supported factual labels, encoding mechanism, and exclusion of stale/proposed/unrelated instructions. Scoring uses cited original paths, application code and observed artifacts, not just a claim of retrieval. Behavioral checks cover six catalogue cases, eight unseen boundary/uncertainty/preference cases, and eight browser checks at each of 390/1280px. Counts are not independent statistical samples.

## Actual use and outcome

Both arms used the same frozen visuAI snapshot, runtime tools, original source corpus, six-minute limit and three-round maximum. Both selected deliver-change, implement-increments and verify-change, kept the simple established design and avoided new services or discovery interviews. They wrote source-linked applicability/evidence records and reusable memory. No parent coaching, worker retry or parent product repair occurred.

F listed source files and read the relevant folders directly with rg/Get-Content, excluding the clearly named other-projects folder. G inspected the graph's labels, ran two vocabulary-expanded Graphify queries at a 1500-token output budget, then read the cited original documents. Its first query returned 27 nodes with truncated edge output; the second returned 9. G reports no retrieval failure or file-search fallback; source verification was part of the planned method, not optional. Both recovered dates/authority and explicitly superseded the old personal preferences, rejected the stairs/accounts proposal and disregarded stale readiness evidence.

Parent independently opened all four final screenshots and compared supported access labels against data: both say Not step-free rather than inventing stairs; both retain uncertain options, current group summary and selected-room contact. No encoding corruption was visible. Both also added their own browser assertions against Stairs; F explicitly checked replacement characters, while G used ASCII UI punctuation and rendered inspection. This is useful prevention behavior, but both received an explicit, concrete source lesson. It cannot be attributed to Graphify.

## Indexing and query evidence

Installed Graphify 0.9.37 was reused, not upgraded or claimed latest. A fresh extraction agent followed the installed semantic extraction specification and read only the 24 corpus documents, without evaluator access. Its output built 83 nodes and 84 directed edges using Graphify's actual build/cluster/export functions. Source coverage was 24/24; ID/endpoint validation and Graphify diagnostics found no dangling endpoints or collapsed same-endpoint pairs in this graph. Coverage means every document has a node, not that every fact was extracted correctly. Spot-checks preserved current/rejected distinctions for the key feedback.

Corpus detection measured 804 whitespace words across 24 small files. Detection took about 0.14s; local build/cluster/export about 0.145s. Semantic extraction required an additional agent run, approximately a minute; exact inference token/cost usage was not metered. Zero placeholders in the upstream generated report are not evidence of free semantic processing. An archived setup query took 0.546s locally, not a benchmark distribution. The common preparation/evaluator work is separate from these retrieval costs.

Workers finished well before six minutes: parent observations put F at roughly 2.5 minutes and G around 3.2 minutes after dispatch, plus indexing for G. These are approximate observations from a single concurrent pair, not an efficiency estimate or proof that file search is generally faster.

The bounded provenance probe reproduced the earlier limitation in this installed version: a two-node multigraph with two parallel source/basis edges produced query text containing one EXTRACTED relationship and neither provenance ID. This is preserved in the raw probe, not attributed to current releases generally. The trial graph itself had no such parallel pair, so this probe is a separate reliability boundary. The generic setup query also returned an irrelevant-project node and truncated edge text. Graph output remains a discovery aid; original source verification is necessary for acceptance-bearing claims.

## Decision

Keep Graphify optional. This run establishes that a worker can use it with visuAI to discover feedback, verify sources and act autonomously. It does not establish a reason to make Graphify mandatory or to build a custom memory/ontology engine. For this tiny corpus, ordinary search retrieved the same useful context with less setup.

If evaluated further, use a genuinely larger history, less obvious directory separation, cross-file dependency questions and repeated tasks so indexing cost can be amortized. Keep retrieval correctness, applicability, prevention and final outcome separate. Compare against a strong source-search baseline under equal task budgets and report total indexing plus execution cost. A graph that retrieves a lesson still needs the workflow to convert that lesson into a preventive check and current evidence.

## Artifacts and limits

- [Protocol](README.md), [fixture builder](prepare.py), [index builder](build_index.py), [independent evaluator](evaluate.mjs).
- [Index check](../../output/graphify-feedback/index-check.json), [graph diagnostics](../../output/graphify-feedback/graph-diagnostics.json), [provenance probe](../../output/graphify-feedback/provenance.json), [setup query](../../output/graphify-feedback/setup-query.json).
- [Final checks](../../output/graphify-feedback/build/results.json); per-arm source, screenshots, delivery/memory and agent checks are archived alongside results. Worker records retain exact retrieval commands.
- Original input hashes, frozen graph/evaluator/extraction hashes and final evidence hashes are saved under output/graphify-feedback. Graphify detect also created corpus/graphify-out/cache metadata; F reported seeing its path but not reading it. No graph was supplied to F.

Limitations: n=1 per arm; unblinded parent assessment; short synthetic corpus fits easily in model context; obvious irrelevant-folder names; Graphify includes extra semantic preprocessing unavailable to F; same common host/trial scaffolding and model family; no no-feedback control, real-user acceptance, long-term learning, large-history recall, comprehensive accessibility, cross-browser or open-ended visual-craft evaluation. Saved files are not OS-enforced isolation. Input version is the local workflow snapshot, including earlier uncommitted skill edits, not a reviewed main release. No source changes, global configuration, installation, paid API purchase, external contact, deployment or publication. Normal host inference was used.

Reproduce current outcome checks by serving experiments/graphify-feedback on 127.0.0.1:17832 and running `node experiments/graphify-feedback/evaluate.mjs build` from repository root. Preserve the archived evidence first: this overwrites build output. Existing local Playwright/Chromium paths are required. prepare.py refuses to overwrite a trial. The temporary loopback server was stopped after evaluation.
