(function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(hover: none), (pointer: coarse)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const easeOut=t=>1-Math.pow(1-t,3);

/* ================= DATA ================= */
const CAPS=[
 {g:'✳',t:'Agentic AI & LLMs',d:['LangChain','LangGraph','Multi-Agent','Tool Calling','Prompt Design','Gemini API']},
 {g:'⌕',t:'RAG & Retrieval',d:['FAISS','HF Embeddings','Chunking','Semantic Search','Doc QA']},
 {g:'◉',t:'Voice AI',d:['Vapi Agents','STT / TTS','Bilingual EN / AR','Booking Flows']},
 {g:'◎',t:'Deep Learning & Vision',d:['TensorFlow','CNN Ensembles','Grad-CAM','Classification','Augmentation']},
 {g:'∿',t:'NLP',d:['Text Processing','Embeddings','Context Grounding','Answer Synthesis']},
 {g:'⚒',t:'Backend & APIs',d:['FastAPI','Django','React','Pydantic','SQLAlchemy','REST']},
 {g:'▣',t:'Data & ML',d:['Python','Scikit-learn','Pandas','SQL','C++','JavaScript']},
 {g:'⬢',t:'DevOps & Demos',d:['Docker','Compose','PostgreSQL','Gradio','Streamlit','Git']},
];
const PROJECTS=[
 {cat:'agentic',catL:'Agentic AI · Full-Stack',title:'AI Property Assistant <em>KPK</em>',
  blurb:'An agentic property finder that understands natural language and recommends real estate across Khyber Pakhtunkhwa.',
  tags:['LangGraph','LangChain','RAG','Gemini','FastAPI','React','Docker'],
  pts:['Built an AI-powered assistant that helps users discover properties through a natural-language, agentic workflow.',
       'Interprets requirements, retrieves relevant listings, and generates context-aware recommendations with LLM reasoning.',
       'Shipped a full-stack interface connecting the agentic backend with the discovery workflow.',
       'Containerized with separate Dockerfiles; Docker Compose orchestrates React, FastAPI and PostgreSQL services.']},
 {cat:'agentic',catL:'Agentic AI · Fintech',title:'Wealth<em>Op</em>AI',
  blurb:'A wealth & financial intelligence platform where specialized agents turn goals into actionable investment insight.',
  tags:['LangGraph','LLMs','RAG','FastAPI','PostgreSQL','Docker'],
  pts:['Analyzes financial data and user goals, orchestrating specialized agents via LangGraph.',
       'Combines LLM reasoning, RAG and function calling to produce actionable wealth & investment insights.',
       'FastAPI + PostgreSQL backend with a modular, scalable architecture for persistent management.',
       'Containerized with Docker & Docker Compose for clean multi-service deployment.']},
 {cat:'voice',catL:'Voice AI',title:'Sofia — Bilingual <em>Voice</em> Receptionist',
  blurb:'A voice agent that books, reschedules and cancels appointments — fluently, in English and Arabic.',
  tags:['Vapi','Tool Calling','FastAPI','SQLAlchemy','SQLite','Pydantic'],
  pts:['Handles appointment booking, rescheduling and cancellation in two languages using Vapi tool calling.',
       'FastAPI + SQLite backend with REST endpoints and strict Pydantic validation.',
       'Exercised end-to-end via Swagger UI and a Streamlit test surface.']},
 {cat:'agentic',catL:'Agentic AI',title:'Multi-Research <em>Assistant</em>',
  blurb:'Complex questions in — a LangGraph crew of parallel researchers investigates, synthesizes and answers.',
  tags:['LangGraph','LangChain','Gemini','Web Search','RAG'],
  pts:['Decomposes complex queries into research tasks and coordinates specialized agents in parallel.',
       'LangGraph workflow for query planning, parallel research, synthesis and final answer generation.',
       'Tool calling + LLM reasoning dynamically decide research steps for structured, grounded responses.']},
 {cat:'vision',catL:'ML & Vision · Thesis',title:'Skin Cancer <em>Detection</em>',
  blurb:'Undergraduate thesis — a dual-stage deep ensemble that classifies skin lesions and explains itself.',
  tags:['TensorFlow','Computer Vision','Ensembles','Grad-CAM','Streamlit'],
  pts:['Dual-stage ensemble of ResNet50, EfficientNet-B0, MobileNetV2, ConvNeXt-Tiny and Swin-Tiny on ISIC 2019.',
       'Image preprocessing, data augmentation and Grad-CAM explainability throughout the pipeline.',
       'Deployed as an interactive Streamlit demo for hands-on model inspection.']},
 {cat:'rag',catL:'RAG',title:'Multi-PDF <em>RAG</em> Bot',
  blurb:'Drop in a stack of PDFs, ask anything — answers grounded in retrieved document context.',
  tags:['LangChain','FAISS','HF Embeddings','Gemini','PyPDF'],
  pts:['Ingests multiple PDFs and answers questions using retrieved document context.',
       'Adaptive chunking, vector embeddings and FAISS similarity search under the hood.',
       'Gemini-based generation grounds answers and cuts hallucination.']},
 {cat:'agentic',catL:'Agentic AI',title:'Function-Calling <em>Chatbot</em>',
  blurb:'A Gemini chatbot that doesn’t just talk — it routes intent to real backend actions.',
  tags:['Gemini API','Tool Calling','Gradio','Python'],
  pts:['Extended a Gemini chatbot with function/tool calling plus a routing layer.',
       'The model selects and invokes the right tool from user intent.',
       'Decision logic maps natural-language requests to discrete backend actions.']},
 {cat:'fullstack',catL:'Full-Stack',title:'BAKERY — <em>Ordering</em> Web App',
  blurb:'A full-stack bakery shop — browse the catalogue, order fresh, manage it all from a Django admin.',
  tags:['Django','React','SQLite','Python'],
  pts:['Django backend + React frontend for browsing and ordering bakery products online.',
       'Django models & admin tooling manage the product catalogue.',
       'Structured as a clean, decoupled client-server application.']},
 {cat:'vision',catL:'Machine Learning',title:'AutoML Dataset <em>Analyzer</em>',
  blurb:'Upload a CSV, get a data-health report plus preprocessing and model recommendations.',
  tags:['Scikit-learn','Pandas','Python'],
  pts:['Analyzes uploaded CSV/Excel datasets and recommends preprocessing + modeling steps.',
       'Handles missing values, duplicate detection and feature/target separation.',
       'Runs model training & evaluation workflows for quick baselines.']},
];
const FILTERS=[['all','All ✳'],['agentic','Agentic AI'],['rag','RAG'],['voice','Voice'],['vision','ML & Vision'],['fullstack','Full-Stack']];
const CERTS=[
 ['Generative AI — Intro & Apps','IBM'],['Deep Learning Specialization','DeepLearning.AI'],
 ['LLM Apps with LangChain','HEC / Coursera'],['Supervised ML: Regression & Classification','DeepLearning.AI'],
 ['AI For Everyone','DeepLearning.AI'],['Productivity with AI Tools','DeepLearning.AI'],
 ['Advanced Python & Applications','NAVTTC'],['Web Development','Saylani Institute'],
 ['Azure Fundamentals AZ-900 (prep)','Microsoft'],['NCUK IFY CS Track','University of Peshawar'],
];

/* ================= RENDER ================= */
// capabilities
$('#capsGrid').innerHTML=CAPS.map((c,i)=>`
  <div class="cap rv" style="--d:${(i%4)*.08}s" data-hover>
    <span class="big-glyph">${c.g}</span>
    <span class="num">${String(i+1).padStart(2,'0')}</span>
    <h3>${c.t}</h3>
    <div class="tags">${c.d.map(t=>`<span>${t}</span>`).join('')}</div>
  </div>`).join('');

// filters
$('#filters').innerHTML=FILTERS.map(([k,l],i)=>`<button class="f-btn ${i===0?'active':''}" data-f="${k}" data-mag>${l}</button>`).join('');

// work cards
$('#workGrid').innerHTML=PROJECTS.map((p,i)=>`
  <article class="work-card rv" style="--d:${(i%2)*.09}s" data-cat="${p.cat}" data-idx="${i}" tabindex="0" role="button" aria-label="Open case study: ${p.title.replace(/<[^>]+>/g,'')}">
    <div class="wc-top"><span class="wc-num">${String(i+1).padStart(2,'0')}</span><span class="wc-cat">${p.catL}</span></div>
    <h3>${p.title}</h3>
    <p class="wc-blurb">${p.blurb}</p>
    <div class="wc-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
    <div class="wc-open">Open case study <i>↗</i></div>
  </article>`).join('');

// certs
$('#certs').innerHTML=CERTS.map(([n,o])=>`<span data-hover><i>✳</i>${n} · ${o}</span>`).join('');

// marquees (duplicated for seamless loop)
const mqItems1=['Multi-Agent Systems','RAG Pipelines','Voice Agents','LLM Tooling','LangGraph','FastAPI','Docker','Gemini API'];
const mqItems2=['agents that reason','retrieval that grounds','voices that listen','systems that ship'];
const mqHTML=items=>items.map(t=>`<span>${t}<i>✳</i></span>`).join('');
$('#mq1').innerHTML=mqHTML(mqItems1)+mqHTML(mqItems1);
$('#mq2').innerHTML=mqHTML(mqItems2)+mqHTML(mqItems2);

$('#year').textContent=new Date().getFullYear();

/* ================= SPLIT HERO LINES ================= */
$$('.ln').forEach((el,li)=>{
  const words=el.textContent.trim().split(/\s+/);
  el.innerHTML=words.map((w,wi)=>`<span class="w"><span style="--d:${.15+li*.14+wi*.07}s">${w}</span></span>`).join(' ');
});

/* ================= PRELOADER ================= */
const loader=$('#loader'),loadNum=$('#loadNum'),loadBar=$('#loadBar');
let lp=0;
const li=setInterval(()=>{
  lp=Math.min(100,lp+Math.random()*14+4);
  loadNum.textContent=Math.floor(lp);loadBar.style.width=lp+'%';
  if(lp>=100){clearInterval(li);finishLoad();}
},90);
function finishLoad(){
  setTimeout(()=>{
    loader.classList.add('done');
    $('#nav').classList.add('on');
    document.querySelector('.hero h1').classList.add('split-in');
    $$('.hero-inner .rv').forEach(e=>e.classList.add('in'));
    setTimeout(()=>loader.remove(),1100);
  },260);
}

/* ================= CURSOR ================= */
const dot=$('#cDot'),ring=$('#cRing');
if(!coarse&&!reduce){
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
  (function loop(){
    rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
    dot.style.transform=`translate(${mx-4}px,${my-4}px)`;
    ring.style.transform=`translate(${rx-ring.offsetWidth/2}px,${ry-ring.offsetHeight/2}px)`;
    requestAnimationFrame(loop);
  })();
  const hoverSel='a,button,[data-hover],.work-card,.cap,.f-btn';
  document.addEventListener('mouseover',e=>{if(e.target.closest(hoverSel))ring.classList.add('big');});
  document.addEventListener('mouseout',e=>{if(e.target.closest(hoverSel))ring.classList.remove('big');});
}else{dot.style.display=ring.style.display='none';}

/* ================= MAGNETIC ================= */
if(!coarse&&!reduce){
  $$('[data-mag]').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
      el.style.transform=`translate(${x*.28}px,${y*.28}px)`;
    });
    el.addEventListener('mouseleave',()=>{el.style.transition='transform .5s cubic-bezier(.22,1,.36,1)';el.style.transform='';setTimeout(()=>el.style.transition='',500);});
  });
}

