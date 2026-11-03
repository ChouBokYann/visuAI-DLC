"""Verify measured relationships and metadata, and summarize persistent MCP calls."""
import json
import re
import statistics
import time
from pathlib import Path

import yaml

from run_pilot import WORK

HERE = Path(__file__).parent


def read(name):
    return json.loads((HERE / 'raw' / name).read_text(encoding='utf-8'))


def payload(call):
    return '\n'.join(c['text'] for c in call['response']['content'] if c['type'] == 'text')


def main():
    summary = {}
    for name in ('bm-mcp', 'bm-mcp-followup', 'bm-mcp-linked', 'graphify-mcp'):
        data = read(name + '.json')
        groups = {}
        for call in data['calls']:
            if call['trial'] > 0 and not call['response'].get('isError'):
                groups.setdefault(call['id'], []).append(call['seconds'])
        summary[name] = {'startup_seconds': data['startup_seconds'],
                         'warm_median_seconds': {key: statistics.median(times) for key, times in groups.items()},
                         'errors': sum(bool(c['response'].get('isError')) for c in data['calls'])}
    expected_edges = set()
    preserved = 0
    for source in (WORK / 'corpus').glob('*.md'):
        original = yaml.safe_load(source.read_text(encoding='utf-8').split('---', 2)[1])
        indexed = yaml.safe_load((WORK / 'corpus-bm' / source.name).read_text(encoding='utf-8').split('---', 2)[1])
        indexed.pop('permalink', None)
        assert indexed == original, source.name
        preserved += 1
        for edge in original['visu'].get('relations', []):
            expected_edges.add((original['title'], edge['predicate'], edge['target']))
    calls = read('bm-mcp-followup.json')['calls']
    context = json.loads(payload(next(c for c in calls if c['id'] == 'D1-context')))
    assert context['metadata']['total_relations'] == 0
    linked = json.loads(payload(read('bm-mcp-linked.json')['calls'][0]))
    actual_edges = {(r['from_entity'], r['relation_type'], r['to_name'])
                    for r in linked['results'][0]['related_results'] if r['type'] == 'relation'}
    assert actual_edges == expected_edges, (actual_edges, expected_edges)
    assert linked['has_more'] is False
    summary['checks'] = {'markdown_metadata_preserved': preserved,
                         'native_yaml_context_edges': 0, 'projected_edges_expected': len(expected_edges),
                         'projected_edges_correct': len(actual_edges)}
    # Explicit source-read fallback: Graphify MCP exposes locations, not code bodies.
    # These reads are additional operations, never credited to graph-only retrieval.
    root = (WORK / 'corpus-graphify').resolve()
    source_reads = []
    for call in read('graphify-mcp.json')['calls']:
        if call['trial'] != 0 or not call['id'].endswith('-node'):
            continue
        match = re.search(r'Source: (.+) L\d+', payload(call))
        assert match, call['id']
        path = (root / match.group(1)).resolve()
        assert path.is_relative_to(root) and path.stat().st_size < 20000
        started = time.perf_counter()
        content = path.read_text(encoding='utf-8')
        source_reads.append({'question': call['id'], 'source': match.group(1),
                             'seconds': time.perf_counter() - started, 'content': content})
    assert len(source_reads) == 3
    target = HERE / 'raw' / 'graphify-source-fallback.json'
    if not target.exists():
        target.write_text(json.dumps(source_reads, indent=2) + '\n', encoding='utf-8')
    (HERE / 'round2-summary.json').write_text(json.dumps(summary, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(summary, indent=2))


if __name__ == '__main__':
    main()
