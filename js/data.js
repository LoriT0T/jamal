/* Jamāl — content model.
   Everything the app knows lives here. Edit this file, not the views. */

export const CREED = {
  ar: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',
  en: 'God is beautiful and loves beauty.',
  src: 'Ṣaḥīḥ Muslim'
};

/* ------------------------------------------------------------------ *
 * RITUALS — cadence types: daily | every(n days) | weekly(day) |
 * months(n) | ondemand.  slot: am | pm | any
 * ------------------------------------------------------------------ */
export const RITUALS = [

/* 1 ------------------------------------------------------------- */
{
  id:'reset', name:'Trim & Shave', glyph:'▲', slot:'am', mins:18,
  kicker:'The clean edge', cadence:{type:'every', n:3},
  blurb:'Beard, moustache, brows. The base everything else sits on.',
  steps:[
    { t:'Warm the hair first',
      d:'Ninety seconds of a hot damp towel on the beard, or shave straight after the shower. Warm, wet keratin loses roughly a third of its stiffness — the blade then cuts hair instead of dragging skin.',
      secs:90,
      note:{k:'why', x:'You currently shave before showering. Flip it for two weeks and watch the neck. Post-shower is the single cheapest fix for razor burn and ingrowns, and it costs you nothing.'} },
    { t:'Lather — never dry, never bare',
      d:'Pre-shave oil or a proper cream. A thin, slick film. Skip the neck at your peril: it is the one place that always retaliates.' },
    { t:'Shave with the grain',
      d:'Cheeks grow down, so pull down. The neck grows up and sideways, so follow it — do not just sweep upward because it feels faster. Two light passes beat one hard one. Let the razor weight do the cutting; pressure is what causes the burn.',
      note:{k:'why', x:'Against-the-grain gives you a closer shave for about four hours and an ingrown for about four days. Not a trade worth making on a face that already runs red.'} },
    { t:'Moustache — comb down, cut to the lip line',
      d:'Comb the whole thing straight down and trim along the top edge of the upper lip. Follow its natural arc. Leave the peak at the centre alone — flattening it is what makes a moustache look drawn on.' },
    { t:'Brows — under and between only',
      d:'Strays between the brows and a clean line underneath. Never above the arch: that upper line is what reads as "done to". Length comes down with a comb and scissors, not by thinning the body of the brow.',
      note:{k:'watch', x:'Two brows, one face — symmetry is checked at arm’s length in daylight, not at 10cm under a bathroom bulb. Close-up mirrors are how people over-pluck.'} },
    { t:'Cold rinse, then something calm',
      d:'Cold water closes it down. Aloe, witch hazel, or a plain fragrance-free balm. No alcohol splash — for skin that flushes, that is pouring petrol on it.',
      secs:30 },
    { t:'Log the blade',
      d:'Mark a use. Blades are good for five to seven shaves. Almost every "sensitive skin" complaint is a dull blade with a plausible alibi.',
      log:'blade' }
  ]
},

/* 2 ------------------------------------------------------------- */
{
  id:'shower', name:'Shower Protocol', glyph:'≋', slot:'am', mins:16,
  kicker:'Order is the medicine', cadence:{type:'daily'},
  blurb:'Sequenced so the conditioner never touches your back last.',
  steps:[
    { t:'Warm, not hot — 60 seconds',
      d:'Hot water strips the lipid barrier. A stripped barrier is redder, flakier, and produces more oil to compensate. Warm enough to relax, not to turn you pink.',
      secs:60 },
    { t:'Shampoo the scalp, not the lengths',
      d:'Fingertips at the roots, two minutes of actual massage. That massage does more for your hair than any product in the rack.',
      secs:120 },
    { t:'Conditioner — mid-lengths and ends. Leave it in.',
      d:'Roots do not need it. Work it through the bottom two thirds, then leave it while you do the next step. Three minutes.',
      secs:180 },
    { t:'Rinse hair completely — then face away',
      d:'Rinse until the water runs clear, with your back to the stream so nothing runs down it.',
      note:{k:'why', x:'This is the bacne fix nobody tells you. Conditioner rinses down your back and its silicones and fatty alcohols sit in the follicles there. Wash your back AFTER the hair, every time, without exception. Change nothing else and this alone moves the needle in about three weeks.'} },
    { t:'Back and chest — benzoyl peroxide, 2 minutes on',
      d:'A 4–5% benzoyl peroxide wash. Lather over the back and shoulders and leave it sitting there while you do something else. Contact time is the active ingredient; rinsing it off immediately is washing money down the drain.',
      secs:120,
      note:{k:'watch', x:'It bleaches fabric. White towel, old shirt, and pale sheets. Every dark towel you own will develop orange patches otherwise.'} },
    { t:'Lymphatic drainage — 5 minutes, with slip',
      d:'Order matters more than pressure. 1) Clavicle: pump the hollows above your collarbones ten times. This opens the drain — always first. 2) Neck: light downward strokes from behind the ear to the collarbone, ten each side. 3) Jaw: from the chin along the jawline to the ear, then down the neck, ten. 4) Face: centre outward to the temples, ten. 5) Armpits: pump ten, then stroke the arm toward the armpit.',
      secs:300,
      note:{k:'why', x:'Lymph sits just under the skin and has no pump of its own. You are moving skin, not massaging muscle — if the tissue underneath moves, you are pressing far too hard. It is a puffiness and definition tool, not a fat-loss one, and it wants slip: do it with the conditioner or oil still on.'} },
    { t:'Cold finish — 45 seconds',
      d:'Cold on the face, neck and chest. Vasoconstriction buys you an hour of less redness and less puffiness. Do it right before you get out, and start it on the feet if the shock is too much.',
      secs:45 },
    { t:'Pat dry with a clean towel',
      d:'Pat, do not scrub. If you are fighting back acne, a fresh towel every third use — a damp towel on a radiator is a bacterial culture with a job title.' }
  ]
},

/* 3 ------------------------------------------------------------- */
{
  id:'mouth', name:'Mouth & Detail', glyph:'◇', slot:'am', mins:8,
  kicker:'The close-range details', cadence:{type:'daily'},
  blurb:'Everything judged from under a metre away. Twice a day.',
  steps:[
    { t:'Tongue — scrape, do not brush',
      d:'A steel scraper, five to seven passes from back to front, rinsing between. A brush smears the biofilm around; a scraper lifts it off.',
      note:{k:'why', x:'Around 85% of ordinary bad breath is generated on the back third of the tongue. This is thirty seconds and outperforms mouthwash.'} },
    { t:'Brush — two minutes, 45 degrees',
      d:'Angle the bristles into the gum line, small circles, no scrubbing. Two full minutes; almost everyone stops at forty-five seconds and believes it was two.',
      secs:120 },
    { t:'Spit, do not rinse',
      d:'Rinsing with water washes the fluoride straight off the teeth. Spit and leave it. The single highest-return dental habit and it takes negative effort.' },
    { t:'Floss or interdental brushes',
      d:'Two of the five surfaces of every tooth are only reachable here — that is 40% of your teeth you have not been cleaning. It is also where most staining between the front teeth starts.' },
    { t:'Lips — brush, then balm',
      d:'Twenty seconds with a soft brush, then balm immediately while the lips are still damp.',
      secs:20,
      note:{k:'watch', x:'Cap this at two or three times a week, not daily. Constant scrubbing keeps the lips inflamed, and chronic inflammation is exactly what makes lips look darker over time — the opposite of what you are scrubbing for.'} },
    { t:'Saline through the nose',
      d:'Both nostrils, head tipped slightly forward, breathe through the mouth.',
      note:{k:'why', x:'Keep this daily — it may be doing more for your dark circles than any eye cream. Blocked nasal passages congest the veins that drain the under-eye, and the pooled blood shows through thin skin. Dermatology literally calls them allergic shiners. You are already treating a root cause here without realising it.'} },
    { t:'Nails and hands',
      d:'Short, filed level, cuticles pushed back after the shower when they are soft. Hand cream at night.',
      note:{k:'why', x:'Hands are the second thing a person looks at and the first thing they see when you speak with them. They are also the most under-maintained part of a good grooming routine.'} }
  ]
},

/* 3b ------------------------------------------------------------ */
{
  id:'prep', name:'Fit Prep', glyph:'▤', slot:'any', mins:12,
  kicker:'The garment, before the body', cadence:{type:'ondemand'},
  blurb:'Lint, press, de-pill, hang. Best done the night before.',
  steps:[
    { t:'Pick the fit first',
      d:'Decide before you prep — pressing the wrong shirt is twelve minutes gone. Pick it the night before and the morning stops being a decision.',
      goto:'#/fit' },
    { t:'Press it — fabric decides the method',
      d:'Cotton shirt: hot iron, slightly damp, and work in order — collar, cuffs, yoke, sleeves, body. Wool trousers: steam only, or a warm iron through a pressing cloth, pressing down and lifting rather than dragging. Knits: steam held just off the surface, never touching.',
      note:{k:'watch', x:'A hot dry iron directly on wool is what puts that permanent shine on a trouser leg, and it does not come out. If a piece is wool, the default tool is steam, not contact. Never iron over buttons or a zip — go around them.'} },
    { t:'De-pill — lay flat, tension the fabric',
      d:'Fabric shaver over knits, wool and anything with a nap. Flatten the area over a table, hold it taut, work in one direction, and lift off before you reach a seam.',
      note:{k:'why', x:'Pilling is the single strongest signal that a good garment has aged badly — and it is entirely reversible in about two minutes per piece. This is the highest return-per-minute maintenance in the whole wardrobe.'} },
    { t:'Lint roll — including the back',
      d:'Top down, whole garment, both sides. The back of the shoulders is the part you never see and everyone walking behind you does. On black wool, lint is more visible than the cut of the garment.',
      secs:60 },
    { t:'Threads, buttons, marks',
      d:'Snip loose threads flush — never pull one, that is how a seam unravels. Check every button is tight, the hem is intact, and there are no white deodorant marks inside the collar or under the arms.' },
    { t:'Shoes wiped, laces straight',
      d:'Thirty seconds. Clean shoes carry a fit that is otherwise plain; scuffed shoes undo one that is otherwise perfect.',
      secs:30 },
    { t:'Hang it ready — properly',
      d:'Broad wooden hanger for jackets and coats so the shoulder keeps its shape; wire hangers put a permanent dent in the shoulder line. Trousers clipped at the hem or folded over a felted bar so the crease falls straight. Shirt buttoned at the top. Two centimetres of air between garments — a crushed rail creases everything on it.',
      note:{k:'watch', x:'Never hang knitwear. A hanger stretches the shoulders of a sweater permanently within a few wears — knits are folded, always. And never hang anything damp: that is how a wardrobe grows a smell you cannot iron out.'} },
    { t:'Anything actually soiled goes in the dry-clean pile',
      d:'Not everything worn — only what is genuinely marked. The fortnightly run is a batch, not a blanket policy.',
      log:'dryclean',
      note:{k:'why', x:'Dry cleaning solvent is hard on wool and strips the natural oils out of the fibre. Over-cleaning ages a good suit faster than wearing it does. Brush, steam and air between wears; send it when it is dirty, not on a timer.'} }
  ]
},

/* 4 ------------------------------------------------------------- */
{
  id:'ready', name:'Get Ready — Face', glyph:'◉', slot:'any', mins:10,
  kicker:'Thinnest to thickest, lenses last', cadence:{type:'ondemand'},
  blurb:'The going-out layer. The order is not cosmetic — it decides whether it sits or pills.',
  steps:[
    { t:'Clean, dry, moisturised — then wait',
      d:'A light moisturiser two to three minutes before sunscreen. Applying SPF onto a wet layer is the single reason tinted sunscreen pills and rolls off the jaw.',
      secs:150 },
    { t:'Lumify — one drop, then blot',
      d:'One drop each eye, look up, close for sixty seconds, blot the overflow. Before contacts, never onto lenses.',
      secs:60,
      log:'lumify',
      note:{k:'watch', x:'Brimonidine works by constricting the vessels. Every vasoconstrictor carries a rebound risk — the eye adapts and gets redder at baseline without it. Treat it as an occasion tool, three or four times a week at most. The app counts your uses. If your eyes are red most days, the cause is upstream: sleep, screens, lens wear time, or dry eye — and that is what to fix.'} },
    { t:'Tinted SPF — two finger-lengths, face and neck',
      d:'The Rimmel tint, warmed between the fingers, pressed on rather than rubbed in. Take it down onto the neck and out over the ears.',
      note:{k:'why', x:'The line at the jaw is the only thing that makes tint read as makeup rather than as skin. Blend past the jaw and the whole thing becomes invisible. Also: consistent daily SPF is the highest-yield thing you can do for redness and post-acne marks — those marks fade in months with it and stay for years without it.'} },
    { t:'Under-eye — triangle, tapped, thin',
      d:'A small triangle from the inner corner down toward the cheek, not a stripe along the lash line. Tap with a warm fingertip. Thin coats — one that sits well beats two that crease.',
      opt:true },
    { t:'Jawline — contour, not concealer',
      d:'For a sharper jaw you want a shade darker, not lighter: a soft line just under the mandible from below the ear toward the chin, stopping two fingers short of it, blended downward into the neck. Lighter concealer on a jaw does the opposite of what you want — it flattens.',
      opt:true,
      note:{k:'watch', x:'Daylight is the referee. Anything you blend under a warm bathroom bulb will look like a stripe outdoors. Check it by a window before you leave.'} },
    { t:'Brow gel — up at the head, along the arc',
      d:'Brush the first third straight up, then follow the natural arc out to the tail. Clear or one shade lighter than the hair. Tinted gel on a full brow reads drawn on.' },
    { t:'Lip balm — pick one focal point',
      d:'Clear on a day when the face is doing something else; the red tint when the rest of the face is quiet. One point of colour on a face reads deliberate. Two reads made-up.' },
    { t:'Contacts — always last',
      d:'Hands washed and fully dried. Every drop, cream and spray goes on before the lenses. Sunscreen on a fingertip transferring to a lens will ruin the next four hours.',
      note:{k:'why', x:'Lenses also mean the eye is drier by hour six, which is itself a cause of the redness you are treating at step two. Rewetting drops in the bag beats a second dose of Lumify.'} },
    { t:'Arm’s length, daylight, ten seconds',
      d:'Step back to a window. You are checking three things only: patchiness on the jaw and neck, brows even, nothing on the collar. Everything else is invisible to other people.' }
  ]
},

/* 4b ------------------------------------------------------------ */
{
  id:'hairstyle', name:'Hair — Style', glyph:'≈', slot:'any', mins:9,
  kicker:'Dry it into the shape', cadence:{type:'ondemand'},
  blurb:'Towel, salt, dry, set. The shape is decided in the last 20% of drying.',
  steps:[
    { t:'Towel — squeeze and blot, never rub',
      d:'Press the water out in sections. A microfibre towel or an old cotton t-shirt, not a terry bath towel.',
      note:{k:'why', x:'Wet hair is at its weakest — the swollen keratin loses a large share of its strength, and the cuticle scales are lifted. Rubbing a rough towel across lifted scales is mechanical damage in the most literal sense, and it is the frizz you spend the rest of the routine fighting. This one habit is worth more than any product below it.'} },
    { t:'Detangle damp, wide-tooth comb, ends first',
      d:'Start at the ends and work up in short sections. Never take a brush to soaking hair — a brush pulls through knots that a comb would have released.' },
    { t:'Sea salt spray on damp, not soaking',
      d:'Mid-lengths and ends, a few pumps, scrunch it in with the hands. Keep it off the scalp.',
      note:{k:'watch', x:'Salt spray works by roughening the cuticle slightly — the grip and texture are the damage, that is the mechanism. So treat it as an occasion product rather than a daily one, always condition the day you use it, and never layer it onto hair that is already dry and brittle.'} },
    { t:'Blow dry — 80% hot, last 20% cool',
      d:'Nozzle on, about fifteen centimetres away, dryer moving constantly. Direct the airflow from root to tip, following the shaft downward, which lies the cuticle flat instead of flaring it. Point the hair in the direction you want it to sit while it dries.',
      secs:240,
      note:{k:'why', x:'The shape sets as the hair cools, not while it is hot — so the last twenty percent on the cool setting is what actually holds the style, and it holds it far better than product does. Skipping the cool shot is why a blow-dry drops within the hour.'} },
    { t:'Heat protectant if this is a habit',
      d:'Once or twice a week, skip it. Most days of the week, use it — and non-negotiable while a keratin treatment is in.' },
    { t:'Pomade — only if the length asks for it',
      d:'Warm a small amount fully between the palms until it goes clear and almost disappears, then apply from the back of the head forward, roots last. Matte clay rather than shine for short hair.',
      opt:true,
      note:{k:'why', x:'Your hair is currently too short for this to do much, and short hair with visible product in it reads worse than short hair with none. Skip it until the length is back — that is what the optional flag is for. Blow-drying into shape is doing the work product would otherwise be asked to do badly.'} },
    { t:'Neckline check in the mirror',
      d:'Hair styled against a two-week-old neckline is an incoherent picture. If the edges have gone soft, that is the trimmer, not more product.' }
  ]
},

/* 5 ------------------------------------------------------------- */
{
  id:'scent', name:'Finish — Scent', glyph:'❧', slot:'any', mins:3,
  kicker:'Discovered, not announced', cadence:{type:'ondemand'},
  blurb:'Lotion first. It is the difference between two hours and eight.',
  steps:[
    { t:'Unscented lotion on the pulse points first',
      d:'Neck, chest, inner elbow. Fragrance oil binds to skin lipids — on dry skin the top notes evaporate and take the rest with them. This is the whole trick, and you already do it. Keep it unscented so it does not argue with the perfume.' },
    { t:'Two to four sprays, from 15cm',
      d:'Sternum first — warmth rises, so a chest spray reaches you and whoever is close, all day. Then the sides of the neck. One on the inside of a collar or a scarf if you want it to last past the evening; fabric holds scent far longer than skin.' },
    { t:'Never rub the wrists together',
      d:'Friction and heat destroy the top notes and force the dry-down early. Spray and leave it.' },
    { t:'The sillage rule',
      d:'Someone should find it when they are already in your space, not before they arrive. If you can still smell it on yourself after thirty minutes, that is one spray too many — you have gone nose-blind and everyone else has not.',
      note:{k:'why', x:'Over-application is the most common failure and the least self-correctable, because you are the only person in the room who cannot detect it. When in doubt, one spray fewer.'} },
    { t:'Match the scent to the room',
      d:'Day and university: clean, woody, low projection. Evening and guests: amber, oud, resin — earned, and only where the room is not shared with people who did not choose it. Gym and mosque: none. A shared prayer row is the wrong place for projection.' }
  ]
},

/* 6 ------------------------------------------------------------- */
{
  id:'night', name:'Evening — Skin', glyph:'☾', slot:'pm', mins:7,
  kicker:'Where the real fixing happens', cadence:{type:'daily'},
  blurb:'Makeup covers. This is the layer that actually changes the skin.',
  steps:[
    { t:'Double cleanse — but only on tint days',
      d:'A balm or oil first to break down the sunscreen and tint, then a gentle gel with lukewarm water. On a bare-face day, one gentle wash is enough — over-cleansing makes redness worse.',
      note:{k:'why', x:'Sunscreen and tint left on overnight are a leading cause of exactly what you have: small closed bumps along the jaw, temples and forehead that never come to a head. If you wear tint and only single-cleanse, the residue is the mechanism. Fix this before you buy a single new product.'} },
    { t:'Dry the face fully — wait a minute',
      d:'Retinoids on damp skin penetrate faster and irritate more. Wait until genuinely dry.',
      secs:60 },
    { t:'Adapalene 0.1% — one pea, whole face',
      d:'A single pea-sized amount for the entire face, spread thin. Avoid the eyelids, the corners of the nose and the lip line. Closed comedones — bumps that never surface — are the textbook indication for a retinoid, and adapalene is available over the counter.',
      note:{k:'watch', x:'Ramp, do not sprint. Weeks 1–2: two nights a week. Weeks 3–4: alternate nights. Week 5 on: nightly. Weeks 2 to 6 usually look worse before better as everything already forming under the surface gets pushed out — that is the purge, and quitting during it is the most common way people lose the treatment. Judge it at week 12, not before.'} },
    { t:'Moisturiser — ceramides, boring, fragrance-free',
      d:'If it stings, sandwich it: moisturiser, then adapalene, then moisturiser. That cuts irritation substantially and barely touches the effect.' },
    { t:'Hands off. Every pick costs a fortnight.',
      d:'A squeezed closed comedone becomes an inflamed papule and then a brown mark that outlasts it by two to six months. No picking, no scrubs, no alcohol toners, no more than one new active at a time.' },
    { t:'Pillowcase check',
      d:'Twice a week while you are fighting this, and sleep on your back if you can. Face-down on a four-day-old pillowcase undoes half of the above.',
      log:'pillow' }
  ]
},

/* 7 ------------------------------------------------------------- */
{
  id:'body', name:'Weekly Groom', glyph:'✦', slot:'any', mins:20,
  kicker:'Body, feet, edges', cadence:{type:'weekly', day:5},
  blurb:'Scheduled for Friday — the sunnah cadence for trimming and washing before Jumuʿah.',
  steps:[
    { t:'After the shower, never before',
      d:'Warm, softened skin and hair. Trim first with a guard, then shave — taking a razor to untrimmed hair is what clogs the blade and drags the skin.' },
    { t:'Underarms and body — with the grain, taut skin',
      d:'Skin pulled tight with the other hand, short strokes, fresh blade, plenty of slip. Rinse the blade every couple of passes.' },
    { t:'Nothing fragranced for twelve hours after',
      d:'Freshly shaved skin has no barrier left. Alcohol and fragrance on it is the burn people mistake for razor rash. Plain, unscented, or nothing.' },
    { t:'Antiperspirant goes on at night',
      d:'Apply it to dry underarms before bed, not in the morning.',
      note:{k:'why', x:'Aluminium salts need low sweat flow to form the plugs that block the ducts. Overnight the flow is minimal, so the plugs form properly and survive the next morning’s shower. Same product, roughly double the effect, purely from timing. Applied in the morning, most of it washes away in your own sweat within the hour.'} },
    { t:'Ingrown prevention — acid, not scrub',
      d:'A glycolic or salicylic pad over the shaved areas twenty-four hours later, twice a week. Chemical exfoliation clears the follicle opening; physical scrubbing inflames it and buries the hair deeper.' },
    { t:'Back — the long-handled brush',
      d:'A salicylic pad or brush on the back and shoulders, twice a week. Not daily, and never with a rough scrub.' },
    { t:'Feet',
      d:'Heel file on dry heels, nails cut straight across, dry between the toes. Rotate shoes so each pair dries out for a day.' },
    { t:'Ears, nose, neckline',
      d:'Trimmer on ears and nose. The neckline behind and below the jaw is the thing that separates a fresh cut from a two-week-old one — clean it weekly and your haircut lasts a third longer.' }
  ]
},

/* 8 ------------------------------------------------------------- */
{
  id:'scalp', name:'Scalp Massage', glyph:'◍', slot:'pm', mins:5,
  kicker:'The part that actually has evidence', cadence:{type:'every', n:2},
  blurb:'Five minutes, dry hair, no product needed.',
  steps:[
    { t:'Fingertips, not nails — small circles',
      d:'Move the scalp over the skull rather than sliding fingers over the scalp. Cover the whole head with attention to the temples and crown.',
      secs:300,
      note:{k:'why', x:'Standardised scalp massage has small but real trial support for hair thickness, and the proposed mechanism is mechanical stretch on the dermal papilla cells — not circulation, as usually claimed. The dose is frequency: about four minutes most days for six months. A monthly oil ritual has effectively none of that dose. This is the cheap habit hiding inside the expensive one.'} }
  ]
},

/* 9 ------------------------------------------------------------- */
{
  id:'hairoil', name:'Scalp Oil Treatment', glyph:'❂', slot:'any', mins:60,
  kicker:'Diluted, on scalp, massaged in', cadence:{type:'every', n:30},
  blurb:'Your monthly rosemary mix — done so it can actually work.',
  steps:[
    { t:'Mix it properly — dilution matters',
      d:'Three to five drops of rosemary essential oil per 10ml of carrier. Jojoba is closest to your own sebum and rinses out cleanest; castor is thicker and heavier and needs two washes. Undiluted essential oil on the scalp causes contact dermatitis, which costs you more hair than it saves.' },
    { t:'Part in sections — scalp only',
      d:'Part the hair in rows and apply to the skin, not the lengths. Oil on the mid-lengths is a conditioning treatment, which is a different job. The follicle is in the scalp.' },
    { t:'Massage five minutes',
      d:'This is not optional padding. The massage is the part with the strongest evidence; the oil is the part with the interesting single trial.',
      secs:300,
      note:{k:'why', x:'A 2015 randomised trial found rosemary oil comparable to 2% minoxidil at six months for androgenetic alopecia, with less scalp itching. One trial, modest size — worth doing, not worth a monthly ceremony as a substitute for the daily habit. Anything working on hair works on a six-month clock.'} },
    { t:'Leave 30–60 minutes',
      d:'Longer is not better and overnight risks folliculitis on an oil-occluded scalp. Set it, do something else, wash it out.',
      secs:1800 },
    { t:'Shampoo twice',
      d:'First wash lifts the oil, second actually cleans. Then condition the lengths only — and wash your back after, as always.',
      log:'hairoil' }
  ]
},

/* 10 ------------------------------------------------------------ */
{
  id:'keratin', name:'Keratin Treatment', glyph:'❖', slot:'any', mins:180,
  kicker:'Every 5 months, when the length is there', cadence:{type:'months', n:5},
  blurb:'The aftercare decides whether it lasts three months or six.',
  steps:[
    { t:'Book it before the frizz returns',
      d:'The result is better applied to hair in decent condition than to hair that has been fighting humidity for six weeks. Book roughly a week before you think you need it.' },
    { t:'72 hours: no water, no tie, no tuck',
      d:'No washing, no ponytail, no ear-tuck, no hat, no sunglasses pushed up. Any bend set into the hair in the first three days can set permanently. This is where most treatments are quietly ruined.' },
    { t:'Sulfate-free and sodium-chloride-free from now on',
      d:'Check the label for sodium chloride as well as sulfates — salt strips the treatment faster than sulfates do and is in a surprising number of "gentle" shampoos.' },
    { t:'Chlorine and salt water are the enemy',
      d:'Wet the hair with clean water and put conditioner in before a pool. Saturated hair absorbs far less chlorinated water.' },
    { t:'Silk pillowcase, dry before sleeping',
      d:'Friction is the slow leak. Sleeping on wet treated hair is the fast one.' },
    { t:'Log the date',
      d:'Marking it lets the app learn your real interval instead of assuming five months.',
      log:'keratin' }
  ]
},

/* 11 ------------------------------------------------------------ */
{
  id:'audit', name:'Weekly Audit', glyph:'▣', slot:'pm', mins:8,
  kicker:'The layer above the layers', cadence:{type:'weekly', day:0},
  blurb:'Six minutes on Sunday buys back an hour of weekday decisions.',
  steps:[
    { t:'Rate the four fronts',
      d:'Face clarity, back, under-eyes, hair. Scored 0 to 4 on the Skin page. Score it in the same light at the same time of day or the numbers mean nothing.',
      goto:'#/skin' },
    { t:'Check the cabinet',
      d:'Blades, lens solution, sunscreen, adapalene, balm. Anything under two weeks of runway gets ordered today, not on the morning it runs out.',
      goto:'#/log' },
    { t:'Laundry that touches your face',
      d:'Pillowcases, towels, gym kit. Two pillowcases a week while the skin is a live problem. Skip fabric softener on anything that touches the back — it leaves a film in the fibres.' },
    { t:'Shoes',
      d:'Wipe the white Arigato soles down while the marks are fresh; a magic sponge takes the scuffs off the midsole in seconds. Leather balm on the brown Polos every six weeks. Cedar trees in both overnight — they pull moisture and hold the shape, and they are the reason good shoes last a decade.' },
    { t:'Garments',
      d:'De-pill the knits, steam the turtlenecks, brush the wool trousers. Wool wants airing and brushing, not washing — dry clean three or four times a year at most, or you will strip it dead.' },
    { t:'Plan three fits for the week',
      d:'Pick them now while you are calm. Morning decisions made under time pressure are where the routine breaks and you end up in whatever is clean.',
      goto:'#/fit' },
    { t:'The inside audit',
      d:'Sleep average, water, training, screens before bed. Then the honest question: which of this week’s slips were about the mirror and which were about the day you were having? The face reports on the life. If the sleep column is bad, no serum on earth fixes the under-eyes.' }
  ]
}
];

