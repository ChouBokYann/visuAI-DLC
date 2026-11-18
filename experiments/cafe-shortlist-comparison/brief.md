# Saved cafe shortlist

Extend the existing Sidequest cafe app in experiments/cafe-personality-v2. A reader wants to keep a few promising cafes and compare them before choosing one.

Deliver a usable saved shortlist with at most three unique cafes. A user can save from cafe details reached through search or story results, open the shortlist from the app, compare cafe name, neighbourhood, coffee/brews, address and directions, remove a selection and add a replacement. Saving the same cafe twice must keep one entry. At capacity, explain how to make room. Empty state must offer a way back to cafe discovery.

Persist selected IDs locally across refresh. Handle malformed stored JSON, unknown/duplicate IDs and values beyond the limit safely. If storage access fails, keep the current session usable and tell the user persistence is unavailable. Preserve the existing story, matching, search and cafe data. Integrate with the current visual style, keyboard access and focus behavior. At 390px and desktop widths, labels and actions must remain usable with no page-level horizontal overflow.

Use existing dependencies and curated cafe facts. Work in the assigned checkout. Own only the cafe app and its local verification notes/helpers. Other agents may read your work; do not revert others' edits. Do not inspect other workspaces. Make no external publication or merge. Run relevant existing tests/build and real browser verification, preserve evidence outside disposable runtime state, and report limitations. Supply concise design notes, test commands/results and any remaining decisions. Use readable code. This is a local development task.
