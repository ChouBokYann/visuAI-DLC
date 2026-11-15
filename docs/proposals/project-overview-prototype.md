# Project overview visualisation: bounded branch trial

Status: authorized by the user's request to work on visualisation after the workflow candidates, and their selection of **Project overview with connected decisions and evidence**. Human owner: ChouBokYann. Agent scope: `experiments/project-overview/`, its tests, this record, and a README navigation link. This explicit session request reopens a bounded visualisation experiment on this branch; it does not rewrite main's NORTHSTAR, reactivate all historical graph work, or grant merge approval. Related historical research: #11; no issue state is changed.

## Problem and result

People need to recover why work exists and what its evidence actually says without reading every agent's report. Build a local browser prototype that starts with a short project account, lets the reader select a change or decision, and reveals its direct relationships, rationale, and source references. Use labelled synthetic cafe-project data until a real-project trial is scheduled.

The presentation is a view of imported records, not a new source of truth, ontology engine, Markdown extractor, or live Symphony dashboard. It must not turn a relation or a green-looking card into a stronger evidence claim than the source supports.

## Scope and design

- Static HTML/CSS/JavaScript with no dependencies, build step, remote fonts, analytics, or external scripts. Open `index.html` directly, or serve the experiment directory locally for inspection.
- Built-in sample plus optional local JSON import and download of the sample format. Imports stay in browser memory; no server upload or persistence. A refresh discards imported data.
- Purposeful slate-blue palette: paper `#f3f6fa`, ink `#172c42`, blue `#245b8a`, green `#246449`, amber `#82530a`, red `#9b3544`. System sans typography; comfortably spaced body text, sentence-case labels. No decorative graph cloud or equal-card dashboard.
- Layout: concise project account above a work/decision list; selecting a record opens its context and evidence. Relationships are navigable, labelled, and distinguish stated from inferred. Mobile stacks the panes; focus remains visible and status has text, not colour alone.
- Keep historical decisions accessible but out of current attention counts. Evidence result and freshness are separate: an imported pass tied to another revision displays stale. Missing proof remains visible. Source links open only when clicked and only HTTP(S) links are allowed; source paths are readable text.

## Small input boundary

The prototype accepts a versioned JSON snapshot of project metadata, records, and explicit relationships. This is an experiment-specific presentation input, not a required skill output schema. Validate unique IDs, known kinds/statuses, relationship endpoints and type pairs, bounded text/array sizes, evidence provenance, and source URL schemes before replacing the current view. Reject invalid input clearly and retain the previous valid view. Render text inertly; imported content is never HTML or code.

Code validates structural connections and revision consistency. It does not establish that a source is true, an author was authorized, or a reported test actually ran. No live credentials, repository crawling, arbitrary file opening, or automatic inference of links is included.

## Acceptance and validation

- Reader can find the purpose, selected direction, reason for it, affected change, linked evidence, and next action without opening raw Markdown first.
- Selecting a link navigates to the connected record; changing search/filter has a clear empty state; full dataset relationships remain available from detail.
- Passed, failed, pending, not-run, inconclusive, stale, and absent evidence are distinguishable. Superseded decisions and inferred relationships remain explicitly labelled.
- Invalid/duplicate/unresolved relationships, bad URL schemes, malformed JSON, and oversized imports fail before replacing the valid dataset. Text containing markup stays inert.
- Deterministic model tests cover these invariants. Browser inspection covers selection/navigation, filters, imported failures, keyboard operation, and responsive layout where supported. An author browser check is not an independent comprehension study.

## Tools, costs, and ownership

Use existing Node for dependency-free tests and existing Python only if a local inspection server is needed. No packages installed, paid services, external model calls, or project data uploads. The browser and filesystem are the only runtime dependencies. Untracked `.bench-run/` and `output/` are outside ownership and remain untouched. Independent review and real-project comprehension testing are pending.

## Alternatives and revisit conditions

Retain Markdown-only if the view does not help readers recover the relevant logic. A static local prototype is sufficient to test this before adding a parser, persistent database, live tracker connector, or large-graph renderer. Revisit those only when real-project evidence identifies a specific missing capability. Removing this experiment leaves skills and project records usable.

## Observed validation

- `node --test experiments/project-overview/model.test.cjs experiments/project-overview/app.test.cjs`: **15 tests passed**, using Node v22.15.0. Nine model tests cover connection/type validation, stale and incomplete evidence, provenance, unsafe URLs, size/shape bounds, and decision history. Six DOM-double tests exercise initial view, relationship navigation, filters/empty results, rejected imports preserving state, inert markup, empty snapshots, and out-of-order import completion.
- `python -B -X utf8 -m unittest discover -s tests -v`: **7 existing tests passed**, including repository documentation links. No existing validator/runtime code changed.
- Source inspection confirms DOM text insertion rather than HTML interpolation, explicit status labels, labels for controls, focus styles, a skip link, and responsive CSS. These are implemented provisions, not an accessibility certification.
- Browser inspection attempted through the available computer-use tool: the browser host reported unavailable; no installed browser was exposed through its app inventory. No screenshot, real-browser interaction, file-picker/download, keyboard, mobile, or independent reader test was completed. DOM-double tests do not replace those checks.
- A local HTTP server was not started. The prototype introduces no network fetches, packages, storage backend, or live tracker connection. Source URLs remain optional user-clicked links.

The sample and tests use synthetic records. Model validation confirms explicit structure and reported revision consistency only; it cannot verify the claims or authority represented in imported data. Real-project mapping and human comprehension remain untested. The next useful check is to open the local prototype in a browser, inspect the six reader questions, and then try a bounded export from the user's own project when scheduled.

## Subsequent document integration

The [business-connected skill-output extension](business-connected-skill-outputs.md) adds a shared authoring contract and version 2 snapshot adapter after explicit session acceptance. The initial version 1 scope and historical checks above remain accurate for that earlier slice; current skills now supply business-connected records. See [current validation](business-context-validation.md).
