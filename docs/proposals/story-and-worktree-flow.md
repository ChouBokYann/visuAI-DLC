# Story and worktree context

Owner: ChouBokYann. Branch: first-iteration. The owner requested cross-stage connectivity, chat-driven storytelling hooks and worktree contribution views, and explicitly chose comparison with Git main and the shared business outcome. Agent responsibilities: graph filtering, bounded local event publisher/viewer, read-only Git collector, integration guidance and tests. Affected paths are the React viewer, `scripts/export_worktrees.py`, its tests, shared output contract and handoff skill. Main adoption and independent review remain separate; no main merge or lifecycle-schema change is implied.

## Decisions

- Stage-local filtering discarded edges with external endpoints. Keep one-hop external records as dashed context, without counting them as stage records; context selection returns to Project. Empty stages stay empty. Genuinely disconnected records retain an explicit missing-link label. No projected transitive link is fabricated.
- Use a local, atomic file event rather than an unauthenticated write endpoint or a claimed ChatGPT host API. The presenter supplies a matching snapshot, focus, ordered route and optional narrative links. The viewer follows only when enabled, bounds/validates input and rejects different baselines. Narration is an overlay, never new canonical evidence. A route repositions nodes but does not itself add relationships. Clear story removes the overlay.
- Keep one presenter per viewer. Multi-agent orchestrators serialize events through that presenter; this iteration does not implement concurrent graph editing. Stable IDs and snapshot baseline guard against applying a story to different work. Increasing sequence numbers order events during a following session.
- Compare each worktree's authored records with committed local main. Read main through Git archive into a temporary directory; read worktrees without checkout/merge/fetch. Preserve branch-specific versions, dirty state and ancestry. Trace changed records through declared references to main's shared outcome IDs, reporting missing links. Record differences are not code diffs or measured business impact.
- Use the existing eight/six-record examples for a clearly synthetic Worktree example. Real collection requires compatible workflow records on main and the same relative source directory in worktrees. No migration or guessed attribution is introduced.

## Tools and data

Reuse React Flow, Dagre, existing validators/exporter, Node built-ins, Python standard library, installed PyYAML and local Git. No added dependency, paid service, remote account, database, automatic hook installation or network publication. Local event files are ignored by Git and excluded from builds. Worktree bundles contain exported project content and branch/revision metadata, but not absolute worktree paths. Invalid main blocks export; omitted worktrees are explicit. Rechecks detect changes observed during export, without claiming an atomic filesystem snapshot.

## Validation

### Question-led refinement

The owner's live trial showed that camera focus plus a route still left irrelevant nodes visible and failed to explain the answer. The revised story projection includes only route records and adjacent recorded relationships, with optional explicitly labelled narrative links. New publications require the actual question, concise answer and one grounded reason per step (maximum eight). Desktop fits the complete answer; mobile steps through readable nodes. Project context/Back to answer switches projections without altering source records. Older route-only events show an explicit missing-explanation notice; the publisher no longer accepts new ones.

The owner also requested phase colour separation. Project records now occupy lifecycle columns, and phase names/top borders share colours with navigation in light and dark themes. A story retains these authored phase labels even when reasoning goes from verification back to planning. Status symbols remain independent of phase colour.

Eight graph/session tests and the production build passed. Isolated browser checks verified three answer nodes instead of eight, question and per-step text, project/answer switching, three distinct phase borders, mobile navigation and light/dark screenshots. The live sample question about missing amenities was republished through the CLI and verified at the served endpoint. The presenter still selects and writes the reasoning; structural checks cannot prove that an explanation is true. No live-host callback, automatic natural-language parser or real-project comprehension study is claimed.

Seven graph/session tests pass, including preserved stage context, stale story rejection, invalid IDs, independent canonical records, changed/removed worktree records and shared-goal traceability. The 22-test Python suite passes, including a temporary real Git main/worktree fixture with uncommitted changes and an invalid worktree. The React production build passes with the existing bundle-size advisory.

An isolated headless browser exercised the actual story publisher and local polling path, verified a narrative edge appeared and canonical record count stayed unchanged, stepped through the route, cleared the story, switched the sample worktree to main and observed six records/zero differences. Existing light/dark, keyboard, mobile and import checks also passed. Desktop stage-context and mobile story/worktree screenshots were inspected. Tests restore the prior local event file or remove their own file. The first event check needed to wait for the polling cycle rather than assuming an immediate response.

Limitations: no live ChatGPT host callback or Symphony configuration is installed. An agent needs local CLI/filesystem access to publish; ordinary chats use focus links. One presenter serializes story events. Worktree bundles refresh by explicit export/import. Code-only changes need authored goal references before they can be attributed. Real-project user testing, multi-agent orchestration trials, full accessibility audit and production-scale graphs remain pending.
