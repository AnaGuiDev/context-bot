/* Context Bot · panel. Los textos vienen de window.CB_I18N (inglés o español). Los datos se guardan solo en este navegador. */
(function(){
const T=window.CB_I18N;
const $=id=>document.getElementById(id);
const fmt=(s,o)=>s.replace(/\{(\w+)\}/g,(m,k)=>o[k]);
// Claves internas de color (verde/amarillo/rojo) se mantienen por compatibilidad con exportaciones anteriores.
const isDemo=new URLSearchParams(location.search).has('demo');
const KEY='context-bot:bots',RKEY='context-bot:rutinas',OLD='control-de-contexto:';
function read(k,old){try{const v=localStorage.getItem(k)??localStorage.getItem(old);return JSON.parse(v)||[]}catch(e){return []}}
let bots=read(KEY,OLD+'bots');
let rutinas=read(RKEY,OLD+'rutinas');
let save=()=>{localStorage.setItem(KEY,JSON.stringify(bots));render()};
let rsave=()=>{localStorage.setItem(RKEY,JSON.stringify(rutinas));renderR()};
const LABEL=T.label,ADVICE=T.advice,FREQ=T.freq;
function parseStatus(t){
  const m=t.match(/(?:sem[aá]foro|traffic[ _-]?light|light)\s*[:=]\s*(verde|amarillo|rojo|green|yellow|red)/i)||t.match(/(🟢|🟡|🔴)/u);
  if(!m)return null;const v=m[1].toLowerCase();
  return {'green':'verde','yellow':'amarillo','red':'rojo','🟢':'verde','🟡':'amarillo','🔴':'rojo'}[v]||v;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function stamp(){return new Date().toLocaleString(T.locale,{dateStyle:'short',timeStyle:'short'})}
const opt=(v,cur,txt)=>`<option value="${v}"${cur===v?' selected':''}>${txt}</option>`;
$('r-freq').innerHTML=Object.keys(FREQ).map(k=>opt(k,'varias',FREQ[k])).join('');
function render(){
  const order={rojo:0,amarillo:1,verde:2};const list=$('list');
  ['verde','amarillo','rojo'].forEach(c=>$('n-'+c).textContent=bots.filter(b=>b.color===c).length);
  $('onboarding').hidden=isDemo||bots.length>0;
  const aw=$('add-wrap');if(aw&&!bots.length)aw.open=true;
  if(!bots.length){list.innerHTML=`<div class="card empty muted" style="grid-column:1/-1">${T.emptyBots}</div>`;return}
  list.innerHTML=bots.map((b,i)=>({b,i})).sort((a,z)=>order[a.b.color]-order[z.b.color]).map(({b,i})=>`
  <article class="card bot">
    <div class="bot-top ${b.color}">
      <div class="light" role="img" aria-label="${fmt(T.lightAria,{c:LABEL[b.color]})}"><span class="lamp r"></span><span class="lamp y"></span><span class="lamp g"></span></div>
      <div><h2>${esc(b.name)}</h2>${b.purpose?`<div class="muted">${esc(b.purpose)}</div>`:''}<p class="advice"><strong>${LABEL[b.color]}:</strong> ${ADVICE[b.color]}</p><div class="muted" style="font-size:.82rem">${T.checked}: ${esc(b.updated)}</div></div>
    </div>
    <textarea data-i="${i}" class="st" placeholder="${T.statusPh}" aria-label="${fmt(T.statusAria,{n:esc(b.name)})}">${esc(b.status||'')}</textarea>
    <div class="row">
      <select data-i="${i}" class="col" aria-label="${T.color}">${opt('verde',b.color,'🟢 '+LABEL.verde)}${opt('amarillo',b.color,'🟡 '+LABEL.amarillo)}${opt('rojo',b.color,'🔴 '+LABEL.rojo)}</select>
      <button type="button" class="del" data-i="${i}" title="${T.remove}">🗑 ${T.remove}…</button>
    </div>
  </article>`).join('');
}
$('add').addEventListener('submit',e=>{e.preventDefault();const n=$('name').value.trim();if(!n)return;bots.push({name:n,purpose:$('purpose').value.trim(),color:'verde',status:'',updated:stamp()});e.target.reset();save()});
$('list').addEventListener('change',e=>{const i=+e.target.dataset.i;if(e.target.classList.contains('col')){bots[i].color=e.target.value;bots[i].updated=stamp();save()}});
$('list').addEventListener('input',e=>{if(!e.target.classList.contains('st'))return;const i=+e.target.dataset.i;bots[i].status=e.target.value;const c=parseStatus(e.target.value);bots[i].updated=stamp();if(!isDemo)try{localStorage.setItem(KEY,JSON.stringify(bots))}catch(x){}if(c&&c!==bots[i].color){bots[i].color=c;render()}});
$('list').addEventListener('click',e=>{if(e.target.classList.contains('del')){const i=+e.target.dataset.i;if(confirm(fmt(T.confirmBot,{n:bots[i].name}))){bots.splice(i,1);save()}}});
$('export').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({version:2,bots,rutinas},null,2)],{type:'application/json'}));a.download='context-bot.json';a.click()};
$('import').onclick=()=>{const t=prompt(T.importPrompt);if(!t)return;try{const raw=JSON.parse(t);const d=Array.isArray(raw)?raw:raw.bots;if(!Array.isArray(d))throw 0;bots=d.map(b=>({name:String(b.name||'Bot'),purpose:String(b.purpose||''),color:['verde','amarillo','rojo'].includes(b.color)?b.color:({green:'verde',yellow:'amarillo',red:'rojo'})[b.color]||'verde',status:String(b.status||''),updated:String(b.updated||stamp())}));const r=Array.isArray(raw)?null:(raw.rutinas||raw.routines);if(r)rutinas=cleanR(r);save();rsave()}catch(e){alert(T.importError)}};
function judge(r){
  if(r.need==='no')return ['rojo',T.judge.unneeded];
  if(r.freq==='minutos'||r.freq==='hora')return ['rojo',T.judge.often];
  if(r.freq==='varias')return ['amarillo',T.judge.several];
  if(r.freq==='evento')return ['amarillo',T.judge.event];
  return ['verde',T.judge.ok];
}
function renderR(){
  const el=$('rlist');const o={rojo:0,amarillo:1,verde:2};
  const js=rutinas.map((r,i)=>({r,i,j:judge(r)}));
  ['verde','amarillo','rojo'].forEach(c=>$('r-'+c).textContent=js.filter(x=>x.j[0]===c).length);
  if(!rutinas.length){el.innerHTML=`<div class="card empty muted" style="grid-column:1/-1">${T.emptyRoutines}</div>`;return}
  el.innerHTML=js.sort((a,z)=>o[a.j[0]]-o[z.j[0]]).map(({r,i,j})=>`
  <article class="card rt">
    <div class="head"><span class="tag" style="background:var(--${({verde:'g',amarillo:'y',rojo:'r'})[j[0]]})" role="img" aria-label="${LABEL[j[0]]}"></span><div><h3>${esc(r.name)}</h3><div class="muted" style="font-size:.9rem">${esc(r.bot||T.noBot)} · ${FREQ[r.freq]} · ${r.need==='si'?T.needYes:T.needNo}</div><p class="advice"><strong>${LABEL[j[0]]}:</strong> ${j[1]}</p></div></div>
    <div class="row">
      <select class="rf" data-i="${i}" aria-label="${fmt(T.freqAria,{n:esc(r.name)})}">${Object.keys(FREQ).map(k=>opt(k,r.freq,FREQ[k])).join('')}</select>
      <select class="rn" data-i="${i}" aria-label="${fmt(T.needAria,{n:esc(r.name)})}">${opt('si',r.need,T.needYes)}${opt('no',r.need,T.needNo)}</select>
      <button type="button" class="rdel" data-i="${i}" title="${T.remove}">🗑 ${T.remove}…</button>
    </div>
  </article>`).join('');
}
$('addr').addEventListener('submit',e=>{e.preventDefault();const n=$('r-name').value.trim();if(!n)return;rutinas.push({name:n,bot:$('r-bot').value.trim(),freq:$('r-freq').value,need:$('r-need').value});e.target.reset();$('r-freq').value='varias';rsave()});
$('rlist').addEventListener('change',e=>{const i=+e.target.dataset.i;if(e.target.classList.contains('rf'))rutinas[i].freq=e.target.value;else if(e.target.classList.contains('rn'))rutinas[i].need=e.target.value;else return;rsave()});
$('rlist').addEventListener('click',e=>{if(e.target.classList.contains('rdel')){const i=+e.target.dataset.i;if(confirm(fmt(T.confirmRoutine,{n:rutinas[i].name}))){rutinas.splice(i,1);rsave()}}});
function cleanR(a){return (Array.isArray(a)?a:[]).map(r=>({name:String(r.name||T.routine),bot:String(r.bot||''),freq:FREQ[r.freq]?r.freq:'varias',need:(r.need==='no'||r.need===false)?'no':'si'}))}
// Demo: ?demo carga ejemplos sin tocar tus datos guardados
if(isDemo){bots=structuredClone(T.demo.bots);rutinas=structuredClone(T.demo.routines);save=()=>render();rsave=()=>renderR();$('demo-notice').hidden=false;$('live').hidden=true}
$('first-bot').onclick=()=>{$('add-wrap').open=true;$('name').focus()};
render();renderR();

