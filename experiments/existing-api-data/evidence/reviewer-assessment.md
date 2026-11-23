# Independent Experiment 08 assessment

Reviewer: /root/e08_validation. Scope: frozen optional-note contract, actual HTTP/PostgreSQL checks, read-only product/harness review. This is agent verification, not other-maintainer acceptance or production approval.

The exercised feature, migration exception rollback, database restart and old-application rollback passed. The complete experiment is **partial**, because the required pretrial byte-preservation baseline was captured late. No blocking product defect was found within the tested cases. The inherited test suite is not fully green.

## Independent execution and identities

I authored checks/api-sql.cjs from the approved contract before reviewing candidate product code. Root executed the baseline, candidate, restart and rollback phases serially against the owned live services. I personally executed the final reupgrade phase through `node records/run.cjs e08_trial checks/api-sql.cjs reupgrade`; it returned one passing check group. All actual SQL connections identified e08_trial on 127.0.0.1:60015. No real Supabase connection was required or tested.

Final assertion SHA256: `2d0ad2bc39870552f169f37ac9ae402d07a5f0ea6de573cd4fd0db42d6d962d0`.

The first baseline attempt failed before any check group because PostgreSQL's inet text representation included `/32`. Correction 1 changed only the identity-query projection to `host(inet_server_addr())`; exact loopback validation remains. The original timestamped failure JSON is retained. The helper self-check passed before and after correction. The same final assertion bytes served every successful phase.

Reviewed product SHA256 values:

| Path | SHA256 |
|---|---|
| candidate/src/models/Transaction.ts | b5303265c9189f06a1707f334f1cf08c743146f7b058e1dc2f691ab974106ac1 |
| candidate/src/controllers/transaction.controller.ts | 2429bab39102f787b18e33e31238e46a11510384df56d3e296a540fe28df22f6 |
| candidate/src/migrations/20261121000000-add-transaction-note.js | c8f927d75e782fd00f3774091b94c11a7183777dc205211541e73c54228a43d0 |

## Observed results

| Phase | Passing check groups | Evidence |
|---|---:|---|
| Legacy baseline | 3 | reviewer-baseline-2026-11-21T06-19-36-424Z.json |
| Candidate | 16 | reviewer-candidate-2026-11-21T06-20-18-396Z.json |
| Full database/application restart | 2 | reviewer-restart-2026-11-21T06-21-22-088Z.json |
| Legacy application rollback | 2 | reviewer-rollback-2026-11-21T06-21-43-002Z.json |
| Candidate reupgrade | 1 | timestamped reviewer-reupgrade JSON |

These 24 groups contain multiple HTTP/SQL assertions; they are not 24 independent reliability trials. Candidate checks compare every preexisting transaction column against the legacy snapshot, including timestamps and a soft-deleted row, while asserting new notes are SQL null. They exercise old create/PATCH payloads and GET/list envelopes, exact empty/null/whitespace/ASCII/astral Unicode values, 500/501 boundaries, invalid number/boolean/object/array notes, rejection without any transaction row mutation, missing/invalid authentication and other-owner/missing/deleted transaction access. The final candidate state is saved as complete SQL rows, compared unchanged after restart, then checked through legacy PATCH and reupgrade.

The migration harness awaits the real ADD COLUMN and throws before the managed transaction commits. Its failed snapshot equals the original schema and rows. The same migration then succeeds, leaves old columns unchanged, and ordinary repeated runner invocation skips the recorded migration. Review confirmed validation precedes writes, PATCH performs the ownership lookup first, omission leaves note out of the update, and the migration refuses a destructive down operation.

PostgreSQL changed PID23292 to28928 with the same data directory and port. The candidate application changed PID39932 to16616; the old ports were verified closed between phases. The restart checks compare all saved SQL rows, not merely one response. Legacy app PID36528 read the expanded schema and updated description while retaining the exact note and every unrelated transaction column. Reupgrade PID37332 exposed the retained note and updated description.

Author tests preserve a real red/green result: 23 failures and2 passes before implementation, then25/25 passing. The full baseline suite reports349/350 passing and candidate374/375 passing. The same inherited budget test fails in each: `migrateThresholdColumn Step B always runs: first query backfills NULL threshold to 100`. No clean-suite claim is warranted. TypeScript builds completed without diagnostics according to retained build logs and author execution evidence.

## Criteria judgment

| Criterion | Judgment |
|---|---|
| E08-01 authority/identity | Partial: explicit local authority and source pins recorded, but pretrial original bytes were not captured. |
| E08-02 understanding/baseline | Pass for scoped API path and observed baseline; inherited failure explicit. |
| E08-03 transactional evolution | Pass for the planned controlled-exception and ordinary-repeat scenarios. |
| E08-04 feature/compatibility | Pass for exercised actual HTTP/SQL contract. |
| E08-05 rejection/isolation | Pass for exercised invalid inputs and auth/ownership cases. |
| E08-06 durable restart | Pass for graceful full application/PostgreSQL restart and saved data. |
| E08-07 application rollback | Pass for unchanged old app read/PATCH and subsequent upgrade. |
| E08-08 independent evidence | Pass: frozen independent assertions, distinct final execution, red/green and inherited failures retained. |
| E08-09 preservation/cleanup/learning | Partial: byte-preservation evidence starts after initial candidate checks; cleanup remains root's final check. |

## Limits and actionable workflow learning

The preservation manifest itself correctly dates capture after initialization and initial candidate checks. Later equality can prove only preservation since that capture; it cannot retroactively establish the pretrial state. Original tracked Git status matching earlier observations is weaker than a pretrial byte snapshot, and later surfaced untracked paths were not inventoried initially. Freeze a narrow source/previous-experiment manifest before the next trial's first mutation.

The migration-history insert follows the DDL transaction commit. The ordinary repeat passes, but a crash between those operations is not proven recoverable; this harness should not be presented as a production migration runner. No power-loss, concurrent migration, full frontend, cloud/Supabase, expense-email or broader security behavior was tested. Application rollback deliberately retains the additive column; it does not demonstrate schema downgrade.

Useful observed practices were explicit omission/null semantics, legacy caller replay, SQL snapshots beyond HTTP success, controlled DDL failure, no auto-sync after initial setup, and recording process identities across restart. The test harness itself needed a correction, demonstrating why its failures must be preserved separately from product failures. These observations support the workflow practices in this case; they do not establish universal engineering-workflow completeness or comparative superiority of any upstream skill family.
