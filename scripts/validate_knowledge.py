"""Validate visuAI-DLC's structural profile, not semantic truth or all of OKF."""
import argparse
from pathlib import Path
import re

import yaml


class UniqueLoader(yaml.SafeLoader):
    """Reject duplicate keys instead of silently discarding an agent's edit."""


def unique_mapping(loader, node):
    result = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node)
        if not isinstance(key, str):
            raise ValueError('YAML mapping keys must be strings')
        if key in result:
            raise ValueError(f'duplicate YAML key: {key}')
        result[key] = loader.construct_object(value_node)
    return result


UniqueLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, unique_mapping)

TYPES = {'Goal', 'Capability', 'Feature', 'Decision', 'Evidence', 'Release', 'Procedure'}
EDGES = {
    'contributes_to': {('Capability', 'Goal')},
    'realizes': {('Feature', 'Capability')},
    'affects': {('Decision', 'Feature'), ('Decision', 'Capability')},
    'assesses': {('Evidence', 'Feature'), ('Evidence', 'Capability')},
    'uses_procedure': {('Evidence', 'Procedure')},
    'targets': {('Release', 'Feature')},
    'depends_on': {('Feature', 'Feature'), ('Capability', 'Capability')},
    'supersedes': {('Decision', 'Decision')},
}


def read_bundle(root):
    if not root.is_dir():
        raise ValueError(f'bundle directory does not exist: {root}')
    records = []
    for path in sorted(root.rglob('*.md')):
        if path.name in {'index.md', 'log.md'}:
            continue
        text = path.read_text(encoding='utf-8')
        lines = text.splitlines()
        if not lines or lines[0] != '---' or '---' not in lines[1:]:
            raise ValueError(f'{path}: missing YAML frontmatter')
        end = lines.index('---', 1)
        if not '\n'.join(lines[end + 1:]).strip():
            raise ValueError(f'{path}: empty Markdown body')
        try:
            record = yaml.load('\n'.join(lines[1:end]), Loader=UniqueLoader)
        except (yaml.YAMLError, ValueError) as exc:
            raise ValueError(f'{path}: {exc}') from exc
        records.append((path, record))
    if not records:
        raise ValueError(f'{root}: no concept documents')
    return records


def validate(records):
    errors, by_id, ready = [], {}, []
    for path, record in records:
        def fail(message):
            errors.append(f'{path}: {message}')

        if not isinstance(record, dict):
            fail('frontmatter must be a mapping')
            continue
        valid_strings = True
        for key in ('type', 'title', 'description', 'status'):
            if not isinstance(record.get(key), str) or not record[key].strip():
                fail(f'{key} must be a nonempty string')
                valid_strings = False
        if not valid_strings:
            continue
        if record.get('type') not in TYPES:
            fail('unknown concept type')
        if record.get('status') not in {'draft', 'stable', 'deprecated'}:
            fail('invalid document status')
        meta = record.get('visu')
        if not isinstance(meta, dict):
            fail('visu must be a mapping')
            continue
        if type(meta.get('schema_version')) is not int or meta['schema_version'] != 1:
            fail('unsupported schema version')
        identity = meta.get('id')
        if not isinstance(identity, str) or not re.fullmatch(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)*', identity):
            fail('invalid id')
            continue
        if identity in by_id:
            fail(f'duplicate id: {identity}')
        by_id[identity] = record
        sources = record.get('sources')
        source_ids = set()
        if not isinstance(sources, list) or not sources:
            fail('sources must be a nonempty list')
        else:
            for source in sources:
                if not isinstance(source, dict) or any(not isinstance(source.get(k), str) or not source[k].strip() for k in ('id', 'resource')):
                    fail('source requires id and resource strings')
                    continue
                if source['id'] in source_ids:
                    fail('duplicate source id')
                source_ids.add(source['id'])
        if record.get('type') == 'Feature':
            if meta.get('delivery_state') not in ('proposed', 'in-progress', 'implemented', 'verified', 'released', 'deferred'):
                fail('invalid delivery_state')
        elif 'delivery_state' in meta:
            fail('delivery_state belongs to Feature only')
        if record.get('type') == 'Evidence':
            if meta.get('result') not in ('pending', 'passed', 'failed', 'inconclusive'):
                fail('invalid evidence result')
            if meta.get('result') == 'pending':
                if 'tested_revision' in meta:
                    fail('pending evidence cannot have tested_revision')
            elif not isinstance(meta.get('tested_revision'), str) or not meta['tested_revision'].strip():
                fail('completed evidence needs tested_revision')
        elif 'result' in meta or 'tested_revision' in meta:
            fail('result and tested_revision belong to Evidence only')
        relations = meta.get('relations')
        if not isinstance(relations, list):
            fail('relations must be a list')
            continue
        ready.append((path, record, source_ids))
    for path, record, source_ids in ready:
        seen = set()
        for edge in record['visu']['relations']:
            prefix = f'{path}: '
            if not isinstance(edge, dict) or any(not isinstance(edge.get(k), str) for k in ('predicate', 'target', 'basis', 'source')):
                errors.append(prefix + 'edge requires predicate, target, basis, source strings')
                continue
            predicate, target = edge['predicate'], edge['target']
            if (predicate, target) in seen:
                errors.append(prefix + 'duplicate relationship')
            seen.add((predicate, target))
            if edge['basis'] not in {'declared', 'inferred'}:
                errors.append(prefix + 'unknown basis')
            if edge['source'] not in source_ids:
                errors.append(prefix + 'unknown source')
            if predicate not in EDGES:
                errors.append(prefix + f'unknown predicate: {predicate}')
            if target not in by_id:
                errors.append(prefix + f'unresolved target: {target}')
            elif predicate in EDGES and (record.get('type'), by_id[target].get('type')) not in EDGES[predicate]:
                errors.append(prefix + f'invalid endpoint: {predicate} -> {target}')
            if target == record['visu']['id']:
                errors.append(prefix + 'self relationship is not supported')
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('bundles', type=Path, nargs='+')
    args = parser.parse_args()
    failed = False
    for root in args.bundles:
        try:
            records = read_bundle(root)
            errors = validate(records)
        except (ValueError, OSError) as exc:
            errors = [str(exc)]
        if errors:
            failed = True
            print('\n'.join(errors))
        else:
            print(f'PASS {root}: {len(records)} concepts')
    return int(failed)


if __name__ == '__main__':
    raise SystemExit(main())
