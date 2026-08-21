/* Jamāl — persistence. One localStorage key, everything derived. */

const KEY = 'jamal.v1';

const BLANK = {
  v: 1,
  done:   {},   // 'YYYY-MM-DD' -> { ritualId: epochMs }
  last:   {},   // ritualId -> 'YYYY-MM-DD'
  cab:    {},   // cabinetId -> { last:'YYYY-MM-DD', uses:n }
  inside: {},   // date -> { metricId: value }
  sev:    {},   // date -> { face,back,eyes,hair: 0..4 }
  worn:   [],   // [{ d, fit }]
  marks:  {},   // ad-hoc counters: id -> [dates]
  set:    { adapaleneStart:null, start:null }
};

let S = load();

function load(){
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(BLANK);
    return Object.assign(structuredClone(BLANK), JSON.parse(raw));
  } catch { return structuredClone(BLANK); }
}
export function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
export function state(){ return S; }
export function reset(){ S = structuredClone(BLANK); save(); }

/* ---------- dates ---------- */
export const iso = d => {
  const x = d ? new Date(d) : new Date();
  return new Date(x.getTime() - x.getTimezoneOffset()*6e4).toISOString().slice(0,10);
};
export const today = () => iso();
export const daysBetween = (a,b) => Math.round((new Date(b+'T00:00') - new Date(a+'T00:00')) / 864e5);
export const shift = (d,n) => iso(new Date(new Date(d+'T00:00').getTime() + n*864e5));
export const since = d => d ? daysBetween(d, today()) : null;

/* First-run stamp — adherence is measured from here, not from the epoch. */
if (!S.set.start){ S.set.start = today(); save(); }

/* ---------- rituals ---------- */
export function isDone(id, d=today()){ return !!(S.done[d] && S.done[d][id]); }

export function complete(id, d=today()){
  (S.done[d] ||= {})[id] = Date.now();
  if (!S.last[id] || S.last[id] < d) S.last[id] = d;
  save();
}
export function uncomplete(id, d=today()){
  if (S.done[d]) delete S.done[d][id];
  const dates = Object.keys(S.done).filter(k => S.done[k][id]).sort();
  S.last[id] = dates.length ? dates[dates.length-1] : undefined;
  save();
}
export function toggle(id, d=today()){ isDone(id,d) ? uncomplete(id,d) : complete(id,d); }

/* Days until a ritual is next due. <=0 means due (or overdue by -n). */
export function dueIn(r){
  const c = r.cadence, last = S.last[r.id];
  if (c.type === 'ondemand') return null;
  /* Never done, long interval: there is no backlog to be "late" on — a fresh
     install should not open with a 3-hour keratin treatment marked due today. */
  if (!last) return (c.type === 'months' || (c.type === 'every' && c.n >= 14)) ? null : 0;
  const gap = since(last);
  if (c.type === 'daily')  return isDone(r.id) ? 1 : 0;
  if (c.type === 'every')  return c.n - gap;
  if (c.type === 'months') return c.n*30 - gap;
  if (c.type === 'weekly'){
    const wd = new Date().getDay();
    if (wd === c.day) return isDone(r.id) ? 7 : 0;
    let d = (c.day - wd + 7) % 7;
    return gap >= 7 ? 0 : d;
  }
  return 0;
}
export const isDue = r => { const n = dueIn(r); return n !== null && n <= 0; };

/* Consecutive-occasion streak: counts back over the days it was actually due. */
export function streak(r){
  let n = 0, d = today();
  const step = r.cadence.type === 'daily' ? 1
             : r.cadence.type === 'every' ? r.cadence.n
             : r.cadence.type === 'weekly' ? 7 : 30;
  if (!isDone(r.id, d)) d = shift(d, -step);
  for (let i=0;i<400;i++){
    let hit = false;
    for (let k=0;k<step;k++) if (isDone(r.id, shift(d,-k))) { hit = true; break; }
    if (!hit) break;
    n++; d = shift(d, -step);
  }
  return n;
}

/* ---------- inside metrics ---------- */
export function inside(d=today()){ return S.inside[d] ||= {}; }
export function setInside(id, v, d=today()){ inside(d)[id] = v; save(); }
export function bumpInside(id, delta, step=1, d=today()){
  const cur = +(inside(d)[id] || 0);
  setInside(id, Math.max(0, Math.round((cur + delta*step)*10)/10), d);
}

/* ---------- severity ---------- */
export function sev(d=today()){ return S.sev[d] || {}; }
export function setSev(id, v, d=today()){ (S.sev[d] ||= {})[id] = v; save(); }
export function sevSeries(id, n=14){
  const out = [];
  for (let i=n-1;i>=0;i--){
    const d = shift(today(), -i);
    out.push(S.sev[d] && S.sev[d][id] != null ? S.sev[d][id] : null);
  }
  return out;
}
export function lastSev(id){
  const keys = Object.keys(S.sev).filter(k => S.sev[k][id] != null).sort();
  return keys.length ? { d: keys[keys.length-1], v: S.sev[keys[keys.length-1]][id] } : null;
}

/* ---------- cabinet ---------- */
export function cab(id){ return S.cab[id] ||= {}; }
export function cabDone(id){ cab(id).last = today(); cab(id).uses = 0; save(); }
export function cabUse(id){ const c = cab(id); c.uses = (c.uses||0)+1; c.last ||= today(); save(); }

/* ---------- marks (ad-hoc counters, e.g. Lumify) ---------- */
export function mark(id){ (S.marks[id] ||= []).push(today()); save(); }
export function marksIn(id, days=7){
  const from = shift(today(), -(days-1));
  return (S.marks[id]||[]).filter(d => d >= from).length;
}

/* ---------- wardrobe ---------- */
export function wear(fit){
  S.worn = S.worn.filter(w => w.d !== today());
  S.worn.push({ d: today(), fit });
  S.worn = S.worn.slice(-200); save();
}
export function wornRecently(fitId, days=6){
  const from = shift(today(), -(days-1));
  return S.worn.some(w => w.fit === fitId && w.d >= from);
}
export const wornToday = () => (S.worn.find(w => w.d === today()) || {}).fit;

/* ---------- aggregate ---------- */
export function dayScore(d=today(), rituals=[]){
  const due = rituals.filter(r => r.cadence.type !== 'ondemand');
  if (!due.length) return 0;
  const hit = due.filter(r => isDone(r.id, d)).length;
  return Math.round(hit / due.length * 100);
}
export function adherence(days, rituals){
  /* Only count days since first use — a 30-day window on day two says 3% and
     tells you nothing except that you are new. */
  const span = Math.min(days, (since(S.set.start) || 0) + 1);
  let hit=0, tot=0;
  for (let i=0;i<span;i++){
    const d = shift(today(), -i);
    rituals.forEach(r=>{
      if (r.cadence.type === 'daily'){ tot++; if (isDone(r.id,d)) hit++; }
    });
  }
  return tot ? Math.round(hit/tot*100) : 0;
}

/* ---------- export / import ---------- */
export function dump(){ return JSON.stringify(S, null, 2); }
export function restore(json){
  try { S = Object.assign(structuredClone(BLANK), JSON.parse(json)); save(); return true; }
  catch { return false; }
}
