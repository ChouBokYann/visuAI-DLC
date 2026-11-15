# Change proposal: bounded self-hosted project overview trial

Status: draft for independent maintainer review, 2026-11-15. The user requested a trial in this session. No server implementation, deployment, or independent acceptance is claimed.

## Scope correction after skill-output discussion

The user's subsequent clarification makes skill-authored Markdown the authoritative input and requires business context to survive across the skills. The [business-connected skill-output proposal](business-connected-skill-outputs.md) takes priority and must be evaluated before server implementation. SQLite, if later used, is a rebuildable projection rather than the canonical project store. The direct agent-to-database write design below is superseded and retained only to explain the earlier proposal; its API, authentication, conflict, quota and retention criteria require revision for a document-ingestion service before acceptance. In particular, deleting a server projection would not delete authoritative documents or prevent a later authorized re-import. No server implementation is currently granted by this draft.

## Change and lifecycle process

Primary process: Deployment, supporting understanding across the lifecycle. Extend the optional [project overview experiment](../../experiments/project-overview/README.md) into a private, single-instance server trial. Connect business problems and intended outcomes to decisions, changes, and evidence. Include bounded storage and project lifecycle operations from the start.

Proposed implementation ownership: `experiments/project-overview/` (existing UI/model/tests, server/storage helpers, package metadata, Docker packaging, operating instructions) and this proposal. No skill output contract or canonical project records are migrated.

## Problem and need

A server owner needs several agents to contribute to one durable project overview without concurrent file overwrites or unlimited storage growth. A returning reader should understand why a change matters to the business and distinguish tested behaviour from a measured business benefit. The current static viewer accepts a temporary browser-local snapshot and cannot provide these capabilities.

Example: cafe suitability filters pass functional checks, but their intended reduction in search time remains unmeasured. The overview must preserve that distinction when another agent revises the chosen provider or adds evidence.

## Proposed solution

Reuse the existing HTML/CSS/JavaScript viewer and validation model. Propose a Node.js service with SQLite on local persistent disk, versioned JSON submissions, and generated Markdown/JSON exports. SQLite is canonical only within this isolated trial; existing repository Markdown remains unchanged. Select and pin the runtime, HTTP framework if needed, and SQLite binding after checking supported APIs and licenses before implementation.

One application instance serves multiple projects belonging to one trusted organisation. Browsers read the overview; authenticated agents submit changes. Project-scoped credentials cannot read or write another project. Owner credentials manage projects, credentials, export, archive, and deletion. Credentials must not appear in URLs, exported records, browser bundles, or logs. Browser authentication and transport are exercised locally; remote deployment requires a tested HTTPS/authentication configuration and is a separate release gate.

Use a private local deployment for this first trial: loopback binding, synthetic data, no public signup, no server purchased or provisioned. Package a single container with a persistent volume and document a local run path. Browser polling fetches only changed project revisions. No LLM is required by the service.

### Meaning and concurrent updates

- Stable project-local IDs identify business problems, intended outcomes, decisions, changes, and evidence. Links have explicit meanings, provenance, and stated/inferred basis.
- Outcome measurement includes method and an explicit unmeasured state. Technical evidence evaluates a change revision; business evidence evaluates an outcome and identifies its observation context. Neither automatically proves the other.
- Missing business rationale remains visible. Retain superseded decisions and their reasons. Templates assemble authored meaning without inferring causal benefits.
- Require expected revisions on writes; apply validation, quota checks, record/history updates, and revision increments atomically. Reject a stale revision with a conflict response and retain current data.
- Identify submissions by project and idempotency key. An identical retry returns its prior result without adding history; reuse with different content fails. Bound retained retry receipts by age and bytes; revision checks continue preventing stale overwrites after receipts expire.

### Storage budget and lifecycle

Proposed configurable trial defaults, to be reviewed rather than presented as measured capacity:

| Budget | Initial value | What counts |
|---|---|---|
| Request body | 2 MiB | Received bytes, checked while streaming before JSON parsing |
| Snapshot | 1,000 records / 4,000 edges | Existing viewer bounds, retained for the trial |
| Projects | 20 | Active and archived projects |
| Project retained data | 20 MiB | Serialized records, relationships, history, and retry receipts |
| Instance retained data | 200 MiB | Sum across projects, including archived data |
| Retry receipts | 7 days, within quotas | Temporary deduplication metadata only |

These are logical data quotas, not guarantees about filesystem consumption. Show both logical usage and actual database/journal size, plus available disk space. Reserve free disk for transactional overhead and reject writes before the configured low-space threshold; a database-full error must roll back cleanly. Bound operational logs independently. Backups and exports outside the service volume are the owner's responsibility and must be included in capacity guidance.

Store source references and concise evidence, not uploaded repositories, binaries, screenshots, CI logs, embeddings, or agent transcripts. Do not fetch external references server-side. Broken references remain identifiable as unverified/unavailable when reported; no background URL crawler is introduced.

Active -> archived -> exported and deleted. Archive is read-only and continues counting toward quotas. Export includes a versioned manifest and all retained semantic records/history, excluding credentials. An owner-only CLI handles destructive deletion using explicit project ID confirmation; an export/restore round trip must be demonstrated first. Delete removes the project's records, history, credentials, and receipts transactionally. Explain that reusable database pages, filesystem reclamation, backup copies, and secure erasure are different things. Provide an offline maintenance procedure rather than automatically compacting on each deletion.

No automatic pruning of semantic history or supporting evidence. At quota, new growth is rejected with an actionable error; existing data stays readable/exportable and owner deletion stays available. Temporary receipt cleanup is explicit and cannot remove decisions or evidence.

## Scope

