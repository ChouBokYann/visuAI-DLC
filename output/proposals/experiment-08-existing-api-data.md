# [Proposal] Experiment 08: evolve an existing API without losing persistent data

Status: design prepared 2026-11-21; no source copy, database, migration or experiment execution created. Bok requested progression after Experiment07. The prior local exception was specific to Experiment07; no new exception, publication permission or other-maintainer approval is inferred.

## Change and lifecycle process

Evaluate system understanding, change-impact assessment, interface evolution, implementation, verification and safe application rollback using an isolated copy of an existing backend with a real PostgreSQL database. The synthetic product task is an optional transaction `note` field. It is an experiment request, not a requested feature for the original spend-tracker application.

Future paths: `experiments/existing-api-data/` in a separate visuAI-DLC branch/worktree. Product changes stay inside its copied candidate. Canonical skills, original repositories, all prior experiments and protected refs remain unchanged. No migration is run against an existing database.

## Problem and need

The café trials demonstrated frontend/API coordination and local artifact recovery, but did not change an unfamiliar existing database-backed application or preserve persisted data through a database restart. A passing new endpoint alone cannot establish that old callers still work, rejected writes leave rows untouched, ownership rules survive, or rollback preserves data introduced by the new version.

## Candidate selection and observed source

Recommended by the agent: the existing spend-tracker backend at `C:/Users/maker/Documents/Projects/spend-tracker/spend-tracker-ai/backend`, committed revision `a5bf43927c9ee6ff3c141f8f61b44f8839db4246`. It uses Express/TypeScript, Sequelize and PostgreSQL. Existing routes are authenticated; the transaction controller scopes lookups by `{id,userId}`. Creation and PATCH currently have no note field. The frontend service sends ordinary JSON create/PATCH payloads and consumes `{success,data}`. PostgreSQL17 initdb/pg_ctl binaries and backend node_modules are locally available; runtime usability is not yet demonstrated.

The original repository has unrelated uncommitted changes, including a budget-service test. Export the named committed revision using an explicit source/config/package allowlist, not the dirty working tree. Record source hashes and preserve original state. Do not copy `.env*`, `.git`, credentials, user uploads, runtime databases, backups or personal documents. Keep the source repository entirely read-only. Reference only the needed original frontend service/type files to characterize old callers; do not copy or run the full frontend.

Alternatives inspected: Pokémon Inventory App has API scaffolding but its Inventory storage class is a stub; it cannot establish behavior over existing persisted data. A public tiny SQLite CRUD example would reduce setup, but a mature local backend supplies real authentication, callers and conventions. A larger production/cloud target would add unrelated risk and access requirements. If the isolated local PostgreSQL baseline cannot run within the setup bound, report incomplete and revisit the smaller example rather than silently substituting it.

## Proposed solution

### Frozen API contract

Add optional nullable `note` to transactions, preserving existing route names, authorization, response envelopes and old fields:

| Input/state | Required behavior |
|---|---|
| Existing row before migration | New note is null; all old columns, IDs, ownership, amounts and timestamps remain unchanged by migration. |
| POST with note omitted | Existing valid request still returns201; stored note defaults null. |
| PATCH with note omitted | Existing valid PATCH still returns200 and preserves the current note. |
| String note | Save exact text, including empty string and Unicode, up to500 Unicode code points; no trimming or silent truncation. |
| Explicit null | Clear note to SQL NULL. |
| Number, boolean, object, array or over500 code points | Return400 before any row write; when combined with other updates, none of those updates may be persisted. |
| GET/list after upgrade | Existing envelope and old fields preserved, additive note field reflects saved value. |
| Missing/invalid auth | Existing401 behavior; no write. |
| Another user's transaction | Preserve existing404 behavior; no row/content disclosure or mutation. |

