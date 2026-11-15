# Proposal: prepare a release, then deploy and check

Status: candidate implementation on `first-iteration`, authorized by the user's “ok go for it” after the two-skill proposal. This continues session-authorized candidate exploration; independent maintainer acceptance and merge permission remain unrecorded. Actual deployment and testing in another project are deferred.

## Change and need

Verification establishes bounded technical evidence, not which artifact should be installed in which environment or whether it actually arrived and works there. Add two independently callable Deployment skills: `prepare-release` establishes a concrete release handoff; `deploy-and-check` executes an authorized release using the project's existing process and observes the target.

Preparation must be usable without deployment permission. Execution must accept an existing release record without requiring the preparation skill to run again. Both maintain one release section/record rather than generating a chain of reports.

## Scope and ownership

Human owner: ChouBokYann. Root agent owns `skills/deployment/prepare-release/`, `skills/deployment/deploy-and-check/`, `skills/deployment/README.md`, this proposal, and `docs/proposals/deployment-release-walkthrough.md`. Existing skills, `.bench-run/`, and `output/` are untouched.

Included: artifact/target identity, relevant verification evidence, configuration/migration prerequisites, existing deployment method, bounded smoke checks, recovery conditions, authorization scope, ambiguous-outcome handling, and truthful current status. Preparation has the new-record template; execution can maintain an existing record or create the same essential sections without depending on the other installed skill.

Excluded: new CI/CD infrastructure, platform scripts, credentials/services, releases of this repository, live deployments, automatic merge/PR/branch cleanup, universal container or monitoring requirements, ontology tooling, and mandatory agent delegation.

Issue search found [exploration #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7) and [deferred release slice #10](https://github.com/ChouBokYann/visuAI-DLC/issues/10). Historical requirements are not revived and no issue publication or independent acceptance is claimed.

## Sources and selection

- [ECC deployment-patterns](https://github.com/affaan-m/ECC/blob/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b/skills/deployment-patterns/SKILL.md), `d2ef2680594f9a17526a6e1a2e18b3d242c5d17b`: adapt environment/configuration, health checks, rollout, and recovery considerations. Do not copy example commands, assume their current platform validity, or impose Docker/Kubernetes, fixed metrics, or infrastructure checklists.
- [Superpowers finishing-a-development-branch](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/skills/finishing-a-development-branch/SKILL.md), `22f0b463e7a5e579904dd6211a520321035526f7`: retain explicit integration choices and preservation of unfinished work. Omit forced menus, implicit deploy-after-merge, worktree deletion, and redundant confirmation when authorization already exists.
- [Matt Pocock PR](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/pr/SKILL.md), `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`: reference concise evidence, reversibility, and impact explanations. Do not copy its PR/visual template; it credits Dex Horthy/Humanlayer's show-me skill, which remains acknowledged in notices. A PR is not a deployment record.

These inspected pinned files inform adaptations, not a latest-version survey or audit of linked runtimes. Applicable root MIT notices accompany the skills. The shared record contract, artifact evidence, resume behavior, and bounded authorization are project-specific additions.

## Alternatives and tools

One skill would load execution guidance for a preparation-only request. Full upstream workflows add platform assumptions and branch lifecycle actions. Two small skills support independently useful entry points without a scheduler or mandatory full-stage sequence. Revisit platform adapters only after a real target demonstrates a need.

No new dependency or service is introduced. Future executions use existing project deployment tools and account permissions; actions can affect service availability, data, and existing platform costs, which must be understood for the actual target. The skills require no new subscription or automatic upload. Sensitive configuration is checked by presence/reference, never copied into release records. Missing access/methods become explicit blockers. Ruflo tools were unavailable in this session.

## Acceptance and validation

- Preparation identifies the exact artifact (or unresolved build identity), target, evidence, method, prerequisites, checks, and recovery limits. No deployment or merge occurs during preparation; deployment authorization is recorded separately from technical preparation.
- Execution rechecks artifact, target, current target state, and action-specific authorization before mutation. Existing permission carries forward; a material scope change is not silently included.
- A timeout is reconciled against deployment identity/state before any retry; failure or unknown state is never reported as success. No blind duplicate deployment, migration, or recovery loop.
- Target identity and requested user behavior are checked. A healthy old version or green local tests do not prove the new release works.
- Application recovery is separated from data/schema recovery. Only applicable authorized recovery is executed; unavailable or unsafe recovery is reported with a next owner/action. A recovery attempt is not a verified recovery.
- Both skills reuse the same record with stable release/requirement/evidence references and brief human updates. Required target checks remain explicit when unavailable.
- Validate names/frontmatter, local links, and whitespace; perform bounded author walkthroughs of preparation, success evidence, ambiguous outcome, and incompatible recovery. These are not installed-runtime or actual deployment tests.

## Risks, reversal, and open questions

Risks: wrong target/artifact, stale approval/evidence, duplicate operations, false success claims, unsafe data rollback, and secret leakage. The candidate instructions address these without inventing target-specific commands. Reverting these skill files/index entries does not undo a future deployment; the actual environment needs its own applicable recovery procedure.

No unresolved choice blocks this generic candidate. Actual platform, artifact builder, environment, checks, observation window, migrations, and recovery method remain target-project inputs. Independent review and real-project testing stay pending.

## Candidate result

Implemented [prepare-release](../../skills/deployment/prepare-release/SKILL.md) with a new-record template and [deploy-and-check](../../skills/deployment/deploy-and-check/SKILL.md) with self-contained record guidance. Each carries pinned attribution and MIT notices; the Deployment index links both. Format validation, local links, and whitespace checks passed. The [author walkthrough](deployment-release-walkthrough.md) records expected applications and limits, not executed releases. Nothing was deployed; independent review and testing in another project remain pending.
