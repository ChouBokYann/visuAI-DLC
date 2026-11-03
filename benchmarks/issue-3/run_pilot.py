"""Local CLI smoke/pilot runner. Times include process startup, not server latency."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import time

ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / '.bench-run'
OUT = Path(__file__).parent / 'raw'
BM = str(WORK / 'bm-venv/Scripts/basic-memory.exe')
CBM = str(WORK / 'tools/cbm/codebase-memory-mcp.exe')


def environment():
    env = {k: v for k, v in os.environ.items() if not k.startswith('BASIC_MEMORY_')}
    env.update(BASIC_MEMORY_CONFIG_DIR=str(WORK / 'bm-config'),
               BASIC_MEMORY_HOME=str(WORK / 'bm-empty'), BASIC_MEMORY_NO_PROMOS='1',
               BASIC_MEMORY_AUTO_UPDATE='false', BASIC_MEMORY_DEFAULT_SEARCH_TYPE='text',
               CBM_CACHE_DIR=str(WORK / 'cbm-cache'), NO_COLOR='1', PYTHONIOENCODING='utf-8')
    return env


def run(name, command, timeout=120):
    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / (name + os.environ.get('BENCH_RUN_SUFFIX', '') + '.json')
    if target.exists():
        raise SystemExit(f'Refusing to overwrite measured output: {target}')
    started = time.perf_counter()
    try:
        p = subprocess.run(command, cwd=ROOT, env=environment(), capture_output=True,
                           encoding='utf-8', errors='replace', timeout=timeout)
        result = dict(exit_code=p.returncode, stdout=p.stdout, stderr=p.stderr)
    except subprocess.TimeoutExpired as exc:
        result = dict(exit_code=None, timeout=True,
                      stdout=(exc.stdout or b'').decode('utf-8', errors='replace'),
                      stderr=(exc.stderr or b'').decode('utf-8', errors='replace'))
    result.update(command=command, seconds=time.perf_counter() - started)
    assert result['seconds'] >= 0
    target.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(f'{name}: exit={result["exit_code"]}, {result["seconds"]:.3f}s', flush=True)
    return result


def main():
    p = argparse.ArgumentParser()
    p.add_argument('phase', choices=['index', 'query'])
    p.add_argument('tool', choices=['graphify', 'cbm', 'bm'])
    args = p.parse_args()
    corpus = str(WORK / ('corpus-' + args.tool))
    if args.phase == 'index':
        if args.tool == 'graphify':
            run('graphify-index', ['graphify', 'extract', corpus, '--code-only', '--no-cluster', '--max-workers', '1'])
        elif args.tool == 'cbm':
            run('cbm-index', [CBM, 'cli', '--json', 'index_repository', json.dumps({'repo_path': corpus})])
        else:
            result = run('bm-register', [BM, 'project', 'add', 'visu-benchmark', corpus, '--local', '--no-wait'])
            if result['exit_code'] == 0:
                run('bm-index', [BM, 'reindex', '--search', '--full', '--project', 'visu-benchmark'])
    else:
        questions = json.loads((Path(__file__).parent / 'answer-key.json').read_text())['questions']
        for q in questions:
            for trial in range(3):
                if args.tool == 'bm':
                    cmd = [BM, 'grep', q['query'], '--project', 'visu-benchmark', '--json', '--local', '-C', '10', '--max-matches', '20']
                elif args.tool == 'cbm':
                    cmd = [CBM, 'cli', '--json', 'search_graph', json.dumps({'project': 'corpus-cbm', 'name_pattern': q['query']})]
                else:
                    cmd = ['graphify', 'query', q['query'], '--graph', str(Path(corpus) / 'graphify-out/graph.json'), '--budget', '2000']
                run(f'{args.tool}-{q["id"]}-{trial}', cmd, timeout=45)


if __name__ == '__main__':
    main()
