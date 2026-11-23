# Coffee Atlas: delivery record

Owner: ChouBokYann. Scope: [E12 proposal](../../output/proposals/experiment-12-coffee-atlas.md). User approved the proposal/waiver question with “go ahead” and explicitly selected Taste UI. This supersedes the proposed Impeccable choice, not the product criteria. No publication/deployment authority.

## Current revision: map first, details on demand

### Current verdict: Changes required — whole experience (2026-11-23)

The user rejected revision 5 as unfinished: insufficient photography, static zoom rather than place-focused exploration, uncoordinated map/detail movement, and a map that reads as assembled parts. Prior functional passes remain valid for their recorded artifacts; they do not establish an acceptable experience. This supersedes the earlier ready-for-evaluation wording. The problem includes incomplete brief translation and weak holistic visual review, not absence of Playwright.

Revised specialist brief, grounded in the current feedback:

- **Experience:** explore a place through coffee, then find a relevant Singapore cafe. The map is a coherent illustrated scene, not a container for independently styled icons. Preserve recognisable geography and the clean cream direction. Let a shared palette, linework, texture, perspective and level of detail govern land, terrain, sea, labels and selected state together. Asset layering is technically acceptable only if the rendered composition reads as one authored map.
- **Media:** photography is now an explicit user requirement. Use relevant origin landscapes/growing context and real cafe or coffee photographs where suitable, with correct subject, permission, credit and useful crops. Show a meaningful photo in the selected-place experience and useful imagery in cafe results; choose quantity by role rather than a quota. A generic stock cup must not imply a pictured cafe, farm or current lot. Do not substitute generated documentary-looking pictures for sourced real locations. No suitable assets have yet been selected or cleared for this revision; that is unfinished work, not permission to omit them.
- **Connected journey:** overview invites selection; choosing an origin moves and zooms the map toward that origin, then introduces its photo, flavour and culture context. Define camera position with the detail panel's footprint so the selected place remains visible. Desktop can keep a focused map alongside details; mobile must intentionally coordinate map framing, details and page movement. Selecting another place interrupts the previous transition; closing returns to a useful overview/context. Browser back, filtering, keyboard focus and reduced motion preserve coherent state.
- **Exploration:** zoom controls operate around the selected location or the user's chosen focal point, not an unrelated viewport centre. Direct map exploration and return-to-overview remain discoverable. A bounded zoom percentage by itself is not sufficient evidence of place exploration. Gesture choices may be implemented within the existing stack if they improve this journey; avoid a new map engine without demonstrated need.
- **First representative slice:** render one complete origin-to-cafe journey using actual proposed assets, at desktop and mobile. Inspect the overall scene, media crops and information hierarchy; play selection, camera/details coordination, rapid reselection and return. Do this before extending the treatment to all origins. Working buttons, a screenshot file or a named design skill do not establish readiness.

Agent-proposed layout/camera/media treatment above is distinguishable from the user's explicit feedback. Exact composition remains delegated; do not ask the user to specify every decorative detail. Required next work is asset selection and a representative integrated visual/interaction pass, not another isolated mountain or easing patch. This record changes the brief and verdict only; it does not claim the app now meets them.

### Revision 5: region-specific terrain and map exploration (2026-11-23)

User rejected repeated mountain symbols and inconsistent terrain/map styling, and requested zoom plus Playwright-led visual iteration. Owner: ChouBokYann. Agent scope: WorldMap.tsx, map CSS, zoom interaction tests, and evidence. Existing Playwright is reused, no install needed. New authorized behavior: bounded zoom controls, reset, mouse drag and native touch/keyboard scrolling of the zoomed map. Existing origin selection and motion remain. Terrain uses distinct illustrative silhouettes for North American ranges, Andes, Ethiopian highlands, Himalayan ridge and Indonesian volcanic landscape, with the map's existing green palette and outline weight. These are visual interpretations, not surveyed terrain or claims about individual farms.

