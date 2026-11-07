# Contributing as an agent

Read [NORTHSTAR.md](NORTHSTAR.md) on main for the authoritative project direction and [README.md](README.md) for navigation and [workflow.md](workflow.md) for the contribution contract. The contract applies equally to both maintainers, outside contributors, and agents acting on their behalf.

## Current priority

We are selecting, adapting, and evaluating skills from pstack, Superpowers, and Matt Pocock across the six lifecycle phases. The maintainers explore candidates independently and compare them before selecting versions for main. Visualization, ontology infrastructure, and a custom mapping engine are outside current scope. Historical contracts and issues do not mandate a skill count, lead framework, checkpoint schema, or graph-oriented outputs. Reconcile superseded proposal criteria with NORTHSTAR.md before granting work.

## Before changing files

1. Find the relevant repository issue. Search for overlapping proposals and existing skills.
2. If there is no issue, draft one using [.github/ISSUE_TEMPLATE/change-proposal.md](.github/ISSUE_TEMPLATE/change-proposal.md). Publish it only when authorized to act on GitHub; otherwise give the human the completed draft.
3. Check that a maintainer other than the proposer has explicitly accepted the scope and acceptance criteria in the issue. A board status, issue assignment, or agent opinion is not approval.
4. Record the human owner, agent responsibilities, and affected paths before implementation. Do not overwrite another contributor's work.

Read-only research and proposal preparation may happen before approval. Implementation begins after approval. Changes to this contract follow the same process once it is established.

## Adding or changing a skill

- Use `skills/<process>/<skill-name>/SKILL.md`; use lowercase, hyphen-separated names.
- Keep one canonical copy in the primary process and link to it from other processes.
- Explain when to use the skill, required inputs, steps, outputs, completion criteria, and how to handle missing information or failure.
- Make decisions understandable: retain the reason, alternatives, tradeoffs, and conditions for revisiting a choice.
- Add supporting references, scripts, or assets only when needed. Identify tools, services, permissions, costs, and data handling in the proposal before introducing them.
- Attribute adapted material, including its upstream URL, version or commit, and applicable license notices.
- Validate the issue's acceptance criteria and record evidence. Include a realistic skill walkthrough; test executable helpers when introduced.

## Handoff and completion

Follow [workflow.md](workflow.md) for progress updates, scope changes, review, and closure. Link the issue in the pull request and report what was checked, what remains unverified, and any known limits. Agents must not approve their own work or claim completion without evidence.