/* ------------------------------------------------------------------ *
 * WARDROBE — a uniform, not a wardrobe. Curated formulas, filtered
 * by occasion and weather. Everything obeys the rules below.
 * ------------------------------------------------------------------ */

export const PALETTE = [
  { hex:'#111111', name:'Black',    role:'Base. Shoes, knits, outerwear.' },
  { hex:'#3a3a3c', name:'Charcoal', role:'The workhorse trouser.' },
  { hex:'#8b8b86', name:'Grey',     role:'Knitwear, mid layers.' },
  { hex:'#1f2733', name:'Navy',     role:'The only "colour" that behaves.' },
  { hex:'#e6dfd2', name:'Bone',     role:'Shirts, tees, contrast.' },
  { hex:'#b39a72', name:'Camel',    role:'Coat, knit. Warms the whole fit.' },
  { hex:'#5a5a45', name:'Olive',    role:'Outerwear only.' },
  { hex:'#6b4f3a', name:'Brown',    role:'Shoes, belt, suede.' }
];

export const NEVER = [
  'Jeans — no denim in the rotation, ever.',
  'Cargo, technical or utility trousers.',
  'Graphics, logos, slogans, visible branding.',
  'Puffers and thick duffles. Bulk reads as bin bag on a lean frame.',
  'More than three colours in one fit.',
  'Black belt with brown shoes, or the reverse.',
  'Trousers that puddle over the shoe.',
  'Two statement pieces at once.'
];