Use the existing Transaction model and controller conventions. All relevant model creation/update callers must be searched before edits; new optional typing must leave existing import/create paths valid. Existing amount/category/description rules remain outside the feature except where a test demonstrates regression caused by it. Do not hide baseline defects or fix unrelated ones to make the experiment appear clean.

### Data and migration contract

Create a private PostgreSQL17 cluster inside the new experiment workspace using installed binaries, explicit loopback binding and a verified unused port. Record data-directory identity, database name, process identity and lifecycle. It contains only synthetic users/categories/transactions. Never connect to an existing PostgreSQL service, Supabase, bank, Gmail or SMTP account. Use a task-specific synthetic JWT secret and sanitized process environment; no inherited service credentials. No external network call is required. Use income categories for create tests to avoid the existing expense budget-email side effect; record that boundary. Existing authentication middleware and real database queries remain active.

Create the initial legacy schema once in the new empty database from the committed baseline models. Model synchronization is prohibited after baseline: run the application through its app module with auto-sync disabled, not a development startup that calls `sync({alter:true})`. All later schema change must come from the explicit new migration. Do not change the original app's startup behavior in its source repository.

Add one nullable column with a transactional Sequelize migration and a clear migration-history record. Use PostgreSQL `VARCHAR(500)` or an equivalent checked text column consistent with500 code points. The API validates type/length before mutation. Test the actual migration against an existing synthetic dataset, including existing soft-deleted rows if present in the model.

Before successful migration, inject a controlled exception immediately after the actual ADD COLUMN statement but before its transaction commits, using a harness wrapper around the real migration call. Prove rollback leaves both original schema and rows intact. This models an application-level migration failure, not a database crash or power loss. Preserve the failed attempt and transaction/schema evidence. Then run the unchanged migration normally, record it once, and show that a repeat through the migration runner does not rerun an already recorded change.

Do not implement a destructive down migration as the recovery route. Recovery is application rollback while retaining the additive column. Old code must still read and update its old fields on the expanded schema without erasing notes. Any destructive schema reversal would need a separate design and data-disposition decision.

### Live sequence

1. Freeze source, skill and criteria identities. Characterize existing request/response envelopes, auth, model callers and baseline test/build results. Record preexisting failures separately.
2. Start owned isolated PostgreSQL and legacy app on loopback with external credentials absent. Create synthetic users A/B, categories, and representative rows using explicit setup, then capture a logical data snapshot. Exercise legacy HTTP calls before change.
3. Write note-contract tests first, observe intended failures against legacy implementation, then implement minimal model/controller/migration changes only in candidate copy. Candidate-specific tests must not be confused with unchanged legacy compatibility checks.
4. Exercise real transactional migration failure, prove schema/data rollback, then apply successfully. Compare all legacy row columns and timestamps before/after; note defaults null. Freeze schema and data identities.
5. Independently run old-payload compatibility plus new-note API checks over actual HTTP/auth/database: omit/update/clear/boundaries/Unicode, rejection with no partial mutation, user isolation, original envelope behavior and applicable existing tests/build.
6. Write known notes, stop and restart the owned app and PostgreSQL using the same data directory; independently confirm new process identities and exact persisted values. An in-process reload does not count as a database restart.
7. Stop candidate app and run unchanged legacy app against the expanded database with synchronization disabled. Verify old reads/updates and direct SQL note preservation. Restart candidate app and prove notes remain visible. No note column drop, data reset or reseeding between these phases.
8. Record independent findings and bounded corrections, clean up only owned app/database processes, preserve artifacts/evidence and verify original repository and all earlier experiments unchanged.

## Scope

Included: one existing backend, one optional field, actual PostgreSQL persistence, additive transactional migration, old HTTP payload compatibility, authentication/ownership checks, rollback-on-exception, full database/application restart, old-application compatibility on expanded schema, independent review and cleanup.

