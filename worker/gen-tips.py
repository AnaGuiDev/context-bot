#!/usr/bin/env python3
"""Genera worker/src/tips.json a partir de docs/en/tips.md y docs/tips-ahorro.md.
Ejecútalo cuando cambien los trucos: python3 worker/scripts-gen-tips.py"""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def parse(path):
    tips, cur = [], None
    for line in open(os.path.join(ROOT, path), encoding="utf-8"):
        m = re.match(r"### \d+\. (.+)", line)
        if m:
            cur = {"title": m.group(1).strip(), "text": "", "sources": []}; tips.append(cur); continue
        if cur is None or line.startswith("## "):
            cur = None if line.startswith("## ") else cur; continue
        if line.startswith("*"):
            cur["sources"] += re.findall(r"\((https?://[^)]+)\)", line)
        elif line.strip() and not cur["text"]:
            cur["text"] = re.sub(r"\*\*(.+?)\*\*", r"\1", line.strip())
    return tips
json.dump({"en": parse("docs/en/tips.md"), "es": parse("docs/tips-ahorro.md")},
          open(os.path.join(ROOT, "worker", "src", "tips.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
