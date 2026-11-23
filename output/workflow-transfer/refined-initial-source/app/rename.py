"""Safe single-directory batch rename. No crash durability or concurrent-writer guarantee."""
import argparse
import csv
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import sys
import uuid


class Invalid(ValueError):
    pass


def linked(path):
    info = path.lstat()
    return stat.S_ISLNK(info.st_mode) or bool(getattr(info, 'st_file_attributes', 0) & 0x400)


def root_path(root):
    root = Path(root).absolute()
    if linked(root) or not root.is_dir():
        raise Invalid('ROOT must be an existing ordinary directory, not a link.')
    return root.resolve()


def artifact(path, root, new=False):
    path = Path(path).absolute()
    if path.is_symlink() or (path.exists() and linked(path)):
        raise Invalid(f'Artifact cannot be a link: {path}')
    path = path.resolve()
    if path == root or root in path.parents:
        raise Invalid(f'Plan, CSV and journal must be outside ROOT: {path}')
    if new and path.exists():
        raise Invalid(f'Already exists; choose a new artifact path: {path}')
    return path


def name(value):
    if not isinstance(value, str) or not value or value in ('.', '..') or len(value.encode('utf-16-le')) // 2 > 255:
        raise Invalid(f'Invalid filename: {value!r}')
    if any(ord(c) < 32 or c in '<>:"/\\|?*' for c in value) or value.endswith((' ', '.')):
        raise Invalid(f'Invalid Windows filename: {value!r}')
    if re.fullmatch(r'CON|PRN|AUX|NUL|COM[1-9¹²³]|LPT[1-9¹²³]', value.split('.')[0], re.I):
        raise Invalid(f'Reserved Windows filename: {value!r}')
    return value


def inventory(root):
    entries = {}
    for path in root.iterdir():
        key = path.name.casefold()
        if key in entries:
            raise Invalid(f'Case-insensitive name conflict: {path.name}')
        entries[key] = path
    return entries


def digest(path):
    if linked(path) or not path.is_file():
        raise Invalid(f'Only ordinary files are supported, not links/directories: {path.name}')
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return {'size': path.stat().st_size, 'sha256': h.hexdigest()}


def validate(root, changes, expected=None):
    if not isinstance(changes, list) or not changes:
        raise Invalid('Batch must contain at least one rename.')
    sources, targets = set(), set()
    for row in changes:
        if not isinstance(row, dict) or set(row) != {'from', 'to'}:
            raise Invalid('Each change must contain exactly from and to filenames.')
        src, dst = name(row['from']), name(row['to'])
        if src == dst:
            raise Invalid(f'Unchanged entry: {src}')
        if src.casefold() in sources or dst.casefold() in targets:
            raise Invalid(f'Duplicate source or destination: {src} -> {dst}')
        sources.add(src.casefold()); targets.add(dst.casefold())
    entries = inventory(root)
    fingerprints = []
    for row in changes:
        src, dst = row['from'], row['to']
        if src.casefold() not in entries:
            raise Invalid(f'Missing source: {src}')
        fingerprints.append(digest(entries[src.casefold()]))
        target = entries.get(dst.casefold())
        if target is not None:
            if linked(target) or not target.is_file():
                raise Invalid(f'Destination is a link/directory: {dst}')
            if dst.casefold() not in sources:
                raise Invalid(f'Destination occupied by unrelated file: {dst}')
    if expected is not None and fingerprints != expected:
        raise Invalid('Source contents changed since preview/application; inspect files and preview again.')
    return fingerprints


def save(path, obj, new=False):
    payload = json.dumps(obj, ensure_ascii=False, indent=2) + '\n'
    if new:
        with path.open('x', encoding='utf-8') as stream:
            stream.write(payload)
    else:
        temp = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
        try:
            with temp.open('x', encoding='utf-8') as stream:
                stream.write(payload)
            os.replace(temp, path)
        finally:
            if temp.exists(): temp.unlink()


def load(path, root, kind):
    with path.open(encoding='utf-8') as stream:
        obj = json.load(stream)
    if not isinstance(obj, dict) or obj.get('version') != 1 or obj.get('kind') != kind:
        raise Invalid(f'Invalid {kind} format; use an artifact produced by this CLI.')
    if obj.get('root') != str(root):
        raise Invalid(f'{kind.capitalize()} belongs to a different ROOT.')
    if not isinstance(obj.get('fingerprints'), list) or len(obj['fingerprints']) != len(obj.get('changes', [])):
        raise Invalid('Invalid content fingerprints.')
    for fp in obj['fingerprints']:
        if not isinstance(fp, dict) or set(fp) != {'size','sha256'} or type(fp['size']) is not int or fp['size'] < 0 or not isinstance(fp['sha256'],str) or not re.fullmatch('[0-9a-f]{64}',fp['sha256']):
            raise Invalid('Invalid content fingerprint.')
    return obj


def move(src, dst):
    if dst.exists() or dst.is_symlink():
        raise Invalid(f'Refusing to overwrite: {dst}')
    os.rename(src, dst)


