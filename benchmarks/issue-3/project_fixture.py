"""Deterministic, disposable project-thread scale fixtures and compatibility views."""
import argparse
import json
import shutil
import sys
from pathlib import Path

import yaml

from run_pilot import ROOT, WORK
sys.path.insert(0, str(ROOT / 'scripts'))
from validate_knowledge import read_bundle, validate


def generate(count):
    target = WORK / f'scale-{count}' / 'canonical'
    if target.exists():
        raise ValueError('Preserve existing fixture')
    target.mkdir(parents=True)
    source = ROOT / 'docs/examples/project-thread/baseline-b'
    names = ['goal-returning-maintainer', 'capability-blockers', 'feature-progress-view',
             'decision-direct-first', 'evidence-walkthrough']
    assert count % len(names) == 0
    for i in range(count // len(names)):
        for name in names:
            text = (source / (name + '.md')).read_text(encoding='utf-8')
            _, front, body = text.split('---', 2)
            meta = yaml.safe_load(front)
            meta['visu']['id'] += f'-{i:04d}'
            meta['title'] += f' {i:04d}'
            meta['visu']['relations'] = [dict(edge, target=edge['target'] + f'-{i:04d}')
                                        for edge in meta['visu'].get('relations', []) if edge['target'] in names]
            (target / f'{name}-{i:04d}.md').write_text('---\n' + yaml.safe_dump(meta, sort_keys=False) + '---\n' + body, encoding='utf-8')
    assert len(list(target.glob('*.md'))) == count
    errors = validate(read_bundle(target))
    assert not errors, errors[:3]
    print(f'Generated {count} documents, {sum(p.stat().st_size for p in target.glob("*.md"))} bytes', flush=True)


def project(source, destination, tool):
    source, destination = source.resolve(), destination.resolve()
    if not source.is_relative_to(WORK.resolve()) or not destination.is_relative_to(WORK.resolve()) or source == destination:
        raise ValueError('Benchmark views must be separate directories within .bench-run')
    records = read_bundle(source)
    errors = validate(records)
    if errors:
        raise ValueError(errors[:5])
    destination.mkdir(parents=True, exist_ok=True)
    nodes, edges, owned = [], [], []
    inferred, written, removed = 0, 0, 0
    for path, meta in records:
        identity = meta['visu']['id']
        text = path.read_text(encoding='utf-8')
        lines = []
        nodes.append(dict(id=identity, label=identity + ': ' + meta['title'], file_type='document',
                          source_file=identity + '.md', source_location='frontmatter', description=meta['description'], canonical_file=path.name))
        for edge in meta['visu'].get('relations', []):
            if edge['basis'] != 'declared':
                inferred += 1
                continue
            lines.append(f'- {edge["predicate"]} [[{edge["target"]}]]')
            edges.append(dict(source=identity, target=edge['target'], relation=edge['predicate'],
                              confidence='EXTRACTED', weight=1.0, source_file=path.name,
                              basis='declared', provenance=edge['source']))
        # Stable-ID filenames mean a canonical file rename does not break wikilinks.
        output = destination / (identity + '.md')
        body = text + ('\n## Relations\n\n' + '\n'.join(lines) + '\n' if tool == 'bm' and lines else '')
        unchanged = output.exists() and output.read_text(encoding='utf-8') == body
        if output.exists() and not unchanged:
            # Basic Memory adds a permalink and reformats YAML. Do not turn that
            # harmless formatting into a rewrite of every unchanged document.
            _, old_front, old_body = output.read_text(encoding='utf-8').split('---', 2)
            old_meta = yaml.safe_load(old_front)
            if 'permalink' not in meta:
                old_meta.pop('permalink', None)
            unchanged = old_meta == meta and old_body.strip() == body.split('---', 2)[2].strip()
        if not unchanged:
            output.write_text(body, encoding='utf-8')
            written += 1
        owned.append(output.name)
    manifest = destination / '_owned.json'
    if manifest.exists():
        for old in set(json.loads(manifest.read_text())) - set(owned):
            path = (destination / old).resolve()
            if path.parent != destination or path.suffix != '.md':
                raise ValueError('Invalid owned path')
            path.unlink(missing_ok=True)
            removed += 1
    manifest_text = json.dumps(owned) + '\n'
    if not manifest.exists() or manifest.read_text() != manifest_text:
        manifest.write_text(manifest_text)
    if tool == 'graphify':
        # Native node-link format accepted by graphify.serve; derived cache, never source of truth.
        graph = {'directed': True, 'multigraph': False, 'graph': {}, 'nodes': nodes, 'edges': edges}
        graph_path = destination / 'graph.json'
        graph_text = json.dumps(graph) + '\n'
        if not graph_path.exists() or graph_path.read_text(encoding='utf-8') != graph_text:
            graph_path.write_text(graph_text, encoding='utf-8')
    return {'nodes': len(nodes), 'declared_edges': len(edges), 'inferred_edges_excluded': inferred,
            'documents_written': written, 'documents_removed': removed}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('operation', choices=['generate', 'project'])
    parser.add_argument('--count', type=int)
    parser.add_argument('--source', type=Path)
    parser.add_argument('--destination', type=Path)
    parser.add_argument('--tool', choices=['bm', 'graphify', 'cbm'])
    args = parser.parse_args()
    if args.operation == 'generate':
        generate(args.count)
    else:
        print(json.dumps(project(args.source, args.destination, args.tool)))
