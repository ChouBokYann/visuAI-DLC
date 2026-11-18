# Saved shortlist

## Sub-features

At most three unique cafés; compare name, neighbourhood, coffee, brews, address and map destination; remove and replace; local refresh persistence; recover from malformed, unknown/duplicate/overflow values; continue in-memory with warning after storage failure.

## How to get to it (user POV)

Choose Find a café and open any result, or complete the story and open one of its three recommendations. Choose Save to shortlist. Open Shortlist in the header or View shortlist in details. Empty shortlist offers Discover cafés.

## Driving it with Playwright

Run `node .cursor/skills/verify-sidequest/scripts/shortlist.mjs`. It uses `getByRole('button', {name: 'Save to shortlist', exact: true})`, `Shortlist (3/3)`, named article cards, `Remove Apartment Coffee`, and Escape. It traverses both entry paths at 1440px and 390px, verifies focus after removal/close, checks `sidequest-v2-shortlist` through refresh, and simulates access/write failures in separate contexts. Passing outcomes and traces survive cleanup in `evidence/shortlist`.

## Gotchas

Capacity disables the save action and explains removal; already-saved cafés keep a disabled confirmation. Comparison replaces details and Escape returns to the original café result. Saved IDs are local to this browser origin; cross-tab synchronization is not promised. Failed persistence is session-only and no retry UI is provided. Failure injection models browser storage boundaries, not physical full-disk behavior.
