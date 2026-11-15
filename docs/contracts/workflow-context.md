# Business-connected workflow context, version 1

Branch implementation accepted explicitly by ChouBokYann in the session on 2026-11-15. This is a bounded extension of the skill candidates, not independent maintainer review, main adoption, or an amendment to NORTHSTAR. [Proposal and responsibilities](../proposals/business-connected-skill-outputs.md).

## Write once, present twice

Skills update the existing Markdown documents. The documents are authoritative; JSON, browser views and any future database are derived. Use the smallest number of entries needed for the work, not a new document per skill or agent. Give the human a one- or two-sentence handoff linking to the record and naming material uncertainty. The optional browser provides progressively deeper context; its absence never prevents using the skills.

Each semantic entry has one owning document within a project baseline. Stable IDs survive renames and revisions. Several entries may share a delivery document. Reference another owner's entry rather than copying it. Read the latest source before editing, preserve unrelated metadata/prose, and reconcile overlapping changes through the integrating agent. Never silently choose the last duplicate ID. Skill-folder names are not project record IDs.

Keep current state in the entry and material decision history in retained superseded entries and Git history. A changed decision must explain the reason, alternatives, tradeoffs and conditions for revisiting it. Do not erase prior evidence or relabel it as applying to new work.

## Copyable authoring shape

Add this namespace inside the existing YAML frontmatter. Do not replace the document's existing type, lifecycle status or metadata. This illustrative entry owns a change with an explicit rationale gap; replace the example with actual work. It requires no invented upstream business document.

```yaml
workflow_context:
  version: 1
  project: example-project
  records:
    - id: CHANGE-001
      kind: change
      status: planned
      title: Correct the existing filter
      summary: Correct a reported filtering mismatch.
      detail: "#change-001"
      gap: Business rationale is not recorded; ask the owner which existing requirement this restores.
      sources:
        - id: request
          ref: "#change-001"
      links: []
```

Put the explicit anchor and meaningful explanation in the body (not frontmatter). A local heading slug is not a substitute because renderers disagree about slug generation.

```markdown
<a id="change-001"></a>
## Correct the existing filter

Record the actual request or a faithful attributed excerpt here, the affected
behaviour, why this action is appropriate, and the next check. Do not claim
approval or a passing check without its source.
```

A relationship is stored on its source entry only:

```yaml
links:
  - relation: implements
    target: REQ-001
    basis: stated
    source: request
    reason: Restores the agreed handling of unknown amenities.
```

The source ID refers to this entry's `sources` list. `ref` is a relative Markdown file with an optional explicit anchor, a local `#anchor`, or an HTTP(S) URL without credentials. For supplied chat context, record an attributed excerpt with a conversation/message locator in a source section and reference its anchor. Do not invent a URL or infer human acceptance. Export checks local resolution; remote URLs are retained without fetching or proving availability.

## Fields and states

Every entry requires `id`, `kind`, `status`, `title`, `summary`, `detail`, `sources`, and `links`. IDs match `[A-Za-z][A-Za-z0-9_-]{0,99}` and are unique within the project. Keep an existing compatible ID. When adopting incompatible legacy identifiers, agree and document an explicit mapping rather than silently renaming them. Unknown metadata is preserved in source; extensions do not alter the meaning of defined fields.

| Kind | Status values | Additional fields |
|---|---|---|
| problem | active, resolved | Describe affected people and difficulty in prose |
| outcome | undecided, planned, observed | `measurement` required for planned/observed; observed requires completed business evidence |
| requirement | proposed, accepted, conditional, retired | `acceptance`: observable condition or explicit missing criterion |
| decision | proposed, accepted, superseded | `authority`: source ID required for accepted/superseded; explanation preserves actual scope |
| change | planned, in-progress, implemented, blocked | `revision` required when implemented, including dirty-state identity where applicable |
| evidence | passed, failed, pending, not-run, inconclusive | `scope`: technical or business; exactly one evaluates link |
| release | planned, submitted, deployed, failed, unknown | When deployed: `revision`, `environment`, `observation` source ID |

Completed evidence (passed, failed or inconclusive) requires `method`, `context` and `limits`. Technical evidence additionally requires `testedRevision`. Business context identifies what was measured, population/period where relevant, and assessed product/release state; a number without context is insufficient. Unrun evidence must not carry `testedRevision`. Do not use document `status: stable` as a claim of implementation, acceptance or verification.

For requirement-targeted technical checks, give the requirement a `revision` describing the assessed baseline if comparison is available. Without a matching target revision, the viewer treats applicability as stale/unknown rather than assuming current validity. Business observations are not automatically fresh forever: their context remains visible and readers must assess applicability. An observation does not establish improvement, contribution or causation without supporting evidence.

Optional `reason`, `next`, `owner`, and `gap` provide short context. The prose under `detail` supplies deeper explanation; avoid repeating the full entry in another document. Business gaps must state what is missing and the next useful action. Source-linked inference remains inference even if structurally valid.

## Relationship vocabulary

| Relation | From -> to | Meaning |
|---|---|---|
| addresses | outcome -> problem | Intended outcome addresses the difficulty |
| supports | requirement -> outcome | Expected contribution, not proof |
| aims_to_achieve | decision -> outcome | Motivation or hypothesis |
| implements | change -> requirement or decision | Delivery of behaviour/direction |
| evaluates | evidence -> change or requirement (technical), outcome (business) | Assessment, never automatic success |
| includes | release -> change | Membership, not proof of shipment |
| supersedes | decision -> decision | Replacement; target remains superseded history |