Inspect actual browser overview and close-up screenshots, including mobile. Check whether regional silhouettes differ meaningfully and whether their colors/linework belong to the coastlines. Tests cover bounds, reset, panning, keyboard controls, origin selection at zoom and mobile overflow. Preserve past evidence; no changes to canonical skills, sourced listings, accepted geography, packages, publication or deployment.

Implemented five independently drawn terrain groups rather than copies of a symbol: jagged North American peaks, a long Andean ridge, a broad Ethiopian plateau, a horizontal Himalayan range and a small Sumatran volcanic form. Reused coastline stroke color/weight and green land shades; removed the scattered generic tree arrows. The unchanged coastlines remain the geographic source of truth. These stylised groups are not detailed or surveyed depictions of individual mountains.

Map now zooms from 100% to 250% with keyboard-operable buttons, a live zoom readout and reset. The zoomed viewport supports mouse drag, native keyboard scrolling and native touch swipe. Selection brings its marker/callout into view. No custom pinch-to-zoom gesture is implemented; browser zoom remains available. Previous desktop/mobile evidence is archived in output/coffee-atlas/revision-4.

Validation: the new zoom test first failed because Zoom in did not exist. After implementation, production build/types passed; seven zoom checks passed, covering scale/bounds, mouse drag, keyboard pan, zoomed selection visibility, reset, mobile overflow and Chromium-emulated touch swipe. Four motion groups and fourteen existing browser groups passed, with no page errors or external runtime requests in the latter. The new zoom status required narrowing the invalid-origin status test, without weakening its message/removal assertions. Impeccable's detector returned no mechanical findings on changed UI files.

Actual overview and zoomed screenshots were inspected. First visual pass found an offscreen selected marker; selection now centers the marker/callout and the test checks its viewport bounds. Mobile full-page capture also caught an unsettled scroll/compositor frame despite correct bounds; the evidence capture now returns the page to the top and waits two animation frames before taking the viewport screenshot. Final screenshots show the selected region, readable controls and different terrain silhouettes using the coastline's visual vocabulary. This is author assessment, not user aesthetic acceptance. Evidence: output/coffee-atlas/zoom/{desktop-overview.png,desktop-closeup.png,mobile-closeup.png,results.json}, browser-results.json, motion/results.json and revision-5.json.

Limits: touch was emulated, not tested on physical hardware; no Safari/Firefox or physical-device frame-rate claim. Playwright was already present: this trial improves visual inspection and interaction coverage rather than introducing it as a new dependency. A small set of inspected views does not certify overall design quality. No push, commit or deployment.

### Revision 4: terrain and selection motion (2026-11-23)

User accepted the geography, rejected primitive mountain marks and simplistic motion, then authorized another trial after the specialist-brief refinement. Owner: ChouBokYann; agent owns WorldMap.tsx, App.tsx, scoped CSS, motion checks and evidence in this experiment. Preserve geography, palette, copy, sourced cafe flow and accessibility; no packages, services, push or deployment.

Impeccable 4.4.0 animate/delight guidance and craft-floor inform this scoped refinement. Agent-proposed treatment: irregular overlapping mountain ranges, shaded faces, ridge cuts and soft foothills at map scale. Geographic positions stay unchanged; terrain is illustrative, not elevation data. Motion thesis: selecting an origin connects place to information. Immediate location emphasis leads into a connector trace and a brief coordinated detail arrival. Latest selection replaces prior motion; reduced motion preserves selection and content without travel. Inspect representative artwork at desktop/mobile and sample actual animation states; test interruption, keyboard, close, filter and reduced-motion behavior. Keep implementation native to the existing stack. This is a proposed treatment under delegated styling authority, not a user-specified art asset.

Implemented original SVG mountain ranges with overlapping silhouettes, shaded planes, ridge details and foothills, scaled across the existing terrain positions. Geography asset and origin coordinates are unchanged. A keyed selected-origin overlay traces its connector over 440ms and settles a location ring over 520ms; the keyed details panel arrives over 460ms. Native CSS handles timing, with no dependency or event queue. Selection state updates immediately. Reduced motion shows the final selection and connector without animation.

