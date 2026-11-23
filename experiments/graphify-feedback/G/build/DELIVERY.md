# Study-space finder repair

Status: Verified within assigned local scope; author self-review, human acceptance pending. No external contact or deployment. Owner: requesting user; agent responsibility: G/build repair and local evidence only.

## Sources and authority

All paths below are relative to ../../corpus and were read directly to verify graph retrieval.

- decisions/meeting-18.md, USER 2026-11-10: current group is three people discussing 18:00-20:00 with required step-free access; compact comparison retained. Supersedes archive/meeting-01.md (USER 2026-09-01, old solo silent-work preference).
- reviews/note-12.md, USER 2026-11-11: unknown capacity/access stays visible, needs questions, cannot be confirmed.
- reviews/note-04.md, USER 2026-11-12: every selection replaces full detail/contact; concise cards and longer detail.
- reviews/note-29.md, USER 2026-11-20: false access means not step-free, never inferred stairs. Supersedes archive/proposal-07.md (AGENT 2026-10-04, unaccepted stairs/accounts proposal).
- engineering/record-31.md, USER 2026-11-21: all three reviews remain required; runtime data drives matching. archive/status-05.md (AGENT 2026-10-10) is stale smoke evidence, not acceptance.
- engineering/domain.md, undated field contract: full same-day interval, available seats, activity/noise matching, nullable facts, mismatch dominates unknowns; fictional source mailto.
- notes/layout.md, USER 2026-10-18: readable cream interface, no map/animation/accounts/payment/messages.
- notes/location.md, USER 2026-10-17: deferred location search, no invented travel estimates.
- incidents/case-22.md, OBSERVED 2026-11-14: encoding regression risk; apply_patch writes and ASCII UI punctuation avoid shell encoding conversion; actual rendered text inspected.
- Other-project graph results explicitly identify different projects; excluded from this finder. No other-project document read was necessary.

## Actual retrieval

Working directory: this build directory. Vocabulary inspected using `$g = Get-Content ../../graphify-out/graph.json -Raw | ConvertFrom-Json; $g.nodes | Select-Object id,label | Format-Table -AutoSize`.

Expanded queries used graph labels, not just the initial generic repair wording:

```powershell
$env:GRAPHIFY_QUERY_LOG_DISABLE='1'; graphify query "Current Study spaces group decision Required review unknown capacity access Selection entire detail supported accessibility label Runtime preferences catalogue Known mismatch dominates unknowns" --graph ../../graphify-out/graph.json --budget 1500
$env:GRAPHIFY_QUERY_LOG_DISABLE='1'; graphify query "Readable simple cream background Deferred location search Explicit UTF-8 inspection modified rendered text" --graph ../../graphify-out/graph.json --budget 1500
```

First query returned 27 nodes with truncated edge rendering; second returned 9 nodes. Source reads verified relevant facts, dates and authority rather than treating graph prose as truth. No retrieval failure/fallback. Direct source reads included the relevant documents listed above; source paths for layout/location/encoding were first visible in vocabulary before their focused query. Local caller search: `rg 'assess|app.mjs' .`; only the app and index production references required repair. Graph/corpus/snapshot were not written. Graph omissions were not treated as absence evidence.

## Scope and workflow

Used snapshot docs/workflows/deliver-change.md, implementation/implement-increments and verification/verify-change skills selectively. The gap was a functional repair with established visual direction, so no new discovery/design specialist was needed. Production reach: app.mjs exported assess and DOM rendering; index.html responsive and focus styling. No data/config/dependency changes needed. Added check.mjs, browser-check.mjs and two screenshots as local evidence. Kept existing dependency and loopback contract.

## Acceptance evidence

| Source expectation | Requirement/check | Result |
|---|---|---|
| Current group and runtime rules | assess uses runtime preferences; full hours, capacity, activity and required access; matching boundaries and changed preferences in check.mjs | Met |
| Unknown facts remain visible | needs-confirmation unless known mismatch; all six articles preserved; questions in selected detail | Met |
| Selection repair | Browser selects every room and asserts updated id, name, description, source contact | Met |
| Supported access label | false displays Not step-free; no Stairs label | Met |
| Short cards / full detail | Cards contain concise facts; selected panel description/reasons/contact | Met by actual screenshots and interaction checks |
| Readable phone/desktop cream layout | Inspected desktop.png (1280px viewport) and phone.png (390px); readable text, natural wrapping, no overflow or corrupted punctuation | Met by author inspection |
| No invented location/services | No maps, travel estimates, booking, accounts or message send | Met by code inspection |

`node check.mjs` first failed on the original always-suitable implementation at the expected mismatch assertion; after implementation it passed. It covers exact-hour boundaries, each mismatch, unknown seats/noise/hours/access, mismatch-plus-unknown precedence, silent-work and optional access.

`node browser-check.mjs` passed: actual assigned loopback app, all expected six states, every detail/contact replacement, phone overflow check and no page errors. Actual Chromium executable and installed Playwright specified by RUN were used. Both screenshots were opened with view_image, not merely generated. No production edits occurred after these passing checks. Browser contact links were inspected, never activated.

One implementation round, zero subsequent correction rounds. Stop reason: bounded functional and rendered acceptance checks passed within six-minute budget. User acceptance remains pending; no production or mail-client delivery claim. Data contract assumes valid same-day HH:MM and supported activity values as provided; no broader malformed-input interface was requested. Loading failures show a retry instruction, but that failure branch was not browser-tested.
