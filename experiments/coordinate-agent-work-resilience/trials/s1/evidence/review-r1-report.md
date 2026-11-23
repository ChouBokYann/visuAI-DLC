# Independent S1 R1 review

Verdict: verified within accepted local scope. Product source was read-only throughout this review. Actual frozen source equals evidence/r1-manifest.json (review-r1-identity.json), and browser source remained unchanged during execution. Current source hashes: review-r1-browser-source.json. C1 is used by provider and consumer; no localStorage shortlist persistence remains.

Independent commands and results:
- npm test: exit 0, 11 discovered/executed, 11 passed. review-r1-unit.log.
- node --test server/api.test.mjs: exit 0, 13 discovered/executed, 13 passed. review-r1-provider.log.
- npm run build: sandbox directory-read failure exit 1 retained in review-r1-build.log. Approved escalation retry exit 0 in review-r1-build-approved.log/json; current source build passed.
- node checks/browser.mjs . r1: approved local browser execution exit 0; 12 scenario checks discovered/executed, 12 passed, six at each viewport 1440x1000 and390x844. Raw log, detailed timestamped observations, source identity, screenshots and resource record: review-r1-browser*.json/log, review-r1-1440-final.png, review-r1-390-final.png, review-r1-resources.json.

Browser mapping: real Vite configured proxy and in-memory HTTP provider; initial search shows six cafes and search filter works; add three, compare details, refuse fourth, remove middle, add replacement, preserve surviving order on refresh, remove every item and refresh still empty; controlled initial GET failure shows unavailable rather than empty, retry loads saved selection, loading disables edits; delayed failed PUT disables removal and duplicate dispatch, retains last acknowledged selection, retries intended clear; invalid version/shape acknowledgment retains saved selection and retry succeeds. Four story choices still lead to three picks. Browser requests outside owned loopback blocked.

Provider mapping covers initial/read/order/replacement/empty, invalid JSON 400, version409 before body422, duplicates/unknown/nonarray/excess IDs and failed mutation preservation. Consumer mapping retains applicable inherited logic tests and replaces localStorage-specific tests with API behavior as documented by ui-report.md; independent execution confirms those current assertions.

S1 coordination evidence: contract-reconciliation.json records actual initial UI refusal to bind unaccepted C2 without authority; before-contract-correction-manifest.json preserves state before C1 was supplied. Both implementation reports name identical accepted C1 digest. No unauthorized C2 interface observed. This supports E06-02; coordinator owns overall experiment verdict.

No product finding requiring correction. Build setup restriction is distinct from a product failure. Resource lifecycle: API and Vite servers use ephemeral ports owned by reviewer process, recorded in review-r1-resources.json; headless Chrome owned by Playwright; all closed in finally. No resources handed off. Reviewer releases checks/** and evidence/review-* on final.

Limits: guided single trial, synthetic user and in-memory lifetime only. No durability/restart, production deployment, external links, general accessibility audit or speed/cost claim. Historical isolation and protected refs remain operator checks. Two screenshots are evidence captures, not a standalone visual design audit.

Disclosure: the initial UI dispatch explicitly requested a contract-context assessment before schema-dependent implementation. Its refusal is observed compliance with that guided prompt, not evidence of unprompted detection or an independent blind sample.
