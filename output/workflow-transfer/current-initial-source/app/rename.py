"""Synthetic Windows batch rename CLI; no crash or concurrent-writer protection."""
import argparse
import csv
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import uuid


class Invalid(ValueError):
    pass


def name(value):
    if not isinstance(value, str) or not value or value in ('.', '..'):
        raise Invalid('Names must be nonempty single filenames.')
    if any(ord(c) < 32 or c in '<>:"/\\|?*' for c in value) or value.endswith((' ', '.')):
        raise Invalid(f'Invalid Windows filename: {value!r}')
    stem = value.split('.')[0].rstrip(' ').upper()
    if stem in {'CON', 'PRN', 'AUX', 'NUL', 'CONIN$', 'CONOUT$'} or re.fullmatch(r'(COM|LPT)[1-9¹²³]', stem):
        raise Invalid(f'Reserved Windows filename: {value!r}')
    if len(value.encode('utf-16-le')) // 2 > 255:
        raise Invalid('Filename exceeds 255 UTF-16 code units.')
    return value


def root_path(raw):
    path = Path(raw).absolute()
    if path.is_symlink() or not path.is_dir():
        raise Invalid('ROOT must be an existing directory, not a symlink.')
    return path.resolve()


def outside(raw, root):
    path = Path(raw).absolute()
    if path.is_symlink():
        raise Invalid(f'Record path must not be a symlink: {path}')
    path = path.resolve()
    if path == root or root in path.parents:
        raise Invalid('PLAN and JOURNAL must be outside ROOT.')
    return path


def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def write_new(path, doc):
    with path.open('x', encoding='utf-8') as f:
        json.dump(doc, f, ensure_ascii=True, indent=2)
        f.write('\n')


def save(path, doc):
    temp = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
    try:
        write_new(temp, doc)
        os.replace(temp, path)
    finally:
        if temp.exists():
            temp.unlink()


def load(path, kind, root, state):
    with path.open(encoding='utf-8') as f:
        doc = json.load(f)
    if not isinstance(doc, dict) or doc.get('version') != 1 or doc.get('kind') != kind:
        raise Invalid(f'Invalid {kind} format; create a fresh preview.')
    if doc.get('root') != str(root):
        raise Invalid(f'{kind} belongs to a different ROOT.')
    if doc.get('state') != state:
        raise Invalid(f'{kind} state is {doc.get("state")!r}; expected {state!r}. Do not repeat completed work.')
    validate_changes(doc.get('changes'), fingerprints=True)
    return doc


def validate_changes(changes, fingerprints=False):
    if not isinstance(changes, list) or not changes:
        raise Invalid('Batch must contain at least one change.')
    sources, targets = set(), set()
    for change in changes:
        if not isinstance(change, dict):
            raise Invalid('Each change must be an object.')
        a, b = name(change.get('from')), name(change.get('to'))
        if a == b:
            raise Invalid(f'Unchanged filename: {a!r}')
        if a.casefold() in sources:
            raise Invalid(f'Duplicate source: {a!r}')
        if b.casefold() in targets:
            raise Invalid(f'Duplicate destination: {b!r}')
        sources.add(a.casefold())
        targets.add(b.casefold())
        if fingerprints and (not isinstance(change.get('sha256'), str) or not re.fullmatch('[0-9a-f]{64}', change['sha256'])):
            raise Invalid('Missing or invalid source fingerprint; create a fresh preview.')


def validate_files(root, changes, fingerprints=False):
    validate_changes(changes, fingerprints)
    entries = {}
    for path in root.iterdir():
        key = path.name.casefold()
        if key in entries:
            raise Invalid('ROOT has ambiguous case-insensitive filenames.')
        entries[key] = path
    sources = {c['from'].casefold() for c in changes}
    result = []
    for change in changes:
        source = entries.get(change['from'].casefold())
        if source is None:
            raise Invalid(f'Missing source: {change["from"]!r}')
        if source.is_symlink() or not source.is_file():
            raise Invalid(f'Source must be an ordinary file, not a link/directory: {source.name!r}')
        target = entries.get(change['to'].casefold())
        if target is not None:
            if target.is_symlink() or not target.is_file():
                raise Invalid(f'Destination is a link/directory: {target.name!r}')
            if target.name.casefold() not in sources:
                raise Invalid(f'Destination occupied by unrelated file: {target.name!r}')
        actual_hash = digest(source)
        if fingerprints and actual_hash != change['sha256']:
            raise Invalid(f'Source contents changed: {source.name!r}; preview again or restore the expected contents.')
        result.append({'from': source.name, 'to': change['to'], 'sha256': actual_hash})
    return result