/* ================= THEME ================= */
const themeBtn=$('#themeBtn');
function setTheme(mode){document.documentElement.classList.toggle('dusk',mode==='dusk');try{localStorage.setItem('zk-theme',mode);}catch(e){} if(window.refreshNetColors)window.refreshNetColors();}
try{const saved=localStorage.getItem('zk-theme');if(saved)setTheme(saved);}catch(e){}
themeBtn.addEventListener('click',()=>{
  const toDusk=!document.documentElement.classList.contains('dusk');
  if(reduce){setTheme(toDusk?'dusk':'day');return;}
  // circular bloom from the button
  const r=themeBtn.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  const col=toDusk?'#0E1A13':'#F4EEE1';
  const b=document.createElement('div');b.className='bloom';b.style.background=col;
  const size=Math.hypot(Math.max(cx,innerWidth-cx),Math.max(cy,innerHeight-cy))*2.2;
  b.style.cssText+=`;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;transition:transform .8s cubic-bezier(.76,0,.24,1)`;
  document.body.appendChild(b);
  requestAnimationFrame(()=>b.style.transform='translate(-50%,-50%) scale(1)');
  setTimeout(()=>{setTheme(toDusk?'dusk':'day');b.style.transition='opacity .5s';b.style.opacity='0';},480);
  setTimeout(()=>b.remove(),1050);
});

