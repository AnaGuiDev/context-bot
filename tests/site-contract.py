"""Check the generated site's publication contract. Run after build-site.sh."""
from pathlib import Path
from html.parser import HTMLParser
import unittest
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  for k,v in attrs:
   if k=='id':self.ids.append(v)
class SiteContract(unittest.TestCase):
 def test_skills_are_published_verbatim(self):
  for src,dest in [('skills/context-bot/SKILL.md','dist/es/skill.md'),('skills/context-bot/en/SKILL.md','dist/skill.md')]:
   self.assertEqual((ROOT/src).read_bytes(),(ROOT/dest).read_bytes())
 def test_unique_ids_and_resolved_templates(self):
  for p in (ROOT/'dist').rglob('*.html'):
   text=p.read_text();ids=Page(text).ids
   self.assertEqual(len(ids),len(set(ids)),str(p))
   self.assertNotIn('{{',text,str(p))
 def test_recurring_reports_precede_rules(self):
  for path,heading,rules in [('skills/context-bot/SKILL.md','## Informes recurrentes / modo solo consulta','**Reglas del modo ahorro**'),('skills/context-bot/en/SKILL.md','## Recurring reports / read-only mode','**Savings mode rules**')]:
   text=(ROOT/path).read_text();self.assertEqual(text.count(heading),1);self.assertLess(text.index(heading),text.index(rules));self.assertTrue(text.startswith('---\nname: context-bot\n'))
if __name__=='__main__':unittest.main()
