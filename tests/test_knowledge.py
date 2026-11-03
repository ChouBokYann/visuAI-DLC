import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest
import re

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('validator', ROOT / 'scripts/validate_knowledge.py')
validator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validator)


class KnowledgeTests(unittest.TestCase):
    def setUp(self):
        self.bundle = ROOT / 'docs/examples/project-thread/baseline-b'
        self.records = validator.read_bundle(self.bundle)

    def test_both_baselines_are_valid(self):
        for name in ('baseline-a', 'baseline-b'):
            records = validator.read_bundle(self.bundle.parent / name)
            self.assertEqual(validator.validate(records), [])

    def test_feature_reaches_goal_and_revision_retains_history(self):
        def targets(record, predicate):
            return [e['target'] for e in record['visu']['relations'] if e['predicate'] == predicate]
        by_id = {r['visu']['id']: r for _, r in self.records}
        capability = targets(by_id['feature-progress-view'], 'realizes')[0]
        self.assertEqual(targets(by_id[capability], 'contributes_to'), ['goal-returning-maintainer'])
        self.assertEqual(targets(by_id['decision-direct-first'], 'supersedes'), ['decision-blocker-scope'])
        self.assertEqual(by_id['decision-blocker-scope']['status'], 'deprecated')
        self.assertEqual(by_id['evidence-walkthrough']['visu']['result'], 'pending')
        self.assertNotIn('verified', by_id['evidence-walkthrough'])

    def test_invalid_records_fail_with_actionable_errors(self):
        cases = [
            ('duplicate id', lambda rows: rows.append(copy.deepcopy(rows[0]))),
            ('unresolved target', lambda rows: self.edge(rows).update(target='missing')),
            ('unknown predicate', lambda rows: self.edge(rows).update(predicate='proves')),
            ('invalid endpoint', lambda rows: self.edge(rows).update(target='release-v01')),
            ('unknown basis', lambda rows: self.edge(rows).update(basis='confirmed')),
            ('unknown source', lambda rows: self.edge(rows).update(source='missing')),
            ('unsupported schema', lambda rows: rows[0][1]['visu'].update(schema_version=2)),
            ('tested_revision', lambda rows: self.evidence(rows)['visu'].update(result='passed')),
            ('pending evidence', lambda rows: self.evidence(rows)['visu'].update(tested_revision='abc')),
        ]
        for expected, mutate in cases:
            with self.subTest(expected=expected):
                rows = copy.deepcopy(self.records)
                mutate(rows)
                self.assertTrue(any(expected in e for e in validator.validate(rows)))

    @staticmethod
    def edge(rows):
        return next(r['visu']['relations'][0] for _, r in rows if r['type'] == 'Capability')

    @staticmethod
    def evidence(rows):
        return next(r for _, r in rows if r['type'] == 'Evidence')

    def test_inferred_is_retained_not_promoted(self):
        self.edge(self.records)['basis'] = 'inferred'
        self.assertEqual(validator.validate(self.records), [])
        self.assertEqual(self.edge(self.records)['basis'], 'inferred')

    def test_duplicate_yaml_key_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            Path(tmp, 'bad.md').write_text('---\ntype: Goal\ntype: Feature\n---\nBody', encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'duplicate YAML key'):
                validator.read_bundle(Path(tmp))

    def test_malformed_metadata_returns_errors(self):
        self.records[0][1]['type'] = ['Goal']
        self.assertTrue(validator.validate(self.records))

    def test_example_markdown_links_resolve(self):
        for path in (ROOT / 'docs').rglob('*.md'):
            for target in re.findall(r'\]\(([^)]+)\)', path.read_text(encoding='utf-8')):
                if '://' not in target:
                    local = target.split('#')[0]
                    self.assertTrue((path.parent / local).exists(), f'{path}: {target}')


if __name__ == '__main__':
    unittest.main()
