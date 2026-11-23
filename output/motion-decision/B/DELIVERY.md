# Delivery

**Decision: ready for review.** Selecting an origin centers its marker at 250%. A second selection starts from the visible camera position and pulls back on longer crossings. A small world map keeps the connection to Singapore visible and names the matching cafés. View listings leads to their sourced entries. With reduced motion, the map moves directly to the same framing.

## Checks

- The TypeScript and Vite production build passed. All five existing logic and comparison tests passed.
- Local Chromium at 1280 × 850 and 390 × 850 showed intermediate movement toward Guatemala. Retargeting to Ethiopia preserved the camera position at handoff and settled on the Ethiopian marker. Both matching cafés appeared.
- The browser checks exercised the listing link, both supplied origin photos in use, comparison, world view, reselecting the same origin, and closing details. All six origins reached their selected framing with reduced motion. Neither tested width overflowed horizontally.
- Run the checks with `node journey-check.mjs` against the local server. Set `ATLAS_URL` for a different address or `CHROMIUM_PATH` for an existing Chromium executable.

Physical phones, Safari and Firefox remain untested. Café availability retains the guide’s existing source dates.
