/* Jamāl — photography for the fits.
 *
 * The fit book is the most visual thing in this app and it was all text. Each
 * archetype now carries a real photograph matched to its garments — the same
 * rules as Āfāq's imagery: decoration never blocks the page, a transient
 * failure is never cached as "no image", the photographer is credited, and
 * the text never sits on the picture.
 */
const KEY = 'zdZkFzT5JGk1mX02XMV7yvEVptHP3JVsTdPFxQmoUAbIxF8yW19lZgY4';
const CACHE = 'jamal.photos';

const read = () => { try { return JSON.parse(localStorage.getItem(CACHE) || '{}'); } catch { return {}; } };
const write = c => { try { localStorage.setItem(CACHE, JSON.stringify(c)); } catch { /* full */ } };

async function photoFor(id, query) {
  const cache = read();
  if (cache[id] !== undefined) return cache[id];
  try {
    const r = await fetch('https://api.pexels.com/v1/search?query=' + encodeURIComponent(query)
      + '&per_page=1&orientation=landscape', { headers: { Authorization: KEY } });
    if (!r.ok) return null;                    // rate-limited: try again next visit
    const d = await r.json();
    const p = d.photos && d.photos[0];
    cache[id] = p ? { url: p.src.landscape, by: p.photographer, at: p.url } : null;
    write(cache);
    return cache[id];
  } catch { return null; }
}

/** Fill every [data-fitphoto] banner on the page. */
export async function hydrate(root = document) {
  for (const el of root.querySelectorAll('[data-fitphoto]:not([data-done])')) {
    el.setAttribute('data-done', '1');
    const got = await photoFor(el.dataset.fitphoto, el.dataset.q || 'menswear outfit');
    if (!got || !got.url) continue;
    const img = new Image();
    img.src = got.url; img.loading = 'lazy'; img.decoding = 'async';
    img.onload = () => {
      el.style.backgroundImage = `url("${got.url}")`;
      el.classList.add('has-img');
      const c = document.createElement('a');
      c.className = 'ph-credit'; c.href = got.at; c.target = '_blank'; c.rel = 'noopener';
      c.textContent = got.by;
      el.appendChild(c);
    };
    img.onerror = () => {};
  }
}
