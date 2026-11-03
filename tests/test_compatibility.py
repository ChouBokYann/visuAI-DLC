import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest

import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'benchmarks/issue-3'))
from project_fixture import project
from run_pilot import WORK


class CompatibilityTests(unittest.TestCase):
    def setUp(self):
        WORK.mkdir(exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=WORK)
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = self.root / 'source'
        shutil.copytree(ROOT / 'docs/examples/project-thread/baseline-b', self.source)

    def change(self, name, mutate):
        path = self.source / (name + '.md')
        _, front, body = path.read_text(encoding='utf-8').split('---', 2)
        meta = yaml.safe_load(front)
        mutate(meta)
        path.write_text('---\n' + yaml.safe_dump(meta, sort_keys=False) + '---\n' + body, encoding='utf-8')

    def test_projection_preserves_edges_and_is_idempotent(self):
        for tool in ['bm', 'graphify']:
            out = self.root / tool
            first = project(self.source, out, tool)
            self.assertEqual((first['nodes'], first['declared_edges']), (8, 8))
            self.assertEqual(project(self.source, out, tool)['documents_written'], 0)
            if tool == 'graphify':
                graph = json.loads((out / 'graph.json').read_text())
                self.assertTrue(graph['directed'])
                self.assertIn(('feature-progress-view', 'capability-blockers'), {(e['source'], e['target']) for e in graph['edges']})

    def test_native_permalink_does_not_cause_rewrite(self):
        out = self.root / 'bm'
        project(self.source, out, 'bm')
        path = out / 'feature-progress-view.md'
        _, front, body = path.read_text(encoding='utf-8').split('---', 2)
        meta = yaml.safe_load(front)
        meta['permalink'] = 'test/feature-progress-view'
        path.write_text('---\n' + yaml.safe_dump(meta) + '---\n' + body, encoding='utf-8')
        self.assertEqual(project(self.source, out, 'bm')['documents_written'], 0)

    def test_inferred_edges_are_not_promoted(self):
        self.change('feature-progress-view', lambda m: m['visu']['relations'][0].update(basis='inferred'))
        for tool in ['bm', 'graphify']:
            out = self.root / tool
            result = project(self.source, out, tool)
            self.assertEqual((result['declared_edges'], result['inferred_edges_excluded']), (7, 1))
            self.assertIn('basis: inferred', (out / 'feature-progress-view.md').read_text())
            if tool == 'bm':
                self.assertNotIn('- realizes [[capability-blockers]]', (out / 'feature-progress-view.md').read_text())

    def test_rename_delete_and_edge_replacement(self):
        for tool in ['bm', 'graphify']:
            project(self.source, self.root / tool, tool)
        (self.source / 'feature-progress-view.md').rename(self.source / 'renamed-feature.md')
        (self.source / 'decision-direct-first.md').unlink()
        self.change('decision-blocker-scope', lambda m: m['visu']['relations'][0].update(target='capability-blockers'))
        for tool in ['bm', 'graphify']:
            out = self.root / tool
            result = project(self.source, out, tool)
            self.assertEqual(result['documents_removed'], 1)
            self.assertFalse((out / 'decision-direct-first.md').exists())
            self.assertTrue((out / 'feature-progress-view.md').exists())
            if tool == 'graphify':
                graph = json.loads((out / 'graph.json').read_text())
                self.assertFalse(any(e['source'] == 'decision-direct-first' for e in graph['edges']))
                self.assertTrue(all((out / n['source_file']).exists() for n in graph['nodes']))

    def test_invalid_source_fails_before_changing_cache(self):
        out = self.root / 'graphify'
        project(self.source, out, 'graphify')
        before = (out / 'graph.json').read_bytes()
        (self.source / 'goal-returning-maintainer.md').unlink()
        with self.assertRaises(ValueError):
            project(self.source, out, 'graphify')
        self.assertEqual((out / 'graph.json').read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
