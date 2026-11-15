# Project flow

The current frontend is React + TypeScript, with React Flow for the canvas and Dagre for left-to-right layout. This supersedes the parent directory's plain JavaScript presentation; the canonical exporter, validation model and Markdown examples are reused unchanged.

```powershell
cd experiments/project-overview/react
npm ci
npm run dev -- --port 5173 --strictPort
```

Open http://127.0.0.1:5173/. Node 22.12+ is recommended. The server binds to localhost. `npm run build` produces `dist/`, which can be served by an ordinary static web server; no database, login, chat transcript storage or paid service is introduced. Keep sensitive snapshots on a trusted local/private host. Runtime fonts are system fonts and no analytics or remote data requests are added.

## Read the flow

- Project shows business context and all records. The six product lifecycle words filter to exactly that stage's authored records. Unplaced records are accessible separately. Empty stages are explicitly empty.
- Node headings retain the authored OODA step. Links show relationships, **not timestamps or proof of causation**. Most source relationships are reversed for business-to-delivery reading (for example, problem → outcome is “addressed by”). Solid lines denote direction; blue dashes denote an explicit “prompted” trigger, dots denote checks, and dash-dot lines denote revisions. Inferred links have open arrowheads and an explicit label on selection, independent of the line pattern. No missing link is guessed.
- Blue indicates focus and feedback. Green is reserved for passed evidence, amber for stale/unresolved checks, and red for failures or blockers. Accepted decisions and implemented changes are not coloured as successful outcomes. Status text and shapes remain available without colour; the expandable Key explains the encoding in both themes.
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

## Validation

```powershell
npm test
npm run build
# Fresh isolated Chrome profile with remote debugging enabled, never a personal profile:
node browser-check.mjs DEBUG_PORT OPTIONAL_SCREENSHOT_DIRECTORY
```

The browser check covers stage counts, original summary text, keyboard entry/return, chat focus, faded context, empty-stage recovery, both themes, mobile node visibility and document overflow. The existing model/export regression suites remain in the parent directory and repository tests. It is not a screen-reader certification or a production-capacity test.

Dependencies are locked in `package-lock.json`: React (MIT), React Flow (MIT), Dagre (MIT), Radix Icons (MIT); TypeScript (Apache-2.0), Vite/plugin-react and tsx (MIT). Dependency license notices remain in installed packages. The installed design-taste-frontend skill guided hierarchy, spacing, contrast and restraint; no third-party app design or source code was copied. Native CSS is used for this small product canvas rather than adding a second styling runtime.
