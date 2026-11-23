---
type: Delivery Record
title: E10 document chatbot through Codex ACP
description: Agent-led implementation and bounded local release evaluation.
status: verified-within-observed-scope
workflow_context:
  version: 1
  project: e10-document-chatbot
  records:
    - id: REQ-001
      kind: requirement
      status: accepted
      title: Answer questions from a selected synthetic document folder
      summary: Use subscription Codex through ACP without local model files.
      detail: '#requirements'
      acceptance: Actual document-grounded answers, source references, current documents and explicit failure states.
      sources: [{id: request, ref: '#request'}]
      links: []
    - id: CHANGE-001
      kind: change
      status: implemented
      title: Fieldnotes local document chatbot
      summary: Bounded retrieval, restricted ACP bridge, loopback HTTP application and browser UI.
      detail: '#implementation'
      revision: 'uncommitted artifact sha256:211ad8319522d45cfc7294bac2e58c0bdd31a562f738672f39310026f8ff48d6'
      sources: [{id: implementation, ref: 'records/release-manifest.json'}]
      links: [{relation: implements, target: REQ-001, basis: stated, source: implementation, reason: Implements the approved synthetic-folder ACP design.}]
    - id: EVIDENCE-001
      kind: evidence
      status: passed
      title: Actual local release and restoration
      summary: Real answers before and after controlled provider failure.
      detail: '#release'
      scope: technical
      testedRevision: 'uncommitted artifact sha256:211ad8319522d45cfc7294bac2e58c0bdd31a562f738672f39310026f8ff48d6'
      method: 'checks/release.mjs'
      context: Windows, Node 22.15.0, ACP 2.9.0, ChatGPT authentication and gpt-6-astra selected by existing runtime default.
      limits: Loopback host deployment, synthetic corpus, no browser interaction or cloud app deployment.
      sources: [{id: observation, ref: 'evidence/release.json'}]
      links: [{relation: evaluates, target: CHANGE-001, basis: stated, source: observation, reason: Exercises actual API and provider against the retained artifact.}]
    - id: EVIDENCE-002
      kind: evidence
      status: passed
      title: Browser interaction and rendered experience
      summary: Core desktop browser journey observed with user assistance; wider UI coverage remains limited.
      detail: '#browser'
      scope: technical
      testedRevision: 'uncommitted artifact sha256:211ad8319522d45cfc7294bac2e58c0bdd31a562f738672f39310026f8ff48d6'
      method: Native accessibility and screenshots after user interaction.
      context: Chrome desktop on Windows; exact actions partly user-assisted.
      limits: No independent full keyboard traversal, mobile or changed-document refresh observation.
      sources: [{id: blocker, ref: 'evidence/browser-journey.md'}]
      links: [{relation: evaluates, target: CHANGE-001, basis: stated, source: blocker, reason: HTTP checks cannot substitute for a user clicking the rendered product.}]
---

<a id="request"></a>
## Request, authority and scope

Original user test prompt: **“make a chatbot that is connected to my documents folder”**. User chose a dedicated synthetic folder, then changed local inference to cloud to avoid local model files, and selected their Codex subscription through ACP. The latest “go ahead” answered the explicit revised E10 design and local issue/other-maintainer waiver question. Owner: Bok; root owns this experiment only. The [proposal](../../../proposals/experiment-10-document-chatbot.md) preserves alternatives and the superseding ACP amendment. No actual Documents-folder access is represented as delivered.

Library/worktree base c276159399bcca4bec874b3a521dfa61b5a0200b, branch experiments/10-document-chatbot. Product is uncommitted; HEAD alone does not identify it. Artifact/file digests supply identity. Before installation, [baseline](records/baseline.json) captured 2070 existing/canonical/previous-trial files. New product/corpus files did not exist in that baseline; do not describe it as a whole-machine or pre-existing-document snapshot.

<a id="requirements"></a>
## Requirements and observed criteria

