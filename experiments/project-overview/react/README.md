# Project flow

The current frontend is React + TypeScript, with React Flow for the canvas and Dagre for left-to-right layout. This supersedes the parent directory's plain JavaScript presentation; the canonical exporter, validation model and Markdown examples are reused unchanged.

```powershell
cd experiments/project-overview/react
npm ci
npm run dev -- --port 5173 --strictPort
```

Open http://127.0.0.1:5173/. Node 22.12+ is recommended. The server binds to localhost. `npm run build` produces `dist/`, which can be served by an ordinary static web server; no database, login, chat transcript storage or paid service is introduced. Keep sensitive snapshots on a trusted local/private host. Runtime fonts are system fonts and no analytics or remote data requests are added.

## Read the flow

- Project shows business context and all records. Lifecycle filters keep the stage's authored records prominent, with directly connected cross-stage records as dashed context nodes. The count includes only the selected stage. Clicking context opens the project view. No link is fabricated for a genuinely disconnected record; it says “No recorded links”. Empty stages stay empty.
- Node headings retain the authored OODA step. Links show relationships, **not timestamps or proof of causation**. Most source relationships are reversed for business-to-delivery reading (for example, problem → outcome is “addressed by”). Solid lines denote direction; blue dashes denote an explicit “prompted” trigger, dots denote checks, and dash-dot lines denote revisions. Inferred links have open arrowheads and an explicit label on selection, independent of the line pattern. No missing link is guessed.
- Blue indicates focus and feedback. Green is reserved for passed evidence, amber for stale/unresolved checks, and red for failures or blockers. Accepted decisions and implemented changes are not coloured as successful outcomes. Status text and shapes remain available without colour; the expandable Key explains the encoding in both themes.
- Phase names and coloured top borders match lifecycle navigation. The project map groups records into phase columns; feedback can point back to an earlier phase. Phase colour is categorical, not a success signal. Answer paths retain those phase labels while following the question's order.
- Select a node to centre it and read its exact exported Markdown `summary`. The immediate neighbours stay clear, farther nodes fade at focus zoom. Branches remain branches. Zoom out to remove fading, or choose Project to fit all records. Long node titles are visually clipped; the full title is available on selection and in the accessible label.
- Light/dark preference is saved locally; first visit follows the system. Imported snapshots remain in memory only and refresh requires reimporting. Invalid imports retain the previous valid snapshot. Export validation and stale-evidence labels are reused from the original viewer.

## Focus from ChatGPT/Codex

The agent posts an ordinary focus link in its chat reply. Clicking it opens the matching record or stage. This is navigation from chat, **not an authenticated or automatic live ChatGPT connection**. The viewer cannot read this conversation or discover its ID. Use a nonsensitive session label for `chat`; it is only an orientation marker, not authorization or a transcript reference.

Generate a validated link with the same exported snapshot the user has loaded:

```powershell
npm run focus -- --snapshot path/to/workflow.json --record DECISION-002 --chat codex-session
# Stage only:
npm run focus -- --snapshot path/to/workflow.json --stage ideation --chat codex-session
```

Optional `--base https://your-private-host/flow/` changes the viewer location; nothing is uploaded. No command, source path or remote snapshot URL is accepted in the browser hash. Unknown projects, stages, record IDs and mismatched stage/record pairs are rejected. For an imported project, import its snapshot in the viewer first, then open the focus link in that same tab. Opening a new tab starts with sample data; reimport the matching snapshot there. A labelled chat focus remains reachable with the target button while exploring.

Example: `http://127.0.0.1:5173/#project=cafe-trial&stage=project&record=DECISION-002&chat=codex-trial`.

All lifecycle skills can include these links alongside their short human update using the shared output contract. The helper is optional; plain artifact links remain the fallback when no viewer is running. It does not launch skills, grant approval, move project status or execute instructions received from a URL.

## Local storytelling hook

Click **Follow agent** to accept local presentation events. An agent with filesystem/CLI access in this workspace can publish one using:

```powershell
npm run story -- --snapshot path/to/workflow.json --event path/to/story.json
```

The event shape is:

```json
{
  "version": 1,
  "project": "cafe-trial",
  "baseline": "<snapshot.project.snapshot>:<snapshot.provenance.digest>",
  "sequence": 1,
  "question": "How did we address missing amenities?",
  "answer": "We kept the places provider and supplemented missing amenity information.",
  "focus": "DECISION-002",
  "route": ["EVIDENCE-002", "DECISION-002", "CHANGE-001"],
  "steps": [
    {"record": "EVIDENCE-002", "reason": "The sample coverage check found missing power-socket data."},
    {"record": "DECISION-002", "reason": "We chose to supplement that data while retaining the provider."},
    {"record": "CHANGE-001", "reason": "The filters use the revised approach; real-world effectiveness is untested."}
  ],
  "links": []
}
```

