# Second supplement batch: author walkthrough

Status: branch candidates authorized by the user's "continue" following the first batch. Human owner: ChouBokYann. Related issue: [#7](https://github.com/ChouBokYann/visuAI-DLC/issues/7). Independent maintainer review and testing in the user's project remain pending. These are author-applied examples, not observed fresh-agent responses.

## Scope and source inspection

Added [Clarify domain model](../../skills/ideation/clarify-domain-model/SKILL.md), [Address review feedback](../../skills/implementation/address-review-feedback/SKILL.md), and [Test an assumption](../../skills/implementation/test-an-assumption/SKILL.md). Each has an optional template and self-contained pinned MIT notice. Navigation and proposal status are updated; the ten core skills and first three supplements are unchanged.

Read Matt's domain-modeling skill and both glossary/ADR references, its prototype skill and both logic/UI references, and Superpowers receiving-code-review at the revisions in each notice. No upstream executable code or runtime is bundled. ECC and pstack candidates mentioned in the earlier proposal are not implied additional adaptation sources for these three skills.

The examples reuse the existing historical validator and contract for evidence. They do not adopt that schema for the new skills or restart deferred ontology work. Baseline: `d6eee42`, with only this batch's skill/documentation changes; validator and test sources are unchanged.

## 1. Domain clarification

**Input:** A returning maintainer asks whether a historical record with `status: stable` means its feature has shipped.

**Inspected evidence:** [Historical contract](../contracts/knowledge-v1.md), especially standard `status` versus `visu.delivery_state`, and [validator](../../scripts/validate_knowledge.py). The contract explicitly separates document state from delivery and approval. The validator allows `draft/stable/deprecated` for document state and a separate delivery-state set for Feature records.

| Concept in this context | Meaning | Discriminating example | Basis |
|---|---|---|---|
| Document status | Maturity/lifecycle of the description | A stable document can describe a proposed feature | Existing historical contract, not a new agent-selected definition |
| Feature delivery state | Recorded progress of implementation/release | `released` is distinct from document `stable` | Existing profile definition; metadata alone does not prove shipment |
| Evidence result | Recorded check outcome for a tested artifact | A pending check does not become passed because its document is stable | Contract and validator behavior |
| Human approval | Decision by the authorized person under the contribution process | Neither a status value nor a green structural check grants merge permission | Current contribution workflow |

**Outcome:** the existing definitions settle the ambiguity; no interview, glossary, new ADR, schema change, or product edit is needed. Link the definitions in the current explanation. Do not change the meaning of historical evidence.

**Example human output:** "Stable describes the document, not whether the feature shipped. Delivery state, actual release evidence, and human approval remain separate."

**Missing/conflicting-input case (author assessment):** for a new cafe product, 'saved cafe' might mean a user's bookmark or a cached provider result. Without supplied decisions, propose context-qualified terms and ask which behavior is intended; do not invent an accepted definition or infer it solely from a cache implementation. No such product or user decision was created during this trial.

## 2. Review-feedback resolution

**Input (synthetic feedback, not a real reviewer comment):** 'Remove the custom YAML loader because SafeLoader already validates YAML. Also simplify the status fields.' Assessment only; no production-code fixes or external replies are authorized by this example.

| Finding | Disposition | Reason/evidence | Next action |
|---|---|---|---|
| Remove duplicate-key loader | Disputed | `unique_mapping()` has an explicit duplicate-key rejection and string-key invariant. The existing duplicate-key test depends on rejection; the bounded experiment below compares parser behavior. Valid YAML parsing is not the same contract as rejecting ambiguous repeated keys. | Retain the loader under the current contract; reconsider only if the behavior requirement changes |
| Simplify status fields | Needs clarification | 'Simplify' could mean clearer labels or merging different concepts. The current historical contract distinguishes document and delivery status. | Identify the intended outcome before dependent edits; independent evaluation of the loader can continue |

**Outcome:** findings remain identifiable and neither is silently marked resolved. No application code, tests, issue comments, or review states were changed. A disputed suggestion is not a rejected human decision or independent reviewer acceptance.

**Example human output:** "The loader-removal suggestion conflicts with its explicit duplicate-key guard; the status simplification needs a clearer intended outcome. No code or external review state was changed."