| Criterion | Observation | Verdict |
|---|---|---|
| E10-01 scope, baseline, identities and bounds | Approval/waiver above, pre-install baseline, pinned package lock, protocol/model identity and shared counter | Met for declared file set; no whole-machine snapshot |
| E10-02 traceable workflow | Original prompt and decisions retained; this record links requirements, implementation, independent review and artifact observations | Met within this single trial |
| E10-03 actual answers and sources | Real Codex answers identify Mira Chen/4200 credits; conflict answer reports both launch dates and no authority; absent evidence returns explicitly without a model turn | Met for fixed synthetic oracle; first overly literal automated assertion remains failed in history |
| E10-04 read-only root and hostile content | Junction outside root skipped; HTTP path/origin checks pass; selected files never mutated by app; final actual process config and read-only thread verified; no tool calls observed; hostile 999999 figure explicitly rejected | Met for exercised cases; concurrent malicious filesystem swaps and general adversarial injection resistance unverified |
| E10-05 refresh and failures | Unit and runtime add/edit/delete checks, old source404, stale-during-answer409, oversized/unsupported files, missing root, invalid query, provider503, budget exhaustion and uncertain-termination latch | Met for those cases; OS permission-denied file and real remote timeout were not induced |
| E10-06 real browser journey | Core ask/read-source/no-evidence path observed through native accessibility and screenshots with user assistance | Met for observed desktop path; full keyboard/refresh/mobile coverage unverified |
| E10-07 local release/recovery and preservation | A200, deliberate unavailable B503, restored same A200, owned processes stopped; file preservation verified separately | Met for local HTTP/provider deployment, not public cloud deployment |
| E10-08 truthful result and limits | Raw failures/events, both release versions, review, bounds and gaps retained | Met; see browser continuation for updated scoped verdict |

<a id="implementation"></a>
## Implementation and skill handoffs

Architecture: plain local browser -> Node retrieval/HTTP -> ACP stdio adapter -> guarded Codex App Server -> subscription inference. Model weights never installed. No API-key fallback. Only synthetic excerpts sent. Conversation display retains answers locally in the page; each question gets fresh provider context so deleted-source history cannot leak into a later answer.

| Skill/workflow actually read and used | Resulting output |
|---|---|
| deliver-change; understand-expectations; define-requirements | Discovery questions, exact prompt, selected data/provider choices and proposed criteria in the proposal |
| Superpowers brainstorming and writing-plans | Reviewed design and PLAN.md; explicit acceptance before implementation |
| using-git-worktrees | Isolated E10 branch at the pinned library revision; no main edits |
| executing-plans; implement-increments; TDD | Small product modules, focused red/green behavior checks and final whole-implementation review |
| systematic-debugging | Distinguished formatted-answer oracle failure from a wrong model answer; inspected actual startup/review failures |
| frontend-design | Reading-room layout with cream/sage/ink palette, serif title, system UI font, source disclosures, labelled input and visible states; rendered quality remains unverified |
| verify-change | Criterion table comparing original scope with actual artifacts and evidence |
| prepare-release; deploy-and-check | Artifact manifest, controlled provider failure, same-artifact restoration and cleanup evidence |

No separate invocation of set-development-direction, exercise-user-journey or coordinate-agent-work is claimed. Planning occurred in the approved design/implementation plan. Two read-only reviewers were used under the Superpowers instructions: design builder-check and final implementation review. Their opinions do not replace maintainer acceptance. No skill was changed or promoted to main. Headroom and OpenShell were intentionally omitted from E10 product execution; E09 compatibility evidence does not imply this agent ran inside OpenShell.

Security boundary finding: ACP session overrides alone were insufficient evidence of startup confinement. Early setup spawned additional child services, so final runtime uses startup flags plus checks on the actual process configuration and returned thread permissions. Early turns1–3 establish answer behavior, not the final isolation claim. Final turns7–9 ran with the guard. Config fingerprints block inherited-file changes, but this is not a hostile-host security audit. ACP still exposes command/skill metadata; listing it is not evidence that a tool executed.

