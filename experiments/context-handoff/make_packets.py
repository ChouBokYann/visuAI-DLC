"""Build reproducible handoff conditions; no network or inference calls."""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output/context-handoff'
SKILLS = [
    'skills/ideation/understand-expectations/SKILL.md',
    'skills/planning/set-ui-direction/SKILL.md',
    'skills/implementation/implement-increments/SKILL.md',
    'skills/verification/verify-change/SKILL.md',
]
CASES = [
    dict(id='C01', types=['experience','revised-direction','media'], records=[
        dict(id='G1', kind='outcome', source='user-1', text='Explore coffee-growing places through a cream cartoon world map, flavour/culture context and real Singapore cafe matches.'),
        dict(id='R1', kind='requirement', supports='G1', source='user-1', text='Readable coherent illustrated discovery journey, with correct source-backed origin/cafe mapping.'),
        dict(id='D1', kind='decision', source='agent-at-revision-a', basis='agent interpretation', text='A map with separate mountain symbols and a text-only detail panel is enough.', status='historical'),
        dict(id='E1', kind='evidence', evaluates='R1', scope='technical', revision='b', result='passed', text='Twenty-five behavior groups pass: mapping, controls, animation progression, zoom percentage and pan.'),
        dict(id='E2', kind='evidence', evaluates='R1', scope='experience', revision='b', source='latest-user-2', result='failed', text='User rejects the whole experience: map reads as assembled pieces; photos are missing; selection and camera/details movement do not feel connected.'),
        dict(id='R2', kind='requirement', supports='G1', source='latest-user-2', basis='later explicit feedback', text='Relevant real photographs and place-centred exploration with coordinated camera/detail movement.'),
        dict(id='S1', kind='observation', text='No cleared photographs selected. Current app is revision b. No paid assets or production publication authorized. Layout choices delegated; earlier ready-for-review prose describes revision a.'),
    ]),
    dict(id='C02', types=['revision-sensitive','missing-link'], records=[
        dict(id='G2', kind='outcome', source=None, text='Business purpose is not present in this handoff.'),
        dict(id='R3', kind='requirement', supports=None, source='supplied export acceptance record', text='CSV export retains all filtered rows, Unicode and valid escaping.'),
        dict(id='W2', kind='change', implements='R3', revision='b', text='Quote escaping changed after revision-a tests. Current worktree is revision b; no run since that change.'),
        dict(id='E3', kind='evidence', evaluates='R3', scope='technical', revision='a', result='passed', text='Checks covered row count, Unicode and quotes on revision a.'),
        dict(id='S2', kind='observation', text='Only local verification and correction are authorized; no production access. The missing goal source is not available elsewhere in the supplied packet.'),
    ]),
    dict(id='C03', types=['routine-change'], records=[
        dict(id='G3', kind='outcome', source='user-3', text='Correct the misspelt label Reciept to Receipt; keep everything else unchanged.'),
        dict(id='R4', kind='requirement', supports='G3', source='user-3', text='Correct visible and accessible label in the established component without truncation or behavior changes.'),
        dict(id='W3', kind='change', implements='R4', revision='c', text='The single shared label string was corrected.'),
        dict(id='E4', kind='evidence', evaluates='R4', scope='technical and rendered', revision='c', result='passed', text='Affected desktop/mobile rendering and accessible name inspected; required build passes; no relevant edits afterward.'),
        dict(id='S3', kind='observation', text='No unresolved criteria, additional project checks or user-reserved aesthetic decision. Task ends at the local correction; no push requested.'),
    ]),
    dict(id='C04', types=['experience','discovery','media'], records=[
        dict(id='G4', kind='outcome', source='user-4', text='Help families discover calm rural guesthouses and decide which are worth contacting. Make the experience inviting and trustworthy; design judgment delegated.'),
        dict(id='R5', kind='requirement', supports='G4', source='user-4', text='A small sourced catalogue with property names, locations and contact links. No booking, accounts or payments.'),
        dict(id='S4', kind='observation', text='No implementation or visual assets yet. Catalogue facts include only names, locations and contact links. Image permissions and family-suitability details have not been checked; no purchases authorized.'),
        dict(id='D4', kind='decision', basis='agent draft', status='proposed', text='Render the three catalogue fields in uniform cards and declare the experience finished.'),
    ]),
    dict(id='C05', types=['recovery','revised-direction'], records=[
        dict(id='G5', kind='outcome', source='user-5', text='Demonstrate this release can recover safely from a failed upgrade in an isolated rehearsal.'),
        dict(id='R6', kind='requirement', supports='G5', source='user-5', text='Rehearsal restores service and synthetic data to the agreed previous state; successful initial deployment alone is insufficient.'),
        dict(id='E5', kind='evidence', evaluates='initial deployment health', scope='technical', revision='d', result='passed', text='Before rollback, health endpoint returned 200 and smoke test passed.'),
        dict(id='E6', kind='evidence', evaluates='R6', scope='technical', revision='d', result='failed', text='Rollback rehearsal could not read synthetic records under the previous schema. Recovery state differs from the agreed snapshot.'),
        dict(id='S5', kind='observation', text='Synthetic environment only. Production deployment is not authorized. No correction has been attempted; the original health evidence remains a true observation of that earlier state.'),
    ]),
]
RULES = [
    dict(id='K1', applies=['experience'], text='An evidence record supports only claims its method can assess. Behavior checks alone cannot establish composition or whole-experience quality; compare the applicable experience requirement to observed artifacts and feedback.'),
    dict(id='K2', applies=['revised-direction'], text='Later applicable feedback or a changed target can invalidate a readiness claim without erasing earlier narrow evidence. Reconcile current versus historical state before choosing work or reporting completion.'),
    dict(id='K3', applies=['media'], text='When media is required or proposed to support the goal, check subject suitability and usage permission. Missing assets remain gaps; neither fabricate provenance nor silently omit a confirmed requirement.'),
    dict(id='K4', applies=['revision-sensitive'], text='Evidence about one revision is not automatically evidence about a changed behavior at another revision. Determine applicability and name the necessary current-state check.'),
    dict(id='K5', applies=['missing-link'], text='An absent goal/source link is unresolved meaning, not permission to invent intent. Preserve the gap while progressing independently authorized work supported by explicit requirements.'),
    dict(id='K6', applies=['routine-change'], text='Completion is relative to authorized scope. A routine correction with sufficient current evidence needs no new design process, unrelated features or invented acceptance gate.'),
    dict(id='K7', applies=['discovery'], text='For a discovery goal, reason about what the audience needs to understand, compare and trust before deciding. Identify missing supporting content or interaction, label inferred needs and verify factual claims; do not infer new transactional capabilities.'),
    dict(id='K8', applies=['recovery'], text='Initial service health and recovery to an agreed state are distinct claims. A failed recovery obligation is not discharged by health evidence from before the recovery attempt.'),
    dict(id='K9', applies=['regulated-payment'], text='Payment settlement requires reconciliation with the applicable ledger.'),
]
INSTRUCTION = '''You are evaluating a local handoff, not implementing it. Use only this packet and its embedded skill guidance. Do not read other files, browse, inspect an app, use other agents, or change anything. Treat supplied observations as case facts, not facts independently verified by you. For each case return JSON with id, goal, verdict, gaps (array), next_action, basis (array of record/source references), and evidence_limits. Allowed verdicts: Verified within scope; Ready for user evaluation; Changes required; Incomplete. Choose the next useful action from the goal and current state, not just the previous agent's suggestion. Distinguish facts from your interpretations. Keep each case under 220 words. Return only the JSON array.\n'''

