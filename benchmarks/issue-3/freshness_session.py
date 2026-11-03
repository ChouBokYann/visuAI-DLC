"""Keep both MCP sessions alive while updating the disposable 100-note views."""
import asyncio
from contextlib import AsyncExitStack
import json
import subprocess
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from profile_run import profile
from run_pilot import BM, ROOT, WORK, environment

HERE = Path(__file__).parent


async def main():
    output = HERE / 'raw/document-freshness.json'
    if output.exists():
        raise ValueError('Preserve observations')
    result = {}
    async with AsyncExitStack() as stack:
        sessions = {}
        for tool in ['bm', 'graphify']:
            log = stack.enter_context((WORK / f'freshness-{tool}.stderr.txt').open('w', encoding='utf-8'))
            command = BM if tool == 'bm' else str(WORK / 'graphify-mcp-venv/Scripts/python.exe')
            argv = ['mcp'] if tool == 'bm' else ['-m', 'graphify.serve', str(WORK / 'scale-100/graphify/graph.json')]
            read, write = await stack.enter_async_context(stdio_client(StdioServerParameters(command=command, args=argv, env=environment(), cwd=str(ROOT)), errlog=log))
            session = await stack.enter_async_context(ClientSession(read, write))
            await session.initialize()
            sessions[tool] = session

        async def call(tool, name, arguments):
            return (await sessions[tool].call_tool(name, arguments)).model_dump(mode='json', by_alias=True)

        result['before'] = {
            'bm': await call('bm', 'bm_context', {'identifier': 'feature-progress-view-0000.md', 'depth': 3, 'since': '365d', 'project': 'scale-100'}),
            'graphify': await call('graphify', 'get_neighbors', {'label': 'feature-progress-view-0000'})}
        await asyncio.to_thread(subprocess.run, [sys.executable, str(HERE / 'mutate_documents.py')], check=True, cwd=ROOT)
        for tool in ['bm', 'graphify']:
            measured = await asyncio.to_thread(profile, f'{tool}-project-update-100', [sys.executable, str(HERE / 'project_fixture.py'),
                              'project', '--source', str(WORK / 'scale-100/canonical'), '--destination', str(WORK / f'scale-100/{tool}'), '--tool', tool])
            assert measured['exit_code'] == 0
        indexed = await asyncio.to_thread(profile, 'bm-incremental-100', [BM, 'reindex', '--search', '--project', 'scale-100'])
        assert indexed['exit_code'] == 0
        result['after'] = {
            'bm': await call('bm', 'bm_context', {'identifier': 'feature-progress-view-0000.md', 'depth': 3, 'since': '365d', 'max_related': 30, 'project': 'scale-100'}),
            'graphify': await call('graphify', 'get_neighbors', {'label': 'feature-progress-view-0000'}),
            'bm-evidence': await call('bm', 'bm_read', {'identifier': 'evidence-walkthrough-0000.md', 'project': 'scale-100'}),
            'bm-deleted': await call('bm', 'bm_read', {'identifier': 'decision-direct-first-0000.md', 'project': 'scale-100'}),
            'graphify-deleted': await call('graphify', 'get_node', {'label': 'decision-direct-first-0000'}),
            'graphify-inferred': await call('graphify', 'get_neighbors', {'label': 'capability-blockers-0000'})}
    output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print('Saved live-session before/after results', flush=True)


if __name__ == '__main__':
    asyncio.run(main())
