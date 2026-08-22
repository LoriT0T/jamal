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
| **Fit** | The uniform: curated outfit formulas filtered by occasion and weather, twenty rules grouped by proportion / layering / colour / accessories / finish / judgement, the never-list, palette, and garment care. |
| **Face** | On-device photo analysis. Tap both pupils, and the image is white-balanced, levelled and rescaled to a fixed interpupillary distance, then sampled in CIE L*a*b* per region — under-eye shadow, redness, texture. Plus the baseline read, the order of operations, and the product shelf. Photos stay in IndexedDB on the device. |
| **Skin** | Root-cause protocols for back acne, closed comedones, redness, dark circles and hair — with a 0–4 daily rating, 14-day sparklines, and the 12-week adapalene ramp. |
| **Log** | Adherence, streaks, a six-week heat grid, cabinet countdowns, 14-day inside averages, and one honest correlation drawn from your own data. |

## Rituals

`Trim & Shave` · `Shower Protocol` · `Mouth & Detail` · `Fit Prep` · `Get Ready — Face`
· `Hair — Style` · `Finish — Scent` · `Evening — Skin` · `Weekly Groom` (Fridays)
· `Scalp Massage` · `Scalp Oil Treatment` · `Keratin Treatment` · `Weekly Audit` (Sundays)

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
    js/mirror.js          on-device colourimetry: white balance, Lab, ROI sampling, IndexedDB
    sw.js                 offline cache (bump CACHE when assets change)

To change what the app says, edit `js/data.js`. The views read from it; nothing is hardcoded
in the templates.

## Local

    python3 -m http.server 8123

## Not medical advice

It is the order of operations a careful person would follow before booking a dermatologist,
and the point at which each front says to book one.

## How the Face measurements work

No server, no vision API, no upload — everything runs in the browser.

1. **White balance.** Each channel's 97th percentile is mapped to 235, so the warm cast of
   a room light does not get read as facial redness.
2. **Alignment.** You tap both pupils. That gives scale, centre and roll, so the photo is
   rotated level and rescaled to a fixed 200px interpupillary distance. Every later photo
   lands in the same coordinate frame — which is what makes two photos comparable rather
   than merely similar.
3. **Sampling.** Regions are defined in interpupillary units, converted sRGB → CIE L\*a\*b\*,
   and reported as trimmed means so a stray hair or a highlight cannot move the number.
   `L*` lightness → under-eye shadow. `a*` red–green → inflammation and post-acne redness.
   local gradient → texture, the proxy for bumps that flat light hides.

The two headline numbers are **differences** (under-eye vs cheek, cheek vs forehead), which
are immune to a global exposure shift and therefore survive being shot on a different day.

Absolute values are not clinical and there is no population norm here. The first reading is
labelled a baseline, not a score, and the app says so.