/* ================= NAV / MENU / SCROLL ================= */
const nav=$('#nav');
addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>30);
  const h=document.documentElement;
  $('#progress').style.width=(scrollY/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

const burger=$('#burger'),menu=$('#menu');
burger.addEventListener('click',()=>{
  const open=menu.classList.toggle('on');
  burger.classList.toggle('x',open);
  menu.setAttribute('aria-hidden',!open);
  document.body.style.overflow=open?'hidden':'';
});

/* page-wipe navigation */
const wipe=$('#wipe'),wipeWord=$('#wipeWord');let wiping=false;
$$('[data-wipe-link]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(!href||!href.startsWith('#'))return;
    e.preventDefault();
    if(menu.classList.contains('on')){menu.classList.remove('on');burger.classList.remove('x');document.body.style.overflow='';}
    const target=document.querySelector(href==='#top'?'#top':href);
    if(!target)return;
    if(reduce){target.scrollIntoView();return;}
    if(wiping)return;wiping=true;
    wipeWord.textContent=a.dataset.word||'Go';
    wipe.classList.add('on');
    setTimeout(()=>{
      scrollTo({top:href==='#top'?0:target.getBoundingClientRect().top+scrollY-70,behavior:'auto'});
      wipe.classList.add('off');
    },700);
    setTimeout(()=>{
      wipe.classList.add('nx');                 /* kill transitions before resetting position */
      wipe.classList.remove('on','off');
      setTimeout(()=>{wipe.classList.remove('nx');wiping=false;},80);
    },1450);
  });
});