Validation: production build/type check passed. `browser-test.mjs` passed 14 groups at five widths with no page errors or external runtime requests. `motion-test.mjs` passed four groups: sampled timeline progression, rapid reselection/settling, keyboard activation, and mobile reduced-motion selection/focus. Run it with the same PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH and ATLAS_BASE_URL as browser-test. Initial motion-test failure was a test parsing bug (computed SVG offset includes px); parseFloat fixed the oracle, not the app. Impeccable's mechanical detector returned an empty findings list on the three changed UI files; that is not an aesthetic verdict.

Visual review inspected desktop/mobile output and sampled animation frames at 0/150/520ms. The first batch exposed low-contrast fading text and screenshots captured mid-transition; removed text opacity animation and made settled screenshots await animation completion. Final checks passed and final desktop/mobile frames were inspected. Session videos and timeline frames are in output/coffee-atlas/motion; continuous video playback was not independently reviewed. Physical-device frame-rate performance and Safari/Firefox remain unverified. Small mobile terrain is necessarily less detailed than desktop. The result is ready for user evaluation, not user-approved or proof the framework always produces good design. No commit, push or deployment.

### Revision 3 local quality-loop trial (2026-11-23)

The user rejected revision 2's crude geography and authorized testing the updated quality loop. Earlier visual-pass wording below is historical, not current acceptance. Owner: ChouBokYann; agent owns map artwork, its coordinate alignment, source attribution and verification in this experiment and output/coffee-atlas. Existing local-trial authority applies; no push or deployment.

Intent: a recognisable, playful atlas that helps discover origins, with cream styling and brief content. Quality anchors: recognisable continent silhouettes and coherent origin placement; illustrated warmth without visual clutter; readable selectable origins on desktop/mobile; preserved origin-to-cafe journey. Inspect actual screenshots and interactions, not word counts as a substitute for design judgment.

Asset check found Natural Earth's public-domain 110m land outlines suitable for a small vector world map. Use a pinned, locally bundled derivative; no new package, paid service or runtime request. This replaces invented geography with sourced outlines while retaining original styling. Country-level markers are indicative, not farm coordinates. Source commit/hash will be retained alongside the derivative. Archive revision 2 evidence before replacement.

Taste correction brief: "The cream, map-first composition and on-demand details fit the direction, but invented coastlines fail recognisability. Replace them with verified land silhouettes. Keep a lightly illustrated atlas treatment, restrained terrain marks and quiet ocean labels; place origin markers in the same projection. Preserve existing selection, filters, keyboard behavior and content. Inspect the representative Ethiopia view at desktop and mobile before accepting the change. Do not call accurate outlines alone a polished bespoke illustration. Stop cosmetic repetition if no meaningful improvement is visible and disclose the remaining craft gap."

Result: replaced invented outlines with a 52,808-byte local SVG derived from pinned Natural Earth land polygons; aligned all six markers to its projection. Provenance and limitations: [MAP-SOURCE.md](MAP-SOURCE.md). No runtime library or remote map service. App structure, sourced cafe content and progressive disclosure are unchanged.

Validation: TypeScript/production build and four logic/data tests passed. The built-preview browser suite passed 14 groups across 1440, 1024, 768, 390 and 320px, including SVG response/decoding, origin matching, navigation, filters, keyboard/focus, reduced motion and non-overlapping targets. No page errors or external runtime requests observed. First browser attempt failed because the old preview server had stopped; starting the local preview resolved setup without a code change. Host execution with a dedicated browser profile, not an OpenShell sandbox.

Actually inspected desktop and mobile screenshots: recognisable continent/island silhouettes, coherent origin callouts, cream/green palette, compact selected detail and full-name mobile controls. Geography is materially improved over revision 2. Remaining visual gap: this is a restrained illustrated geographic map, not a richly authored cartoon illustration. Accurate outlines and decorative terrain marks alone cannot establish that craft level. No bespoke illustration asset was commissioned or generated; no claim is made that one is unavailable through all possible tools. User aesthetic acceptance remains pending; visual brief is only partially evidenced. Do not treat the functional pass as full product acceptance.

