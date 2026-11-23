# Deployment

Skills for preparing releases, deploying changes, checking the target environment, and rolling back when necessary.

## Candidate skills

- [Prepare release](prepare-release/SKILL.md): identify the artifact, target, evidence, existing method, checks, and recovery limits. Preparation stops before execution and records authorization separately.
- [Deploy and check](deploy-and-check/SKILL.md): execute an authorized release, reconcile actual target state, verify installed behavior, and use only applicable authorized recovery. Accepts an existing release record without rerunning preparation.

Both maintain one release section/record. A prepared release is not deployed; submission is not installation; installation is not target acceptance. No new CI/CD infrastructure or automatic environment promotion is introduced. Independent maintainer review and real-project testing remain pending.

See the [proposal and source selection](../../docs/proposals/deployment-release.md) and [author walkthrough](../../docs/proposals/deployment-release-walkthrough.md).

Add individual skills as `<skill-name>/SKILL.md`.
