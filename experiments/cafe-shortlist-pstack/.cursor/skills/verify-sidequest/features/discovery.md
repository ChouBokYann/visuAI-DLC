# Café discovery

## Sub-features

Search name/neighbourhood/coffee/address; compose brew and area filters; reset no results; details; curated source and map links.

## How to get to it (user POV)

Choose Find a café in the header or Discover cafés from an empty shortlist. Open a café row for details. Escape closes details and returns focus to its row.

## Driving it with Playwright

Shortlist helper reaches discovery and each of the first four café rows through user controls. Original `browser-test.mjs` uses searchbox Search cafés, combobox Neighbourhood, Espresso filter and Reset filters; expects six initial rows, one Apartment + Selegie match, zero after Espresso, then six after reset. Directions must contain the exact café name and address in the Google Maps query; shortlist helper verifies all three comparison destinations.

## Gotchas

Six curated entries, not live search. Do not navigate to external map/official sites to prove local URL construction. Existing baseline browser harness defaults to port 5175 and evidence/; use the documented BASE_URL and EVIDENCE_DIR overrides to preserve older proof.