export const RULES = [
  /* ---- proportion ---- */
  { g:'Proportion', t:'The rule of thirds',
    d:'Split yourself one-third to two-thirds, never in half. The hem of your top layer is the lever: sitting around the hip bone it gives roughly a third above and two thirds below, which reads long-legged and balanced. A hem landing at the mid-point of your height cuts you exactly in half — the most common proportion mistake there is, and the reason a good sweater can still look wrong. A long overcoat inverts it deliberately to two-thirds over one, which also works. Halves never do.' },
  { g:'Proportion', t:'Contrast the fit, not the colour',
    d:'Relaxed on top wants clean and tapered below. Both loose reads sloppy; both slim reads try-hard. This one rule does more for a silhouette than any purchase.' },
  { g:'Proportion', t:'Visual weight balances diagonally',
    d:'Heavy or textured on top asks for something lean and smooth below. A chunky knit over wide trousers is two heavy blocks with no line between them. Bulk in one place is a statement; bulk everywhere is a shape.' },
  { g:'Proportion', t:'No break, or a slight one',
    d:'Trousers should touch the top of the shoe and stop. A single soft break is fine. Fabric pooling at the ankle undoes an expensive trouser in one glance — and this is a five-pound alteration.' },
  { g:'Proportion', t:'Shoes set the ceiling',
    d:'The whole fit is capped by the most casual thing you are wearing, and that is almost always the shoe. Walking shoes cap it at casual no matter what is above them. The black Arigato take you to semi-formal and no further — for anything above that you need a leather sole.' },

  /* ---- layering ---- */
  { g:'Layering', t:'Thinnest to thickest, and each hem deliberate',
    d:'Layers go fine to heavy outward. Hems should differ clearly — a shirt tail showing two centimetres below a knit reads accidental, showing five reads intended, showing none reads clean. What you cannot do is land within a centimetre of the layer above and hope.' },
  { g:'Layering', t:'Every layer stands alone',
    d:'If you take the outer layer off in a room, what remains has to be a complete outfit. A layer that only works as filler is a layer you will be stuck in all day.' },
  { g:'Layering', t:'Collar out, no tie',
    d:'Your button-up under a crewneck or turtleneck: collar sits outside, cuffs may show a centimetre. Keep the collar structured enough to stand — a limp collar under a knit is the difference between deliberate and dishevelled.' },
  { g:'Layering', t:'Keep the fabric weights in one season',
    d:'Linen under tweed, or a summer polo under a winter coat, reads as improvisation even when the colours agree. Weight is as visible as colour and gets checked far less often.' },

  /* ---- colour ---- */
  { g:'Colour', t:'Sixty, thirty, ten',
    d:'One colour carries about 60% of the fit, a second about 30%, and roughly 10% is the accent — for you that is almost always a leather tone at the shoes, belt or strap. Three colours maximum, one of them a neutral base.' },
  { g:'Colour', t:'Temperature has to agree',
    d:'Black shoes pull the fit cool: grey, charcoal, navy, black, bone. Brown shoes pull it warm: camel, olive, cream, brown. Mixing the two is the most common quiet mistake in an otherwise good outfit.' },
  { g:'Colour', t:'Texture instead of colour',
    d:'Since you do not wear colour, the fit needs another axis or it goes flat: ribbed knit, flannel, wool with a visible weave, suede, matte leather. Three greys in three textures looks considered. Three greys in three cottons looks like laundry day.' },

  /* ---- accessories ---- */
  { g:'Accessories', t:'Three points, and usually one',
    d:'Watch, glasses, ring — cap it at three and understand that for the look you want, one is normally the right answer. Every added point moves you from put-together toward performed.' },
  { g:'Accessories', t:'Match metal to metal, leather to leather',
    d:'All silver or all gold, never both. Belt leather matches shoe leather in colour and finish; a watch strap counts. This is the detail people cannot name but can always see.' },

  /* ---- finish ---- */
  { g:'Finish', t:'Presentation is half the garment',
    d:'Lint-rolled including the back of the shoulders, de-pilled, pressed, no loose threads, clean shoes. An unpressed good coat looks worse than a pressed cheap one, and the difference costs ten minutes rather than money.' },
  { g:'Finish', t:'Grooming is part of the outfit',
    d:'A pressed fit over a two-week-old neckline is an incoherent picture. The fit and the face are read at the same time, by the same glance, and the weaker of the two sets the impression.' },
  { g:'Finish', t:'Quality signals at conversational distance',
    d:'Nobody clocks the brand. They clock the drape of the fabric, whether the shoulder seam sits on your shoulder, and whether the shoes are clean. Those three are 80% of looking expensive, and none of them is a logo.' },

  /* ---- judgement ---- */
  { g:'Judgement', t:'One point of interest',
    d:'The leather jacket, or the texture, or the colour — one of them. Everything else is quiet. This is the exact dial between "put together" and "trying to be seen", and it is what keeps you from reading as arrogant.' },
  { g:'Judgement', t:'Dress for the room you are entering',
    d:'One notch above the room reads respectful. Two notches above reads as a statement about everyone else in it. As a student, one notch is your whole strategy.' },
  { g:'Judgement', t:'Rain has an answer that is not a puffer',
    d:'Waxed cotton or an unlined technical mac in black or olive, worn over fine merino. In Derby that beats a puffer on warmth-per-bulk anyway — the puffer is warm for a walk to the car and useless once you are inside a building for six hours.' }
];