Workflow finding: the quality loop changed the correction from repeated curve smoothing to checking and replacing the essential asset, then validating its rendered result. One targeted implementation was sufficient to demonstrate that improvement; it does not prove general effectiveness across briefs. Stop here for user evaluation rather than iterating cosmetic details without a stronger illustration direction. Current evidence: output/coffee-atlas/{desktop.png,mobile.png,browser-results.json,revision-3.json}; older manifests and checks describe earlier artifacts. No commit, push or deployment.

User rejected revision 1 as too wordy and visually weak, then authorized another attempt. Its functional passes remain valid for that artifact; its visual acceptance is **Changes required**, superseded by the new candidate rather than erased. Prior screenshots, browser results and manifest are preserved in output/coffee-atlas/revision-1/.

Revision 2 removes the large introductory narrative, boxed map/sidebar layout, repeated desktop origin list, automatic cafe section and long about section. The softened map now occupies the main surface. A selected origin shows three notes, one short culture line and a cafe-reveal action. Stories, precise lot context and sources remain in disclosures. Cafe availability status stays visible when cafe matches are opened. Mobile retains full-name list controls alongside compact map callouts.

Taste guidance was reapplied directly for information hierarchy, reduced copy, consistent warm palette, restrained selection feedback and original illustration. User direction overrides generic style prescriptions. No service dispatch or paid image generation is claimed. This is a redesigned candidate, not a declaration that the user's taste has been satisfied.

Measured at the same 1280px viewport: entry copy decreased from 282 to 62 words; Ethiopia selected decreased from 429 to 92. Counts are evidence of reduced verbosity, not a visual-quality score. Final desktop/mobile screenshots were actually inspected after transition completion; map callouts and essential controls remain readable. Fresh review is recorded below when returned.

`node check.mjs` passes logic, deliberate mapping-fault detection, types and build. Updated built-preview browser checks pass 13 groups at five widths, preserving selection/filter/history/keyboard/source tests and adding cafe-hidden-until-requested, collapsed story access and visible-copy bounds. No external runtime requests or page errors observed. New interaction uses a button with aria-expanded/aria-controls; details and cafes reset when the selected origin changes. Final subjective verdict: **Ready for user evaluation**, not user-approved.

The sections below preserve the initial implementation history; revision 2 above supersedes its visual arrangement and automatically visible cafe behavior.

## UI direction handed to Taste

Reading this as an illustrated coffee atlas for Singapore explorers, with a clean, playful cream aesthetic and a quiet editorial layout. Required: cartoon world map; coffee origin notes/culture; source-backed Singapore cafes. Primary journey: origin -> details -> cafe. Desktop map plus adjacent panel; mobile map/list then details. Exact styling delegated. Geography recognisable, type legible, no hover-only content. User's cream direction overrides the Taste default palette warning.

Specialist: local design-taste-frontend/SKILL.md (tasteskill), applied directly, not a remote generation service. DESIGN_VARIANCE 6 / MOTION_INTENSITY 3 / VISUAL_DENSITY 3. Original SVG map is explicitly in the approved design, overriding generic marketing-image advice. No image-model calls, downloaded fonts, Tailwind/Motion installs, unnecessary icon library, dark mode or logo wall. Native CSS, installed React, locally available Georgia for atlas headings and system sans for controls. An atlas is an editorial/exploration surface; the skill's marketing rules do not prescribe discovery logic.

Taste handoff prompt: “Build Coffee Atlas for Singapore explorers. Preserve a clean cream canvas, cartoonish recognisable world map, restrained green land and rust selection accents. Map is the visual centre, not a decorative background. Selecting a growing origin reveals a concise flavour profile and place/culture story, then real Singapore cafe/roaster matches with dated first-party sources. Never imply online beans are served at every branch. Prioritise spacious composition, legible labels, keyboard parity, mobile flow and honest empty states. Use only existing dependencies and original SVG/CSS artwork. Exact illustration and typography details are yours within this direction.”

## Implementation plan

Using writing-plans and executing-plans inline; this existing record is the scope-authorized plan location. No mandatory per-task agent fanout or commits.