- Included: business-context fixture, revised viewer, persistent server, project isolation, authenticated submissions, revision conflicts, quota/usage display, archive/export/delete, bounded receipt cleanup, backup/restore instructions, container packaging, and local integration tests.
- Excluded: public multi-tenant SaaS, billing, invitations/SSO management, attachment hosting, remote deployment, multi-replica storage, knowledge extraction, graph database, automatic business-rationale inference, live Symphony integration, and changes to required skill formats.
- Preserve the current static viewer mode and its synthetic sample. No real project data is required for the first trial.

## Alternatives and tradeoffs

- Keep static snapshots: minimal operation and useful offline fallback, but cannot arbitrate concurrent writers or manage durable shared data.
- Git-backed records plus generated views: preserves review and portability; branch/merge coordination may be preferable for real projects. Retain this alternative if service operation outweighs the demonstrated benefit.
- Reuse an existing hosted/dashboard platform: potentially less UI work, but must demonstrate outcome/evidence semantics, access boundaries, retention, and portability before adoption.
- Proposed SQLite service: transaction boundary for one server, with backup, auth, and operational obligations. Revisit if shared/multi-replica deployment or measured contention requires different storage.

## Tools and services

Node.js, SQLite, browser, and optional Docker for packaging tests. Exact versions/dependencies/licenses require verification before installation. No paid services, external model calls, telemetry, or private data uploads. Package/image downloads require network access; failure leaves packaging unverified rather than silently installing another stack. No ruflo tool was exposed in the available tool catalogue during proposal preparation; no swarm or background agent was started.

Host expenses belong to the installer. Runtime access is limited to its configured data directory, private listener, and submitted data. Production proxy/authentication, host sizing, and backup destinations are outside the local trial; defaults must not suggest a public deployment is ready.

## Acceptance criteria and validation

- [ ] A synthetic cafe example traces problem -> intended outcome -> decision -> change -> evidence; the summary explicitly says technical checks passed but business benefit is unmeasured. Changing a decision preserves its predecessor and rationale. Include missing rationale and stale evidence cases.
- [ ] Persist a submission, restart the service, and retrieve identical records, links, provenance, and revision. Existing static-view tests continue to pass.
- [ ] Missing/invalid/revoked credentials fail; project A credentials cannot enumerate, read, mutate, export, archive, or delete B. Browser output keeps submitted markup inert and credentials out of URLs/logs. Test read-only browser versus owner-only lifecycle actions.
- [ ] Two writes against one revision yield one success and one conflict. Identical retries do not grow history; changed-content key reuse fails. Inject a storage failure and verify no partial update.
- [ ] Test each quota boundary, oversized streamed bodies, concurrent submissions near the instance limit, and archived usage. Lowering a quota below current usage preserves reads/export/delete while rejecting growth. Logical and physical usage are labelled separately.
- [ ] Archive rejects agent writes. Export/restore preserves IDs, meaning, evidence, and history; restored projects require newly issued credentials. Confirmed deletion cannot affect another project and removes all project-owned data and credentials. Document backup retention and physical reclamation limits.
- [ ] Receipt cleanup leaves semantic history unchanged. Bounded logs do not capture payloads or credentials. Disk-full handling retains existing readable data and reports failure without a success receipt.
- [ ] Run a local container restart with a persistent volume and a backup/restore walkthrough when Docker is available. Otherwise mark container execution unverified and do not claim deployment readiness.
- [ ] Inspect real-browser navigation, error states, keyboard use, and usage display when available. Independent comprehension and real-project/Symphony testing remain explicitly deferred as requested by the user.

This is a server trial, not a skill addition. The example and failure cases above replace the skill walkthrough criterion.

## Ownership and dependencies

- Human owner/proposer: ChouBokYann.
- Proposed independent reviewer: Perryong; no acceptance found or claimed.
- Agent responsibility now: inspect overlap and prepare this draft. After accepted scope: implement and test only the paths named above; report evidence and outstanding checks. No agents approve their own work.
- Related: [#11](https://github.com/ChouBokYann/visuAI-DLC/issues/11) and [#12](https://github.com/ChouBokYann/visuAI-DLC/issues/12), both explicitly deferred; the existing [branch trial](project-overview-prototype.md) only covers a static viewer.
- Blocker: [workflow.md](../../workflow.md) requires independent acceptance in an issue before implementation. Main's NORTHSTAR explicitly excludes visualization infrastructure. Acceptance must explicitly grant this bounded branch experiment as an exception or revise direction through the normal process; historical issue criteria do not supply permission.

## Sources, impact, and risks

Design references: [Archify](https://github.com/tt-a1i/archify) for structured rendering and last-valid output; [Understand Anything](https://github.com/Egonex-AI/Understand-Anything) for separation of graph generation and viewing. No upstream code is copied in this draft. Pin revisions and retain applicable notices if implementation later adapts code.

Existing experiment sources and tests provide the reuse starting point. A service introduces authentication failures, disk exhaustion, operational backups, and a new canonical store within its boundary. Structural checks cannot prove claims true. External evidence can disappear. Synthetic trials cannot establish production capacity or usefulness.

Rollback: stop the trial, retain an export/backup, and use the existing static viewer. Do not silently delete the volume when stopping or uninstalling. The skills library remains usable without the experiment.

## Open questions

For acceptance: confirm the private, local, single-organisation trial and provisional budgets, and explicitly reconcile the scope with NORTHSTAR. Real host, internet exposure, identity provider, sizing, and backup retention are deferred deployment decisions, not implicitly authorised defaults.

## Preparation evidence

Read local NORTHSTAR, README, workflow, issue template, current experiment proposal and README. Read main's NORTHSTAR and searched repository issues on 2026-11-15; inspected #11 comments, which do not grant independent acceptance for a server. No runtime files changed, packages installed, service started, GitHub issue posted, or server tests run during preparation.