/* temp bands: freeze <4 · cold 4–9 · cool 10–15 · mild 16–21 · warm 22+ */
export const OCCASIONS = [
  { id:'uni',    name:'University' },
  { id:'out',    name:'Errands' },
  { id:'dinner', name:'Dinner / Guests' },
  { id:'jumua',  name:'Jumuʿah / Mosque' },
  { id:'formal', name:'Presenting' },
  { id:'gym',    name:'Gym' },
  { id:'travel', name:'Travel' }
];

export const FITS = [
  { id:'f1', name:'The Default', kicker:'Your signature, refined',
    occ:['uni','out','travel'], temps:['cold','cool','mild'], rain:false,
    layers:{ Base:['Bone or white button-up, collar out'], Mid:['Charcoal or black turtleneck, or a fine-gauge crewneck over the shirt'],
      Bottom:['Charcoal pleated wool trousers'], Shoes:['Black Arigato'], Outer:['Nothing, or the leather jacket if under 12°'] },
    why:'The button-up collar over a knit is the whole look — it does the work a tie used to do, without the formality. Keep the knit fine-gauge so the collar sits flat.' },

  { id:'f2', name:'Turtleneck & Wool', kicker:'One piece, one silhouette',
    occ:['uni','dinner','out'], temps:['freeze','cold','cool'], rain:false,
    layers:{ Base:['Black or charcoal turtleneck'], Bottom:['Grey or charcoal wool trousers, slight taper'],
      Shoes:['Black Arigato'], Outer:['Leather jacket, or camel overcoat'] },
    why:'A turtleneck is a monolith — it removes every horizontal line above the waist and makes the frame read longer. It only fails if the trouser is loose, so keep the taper.' },

  { id:'f3', name:'Camel Over Black', kicker:'The one warm note',
    occ:['dinner','out','uni'], temps:['freeze','cold'], rain:false,
    layers:{ Base:['Black turtleneck or fine knit'], Bottom:['Black or charcoal trousers'],
      Shoes:['Black Arigato'], Outer:['Camel overcoat'] },
    why:'All-black underneath, one warm coat over it. This is the maximum amount of colour your palette should ever carry, and it is enough.' },

  { id:'f4', name:'Sweatshirt & Shirt', kicker:'Weekday, low effort, still deliberate',
    occ:['uni','out'], temps:['cold','cool','mild'], rain:false,
    layers:{ Base:['Oxford button-up, collar out over the neckline'], Mid:['Heather grey or black sweatshirt, mid-weight'],
      Bottom:['Charcoal pleated trousers'], Shoes:['Black Arigato'] },
    why:'The trouser is what saves this from being loungewear. Sweatshirt with a formal trouser is a genuine style position; sweatshirt with anything soft below is just a tracksuit apologising.' },

  { id:'f5', name:'The Thin Hoodie', kicker:'Rain, without the bin-bag problem',
    occ:['uni','out','travel'], temps:['cold','cool'], rain:true,
    layers:{ Base:['Fine merino long sleeve — thin and warm beats thick and bulky'], Mid:['Thin black hoodie'],
      Bottom:['Dark charcoal trousers, no cuff drag'], Shoes:['Black Arigato or the walking shoes if it is truly wet'],
      Outer:['Waxed cotton jacket or unlined black mac'] },
    why:'Merino under a shell handles a Derby winter better than any puffer, and it lets you keep your line. Warmth per millimetre is the metric, not thickness.' },

  { id:'f6', name:'Jumuʿah', kicker:'Clean, quiet, no projection',
    occ:['jumua','dinner'], temps:['freeze','cold','cool','mild'], rain:false,
    layers:{ Base:['Fresh white or bone button-up'], Bottom:['Charcoal or navy dress trousers'],
      Shoes:['Slip-on friendly — the brown Polos or anything without laces'], Outer:['Overcoat if cold'] },
    why:'Shoes come off, so the sock is part of the outfit — dark, clean, no logo, no holes. Fragrance is sunnah and welcome; heavy projection in a shared row is not. One spray on the chest.' },

  { id:'f7', name:'Presenting', kicker:'One notch above the room',
    occ:['formal','dinner'], temps:['freeze','cold','cool','mild'], rain:false,
    layers:{ Base:['Crisp white button-up'], Mid:['Fine navy or charcoal knit, or nothing'],
      Bottom:['Wool dress trousers, pressed, no break'], Shoes:['Black Arigato at minimum — a black leather-soled derby if you have it'],
      Outer:['Camel or navy overcoat'] },
    why:'Everything pressed, everything neutral, nothing to look at but your face. The audience should remember the argument, not the fit.' },

  { id:'f8', name:'Summer Minimum', kicker:'Heat, without giving up the line',
    occ:['out','uni','travel'], temps:['warm','mild'], rain:false,
    layers:{ Base:['Black, bone or navy polo — knitted if you have one'], Bottom:['Light trousers, or tailored shorts to just above the knee'],
      Shoes:['Brown Polo shoes or clean Arigato, no visible socks'] },
    why:'A knitted polo is the one warm-weather piece that stays formal enough for your taste. Shorts stop above the knee — anything longer shortens the leg and kills the proportion you are protecting everywhere else.' },

  { id:'f9', name:'Brown Shoe Day', kicker:'Warm palette, top to bottom',
    occ:['out','dinner','uni'], temps:['cool','mild'], rain:false,
    layers:{ Base:['Cream or bone knit, or an olive overshirt'], Bottom:['Brown, stone or olive trousers'],
      Shoes:['Brown Polo shoes'], Outer:['Suede or waxed jacket'] },
    why:'When the brown shoes come out, the whole fit moves warm — no black anywhere, belt included. Treat it as a separate wardrobe from the black-shoe one and neither will ever clash.' },

  { id:'f10', name:'Gym', kicker:'Function only',
    occ:['gym'], temps:['freeze','cold','cool','mild','warm'], rain:false,
    layers:{ Base:['Plain tee, no graphic'], Mid:['Black joggers or shorts'], Shoes:['Trainers'],
      Outer:['Thin hoodie for the walk'] },
    why:'No fragrance. Shower within thirty minutes of finishing — sweat sitting under a shirt on the back is the single biggest controllable driver of back acne, and it is worth more than any product.' },

  { id:'f11', name:'Travel', kicker:'Six hours seated, still presentable',
    occ:['travel'], temps:['cold','cool','mild'], rain:true,
    layers:{ Base:['Merino tee or long sleeve — resists creasing and odour'], Mid:['Fine knit or thin hoodie'],
      Bottom:['Dark trousers with stretch in the weave'], Shoes:['Slip-on friendly, security-fast'], Outer:['Overcoat as a blanket'] },
    why:'Merino is the whole answer to travel: it does not crease, does not hold smell, and regulates across a 20-degree swing between a terminal and a plane.' }
];

