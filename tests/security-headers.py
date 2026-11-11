"""Check generated CSP against every inline script in the final HTML."""
import base64, hashlib, re
from pathlib import Path
headers=Path('dist/_headers').read_text()
for p in Path('dist').rglob('*.html'):
    path='/' + str(p.relative_to('dist'))
    match=re.search(r'^'+re.escape(path)+r'\n  Content-Security-Policy: (.+)$',headers,re.M)
    assert match, path
    policy=match[1]
    script=policy.split('script-src ',1)[1].split(';',1)[0]
    assert "'unsafe-inline'" not in script and "'unsafe-eval'" not in script
    for code in re.findall(r'<script\b[^>]*>(.*?)</script>',p.read_text(),re.S|re.I):
        if code: assert "'sha256-"+base64.b64encode(hashlib.sha256(code.encode()).digest()).decode()+"'" in script,path
    assert ('https://mcp.contextbot.app' in policy)==('dashboard' in path)
print('CSP: all generated pages and inline scripts verified')
