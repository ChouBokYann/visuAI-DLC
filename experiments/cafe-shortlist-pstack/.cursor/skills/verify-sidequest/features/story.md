# Coffee story

## Sub-features

Four choices change the room and generate three recommendations; revisiting choices changes the portrait; new story resets; answers survive refresh in sessionStorage; motion controls and reduced-motion fallback.

## How to get to it (user POV)

Step inside from home; choose a seat, brew, company and daylight, then Find my cafés. Open a recommended café to save it. Change my choices and New story are under recommendations.

## Driving it with Playwright

Shortlist helper chooses A quiet corner → Espresso → Save them a seat → Stay until golden hour, clicking Continue after the first three and Find my cafés last. It opens the first `.picks button`, saves, verifies the same café in the shortlist, and checks focus returns to the recommendation. Original `browser-test.mjs` adds motion samples, edited portrait, session restore, restart and WebGL fallback. `npm test` covers all 36 paths.

## Gotchas

3D initialization can take longer in software Chromium; expect `.room-canvas[data-loaded=true]` for scene checks. Shortlist assertions do not establish visual motion quality. Reduced motion is deliberately enabled in shortlist journeys; physical device performance is unverified.