export const CARE = [
  { t:'Wool trousers', d:'Brush after wearing, steam the creases out, air 24h between wears. Dry clean three or four times a year — more than that and the fibre goes lifeless.' },
  { t:'Knitwear', d:'Fold, never hang: a hanger stretches the shoulders permanently. De-pill with a comb or a battery shaver every few wears; pilling is what makes good knitwear look cheap.' },
  { t:'Leather jacket', d:'Condition twice a year, never in direct sun, never in a plastic cover. Creases are the point — do not fight them.' },
  { t:'White-soled Arigato', d:'Magic sponge on the midsole while marks are fresh, leather cleaner on the upper, cream polish before the leather looks dry — not after.' },
  { t:'Brown Polo shoes', d:'Brush after each wear, conditioner every six weeks, cedar trees overnight. Rotate — never the same pair two days running.' },
  { t:'Shirts', d:'Hang immediately out of the wash while damp; that alone removes most of the ironing. Collar stays in, always.' },
  { t:'Hanging', d:'Broad wooden hangers for jackets and coats — wire hangers dent the shoulder permanently. Trousers clipped at the hem or folded over a felted bar so the crease falls straight. Knitwear folded, never hung. Two centimetres of air between garments; a crushed rail creases everything on it. Nothing goes in damp.' },
  { t:'Dry cleaning', d:'Run a batch every fortnight, but send only what is genuinely soiled. Solvent strips the natural oils out of wool, so over-cleaning ages a good piece faster than wearing it does — brush, steam and air between wears, and reserve the clean for actual marks. Anything that cannot afford to be dirty gets checked in that fortnightly pass rather than waiting for you to notice.' },
  { t:'Pilling', d:'Fabric shaver over knits and wool every few wears: lay the area flat, hold it taut, one direction, lift before the seam. Two minutes a garment, and it is the difference between good knitwear and knitwear that looks finished.' }
];

