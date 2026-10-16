"""Check the counts typed in README.md and the package description against
the live SDK spec (https://api.asterwise.com/openapi-sdk.json).

The README's "What you can build" table summed to 121 for weeks after the
API reached 129 endpoints, and its footnote named 13 API classes where the
Python SDK has 15 (found 2026-10-16). This runs in CI so the numbers cannot
drift again.

Counting rule (the same as the website, docs and platform stats): an
endpoint is an operation that is neither deprecated nor an x-method-twin
(a GET that repeats a POST with query parameters). SDK methods cover every
operation, deprecated forms and GET twins included.

Usage: python3 scripts/check_readme_counts.py [--spec path-or-url]
Standard library only; the same file runs in asterwise-python and
asterwise-typescript.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC_URL = "https://api.asterwise.com/openapi-sdk.json"
METHODS = ("get", "post", "put", "patch", "delete")

# README table rows, in order, and how an endpoint path falls into them.
ROWS = [
    "Vedic astrology",
    "Matchmaking",
    "Western astrology",
    "Horoscope",
    "Numerology",
    "KP + Lal Kitab",
    "Tarot",
    "Crystals & dreams",
    "Utilities",
]


def domain(path: str, op: dict) -> str | None:
    sub = op.get("x-subcategory")
    if path.startswith("/v1/horoscope/") or path.startswith("/v1/western/horoscope/"):
        return "Horoscope"
    if path.startswith("/v1/astro/"):
        if sub == "Matchmaking":
            return "Matchmaking"
        if sub in ("KP System", "Lal Kitab"):
            return "KP + Lal Kitab"
        return "Vedic astrology"
    for prefix, name in (
        ("/v1/western/", "Western astrology"),
        ("/v1/numerology/", "Numerology"),
        ("/v1/tarot/", "Tarot"),
        ("/v1/crystals", "Crystals & dreams"),  # /v1/crystals lists them all
        ("/v1/dreams/", "Crystals & dreams"),
        ("/v1/utils/", "Utilities"),
    ):
        if path.startswith(prefix):
            return name
    return None


def load_spec(source: str) -> dict:
    if source.startswith("http"):
        req = urllib.request.Request(source, headers={"User-Agent": "asterwise-sdk-readme-check/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    return json.loads(Path(source).read_text(encoding="utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--spec", default=SPEC_URL)
    spec = load_spec(parser.parse_args().spec)

    ops = [
        (path, op)
        for path, item in spec["paths"].items()
        for method, op in item.items()
        if method in METHODS and isinstance(op, dict)
    ]
    deprecated = sum(1 for _, op in ops if op.get("deprecated"))
    twins = sum(1 for _, op in ops if op.get("x-method-twin") and not op.get("deprecated"))
    counted = [(p, op) for p, op in ops if not op.get("deprecated") and not op.get("x-method-twin")]
    unmapped = sorted({p for p, op in counted if domain(p, op) is None})
    if unmapped:
        print("check_readme_counts: no README row for:\n  " + "\n  ".join(unmapped), file=sys.stderr)
        return 1
    by_row = Counter(domain(p, op) for p, op in counted)
    total = len(counted)

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    problems: list[str] = []

    table = dict(re.findall(r"^\| ([^|]+?) \| (\d+) \|$", readme, re.M))
    expected = {row: str(by_row.get(row, 0)) for row in ROWS}
    if table != expected:
        problems.append(f"README table {table} should be {expected}")
    if "| Domain | Endpoints |" not in readme:
        problems.append('README table header should be "| Domain | Endpoints |"')

    python = (ROOT / "pyproject.toml").is_file()
    if python:
        classes = sum(
            len(re.findall(r"^class \w+Api\b", f.read_text(encoding="utf-8"), re.M))
            for f in (ROOT / "asterwise" / "api").glob("*_api.py")
        )
        unit = f"{len(ops)} typed SDK methods across {classes} API classes"
        meta = (ROOT / "pyproject.toml").read_text(encoding="utf-8")
    else:
        unit = f"{len(ops)} typed SDK functions"
        meta = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))["description"]
    footnote = (
        f"*{unit} covering **{total} REST endpoints** ({deprecated} endpoints keep a deprecated GET "
        f"method next to the POST one; {twins} endpoints also answer on GET with the same fields as "
        f"query parameters).*"
    )
    if footnote not in readme:
        problems.append(f"README footnote should read:\n    {footnote}")

    for where, text in (("README.md", readme), ("package description", meta)):
        typed = {int(n) for n in re.findall(r"\b(\d{2,3}) endpoints?\b", text)}
        if typed - {total, deprecated, twins}:
            problems.append(f"{where} says {sorted(typed)} endpoints; the API has {total}")

    if problems:
        print("check_readme_counts:\n- " + "\n- ".join(problems), file=sys.stderr)
        return 1
    print(f"check_readme_counts: {total} endpoints, {len(ops)} operations, README and package description match")
    return 0


if __name__ == "__main__":
    sys.exit(main())