/* ================= REVEALS & COUNTERS ================= */
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in','split-in');io.unobserve(en.target);}}),{threshold:.16,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(el=>io.observe(el));

const cio=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;cio.unobserve(en.target);
  const el=en.target,end=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||0),t0=performance.now();
  (function tick(t){const p=clamp((t-t0)/1300,0,1);el.textContent=(end*easeOut(p)).toFixed(dec);if(p<1)requestAnimationFrame(tick);})(t0);
}),{threshold:.5});
$$('[data-count]').forEach(el=>cio.observe(el));

/* ================= JOURNEY SPINE DRAW ================= */
const spine=$('#spinePath'),journey=$('#journey');
if(spine){
  const upd=()=>{
    const r=journey.getBoundingClientRect();
    const p=clamp((innerHeight*.75-r.top)/(r.height*.9),0,1);
    spine.style.strokeDashoffset=String(100-100*p);
  };
  addEventListener('scroll',upd,{passive:true});upd();
}

/* ================= WORK: TILT ================= */
if(!coarse&&!reduce){
  $$('.work-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const dx=(e.clientX-r.left)/r.width-.5, dy=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-dy*5}deg) rotateY(${dx*5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}

/* ================= WORK: FILTERS ================= */
$('#filters').addEventListener('click',e=>{
  const btn=e.target.closest('.f-btn');if(!btn)return;
  $$('.f-btn').forEach(b=>b.classList.toggle('active',b===btn));
  const f=btn.dataset.f;
  $$('.work-card').forEach(card=>{
    const show=f==='all'||card.dataset.cat===f;
    if(show){
      card.classList.remove('hide');
      requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.remove('fading')));
    }else{
      card.classList.add('fading');
      setTimeout(()=>{if(card.classList.contains('fading'))card.classList.add('hide');},320);
    }
  });
});

/* ================= WORK: MODAL ================= */
const modal=$('#modal');
function openModal(i){
  const p=PROJECTS[i];
  $('#mCat').textContent=p.catL;
  $('#mTitle').innerHTML=p.title;
  $('#mBlurb').textContent=p.blurb;
  $('#mPoints').innerHTML=p.pts.map(x=>`<li>${x}</li>`).join('');
  $('#mTags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
  modal.classList.add('on');modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  $('#modalClose').focus({preventScroll:true});
}
function closeModal(){modal.classList.remove('on');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
$('#workGrid').addEventListener('click',e=>{const c=e.target.closest('.work-card');if(c)openModal(+c.dataset.idx);});
$('#workGrid').addEventListener('keydown',e=>{if(e.key==='Enter'){const c=e.target.closest('.work-card');if(c)openModal(+c.dataset.idx);}});
$('#modalClose').addEventListener('click',closeModal);
$('#modalBg').addEventListener('click',closeModal);
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();if(menu.classList.contains('on'))burger.click();}});