// ── Traspaso / Handoff ─────────────────────────────────────────────
const H=T.h,G=['memory','tasks','files','routines'],GC={memory:'m',tasks:'t',files:'f',routines:'r'},GI={memory:'🧠',tasks:'⏳',files:'📁',routines:'🔁'};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let hoSrc=null,hoRun=0;
function hoItems(b){const h=b.handoff||{};const o={};G.forEach(g=>o[g]=Array.isArray(h[g])?h[g].map(String).filter(Boolean):[]);
  if(!h.routines)o.routines=rutinas.filter(r=>r.bot&&r.bot===b.name).map(r=>r.name+' · '+FREQ[r.freq]);
  if(!b.handoff&&b.status){const m=b.status.match(/^(?:en_curso|in_progress|tarea|task)\s*:\s*(.+)$/gim);if(m)o.tasks=m.map(x=>x.split(':').slice(1).join(':').trim())}
  return o}
function chips(items,g,cls){return items.length?items.map((x,j)=>`<span class="chip ${GC[g]}${cls?' '+cls:''}" data-k="${g}-${j}"><span aria-hidden="true">${GI[g]}</span>${esc(x)}</span>`).join(''):`<span class="ho-ph">${H.empty}</span>`}
function groups(o,side){return G.map(g=>`<div class="grp"><h4>${GI[g]} ${H.groups[g]}${side==='new'?` <span class="cnt" data-g="${g}">0/${o[g].length}</span>`:''}</h4><div class="chips" data-g="${g}">${side==='old'?chips(o[g],g):''}</div></div>`).join('')}
function hoCands(){return bots.map((b,i)=>({b,i})).filter(x=>x.b.color!=='verde')}
function hoCurrent(){if(hoSrc)return hoSrc;const c=hoCands(),v=$('ho-pick').value;const x=c.find(x=>String(x.i)===v)||c[0];return x?{name:x.b.name,color:x.b.color,items:hoItems(x.b),i:x.i}:null}
function hoFill(){const c=hoCands(),cur=$('ho-pick').value;
  $('ho-pick').innerHTML=c.map(x=>`<option value="${x.i}"${String(x.i)===cur?' selected':''}>${x.b.color==='rojo'?'🔴':'🟡'} ${esc(x.b.name)}</option>`).join('')+(hoSrc?`<option value="p" selected>📥 ${H.pasted}</option>`:'');
  hoShow()}
