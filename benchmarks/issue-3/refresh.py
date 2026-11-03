"""Two-file freshness probe after the frozen initial queries; full refresh timing."""
import argparse
import json

from run_pilot import BM, WORK, run


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('tool', choices=['graphify', 'bm'])
    tool = parser.parse_args().tool
    corpus = WORK / ('corpus-' + tool)
    marker = 'benchmark_update_marker'
    additions = {
        'dependencies.py': '\n\ndef benchmark_update_marker():\n    return True\n',
        'decision-direct-first.md': '\n## Synthetic freshness probe\n\nbenchmark_update_marker records this benchmark-only update.\n',
    }
    paths = [corpus / name for name in additions]
    assert all(marker not in path.read_text(encoding='utf-8') for path in paths), 'Already updated'
    for name, addition in additions.items():
        with (corpus / name).open('a', encoding='utf-8') as stream:
            stream.write(addition)
    if tool == 'graphify':
        command = ['graphify', 'extract', str(corpus), '--code-only', '--no-cluster', '--max-workers', '1']
        query = ['graphify', 'query', marker, '--graph', str(corpus / 'graphify-out/graph.json'), '--budget', '2000']
    else:
        command = [BM, 'reindex', '--search', '--full', '--project', 'visu-benchmark']
        query = [BM, 'grep', marker, '--project', 'visu-benchmark', '--json', '--local', '-C', '10', '--max-matches', '20']
    result = run(tool + '-refresh', command)
    assert result['exit_code'] == 0, result['stderr']
    result = run(tool + '-freshness', query)
    assert result['exit_code'] == 0 and marker in result['stdout']
    if tool == 'bm':
        assert any(r['file_path'] == 'decision-direct-first.md' for r in json.loads(result['stdout'])['results'])
    else:
        assert 'src=dependencies.py' in result['stdout']


if __name__ == '__main__':
    main()
