# Focused project flow

Owner: ChouBokYann. Branch: first-iteration. The user explicitly requested this React/TypeScript redesign and confirmed that navigation should originate in this ChatGPT/Codex chat. Agent responsibility: implement the viewer, its local navigation helper, integration guidance and verification. Affected paths: `experiments/project-overview/react/`, the parent viewer README, shared workflow output contract, handoff skill and `.gitignore`. Existing Markdown fixtures and validators are reused. This is branch experimentation, not independent approval or adoption on main; NORTHSTAR remains unchanged.

## Design decision

The prior viewer required reading lanes and an inspector to understand progress. The replacement uses a single left-to-right relationship canvas, six lifecycle filters, one selected decision and its immediate neighbours. Clicking a record reveals its canonical summary, without a provenance panel. Project zoom retains the business aim and all records; OODA steps appear as small node labels. Long titles stay fully readable in the summary and accessible labels. The explicit synthetic label remains visible on desktop; the example selector remains available on narrow screens.

The requested design-taste-frontend skill guided the redesign. Dials: variance 4, motion 2, density 3. Restrained blue accent, neutral light/dark tokens, system fonts, consistent 8px corners, native CSS, Radix icons, no decorative imagery. The skill's landing-page guidance does not apply to this interactive product canvas.

React Flow supplies tested pan/zoom and node mechanics; Dagre supplies graph layout. Reusing these avoids maintaining custom interaction physics and layout algorithms. A static viewer avoids a backend and project-storage growth. React adds an initial JavaScript bundle of about 511 kB (163 kB gzip), including libraries and bundled examples; Vite reports its normal 500 kB warning. No artificial code splitting was added solely to suppress that warning. Revisit larger graphs and bundle loading after real-project trials.

The source relationships are not a chronological event log. Rendering reverses business references for left-to-right reading and labels their meaning; explicit evidence triggers remain explicit. Multiple direct neighbours remain visible when the graph branches. No invented sequence, evidence, completion percentage or business success is introduced.

## Chat navigation

The user chose this ChatGPT/Codex chat. No supported live host bridge was available, so the complete local integration is a validated URL helper plus clickable focus links. The helper uses the existing snapshot validator and rejects unknown records, wrong projects/stages and unsafe base schemes. Chat labels are user-visible context, not authenticated identity. No transcript is read or stored. The user must load the corresponding exported snapshot; new tabs start with the synthetic example. See the viewer README for commands and limits. Automatic navigation without a click remains a separate host integration.

## Observed validation, 2026-11-15

- TypeScript check and Vite production build passed. Installation audit reported zero known vulnerabilities at installation time.
- Four graph/focus tests passed; the existing 21 Python and 21 Node regression tests passed (46 automated tests total).
- The focus helper generated a valid link from a fresh export of the canonical eight-record example. A missing snapshot failed with a nonzero exit; no file was created or changed.
- Isolated headless Chrome passed browser checks for two-node Ideation filtering, exact canonical summary, keyboard open/return, chat focus, zoom fading, empty-stage recovery, theme switch, invalid-link reporting, invalid-import preservation and selected-node visibility at 390px. Desktop 1440px and narrow 390px light/dark screenshots were inspected. No page runtime exceptions were observed.
- Browser testing caught and fixed a keyboard-focus return bug, text encoding damage and a viewport reset on empty-stage navigation. The visibility assertion now checks that the selected node is inside the mobile canvas.
- No real-project comprehension study, screen-reader certification, touch hardware session, large-graph capacity test or live host integration was performed. Browser checks are reproducible through `browser-check.mjs`; temporary screenshots and isolated browser profiles are not committed.

The localhost development preview remains running for the user's trial. No production deployment, account integration, cloud storage, main merge or independent review is claimed. Ruflo discovery found no available tools in this session.

## Sources

- [React Flow theming](https://reactflow.dev/learn/customization/theming) and [instance API](https://reactflow.dev/api-reference/types/react-flow-instance).
- [Vite guide](https://vite.dev/guide/) for build/runtime setup.
- The existing [learning-loop research](learning-loop-design.md) retains CRISP-DM, OODA and overview/detail rationale. This change preserves that method while simplifying its presentation.

Dependency versions and transitive licenses are represented by the lockfile and installed package notices. No third-party application implementation was copied. Undo by removing the new React directory and optional navigation references; the original standalone prototype and canonical records remain available.