- [x] Data and logic: src/data.ts owns six origin/lot records and cafe evidence; src/logic.ts owns filtering, matching and URL state; src/logic.test.ts fixes independent examples. Observe failing checks, implement and pass. Check unknown origins, conflicting filters, no matches and exact cafe mapping.
- [x] First journey: src/App.tsx + src/style.css + src/WorldMap.tsx render one representative map/detail/cafe journey. Inspect desktop/mobile before finishing the full collection. Reuse installed React/Vite/TSX/Playwright through a local node_modules junction; no installs or modifications to dependency targets.
- [x] Complete six origins and source/availability disclosures; check all controls and back/reload behavior. Original artwork requires no external image rights.
- [x] Build, logic tests, isolated known-fault control and browser tests. Inspect screenshots at desktop/mobile; fix material issues. Fresh read-only final review per executing-plans. Record actual artifact/evidence and leave aesthetic acceptance to user.

Review focus: invalid URL; selection hidden by flavour filter; no search matches; branch-level stock ambiguity; overlapping mobile map labels. Each receives a test or explicit editorial inspection. Selection excluded by filtering clears details; reset returns all origins without inventing a selection. A direct origin URL selects it with filters cleared. Keyboard origin list is equivalent to map markers.

## Source policy

Research checked 2026-11-22. Online catalogue data is a dated snapshot, not live inventory. Tiong Hoe confirms it retails beverages and beans at its outlets subject to stock; individual lot serving remains unconfirmed. PPP pages contain both stock/backorder template text; do not infer live availability. Each entry carries its own link. Culture includes growing/processing traditions and community stories, clearly scoped to the cited region or farm rather than all citizens.

## Current result

**Ready for user evaluation.** Author functional and visual checks passed; user aesthetic acceptance remains pending. Built preview: http://127.0.0.1:17821/ . Local process execution uses the host environment and a dedicated automated browser profile; this trial does not claim OpenShell containment. No commit, push or deployment.

## Final acceptance evidence

| Criterion | Result and evidence |
|---|---|
| E12-01 | Six origins across Americas, Africa and Asia. `SOURCES.md` records direct evidence; `src/data.ts` retains links and scoped lot/culture descriptions. Actual content inspected, not just counted. |
| E12-02 | All six map selections checked against literal, independently specified cafe expectations in `browser-test.mjs`; dataset checks additionally cover exact matching and unrecognised origins. |
| E12-03 | Three independent Singapore businesses; eight lot listings, including one sold-out example. Every match has product and location evidence, snapshot date and availability qualification. No current serving or stock guarantee is made. |
| E12-04 | Browser exercises flavour exclusion of selected origin, clears stale detail/cafes, conflicting search empty state, reset and trimmed case-insensitive search. Logic tests cover explicit examples. |
| E12-05 | Actual browser back, reload and invalid-origin recovery pass; URL parser also tested with unknown/empty/prototype-like input. |
| E12-06 | Browser verifies 1440, 1024, 768, 390 and 320px: no page overflow or intersecting map hit targets; callouts at least 24px, equivalent mobile list targets 44px. Pointer and keyboard selection, reduced-motion scrolling and close-focus restoration pass. This is targeted accessibility evidence, not a full WCAG certification. |
| E12-07 | Inspected actual desktop and mobile screenshots: cream canvas, green original illustrated continents, rust selection, visible origin/lot details, restrained hierarchy and matching cafes. The desktop map is central, mobile uses connected country-code callouts plus full-name list. Screenshots: `../../output/coffee-atlas/desktop.png` and `mobile.png`. Final user taste judgment remains pending. |
| E12-08 | `node check.mjs`: four logic/data groups, intended-fault control, TypeScript and production build pass. `browser-test.mjs`: 12 groups pass on built preview at 17821; no page errors or external runtime requests. All commands fail on assertion/setup errors instead of counting them as success. |
| E12-09 | This record, README, source audit and raw evidence preserve inputs, specialist handoff, scope and tested state. `checks-final.json` hashes source/tests; final artifact manifest also records build and Taste-skill hashes. |

