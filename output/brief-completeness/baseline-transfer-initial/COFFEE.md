# Coffee discovery implementation brief

## Purpose and retained requirements
Help curious coffee drinkers discover origins, read flavour notes and short place/culture summaries, and find real Singapore cafes associated with a selected origin. Retain the cartoonish map, clean cream appearance, accessible mobile and keyboard journey, and evidence-based listings. No factual listings, photographs, finished artwork or design system are supplied. This brief consolidates inherited context and new feedback; it does not establish user acceptance or implementation authorization.

## New explicit feedback
The map must form one coherent scene, photographs matter, selection must focus the view on the place and visibly connect it to its Singapore cafes, and visitors must compare origins without losing their place.

## Proposed visual and interaction response
Build one illustrated atlas scene with recognisable continent silhouettes, consistent outlines, shallow layering and restrained paper texture on cream. Avoid unrelated map images or miniature scenery that becomes illegible on phones. Use dark readable text and earthy accents; keep labels live rather than baked into artwork. Marker placement must not imply unsupported precision.

Proposed photo role: selected-origin and cafe detail photographs complement the shared illustration. Use captioned, sourced images whose subject is clear; generic photography must not imply a verified cafe, origin or sourcing relationship. Obtain authorized or suitably licensed photographs and illustration, record attribution and rights, and inspect them in desktop and phone compositions before treating visual quality as complete.

Open atlas ? select origin ? inspect flavour/culture detail and linked Singapore cafes ? follow sourced cafe/contact link. Selection gently pans/zooms the atlas to the origin, highlights its marker and names the selection. Show a clearly labelled connection to a Singapore destination/cafe panel using the same origin name and selection treatment; this represents listing association, not a factual shipping route. Keep an overview/reset action available. Reduced-motion users receive an immediate focus change.

Provide an equivalent searchable origin list. On desktop show map and detail together; on phones keep the selection heading and cafe section directly below the map. Visible focus, readable contrast, accessible touch targets and non-colour selection cues are required.

Proposed comparison: pin up to three origins and compare flavour notes, culture summaries and verified cafe associations. Opening comparison preserves selected origin, map viewport and list position; closing it returns to that state. Opening a cafe and returning also retains selection. Label missing data explicitly; do not portray every coffee from a country as tasting alike.

## Data, states and dependencies
Each cafe needs name, Singapore location, matched origin, source link and verification date. Separate documented historical sourcing from current availability; unknown stock stays unknown. Provide loading, retryable failure and “No verified cafes listed for this origin,” without claiming no cafes exist.

Countries are a provisional taxonomy; countries versus growing regions remains unresolved. Current-menu versus historical-sourcing inclusion rules, verification owner and refresh cadence also remain unresolved. Real publication requires verified entries and appropriate assets; layout planning can proceed with clearly labelled structural placeholders.

## Completion checks
Walk through selection, focus, visible cafe connection, comparison and return on desktop, phone and keyboard. Verify preserved context, coherent map/photo composition, readable hierarchy, licensing, sourced associations and truthful empty/error states. Rendered quality and user acceptance remain unverified.