Excluded: real finance data, bank/Gmail/SMTP/LLM calls, cloud deployment, frontend note UI, production migration, full frontend rendering compatibility, destructive schema downgrade, power-loss recovery, concurrency/load/distributed transactions, broad security audit, fixing unrelated source defects, global skill changes, publication/push/merge. Request replay characterizes old HTTP callers; it does not prove every third-party consumer tolerates the new response field.

## Alternatives and tradeoffs

An additive nullable field is the smallest change that simultaneously exercises model/caller impact, input validation, real schema evolution and rollback compatibility. A read-only pagination fix would avoid meaningful schema/data evolution; a full accounting feature or provider migration would obscure the workflow question. PostgreSQL uses the application's actual persistence stack rather than substituting SQLite. This increases setup complexity; cap setup rather than build a replacement infrastructure platform.

## Tools and services

Existing Git, Node/npm/TypeScript/Jest/Supertest/Sequelize/pg and PostgreSQL17 binaries. Existing backend dependencies may be reused read-only only if their lock/version identity is appropriate; record discrepancies. No new package download or service install is proposed. If required dependencies are absent, report the concrete blocker before changing this scope. Windows builds can invoke the existing TypeScript/tsc-alias binaries directly rather than modifying upstream scripts for shell portability.

New cluster files and synthetic database credentials stay inside the experiment; the cluster listens only on loopback. Explicit process environment supplies only experiment values and ordinary runtime essentials. Do not read/copy original `.env` files or enumerate secret values. Import-time service initialization must be inspected before execution; unavailable external integration remains unused rather than patched into a pretend success.

Agent inference uses the existing host. Proposed budget: one initial trial, one setup-only retry, at most two correction rounds. The intentional failed migration is a planned scenario, not a hidden correction. Record wall time, process/restart counts, model/token data when available, and unknowns honestly. At most root plus one implementation owner plus an independent reviewer; no nested fanout. Local process starts/stops and PostgreSQL data-directory writes may need sandbox escalation.

## Acceptance criteria and validation

- [ ] **E08-01 — authority/identity:** accepted scope or explicit local exception recorded; pinned committed source export, actual file/skill/dependency identities and host capabilities; original working changes preserved; no original env/data copied.
- [ ] **E08-02 — understanding and baseline:** actual auth → route → controller → Sequelize → PostgreSQL path and affected callers documented; baseline old-client HTTP contract and tests/build observed, with inherited failures separate.
- [ ] **E08-03 — transactional evolution:** controlled failure after real DDL leaves original schema/rows untouched; successful unchanged migration adds nullable note without modifying old fields; runner does not apply it twice. No post-baseline auto-sync.
- [ ] **E08-04 — feature and compatibility:** real HTTP/auth/database tests prove new note behavior and unchanged valid old payload behavior/envelopes. Independent SQL confirms exact values. Include empty/null/500/501 and Unicode boundary cases.
- [ ] **E08-05 — rejection/isolation:** invalid input plus another requested field change returns400 and leaves the row unchanged; unauthorized401 and other-user404 preserve both users' data. Missing row remains404. No external side effects invoked.
- [ ] **E08-06 — durable restart:** actual owned app and PostgreSQL stop/start with new process identities and same data directory; notes and legacy values survive, verified by API and SQL without reseeding.
- [ ] **E08-07 — application rollback:** unchanged legacy code runs on expanded schema, old operations succeed and preserve note values; re-upgraded code sees those notes. No destructive down migration or claim of schema rollback.
- [ ] **E08-08 — independent evidence:** distinct reviewer freezes assertions, runs actual DB/API checks and relevant build/tests against identified source, preserves red/green/failures and reports product/workflow results separately. Zero checks or missing runtime cannot pass.
- [ ] **E08-09 — preservation/cleanup/learning:** original source state and previous experiment artifacts remain unchanged; owned processes stop, data/evidence retained; map useful observed practices/gaps to pinned skills and upstream references. Limits and next steps explicit, no general reliability claim.

