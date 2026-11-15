# Ideation runtime trial

Status: candidate experiment on `first-iteration`, authorized by the user's “ok looks good. lets try” after proposing runtime discovery and an isolated invocation test. Independent maintainer review and permission to merge remain pending; human project evaluation is deferred at the user's request.

## Scope and ownership

Human owner: ChouBokYann. Root agent owns this record, `docs/workflows/ideation-codex.md`, and the Ideation index link. Existing skill instructions remain unchanged unless testing demonstrates a defect. Issue search found the existing [exploration umbrella #7](https://github.com/ChouBokYann/visuAI-DLC/issues/7); historical slice #8 is deferred. This record does not publish an issue or imply its acceptance.

Problem: canonical skill folders are organized by lifecycle, but users need a practical way to invoke them from a separate project. Test project-local discovery and file output before adding any installer or runtime code.

Solution: copy the four complete skill directories into a disposable project's `.agents/skills`, then run the existing Codex CLI. Document the same manual setup and an explicit path to the existing workflow. No global installation, plugin packaging, scheduler, ontology extension, or Planning implementation.

Alternatives: a custom installer adds maintenance without a demonstrated need; a global install affects unrelated projects. Explicit file-path invocation remains the fallback if discovery fails. Project-local copies are simple but must be refreshed deliberately when upstream changes.

Tools: PowerShell file operations, Git, and installed Codex CLI 0.167.0. Runtime model calls use the existing account and may consume its allowance; no new subscription or provider is configured. Only synthetic cafe facts and skill instructions are used in the test. CLI authentication remains managed by Codex; credentials are not copied or included in evidence. Network failure is a failed invocation, not a skill pass. Ruflo tools were not available in the tool inventory.

Acceptance: verify project-local skill invocation, a saved detailed brief with a concise linked human response, and a subsequent update preserving IDs and unrelated content. Exercise workflow routing from a selected direction. Record failures and distinguish filesystem checks from observed model behavior. Human comprehension and real integrations remain unverified.

Sources: [official Codex skill documentation](https://learn.chatgpt.com/docs/build-skills) describes `.agents/skills` discovery and `$skill-name` invocation; local `codex exec --help` supplies runtime flags. These are setup instructions, not copied upstream skill prose. Existing notices stay with the copied skill folders.

Rollback: remove only the newly installed named skill folders after confirming they contain no local changes. No product records are removed. The temporary fixture is separate from this repository and existing `.bench-run/` and `output/` work.

## Observations

- Baseline: `4658cc9`; Windows PowerShell; Codex CLI 0.167.0.
- Initial network-restricted invocation failed with socket error 10013 and connection retries before any skill result. It does not count as a behavioral trial. Retried with approved network access while retaining workspace-write sandboxing for CLI actions.
- Both network-enabled invocations exited 0. Each used `codex exec --ephemeral --skip-git-repo-check --sandbox workspace-write --json -C <fixture> -o <reply-file> -`, with the prompt piped through standard input. They were separate sessions using the existing account and configuration, not a clean profile without other installed instructions.

### Trial 1: native invocation and persisted brief

Prompt: use `$define-requirements`; save `requirements.md`; a user-selected manually maintained Singapore cafe list stores cafe name, neighbourhood, laptop policy (allowed/not allowed/unknown), and last-checked date. Members filter by neighbourhood and policy. Unknown stays visible. Exclude accounts, maps, recommendations, scraping, and automated integrations. Freshness target is explicitly unresolved. Facts are synthetic; no browsing or implementation.

Observed command events read `.agents/skills/define-requirements/SKILL.md` and its requirements template. No other Ideation skill body was loaded. The saved brief had complete YAML frontmatter, source S1, REQ-001 through REQ-005, exclusions, proposed observable checks, and a provisional handoff with the freshness decision open. It did not claim passing product tests.

Actual final response (temporary absolute link shortened here):

> Saved [requirements.md] covering manual entry, member filters, visible unknown policies, and exclusions. **Provisional handoff:** the freshness criterion remains open.
>
> No implementation, browsing, or tests performed; policy freshness is not guaranteed.

Result: discovery and saving passed; strict two-sentence presentation failed (three sentences). The active Ponytail instruction also requires a limitations line. The setup guide now explicitly asks that required limitations fit within the two-sentence budget; no skill instruction was changed.

### Trial 2: workflow routing and in-place update

A fresh session was told to read the source checkout's `docs/workflows/ideation.md`, route a narrow update, and preserve the existing brief. Synthetic user decision S2 explicitly chose no freshness target this iteration, retained the date, and excluded accuracy guarantees, reminders, expiry, and warnings. The prompt requested at most two sentences including limitations.

Observed read sequence: workflow, current requirements, then only the installed `define-requirements` skill body. The agent edited the same `requirements.md`, added S2 and labeled decision history, updated REQ-002's affected criterion and the current handoff to Ready for Planning. It retained `status: draft` and distinguished readiness from approval. No downstream skill or product implementation was invoked.

Actual final response (temporary absolute link shortened here):

> Updated [requirements.md] in place, preserving IDs, exclusions, unrelated content, and prior rationale as history; it is ready for Planning with the last-checked date retained and no freshness target, accuracy guarantee, reminders, expiry, or warnings. Stopped at the handoff without browsing, implementation, or test execution.

Result: routing, persistence, changed-context handling, and two-sentence final reply passed in this trial. Parent comparison confirmed all five IDs unchanged and REQ-001/003/004/005 rows byte-identical as decoded text; only the affected row and related decision/readiness prose changed. The earlier open criterion remains only as explicitly superseded history, not a competing current action.

Artifact SHA-256 before: `E202D67680D52D4667AF8258ADFA26629E182491881EEBBA1289797DBCAE6340`; after: `8F2A0146C98FDAB426CA17757887C50F92D866E1E8B41B85A107E48195574EC4`. Raw event logs and full artifacts remain in the local disposable fixture, not published in this repository. These hashes identify local outputs, not independently reproducible model responses.

### Setup checks and limits

- Executed the guide's PowerShell block against another empty temporary project: all 12 files matched source hashes; rerunning stopped with `Already installed` before replacing files. Local documentation links passed and Git whitespace checks passed.
- No installer code or dependency was added. The source skills and workflow remain unchanged. User-wide skills, hooks, and configuration were not modified.
- Observed only the requirements entry and update path in a real CLI. Earlier synthetic workflow walkthroughs cover other paths but do not establish their installed-runtime behavior. No live research, provider integration, concurrent writer, permission-denied artifact save, global installation, other runtime, or human comprehension test was performed.
- Existing runtime instructions affect output: the first reply exceeded the intended sentence count. The second passed with explicit consolidation, which is evidence for that prompt, not a universal guarantee.
- Candidate trial complete; independent maintainer review, main merge, and the user's real-project evaluation remain pending.
