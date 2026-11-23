# Delivery evidence

Implemented the bounded Coffee Atlas realization in the existing React app. No dependencies or services added. The cream/Natural Earth map remains the main scene. Selecting an origin adjusts the map to 130%, pans toward the origin/Singapore connection, draws a labelled discovery link, opens contextual notes and sourced cafe listings. World view restores the overview without removing selection.

Guatemala and Ethiopia use the licensed regional photographs from the supplied asset packet, full frame, with accessible caption, creator, source and license links. Cafe photography is explicitly unavailable. Comparison supports three origins, preserves selection/map state and restores the previous scroll/focus when closed. External evidence opens separately so the exploration remains intact.

Validation performed 2026-11-23:
- Test written before implementation: comparison capacity/removal/order failed for missing implementation, then passed.
- npm run build: passed TypeScript and Vite production build.
- node node_modules/tsx/dist/cli.mjs --test src/logic.test.ts src/comparison.test.ts: 5 passed.
- node trial-browser.mjs: Chromium at desktop 1440x1000 and mobile 390x844, reduced motion. Selection, immediate listings, comparison, return, source popup return, world reset, preserved selection, no page overflow or JavaScript errors passed.
- Actual screenshots inspected in one desktop/mobile batch, one correction batch, and final confirmation. Files: trial-desktop-selected.png, trial-mobile-selected.png, trial-desktop-compare.png, trial-mobile-compare.png.

Limits: no human acceptance, physical-device test, comprehensive keyboard/screen-reader or numerical contrast audit. The retained broader dataset is dated 2026-11-22; only the packet's representative El Sendero/Suke Quto relationships show the 2026-11-23 recheck. No inventory/serving claim. Static bundled listings do not have runtime source-loading/error states; image failure has an explicit fallback. Sources were supplied and not independently fetched by this implementer. Country boundaries are absent from the existing Natural Earth land layer. Photo coverage remains limited to the two representative origins. Comparison is session-local and is not persisted on refresh.

Final visual confirmation: the SVG Singapore label can overlap the Ethiopia target at 130% zoom. The persistent text route below the map remains readable. No additional polish pass was performed. Focus changes pan/zoom immediately; the drawn route carries the brief motion sequence.

## Authorized correction — 2026-11-23

Initial parent observations supersede the initial local pass: the camera snapped (zero intermediate samples), compare return lost the map's actual pan, the later cafe action hid results rather than navigating, and the Singapore label overlapped a target. The original tests did not adequately cover those failures.

Corrected in the one authorized bounded attempt:
- Cancellable 500ms requestAnimationFrame interpolation changes actual map scale and pan, with immediate reduced-motion behavior. A new selection cancels the prior camera transition.
- Capture and restore actual map scrollLeft/scrollTop across comparison open/close; disable browser scroll anchoring within the map. Comparison removal does not change the camera.
- View Singapore cafes sits beside the selected label above the map. Both cafe actions focus/scroll to the result heading; Back to map returns explicitly. Results are no longer hidden by the action.
- Desktop Singapore annotation moved below the destination. On phones the tiny annotation is omitted; the destination marker and clear origin-to-Singapore caption remain.

Regression evidence: correction-browser.mjs first failed on absent intermediate scale, then passed at 1440x1000 and 390x844. Sample scales included 101/109/121/126/128/129/130 percent. Compare with removal retained desktop [270,40] and phone [111,40]. Cafe heading entered the viewport after direct action. Reduced-motion selected camera settled immediately at 130%; interrupted selection settled on the latest origin. Build and five logic tests passed. Screenshots correction-desktop.png and correction-mobile.png were inspected in the bounded batch; mobile label simplification was the only visual follow-up.

Remaining limits from initial delivery still apply: no licensed cafe photograph, live inventory, country boundaries, physical-device or exhaustive accessibility audit. These are local automated observations, not human acceptance. Camera motion runs through React state/layout each frame; no target-device performance profiling was performed.
