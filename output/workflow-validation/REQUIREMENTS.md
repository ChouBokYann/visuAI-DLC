# Frozen scenario criteria

These are deliberately specified evaluation tasks, not retrospective claims that the user requested these product features. Existing source is reused to exercise the engineering workflow. This file is the test oracle, separate from fixture implementation.

## Feature F: find a document by filename

F1. Existing GET /api/status retains its existing complete document listing when `q` is absent, empty or only whitespace.
F2. A nonempty `q` filters indexed document **filenames**, using case-insensitive substring matching after trimming surrounding whitespace. Content must not be searched by this option.
F3. Fixture atlas.md and atlas-update.txt match `  ATLAS `; garden.txt does not. Query `Mira` matches no filename even if text mentions Mira. Query `garden.txt` matches only garden.txt. No match returns200 with an empty documents list, not an error.
F4. Filtering the listing does not mutate the corpus, change source IDs or prevent asking a question about an indexed document excluded from the current list. Existing retrieval, source access and absence-of-evidence behavior survive.
F5. POST /api/refresh remains a complete refresh with existing semantics. No UI, storage format, dependency, search index or new endpoint is required.

## Bug B: clearing the final saved item survives reload

B1. After saving nylon then saving an empty shortlist, a subsequent read returns an empty list; storage contains `[]` under the existing key.
B2. Empty writes must actually call storage. If storage access or setItem fails, report false; never claim success merely because the new list is empty.
B3. Existing key, first-three unique-known-ID parsing, addition limit and nonempty read/write behavior stay compatible. No migration, persistence abstraction or UI redesign.

## Test quality T

T1. Expected values come from this criterion file and existing accepted behavior, not by calling the function under test or copying its private helper.
T2. Each selected fault variant fails an assertion relevant to its intended violation, while correct baseline/candidate behavior passes. Setup/import/syntax errors do not count as killed faults.
T3. Weak examples deliberately demonstrate their blind spots: call-count-only persistence mock, expectation calculated from returned values, and reading a pre-existing ready state without awaiting a new event. They are rejected examples, never acceptance evidence.
T4. Unit, real local HTTP, in-memory storage adapter and mocked model boundaries are named accurately. No browser, external persistence or live-provider compatibility is implied.
T5. No-op/unclear feature requests, contradictory tests/spec, unavailable external service, changed artifact after earlier live pass, and a proposed generic framework for a small change produce accurate scoped decisions, not invented completion.

## Minimal-work quality

Keep the original interface and project runner; use the smallest complete source change. No new dependency, generic repository layer, hidden retry, unrelated refactor, placeholder completion or artificial metric. Evidence is one current report linked to raw runs, with failures retained. External OpenShell/design tools may be noted where useful, not made mandatory.
