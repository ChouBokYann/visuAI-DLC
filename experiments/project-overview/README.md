# Local project overview prototype

Open [index.html](index.html) in a browser. No installation, build, server, network requests, or account is needed. The built-in cafe project is **synthetic sample data**, not live work or actual test results. Browser rendering has not been inspected in the authoring environment because browser access was unavailable.

Select a record to follow the reason for a decision, the change it directs, and the evidence assessing that change. Search or filter the list; direct connections remain available in the detail panel even when their targets are outside the current filter. Historical decisions and inferred connections are explicit. Passed checks for a different target revision display **Stale** while retaining their original recorded result.

Use **Download sample** to obtain the input format. **Open snapshot** accepts local JSON (at most 2 MB, 1,000 records, 4,000 connections). Files remain in browser memory and refresh returns to the built-in sample; imports do not edit source records. Invalid imports leave the previous valid view intact. Sample source paths are illustrative and intentionally not live links. External HTTP(S) sources open only when clicked.

## Input boundary

This is a presentation experiment, not a required skill-output format or a Markdown parser. Root fields: `version: 1`, `project` (`name`, `summary`, `snapshot`, `sample` boolean), `records`, and `edges`. Each record needs `id`, `kind`, `status`, `title`, `summary`, and at least one source (`title` with `path` or HTTP(S) `url`). Optional human context: `reason`, `next`, `owner`.

Kinds/statuses:

| Kind | Statuses |
|---|---|
| goal | active, closed |
| requirement | active, retired |
| decision | proposed, accepted, superseded |
| change | planned, in-progress, ready, blocked, done |
| blocker | open, resolved |
| evidence | passed, failed, pending, not-run, inconclusive |

Changes require a `revision`. Completed evidence (passed/failed/inconclusive) requires `testedRevision` and `method`; unrun evidence must not supply `testedRevision`. Each evidence record assesses exactly one change. A revision mismatch yields a computed stale label without changing the original result. Matching strings only establish snapshot consistency, not that a check actually ran or is sufficient.

Edges use `from`, `relation`, `to`, and `basis` (`stated` or `inferred`). Supported pairs: requirement `addresses` goal; change `aims_at` requirement; decision `decides` change; decision `supersedes` decision; evidence `assesses` change; change `depends_on` change/blocker. These limited relations demonstrate navigable meaning; they are not a general ontology. The viewer shows direct relationships, does not infer dependency impact, and does not compute delivery approval.

The project summary is supplied prose, not generated proof. Duplicate record IDs, unresolved/mistyped edges, invalid statuses, unsafe source URL schemes, and missing evidence fields are rejected. Input text is rendered through textContent, never HTML. Standard JSON parsing is used; duplicate JSON object keys are not separately detected. This prototype does not authenticate authors, verify sources, determine whether revision identities are honest, or prove semantic truth.

## Checks

```powershell
node --test experiments/project-overview/model.test.cjs experiments/project-overview/app.test.cjs
```

Run from the repository root. Model tests exercise evidence freshness and structural boundaries. Application tests use a small DOM double for event wiring, imports, and safe text insertion; they do **not** establish real browser layout, accessibility compliance, downloads/file-picker behavior, or mobile usability.

If a local server is preferred, run `python -m http.server 8765 --bind 127.0.0.1 --directory experiments/project-overview` from the repo root, then open `http://127.0.0.1:8765/`. Stop it with Ctrl+C. No server was started during author checks.

See the [trial scope](../../docs/proposals/project-overview-prototype.md). Real-project mapping, live Symphony integration, persistent storage, and independent human comprehension testing remain deferred.

## Skill-authored documents (snapshot version 2)

The [shared output contract](../../docs/contracts/workflow-context.md) and [cafe example](../../docs/examples/business-context/README.md) provide Markdown-to-view export. Version 2 preserves business problems/outcomes, requirements, decisions, changes, evidence and releases; the version 1 sample above remains supported. Imported outcome records are selected first. Explanations are displayed as inert text, and source paths remain readable references. Technical revision mismatches are stale; business observations retain context and never imply causal success. Partial bundles and missing intent are visibly labelled. No server, automatic refresh or live Symphony publishing is installed.

The DOM interaction tests for version 2 use the existing Python/PyYAML environment to generate fixture input. Browser appearance and user comprehension require separate checks.
