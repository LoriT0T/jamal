/* Jamāl — views + router. */
import { CREED, RITUALS, RULES, NEVER, PALETTE, OCCASIONS, FITS, CARE, CONCERNS, INSIDE, CABINET } from './data.js';
import * as S from './store.js';

const $  = (s,r=document) => r.querySelector(s);
const app = $('#app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R = id => RITUALS.find(r => r.id === id);

const DAYNAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const fmtDate = () => {
  const d = new Date();
  return d.toLocaleDateString('en-GB',{weekday:'long', day:'numeric', month:'long'});
};
const mmss = s => Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0');

function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity = '0'; t.style.transition='opacity .3s'; }, 1500);
  setTimeout(()=> t.remove(), 1900);
}

function beep(){
  try {
    const a = new (window.AudioContext||window.webkitAudioContext)();
    const o = a.createOscillator(), g = a.createGain();
    o.connect(g); g.connect(a.destination);
    o.frequency.value = 660; o.type = 'sine';
    g.gain.setValueAtTime(.0001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(.16, a.currentTime+.02);
    g.gain.exponentialRampToValueAtTime(.0001, a.currentTime+.7);
    o.start(); o.stop(a.currentTime+.72);
  } catch {}
}

/* cadence label ------------------------------------------------- */
function cadenceLabel(r){
  const c = r.cadence;
  if (c.type==='daily')  return 'Daily';
  if (c.type==='every')  return c.n===2 ? 'Every other day' : 'Every ' + c.n + ' days';
  if (c.type==='weekly') return DAYNAMES[c.day] + 's';
  if (c.type==='months') return 'Every ' + c.n + ' months';
  return 'When needed';
}
function dueLabel(r){
  if (S.isDone(r.id)) return '<span class="end">done</span>';
  const n = S.dueIn(r);
  if (n === null) return '<span class="end">' + (r.cadence.type === 'ondemand' ? 'any time' : 'not logged') + '</span>';
  if (n <  0) return '<span class="end over">' + (-n) + 'd late</span>';
  if (n === 0) return '<span class="end due">due</span>';
  if (n === 1) return '<span class="end">tomorrow</span>';
  return '<span class="end">in ' + n + 'd</span>';
}

/* ---------------------------------------------------------------- *
 * TODAY
 * ---------------------------------------------------------------- */
function viewHome(){
  const due  = RITUALS.filter(r => r.cadence.type !== 'ondemand' && S.isDue(r) && !S.isDone(r.id));
  const done = RITUALS.filter(r => S.isDone(r.id));
  const sched = RITUALS.filter(r => r.cadence.type !== 'ondemand');
  const pct  = sched.length ? Math.round(sched.filter(r=>!S.isDue(r)||S.isDone(r.id)).length / sched.length * 100) : 0;
  const next = due[0];
  const mins = due.reduce((a,r)=>a+r.mins,0);
  const hour = new Date().getHours();
  const greet = hour < 5 ? 'Late night' : hour < 12 ? 'This morning' : hour < 17 ? 'This afternoon' : 'This evening';

  const heroBody = next
    ? '<span class="kicker">' + esc(greet) + ' · next</span>'
      + '<h2>' + esc(next.name) + '</h2>'
      + '<p>' + esc(next.blurb) + '</p>'
      + '<div class="meta">'
        + '<div><b>' + due.length + '</b><span>due</span></div>'
        + '<div><b>' + mins + '<small style="font-size:11px"> min</small></b><span>to clear</span></div>'
        + '<div><b>' + pct + '%</b><span>today</span></div>'
      + '</div>'
      + '<div class="btn-row"><button class="btn" data-act="run" data-id="' + next.id + '">Begin ' + esc(next.name) + '</button></div>'
    : '<span class="kicker">' + esc(greet) + '</span>'
      + '<h2>Nothing outstanding.</h2>'
      + '<p>Every scheduled layer is clear. What is left is the part that is not on a checklist.</p>'
      + '<div class="btn-row"><button class="btn ghost" data-act="run" data-id="ready">Get ready anyway</button></div>';

  const insideRow = INSIDE.map(m => {
    const v = S.inside()[m.id];
    if (m.type === 'tog'){
      return '<button class="metric tog' + (v?' on':'') + '" data-act="tog" data-id="' + m.id + '">'
        + '<span class="lbl">' + esc(m.lbl) + '</span><i class="dot' + (v?' on':'') + '"></i></button>';
    }
    const shown = v != null ? v : 0;
    const hit = m.target && shown >= m.target;
    return '<div class="metric' + (hit?' on':'') + '">'
      + '<div class="lbl">' + esc(m.lbl) + '</div>'
      + '<div class="val">' + shown + '<small>' + esc(m.unit||'') + (m.target? ' / '+m.target : '') + '</small></div>'
      + '<div class="ctl"><button data-act="dec" data-id="' + m.id + '">−</button>'
      + '<button data-act="inc" data-id="' + m.id + '">+</button></div>'
      + '</div>';
  }).join('');

  const ondemand = RITUALS.filter(r => r.cadence.type === 'ondemand');

  return '<div class="view">'
    + '<header class="masthead"><div class="date">' + esc(fmtDate()) + '</div>'
      + '<h1>Jamāl</h1><div class="ar">' + CREED.ar + '</div>'
      + '<div class="sub">' + esc(CREED.en) + ' The outside is maintained. The inside is the reason.</div></header>'

    + '<div class="hero">' + heroBody + '</div>'

    + (due.length > 1 ? '<div class="sect"><div class="sect-h"><h3>Also due</h3><a class="link" href="#/rituals">All rituals</a></div>'
        + '<div class="card">' + due.slice(1).map(rowHTML).join('') + '</div></div>' : '')

    + '<div class="sect"><div class="sect-h"><h3>On demand</h3></div><div class="card">'
      + ondemand.map(rowHTML).join('') + '</div></div>'

    + '<div class="sect"><div class="sect-h"><h3>Inside</h3><a class="link" href="#/log">Trends</a></div>'
      + '<div class="mgrid">' + insideRow + '</div>'
      + '<p class="tiny" style="margin-top:10px">Half of how you look is decided here, hours before the mirror is involved.</p></div>'

    + (done.length ? '<div class="sect"><div class="sect-h"><h3>Cleared</h3></div><div class="card">'
        + done.map(rowHTML).join('') + '</div></div>' : '')

    + '<div class="sect"><div class="rule"></div><div class="quote"><span class="ar">' + CREED.ar + '</span>'
      + esc(CREED.en) + '<div class="tiny" style="margin-top:8px">' + esc(CREED.src) + '</div></div></div>'
    + '</div>';
}

function rowHTML(r){
  const done = S.isDone(r.id);
  return '<div class="row tap' + (done?' done':'') + '">'
    + '<button class="glyph" data-act="tick" data-id="' + r.id + '" aria-label="mark done">' + (done ? '✓' : r.glyph) + '</button>'
    + '<button class="body" data-act="run" data-id="' + r.id + '" style="background:none;text-align:left">'
      + '<b>' + esc(r.name) + '</b><span>' + esc(r.kicker) + ' · ' + r.mins + ' min</span></button>'
    + dueLabel(r)
    + '</div>';
}

/* ---------------------------------------------------------------- *
 * RITUALS
 * ---------------------------------------------------------------- */
function viewRituals(){
  const groups = [
    ['Every day',      RITUALS.filter(r=>r.cadence.type==='daily')],
    ['On a cycle',     RITUALS.filter(r=>r.cadence.type==='every')],
    ['Weekly',         RITUALS.filter(r=>r.cadence.type==='weekly')],
    ['Long interval',  RITUALS.filter(r=>r.cadence.type==='months')],
    ['When needed',    RITUALS.filter(r=>r.cadence.type==='ondemand')]
  ];
  return '<div class="view">'
    + '<header class="masthead"><div class="date">The layers</div><h2 class="page">Ritual</h2>'
      + '<div class="sub">Each one is a sequence, not a list — the order carries most of the effect. Tap to run it step by step; tap the mark to log it without the walkthrough.</div></header>'
    + groups.filter(g=>g[1].length).map(([t,rs]) =>
        '<div class="sect"><div class="sect-h"><h3>' + esc(t) + '</h3><span class="tiny">' + esc(cadenceLabel(rs[0])) + '</span></div>'
        + '<div class="card">' + rs.map(r =>
            '<div class="row tap' + (S.isDone(r.id)?' done':'') + '">'
            + '<button class="glyph" data-act="tick" data-id="' + r.id + '">' + (S.isDone(r.id)?'✓':r.glyph) + '</button>'
            + '<button class="body" data-act="run" data-id="' + r.id + '" style="background:none;text-align:left">'
              + '<b>' + esc(r.name) + '</b><span>' + esc(r.blurb) + '</span></button>'
            + dueLabel(r) + '</div>').join('')
        + '</div></div>').join('')
    + '<div class="sect"><div class="rule"></div><p class="tiny">Streaks and adherence live on the Log page. A missed day is data, not a verdict.</p></div>'
    + '</div>';
}

/* ---------------------------------------------------------------- *
 * FIT
 * ---------------------------------------------------------------- */
const TEMPS = [
  { id:'freeze', lbl:'Freezing', c:'under 4°' },
  { id:'cold',   lbl:'Cold',     c:'4–9°' },
  { id:'cool',   lbl:'Cool',     c:'10–15°' },
  { id:'mild',   lbl:'Mild',     c:'16–21°' },
  { id:'warm',   lbl:'Warm',     c:'22°+' }
];
let FIT = { occ:'uni', temp:'cool', rain:false };

function viewFit(){
  let list = FITS.filter(f => f.occ.includes(FIT.occ) && f.temps.includes(FIT.temp));
  if (FIT.rain){
    const wet = list.filter(f => f.rain);
    if (wet.length) list = wet;
  }
  list = list.sort((a,b) => (S.wornRecently(a.id)?1:0) - (S.wornRecently(b.id)?1:0));

  const worn = S.wornToday();
  const cards = list.length ? list.map(f => {
    const layers = Object.entries(f.layers).map(([k,v]) =>
      '<div class="layer"><div class="lb">' + esc(k) + '</div><div class="pc">' + v.map(esc).join('<br>') + '</div></div>').join('');
    const recent = S.wornRecently(f.id);
    return '<div class="fit-card" style="margin-bottom:12px">'
      + '<div class="fit-head"><div class="kicker">' + esc(f.kicker) + '</div><h3>' + esc(f.name) + '</h3>'
        + (recent ? '<div class="tiny" style="margin-top:6px">Worn in the last few days</div>' : '') + '</div>'
      + '<div class="fit-layers">' + layers + '</div>'
      + '<div class="pad" style="border-top:1px solid var(--line)"><p class="small">' + esc(f.why) + '</p>'
      + '<button class="btn ' + (worn===f.id?'':'ghost') + '" style="margin-top:12px" data-act="wear" data-id="' + f.id + '">'
        + (worn===f.id ? 'Worn today ✓' : 'Wearing this') + '</button></div>'
      + '</div>';
  }).join('') : '<div class="card pad"><p class="small">Nothing in the book covers that combination. Fall back to The Default and swap the outer layer for the weather — that is what the rules are for.</p></div>';

  return '<div class="view">'
    + '<header class="masthead"><div class="date">The uniform</div><h2 class="page">Fit</h2>'
      + '<div class="sub">A uniform beats a wardrobe: fewer decisions, higher floor. Pick the room and the weather; the book answers. Then prep the garment — half of how a fit lands is presentation, not choice.</div></header>'

    + '<div class="scroller" style="margin-bottom:9px">' + OCCASIONS.map(o =>
        '<button class="chip' + (FIT.occ===o.id?' on':'') + '" data-act="occ" data-id="' + o.id + '">' + esc(o.name) + '</button>').join('') + '</div>'
    + '<div class="scroller" style="margin-bottom:16px">' + TEMPS.map(t =>
        '<button class="chip' + (FIT.temp===t.id?' on':'') + '" data-act="temp" data-id="' + t.id + '">' + esc(t.lbl) + ' <span style="opacity:.55">' + esc(t.c) + '</span></button>').join('')
      + '<button class="chip' + (FIT.rain?' on':'') + '" data-act="rain">Rain</button></div>'

    + cards

    + '<div class="sect"><div class="sect-h"><h3>Before you leave</h3></div><div class="card pad">'
      + '<b style="font-size:14.5px">Presentation is half the garment</b>'
      + '<p class="small" style="margin-top:7px">Lint-rolled including the back of the shoulders · de-pilled · pressed to the fabric’s method · threads snipped flush · no deodorant marks · shoes wiped. An unpressed good coat looks worse than a pressed cheap one.</p>'
      + '<button class="btn ghost" style="margin-top:14px" data-act="run" data-id="prep">Run Fit Prep</button></div></div>'

    + [...new Set(RULES.map(r=>r.g))].map(g =>
        '<div class="sect"><div class="sect-h"><h3>' + esc(g) + '</h3></div><div class="card pad">'
        + RULES.filter(r=>r.g===g).map((r,i) =>
            '<div class="ruleitem"><div class="n">' + (i+1) + '</div><div><b>' + esc(r.t) + '</b><p>' + esc(r.d) + '</p></div></div>').join('')
        + '</div></div>').join('')

    + '<div class="sect"><div class="sect-h"><h3>Never</h3></div><div class="card pad">'
      + NEVER.map(n => '<div class="small no" style="padding:6px 0">— ' + esc(n) + '</div>').join('')
      + '<p class="tiny" style="margin-top:10px">A short list of nos does more for a wardrobe than a long list of yeses. These are yours, written down so they stop being renegotiated in a shop.</p></div></div>'

    + '<div class="sect"><div class="sect-h"><h3>Palette</h3></div><div class="card pad">'
      + PALETTE.map(p => '<div class="layer"><div class="lb"><span class="sw" style="background:' + p.hex + ';display:inline-block"></span></div>'
        + '<div class="pc">' + esc(p.name) + '<em>' + esc(p.role) + '</em></div></div>').join('')
      + '<p class="tiny" style="margin-top:12px">Three colours maximum, one of them a neutral base. Since you do not wear colour, texture is the axis that keeps a fit from going flat.</p></div></div>'

    + '<div class="sect"><div class="sect-h"><h3>Keeping it</h3></div><div class="card pad">'
      + CARE.map(c => '<details><summary>' + esc(c.t) + '</summary><div class="dbody">' + esc(c.d) + '</div></details>').join('')
      + '</div></div>'
    + '</div>';
}

/* ---------------------------------------------------------------- *
 * SKIN
 * ---------------------------------------------------------------- */
const SEV_LABELS = ['Clear','Trace','Mild','Active','Bad'];
const RAMP = [
  { wk:[1,2],  t:'Two nights a week. Let the skin meet it slowly.' },
  { wk:[3,4],  t:'Alternate nights. Expect dryness around the mouth.' },
  { wk:[5,6],  t:'Nightly if tolerated. Purge is often at its worst here — hold.' },
  { wk:[7,11], t:'Nightly. Texture starts turning over. Do not add anything new.' },
  { wk:[12,99],t:'Judgement point. Compare against week zero, not against last night.' }
];

function viewSkin(){
  const s = S.sev();
  const start = S.state().set.adapaleneStart;
  const wk = start ? Math.floor(S.since(start)/7) + 1 : 0;

  const dials = [['face','Face'],['back','Back'],['eyes','Under-eyes'],['hair','Hair']].map(([id,lbl]) => {
    const cur = s[id];
    const series = S.sevSeries(id, 14);
    return '<div class="card pad" style="margin-bottom:9px">'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline">'
        + '<b style="font-size:14.5px">' + esc(lbl) + '</b>'
        + '<span class="tiny">' + (cur!=null ? esc(SEV_LABELS[cur]) : 'not rated today') + '</span></div>'
      + '<div class="severity">' + [0,1,2,3,4].map(n =>
          '<button class="' + (cur===n?'on':'') + '" data-act="sev" data-id="' + id + '" data-v="' + n + '">' + n + '</button>').join('') + '</div>'
      + '<div class="spark">' + series.map(v =>
          '<i class="' + (v!=null && v>=3?'hi':'') + '" style="height:' + (v==null?4:(v/4*100)) + '%"></i>').join('') + '</div>'
      + '<div class="tiny" style="margin-top:5px">Last 14 days · 0 clear, 4 bad</div>'
      + '</div>';
  }).join('');

  const ramp = start
    ? '<div class="card pad"><div class="sect-h" style="margin-bottom:6px"><h3>Adapalene · week ' + wk + '</h3>'
        + '<button class="link" data-act="ramp-reset" style="color:var(--tx-3);font-size:11px">reset</button></div>'
      + RAMP.map(p => {
          const now = wk >= p.wk[0] && wk <= p.wk[1];
          return '<div class="phase' + (now?' now':'') + '"><div class="wk">Week ' + p.wk[0] + (p.wk[1]>p.wk[0]? '–'+(p.wk[1]>90?'+':p.wk[1]) : '') + '</div>'
            + '<div class="txt">' + esc(p.t) + '</div></div>';
        }).join('')
      + '<p class="tiny" style="margin-top:12px">Started ' + esc(start) + '. The purge between weeks two and six is where most people quit, and quitting there is what makes the whole attempt worthless.</p></div>'
    : '<div class="card pad"><b style="font-size:14.5px">The twelve-week ramp</b>'
      + '<p class="small" style="margin-top:7px">Closed comedones are the textbook indication for a retinoid, and adapalene 0.1% is available over the counter. It is the only thing on this page likely to change the underlying problem rather than cover it.</p>'
      + '<button class="btn" style="margin-top:14px" data-act="ramp-start">Start the ramp today</button></div>';

  const concerns = CONCERNS.map(c =>
    '<details><summary><span>' + esc(c.glyph) + '  ' + esc(c.name) + '</span></summary><div class="dbody">'
      + '<p style="color:var(--tx-2)">' + esc(c.what) + '</p>'
      + '<div class="note" style="margin-top:14px"><b>Mechanism</b><p>' + c.causes.map(esc).join('<br>') + '</p></div>'
      + '<div style="margin-top:16px">' + c.levers.map(l =>
          '<div class="ruleitem"><div class="n">·</div><div><b>' + esc(l.t) + '</b><p>' + esc(l.d) + '</p>'
          + (l.ritual ? '<button class="chip" style="margin-top:7px" data-act="run" data-id="' + l.ritual + '">Open ' + esc(R(l.ritual).name) + '</button>' : '')
          + '</div></div>').join('') + '</div>'
      + '<div class="note" style="margin-top:16px"><b>The clock</b><p>' + esc(c.clock) + '</p></div>'
      + '<div class="note warn" style="margin-top:12px"><b>When to stop self-treating</b><p>' + esc(c.escalate) + '</p></div>'
    + '</div></details>').join('');

  return '<div class="view">'
    + '<header class="masthead"><div class="date">Root cause, not cover</div><h2 class="page">Skin</h2>'
      + '<div class="sub">Makeup answers the question for four hours. This page answers it for four months. Rate honestly, in the same light, at the same time of day — otherwise the numbers are noise.</div></header>'
    + '<div class="sect-h"><h3>Today’s reading</h3></div>' + dials
    + '<div class="sect"><div class="sect-h"><h3>Active protocol</h3></div>' + ramp + '</div>'
    + '<div class="sect"><div class="sect-h"><h3>The four fronts</h3></div><div class="card pad">' + concerns + '</div></div>'
    + '<div class="sect"><div class="card pad"><p class="tiny">None of this is medical advice, and none of it is a substitute for a GP or a dermatologist. It is the order of operations that a careful person would follow before booking one — and the point at which each front says to stop and book.</p></div></div>'
    + '</div>';
}

/* ---------------------------------------------------------------- *
 * LOG
 * ---------------------------------------------------------------- */
function viewLog(){
  const daily = RITUALS.filter(r => r.cadence.type === 'daily');
  const span = Math.min(30, (S.since(S.state().set.start) || 0) + 1);
  const adh30 = S.adherence(30, daily);
  const grid = [];
  for (let i=41;i>=0;i--){
    const d = S.shift(S.today(), -i);
    const p = S.dayScore(d, RITUALS);
    grid.push('<i class="' + (p>=80?'l3':p>=50?'l2':p>0?'l1':'') + '"></i>');
  }

  const streaks = RITUALS.filter(r=>r.cadence.type!=='ondemand').map(r =>
    '<tr><td>' + esc(r.name) + '</td><td>' + S.streak(r) + (S.streak(r)===1?' run':' runs') + '</td></tr>').join('');

  const cabRows = CABINET.map(c => {
    const st = S.cab(c.id);
    let pct = 0, left = '—', cls = '';
    if (c.uses){
      pct = Math.min(100, Math.round((st.uses||0) / c.uses * 100));
      left = (c.uses - (st.uses||0)) + ' left';
    } else if (st.last){
      const used = S.since(st.last);
      pct = Math.min(100, Math.round(used / c.days * 100));
      const rem = c.days - used;
      left = rem <= 0 ? 'due now' : rem + 'd left';
    } else { left = 'not set'; }
    cls = pct >= 100 ? 'bad' : pct >= 80 ? 'warn' : '';
    return '<div class="row" style="display:block;padding:13px 16px">'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">'
        + '<b style="font-size:14px">' + esc(c.name) + '</b>'
        + '<span class="tiny" style="color:' + (pct>=100?'var(--bad)':pct>=80?'var(--warn)':'var(--tx-3)') + '">' + esc(left) + '</span></div>'
      + '<div class="bar"><i class="' + cls + '" style="width:' + pct + '%"></i></div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:9px;gap:10px">'
        + '<span class="tiny" style="flex:1">' + esc(c.note) + '</span>'
        + (c.uses ? '<button class="chip" data-act="cab-use" data-id="' + c.id + '">+1 use</button>' : '')
        + '<button class="chip" data-act="cab-done" data-id="' + c.id + '">' + (c.uses?'New':'Done') + '</button>'
      + '</div></div>';
  }).join('');

  /* inside averages + one honest correlation */
  let sleepSum=0,sleepN=0,waterSum=0,waterN=0,togs={};
  for (let i=0;i<14;i++){
    const d = S.shift(S.today(), -i), v = S.state().inside[d];
    if (!v) continue;
    if (v.sleep){ sleepSum+=+v.sleep; sleepN++; }
    if (v.water){ waterSum+=+v.water; waterN++; }
    INSIDE.filter(m=>m.type==='tog').forEach(m=>{ if (v[m.id]) togs[m.id]=(togs[m.id]||0)+1; });
  }
  const insideRows = '<tr><td>Sleep, 14-day average</td><td>' + (sleepN? (sleepSum/sleepN).toFixed(1)+'h' : '—') + '</td></tr>'
    + '<tr><td>Water, 14-day average</td><td>' + (waterN? Math.round(waterSum/waterN)+' gl' : '—') + '</td></tr>'
    + INSIDE.filter(m=>m.type==='tog').map(m =>
        '<tr><td>' + esc(m.lbl) + '</td><td>' + (togs[m.id]||0) + ' / 14</td></tr>').join('');

  const corr = correlation();

  return '<div class="view">'
    + '<header class="masthead"><div class="date">Evidence, not memory</div><h2 class="page">Log</h2>'
      + '<div class="sub">Slow-moving things are invisible day to day and obvious over a quarter. This page is the only part of you that remembers accurately.</div></header>'

    + '<div class="card pad"><div style="display:flex;align-items:center;gap:16px">'
      + '<div class="ring" style="--p:' + adh30 + '"><i>' + adh30 + '</i></div>'
      + '<div><b style="font-size:15px;display:block">Daily adherence</b><span class="small">Last ' + span + (span===1?' day':' days') + ', across the daily rituals. Under 60% means the routine is too heavy, not that you are undisciplined — cut a step rather than losing the habit.</span></div>'
      + '</div><div class="weeks">' + grid.join('') + '</div>'
      + '<div class="tiny" style="margin-top:8px">Six weeks. Each square is a day, brightness is how much of it you cleared.</div></div>'

    + (corr ? '<div class="sect"><div class="sect-h"><h3>What your own data says</h3></div><div class="card pad"><p class="small">' + corr + '</p></div></div>' : '')

    + '<div class="sect"><div class="sect-h"><h3>Streaks</h3></div><div class="card pad"><table class="mini">' + streaks + '</table></div></div>'
    + '<div class="sect"><div class="sect-h"><h3>Inside, 14 days</h3></div><div class="card pad"><table class="mini">' + insideRows + '</table></div></div>'
    + '<div class="sect"><div class="sect-h"><h3>Cabinet</h3></div><div class="card">' + cabRows + '</div></div>'

    + '<div class="sect"><div class="sect-h"><h3>Data</h3></div><div class="card pad">'
      + '<p class="tiny">Everything lives on this device only — nothing is sent anywhere, and there is no account. Clearing your browser data clears this, so export occasionally.</p>'
      + '<div class="btn-row"><button class="btn quiet" data-act="export">Export</button><button class="btn quiet" data-act="import">Import</button></div>'
      + '<button class="btn quiet" style="margin-top:9px;color:var(--bad)" data-act="wipe">Erase everything</button>'
      + '</div></div>'
    + '</div>';
}

/* Compares face severity on days following 7h+ sleep vs less. Only speaks
   when there is enough of both to be worth saying. */
function correlation(){
  const st = S.state();
  let good=[], bad=[];
  Object.keys(st.sev).forEach(d => {
    const v = st.sev[d]; if (v.face == null) return;
    const prev = st.inside[S.shift(d,-1)];
    if (!prev || !prev.sleep) return;
    (prev.sleep >= 7 ? good : bad).push(v.face);
  });
  if (good.length < 4 || bad.length < 4) return null;
  const avg = a => a.reduce((x,y)=>x+y,0)/a.length;
  const g = avg(good), b = avg(bad), diff = (b-g).toFixed(1);
  if (Math.abs(b-g) < .3) return 'Across ' + (good.length+bad.length) + ' rated days, your face scores the same after a long night as a short one. Sleep is not the lever here — look at the tint-removal step instead.';
  return b > g
    ? 'Across ' + (good.length+bad.length) + ' rated days, your face scores ' + diff + ' points worse the day after under seven hours of sleep. That is your own data, not a claim from a bottle.'
    : 'Across ' + (good.length+bad.length) + ' rated days, the sleep signal runs backwards — likely a confound rather than a finding. Keep rating.';
}

/* ---------------------------------------------------------------- *
 * RUNNER — the guided walkthrough
 * ---------------------------------------------------------------- */
const box = $('#runner');
let RUN = null, TICK = null;

function openRun(id){
  const r = R(id); if (!r) return;
  RUN = { r, i:0, left:null, running:false };
  box.hidden = false; document.body.style.overflow = 'hidden';
  $('#nav').style.display = 'none';
  drawRun();
}
function closeRun(){
  clearInterval(TICK); TICK = null; RUN = null;
  box.hidden = true; box.innerHTML = '';
  document.body.style.overflow = '';
  $('#nav').style.display = '';
  render();
}

function doLog(step){
  if (!step.log) return;
  if (step.log === 'blade')   { S.cabUse('blade'); }
  if (step.log === 'lumify')  { S.mark('lumify');
    const n = S.marksIn('lumify', 7);
    if (n > 4) setTimeout(()=>toast(n + ' Lumify days this week — ease off'), 600); }
  if (['pillow','hairoil','keratin','dryclean'].includes(step.log)) S.cabDone(step.log);
}

function drawRun(){
  const { r, i } = RUN;
  clearInterval(TICK); TICK = null;

  if (i >= r.steps.length){
    box.innerHTML = '<div class="rn-top"><button class="x" data-act="close">✕</button><div class="ttl">' + esc(r.name) + '</div><div class="ct"></div></div>'
      + '<div class="rn-body"><div class="done-wrap"><div><div class="mark">◈</div>'
      + '<h2 class="serif" style="font-size:30px">Done.</h2>'
      + '<p class="small" style="max-width:34ch;margin:0 auto">' + esc(r.name) + ' logged. ' + esc(streakLine(r)) + '</p></div></div></div>'
      + '<div class="rn-foot"><div class="in"><button class="btn" data-act="finish">Close</button></div></div>';
    return;
  }

  const s = r.steps[i];
  const pct = Math.round(i / r.steps.length * 100);
  const timer = s.secs
    ? '<div class="timer"><div class="cd' + (RUN.running?' run':'') + '" id="cd">' + mmss(RUN.left != null ? RUN.left : s.secs) + '</div>'
      + '<div class="arc"><i id="arc" style="width:' + (RUN.left!=null ? (1-RUN.left/s.secs)*100 : 0) + '%"></i></div>'
      + '<div class="hint">' + (RUN.running ? 'Tap to pause' : RUN.left!=null && RUN.left<=0 ? 'Time' : 'Tap to start') + '</div></div>'
    : '';

  box.innerHTML =
      '<div class="rn-top"><button class="x" data-act="close">✕</button>'
    + '<div class="ttl">' + esc(r.name) + '</div><div class="ct">' + (i+1) + '/' + r.steps.length + '</div></div>'
    + '<div class="rn-bar"><i style="width:' + pct + '%"></i></div>'
    + '<div class="rn-body">'
      + '<div class="rn-idx">Step ' + (i+1) + (s.opt ? ' · optional' : '') + '</div>'
      + '<h2>' + esc(s.t) + '</h2>'
      + '<p class="detail">' + esc(s.d) + '</p>'
      + (s.note ? '<div class="note' + (s.note.k==='watch'?' warn':'') + '"><b>' + (s.note.k==='watch'?'Watch out':'Why') + '</b><p>' + esc(s.note.x) + '</p></div>' : '')
      + (s.goto ? '<button class="btn ghost" style="margin-top:20px" data-act="goto" data-id="' + s.goto + '">Open that page</button>' : '')
      + (s.secs ? '<button style="display:block;width:100%" data-act="timer">' + timer + '</button>' : '')
    + '</div>'
    + '<div class="rn-foot"><div class="in">'
      + '<button class="btn" data-act="next">' + (i === r.steps.length-1 ? 'Finish' : s.opt ? 'Done · or skip' : 'Next') + '</button>'
      + '<div class="btn-row">'
        + '<button class="btn quiet" data-act="prev"' + (i===0?' disabled':'') + '>Back</button>'
        + '<button class="btn quiet" data-act="skip">Skip</button>'
      + '</div></div></div>';
}

function streakLine(r){
  const n = S.streak(r);
  if (n <= 1) return 'First one logged. The compounding starts at about six weeks.';
  if (n < 5)  return n + ' in a row.';
  if (n < 15) return n + ' in a row — past the point where it takes willpower.';
  return n + ' in a row. This is no longer a routine, it is a default.';
}

function toggleTimer(){
  const s = RUN.r.steps[RUN.i];
  if (RUN.running){ clearInterval(TICK); TICK=null; RUN.running=false; drawRun(); return; }
  if (RUN.left == null || RUN.left <= 0) RUN.left = s.secs;
  RUN.running = true; drawRun();
  TICK = setInterval(() => {
    RUN.left--;
    const cd = $('#cd'), arc = $('#arc');
    if (cd) cd.textContent = mmss(Math.max(0, RUN.left));
    if (arc) arc.style.width = ((1 - RUN.left/s.secs)*100) + '%';
    if (RUN.left <= 0){ clearInterval(TICK); TICK=null; RUN.running=false; beep();
      if (navigator.vibrate) navigator.vibrate([90,60,90]);
      drawRun(); }
  }, 1000);
}

function stepMove(n){
  const s = RUN.r.steps[RUN.i];
  if (n > 0) doLog(s);
  clearInterval(TICK); TICK=null;
  RUN.i = Math.max(0, RUN.i + n); RUN.left = null; RUN.running = false;
  if (RUN.i >= RUN.r.steps.length) S.complete(RUN.r.id);
  drawRun();
}

/* ---------------------------------------------------------------- *
 * ROUTER + EVENTS
 * ---------------------------------------------------------------- */
const VIEWS = { '':viewHome, '/':viewHome, '/rituals':viewRituals, '/fit':viewFit, '/skin':viewSkin, '/log':viewLog };
const NAVKEY = { '':'home', '/':'home', '/rituals':'rituals', '/fit':'fit', '/skin':'skin', '/log':'log' };

function render(){
  const path = location.hash.replace(/^#/,'') || '/';
  const fn = VIEWS[path] || viewHome;
  app.innerHTML = fn();
  document.querySelectorAll('.nav a').forEach(a =>
    a.classList.toggle('on', a.dataset.nav === (NAVKEY[path]||'home')));
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act, id = el.dataset.id;

  switch (a){
    case 'run':    openRun(id); break;
    case 'tick':   S.toggle(id); render(); toast(S.isDone(id) ? 'Logged' : 'Unlogged'); break;
    case 'close':  closeRun(); break;
    case 'finish': closeRun(); toast('Logged'); break;
    case 'next':   stepMove(1); break;
    case 'prev':   stepMove(-1); break;
    case 'skip':   RUN.i++; RUN.left=null; RUN.running=false;
                   if (RUN.i >= RUN.r.steps.length) S.complete(RUN.r.id);
                   drawRun(); break;
    case 'timer':  toggleTimer(); break;
    case 'goto':   closeRun(); location.hash = id; break;

    case 'inc': case 'dec': {
      const m = INSIDE.find(x=>x.id===id);
      S.bumpInside(id, a==='inc'?1:-1, m.step||1); render(); break; }
    case 'tog':    S.setInside(id, S.inside()[id] ? 0 : 1); render(); break;

    case 'sev':    S.setSev(id, +el.dataset.v); render(); break;
    case 'ramp-start': S.state().set.adapaleneStart = S.today(); S.save(); render();
                   toast('Week 1 — twice this week only'); break;
    case 'ramp-reset': S.state().set.adapaleneStart = null; S.save(); render(); break;

    case 'occ':    FIT.occ = id; render(); break;
    case 'temp':   FIT.temp = id; render(); break;
    case 'rain':   FIT.rain = !FIT.rain; render(); break;
    case 'wear':   S.wear(id); render(); toast('Logged — it will drop down the list for a few days'); break;

    case 'cab-use':  S.cabUse(id); render(); break;
    case 'cab-done': S.cabDone(id); render(); toast('Reset'); break;

    case 'export': {
      const blob = new Blob([S.dump()], {type:'application/json'});
      const u = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = u; link.download = 'jamal-' + S.today() + '.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(()=>URL.revokeObjectURL(u), 1000); break; }
    case 'import': {
      const inp = document.createElement('input'); inp.type='file'; inp.accept='application/json';
      inp.onchange = () => { const f = inp.files[0]; if (!f) return;
        f.text().then(t => { toast(S.restore(t) ? 'Restored' : 'That file did not parse'); render(); }); };
      inp.click(); break; }
    case 'wipe':
      if (confirm('Erase every log, streak and rating on this device? This cannot be undone.')){ S.reset(); render(); }
      break;
  }
});

window.addEventListener('hashchange', render);
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
