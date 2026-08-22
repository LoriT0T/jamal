/* Jamāl — Mirror. On-device face and back analysis.
   No upload, no network, no API. Photos live in IndexedDB on this device only.

   Method, so the numbers mean something:
   1. The photo is white-balanced against its own brightest tones (you shoot
      against a pale wall, so that is a usable white reference).
   2. You tap both pupils. That gives scale, centre and roll, so the image is
      rotated level and rescaled to a fixed interpupillary distance of 200px.
      Every later photo lands in the same coordinate frame — that is what makes
      two photos actually comparable rather than merely similar.
   3. Regions are sampled in units of that distance, converted sRGB -> CIE L*a*b*,
      and reported as trimmed means so a stray hair or highlight cannot move them.
        L*  lightness      -> under-eye shadow, dullness
        a*  red-green axis -> inflammation and post-inflammatory redness
        dL  local gradient -> texture, the proxy for bumps you cannot see flat-on
   Absolute values are not clinical. The trend against your own baseline is the
   signal; that is why the first shot is labelled a baseline and not a score. */

const DB = 'jamal-mirror', STORE = 'shots';
const IPD = 200, CW = 480, CH = 640, CX = 240, CY = 260;

/* ---------------- IndexedDB ---------------- */
function idb(){
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE))
      r.result.createObjectStore(STORE, { keyPath:'id' }); };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function put(shot){
  const d = await idb();
  return new Promise((res, rej) => {
    const t = d.transaction(STORE, 'readwrite');
    t.objectStore(STORE).put(shot);
    t.oncomplete = res; t.onerror = () => rej(t.error);
  });
}
export async function allShots(){
  const d = await idb();
  return new Promise((res, rej) => {
    const t = d.transaction(STORE, 'readonly').objectStore(STORE).getAll();
    t.onsuccess = () => res(t.result.sort((a,b) => b.ts - a.ts));
    t.onerror = () => rej(t.error);
  });
}
export async function delShot(id){
  const d = await idb();
  return new Promise(res => {
    const t = d.transaction(STORE, 'readwrite');
    t.objectStore(STORE).delete(id); t.oncomplete = res;
  });
}

/* ---------------- colour ---------------- */
const lin = c => { c /= 255; return c <= .04045 ? c/12.92 : Math.pow((c+.055)/1.055, 2.4); };
const fl  = t => t > .008856 ? Math.cbrt(t) : 7.787*t + 16/116;

function lab(r, g, b){
  const R = lin(r), G = lin(g), B = lin(b);
  const X = (.4124*R + .3576*G + .1805*B) / .95047;
  const Y = (.2126*R + .7152*G + .0722*B);
  const Z = (.0193*R + .1192*G + .9505*B) / 1.08883;
  const fx = fl(X), fy = fl(Y), fz = fl(Z);
  return [116*fy - 16, 500*(fx - fy), 200*(fy - fz)];
}

/* White-patch balance: map each channel's 97th percentile to 235. Corrects the
   warm cast of a room light, which otherwise reads as facial redness. */
function whiteBalance(data){
  const hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
  for (let i = 0; i < data.length; i += 4){
    hist[0][data[i]]++; hist[1][data[i+1]]++; hist[2][data[i+2]]++;
  }
  const n = data.length / 4, gain = [1,1,1];
  for (let c = 0; c < 3; c++){
    let acc = 0, p = 255;
    for (let v = 255; v >= 0; v--){ acc += hist[c][v]; if (acc >= n * .03){ p = v; break; } }
    gain[c] = p > 20 ? Math.min(2.2, 235 / p) : 1;
  }
  for (let i = 0; i < data.length; i += 4){
    data[i]   = Math.min(255, data[i]   * gain[0]);
    data[i+1] = Math.min(255, data[i+1] * gain[1]);
    data[i+2] = Math.min(255, data[i+2] * gain[2]);
  }
  return gain;
}

const trimmedMean = arr => {
  if (!arr.length) return null;
  const s = arr.slice().sort((a,b) => a-b);
  const lo = Math.floor(s.length * .1), hi = Math.ceil(s.length * .9);
  const cut = s.slice(lo, hi);
  return cut.reduce((a,b) => a+b, 0) / cut.length;
};

/* ---------------- face regions, in interpupillary units ---------------- */
export const ZONES = [
  { id:'forehead', name:'Forehead',      u:[-.55,.55],  v:[-.85,-.45] },
  { id:'eyeL',     name:'Under-eye · L', u:[-.72,-.28], v:[ .18, .40] },
  { id:'eyeR',     name:'Under-eye · R', u:[ .28, .72], v:[ .18, .40] },
  { id:'cheekL',   name:'Cheek · L',     u:[-1.05,-.55],v:[ .55,1.00] },
  { id:'cheekR',   name:'Cheek · R',     u:[ .55,1.05], v:[ .55,1.00] },
  { id:'nose',     name:'Nose',          u:[-.22,.22],  v:[ .30, .75] },
  { id:'chin',     name:'Chin & jaw',    u:[-.35,.35],  v:[1.35,1.70] }
];

/* Draw the photo into a normalised frame: eyes level, IPD fixed, centred. */
export function normalise(img, p1, p2){
  const dx = p2.x - p1.x, dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy);
  if (!isFinite(dist) || dist < 8) return null;   // unlaid-out canvas gives NaN
  const angle = Math.atan2(dy, dx);
  const scale = IPD / dist;
  const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;

  const c = document.createElement('canvas');
  c.width = CW; c.height = CH;
  const ctx = c.getContext('2d', { willReadFrequently:true });
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, CW, CH);
  ctx.translate(CX, CY);
  ctx.rotate(-angle);
  ctx.scale(scale, scale);
  ctx.translate(-mx, -my);
  ctx.drawImage(img, 0, 0);
  return c;
}

