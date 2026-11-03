# Contribution workflow

This contract applies to everyone: both maintainers, outside contributors, and agents. The foundation-stage priority is to create and refine skills across the six [lifecycle processes](skills/README.md).

## 1. Propose the need

Search existing issues and skills first. Create a repository issue using the **Change proposal** template before implementation. Keep one coherent change per issue; link related issues for larger efforts.

Every proposal must explain:

- **Change and process:** what will change, its primary lifecycle process, and affected skills or paths.
- **Problem and need:** who faces the problem, a concrete example, and why existing approaches are insufficient.
- **Proposed solution:** how it solves the problem and helps people or agents understand the work.
- **Scope:** what is included and explicitly excluded.
- **Alternatives:** reuse, adaptation, and doing nothing; explain the choice and tradeoffs.
- **Tools and services:** dependencies, access permissions, costs, data leaving the project, and fallback behavior. Write `None` if none are needed; mark unknowns explicitly.
- **Acceptance and validation:** observable completion criteria and how each will be checked. For skills, include an example input, expected output or behavior, and a missing-input or failure case.
- **Ownership and dependencies:** a human owner, proposed agent responsibilities if applicable, related issues, and blockers.
- **Sources and impact:** upstream sources and licenses for adaptations, compatibility effects, risks, and how to undo the change where relevant.

Use `Not applicable` with a short reason where a field does not apply. Do not silently omit sections. Unresolved questions that affect scope or feasibility must be settled before approval.

## 2. Review and accept

A maintainer other than the proposer reviews the need, overlap, scope, dependencies, and acceptance criteria. For a proposal from either maintainer, the other maintainer reviews it. Agents may assist with analysis but do not replace human approval.

Record the decision in an issue comment: **Accepted**, **Needs revision**, **Deferred**, or **Rejected**, with a reason. Acceptance must identify the agreed scope and criteria. Also record important alternatives and what new evidence would justify revisiting the decision. Update the issue body to reflect the accepted proposal while retaining the discussion history.

Do not start implementation until acceptance is recorded. Research and drafting proposals can proceed beforehand. Approval of a proposal does not itself grant access to services or authorize spending or production actions.

## 3. Coordinate work

Maintainers add accepted issues to the private [visuAI-DLC project](https://github.com/users/ChouBokYann/projects/3). The issue is the shared source of truth for scope, decisions, and completion evidence; the board helps coordinate work.

Outside contributors do not need board access. Keep review decisions and progress needed for collaboration in the repository issue. A private board does not make a linked repository issue private; keep credentials and private operational details out of issues and pull requests.

Use this conceptual progression in issue updates and, where supported, board statuses:

```text
Proposed -> Accepted -> In progress -> In review -> Done
```

These are workflow terms, not a claim that matching board fields or automation are configured. Record blockers explicitly, including what is needed to unblock the work.

Before parallel work begins, record one accountable human owner and each agent's task, affected paths, dependencies, and handoff output. Split independently reviewable work into linked issues when helpful.

At meaningful milestones or handoffs, update the issue with:

- Work completed and supporting links or evidence.
- Remaining work and the next owner or action.
- Blockers, changed assumptions, and decisions with their reasons.

## 4. Implement the agreed scope

Work on a branch and keep changes tied to the accepted issue. Follow [AGENTS.md](AGENTS.md) and the [skill layout](skills/README.md). Prefer existing capabilities over new dependencies.

If scope, acceptance criteria, or required tools and services change materially, update the issue and obtain renewed acceptance before implementing the changed portion. Continue unaffected approved work when possible.

## 5. Verify and review

Open a pull request linked to the issue. State what changed, why, validation results, and known limitations. Provide evidence against each acceptance criterion; include walkthrough results for skills and test results for executable helpers where relevant.

A maintainer other than the author reviews the result. For agent-authored work, the sponsoring human is the author for this rule. Review includes scope compliance, clarity for people and agents, source attribution, and validation evidence. Address review findings before merge.

## 6. Close and preserve understanding

After merge, close the issue when its acceptance criteria are met, link the delivered change and evidence, and update the project board. Deferred or rejected proposals can be closed with their rationale without being marked as delivered.

Record any follow-up work separately. Preserve the final decision, its reasons and tradeoffs, and conditions for revisiting it so future contributors can recover the understanding behind the change.

## Enforcement

This is a contribution agreement enforced through human review. The issue template guides consistent submissions; it does not technically prevent incomplete issues, direct pushes, or self-merges. Repository rules and project automation are separate configuration work.
