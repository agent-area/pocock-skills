import io
import os
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

from habits.cli import main


class CliTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.env = mock.patch.dict(os.environ, {
            "HABITS_FILE": str(Path(self.tmp.name) / "habits.json"),
            "HABITS_TODAY": "2026-03-18",
        })
        self.env.start()

    def tearDown(self):
        self.env.stop()
        self.tmp.cleanup()

    def run_cli(self, *args):
        out = io.StringIO()
        with redirect_stdout(out):
            code = main(list(args))
        return code, out.getvalue()

    def test_add_then_done_then_list(self):
        self.run_cli("add", "stretch")
        code, out = self.run_cli("done", "stretch")
        self.assertEqual(code, 0)
        self.assertIn("Streak: 1", out)
        _, listing = self.run_cli("list")
        self.assertIn("stretch", listing)
        self.assertIn("1 day", listing)

    def test_export_csv(self):
        self.run_cli("add", "read")
        self.run_cli("done", "read")
        _, out = self.run_cli("export")
        self.assertEqual(out.splitlines(), ["habit,frequency,date", "read,daily,2026-03-18"])


if __name__ == "__main__":
    unittest.main()