export function analyseFace(canvas){
  const ctx = canvas.getContext('2d', { willReadFrequently:true });
  const im = ctx.getImageData(0, 0, CW, CH);
  whiteBalance(im.data);
  const at = (x, y) => {
    const i = ((y|0) * CW + (x|0)) * 4;
    return lab(im.data[i], im.data[i+1], im.data[i+2]);
  };
  const out = {};
  ZONES.forEach(z => {
    const x0 = CX + z.u[0]*IPD, x1 = CX + z.u[1]*IPD;
    const y0 = CY + z.v[0]*IPD, y1 = CY + z.v[1]*IPD;
    const Ls = [], As = [], Gs = [];
    const step = 2;
    for (let y = y0; y < y1 - step; y += step){
      for (let x = x0; x < x1 - step; x += step){
        if (x < 1 || y < 1 || x >= CW-3 || y >= CH-3) continue;
        const [L, a] = at(x, y);
        if (L < 6) continue;                 // black frame from rotation
        Ls.push(L); As.push(a);
        Gs.push(Math.abs(L - at(x+2, y)[0]) + Math.abs(L - at(x, y+2)[0]));
      }
    }
    out[z.id] = Ls.length < 40 ? null : {
      L: +trimmedMean(Ls).toFixed(2),
      a: +trimmedMean(As).toFixed(2),
      d: +trimmedMean(Gs).toFixed(2),
      n: Ls.length
    };
  });

  /* derived, and these are the ones worth reading */
  const cheek = avg2(out.cheekL, out.cheekR, 'L');
  const eye   = avg2(out.eyeL, out.eyeR, 'L');
  out._derived = {
    shadow:  cheek != null && eye != null ? +(cheek - eye).toFixed(2) : null,
    cheekRed: avg2(out.cheekL, out.cheekR, 'a'),
    faceRed:  avg2(out.cheekL, out.cheekR, 'a') != null && out.forehead
      ? +(avg2(out.cheekL, out.cheekR, 'a') - out.forehead.a).toFixed(2) : null,
    foreheadTex: out.forehead ? out.forehead.d : null,
    lightness: cheek
  };
  return out;
}
const avg2 = (a, b, k) => (a && b) ? +((a[k] + b[k]) / 2).toFixed(2) : (a ? a[k] : b ? b[k] : null);

/* ---------------- back / body ---------------- */
export function analyseBack(img){
  const w = 520, h = Math.round(img.height / img.width * 520);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently:true });
  ctx.drawImage(img, 0, 0, w, h);
  const im = ctx.getImageData(0, 0, w, h);
  whiteBalance(im.data);

  const x0 = w*.15|0, x1 = w*.85|0, y0 = h*.12|0, y1 = h*.88|0;
  const As = [], Ls = [], grid = [];
  for (let y = y0; y < y1; y++){
    for (let x = x0; x < x1; x++){
      const i = (y*w + x)*4;
      const [L, a] = lab(im.data[i], im.data[i+1], im.data[i+2]);
      if (L < 12 || L > 97) continue;
      As.push(a); Ls.push(L); grid.push({ x, y, a });
    }
  }
  if (As.length < 500) return null;
  const med = As.slice().sort((p,q) => p-q)[As.length >> 1];
  const mad = trimmedMean(As.map(v => Math.abs(v - med)));
  const thr = med + Math.max(2.2, mad * 3);

  /* count clusters of clearly-redder-than-surround pixels — a lesion proxy */
  const seen = new Set();
  const key = (x,y) => x + ',' + y;
  const hot = new Map(); grid.forEach(g => { if (g.a > thr) hot.set(key(g.x,g.y), g); });
  let count = 0;
  hot.forEach((g, k) => {
    if (seen.has(k)) return;
    let size = 0; const stack = [g];
    seen.add(k);
    while (stack.length && size < 900){
      const p = stack.pop(); size++;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++){
        const nk = key(p.x+dx, p.y+dy);
        if (hot.has(nk) && !seen.has(nk)){ seen.add(nk); stack.push(hot.get(nk)); }
      }
    }
    if (size >= 6 && size <= 700) count++;
  });
  return {
    a: +trimmedMean(As).toFixed(2),
    L: +trimmedMean(Ls).toFixed(2),
    spread: +(thr - med).toFixed(2),
    lesions: count
  };
}

/* ---------------- image loading ---------------- */
export async function loadImage(file){
  const bmp = await createImageBitmap(file, { imageOrientation:'from-image' });
  const max = 1100, s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close?.();
  return c;
}
export const thumb = (canvas, px = 420) => {
  const s = px / Math.max(canvas.width, canvas.height);
  const c = document.createElement('canvas');
  c.width = Math.round(canvas.width*s); c.height = Math.round(canvas.height*s);
  c.getContext('2d').drawImage(canvas, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', .72);
};

/* Lighting sanity — a photo that fails this is not comparable to the last one. */
export function lighting(canvas){
  const ctx = canvas.getContext('2d', { willReadFrequently:true });
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let sum = 0, n = 0, rs = 0, bs = 0, clipped = 0;
  for (let i = 0; i < im.length; i += 40){
    const L = .2126*im[i] + .7152*im[i+1] + .0722*im[i+2];
    sum += L; n++; rs += im[i]; bs += im[i+2];
    if (im[i] > 250 && im[i+1] > 250 && im[i+2] > 250) clipped++;
  }
  const mean = sum/n;
  return {
    mean: +mean.toFixed(1),
    warmth: +((rs - bs) / n).toFixed(1),
    blown: +(clipped/n*100).toFixed(1),
    ok: mean > 70 && mean < 205
  };
}
export const saveShot = put;
