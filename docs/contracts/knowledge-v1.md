# Project knowledge contract v1

Status: implementation candidate for [issue #1](https://github.com/ChouBokYann/visuAI-DLC/issues/1).
Human owner: ChouBokYann. Agent responsibility: contract, examples, reuse assessment, validator and checks.
The user instructed implementation after review in the session; no independent issue review comment was present when work began.

## Purpose and boundaries

Skills produce retrievable project knowledge. A focused view must answer why a feature exists, what a decision affects, and what changed between baselines with source evidence. This contract does not prescribe a server, database, renderer, or agent runtime.

Use one concept per UTF-8 Markdown file in a project's knowledge bundle. Reusable skills remain in the framework's skills directory; project knowledge references procedures instead of copying them. The examples are synthetic data, not implemented product features.

## OKF and this profile

Base: [OKF v0.2 at ad30107](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/ad30107c31c06aec8a7d5636e0d1058118604e6f/SPEC.md).

Standard fields: `type`, `title`, `description`, `status`, `sources`, and optional `generated`, `verified`, `stale_after`, `resource`, `tags`.
Their meanings remain those of OKF. In particular, document `status` is draft/stable/deprecated; it is not work progress or human approval. Omitted verification never means verified.

This stricter application profile requires type, title, description, explicit status, nonempty sources, and a visu mapping. Unknown OKF fields must survive editing. Generic OKF consumers may ignore visu and cannot be assumed to understand typed relationships. They may tolerate broken links; our profile rejects unresolved typed targets within a complete baseline.

`index.md` and `log.md` are OKF navigation/history files, not concepts.

## Extension fields

All custom fields live under `visu`:

| Field | Requirement and meaning |
|---|---|
| schema_version | Required integer 1. Unknown versions require migration, not guessing. |
| id | Required stable lowercase hyphenated identifier, unique within a bundle baseline. |
| relations | Required list, possibly empty. Each edge has predicate, target, basis, and source. |
| delivery_state | Required for Feature: proposed, in-progress, implemented, verified, released, or deferred. |
| result | Required for Evidence: pending, passed, failed, or inconclusive. |
| tested_revision | Required for non-pending Evidence: exact revision of the artifact tested; never infer it from the evidence document's own commit. |

Each `sources` entry has an id and resource. Resource may be an issue URL, pinned code URL, or accessible artifact reference. Relation `source` names one of that document's source IDs. `basis` is declared or inferred: it describes origin, not truth or approval. A proposal can explicitly declare a relationship. Acceptance is obtained from its linked issue and baseline, not a free-form claim in metadata.

Types: Goal, Capability, Feature, Decision, Evidence, Release, Procedure.
Procedural memory is a Procedure reference to a versioned skill or runbook. Semantic memory consists of the project concepts and relationships. Episodic memory is captured by decision changes, dated/source-linked observations, and evidence records. Do not archive every conversation turn.

## Directed relationship vocabulary

| Predicate | Source -> target | Meaning |
|---|---|---|
| contributes_to | Capability -> Goal | Expected contribution; not proof of outcome |
| realizes | Feature -> Capability | Intended capability supplied by feature |
| affects | Decision -> Feature or Capability | Declared/inferred area requiring consideration |
| assesses | Evidence -> Feature or Capability | What the record evaluates; result is separate |
| uses_procedure | Evidence -> Procedure | How the assessment is to be or was performed |
| targets | Release -> Feature | Planned release membership, not shipment |
| depends_on | Feature -> Feature; Capability -> Capability | Work/behavior dependency |
| supersedes | Decision -> Decision | New decision replaces an older decision |

Persist outgoing edges only. Compute incoming edges from the same records. Do not manually maintain reverse links. A consumer must distinguish direct effects from potential downstream effects; dependency reachability does not prove breakage. Inferred edges stay visibly inferred through every query.

## Identity, links and navigation

OKF identity remains the bundle-relative path without .md. visu.id is an additional application identity, not a redefinition of OKF. Typed targets resolve through an ID-to-path lookup for the selected baseline. IDs never change when titles change.

Prefer stable filenames. If a move is necessary, update ordinary Markdown links in the same change and check all old paths; preserve visu.id. Generic OKF consumers will see a changed path identity. No rename compatibility is claimed for external consumers.

Use ordinary links for human navigation and sources. Only visu.relations creates typed project edges. Ordinary links do not require duplicate typed entries unless a semantic relationship is intended. A viewer can render relation labels and links from the metadata; no manually duplicated Relations section is required. Concept prose explains why, rather than repeating edge lists.

## Baselines and freshness

In production, a baseline is an immutable Git commit containing the bundle. A tag is a convenient name resolved to a commit. Compare records by visu.id within each baseline. Include the selected commit and working-tree/dirty status in query responses. Never mix branch snapshots silently.

The two sample directories are independent complete fixture baselines, not a proposed production snapshot duplication strategy. Duplicate IDs across those directories are intentional; duplicates within either directory are invalid.

Keep superseded decisions with status deprecated and connect replacements using supersedes. Git preserves earlier content. Stable document status does not establish accepted product scope.

Evidence for an old tested_revision remains historical evidence. It must not establish verification of a new revision without an applicability review. If generated content changes after its verified timestamp, show it as needing re-review. Likewise honor stale_after. A source changing without a captured revision makes freshness uncertain. Verification metadata checks knowledge accuracy; it does not replace feature test evidence.

## Skill write and collaboration protocol

1. Read the accepted issue, selected baseline, and existing concepts.
2. Find by ID/title before creating a concept. Record affected paths and one human owner.
3. Read current contents and record the base revision or content hash.
4. Produce the smallest patch with rationale and sources. Do not invent approvals, passing evidence, or code-to-goal relationships.
5. Before writing, compare the base revision/hash. If changed, reread and reconcile; never silently overwrite another agent.
6. Validate YAML, identities, relationship endpoints and meanings. Patch and commit related changes together.
7. Record issue/PR evidence; only merge after the contribution review process.

For local direct writes, write a temporary file and atomically replace only after checking the expected version. Atomic replacement alone does not prevent lost updates. Git branches and reviewed patches are the initial coordination mechanism; no multiwriter database is introduced.

## Retrieval contract

Return: selected baseline, concise answer, named concepts, exact source paths/anchors, relationship basis, and unknown/omitted context. Search metadata/full text for entry points, then traverse only relevant predicates and a bounded neighborhood. Report truncation; a bounded search is not proof that no further impacts exist.

A feature query follows realizes then contributes_to. A decision query follows affects, optionally expands reverse dependencies, and labels those indirect results as potential. A version query compares IDs, metadata, edges and rationale across two specified baselines.

## Validation and negative cases

Run the [example validator](../../scripts/validate_knowledge.py) on each bundle separately. It reuses PyYAML safe parsing and checks the profile's structural core; it is not a complete OKF validator or a semantic approval engine.

| Case | Required handling |
|---|---|
| Duplicate YAML key or concept ID | Fail; never silently keep the last value |
| Unresolved typed target or unknown predicate/type | Fail before publishing an authoritative graph |
| Unsupported source/target type | Fail with the offending relationship |
| Inferred connection | Retain its basis and source; do not promote automatically |
| Pending evidence presented as passed | Fail structural inconsistency; reviewer checks truth |
| Evidence from an older revision | Preserve, flag as historical; do not carry forward verification |
| Changed source without revision evidence | Mark freshness unknown; request/reperform relevant check |
| Concurrent edit | Reject stale patch or resolve Git conflict with both contributors' intent |
| Unknown extension version | Fail and require explicit migration |
| Missing context in focused view | State scope and omitted relationships; allow expansion |

The validator checks declared data, not whether a source proves it, whether approvals occurred, or whether code actually satisfies a goal. These require evidence review. No performance claim follows from this example.
