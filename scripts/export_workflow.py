"""Export authored workflow context; validate structure, never semantic truth."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
from urllib.parse import urlsplit

import yaml
try:
    from .validate_knowledge import UniqueLoader
except ImportError:
    from validate_knowledge import UniqueLoader

KINDS = {
    'problem': {'active', 'resolved'},
    'outcome': {'undecided', 'planned', 'observed'},
    'requirement': {'proposed', 'accepted', 'conditional', 'retired'},
    'decision': {'proposed', 'accepted', 'superseded'},
    'change': {'planned', 'in-progress', 'implemented', 'blocked'},
    'evidence': {'passed', 'failed', 'pending', 'not-run', 'inconclusive'},
    'release': {'planned', 'submitted', 'deployed', 'failed', 'unknown'},
}
RELATIONS = {
    'addresses': {('outcome', 'problem')},
    'supports': {('requirement', 'outcome')},
    'aims_to_achieve': {('decision', 'outcome')},
    'implements': {('change', 'decision'), ('change', 'requirement')},
    'evaluates': {('evidence', 'change'), ('evidence', 'requirement'), ('evidence', 'outcome')},
    'includes': {('release', 'change')},
    'supersedes': {('decision', 'decision')},
}
COMPLETED = {'passed', 'failed', 'inconclusive'}
LIMIT = 2 * 1024 * 1024


def require(condition, message):
    if not condition:
        raise ValueError(message)


def text(value, label, limit=4000):
    require(isinstance(value, str) and 0 < len(value.strip()) <= limit, f'{label}: nonempty bounded text required')
    return value


def contained(root, path):
    resolved = path.resolve()
    require(resolved.is_relative_to(root), f'path escapes source root: {path}')
    return resolved


def export(root, project, baseline, sample, partial=False):
    root = Path(root).resolve()
    require(root.is_dir(), 'source root must be a directory')
    text(project, 'project', 100)
    text(baseline, 'baseline', 200)
    documents, records, by_id, hashes = {}, [], {}, {}
    total = 0
    paths = sorted(root.rglob('*.md'))
    require(len(paths) <= 200, 'at most 200 Markdown files')
    for path in paths:
        path = contained(root, path)
        require(path.stat().st_size <= LIMIT, 'document exceeds 2 MiB')
        raw = path.read_bytes()
        total += len(raw)
        require(total <= 8 * LIMIT, 'source bundle exceeds 16 MiB')
        body = raw.decode('utf-8-sig')
        name = path.relative_to(root).as_posix()
        hashes[name] = hashlib.sha256(raw).hexdigest()
        # Explicit anchors avoid guessing a renderer-specific heading slug.
        anchors = re.findall(r'<a id="([A-Za-z][A-Za-z0-9_-]*)"></a>', body)
        require(len(anchors) == len(set(anchors)), f'{name}: duplicate anchor')
        documents[name] = (body, set(anchors))
        lines = body.splitlines()
        if not lines or lines[0] != '---':
            continue
        require('---' in lines[1:], f'{name}: unclosed frontmatter')
        end = lines.index('---', 1)
        front = '\n'.join(lines[1:end])
        # Aliases are unnecessary for authored records and can create recursive graphs.
        require(not any(isinstance(t, (yaml.tokens.AliasToken, yaml.tokens.AnchorToken)) for t in yaml.scan(front)), f'{name}: YAML aliases/anchors unsupported')
        meta = yaml.load(front, Loader=UniqueLoader)
        require(isinstance(meta, dict), f'{name}: frontmatter must be a mapping')
        if 'workflow_context' not in meta:
            continue
        context = meta['workflow_context']
        require(isinstance(context, dict), f'{name}: invalid workflow_context')
        require(type(context.get('version')) is int and context['version'] == 1, f'{name}: unsupported schema version')
        require(context.get('project') == project, f'{name}: project mismatch')
        entries = context.get('records')
        require(isinstance(entries, list), f'{name}: records must be a list')
        for entry in entries:
            require(isinstance(entry, dict), f'{name}: invalid record')
            r = dict(entry)
            for field in ('id', 'kind', 'title', 'summary', 'detail', 'status'):
                text(r.get(field), field)
            text(r['title'], 'title', 300)
            text(r['summary'], 'summary', 1000)
            for field in ('reason', 'next', 'owner', 'revision', 'method', 'testedRevision', 'gap', 'measurement', 'context', 'limits'):
                if field in r:
                    text(r[field], field, 200 if field in {'revision', 'testedRevision'} else 4000)
            require(re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]{0,99}', r['id']), 'invalid record ID')
            require(r['id'] not in by_id, f'duplicate ID/conflicting owners: {r["id"]}')
            require(r['kind'] in KINDS and r['status'] in KINDS[r['kind']], f'{r["id"]}: invalid kind/status')
            require(r['detail'].startswith('#') and r['detail'][1:] in anchors, f'{r["id"]}: missing detail anchor')
            # Only body anchors can own meaning, not an anchor embedded in YAML.
            prose = '\n'.join(lines[end + 1:])
            anchor = '<a id="' + r['detail'][1:] + '"></a>'
            require(anchor in prose, f'{r["id"]}: detail must be in body')
            section = prose.split(anchor, 1)[1].split('<a id="', 1)[0].strip()
            require(bool(section), f'{r["id"]}: empty explanation')
            text(section, 'explanation', 4000)
            r['explanation'] = section
            r['document'] = name
            r['documentHash'] = hashes[name]
            records.append(r)
            by_id[r['id']] = r
            require(len(records) <= 1000, 'at most 1000 records')
    require(records, 'no workflow records')
    edges, missing, diagnostics = [], set(), []
    for r in records:
        sources = r.get('sources')
        require(isinstance(sources, list) and 0 < len(sources) <= 9, f'{r["id"]}: sources required, max 9 plus canonical explanation')
        source_ids, view_sources = set(), []
        for source in sources:
            require(isinstance(source, dict), 'invalid source')
            sid = text(source.get('id'), 'source ID', 100)
            ref = text(source.get('ref'), 'source ref', 2000)
            require(sid not in source_ids, 'duplicate source ID')
            source_ids.add(sid)
            parts = urlsplit(ref)
            if parts.scheme:
                require(parts.scheme in {'http', 'https'} and parts.hostname and not parts.username and not parts.password, 'unsafe source URL')
                view_sources.append({'title': sid, 'url': ref})
            else:
                require(not parts.netloc and not parts.query and '\\' not in parts.path and '%' not in parts.path, 'invalid local source')
                target = contained(root, root / r['document'] if not parts.path else (root / r['document']).parent / parts.path)
                key = target.relative_to(root).as_posix()
                require(key in documents, f'missing source document: {ref}')
                require(not parts.fragment or parts.fragment in documents[key][1], f'missing source anchor: {ref}')
                view_sources.append({'title': sid, 'path': key + ('#' + parts.fragment if parts.fragment else '')})
        r['sourceReferences'] = sources
        r['sources'] = view_sources + [{'title': 'Canonical explanation', 'path': r['document'] + r['detail']}]
        links = r.get('links')
        require(isinstance(links, list), f'{r["id"]}: links must be a list')
        for link in links:
            require(isinstance(link, dict), 'invalid link')
            for key in ('relation', 'target', 'basis', 'source', 'reason'):
                text(link.get(key), 'link.' + key, 4000 if key == 'reason' else 100)
            require(link['basis'] in {'stated', 'inferred'}, 'invalid relationship basis')
            require(link['source'] in source_ids, 'unknown relationship source')
            require(link['relation'] in RELATIONS, 'unknown relationship type')
            require(any(pair[0] == r['kind'] for pair in RELATIONS[link['relation']]), 'invalid relationship source kind')
            require(link['target'] != r['id'], 'self relationship')
            target = by_id.get(link['target'])
            if target is None:
                require(partial, f'unresolved target: {link["target"]}')
                missing.add(link['target'])
            else:
                require((r['kind'], target['kind']) in RELATIONS[link['relation']], 'invalid relationship endpoints')
                if link['relation'] == 'supersedes':
                    require(target['status'] == 'superseded' and r['status'] != 'proposed', 'invalid supersession state')
            edge = {'from': r['id'], 'to': link['target'], **{k: link[k] for k in ('relation', 'basis', 'source', 'reason')}}
            require(not any((e['from'], e['to'], e['relation']) == (edge['from'], edge['to'], edge['relation']) for e in edges), 'duplicate relationship')
            edges.append(edge)
            require(len(edges) <= 4000, 'at most 4000 relationships')
        kind, status = r['kind'], r['status']
        if kind == 'change' and status == 'implemented':
            text(r.get('revision'), 'implemented change revision', 200)
        if kind == 'requirement':
            text(r.get('acceptance'), 'acceptance condition or gap')
        if kind == 'decision' and status in {'accepted', 'superseded'}:
            require(r.get('authority') in source_ids, 'accepted decision requires authority source')
        if kind == 'outcome' and status in {'planned', 'observed'}:
            text(r.get('measurement'), 'outcome measurement method')
        if kind == 'release' and status == 'deployed':
            for field in ('revision', 'environment'):
                text(r.get(field), 'release.' + field)
            require(r.get('observation') in source_ids, 'deployed release requires observation source')
        if kind == 'evidence':
            require(r.get('scope') in {'technical', 'business'}, 'evidence scope required')
            assessed = [link['target'] for link in links if link['relation'] == 'evaluates']
            require(len(assessed) == 1, 'evidence must evaluate exactly one target')
            target = by_id.get(assessed[0])
            if target:
                require((target['kind'] == 'outcome') == (r['scope'] == 'business'), 'evidence scope/target mismatch')
            if status in COMPLETED:
                for field in ('method', 'context', 'limits'):
                    text(r.get(field), 'evidence.' + field)
                if r['scope'] == 'technical':
                    text(r.get('testedRevision'), 'testedRevision', 200)
            else:
                require('testedRevision' not in r, 'unrun evidence cannot have testedRevision')
        if kind in {'outcome', 'requirement', 'decision', 'change'}:
            expected = {'outcome': 'addresses', 'requirement': 'supports', 'decision': 'aims_to_achieve', 'change': 'implements'}[kind]
            if not any(link['relation'] == expected for link in links):
                text(r.get('gap'), 'missing business connection gap and next action')
                diagnostics.append(f'{r["id"]}: {r["gap"]}')
    for r in records:
        if r['kind'] == 'outcome' and r['status'] == 'observed':
            require(any(e['to'] == r['id'] and e['relation'] == 'evaluates' and by_id[e['from']]['status'] in COMPLETED for e in edges), 'observed outcome requires completed business evidence')
    # Supersession is historical ordering, so cycles cannot describe a valid history.
    successors = {r['id']: [e['to'] for e in edges if e['from'] == r['id'] and e['relation'] == 'supersedes'] for r in records}
    visited = set()
    def visit(node, trail):
        require(node not in trail, 'supersession cycle')
        if node in visited:
            return
        for target in successors.get(node, []):
            visit(target, trail | {node})
        visited.add(node)
    for node in successors:
        visit(node, set())
    digest = hashlib.sha256(json.dumps(hashes, sort_keys=True).encode()).hexdigest()
    outcomes = [r for r in records if r['kind'] == 'outcome']
    summary = ' '.join(r['summary'] for r in outcomes[:2]) or 'Business outcome not recorded.'
    unmeasured = sum(r['status'] != 'observed' for r in outcomes)
    summary += f' {unmeasured} of {len(outcomes)} recorded business outcomes remain unmeasured; technical checks do not establish business benefit.'
    if sample:
        summary = 'Synthetic example, not observed work. ' + summary
    if partial:
        summary = 'Partial source bundle; coverage is incomplete. ' + summary
    result = {'version': 2, 'project': {'name': project, 'summary': summary, 'snapshot': baseline + ' / ' + digest[:12], 'sample': sample},
              'provenance': {'baseline': baseline, 'digest': digest, 'files': hashes, 'complete': not partial, 'unresolved': sorted(missing), 'diagnostics': diagnostics},
              'records': records, 'edges': edges}
    try:
        encoded = json.dumps(result, ensure_ascii=False, allow_nan=False)
    except (TypeError, ValueError) as exc:
        raise ValueError('workflow metadata must contain JSON-compatible values; quote dates and nonfinite numbers') from exc
    require(len(encoded.encode('utf-8')) <= LIMIT, 'export exceeds viewer 2 MiB limit')
    return result


def publish(data, output):
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=output.parent, delete=False) as stream:
            temporary = Path(stream.name)
            json.dump(data, stream, ensure_ascii=False, separators=(',', ':'))
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, output)
    finally:
        if temporary and temporary.exists():
            temporary.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('root', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--project', required=True)
    parser.add_argument('--baseline', required=True, help='Commit identity or explicit dirty-preview label; input hashes always included')
    parser.add_argument('--sample', action='store_true')
    parser.add_argument('--partial', action='store_true')
    args = parser.parse_args()
    try:
        require(not args.output.resolve().is_relative_to(args.root.resolve()), 'output must be outside source bundle')
        data = export(args.root, args.project, args.baseline, args.sample, args.partial)
        publish(data, args.output)
    except (ValueError, OSError, yaml.YAMLError, RecursionError) as exc:
        parser.exit(1, f'Export failed; prior output retained: {exc}\n')
    print(f'Exported {len(data["records"])} records to {args.output}; claims are not independently verified.')


if __name__ == '__main__':
    main()
