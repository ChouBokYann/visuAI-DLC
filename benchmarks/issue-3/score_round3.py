"""Recompute fixed-rubric workflow scores from captured responses and correctness checks."""
import json
import sqlite3
from pathlib import Path

import yaml

from run_pilot import WORK

HERE = Path(__file__).parent


def raw(name):
    return json.loads((HERE / 'raw' / name).read_text(encoding='utf-8'))


def content(response):
    return '\n'.join(c['text'] for c in response['content'] if c['type'] == 'text')


def metadata(text):
    return yaml.safe_load(text.split('---', 2)[1])


def edge(meta, predicate, target):
    return any(e['predicate'] == predicate and e['target'] == target for e in meta['visu'].get('relations', []))


def speed(seconds):
    for limit, score in [(0.05, 5), (0.1, 4), (0.5, 3), (1.0, 2)]:
        if seconds <= limit:
            return score
    return 1


def main():
    assert [speed(t) for t in [0.05, 0.1, 0.5, 1.0, 2.0]] == [5, 4, 3, 2, 1]
    freshness = raw('document-freshness.json')['after']
    cbm = {c['id']: json.loads(content(c['response'])) for c in raw('cbm-linux-update.json')['calls']}
    graph = json.loads((WORK / 'scale-100/graphify/graph.json').read_text())
    with sqlite3.connect(f'file:{WORK / "bm-config/memory.db"}?mode=ro', uri=True) as connection:
        native_edges = connection.execute('SELECT e.file_path,r.relation_type,r.to_name FROM relation r JOIN entity e ON e.id=r.from_id JOIN project p ON p.id=r.project_id WHERE p.name=?', ('scale-100',)).fetchall()
        partial_count = connection.execute('SELECT count(*) FROM entity e JOIN project p ON p.id=e.project_id WHERE p.name=? AND e.file_path LIKE ?', ('scale-5000', '%.md')).fetchone()[0]
    bm_edges = {(Path(file).stem, predicate, target) for file, predicate, target in native_edges}
    graph_edges = {(e['source'], e['relation'], e['target']) for e in graph['edges']}
    expected_edges = set()
    for p in (WORK / 'scale-100/canonical').glob('*.md'):
        m = metadata(p.read_text(encoding='utf-8'))
        expected_edges.update((m['visu']['id'], e['predicate'], e['target']) for e in m['visu'].get('relations', []) if e['basis'] == 'declared')
    assert bm_edges == graph_edges == expected_edges
    results = {}
    for tool, filename in [('graphify', 'graphify-workflow-small-matched-responses.json'),
                           ('bm', 'bm-workflow-small-matched-responses.json'),
                           ('cbm', 'cbm-workflow-small-responses.json')]:
        run = raw(filename)
        docs = run['first_response']['documents']
        metas = {metadata(body)['visu']['id']: metadata(body) for body in docs.values()}
        feature, capability, goal, decision, evidence = (metas[n] for n in [
            'feature-progress-view', 'capability-blockers', 'goal-returning-maintainer', 'decision-direct-first', 'evidence-walkthrough'])
        facts = {
            'D1-realizes': edge(feature, 'realizes', 'capability-blockers'),
            'D1-contributes': edge(capability, 'contributes_to', 'goal-returning-maintainer'),
            'D1-purpose': 'Reduce the effort of returning to a project' in docs['goal-returning-maintainer.md'],
            'D1-unverified': evidence['visu']['result'] == 'pending' and feature['visu']['delivery_state'] == 'proposed',
            'D2-affects': edge(decision, 'affects', 'feature-progress-view'),
            'D2-supersedes': edge(decision, 'supersedes', 'decision-blocker-scope'),
            'D2-direct-first': 'Start with direct blockers' in docs['decision-direct-first.md'],
            'D2-deferred': 'Defer transitive impact exploration' in docs['decision-direct-first.md'],
            'D3-pending': evidence['visu']['result'] == 'pending',
            'D3-no-passing-run': 'No participant, execution, measurement, or passing outcome is claimed' in docs['evidence-walkthrough.md'],
            'D3-assesses': edge(evidence, 'assesses', 'feature-progress-view'),
            'D3-procedure': edge(evidence, 'uses_procedure', 'procedure-walkthrough'),
        }
        equal_meta, equal_sources = True, True
        for identity, meta in metas.items():
            actual = dict(meta)
            actual.pop('permalink', None)
            original = metadata((WORK / 'corpus' / (identity + '.md')).read_text(encoding='utf-8'))
            equal_meta &= actual == original
            equal_sources &= actual['sources'] == original['sources']
        if tool == 'cbm':
            changed_feature = metadata(cbm['changed-feature']['source'])
            changed_evidence = metadata(cbm['changed-evidence']['source'])
            inferred = metadata(cbm['inferred-metadata']['source'])
            replaced = edge(changed_feature, 'realizes', 'capability-blockers-0001') and not edge(changed_feature, 'realizes', 'capability-blockers-0000')
            deleted = cbm['deleted-decision']['total'] == 0
            renamed = changed_feature['visu']['id'] == 'feature-progress-view-0000' and cbm['changed-feature']['file_path'].endswith('/feature-progress-view-0000.md')
            inference_preserved = any(e['basis'] == 'inferred' for e in inferred['visu']['relations'])
        else:
            current_edges = bm_edges if tool == 'bm' else graph_edges
            replaced = ('feature-progress-view-0000', 'realizes', 'capability-blockers-0001') in current_edges and ('feature-progress-view-0000', 'realizes', 'capability-blockers-0000') not in current_edges
            deleted = freshness['bm-deleted']['isError'] if tool == 'bm' else 'No node matching' in content(freshness['graphify-deleted'])
            folder = WORK / f'scale-100/{tool}'
            changed_feature = metadata((folder / 'feature-progress-view-0000.md').read_text(encoding='utf-8'))
            changed_evidence = metadata(content(freshness['bm-evidence'])) if tool == 'bm' else metadata((folder / 'evidence-walkthrough-0000.md').read_text(encoding='utf-8'))
            renamed = changed_feature['visu']['id'] == 'feature-progress-view-0000' and (WORK / 'scale-100/canonical/renamed-feature.md').exists()
            inferred = metadata((folder / 'capability-blockers-0000.md').read_text(encoding='utf-8'))
            inference_preserved = any(e['basis'] == 'inferred' for e in inferred['visu']['relations']) and ('capability-blockers-0000', 'depends_on', 'capability-blockers-0001') not in current_edges
        checks = {'metadata_matches_source': bool(equal_meta), 'source_provenance_preserved': bool(equal_sources),
                  'pending_not_passed': evidence['visu']['result'] == 'pending', 'replaced_edge_fresh': replaced,
                  'deleted_document_absent': deleted, 'stable_id_survives_rename': renamed,
                  'changed_evidence_failed': changed_evidence['visu']['result'] == 'failed' and changed_evidence['visu']['tested_revision'] == 'synthetic-benchmark-v2',
                  'inference_metadata_preserved': inference_preserved}
        s, c, a = speed(run['warm_p95_seconds']), 5 * sum(facts.values()) / len(facts), 5 * sum(checks.values()) / len(checks)
        results[tool] = {'small_warm_p95_seconds': run['warm_p95_seconds'], 'facts': facts, 'correctness_checks': checks,
                         'small_scores': {'speed': s, 'completeness': c, 'accuracy_checks': a, 'mean': (s+c+a)/3}}
        if tool != 'bm':
            scale = raw(f'{tool}-workflow-5000-responses.json')
            score = speed(scale['warm_p95_seconds'])
            results[tool]['scale_5000'] = {'warm_p95_seconds': scale['warm_p95_seconds'], 'speed_score': score,
                                          'quality_scope': 'No combined scale score: quality is checked separately on frozen small facts and mutation probes, not exhaustive 5000-document human grading.'}
        else:
            results[tool]['scale_5000'] = {'status': 'Initial indexing timed out at 600 seconds', 'indexed_markdown_observed_after_timeout': partial_count, 'score': None}
    native = json.loads((WORK / 'code-scale-graphify/graphify-out/graph.json').read_text())
    nodes = native['nodes']
    code_checks = {
        'graphify_deleted_symbol_absent': not any('deploy_0001' in n['label'] for n in nodes),
        'graphify_rename_no_old_path': not any(n.get('source_file') == 'unit_0002.py' for n in nodes) and any(n.get('source_file') == 'renamed_0002.py' for n in nodes),
        'graphify_added_symbol_present': any('deploy_1000' in n['label'] for n in nodes),
        'graphify_changed_source': '"approved"' in (WORK / 'code-scale-graphify/unit_0000.py').read_text(),
        'cbm_deleted_symbol_absent': cbm['deleted-code']['total'] == 0,
        'cbm_renamed_source': cbm['renamed-code']['file_path'].endswith('/renamed_0002.py'),
        'cbm_added_symbol_present': cbm['added-code']['name'] == 'deploy_1000',
        'cbm_changed_source': '"approved"' in cbm['changed-code']['source'] and '"verified"' not in cbm['changed-code']['source'],
    }
    history = raw('bm-history.json')
    history_context = json.loads(content(history['bm_context']))
    summary = {'tools': results, 'exact_post_update_document_edges': len(expected_edges), 'code_update_checks': code_checks,
               'basic_memory_history_probe': {'related_edges': history_context['metadata']['total_relations'], 'direct_read_succeeded': not history['bm_read']['isError'],
                                              'note': 'Controlled entity-timestamp simulation; filtered context is not an all-history query. No data loss observed.'}}
    (HERE / 'round3-scores.json').write_text(json.dumps(summary, indent=2) + '\n')
    assert all(code_checks.values()), code_checks
    assert all(all(t['facts'].values()) and all(t['correctness_checks'].values()) for t in results.values()), results
    print(json.dumps({k: {'small': v['small_scores'], 'scale': v['scale_5000']} for k, v in results.items()}, indent=2))
    print('All 12 fact checks and 8 document correctness checks pass per workflow; 8 native-code update checks pass.')


if __name__ == '__main__':
    main()
