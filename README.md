# Jamāl

> إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ — *God is beautiful and loves beauty.* (Ṣaḥīḥ Muslim)

A single tracker for everything that decides how you look and carry yourself: grooming,
skin, hair, fit, scent — and the inside layer that feeds all of them. Offline-first PWA,
no account, no network. Everything lives in `localStorage` on the device.

## The five layers

| Page | What it holds |
|---|---|
| **Today** | What is due now, the next ritual, and the eight inside metrics (sleep, water, daylight, training, protein, no-spike, salah, calm). |
| **Ritual** | Eleven sequenced routines with a step-by-step runner, timers, and the reasoning behind each step. Order carries most of the effect. |
| **Fit** | The uniform: curated outfit formulas filtered by occasion and weather, ten rules, the never-list, palette, and garment care. |
| **Skin** | Root-cause protocols for back acne, closed comedones, redness, dark circles and hair — with a 0–4 daily rating, 14-day sparklines, and the 12-week adapalene ramp. |
| **Log** | Adherence, streaks, a six-week heat grid, cabinet countdowns, 14-day inside averages, and one honest correlation drawn from your own data. |

## Rituals

`Trim & Shave` · `Shower Protocol` · `Mouth & Detail` · `Get Ready — Face` · `Finish — Scent`
· `Evening — Skin` · `Weekly Groom` (Fridays) · `Scalp Massage` · `Scalp Oil Treatment`
· `Keratin Treatment` · `Weekly Audit` (Sundays)

## Design decisions worth knowing

- **Sequence over checklist.** The shower washes the back *after* the conditioner is rinsed;
  the face layer goes thinnest to thickest with lenses last. Those orderings are the content.
- **Every claim carries its mechanism.** Steps show a *Why* or a *Watch out* rather than an
  instruction with no reasoning behind it.
- **The app says when to stop self-treating.** Each concern names the point at which the
  answer is a GP, not a shelf product.
- **Adherence is measured from first use,** not from an arbitrary 30-day window, so it is
  not meaninglessly low in week one.

## Structure

    index.html            shell + bottom nav
    css/app.css           the whole visual system
    js/data.js            all content — rituals, fits, rules, concerns, cabinet
    js/store.js           localStorage, cadence maths, streaks, correlation
    js/app.js             views, router, guided runner
    sw.js                 offline cache (bump CACHE when assets change)

To change what the app says, edit `js/data.js`. The views read from it; nothing is hardcoded
in the templates.

## Local

    python3 -m http.server 8123

## Not medical advice

It is the order of operations a careful person would follow before booking a dermatologist,
and the point at which each front says to book one.