function hoShow(){const s=hoCurrent();const has=!!s;$('ho').hidden=!has;$('ho-go').disabled=!has;$('ho-pick').disabled=!has;$('ho-none').hidden=has;$('ho-none').textContent=H.none;
  hoRun++;$('ho').classList.remove('run');$('ho-new').classList.remove('done');
  if(!s){$('ho-md').textContent='';return}
  $('ho-oldname').textContent=s.name;$('ho-oldlight').className='mini '+s.color;$('ho-newlight').className='mini';
  $('ho-oldgroups').innerHTML=groups(s.items,'old');$('ho-newgroups').innerHTML=groups(s.items,'new');$('ho-newstate').textContent=H.waiting;
  $('ho-edit').innerHTML=G.map(g=>`<label class="muted" style="font-size:.8rem">${GI[g]} ${H.groups[g]}<textarea data-g="${g}">${esc(s.items[g].join('\n'))}</textarea></label>`).join('');
  $('ho-go').textContent=H.create;$('ho-md').textContent=hoMd(s)}
function hoMd(s){const M=H.md,o=s.items,d=new Date(),pad=n=>String(n).padStart(2,'0');
  const date=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const li=a=>a.length?a.map(x=>'- '+x).join('\n'):'- —';
  return `# ${M.title}\n${M.from_}: ${s.name}\n${M.date}: ${date}\n\n${M.reviewed}\n${M.nosecrets}\n\n## ${M.memory}\n${li(o.memory)}\n\n## ${M.tasks}\n### ${M.tasks_sub}\n${li(o.tasks)}\n\n## ${M.files}\n${li(o.files)}\n\n## ${M.routines}\n${li(o.routines)}\n\n## ${M.next}\n${M.nextText}\n`}