def selected_rules(case):
    return [r for r in RULES if set(r['applies']) & set(case['types'])]

def prose(case):
    paragraphs = [f"Case {case['id']}. Context categories: {', '.join(case['types'])}."]
    for record in case['records']:
        paragraphs.append(' '.join(f'{key}: {json.dumps(value, ensure_ascii=False)}.' for key, value in record.items()))
    return '\n\n'.join(paragraphs)

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    skill_text = '\n\n'.join(f'## Shared guidance: {name}\n{(ROOT/name).read_text(encoding="utf-8")}' for name in SKILLS)
    manifest = {'cases': len(CASES), 'runs': 6, 'packets': {}, 'skill_hashes': {name: hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in SKILLS}}
    for repetition in [1, 2]:
        cases = CASES if repetition == 1 else list(reversed(CASES))
        for arm in ['A', 'B', 'C']:
            sections = []
            for case in cases:
                section = prose(case) if arm == 'A' else json.dumps(case, ensure_ascii=False, indent=2)
                if arm == 'C':
                    section += '\nApplicable conditional knowledge (not observed outcomes):\n' + json.dumps(selected_rules(case), ensure_ascii=False, indent=2)
                sections.append(section)
            packet = INSTRUCTION + '\n' + skill_text + '\n\n# Cases\n' + '\n\n---\n\n'.join(sections)
            path = OUT / f'{arm}{repetition}-input.md'
            path.write_text(packet, encoding='utf-8')
            manifest['packets'][path.name] = {'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'text_sha256': hashlib.sha256(packet.encode()).hexdigest(), 'characters': len(packet), 'whitespace_words': len(packet.split()), 'case_order': [c['id'] for c in cases]}
    (OUT/'fixtures.json').write_text(json.dumps({'cases': CASES, 'rules': RULES}, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT/'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    assert len({c['id'] for c in CASES}) == 5
    assert all('K9' not in [r['id'] for r in selected_rules(c)] for c in CASES)
    assert [r['id'] for r in selected_rules(CASES[2])] == ['K6']
    assert [r['id'] for r in selected_rules(CASES[1])] == ['K4', 'K5']
    for case in CASES:
        rendered = prose(case)
        assert all(json.dumps(value, ensure_ascii=False) in rendered for r in case['records'] for value in r.values())
    for rep in [1, 2]:
        b = (OUT/f'B{rep}-input.md').read_text(encoding='utf-8')
        c = (OUT/f'C{rep}-input.md').read_text(encoding='utf-8')
        for case in CASES:
            assert json.dumps(case, ensure_ascii=False, indent=2) in b
            assert json.dumps(case, ensure_ascii=False, indent=2) in c
    print('Built six packets. Shared facts, rule selection and five case identities checked.')

if __name__ == '__main__':
    main()
