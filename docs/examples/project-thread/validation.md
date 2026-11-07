# Validation record

> **Historical / deferred as of 2026-11-07.** Historical validation evidence for the deferred project-thread fixture; not validation of the current skill framework. Current direction: [NORTHSTAR.md on main](../../../NORTHSTAR.md). Earlier status statements and requirements below describe the original proposal only.

## Automated checks

Run from repository root:

```powershell
python -m pip install -r scripts/requirements-validation.txt
python scripts/validate_knowledge.py docs/examples/project-thread/baseline-a docs/examples/project-thread/baseline-b
python -m unittest discover -s tests -v
```

PyYAML is a validation-only dependency. No graph service, embeddings, or model calls are required.
The installed environment already has PyYAML 6.0.1; no installation was needed during authoring.

Author validation on 2026-11-03: baseline A contains 7 valid concepts and baseline B contains 8. The unittest suite checks both bundles, feature-to-goal traversal, preserved decision history, explicit pending evidence, inferred-edge preservation, malformed input, duplicate YAML keys, local Markdown link targets, and invalid relationship cases. Re-run the commands above for the current checkout; passing these checks does not establish actual user comprehension.

## Manual review boundaries

The question walkthrough is an author-created trace, not an independently observed user test.
Pending: a person who missed the discussion reads the example and reports their actual answers.
Pending: maintainer review and merge.
Candidate-tool compatibility is source-inspected; no candidate runtime has been executed.
See the [reuse assessment](../../contracts/reuse-assessment.md).

No fixture evidence records a passing execution. No source-code implementation is represented.