Each link needs `relation`, `target`, `basis: stated|inferred`, `source`, and `reason`. Reverse connections are computed. Outcome/requirement/decision/change entries need their respective addresses/supports/aims_to_achieve/implements link, or an explicit `gap`. Gaps permit useful small-task work; they do not justify fabricated intent. A hotfix may simply link to the existing requirement it restores.

## Export and validation

### Optional lifecycle and learning-loop placement

When the phase and learning cycle are known, add `workflow` to the relevant record. This locates the record in the CRISP-DM-inspired product lifecycle and OODA view without guessing from its type:

```yaml
workflow:
  phase: planning
  step: decide
  iteration: cycle-2
  trigger: EVIDENCE-002
```

`phase` is one of ideation, planning, implementation, verification, deployment, maintenance. `step` is observe, orient, decide, or act. `iteration` is a stable authored cycle label, not a generated progress count. Optional `trigger` references included evidence that prompted reconsideration; supply it only when the source document establishes that relationship. Omit the whole mapping when placement is unknown. The viewer exposes unplaced records instead of treating record kinds as workflow stages. A selected node highlights its own recorded phase; this is not a global project-stage claim. OODA can recur within any lifecycle phase.

The diagram's connecting arrows explain the method. Actual record relationships, supersession and feedback triggers come from authored data. None proves causation, business success or a complete chronology.

Use the repository's existing Python/PyYAML environment (`scripts/requirements-validation.txt`). No new dependency is introduced. Example from the repository root:

```powershell
python -B scripts/export_workflow.py docs/examples/business-context/baseline-b output/business-context.json --project cafe-trial --baseline synthetic-b --sample
```

Open `experiments/project-overview/index.html`, choose **Open snapshot**, and select the generated JSON. The original static sample remains supported. No service, LLM call or upload is needed. Sources are readable paths or user-clicked URLs; the viewer never executes document prose.

The exporter scans at most 200 Markdown files in the explicitly selected root; each file is at most 2 MiB and the total at most 16 MiB. Choose the record bundle rather than the entire code repository. Files without workflow entries may supply sources. The export is bounded to 1,000 records, 4,000 links and 2 MiB, matching the viewer. Source links cannot escape the selected root. YAML aliases, executable tags and duplicate keys are rejected. Output must be outside the source bundle.

The output is version 2 of the viewer snapshot, not version 2 of this authoring contract. It retains explanations, source ownership, file hashes, declared links, gaps and explicit completeness. It includes the caller's baseline label plus a digest of all scanned source files. Use a pinned checkout for a reproducible integrated baseline; label uncommitted previews explicitly. The exporter does not verify that a caller's commit label is honest or that files were unchanged during collection. Hashes describe the bytes read, not author authority.

Default complete-bundle export rejects missing targets. `--partial` is only for explicitly bounded source sets: unresolved target IDs are listed and the viewer warns about incomplete coverage. Missing local source files/anchors still fail. Failed exports preserve the previous output, whose baseline remains visible. Publish only integrated, validated complete baselines as project overviews; partial previews cannot claim whole-project coverage.

Schema/type/reference checks establish consistency, not truth. No automatic approvals, impact propagation, remote fetching, database writes, history deletion or deployment are performed. The exact backend/host integration remains a separate task.

## Distribution and missing context

### Optional human navigation

An answer story is question-led: provide the user's question, a concise answer, a minimal ordered set of existing record IDs and one grounded reason per step. Select records for their relevance to the answer, not simply graph adjacency. The viewer isolates that route from unrelated project nodes while retaining phase labels; the whole project stays accessible. Separate narrative links from recorded relationships and name missing evidence. New story publications without the question/answer/reasons are rejected. See the [story event contract](../../experiments/project-overview/react/README.md#local-storytelling-hook).

Stage filtering retains direct cross-stage references as presentation context; it must not invent links to make a diagram connected. The [local story hook and worktree collector](../../experiments/project-overview/react/README.md#local-storytelling-hook) consume exported records without changing their meaning. Story links are explicitly narrative overlays, excluded from evidence and business-impact calculations. Worktree record versions remain separate and are compared to a committed main baseline through stable outcome IDs. Missing business links stay missing. An orchestrator may nominate one presenter to publish serialized local story events; these do not authorize canonical document changes or install host hooks.

When the user is using the [project flow viewer](../../experiments/project-overview/react/README.md), a skill may accompany its short human update with a focus link to an existing record or lifecycle stage. Generate it against the actual exported snapshot using `npm run focus` in that viewer directory. Preserve the business relationships and authored `summary`; never write a second summary solely for the viewer. Use an opaque chat label only when supplied or agreed, not a fabricated host conversation ID. Links navigate on click; they do not imply a live connection, grant authority or prove that the agent is currently executing that record. With no running viewer, retain ordinary canonical artifact links.

When distributing the framework, include this shared file and preserve its repository-relative path alongside the skills. If a consumer copies one skill without it, follow that skill's fallback: preserve established documents and explicit source/target references, disclose unavailable structured export, and do not invent the missing schema. Existing unrelated projects need no bulk migration; adopt the convention on agreed records.

The [worked example](../examples/business-context/README.md) and tests demonstrate structural behaviour. Human comprehension, live Symphony integration, and production capacity remain unverified until tested separately.
