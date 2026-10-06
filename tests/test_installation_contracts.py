import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INSTALLATION = ROOT / "02_setup" / "2.2_installation.md"


class InstallationContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = INSTALLATION.read_text(encoding="utf-8")

    def test_posix_diagnostics_cover_runtime_prefix_path_and_doctor(self):
        required = (
            "node --version",
            "npm prefix -g",
            "command -v openclaw",
            'printf \'%s\\n\' "$PATH"',
            'export PATH="$(npm prefix -g)/bin:$PATH"',
            "openclaw doctor",
            "openclaw gateway status",
            "đóng và mở lại cửa sổ Terminal",
            "https://docs.openclaw.ai/install/node",
        )
        for marker in required:
            with self.subTest(marker=marker):
                self.assertIn(marker, self.text)

        self.assertIn("Node 24.16+ hoặc 26.1+", self.text)
        self.assertIn("Node 22, 23, 25 không còn được hỗ trợ", self.text)
        self.assertNotIn("22.22.3", self.text)
        self.assertIn("`<npm-prefix>/bin`", self.text)

    def test_powershell_diagnostics_use_the_windows_global_prefix(self):
        required = (
            "Get-Command openclaw -ErrorAction SilentlyContinue",
            "$env:Path -split ';'",
            "$npmPrefix = npm prefix -g",
            "$env:Path -split ';' -contains $npmPrefix",
            "openclaw gateway status --json",
            "Windows thêm trực tiếp `<npm-prefix>` vào biến PATH",
            "mở lại Windows Terminal hoặc PowerShell",
        )
        for marker in required:
            with self.subTest(marker=marker):
                self.assertIn(marker, self.text)

    def test_windows_hub_and_wsl_commands_are_routed_to_the_chosen_environment(self):
        required = (
            "Windows Hub",
            "OpenClawGateway",
            "không can thiệp vào bản Ubuntu hiện có của bạn",
            "wsl --list --verbose",
            "wsl -d <DistroName> -- openclaw doctor",
            "wsl -d <DistroName> -- openclaw gateway status",
            "https://docs.openclaw.ai/platforms/windows",
            "https://learn.microsoft.com/windows/wsl/networking",
        )
        for marker in required:
            with self.subTest(marker=marker):
                self.assertIn(marker, self.text)


if __name__ == "__main__":
    unittest.main()