Raw evidence: [output directory](../../output/coffee-atlas/). Relevant files are `logic-red.txt`, `logic-final.txt`, `fault-final.txt`, `fault-control/result.txt`, `types-final.txt`, `build-final.txt`, `checks-final.json`, `browser-results.json` and `artifact.json`. Initial render screenshots and first browser-failure evidence remain distinct from final results.

## Corrections and review

Initial stubs failed all three intended logic assertions; implementing filtering, matching and URL interpretation made them pass. A later real-data check added explicit six-origin/three-business relationships. The isolated fault control removes origin filtering, then confirms unrelated-cafe assertions fail while setup remains valid.

First browser launch failed because Playwright 1.65.1 expected an uncached browser. Used the existing Chromium 151.0.7922.34 executable explicitly, without downloads or sandbox-disabling flags. Windows working-directory mistakes and one UTF-8 read issue were setup errors, not behavioral evidence; corrected commands rather than claiming these were useful red tests.

Rendered inspection showed geographic dots were too close for mobile use. Clickable controls moved to linked callouts; the automated 320px overlap assertion then caught Guatemala/Colombia, which was corrected by moving the callout, not changing expected geometry. A repeated run before the path correction still failed; the passing result followed the actual source edit.

Fresh reviewer `coffee_atlas_review` inspected source, data, tests and screenshots. It found a literal question-mark separator introduced by a shell encoding conversion and missing focus restoration on closing details. Both fixed; close now has an actual keyboard/browser assertion. Reviewer confirmed both fixes and found no remaining issue in its scope. Review was read-only and did not independently revalidate live catalogue stock. Final suite runs against built output, not only the development server. Caption contrast was also corrected from approximately 4.15:1 to 4.93:1; primary CTA contrast is approximately 6.72:1.

## Workflow findings

1. UI direction successfully constrained the specialist: user-requested cream palette and original SVG atlas overrode Taste's generic palette/image preferences. Taste was applied as installed guidance, not falsely reported as a separate service or independently generated output.
2. A design skill does not own the evidence model. The important product distinction was lot listing versus branch availability; it was settled in requirements/data before visual styling.
3. Functional green checks did not catch the literal map separator or removed-button focus loss. Screenshot/copy inspection plus fresh review found those, and the meaningful behavior received a regression assertion.
4. The representative first visual journey was Ethiopia -> PPP/Nylon. All six data entries were prepared beforehand to establish real coverage, rather than fabricate placeholder matches while building the map. This is a deliberate adjustment to slice order, not a reduced scope.
5. Local cache reuse made the build inexpensive but introduced browser-version and portability limits. Explicit executable/version recording and testing built output kept the handoff honest. A fresh installation from a lockfile was not tested.

No core-workflow skill was changed by this trial. Follow-up framework improvements need their own evidenced scope. OpenShell remains an optional execution boundary; the app itself makes no external runtime requests, but that is not proof of host isolation.

## Taste pre-flight and limits

Brief/dials/theme/radius/motion choices are explicit. Original map is the required visual; no placeholder imagery, copied logos, unrequested images, generic marketing sections, ratings, scoring bars or invented inventory. Light theme is intentional per user cream brief; dark mode is not a missing feature. Source links, compact notes and longer culture copy serve discovery rather than a marketing-page word-count target. Reviewed actual displayed copy, visual hierarchy, mobile fallback, focus, overflow and reduced motion. No em-dash decoration or unrelated animation dependency. Web Vitals and Safari/Firefox/physical-device tests were not performed; do not claim those pass.

Catalogue snapshot can age and does not establish present café service. Culture entries are short regional/community introductions, not comprehensive national histories. Monogram badges are plain text identifiers, not official cafe logos. Final subjective aesthetic approval belongs to the user.

Revision 2 fresh review: coffee_atlas_review found no blocking regression. It confirmed map-first hierarchy, compact selected-origin summary, source disclosures, reset-on-origin-change cafe state, visible stock qualifications and focus restoration. Review was read-only; user visual acceptance remains pending. No independent live-stock revalidation was performed.