Example input: existing API source plus old-caller payloads, synthetic existing rows, optional-field contract and an owned DB. Expected: bounded adaptation with data/old-client preservation and observed restart/rollback evidence. Missing/failure cases: unavailable cluster startup yields incomplete; altered source snapshot requires reconciliation; failed migration cannot be presented as applied; repeated application cannot duplicate/erase data; failure to stop a known process blocks competing ownership.

## Ownership and dependencies

- Human sponsor: Bok. Proposed independent maintainer reviewer under normal workflow: Perry; no acceptance attributed to him.
- Root: safe source export, synthetic cluster and environment, manifests, setup/ownership ledger, controlled migration-failure trigger and final preservation/cleanup. Implementation owner: candidate model/controller/migration and focused author tests only. Independent reviewer: checks/evidence only, read-only product code, authorized synthetic DB operations under frozen criteria. Serialize mutation/restart ownership.
- Expected product paths inside copied backend: `src/models/Transaction.ts`, `src/controllers/transaction.controller.ts`, a new `src/migrations/...add-transaction-note.js`, focused tests. No original-repository edits; supporting runner/probes under the experiment's records/checks. Do not add note UI or rewrite auth/config.
- Dependency: reproducible committed spend-tracker baseline plus usable installed dependencies/PostgreSQL. Current source revision verified with read-only Git escalation because sandbox ownership differed; no global safe.directory change made.
- Related visuAI-DLC work: #7 and local Experiments06/07; search for "Experiment 08" returned no issue on2026-11-21. Prior deferred proposals are not new execution grants.
- Before implementation: publish for Perry's scope acceptance under workflow.md, or record Bok's explicit local-only exception for this experiment. Prior E07 waiver does not itself authorize E08.

## Sources, impact, and risks

Project direction: main `aad433c661a10ce4556342bd4dba8b4bd8d6ef1e`; skills baseline first-iteration-1.1 `c276159399bcca4bec874b3a521dfa61b5a0200b`. Use current candidate `understand-system`, `assess-change-impact`, `evolve-interface`, `implement-increments`, `verify-change` and `handoff-work` as relevant. Pin actual bytes and retain their existing upstream notices. No upstream runtime installation is required.

Learning questions: do pstack-derived understanding/impact practices identify real persistence/caller boundaries; do ECC-derived interface-contract practices preserve old clients and unknown-state distinctions; do Superpowers-derived test-first/verification practices catch invalid partial writes and transactional failures; do Matt-derived bounded handoff/refactoring practices preserve actual source/data state across restart and application rollback? Use the repository's existing pinned adaptation/source records; do not claim a controlled comparison or re-audit upstream repositories in this trial.

Source backend package declares MIT, but the local repository has no top-level LICENSE found in the bounded inspection. Keep copied application source local and attributed to its source revision; do not publish or redistribute it as a new open-source package without confirming licensing/authorization. This experiment is not permission to publish private application source.

Risks: startup auto-sync disguises migration; inherited environment connects to a real service; side-effectful expense creation invokes mail; copied dirty changes make the baseline ambiguous; tests reseed away data loss; rollback drops note values; source setup failures are mistaken for workflow failures. Mitigations: committed allowlisted export, fresh cluster and sanitized environment, read-only original source, explicit synchronization boundary, income-only create fixtures, independent API/SQL snapshots and actual process identity checks. Unknowns remain recorded; no speculative refactor.

## Open questions

Technical defaults above are the agent's proposed scope. Remaining human decision: authorize publishing for normal independent acceptance, or approve this design with an explicit local-only exception to issue-first/other-maintainer gates and the proposed attempt bounds. No experiment implementation or data operation has started.

## Draft checks — 2026-11-21

All ten proposal-template sections and nine acceptance criteria are present. A fresh read-only builder review found no consequential unanswered technical questions; migration-failure injection, synchronization boundary, rollback preservation and source/database isolation were sufficiently specified for planning. Runtime and source verification were not performed by that reviewer. This is design feedback, not maintainer approval or execution evidence.
