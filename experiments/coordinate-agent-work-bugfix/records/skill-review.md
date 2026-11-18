# Independent review of the coordination skill

Reviewed the candidate against repository base `6f78181`. The skill's SHA-256 at review was `10a44fb23b3cea2a009816300e6ceae1876111cec0d546b0b7ef26adfcc7b156`, matching the guided probe assessment. Line numbers refer to this review state.

## Initial findings

1. **High for contribution status — document the outstanding scope approval.** The proposal, line 29, identifies Perry's local instruction and the absence of independently accepted issue scope. The contribution workflow, lines 29–35, requires acceptance by the other maintainer before implementation. A later merge decision alone would leave that earlier requirement unaccounted for. Record any explicit exception and its bounds, or describe the work as a local candidate outside the ordinary contribution process. Keep formal acceptance pending until the issue records it. This independent skill review supplies technical feedback only.
2. **Medium — identify the shared interface version in the assignment.** The new skill, line 32, identifies the shared-contract owner. The previous router at `6f78181`, line 35, also pinned the contract. The Symphony adapter still calls for a shared-contract version at line 32. A provider and a consumer in separate workspaces can share an owner while using different versions of an external draft. Restore the version or immutable artifact pointer in the ownership row when an interface is shared. A candidate identity that already pins the interface can serve both purposes.
3. **Low — limit the claim about discoverability.** The proposal, line 39, attributes discoverability to the paper results. The scenario supplied the router, and guided participants received the skill. Neither group had to find it. Report the existing navigation links as the discoverability change. Restrict the measured result to rubric compliance on the supplied scenario. If the instructions change after this review, retain the probed text or an immutable reference and distinguish it from the revised candidate.

## Checks and limits

- Compared front matter, task-based headings, inputs, output contract and missing-information fallback with Implement increments and Exercise user journey. The format follows the neighboring lifecycle skills. The engineering router retains a link in place of its old assignment template, and both indexes and Deliver a change link to the canonical skill. All 83 relative Markdown file targets across the reviewed skill, notices and four navigation documents existed.
- Read the scope, writer-transfer, unavailable-agent fallback, independent review, evidence freshness, integration and cleanup instructions. The skill routes authoring, verification and corrections to their existing owners. The agent verdict and human approval remain distinct.
- Compared the frozen control router byte-for-byte with the file in the base commit. Checked the eight rubric items against `control-1.md` and `guided-1.md`. Both proposed handoffs cover all eight, including deferred acceptance, candidate identity, nonoverlapping ownership, observable reload evidence and cleanup. The remaining eight responses were outside this spot check. The assessment reports five passing responses per condition. It identifies one scenario, one model/host, and unblinded scoring.
- Both upstream references pin full commit URLs. The MIT text and copyright line match the repository's existing Exercise user journey notice for the same pstack revision. This local review did not separately retrieve the remote sources.
- Scope covers the skill and its documentation. Product behavior, browser verification, and the final experiment outcome belong to the separately assigned live trial.


## Recheck and disposition

Reviewed the revised skill with SHA-256 `145d2ce3da83f5b037ae78fa62405a9ff1f262e0678f2b8b116fc82ebce92117`. The single text change to the probed skill replaces “shared-contract owner and dependencies” with “shared-contract owner, pinned contract version/artifact and dependencies” on line 32. Reversing this edit in memory reproduced the original probe hash.

1. **Authorization wording addressed.** Proposal line 29 now records the direct instruction for the bounded local candidate and explicitly discloses the uncompleted contribution process. Independent maintainer issue acceptance and adoption remain pending.
2. **Shared interface pin restored.** Skill line 32 now requires the version or artifact in the assignment, consistent with the earlier router and the current Symphony adapter. The supplementary walkthrough below exercises that change.
3. **Probe claim corrected.** Proposal line 39 now limits the observation to compliance and labels discoverability an untested design intent. The existing five guided responses belong to the originally hashed skill.

### Supplementary paper walkthrough

The API worker owns the provider code and the UI worker owns the consumer code. Both see a mutable draft called v2. Their acceptance criteria require an agreed interface before binding requests or responses to it. The baseline contains no immutable accepted contract.

Applying lines 12–14 and 30–33, the coordinator records the missing pin, identifies the shared-contract owner and asks for the accepted artifact and its exact revision or digest. An unaccepted draft with a computed digest would identify the draft but would supply no acceptance evidence. Each worker can continue authorized work independent of the schema. Field-dependent changes stay pending. When the owner identifies an accepted artifact, both dispatches reference the same immutable pin, their disjoint write scopes and the required provider/consumer integration check. The coordinator can then check the actual combined state and record any remaining gap under line 60.

This was a reviewer walkthrough of the revised instructions. It adds no model sample, live API/UI observation, product verdict or formal maintainer approval. No further skill or navigation findings remain on the reviewed candidate.
