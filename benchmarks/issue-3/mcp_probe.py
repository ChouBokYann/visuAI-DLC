"""Measure a persistent local MCP session; preserve schemas and every response."""
import argparse
import asyncio
import json
import time
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from run_pilot import BM, CBM, ROOT, WORK, environment


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('tool', choices=['bm', 'graphify', 'cbm'])
    parser.add_argument('output')
    parser.add_argument('--plan')
    args = parser.parse_args()
    output = Path(args.output)
    assert not output.exists(), 'Preserve previous observations'
    env = environment()
    if args.tool == 'bm':
        command, argv = BM, ['mcp']
    elif args.tool == 'graphify':
        command = str(WORK / 'graphify-mcp-venv/Scripts/python.exe')
        argv = ['-m', 'graphify.serve', str(WORK / 'corpus-graphify/graphify-out/graph.json')]
    else:
        command, argv = CBM, []
    plan = json.loads(Path(args.plan).read_text()) if args.plan else []
    result = {'tool': args.tool, 'command': [command, *argv], 'calls': []}
    started = time.perf_counter()
    try:
        with output.with_suffix('.stderr.txt').open('w', encoding='utf-8') as log:
            params = StdioServerParameters(command=command, args=argv, env=env, cwd=str(ROOT))
            async with stdio_client(params, errlog=log) as (read, write):
                async with ClientSession(read, write) as session:
                    await asyncio.wait_for(session.initialize(), 60)
                    result['startup_seconds'] = time.perf_counter() - started
                    schemas = await session.list_tools()
                    result['tools'] = [t.model_dump(mode='json', by_alias=True) for t in schemas.tools]
                    for action in plan:
                        assert action['name'] in {t.name for t in schemas.tools}
                        for trial in range(action.get('trials', 1)):
                            begin = time.perf_counter()
                            response = await asyncio.wait_for(session.call_tool(action['name'], action['arguments']), 60)
                            record = {'id': action['id'], 'trial': trial, 'name': action['name'],
                                      'arguments': action['arguments'], 'seconds': time.perf_counter() - begin,
                                      'response': response.model_dump(mode='json', by_alias=True)}
                            result['calls'].append(record)
                            print(f"{action['id']} {trial}: {record['seconds']:.4f}s error={record['response'].get('isError')}", flush=True)
    except Exception as exc:
        result['error'] = repr(exc)
        raise
    finally:
        output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
        print(f'Saved {output}', flush=True)


if __name__ == '__main__':
    asyncio.run(main())