def transaction(root, changes, finish):
    moves = []
    staged = []
    try:
        entries = inventory(root)
        for row in changes:
            src = entries[row['from'].casefold()]
            temp = root / ('.rename-' + uuid.uuid4().hex)
            move(src, temp); moves.append((src, temp)); staged.append(temp)
        for row, temp in zip(changes, staged):
            dst = root / row['to']
            move(temp, dst); moves.append((temp, dst))
        finish()
    except Exception as original:
        failures = []
        for src, dst in reversed(moves):
            try:
                move(dst, src)
            except Exception as recovery:
                failures.append(f'{dst} -> {src}: {recovery}')
        if failures:
            raise Invalid(f'Operation failed: {original}; rollback incomplete; preserve files and recover manually: {failures}') from original
        raise Invalid(f'Operation failed: {original}; original names/content restored.') from original


def preview(root, csv_path, plan_path):
    root = root_path(root)
    csv_path = Path(csv_path).resolve()
    plan_path = artifact(plan_path, root, new=True)
    with csv_path.open(encoding='utf-8-sig', newline='') as stream:
        reader = csv.reader(stream, strict=True)
        if next(reader, None) != ['from', 'to']:
            raise Invalid('CSV header must be exactly from,to.')
        changes = []
        for row in reader:
            if len(row) != 2: raise Invalid('Each CSV row must have exactly two fields.')
            changes.append({'from':row[0], 'to':row[1]})
    fingerprints = validate(root, changes)
    # Record actual source spelling so undo restores names as well as bytes.
    entries = inventory(root)
    changes = [{'from':entries[r['from'].casefold()].name,'to':r['to']} for r in changes]
    validate(root, changes, fingerprints)
    plan = {'version':1,'kind':'plan','state':'ready','root':str(root),'changes':changes,'fingerprints':fingerprints}
    save(plan_path, plan, new=True)
    return {'ok':True,'changes':changes,'plan':str(plan_path)}


def apply(root, plan_path, journal_path):
    root = root_path(root)
    plan_path = artifact(plan_path, root)
    journal_path = artifact(journal_path, root, new=True)
    plan = load(plan_path, root, 'plan')
    if plan.get('state') != 'ready': raise Invalid('Plan already attempted; inspect its journal and create a new preview.')
    validate(root, plan.get('changes'), plan['fingerprints'])
    journal = dict(plan, kind='journal', state='applying')
    save(journal_path, journal, new=True)
    try:
        plan['state']='applying'; save(plan_path,plan)
        def finish():
            journal['state']='completed'; save(journal_path,journal)
            plan['state']='applied'; save(plan_path,plan)
        transaction(root,plan['changes'],finish)
    except Exception as error:
        journal['state']='failed'; journal['error']=str(error)
        plan['state']='failed'
        failures=[]
        for path, obj in ((journal_path,journal),(plan_path,plan)):
            try: save(path,obj)
            except Exception as failure: failures.append(str(failure))
        raise Invalid(f'{error}; journal: {journal_path}; metadata recovery errors: {failures}') from error
    return {'ok':True,'changes':plan['changes'],'journal':str(journal_path)}


def undo(root, journal_path):
    root = root_path(root)
    journal_path = artifact(journal_path,root)
    journal = load(journal_path,root,'journal')
    if journal.get('state') != 'completed': raise Invalid('Journal is not completed (already undone or failed); inspect its state before recovery.')
    changes = journal.get('changes')
    if not isinstance(changes,list) or any(not isinstance(r,dict) or set(r) != {'from','to'} for r in changes):
        raise Invalid('Invalid journal changes.')
    reverse = [{'from':r['to'],'to':r['from']} for r in changes]
    validate(root,reverse,journal['fingerprints'])
    journal['state']='undoing'; save(journal_path,journal)
    try:
        def finish():
            journal['state']='undone'; save(journal_path,journal)
        transaction(root,reverse,finish)
    except Exception as error:
        journal['state']='undo_failed'; journal['error']=str(error)
        try: save(journal_path,journal)
        except Exception as failure: raise Invalid(f'{error}; cannot record failure: {failure}') from error
        raise
    return {'ok':True,'changes':reverse,'journal':str(journal_path)}


class Parser(argparse.ArgumentParser):
    def error(self, message): raise Invalid(message)


def main():
    try:
        parser=Parser(description=__doc__)
        sub=parser.add_subparsers(dest='command',required=True)
        for command in ('preview','apply','undo'):
            p=sub.add_parser(command); p.add_argument('--root',required=True)
            if command == 'preview': p.add_argument('--csv',required=True)
            if command != 'undo': p.add_argument('--plan',required=True)
            if command != 'preview': p.add_argument('--journal',required=True)
        args=parser.parse_args()
        if args.command == 'preview': result=preview(args.root,args.csv,args.plan)
        elif args.command == 'apply': result=apply(args.root,args.plan,args.journal)
        else: result=undo(args.root,args.journal)
        print(json.dumps(result,ensure_ascii=True))
        return 0
    except Exception as error:
        print(json.dumps({'ok':False,'errors':[str(error)]},ensure_ascii=True))
        return 1


if __name__ == '__main__': sys.exit(main())