## Corrections and budgets

Initial literal harness failure: “4200” did not match the correct answer “4,200”; the answer also discussed and rejected the malicious number. Original [oracle](records/oracle.json), [response](evidence/live-slice.json) and failed result are retained. Later evidence uses numeric separator normalization and an explicitly labelled human semantic assessment; no automatic claim that the old assertion passed.

Correction1 addressed four [independent review findings](records/review.md). Its initial restricted startup failed on quoted MCP CLI key syntax; the single setup retry corrected key formatting without loosening restrictions. A cleanup failure latch was resolved only after a recorded no-process check. Correction2 removed adapter-only diagnostic warnings from user answers while retaining raw events and all actual model text. Prior artifact and release observations remain under artifacts/release-before-warning-fix and evidence/release-before-warning-fix.json.

Used9/12 ACP turns, one setup retry, two/two correction rounds. Remaining three turns are available only within the existing trial, notably the outstanding browser observation; no automatic follow-up benchmark or budget reset. ACP usage_update counters are context usage, not reliable per-call billing totals. Model default reported gpt-6-astra with medium reasoning. Dollar cost and complete developer-agent token usage are unknown. No subscription purchase or API billing configured.

<a id="release"></a>
## Release identity and recovery

Final artifact: `211ad8319522d45cfc7294bac2e58c0bdd31a562f738672f39310026f8ff48d6`. [Manifest](records/release-manifest.json) hashes each delivered file. [Release observation](evidence/release.json) records actual A-known, A-conflict, A-no-evidence, refresh, B-controlled-fault and A-restored results. A and restoration use the same file digest. B is a controlled unavailable-provider configuration; no network outage is falsely claimed.

Target: host loopback http://127.0.0.1:17810. Not Docker, staging cluster or production. Each run stopped its owned server and ACP tree. Downloaded npm packages/cache, synthetic fixtures, artifacts and evidence remain for inspection. No local model files. No commits, pushes, merges or GitHub publication. Independent human acceptance remains pending.

<a id="browser"></a>
## Browser blocker and next handoff

CUA browser host reported unavailable. Native inventory found Chrome on an unrelated purchase/checkout page. Automatic approval review rejected selecting that window because it would read unrelated potentially private content. No UI-control workaround was attempted. Thus E10-06 and rendered accessibility/usability remain unverified; HTTP checks are not presented as browser evidence.

Next action: provide a clean browser window explicitly for this trial (and restart via README), then observe asking a question, expanding sources, no-evidence, refresh and keyboard flow within the remaining budget. No new implementation is authorized beyond the exhausted correction rounds without a new bound. This is a concrete environment/approval blocker, not an agent claim that the whole requested workflow is complete.

## What this teaches the framework

The workflow successfully retained changed user intent, tested an actual provider, exposed an over-strict answer oracle, caught important integration defects through independent review, and preserved failed/restored release states. It also exposed limits: prompt-level restrictions are weaker than startup restrictions; a CLI subscription bridge needs runtime-specific checks; browser availability is a real prerequisite; and model answers require semantic assessment beyond string matching. One synthetic corpus and one provider cannot establish compatibility or completeness across all engineering scenarios.


## Browser continuation ? current result

The user opened Fieldnotes after renewed approval. The known answer, expanded source and expected no-evidence response were observed in the actual browser. The apparent user-reported failure was clarified as the intended no-evidence message. See [browser journey](evidence/browser-journey.md) for action attribution and remaining UI limits, and [continuation verification](evidence/browser-final-verification.json) for preservation/cleanup. This supersedes the historical browser blocker above for the core path only. Current total10/12 turns; no new correction, setup retry, product edit, commit or push. All2070 baseline files and the tested artifact remain unchanged; owned processes were stopped. Verdict: **Verified within the observed synthetic desktop scope**, not all-scenario coverage or independent human product acceptance.