function hoParse(t){const o={memory:[],tasks:[],files:[],routines:[]};let g=null,name='';
  t.split(/\r?\n/).forEach(l=>{const h=l.match(/^##\s+(.+)/);
    if(h&&!/^###/.test(l)){const x=h[1].toLowerCase();g=/memor/.test(x)?'memory':/archiv|file|ruta|path/.test(x)?'files':/rutin|routine/.test(x)?'routines':/estado|status|curso|progress|tarea|task|pendiente|pending/.test(x)?'tasks':null;return}
    const n=l.match(/^(?:bot_origen|from_bot)\s*:\s*(.+)/i);if(n){name=n[1].trim();return}
    if(!g)return;const b=l.match(/^\s*[-*]\s+(.+)/);if(b&&b[1].trim()!=='—'){o[g].push(b[1].trim());return}
    const r=l.match(/^\|(.+)\|\s*$/);if(r&&g==='routines'&&!/^[\s|:-]+$/.test(r[1])){const c=r[1].split('|').map(x=>x.trim());if(!/^(nombre|name)$/i.test(c[0]))o[g].push(c.slice(0,2).filter(Boolean).join(' · '))}});
  return G.some(k=>o[k].length)?{name:name||H.pasted,color:'rojo',items:o}:null}
function hoGo(){const s=hoCurrent();if(!s)return;hoShow();const run=hoRun,all=[];
  G.forEach(g=>s.items[g].forEach((x,j)=>all.push({g,x,j})));
  const box=$('ho'),nw=$('ho-new'),done=()=>{if(run!==hoRun)return;box.classList.remove('run');nw.classList.add('done');$('ho-newlight').className='mini verde';$('ho-oldlight').className='mini verde';$('ho-newstate').textContent='✅ '+H.ready;$('ho-live').textContent=fmt(H.done,{n:all.length});$('ho-go').textContent=H.again};
  const land=({g,x,j})=>{const c=document.querySelector(`#ho-newgroups .chips[data-g="${g}"]`);c.insertAdjacentHTML('beforeend',`<span class="chip ${GC[g]}"><span class="ok" aria-hidden="true">✓</span>${esc(x)}</span>`);const k=document.querySelector(`#ho-newgroups .cnt[data-g="${g}"]`);k.textContent=c.children.length+'/'+s.items[g].length;const o=document.querySelector(`#ho-oldgroups [data-k="${g}-${j}"]`);if(o)o.classList.add('sent')};
  if(RM()||!all.length){all.forEach(land);done();return}
  box.classList.add('run');$('ho-live').textContent=fmt(H.moving,{n:all.length});
  all.forEach((it,n)=>setTimeout(()=>{if(run!==hoRun)return;const src=document.querySelector(`#ho-oldgroups [data-k="${it.g}-${it.j}"]`),dst=document.querySelector(`#ho-newgroups .chips[data-g="${it.g}"]`);
    const a=src.getBoundingClientRect(),z=dst.getBoundingClientRect(),f=src.cloneNode(true);f.classList.add('fly');Object.assign(f.style,{left:a.left+'px',top:a.top+'px',width:a.width+'px',margin:0});document.body.appendChild(f);src.classList.add('sent');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transform=`translate(${z.left-a.left+8}px,${z.top-a.top+4}px) scale(.9)`;f.style.opacity='.2'}));
    setTimeout(()=>{f.remove();if(run===hoRun)land(it);if(n===all.length-1)setTimeout(done,350)},720)},n*260))}
