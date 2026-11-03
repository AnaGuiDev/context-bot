/* Context Bot · estado en directo (opcional). OAuth 2.1 + PKCE como cliente público contra el conector.
   Sin conexión o con error, el panel sigue funcionando con los datos locales. */
(function(){
const T=window.CB_I18N.live,CB=window.CB,$=id=>document.getElementById(id);
if(!T||!CB||!$('live'))return;
const fmt=(s,o)=>s.replace(/\{(\w+)\}/g,(m,k)=>o[k]);
const DEF='https://mcp.contextbot.app';
const okBase=u=>{try{const x=new URL(u);return x.protocol==='https:'||(x.protocol==='http:'&&/^(localhost|127\.0\.0\.1)$/.test(x.hostname))}catch(e){return false}};
const qs=new URLSearchParams(location.search);
if(qs.get('live')&&okBase(qs.get('live')))localStorage.setItem('cb-live-base',qs.get('live').replace(/\/$/,''));
const BASE=(()=>{const b=localStorage.getItem('cb-live-base');return b&&okBase(b)?b:DEF})();
const RES=BASE+'/mcp',REDIRECT=location.origin+location.pathname;
const DEMO=location.search.includes('demo');
const get=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
const set=(k,v)=>v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v));
const msg=t=>{$('live-msg').textContent=t};
const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const rnd=()=>b64(crypto.getRandomValues(new Uint8Array(32)));
let tok=get('cb-live');if(tok&&tok.base!==BASE)tok=null;

async function meta(){return fetch(BASE+'/.well-known/oauth-authorization-server').then(r=>{if(!r.ok)throw 0;return r.json()})}
async function client(m){
  const c=get('cb-live-client');if(c&&c.base===BASE&&c.redirect===REDIRECT)return c.id;
  const r=await fetch(m.registration_endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_name:'Context Bot dashboard',redirect_uris:[REDIRECT],token_endpoint_auth_method:'none',grant_types:['authorization_code','refresh_token']})}).then(r=>r.json());
  if(!r.client_id)throw 0;set('cb-live-client',{base:BASE,redirect:REDIRECT,id:r.client_id});return r.client_id;
}
async function connect(){
  msg(T.loading);
  try{const m=await meta(),id=await client(m),v=rnd(),st=rnd();
    const ch=b64(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)));
    sessionStorage.setItem('cb-live-pkce',JSON.stringify({v,st,base:BASE}));
    const u=new URL(m.authorization_endpoint);
    Object.entries({response_type:'code',client_id:id,redirect_uri:REDIRECT,state:st,code_challenge:ch,code_challenge_method:'S256',scope:'status',resource:RES}).forEach(([k,x])=>u.searchParams.set(k,x));
    location.assign(u.toString());
  }catch(e){msg(T.fail)}
}
async function tokenReq(body){
  const m=await meta();
  const r=await fetch(m.token_endpoint,{method:'POST',body:new URLSearchParams({...body,resource:RES})});
  const j=await r.json();if(!j.access_token)throw 0;
  tok={base:BASE,access:j.access_token,refresh:j.refresh_token||tok&&tok.refresh,exp:Date.now()+(j.expires_in||3600)*1000};set('cb-live',tok);
}
async function finishLogin(){
  const code=qs.get('code'),st=qs.get('state'),p=JSON.parse(sessionStorage.getItem('cb-live-pkce')||'null');
  if(!code||!p||p.st!==st||p.base!==BASE)return false;
  sessionStorage.removeItem('cb-live-pkce');
  history.replaceState(null,'',REDIRECT+location.hash);
  const c=get('cb-live-client');
  await tokenReq({grant_type:'authorization_code',code,redirect_uri:REDIRECT,client_id:c.id,code_verifier:p.v});
  return true;
}
async function api(path,opt={}){
  if(tok.exp<Date.now()+30000&&tok.refresh){try{await tokenReq({grant_type:'refresh_token',refresh_token:tok.refresh,client_id:get('cb-live-client').id})}catch(e){}}
  let r=await fetch(BASE+path,{...opt,headers:{Authorization:'Bearer '+tok.access}});
  if(r.status===401&&tok.refresh){try{await tokenReq({grant_type:'refresh_token',refresh_token:tok.refresh,client_id:get('cb-live-client').id});r=await fetch(BASE+path,{...opt,headers:{Authorization:'Bearer '+tok.access}})}catch(e){}}
  if(r.status===401){disconnect(true);throw 'expired'}
  if(!r.ok)throw 0;return r.json();
}
const COL={green:'verde',yellow:'amarillo',red:'rojo'};
function describe(s){const p=['📡 '+T.from_];
  if(s.turns!=null)p.push(fmt(T.turns,{n:s.turns}));if(s.usage_share!=null)p.push(fmt(T.share,{n:Math.round(s.usage_share*100)}));
  if(s.routines_per_day!=null)p.push(fmt(T.routines,{n:s.routines_per_day}));if(s.compacted)p.push(T.compacted);if(s.note)p.push('“'+s.note+'”');
  return 'light: '+s.colour+'\n'+p.join(' · ')+'\n('+T.note+')'}
async function pull(){
  if(!tok||DEMO)return;
  try{const j=await api('/mcp/api/statuses');const bots=CB.bots;
    j.bots.forEach(s=>{let b=bots.find(x=>x.name.toLowerCase()===s.bot_name.toLowerCase());
      if(!b){b={name:s.bot_name,purpose:'',color:'verde',status:'',updated:''};bots.push(b)}
      b.color=COL[s.colour]||b.color;b.status=describe(s);b.live=true;b.updated=new Date(s.updated_at).toLocaleString(window.CB_I18N.locale,{dateStyle:'short',timeStyle:'short'})});
    CB.save();msg(j.bots.length?fmt(T.on,{t:CB.stamp()}):T.none);
  }catch(e){msg(e==='expired'?T.expired:T.fail)}
  ui();
}
function disconnect(quiet){
  if(tok&&tok.refresh&&!quiet)meta().then(m=>fetch(m.revocation_endpoint||m.token_endpoint,{method:'POST',body:new URLSearchParams({token:tok.refresh,client_id:(get('cb-live-client')||{}).id||''})})).catch(()=>{});
  tok=null;set('cb-live',null);if(!quiet)msg(window.CB_I18N.live.off||'');ui();
}
async function del(){if(!confirm(T.confirmDel))return;try{await api('/mcp/api/me',{method:'DELETE'});tok=null;set('cb-live',null);msg(T.deleted)}catch(e){msg(T.fail)}ui()}
function ui(){const on=!!tok;$('live-go').textContent=on?T.disconnect:T.connect;$('live-ref').hidden=!on;$('live-del').hidden=!on}
$('live-go').onclick=()=>tok?disconnect():connect();
$('live-ref').onclick=pull;$('live-del').onclick=del;
T.off=$('live-msg').textContent;
ui();
if(DEMO)return;
(async()=>{try{if(await finishLogin())ui()}catch(e){msg(T.fail)}
  if(tok){msg(T.loading);pull();setInterval(()=>{if(!document.hidden)pull()},60000)}})();
})();