/* ================= COPY EMAIL / TOAST ================= */
const toast=$('#toast');let tt;
$('#copyMail').addEventListener('click',()=>{
  const mail='itszohroufkhattak@gmail.com';
  (navigator.clipboard?navigator.clipboard.writeText(mail):Promise.reject()).catch(()=>{
    const t=document.createElement('textarea');t.value=mail;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();
  }).finally(()=>{
    toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200);
  });
});

/* ================= AGENT CONSTELLATION ================= */
const cvs=$('#net'),ctx=cvs.getContext('2d'),tip=$('#netTip'),heroSec=document.querySelector('.hero');
let W=0,H=0,DPR=1,mouse={x:-9e3,y:-9e3},hovered=null;
const NODE_DEFS=[
 {id:'core',   label:'LLM Core',  fx:.72,fy:.42,r:26,desc:'Gemini-driven reasoning loops that steer the whole graph.'},
 {id:'plan',   label:'Planner',   fx:.55,fy:.24,r:14,desc:'Breaks goals into steps — LangGraph nodes & edges.'},
 {id:'retr',   label:'Retriever', fx:.87,fy:.28,r:14,desc:'FAISS + embeddings ground every answer in facts.'},
 {id:'tools',  label:'Tools',     fx:.90,fy:.58,r:14,desc:'Function calling into APIs, databases and backends.'},
 {id:'mem',    label:'Memory',    fx:.66,fy:.66,r:13,desc:'State and context carried across every turn.'},
 {id:'route',  label:'Router',    fx:.50,fy:.48,r:12,desc:'Reads intent and routes it to the right agent.'},
 {id:'critic', label:'Critic',    fx:.79,fy:.74,r:12,desc:'Scores and checks outputs before they ship.'},
];
const EDGES=[['core','plan'],['core','retr'],['core','tools'],['core','mem'],['core','route'],['core','critic'],['plan','tools'],['retr','mem'],['plan','critic'],['route','tools'],['retr','critic'],['route','plan']];
let nodes=[],pulses=[];
let COL={fg:'#17241E',tang:'#E8542F',pine:'#1C3A2D',butter:'#F2C14E'};
function hexRgb(h){h=h.trim();if(h[0]!=='#')return[23,36,30];return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
const rgba=(h,a)=>{const[r,g,b]=hexRgb(h);return`rgba(${r},${g},${b},${a})`;};
function refreshNetColors(){
  const cs=getComputedStyle(document.documentElement);
  COL={fg:cs.getPropertyValue('--fg').trim()||'#17241E',
       tang:cs.getPropertyValue('--tang').trim()||'#E8542F',
       pine:cs.getPropertyValue('--pine').trim()||'#1C3A2D',
       butter:cs.getPropertyValue('--butter').trim()||'#F2C14E'};
}
function sizeNet(){
  const r=heroSec.getBoundingClientRect();
  DPR=Math.min(2,devicePixelRatio||1);
  W=r.width;H=r.height;
  cvs.width=W*DPR;cvs.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
  nodes=NODE_DEFS.map((d,i)=>({
    ...d,x:d.fx*W,y:d.fy*H,vx:0,vy:0,phase:Math.random()*Math.PI*2,i
  }));
}
function nodeById(id){return nodes.find(n=>n.id===id);}
function adjacent(a,b){return EDGES.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));}
let lastPulse=0;
function drawNet(t){
  ctx.clearRect(0,0,W,H);
  const mob=W<860;
  // physics
  nodes.forEach(n=>{
    const hx=n.fx*W+Math.sin(t*.0004+n.phase)*(mob?8:16);
    const hy=n.fy*H+Math.cos(t*.0005+n.phase)*(mob?8:12);
    n.vx+=(hx-n.x)*.002;n.vy+=(hy-n.y)*.002;
    const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);
    if(d<130&&d>0){const f=(130-d)/130*.35;n.vx+=dx/d*f;n.vy+=dy/d*f;}
    n.vx*=.94;n.vy*=.94;n.x+=n.vx;n.y+=n.vy;
  });
  // spawn pulses out of the core
  if(t-lastPulse>650&&!reduce){lastPulse=t;pulses.push({e:EDGES[Math.floor(Math.random()*6)],t:0});if(pulses.length>7)pulses.shift();}
  const dim=rgba(COL.pine,mob?.14:.24),dimKey=rgba(COL.pine,mob?.22:.4);
  // edges
  EDGES.forEach(([a,b])=>{
    const A=nodeById(a),B=nodeById(b);
    const hot=hovered&&(hovered.id===a||hovered.id===b);
    ctx.strokeStyle=hovered?(hot?rgba(COL.tang,.9):dim):dimKey;
    ctx.lineWidth=hot?1.8:1.2;
    ctx.setLineDash(hot?[]:[3,5]);
    ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.stroke();
  });
  ctx.setLineDash([]);
  // pulses
  pulses.forEach(p=>{
    p.t+=.016;
    const A=nodeById(p.e[0]),B=nodeById(p.e[1]);
    const x=A.x+(B.x-A.x)*p.t,y=A.y+(B.y-A.y)*p.t;
    ctx.fillStyle=COL.tang;
    ctx.beginPath();ctx.arc(x,y,3.2,0,7);ctx.fill();
    ctx.fillStyle=rgba(COL.tang,.25);
    ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fill();
  });
  pulses=pulses.filter(p=>p.t<1);
  // occasional core ring
  const ringP=(t%2600)/2600;
  const core=nodeById('core');
  ctx.strokeStyle=rgba(COL.tang,(1-ringP)*.5);ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(core.x,core.y,core.r+ringP*46,0,7);ctx.stroke();
  // nodes
  nodes.forEach(n=>{
    const isHot=hovered&&hovered.id===n.id;
    const R=n.r*(isHot?1.25:1)*(mob?.8:1);
    // halo
    ctx.fillStyle=rgba(n.id==='core'?COL.tang:COL.pine,isHot?.18:.08);
    ctx.beginPath();ctx.arc(n.x,n.y,R+9,0,7);ctx.fill();
    // body
    ctx.fillStyle=n.id==='core'?COL.tang:(isHot?COL.butter:COL.pine);
    ctx.beginPath();ctx.arc(n.x,n.y,R,0,7);ctx.fill();
    // inner
    if(n.id==='core'){ctx.fillStyle='rgba(244,238,225,.9)';ctx.beginPath();ctx.arc(n.x,n.y,R*.34,0,7);ctx.fill();}
    // label
    ctx.fillStyle=rgba(COL.fg,n.id==='core'?.95:.72);
    ctx.font=`600 ${mob?9.5:10.5}px "Space Grotesk", sans-serif`;
    ctx.textAlign='center';
    ctx.fillText(n.label.toUpperCase().split('').join('\u200a'),n.x,n.y+R+(mob?16:20));
  });
  requestAnimationFrame(drawNet);
}
// hover + tooltip
heroSec.addEventListener('mousemove',e=>{
  const r=heroSec.getBoundingClientRect();
  mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;
  let hit=null;
  nodes.forEach(n=>{if(Math.hypot(n.x-mouse.x,n.y-mouse.y)<n.r+16)hit=n;});
  hovered=hit;
  if(hit){
    tip.querySelector('b').textContent=hit.label;
    tip.querySelector('span').textContent=hit.desc;
    tip.style.left=clamp(hit.x-40,10,W-240)+'px';
    tip.style.top=(hit.y+((W<860?hit.r*.8:hit.r))+30)+'px';
    tip.classList.add('show');
    heroSec.style.cursor='pointer';
  }else{tip.classList.remove('show');heroSec.style.cursor='';}
});
heroSec.addEventListener('mouseleave',()=>{mouse.x=mouse.y=-9e3;hovered=null;tip.classList.remove('show');});
sizeNet();refreshNetColors();
requestAnimationFrame(drawNet);
addEventListener('resize',()=>{sizeNet();refreshNetColors();},{passive:true});
window.refreshNetColors=refreshNetColors;
})();