def preview(root, csv_path, plan_path):
    root = root_path(root)
    plan_path = outside(plan_path, root)
    if plan_path.exists():
        raise Invalid('PLAN already exists; choose a new plan path.')
    with Path(csv_path).open(encoding='utf-8-sig', newline='') as f:
        reader = csv.reader(f, strict=True)
        if next(reader, None) != ['from', 'to']:
            raise Invalid('CSV header must be exactly from,to.')
        changes = []
        for row in reader:
            if len(row) != 2:
                raise Invalid('Each CSV row must have exactly two fields.')
            changes.append({'from': row[0], 'to': row[1]})
    checked = validate_files(root, changes)
    write_new(plan_path, {'version': 1, 'kind': 'plan', 'root': str(root), 'state': 'pending', 'changes': checked})
    return {'ok': True, 'changes': changes, 'plan': str(plan_path)}


def move(src, dst):
    if dst.exists() or dst.is_symlink():
        raise Invalid(f'Refusing to overwrite {dst}')
    os.rename(src, dst)


def transact(root, changes, commit):
    originals = [root / c['from'] for c in changes]
    locations = list(originals)
    try:
        for i in range(len(changes)):
            temp = root / ('.rename-' + uuid.uuid4().hex)
            move(locations[i], temp)
            locations[i] = temp
        for i, change in enumerate(changes):
            target = root / change['to']
            move(locations[i], target)
            locations[i] = target
        commit()
    except Exception as error:
        recovery = []
        # Restage every surviving file first so rollback also supports cycles.
        for i, current in enumerate(locations):
            try:
                temp = root / ('.recover-' + uuid.uuid4().hex)
                move(current, temp)
                locations[i] = temp
            except Exception as failure:
                recovery.append(str(failure))
        for i, current in enumerate(locations):
            if current == originals[i]:
                continue
            try:
                move(current, originals[i])
                locations[i] = originals[i]
            except Exception as failure:
                recovery.append(str(failure))
        detail = 'Original filenames and contents restored.' if not recovery else 'Recovery incomplete: ' + '; '.join(recovery) + '. File locations: ' + str([str(p) for p in locations])
        raise Invalid(f'Batch failed: {error}. {detail}') from error


def apply(root, plan_path, journal_path):
    root = root_path(root)
    plan_path, journal_path = outside(plan_path, root), outside(journal_path, root)
    if journal_path.exists():
        raise Invalid('JOURNAL already exists; choose a new journal path.')
    plan = load(plan_path, 'plan', root, 'pending')
    checked = validate_files(root, plan['changes'], True)
    journal = {'version': 1, 'kind': 'journal', 'root': str(root), 'state': 'applying', 'changes': checked}
    write_new(journal_path, journal)
    def commit():
        journal['state'] = 'completed'
        save(journal_path, journal)
        plan['state'] = 'applied'
        save(plan_path, plan)
    try:
        transact(root, checked, commit)
    except Exception as error:
        journal.update(state='failed', error=str(error))
        try:
            save(journal_path, journal)
        except Exception as failure:
            raise Invalid(f'{error} Journal update also failed: {failure}; inspect files manually.') from error
        raise
    return {'ok': True, 'state': 'completed', 'journal': str(journal_path)}


def undo(root, journal_path):
    root = root_path(root)
    journal_path = outside(journal_path, root)
    journal = load(journal_path, 'journal', root, 'completed')
    reverse = [{'from': c['to'], 'to': c['from'], 'sha256': c['sha256']} for c in journal['changes']]
    checked = validate_files(root, reverse, True)
    journal['state'] = 'undoing'
    save(journal_path, journal)
    def commit():
        journal['state'] = 'undone'
        save(journal_path, journal)
    try:
        transact(root, checked, commit)
    except Exception as error:
        journal.update(state='failed', error=str(error), operation='undo')
        try:
            save(journal_path, journal)
        except Exception as failure:
            raise Invalid(f'{error} Journal update also failed: {failure}; inspect files manually.') from error
        raise
    return {'ok': True, 'state': 'undone'}


class Parser(argparse.ArgumentParser):
    def error(self, message):
        raise Invalid(message)


def main():
    try:
        parser = Parser(description=__doc__)
        sub = parser.add_subparsers(dest='action', required=True)
        for action in ('preview', 'apply', 'undo'):
            command = sub.add_parser(action)
            command.add_argument('--root', required=True)
            if action == 'preview': command.add_argument('--csv', required=True)
            if action != 'undo': command.add_argument('--plan', required=True)
            if action != 'preview': command.add_argument('--journal', required=True)
        args = parser.parse_args()
        if args.action == 'preview': result = preview(args.root, args.csv, args.plan)
        elif args.action == 'apply': result = apply(args.root, args.plan, args.journal)
        else: result = undo(args.root, args.journal)
    except Exception as error:
        print(json.dumps({'ok': False, 'errors': [str(error)]}, ensure_ascii=True))
        return 1
    print(json.dumps(result, ensure_ascii=True))
    return 0


if __name__ == '__main__':
    sys.exit(main())