**Correction path (expected, not independently exercised):** if an actual defect and fix authority are supplied, continue through the scoped correction and affected checks, retaining tested state before marking the finding resolved. Missing dependencies or an unrelated green suite cannot establish resolution. This branch task does not create a production defect merely to exercise that path.

## 3. Bounded assumption experiment

**Question:** Is replacing `UniqueLoader` with PyYAML `SafeLoader` equivalent for duplicate-key handling in the current installed environment?

**Decision rule declared before execution:** equivalence requires the standard loader to reject both duplicate-key inputs as the custom loader does, while both accept the unambiguous control. A mismatch contradicts equivalence for these cases; no general YAML-parser safety claim follows.

**Bounds:** three synthetic in-memory YAML strings, each parsed once by each loader; no network, credentials, persistent data, service mutation, or application changes. Use the existing interpreter and installed PyYAML. Import the actual repository module with bytecode writes disabled. This tests mapping parsing, not live product integration or every loader edge case.

**Reproduction command:** run from the repository root. A successful probe means it observed the documented behavior, not that replacement is safe.

```powershell
@'
import importlib.util, sys, yaml
spec = importlib.util.spec_from_file_location('validator', 'scripts/validate_knowledge.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
print('Python', sys.version.split()[0], 'PyYAML', yaml.__version__)
cases = {
    'top-level duplicate': 'type: Goal\ntype: Feature\n',
    'nested duplicate': 'visu:\n  id: first\n  id: second\n',
    'control': 'type: Goal\nvisu:\n  id: first\n',
}
for label, text in cases.items():
    outcomes = {}
    for name, loader in [('custom', module.UniqueLoader), ('standard', yaml.SafeLoader)]:
        try:
            outcomes[name] = ('accepted', yaml.load(text, Loader=loader))
        except ValueError as exc:
            assert 'duplicate YAML key' in str(exc)
            outcomes[name] = ('rejected', str(exc))
    if label == 'control':
        assert outcomes['custom'] == outcomes['standard'] == ('accepted', {'type': 'Goal', 'visu': {'id': 'first'}})
    else:
        assert outcomes['custom'][0] == 'rejected'
        assert outcomes['standard'][0] == 'accepted'
        expected = {'type': 'Feature'} if label == 'top-level duplicate' else {'visu': {'id': 'second'}}
        assert outcomes['standard'][1] == expected
    print(label, outcomes)
'@ | python -B -X utf8 -
```

**Observed result:** executed with Python 3.12.7 and PyYAML 6.0.1; exit 0. The custom loader rejected both duplicate inputs (`duplicate YAML key: type` and `duplicate YAML key: id`). The standard loader accepted them, keeping `Feature` and `second` respectively. Both accepted the control with the expected parsed mapping. All six parses and their outcome assertions completed.

**Interpretation:** equivalence is **Contradicted within bounds**. Replacing the loader would remove the duplicate-key guard for these two cases. No application change followed; the observation informs the synthetic review finding above. It does not establish behavior of other PyYAML versions, every possible YAML document, or unrelated security properties.

**Example human output:** "The standard loader silently accepted both duplicate-key examples that our loader rejected, so the replacement is not equivalent for those cases. Both accepted the control; no production code was changed."

**Missing-access case (expected):** a cafe-provider feasibility question with no credentials is Not run for the live boundary. A synthetic response can test local parsing but cannot establish provider fields, Singapore coverage, rate limits, or account entitlement. If user observation is required for a design question, lack of that observation leaves it inconclusive.

## Validation

- Candidate format validation: all three passed the installed skill-creator `quick_validate.py`, exit 0 each.
- Local links and Git whitespace: checked before commit; results recorded with the branch delivery. Link checks cover all 13 affected Markdown files, including the optional templates and notices.
- Existing regression suite: `python -B -X utf8 -m unittest discover -s tests -v` passed all 7 tests. Validator and test code remain unchanged from `d6eee42`; the documentation link test includes this batch's new record. These tests validate existing structural behavior, not agent compliance with the skills.

## Limits and remaining work

The agent-output examples are authored expectations. No fresh model invocation, real reviewer conversation, failed-save recovery, production fix, or live provider test was performed. The bounded probe observes parser behavior only. Templates and concise-output rules are present in the candidate instructions, but reliable adherence and token savings remain unmeasured. Real-project evaluation and independent maintainer review are still pending; no merge approval is implied.
