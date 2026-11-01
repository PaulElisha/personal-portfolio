# paul elisha — portfolio

A rebuild of the original "protocol blueprint" portfolio site as a hand-written
frontend: **Astro 5** (static output) + **Alpine.js 3** for client interactivity +
**Tailwind CSS 3** for the design system. No base44 runtime, no proprietary page
builder, no backend framework — just static HTML/CSS/JS compiled at build time.

## What changed in this pass

- **Card system rebuilt on teddyoweh.net's structure and motion.** A 4:3 plate holds a
  floating browser window (title-bar dots + screenshot) that lifts on hover; the plate
  darkens, the project name warms to the accent colour, and a cursor glyph nudges
  toward the name.
- **Role corrections**
  - `0x01` Kaia Labs → **Backend Developer / Developer Support**
  - `0x06` Mantle AI Plugin → **SDK Developer**
  - `0x09` PredictivTrend → **Backend Engineer**
- **Titles** read "backend engineer" throughout. The string "blockchain engineer"
  does not exist anywhere in the build output.
- **Interactivity added** without changing the content or the layout language.

## Font: confirmed

Both sites are monospace-paired, so the type voice is consistent.

| | original portfolio | teddyoweh.net | this build |
|---|---|---|---|
| family | JetBrains Mono | `clutch` (custom) + Geist Mono | **JetBrains Mono** 400–700 |
| style | normal | normal | **normal** |
| body size | 15px | 16px | **15px** (14px ≤1024, 13.5px ≤600) |
| card name | — | 15px | **15px** |
| card role | 12px | 13px | **12px** |
| card desc | 13px | 13px | **13px** |

Body: `line-height 1.65`, `letter-spacing -0.005em`, `font-style: normal`.
JetBrains Mono is kept rather than swapping in `clutch`, because the brief was
"everything remains the same as what I originally sent" — the family carries the
original design, while the **card-level sizes are inherited from teddyoweh**.

## Stack

- **Astro 5.18** — `output: 'static'`, 17 pre-rendered pages, zero client JS for content
- **Alpine.js 3.17** — category panel switching, scroll-aware nav
- **Tailwind 3.4** — HSL CSS-variable tokens, `darkMode: 'class'`
- **PostCSS** — required; `postcss.config.mjs` is what makes `@tailwind` compile

## Routes

| Path | Description |
|---|---|
| `/` | Home — statement + footer plate, boot curtain once per session |
| `/work` | Work index, defaults to `experience` |
| `/work?category=experience\|open-source\|projects` | Category panel (deep-linkable) |
| `/work/0x01` … `/work/0x0a` | Project detail (10 pages) |
| `/research` | Research index |
| `/research/r001` … `/research/r003` | Research detail (3 pages) |
| `/404` | Not-found, in the site's own design system |

## Interactivity

- **Boot curtain** — letter-by-letter rise, hairline draw, panel lifts away at
  1950ms and unmounts at 2850ms. Plays once per browser session (`sessionStorage.pl_loaded`).
- **Staggered entrance** — `rise` on every block with per-item `animation-delay`
  (home 0/60/120/180/260ms, cards `index × 70ms`, detail rows `index × 70ms`).
- **Card hover** — window translates 34px → 26px, plate darkens to 12% foreground,
  name → accent, cursor glyph shifts.
- **Category switching** — Alpine swaps panels and rewrites the URL with
  `history.replaceState`; a pre-paint inline script sets the correct panel before
  Alpine boots so deep links never flash.
- **Scroll-aware nav** — the bottom pill fades to 40% while scrolling down past 120px
  and returns on scroll up (`x-on:scroll.window.throttle.150ms`).
- **Scroll progress rail** — 1.5px accent bar on detail pages, rAF-throttled.
- **Blinking caret** after the role line, `.rule` hairlines that draw themselves,
  `.touch` lift, `.press` spring, `.chip` lift, link underlines that warm on hover.
- **Theme toggle** — pre-paint script reads `localStorage.theme`, falls back to
  `prefers-color-scheme`; no flash.
- **`prefers-reduced-motion`** disables all of it.

## Structure

```
src/
  data.ts                    # 10 projects + 3 research entries, typed
  styles/global.css          # tokens, card system, keyframes, reduced-motion
  layouts/
    Base.astro               # document shell, fonts, theme pre-paint
    PageLayout.astro         # list surfaces (home/work/research)
    DetailLayout.astro       # detail surfaces (back link + wordmark + rail)
  components/
    ProjectCard.astro        # teddyoweh-modelled card
    BottomNav.astro          # pill nav + Alpine scroll-hide
    ThemeToggle.astro        # light/dark switch
    BootLoader.astro         # session boot curtain
    ScrollRail.astro         # read-progress bar
  pages/
    index.astro 404.astro
    work/index.astro  work/[id].astro
    research/index.astro  research/[id].astro
public/static/images/        # 16 images + 1 demo video, served locally
```

## Commands

```bash
npm install
npm run build      # → dist/ (17 pages)
npm run dev        # astro dev
npm run preview    # serve dist
npm run dev:sandbox # dev on 0.0.0.0:3000
```

## Deploy

`dist/` is a plain static bundle — works on Cloudflare Pages, Netlify, Vercel, or
any static host.

```bash
npx wrangler pages deploy dist --project-name <project>
```

## Notes

This is a static rebuild; content is authored in `src/data.ts`, so edits are
type-checked at build time and there is no runtime data layer, database, or API.