Use the exact project/baseline from the exported snapshot. Legacy snapshots use `legacy` instead of a digest. Increase `sequence` for each event while following. The publisher now requires a question, a concise answer and one explanation for every route node (one to eight nodes; prefer three to five). `focus` is optional and must be on the route. Only those nodes appear in answer mode, with actual recorded links between adjacent steps. Selecting a step changes its explanation. Desktop framing fits the entire answer; mobile framing follows the selected step. Project context restores the complete map; Back to answer restores the explanation.

The presenting agent must first read the source records, answer the actual question and choose the minimum relevant chain. A “why” question follows problem/outcome/requirement/change; a “how did it change” question follows observation/revised decision/change. Do not send every neighbouring node. State unsupported details or missing evidence in the answer instead of inventing a causal connection. Explanations are agent-authored interpretations tied to existing IDs, not proof of semantic truth. Clicking a node still shows its unchanged canonical summary.

A route does not invent edges. Optional narrative links must remain within the route and use a distinctive pattern and persistent `Story:` label. They never enter canonical Markdown, evidence evaluation or worktree comparison. Clear story removes the answer. Stage navigation leaves answer mode and uses authored placement. Older route-only events remain readable with an explicit missing-explanation notice; publishing new route-only events is rejected.

The publisher validates existing IDs and the snapshot, then atomically writes `public/agent-story.json`. The dev viewer polls that same-origin file while following. No arbitrary remote fetch, command execution, transcript access or host permission is introduced. The browser rejects mismatched baselines and ignores older event sequences. The protocol is a single-presenter channel: multi-agent runs should nominate one presenter to serialize events. It is not a concurrent graph-editing protocol. Changing snapshots stops following; reconnecting may replay the latest matching event. Stop following to explore without new events moving the view.

This is usable by a local Codex agent or by an orchestrator that invokes the CLI. It is not an installed ChatGPT host callback or a Symphony hook configuration. Ordinary chat without filesystem access uses focus links. No startup/stop hooks are installed. The transient event is Git-ignored and excluded from production builds. For a private static deployment, a trusted host must provide the same local event-file mechanism explicitly; the viewer does not create a public write endpoint.

## Worktrees and the shared outcome

Choose **Worktree example** for a synthetic comparison. For a real project, run from the repository root:

```powershell
python -B scripts/export_worktrees.py /path/to/repo /path/to/worktrees.json --source docs/workflow-records --project your-project --main main
```

Use the relative directory containing the project's canonical workflow Markdown. The collector reads committed records from local `main` using Git archive into a temporary directory, and reads the same directory in each registered local worktree, including uncommitted records. It never checks out, merges, commits or fetches branches. Main must already contain valid workflow records; an absent or invalid baseline fails instead of presenting a false comparison. Invalid/unavailable/changing worktrees are listed as omitted. Source hashes and Git status are rechecked after collection; this is a bounded snapshot, not a filesystem transaction.

Import the resulting JSON (maximum 16 MiB) and use the worktree selector. Each branch keeps its own version of each record. The comparison shows added, changed and removed records against main, commit ancestry and dirty status. Changes trace through declared relationships to shared outcome IDs; unlinked changes explicitly say so. Removed records remain listed against main. Source-byte hash differences alone do not count as a record change. Code-only changes without workflow records are **not** attributed to goals automatically. “Included in main” means clean worktree HEAD is an ancestor of local main; it does not prove deployment or business success. “No record differences” is not “no code differences”.

The bundle is a local generated artifact. It has no absolute worktree paths, but it contains exported project content; keep it within the project's existing access boundary. Re-export/reimport to refresh. Imported content is not persisted by the browser and large-graph performance remains unverified.

## Checks

```powershell
npm test
npm run build
# Fresh isolated Chrome profile with remote debugging enabled, never a personal profile:
node browser-check.mjs DEBUG_PORT OPTIONAL_SCREENSHOT_DIRECTORY
```

The browser check covers stage counts, original summary text, keyboard entry/return, chat focus, faded context, empty-stage recovery, both themes, mobile node visibility and document overflow. The existing model/export regression suites remain in the parent directory and repository tests. It is not a screen-reader certification or a production-capacity test.

Dependencies are locked in `package-lock.json`: React (MIT), React Flow (MIT), Dagre (MIT), Radix Icons (MIT); TypeScript (Apache-2.0), Vite/plugin-react and tsx (MIT). Dependency license notices remain in installed packages. The installed design-taste-frontend skill guided hierarchy, spacing, contrast and restraint; no third-party app design or source code was copied. Native CSS is used for this small product canvas rather than adding a second styling runtime.