$('ho-pick').addEventListener('change',()=>{if($('ho-pick').value!=='p')hoSrc=null;hoFill()});
$('ho-go').onclick=hoGo;
$('ho-edit').addEventListener('input',e=>{const g=e.target.dataset.g;if(!g)return;const s=hoCurrent();s.items[g]=e.target.value.split('\n').map(x=>x.trim()).filter(Boolean);
  if(!hoSrc&&s.i!=null){bots[s.i].handoff=s.items;if(!isDemo)try{localStorage.setItem(KEY,JSON.stringify(bots))}catch(x){}}
  hoSrc=hoSrc&&{...hoSrc,items:s.items};$('ho-oldgroups').innerHTML=groups(s.items,'old');$('ho-newgroups').innerHTML=groups(s.items,'new');$('ho-md').textContent=hoMd(s);$('ho-new').classList.remove('done')});
$('ho-copy').onclick=async()=>{try{await navigator.clipboard.writeText($('ho-md').textContent)}catch(e){const r=document.createRange();r.selectNodeContents($('ho-md'));getSelection().removeAllRanges();getSelection().addRange(r);document.execCommand('copy')}$('ho-copy').textContent=H.copied;setTimeout(()=>$('ho-copy').textContent=H.copy,1600)};
$('ho-dl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([$('ho-md').textContent],{type:'text/markdown'}));a.download='TRASPASO.md';a.click()};
$('ho-show').onclick=()=>{const p=hoParse($('ho-paste').value);if(!p){alert(H.parseError);return}hoSrc=p;hoFill();$('handoff').scrollIntoView({behavior:RM()?'auto':'smooth'});setTimeout(hoGo,RM()?0:400)};
$('list').addEventListener('click',e=>{const b=e.target.closest('.ho-btn');if(!b)return;hoSrc=null;$('ho-pick').value=b.dataset.i;hoFill();$('handoff').scrollIntoView({behavior:RM()?'auto':'smooth'});setTimeout(hoGo,RM()?0:500)});
const _render=render;render=function(){_render();
  document.querySelectorAll('#list .del').forEach(d=>{const i=+d.dataset.i;if(bots[i]&&bots[i].color!=='verde')d.parentNode.querySelector('.col').insertAdjacentHTML('afterend',`<button type="button" class="ho-btn" data-i="${i}">🤝 ${H.btn}</button>`)});
  hoFill()};
render();
// Gancho para live.js (estado en directo opcional)
window.CB={get bots(){return bots},save:()=>save(),stamp};
})();