/* ------------------------------------------------------------------ *
 * CONCERNS — the actual problems, with the mechanism named.
 * ------------------------------------------------------------------ */
export const CONCERNS = [
  {
    id:'back', name:'Back acne', glyph:'▤',
    what:'Breakouts across the back and shoulders.',
    causes:[
      'Conditioner rinsing down your back — the most likely single cause, given your shower order.',
      'Sweat left sitting under a shirt after training.',
      'Occlusive fabric: heavy cotton, softener residue, tight synthetics.',
      'Towels and bedding used past their useful life.'
    ],
    levers:[
      { t:'Wash the back last, always', d:'After the conditioner is fully rinsed. Costs nothing, changes the mechanism.', ritual:'shower' },
      { t:'Benzoyl peroxide 4–5%, two minutes contact', d:'Daily to start, dropping to alternate days if it dries you out. Contact time is what works.', ritual:'shower' },
      { t:'Shower within 30 minutes of training', d:'Non-negotiable while this is active.', ritual:null },
      { t:'Salicylic pad or long brush twice a week', d:'Not daily. Not a scrub.', ritual:'body' },
      { t:'Drop the fabric softener', d:'On anything that touches your back — it leaves a film in the fibre.', ritual:null },
      { t:'Fresh towel every third use, sheets weekly', d:'Cheap, boring, effective.', ritual:'audit' }
    ],
    clock:'Three weeks for the mechanism change to show. Twelve weeks for the marks left behind.',
    escalate:'If it is deep, painful and leaving scars rather than marks, that is nodulocystic and it is a GP conversation, not a shelf product. Oral treatment exists and works; waiting it out costs you permanent scarring.'
  },
  {
    id:'face', name:'Closed comedones', glyph:'◯',
    what:'Small bumps under the skin that never come to a head. Texture rather than spots.',
    causes:[
      'Sunscreen and tint not fully removed at night — the top suspect given you wear tint.',
      'Occlusive or "hydrating" products layered over them.',
      'No retinoid, so the follicle never turns over faster than it clogs.',
      'Touching, leaning, phone screens on the jaw.'
    ],
    levers:[
      { t:'Double cleanse on every tint day', d:'Balm or oil first, gentle gel second. Fix this before buying anything.', ritual:'night' },
      { t:'Adapalene 0.1% nightly, ramped', d:'The actual treatment. Two nights a week, then alternate, then nightly.', ritual:'night' },
      { t:'Simplify everything else', d:'One active at a time. Fragrance-free moisturiser. Nothing marketed as rich.', ritual:'night' },
      { t:'Azelaic acid 10–15% in the morning', d:'Optional. The one active that treats comedones and redness at once.', ritual:null },
      { t:'Nothing gets squeezed', d:'A closed comedone has no opening. Pressure turns it into an inflamed papule and then a brown mark.', ritual:null }
    ],
    clock:'Worse before better from week two to week six — that is the purge, and it is the most common point of quitting. Real judgement at week twelve.',
    escalate:'If twelve honest weeks of nightly adapalene does not shift it, the next step is prescription tretinoin or a topical antibiotic combination. That is a five-minute GP appointment.'
  },
  {
    id:'red', name:'Redness', glyph:'◐',
    what:'Persistent flush across the cheeks and nose, worse after heat or stress.',
    causes:[
      'A stripped barrier — hot water, over-cleansing, alcohol-based products.',
      'Heat: hot showers, hot rooms, spicy food, hot drinks.',
      'Sun exposure without daily SPF.',
      'Physical scrubs and harsh actives stacked together.'
    ],
    levers:[
      { t:'Lukewarm water only, cold finish', d:'Temperature is the lever you control most often and use least.', ritual:'shower' },
      { t:'Daily SPF, without exception', d:'UV is the largest driver of persistent facial redness over years. You already have the habit — protect it.', ritual:'ready' },
      { t:'Fragrance-free, alcohol-free, everything', d:'Especially aftershave. Denatured alcohol high in an ingredient list is a red flag for you specifically.', ritual:'reset' },
      { t:'Barrier repair, not treatment', d:'Ceramides and niacinamide. Redness on a damaged barrier gets worse with more actives, not better.', ritual:'night' },
      { t:'Lumify is cover, not cure', d:'Same for the eyes. It buys four hours and can rebound. Fine occasionally — a problem as a daily crutch.', ritual:'ready' }
    ],
    clock:'Barrier repair shows in two to four weeks. Sun-driven redness is a years-long line, moving in the direction you point it.',
    escalate:'Central-face flushing with visible vessels and a burning feeling is rosacea, and it responds well to prescription topicals. It does not respond to anything on a shop shelf.'
  },
  {
    id:'eyes', name:'Dark circles', glyph:'◡',
    what:'Shadowing under the eyes. Worse on short sleep and when congested.',
    causes:[
      'Nasal congestion pooling blood in the veins that drain the under-eye — the "allergic shiner". Your saline habit is already treating this.',
      'Short or broken sleep, and dehydration.',
      'Thin skin over vasculature — partly structural, partly inherited.',
      'A hollow, not a pigment: a shadow cast by the orbital rim, which no cream can lighten.'
    ],
    levers:[
      { t:'Saline rinse daily', d:'Keep it. If congestion is chronic, an antihistamine or a steroid nasal spray for a fortnight will tell you how much of the shadow is allergic.', ritual:'mouth' },
      { t:'Seven and a half hours, consistently timed', d:'Consistency of timing matters nearly as much as duration for how the face looks in the morning.', ritual:null },
      { t:'Sleep on your back, head slightly raised', d:'Face-down sleeping pools fluid under the eyes overnight. An extra pillow is a free intervention.', ritual:null },
      { t:'Cold in the morning', d:'Thirty seconds of cold on the orbital bone, or the lymphatic sequence. Vasoconstriction, immediate, temporary, real.', ritual:'shower' },
      { t:'Check ferritin once', d:'Low iron is a genuine and commonly missed cause of under-eye shadowing. One blood test settles it permanently.', ritual:null },
      { t:'Correct with peach, not with lighter concealer', d:'A blue-grey shadow needs a warm corrector under a matched concealer. Lighter concealer alone turns grey into ashy grey.', ritual:'ready' }
    ],
    clock:'Sleep and congestion changes show in about a week. Structural hollowing does not change — recognise which one you have before spending money.',
    escalate:'If it is a true tear-trough hollow, the only things that actually work are filler or fat transfer. Worth knowing so you stop buying eye creams for a shape problem.'
  },
  {
    id:'hair', name:'Hair', glyph:'❂',
    what:'Density, condition, and the six-month clock everything here runs on.',
    causes:[
      'Anything that works on hair works slowly — six months minimum before a verdict.',
      'Heat and friction damage the length; only the scalp affects growth.',
      'Keratin treatments buy manageability and cost you flexibility for three days.'
    ],
    levers:[
      { t:'Scalp massage four minutes, most days', d:'The highest-evidence, lowest-cost intervention available to you. Frequency is the dose.', ritual:'scalp' },
      { t:'Diluted rosemary oil monthly', d:'Real single-trial support, but only on the scalp and only with the massage.', ritual:'hairoil' },
      { t:'Protein and sleep', d:'Hair is the first tissue the body deprioritises when either runs short.', ritual:null },
      { t:'Sulfate-free, salt-free after keratin', d:'Salt strips it faster than sulfates.', ritual:'keratin' },
      { t:'Photograph the hairline every 3 months', d:'Same light, same angle. Memory is useless at detecting slow change; a photo is not.', ritual:null }
    ],
    clock:'Six months. Nothing about hair is judged sooner, by anyone, ever.',
    escalate:'Recession at the temples or thinning at the crown that is visibly progressing over a year is androgenetic — and it is treatable, but only early. Minoxidil and finasteride are the evidence base; the shelf is not.'
  }
];

