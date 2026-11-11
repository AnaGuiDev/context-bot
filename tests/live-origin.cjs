const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('src/js/live.js','utf8');
function run(value,saved){
 const storage=new Map(saved?[['cb-live-base',saved]]:[]),els=new Map();
 const el=id=>{if(!els.has(id))els.set(id,{textContent:'',hidden:false});return els.get(id)};
 const ctx={URL,URLSearchParams,window:{CB_I18N:{live:{}},CB:{}},document:{getElementById:el},location:{search:value?'?live='+encodeURIComponent(value):'',origin:'https://contextbot.app',pathname:'/dashboard/'},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},sessionStorage:{getItem:()=>null},console};
 vm.runInNewContext(source,ctx);return storage.get('cb-live-base');
}
for(const value of ['https://evil.example','https://mcp.contextbot.app.evil.example','https://mcp.contextbot.app/path','https://user:pass@mcp.contextbot.app','https://mcp.contextbot.app?x=1','https://mcp.contextbot.app/#x','http://192.168.1.1','https://mcp.contextbot.app:8443'])test('reject URL and stored base: '+value,()=>{assert.equal(run(value),undefined);assert.equal(run('',value),undefined)});
for(const value of ['https://mcp.contextbot.app/','http://localhost:8787','http://127.0.0.1:8787/'])test('accept base: '+value,()=>assert.equal(run(value),new URL(value).origin));
