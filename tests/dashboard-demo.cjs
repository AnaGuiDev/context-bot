// Run the actual dashboard handlers against a minimal DOM/storage adapter.
// No network, browser automation, packages or user data.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const translations=JSON.parse(execFileSync('python3',['-c','import json; from src.i18n import EN, ES; print(json.dumps([EN["DASH"], ES["DASH"]]))'],{encoding:'utf8'}));
for(const T of translations)for(const demo of [true,false])test(`${T.locale}: edits ${demo?'do not overwrite':'persist to'} local data`,()=>{
 const elements=new Map(),writes=[];
 function el(id){if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',hidden:false,classList:{add(){},remove(){}},handlers:{},addEventListener(t,f){(this.handlers[t]??=[]).push(f)}});return elements.get(id)}
 const original=[{name:'Saved bot',color:'amarillo',status:'original',updated:'test'}];
 const saved=new Map([['context-bot:bots',JSON.stringify(original)]]);
 const sandbox={window:{CB_I18N:T},document:{getElementById:el,querySelectorAll:()=>[]},location:{search:demo?'?demo':''},URLSearchParams,structuredClone,localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>{writes.push(k);saved.set(k,v)}},console};
 vm.runInNewContext(fs.readFileSync('src/js/dashboard.js','utf8'),sandbox);
 const fire=(id,type,target)=>el(id).handlers[type].forEach(f=>f({target}));
 fire('list','input',{dataset:{i:'0'},value:'light: yellow\nEdited status',classList:{contains:n=>n==='st'}});
 fire('ho-edit','input',{dataset:{g:'memory'},value:'Edited handoff'});
 assert.equal(sandbox.window.CB.bots[0].status,'light: yellow\nEdited status');
 if(demo){assert.deepEqual(writes,[]);assert.deepEqual(JSON.parse(saved.get('context-bot:bots')),original);assert.equal(el('live').hidden,true)}
 else {assert.equal(writes.length,2);assert.equal(JSON.parse(saved.get('context-bot:bots'))[0].handoff.memory[0],'Edited handoff')}
});
