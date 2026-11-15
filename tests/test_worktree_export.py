import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path
from scripts.export_worktrees import collect


class WorktreeExportTests(unittest.TestCase):
    def test_main_is_committed_baseline_and_working_tree_stays_distinct(self):
        fixtures = Path(__file__).resolve().parents[1] / 'docs/examples/business-context'
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp) / 'repo'
            repo.mkdir()
            def git(*args):
                subprocess.run(['git', '-C', str(repo), *args], check=True, capture_output=True)
            git('init', '-b', 'main')
            git('config', 'user.name', 'Workflow test')
            git('config', 'user.email', 'workflow@example.invalid')
            shutil.copytree(fixtures / 'baseline-a', repo / 'records')
            git('add', 'records')
            git('commit', '-m', 'baseline')
            branch = Path(temp) / 'feature'
            git('worktree', 'add', '-b', 'feature', str(branch))
            shutil.copytree(fixtures / 'baseline-b', branch / 'records', dirs_exist_ok=True)
            bundle = collect(repo, 'records', 'cafe-trial')
            self.assertEqual(len(bundle['main']['snapshot']['records']), 6)
            feature = next(w for w in bundle['worktrees'] if w['branch'] == 'feature')
            self.assertEqual(len(feature['snapshot']['records']), 8)
            self.assertTrue(feature['dirty'])
            self.assertFalse(feature['integrated'])
            self.assertFalse(bundle['omitted'])
            with self.assertRaises(ValueError):
                collect(repo, '../records', 'cafe-trial')
            # Invalid branch records are explicitly omitted, never used as main.
            (branch / 'records/delivery.md').write_text('invalid', encoding='utf8')
            result = collect(repo, 'records', 'cafe-trial')
            self.assertTrue(any('feature' in entry for entry in result['omitted']))


if __name__ == '__main__':
    unittest.main()