/* ------------------------------------------------------------------ *
 * INSIDE — the layer under the surface. Half of the face is here.
 * ------------------------------------------------------------------ */
export const INSIDE = [
  { id:'sleep',  lbl:'Sleep',    type:'count', step:.5, unit:'h', target:7.5, why:'The largest single driver of how your face reads in the morning — under-eyes, tone, and cortisol-driven oil all track it.' },
  { id:'water',  lbl:'Water',    type:'count', step:1,  unit:'gl', target:8,  why:'Dehydrated skin does not look dry so much as dull and creased. This is the cheapest correction available.' },
  { id:'sun',    lbl:'Daylight', type:'tog', why:'Twenty minutes outdoors before noon anchors the sleep timing that everything else here depends on. In a Derby winter, take vitamin D as well.' },
  { id:'train',  lbl:'Trained',  type:'tog', why:'Posture, jawline definition, circulation, and sleep quality — training is upstream of four things you are trying to fix downstream.' },
  { id:'protein',lbl:'Protein',  type:'tog', why:'Skin, hair and nails are the first things the body cuts when protein is short. Roughly 1.6g per kg on training days.' },
  { id:'clean',  lbl:'No spike', type:'tog', why:'High-glycaemic food and, for some people, skim dairy, are the two dietary links to acne with real evidence behind them. Flag the days so you can test it on yourself rather than believe it.' },
  { id:'salah',  lbl:'Salah',    type:'count', step:1, unit:'/5', target:5, why:'The backbone. The rest of this app is maintenance on a vessel — this is the part that decides what the vessel is for.' },
  { id:'calm',   lbl:'Calm',     type:'tog', why:'No screens for the last hour, and something that lowers the baseline. Stress shows on skin within about seventy-two hours.' }
];

