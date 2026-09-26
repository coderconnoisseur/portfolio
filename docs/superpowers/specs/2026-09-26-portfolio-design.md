# Nishant Borkar portfolio: "Measured"

Status: approved 2026-09-26. Single-page portfolio for recruiters and engineering managers.

## Concept

Every claim on the page is a real, sourced measurement from Nishant's work (resume + GitHub READMEs).
Through-line: he makes slow systems fast and measures it. Hero line: "Slow is a bug."

Guidance followed: taste-skill (leonxlnx/taste-skill, `design-taste-frontend`) and Vercel Web Interface Guidelines.
Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 3.

## Visual system

- Type (self-hosted via Fontsource):
  - Display: Hubot Sans Variable, wdth 125, wght 800-900, tracking -0.03em.
  - Body: Mona Sans Variable, wdth 100, 17-18px, leading 1.6, measure <= 64ch.
  - Mono: Martian Mono Variable, only for literal technical strings (Kafka topics, endpoints).
- Color tokens (CSS variables, light + dark via `prefers-color-scheme`, manual toggle stored in localStorage):
  - Light: paper `#EEEFEA`, paper-2 `#E4E6E0`, ink `#15171A`, ink-2 `#474C52`, ink-3 `#666B71`, signal `#E8491D`, signal-ink `#B23A12`.
  - Dark: paper `#101214`, paper-2 `#191C1F`, ink `#ECEDE8`, ink-2 `#A7ACB1`, ink-3 `#878C92`, signal `#FF6A33`, signal-ink `#FF8A5C`.
  - One accent only (signal). Small text uses signal-ink for AA contrast.
- Grain: fixed, pointer-events-none SVG noise overlay.
- Shape: radius 0 everywhere.
- Icons: Phosphor (one family). Tech logos: Simple Icons, monochrome `currentColor`.
- Copy rules: zero em/en dashes, curly quotes, nbsp between number and unit, max 3 eyebrows.

## Sections (in order)

1. Header: wordmark, Work / Stack / About / Contact, Resume, theme toggle, scroll-progress hairline. One line at all widths.
2. Hero: availability line, "Slow is a bug." (kinetic: "Slow" arrives lazily, rest snaps), <= 20-word subtext, CTAs "Email me" + "See the work", LatencyMeter (2,800 ms -> 120 ms count-down with true-scale bar).
3. Now (Culinda internship): sticky role column + 4 metrics at varied scale (35% cost, +18% relevance, 4x throughput, 10,000+ docs).
4. Work: three case files with bespoke interactive figures, then an index of three more.
   - RidePulse: DispatchPipeline (pulse through real Kafka topology, "Dispatch a ride" button).
   - LUMEN: QueryRouter (3 sample questions route to SQL agent / RAG / analytics orchestrator).
   - Guarded Agent Ensemble: DefenseLadder (step through README ablation table).
   - Index: SpatioX, EchoLine, Distributed Cache (in progress).
5. Receipts: ContributionMap (custom heatmap, wave reveal, tooltips, total / longest streak / busiest day) + competitive programming stats.
6. Stack: back-of-book index; each tool lists the projects that used it (links to anchors).
7. About: Wanderer above the Sea of Fog (public domain, duotone) + bio + education.
8. Contact: "Send me your slowest endpoint.", Email me, copy-email, links, colophon with live page-load measurement.

## Motion

Motion (`motion/react`) for sequences and in-view triggers; CSS for hover. Only transform/opacity animated.
Every animation explains something (before/after, flow, time, feedback). `prefers-reduced-motion` renders final states.

## Data

- Contributions: `api/contributions.ts` (Vercel function) scrapes `github.com/users/coderconnoisseur/contributions`, cached 12h at the edge.
  `scripts/snapshot-contributions.mjs` runs on `prebuild` and writes `src/data/contributions.json`; the client renders the snapshot immediately and swaps in fresh data if the API responds.
- All copy lives in typed files under `src/content/`.

## Assets

- `public/images/wanderer.jpg`: hi-res public-domain scan from Wikimedia Commons.
- `public/Nishant_Borkar_Resume.pdf`: to be supplied by Nishant (phone-free version).
- `public/og.png`, `public/favicon.svg`.

## Testing

- Vitest: contribution parser and stats (total, longest streak, busiest day, week grid).
- `tsc --noEmit` + `vite build` clean.
- Manual in-browser checks: desktop / mobile widths, light / dark, reduced motion, keyboard-only pass.
