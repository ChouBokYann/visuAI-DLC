"""End-to-end local graph discovery plus source reads, with 20 warm repetitions."""
import argparse
import asyncio
import hashlib
import json
import re
import statistics
import time
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import yaml

from run_pilot import BM, ROOT, WORK, environment


def text(response):
    result = response.model_dump(mode='json', by_alias=True)
    if result.get('isError'):
        raise ValueError(result)
    return '\n'.join(c['text'] for c in result['content'] if c['type'] == 'text')


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('tool', choices=['bm', 'graphify', 'cbm-linux'])
    parser.add_argument('root', type=Path)
    parser.add_argument('feature')
    parser.add_argument('output', type=Path)
    parser.add_argument('--project')
    args = parser.parse_args()
    if args.output.exists():
        raise ValueError('Preserve previous results')
    root = args.root.resolve()
    if not root.is_relative_to(WORK.resolve()):
        raise ValueError('Only benchmark fixtures may be read')
    if args.tool == 'bm':
        command, argv = BM, ['mcp']
    elif args.tool == 'graphify':
        command, argv = str(WORK / 'graphify-mcp-venv/Scripts/python.exe'), ['-m', 'graphify.serve', str(root / 'graph.json')]
    else:
        command, argv = 'docker', ['exec', '-i', 'visu-bench-issue3', '/work/codebase-memory-mcp']
    result = {'tool': args.tool, 'project': args.project, 'root': str(root), 'feature': args.feature, 'trials': []}
    started = time.perf_counter()
    with (WORK / (args.output.stem + '.stderr.txt')).open('w', encoding='utf-8') as log:
        try:
            params = StdioServerParameters(command=command, args=argv, env=environment(), cwd=str(ROOT))
            async with stdio_client(params, errlog=log) as (read, write):
                async with ClientSession(read, write) as session:
                    await asyncio.wait_for(session.initialize(), 60)
                    result['startup_seconds'] = time.perf_counter() - started
                    for trial in range(21):
                        began = time.perf_counter()
                        if args.tool == 'bm':
                            query = text(await session.call_tool('bm_context', {'identifier': args.feature + '.md', 'depth': 3,
                                         'since': '365d', 'max_related': 30, 'project': args.project}))
                            context = json.loads(query)
                            files = {item['file_path'] for group in context['results']
                                     for item in [group['primary_result'], *group['related_results']] if item.get('file_path')}
                        elif args.tool == 'graphify':
                            query = text(await session.call_tool('query_graph', {'question': args.feature, 'depth': 3, 'token_budget': 2000}))
                            files = set(re.findall(r'\[src=([^\s\]]+)\s', query))
                            neighbors = text(await session.call_tool('get_neighbors', {'label': args.feature, 'token_budget': 2000}))
                            # The compatibility view uses stable-ID filenames. Native BFS
                            # follows outgoing arcs; this second call discovers incoming evidence/decisions.
                            files.update(identity + '.md' for identity in re.findall(r'(?:-->|<--) ([a-z][a-z0-9-]+):', neighbors))
                            query += '\n' + neighbors
                        else:
                            query = text(await session.call_tool('search_code', {'pattern': args.feature, 'project': args.project,
                                         'mode': 'full', 'format': 'json', 'context': 0, 'max_output_tokens': 4000, 'result_limit': 30}))
                            found = json.loads(query)
                            files = {row[2] for row in found.get('rows', [])}
                        # Same fact-relevant document types for each workflow; the frozen
                        # questions need procedure/release identifiers, not their bodies.
                        prefixes = ('goal-', 'capability-', 'feature-', 'decision-', 'evidence-')
                        files = {name for name in files if Path(name).name.startswith(prefixes)}
                        documents = {}
                        pending = sorted(files)
                        calls = 1 if args.tool != 'graphify' else 2
                        while pending:
                            name = pending.pop(0)
                            if name in documents:
                                continue
                            if len(documents) >= 30:
                                raise ValueError('Context budget exceeded')
                            target = (root / name).resolve()
                            if not target.is_relative_to(root) or target.suffix != '.md':
                                raise ValueError('Unexpected source path')
                            if args.tool == 'bm':
                                body = text(await session.call_tool('bm_read', {'identifier': name, 'project': args.project}))
                                calls += 1
                            elif args.tool == 'cbm-linux':
                                source = json.loads(text(await session.call_tool('get_code_snippet', {'qualified_name': Path(name).stem,
                                                       'project': args.project, 'source_mode': 'full', 'format': 'json', 'max_output_tokens': 4000})))
                                body = source['source']
                                calls += 1
                                meta = yaml.safe_load(body.split('---', 2)[1])
                                pending.extend(edge['target'] + '.md' for edge in meta['visu'].get('relations', [])
                                               if edge['basis'] == 'declared' and edge['target'].startswith(prefixes))
                            else:
                                body = target.read_text(encoding='utf-8')
                            documents[name] = body
                        elapsed = time.perf_counter() - began
                        metadata = {name: yaml.safe_load(body.split('---', 2)[1]) for name, body in documents.items()}
                        assert documents, 'No source documents retrieved'
                        digest = hashlib.sha256(json.dumps(documents, sort_keys=True).encode()).hexdigest()
                        record = {'trial': trial, 'seconds': elapsed, 'documents': sorted(documents), 'sha256': digest,
                                  'tool_calls': calls,
                                  'source_reads': len(documents) if args.tool == 'graphify' else 0}
                        if trial == 0:
                            result['first_response'] = {'query': query, 'documents': documents, 'metadata': metadata}
                        result['trials'].append(record)
                    warm = sorted(r['seconds'] for r in result['trials'][1:])
                    result['warm_median_seconds'] = statistics.median(warm)
                    result['warm_p95_seconds'] = warm[18]
                    result['stable_document_payloads'] = len({r['sha256'] for r in result['trials']}) == 1
        finally:
            args.output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({k: v for k, v in result.items() if k not in {'first_response', 'trials'}}), flush=True)


if __name__ == '__main__':
    asyncio.run(main())