/* ------------------------------------------------------------------ *
 * CABINET — consumables and countdowns.
 * ------------------------------------------------------------------ */
export const CABINET = [
  { id:'blade',    name:'Razor blade',        days:null, uses:6,  cat:'Shave',  note:'Five to seven shaves. Irritation is usually a blunt blade.' },
  { id:'brush',    name:'Toothbrush head',    days:90,   cat:'Mouth',  note:'Frayed bristles clean roughly half as well.' },
  { id:'lumify',   name:'Lumify bottle',      days:90,   cat:'Face',   note:'Discard three months after opening — preservative, not liquid, is the clock.' },
  { id:'solution', name:'Lens solution',      days:90,   cat:'Face',   note:'Same rule. Never top up an old bottle.' },
  { id:'lenses',   name:'Contact lenses',     days:30,   cat:'Face',   note:'To the day. Wearing monthlies into week five is how people get keratitis.' },
  { id:'spf',      name:'Tinted SPF',         days:365,  cat:'Face',   note:'Twelve months after opening. An old sunscreen is a moisturiser that lies to you.' },
  { id:'adapalene',name:'Adapalene',          days:180,  cat:'Skin',   note:'Keep it capped and out of light.' },
  { id:'bpo',      name:'Benzoyl peroxide wash', days:120, cat:'Skin', note:'Loses potency once opened and warm.' },
  { id:'pillow',   name:'Pillowcase change',  days:4,    cat:'Bedding',note:'Twice a week while the skin is a live problem.' },
  { id:'towel',    name:'Towel change',       days:5,    cat:'Bedding',note:'Every third use if you are fighting back acne.' },
  { id:'sheets',   name:'Sheets',             days:7,    cat:'Bedding',note:'Weekly.' },
  { id:'haircut',  name:'Haircut',            days:35,   cat:'Hair',   note:'Book before you need it. Clean the neckline weekly in between.' },
  { id:'keratin',  name:'Keratin treatment',  days:150,  cat:'Hair',   note:'Roughly five months. The app learns your real interval.' },
  { id:'hairoil',  name:'Scalp oil',          days:30,   cat:'Hair',   note:'Monthly. The massage is the part that matters.' },
  { id:'leather',  name:'Shoe conditioning',  days:42,   cat:'Wear',   note:'Brown Polos every six weeks. Cedar trees nightly.' },
  { id:'depill',   name:'De-pill knitwear',   days:21,   cat:'Wear',   note:'Pilling is what makes good knitwear look cheap.' },
  { id:'dryclean', name:'Dry-clean run',      days:14,   cat:'Wear',   note:'Fortnightly batch. Send only what is actually soiled — solvent is hard on wool.' },
  { id:'press',    name:'Press & lint kit',   days:60,   cat:'Wear',   note:'Iron soleplate clean, steamer descaled, lint roller with sheets left, shaver charged.' }
];
