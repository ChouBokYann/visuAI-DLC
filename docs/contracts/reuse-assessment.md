# Reuse assessment

> **Historical / deferred as of 2026-11-07.** Historical assessment for the deferred knowledge-format experiment. Recommendations below are not current dependency or storage decisions. Current direction: [NORTHSTAR.md on main](../../NORTHSTAR.md). Earlier status statements and requirements below describe the original proposal only.

Source inspection on 2026-11-03. All runtime compatibility is **untested**. Descriptions report documented capabilities, not measured performance. No candidate packages or services installed.

| Candidate / pinned source | Documented support | Gap to evaluate | Recommendation |
|---|---|---|---|
| [OKF](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/ad30107c31c06aec8a7d5636e0d1058118604e6f/SPEC.md) | Standard metadata, Markdown paths, extensible frontmatter | visu IDs and typed edges require our profile; generic OKF links are untyped | Use as base format; no upstream code copied |
| [Graphify](https://github.com/Graphify-Labs/graphify/blob/8e6a6d2129d4aeffc7a0e9ed79b153f7f057f42b/README.md) | Code extraction, explicit/inferred edge distinction, scoped graph queries | No verified support for preserving this profile's YAML edge semantics or baseline rules | Candidate for code/legacy extraction; not the authoritative project-knowledge store |
| [Basic Memory](https://github.com/basicmachines-co/basic-memory/blob/41461f52e162b99e1f92b2098325b2eb7f4f5cab/README.md) | Markdown entities, observations/relations, local SQLite index | Its body/wikilink relationship grammar differs from our YAML edges; an adapter needs a round-trip test | Closest indexing candidate; evaluate before writing an indexer. README identifies AGPL-3.0; review obligations before integration |
| [Graphiti](https://github.com/getzep/graphiti/blob/7e0342a49ce5a04f6415ac2f64ce150bb81b0689/README.md) | Temporal facts, provenance, incremental graph updates | Requires a separate integration to preserve this file contract; infrastructure exceeds the example's needs | Borrow historical validity concepts; defer runtime adoption |
| [codebase-memory-mcp](https://github.com/slxar/codebase-memory-mcp/blob/524145b7bda6383f629ff3494702f5dc3f4e7123/README.md) | AST relationships, code queries and a local SQLite index | Does not establish project goal contribution; linking symbols to concept IDs needs evidence and revision anchors | Candidate code evidence provider; do not infer business intent from call graphs |

## Reuse boundary

Reuse OKF's document conventions and installed PyYAML safe parsing. The small validator implements only our profile invariants; it is neither a graph engine nor a full OKF conformance checker. Preserve skill behavior from Superpowers/Pocock in later issues and adapt their outputs to this contract after it is reviewed.

No third-party implementation or substantial prose has been copied into this repository. Before integrating code, inspect the relevant LICENSE at the pinned revision and preserve its notices. Repository licenses and dependency licenses must be assessed for the actual integration, not inferred from this table.

## Candidate evaluation recipe

Use the same two fixture baselines. Check ingestion, stable identities, directed typed edges, source preservation, inferred-edge handling, pending results, and baseline isolation. Export/reimport and compare records. Record exact command/version and actual differences. If a tool loses semantics, test a minimal adapter before replacing it; if an adapter duplicates the entire tool, reconsider the choice.

Do not select an indexer from documentation alone. No runtime compatibility or 5,000-document performance claim is made. A later benchmark must vary document length, edge density, and update size and measure server and browser separately.
