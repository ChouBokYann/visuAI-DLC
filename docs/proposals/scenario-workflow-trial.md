# Situation routing candidate checks

Status: author inspection and structural validation, not a live Symphony or independent multi-agent trial. Baseline `439139a`; branch authorization and paths are recorded in the [scenario proposal](scenario-agent-workflows.md). No target-project tracker, installed Symphony version, or runtime credentials were supplied.

## Six route walkthroughs

These are authored inputs and expected routing decisions, not observed responses from an independent model.

| Input | Expected route and boundary checked against the router |
|---|---|
| Hotfix: known incorrect null guard, reproduction supplied; fix only | Implementation -> Verification; no new Ideation or deployment. Required regression checks remain. |
| Feature: accepted cafe-filter requirements and technical direction supplied | Implementation directly; existing inputs satisfy earlier stages. |
| Design: compare two search-result layouts, do not ship | Bounded experiment with actual user observation still required; no implementation promotion. |
| New module: provider and consumer built independently | Evolve interface establishes one contract/owner/version; independent passes require integrated serialized-payload evidence. |
| Modularisation: consolidate duplicate policy handling without behavior change | Understand/Impact only where missing -> Refactor safely -> Verification; preserve agreed errors, outputs, and callers. |
| Logic: determine whether inclusive and exclusive bounds are equivalent | Compare logic uses the boundary value as a distinguishing case; a mismatch refutes equivalence, samples agreeing elsewhere do not prove it. |

## Coordination failure walkthroughs

- Two workers claiming the same contract path must resolve ownership before writing. The integrating agent maintains the work record; isolated workspace copies do not establish compatibility.
- A retry after a successful PR creation must inspect the actual external state before creating another PR. This is a workflow requirement, not an implemented cross-instance lock.
- Missing product input yields a precise question and handoff through configured non-dispatchable states. The adapter explicitly says that prompt text cannot enforce host eligibility; live behavior remains untested.
- If the skill path is unavailable in a created workspace, report the missing capability. The adapter specifies a pinned copied layout and does not rely on this machine's local paths or automatic nested discovery.
- No host YAML, tracker states, release permission, or automatic agent fanout is invented. The plain-text prompt adapter has no new template variables and refers to one vendored router path.

## Source and validation scope

Refactoring adapts Matt's codebase-design and its two references; interface evolution adapts ECC contract-first. Full applicable root MIT notices are bundled with each. Logic comparison and routing are project-authored. Skill-creator guidance is used for concise entry points; no new executable helper is introduced.

Validation: candidate format, repository-local Markdown targets, and Git whitespace are checked before commit. The existing regression suite is run for documentation-link coverage. These checks cannot demonstrate autonomous routing, concurrent-writer conflict recovery, actual tracker behavior, or safe external retries. The real-project trial remains deferred.

Observed checks for the delivered workflow batch: all three new skills passed the installed skill-creator validator; local Markdown targets passed; Git staged whitespace passed; all seven existing regression tests passed. Commit `96b1977` contains this workflow batch. No live Symphony or independent agent session was run.

The library now has 19 candidates: ten lifecycle core skills and nine supplements. This count is a consequence of scoped additions, not a target. Conditional security, accessibility, performance, and other specialist additions remain unimplemented.
