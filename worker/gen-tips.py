#!/usr/bin/env python3
"""Generate worker/src/tips.json from the ES/EN docs; use --check in CI."""
import argparse
import json
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def parse(path):
    tips, cur = [], None
    for line in (ROOT / path).read_text().splitlines():
        m = re.match(r"### \d+\. (.+)", line)
        if m:
            cur = {"title": m.group(1).strip(), "text": "", "sources": []}
            tips.append(cur)
            continue
        if line.startswith("## "):
            cur = None
        if cur is None:
            continue
        if line.startswith("*"):
            cur["sources"] += re.findall(r"\((https?://[^)]+)\)", line)
        elif line.strip():
            paragraph = re.sub(r"\*\*(.+?)\*\*", r"\1", line.strip())
            cur["text"] += ("\n\n" if cur["text"] else "") + paragraph
    return tips

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    target = ROOT / "worker/src/tips.json"
    output = json.dumps({"en": parse("docs/en/tips.md"), "es": parse("docs/tips-ahorro.md")}, ensure_ascii=False, indent=1) + "\n"
    if args.check:
        if target.read_text() != output:
            raise SystemExit("tips.json is stale. Run python3 worker/gen-tips.py")
        print("Tips ES/EN match the documentation")
    else:
        target.write_text(output)
