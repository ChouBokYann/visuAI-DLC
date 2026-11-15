import copy
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import export_workflow as exporter


class WorkflowExportTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'bundle'
        shutil.copytree(ROOT / 'docs/examples/business-context/baseline-b', self.root)
        self.path = self.root / 'delivery.md'

    def edit(self, change):
        source = self.path.read_text(encoding='utf-8')
        _, front, body = source.split('---', 2)
        meta = yaml.safe_load(front)
        change(meta['workflow_context'])
        self.path.write_text('---\n' + yaml.safe_dump(meta, sort_keys=False) + '---' + body, encoding='utf-8')

    def export(self, partial=False):
        return exporter.export(self.root, 'cafe-trial', 'dirty-test', True, partial)

    def test_trace_history_and_revision_are_retained(self):
        data = self.export()
        rows = {r['id']: r for r in data['records']}
        self.assertEqual(rows['DECISION-001']['status'], 'superseded')
        self.assertEqual(rows['CHANGE-001']['revision'], 'fixture-v2')
        self.assertEqual(rows['EVIDENCE-001']['testedRevision'], 'fixture-v1')
        self.assertIn('unmeasured', data['project']['summary'])
        self.assertEqual(rows['OUTCOME-001']['status'], 'undecided')
        self.assertIn('Alternative:', rows['DECISION-002']['explanation'])
        self.assertEqual(len(data['provenance']['files']), 2)
        self.assertTrue(any(e['relation'] == 'addresses' for e in data['edges']))

    def test_complete_missing_link_fails_partial_discloses_it(self):
        self.edit(lambda c: c['records'][1]['links'][0].update(target='EXTERNAL-001'))
        with self.assertRaisesRegex(ValueError, 'unresolved'):
            self.export()
        data = self.export(partial=True)
        self.assertFalse(data['provenance']['complete'])
        self.assertEqual(data['provenance']['unresolved'], ['EXTERNAL-001'])
        self.assertIn('Partial', data['project']['summary'])

    def test_missing_business_rationale_is_explicit(self):
        def change(c):
            c['records'][4]['links'] = []
            c['records'][4]['gap'] = 'Intent missing; ask the owner which requirement this restores.'
        self.edit(change)
        self.assertIn('Intent missing', self.export()['provenance']['diagnostics'][0])

    def test_rejects_invalid_records(self):
        original = self.path.read_text(encoding='utf-8')
        cases = [
            ('duplicate ID', lambda c: c['records'].append(copy.deepcopy(c['records'][0]))),
            ('unsupported schema', lambda c: c.update(version=99)),
            ('endpoints', lambda c: c['records'][1]['links'][0].update(target='CHANGE-001')),
            ('scope/target', lambda c: c['records'][5].update(scope='business')),
            ('testedRevision', lambda c: c['records'][5].pop('testedRevision')),
            ('evidence.context', lambda c: c['records'][5].pop('context')),
            ('source', lambda c: c['records'][1]['links'][0].update(source='absent')),
            ('escapes', lambda c: c['records'][0]['sources'][0].update(ref='../outside.md')),
            ('unsafe', lambda c: c['records'][0]['sources'][0].update(ref='javascript:alert(1)')),
            ('anchor', lambda c: c['records'][0].update(detail='#missing')),
            ('business connection', lambda c: c['records'][4].update(links=[])),
            ('measurement', lambda c: c['records'][1].update(status='observed')),
        ]
        for expected, mutation in cases:
            with self.subTest(expected=expected):
                self.path.write_text(original, encoding='utf-8')
                self.edit(mutation)
                with self.assertRaisesRegex(ValueError, expected):
                    self.export()

    def test_duplicate_yaml_and_aliases_rejected(self):
        source = self.path.read_text(encoding='utf-8')
        self.path.write_text(source.replace('version: 1', 'version: 1\n  version: 1'), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'duplicate YAML'):
            self.export()
        self.path.write_text(source.replace('version: 1', 'version: &v 1'), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'aliases/anchors'):
            self.export()

    def test_business_observation_is_separate_and_can_fail(self):
        def change(c):
            c['records'][1].update(status='observed', measurement='Timed search sessions')
            e = c['records'][5]
            e.update(scope='business', status='failed', method='Compare search time before and after', context='Synthetic participants, same fixture-v2; illustrative one-week comparison', limits='Small synthetic sample; no causal inference')
            e.pop('testedRevision')
            e['links'][0]['target'] = 'OUTCOME-001'
        self.edit(change)
        result = self.export()
        self.assertEqual(result['records'][5]['status'], 'failed')
        self.assertIn('0 of 1', result['project']['summary'])
        self.assertNotIn('achieved', result['project']['summary'])

    def test_input_hashes_change_with_prose(self):
        before = self.export()['provenance']['digest']
        self.path.write_text(self.path.read_text(encoding='utf-8') + '\nAdditional rationale.\n', encoding='utf-8')
        self.assertNotEqual(before, self.export()['provenance']['digest'])

    def test_failed_cli_export_preserves_last_good_bytes(self):
        output = Path(self.temp.name) / 'snapshot.json'
        exporter.publish(self.export(), output)
        previous = output.read_bytes()
        self.edit(lambda c: c.update(version=9))
        run = subprocess.run([sys.executable, '-B', str(ROOT / 'scripts/export_workflow.py'), str(self.root), str(output), '--project', 'cafe-trial', '--baseline', 'test'], capture_output=True, text=True)
        self.assertNotEqual(run.returncode, 0)
        self.assertIn('prior output retained', run.stderr)
        self.assertEqual(previous, output.read_bytes())

    def test_javascript_adapter_preserves_scope_and_staleness(self):
        output = Path(self.temp.name) / 'snapshot.json'
        exporter.publish(self.export(), output)
        code = "const m=require(process.argv[1]);const d=m.validateSnapshot(require(process.argv[2]));const assert=require('node:assert/strict');assert.equal(m.evidenceState(d.records.find(r=>r.id==='EVIDENCE-001'),d),'stale');assert.equal(d.records.find(r=>r.id==='OUTCOME-001').status,'undecided');assert.ok(m.related('OUTCOME-001',d).length>=3);"
        run = subprocess.run(['node', '-e', code, str(ROOT / 'experiments/project-overview/model.js'), str(output)], capture_output=True, text=True)
        self.assertEqual(run.returncode, 0, run.stderr)

    def test_atomic_publication_failure_retains_output(self):
        output = Path(self.temp.name) / 'snapshot.json'
        output.write_text('previous valid snapshot', encoding='utf-8')
        with patch.object(exporter.os, 'replace', side_effect=OSError('disk unavailable')):
            with self.assertRaises(OSError):
                exporter.publish(self.export(), output)
        self.assertEqual(output.read_text(encoding='utf-8'), 'previous valid snapshot')
        self.assertEqual(sorted(p.name for p in output.parent.iterdir()), ['bundle', 'snapshot.json'])

    def test_conflicting_document_owners_and_size_limits(self):
        duplicate = self.root / 'other-owner.md'
        duplicate.write_bytes(self.path.read_bytes())
        with self.assertRaisesRegex(ValueError, 'conflicting owners'):
            self.export()
        duplicate.write_text('x' * (exporter.LIMIT + 1), encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'exceeds'):
            self.export()

    def test_supersession_cycle_rejected(self):
        def change(c):
            c['records'][6]['status'] = 'superseded'
            c['records'][3]['links'].append(dict(relation='supersedes',target='DECISION-002',basis='stated',source='brief',reason='Invalid circular history'))
        self.edit(change)
        with self.assertRaisesRegex(ValueError, 'cycle'):
            self.export()


if __name__ == '__main__':
    unittest.main()
