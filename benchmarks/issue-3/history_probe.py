"""Controlled old-index fixture: temporarily age five synthetic rows, then restore."""
import asyncio
import json
import sqlite3
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from run_pilot import BM, ROOT, WORK, environment


async def main():
    output = Path(__file__).parent / 'raw/bm-history.json'
    if output.exists():
        raise ValueError('Preserve observations')
    database = WORK / 'bm-config/memory.db'
    with sqlite3.connect(database) as connection:
        project_id = connection.execute('SELECT id FROM project WHERE name=?', ('scale-100',)).fetchone()[0]
        rows = connection.execute('SELECT id,created_at,updated_at FROM entity WHERE project_id=? AND file_path LIKE ?',
                                  (project_id, '%-0005.md')).fetchall()
        assert len(rows) == 5
        connection.executemany('UPDATE entity SET created_at=?,updated_at=? WHERE id=? AND project_id=?',
                               [('2020-01-01 00:00:00.000000', '2020-01-01 00:00:00.000000', row[0], project_id) for row in rows])
    result = {'method': 'White-box age simulation in the isolated synthetic database; original timestamps restored in finally.', 'aged_rows': len(rows)}
    try:
        with (WORK / 'history.stderr.txt').open('w', encoding='utf-8') as log:
            async with stdio_client(StdioServerParameters(command=BM, args=['mcp'], env=environment(), cwd=str(ROOT)), errlog=log) as (read, write):
                async with ClientSession(read, write) as session:
                    await session.initialize()
                    for name, arguments in [
                        ('bm_context', {'identifier': 'feature-progress-view-0005.md', 'project': 'scale-100', 'since': '365d', 'depth': 3}),
                        ('bm_read', {'identifier': 'feature-progress-view-0005.md', 'project': 'scale-100'}),
                    ]:
                        result[name] = (await session.call_tool(name, arguments)).model_dump(mode='json', by_alias=True)
    finally:
        with sqlite3.connect(database) as connection:
            connection.executemany('UPDATE entity SET created_at=?,updated_at=? WHERE id=? AND project_id=?',
                                   [(row[1], row[2], row[0], project_id) for row in rows])
        result['restored'] = True
        output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print('Saved aged-index context and direct-read responses; timestamps restored.')


if __name__ == '__main__':
    asyncio.run(main())
