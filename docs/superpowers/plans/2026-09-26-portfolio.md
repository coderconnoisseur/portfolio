# "Measured" Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Nishant Borkar's single-page portfolio as specified in the "Measured" design.

**Architecture:** Vite + React 19 + TypeScript SPA. All copy in typed `src/content/*` modules; sections in `src/sections/*`; bespoke interactive figures in `src/figures/*`; shared primitives in `src/components/*`. GitHub contributions come from a build-time snapshot plus a cached Vercel function.

**Tech Stack:** Vite 8, React 19, TypeScript 5, Tailwind CSS 4 (`@tailwindcss/vite`), Motion 13 (`motion/react`), Phosphor icons, Simple Icons, Fontsource variable fonts (Hubot Sans, Mona Sans, Martian Mono), Vitest.

**Spec:** `docs/superpowers/specs/2026-09-26-portfolio-design.md`

## Global Constraints

- Zero em dashes and en dashes in any user-visible string; hyphen only.
- One accent color (`--signal`); small accent text uses `--signal-ink`.
- Radius 0 everywhere. Max 3 uppercase-tracked eyebrow labels on the page.
- Animate only `transform` / `opacity`; never `transition: all`; honor `prefers-reduced-motion`.
- nbsp between numbers and units (`120&nbsp;ms`); tabular numerals for stats.
- Every number shown must come from the resume or a project README.
- No git commits unless the user asks (repo not initialised).

---

### Task 1: Scaffold, tokens, fonts, test runner

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/index.css`, `vercel.json`

- [ ] Scaffold Vite React TS; install `motion @phosphor-icons/react simple-icons @fontsource-variable/{hubot-sans,mona-sans,martian-mono}`; dev: `tailwindcss @tailwindcss/vite vitest`.
- [ ] `index.css`: `@import "tailwindcss"`, `@theme` mapping tokens (paper, paper-2, ink, ink-2, ink-3, signal, signal-ink, rule) to CSS vars with light/dark values from the spec; `[data-theme]` overrides; font families; grain overlay; focus-visible ring; `scroll-margin-top` on sections; reduced-motion guard.
- [ ] `index.html`: title, description, OG/Twitter tags, `theme-color` per scheme, `color-scheme`, no-flash theme script, display font preload.
- [ ] Verify: `npm run build` exits 0; `npx vitest run` runs (0 tests OK).

### Task 2: Contributions data (TDD)

**Files:**
- Create: `src/lib/contributions.ts`, `src/lib/contributions.test.ts`, `src/lib/__fixtures__/contrib.html`, `scripts/snapshot-contributions.mjs`, `api/contributions.ts`, `src/data/contributions.json`

**Interfaces:**
- Produces:
  - `type Day = { date: string; count: number; level: 0|1|2|3|4 }`
  - `parseContributions(html: string): Day[]` (sorted ascending by date)
  - `summarize(days: Day[]): { total: number; longestStreak: number; currentStreak: number; busiest: Day | null }`
  - `toWeeks(days: Day[]): (Day | null)[][]` (columns of 7, Sunday first, null padding)
  - `type ContributionData = { user: string; fetchedAt: string; days: Day[] }`

- [ ] Step 1: Write failing tests against a trimmed real fixture: parses dates/counts/levels, sorts by date, "No contributions" -> 0, totals, longest streak, busiest day, week padding.
- [ ] Step 2: Run `npx vitest run src/lib` -> FAIL (module missing).
- [ ] Step 3: Implement with regexes over `data-date` / `id` / `data-level` and `<tool-tip for=...>` text.
- [ ] Step 4: Run -> PASS.
- [ ] Step 5: Snapshot script (plain ESM, same regex logic via shared import through `tsx`-free duplicate kept tiny) writes `src/data/contributions.json`; wire `"prebuild": "node scripts/snapshot-contributions.mjs"` (keeps previous snapshot if fetch fails).
- [ ] Step 6: `api/contributions.ts` exports `GET()` returning JSON with `Cache-Control: public, s-maxage=43200, stale-while-revalidate=86400`.

### Task 3: Content modules

**Files:** Create `src/content/{profile,experience,projects,achievements,stack}.ts`

- [ ] Typed data for every string on the page (hero, Culinda metrics, 6 projects with hooks/facts/links, CP stats, stack index entries with `refs: ProjectId[]`, bio, contact links).
- [ ] Em dash grep over `src/content` returns nothing.

### Task 4: Primitives + header

**Files:** Create `src/components/{Grain,Reveal,SectionHeading,Header,ThemeToggle,SkipLink,Arrow,ExternalLink}.tsx`, `src/lib/motion.ts`, `src/lib/useTheme.ts`

- [ ] `Reveal`: in-view once fade/translate (16px), reduced-motion static.
- [ ] `SectionHeading`: line-mask reveal of h2.
- [ ] `Header`: one line at 320px+, nav anchors, resume link, theme toggle, scroll-progress hairline (`useScroll` + `scaleX`), border after hero.
- [ ] Verify in browser at 375px and 1440px: nav on one line; keyboard focus visible.

### Task 5: Hero + LatencyMeter

**Files:** Create `src/sections/Hero.tsx`, `src/figures/LatencyMeter.tsx`

- [ ] "Slow" letters stagger slowly (0.9s each, 0.12s stagger), "is a bug." snaps (0.35s, 0.04s stagger); hover on "Slow" widens tracking over 1.2s.
- [ ] Meter: `animate(2800 -> 120)` with ease-out-expo over 1.6s; bar `scaleX` 1 -> 120/2800 from left; final state under reduced motion; `aria-label` states the final values.
- [ ] Hero fits a 1440x900 and 375x812 viewport without scrolling to CTAs.

### Task 6: Now (Culinda)

**Files:** Create `src/sections/Now.tsx`

- [ ] Sticky role column (desktop), four metrics at varied scale, stagger reveal; single column under 768px.

### Task 7: Work + figures

**Files:** Create `src/sections/Work.tsx`, `src/components/CaseFile.tsx`, `src/figures/{DispatchPipeline,QueryRouter,DefenseLadder}.tsx`, `src/sections/WorkIndex.tsx`

- [ ] DispatchPipeline: stages from RidePulse README; "Dispatch a ride" button runs a pulse stage-by-stage (aria-live status), auto-runs once in view; horizontal on desktop, vertical on mobile.
- [ ] QueryRouter: 3 question buttons (`aria-pressed`), classifier node, 3 agent nodes; active path highlighted with `layoutId`; aria-live answer line.
- [ ] DefenseLadder: 5 rows from GAE README table; "Add a defense" stepper + clickable rows; metrics animate; net-negative note on final row.
- [ ] WorkIndex: SpatioX, EchoLine, Distributed Cache rows as links; hover arrow slide.

### Task 8: Receipts

**Files:** Create `src/sections/Receipts.tsx`, `src/figures/ContributionMap.tsx`, `src/lib/useContributions.ts`

- [ ] Renders snapshot synchronously, refreshes from `/api/contributions` (ignored on failure).
- [ ] 7-row grid, month labels, 5-level signal scale, column-wave reveal, hover/focus tooltip, `role="img"` summary; horizontal scroll container on narrow screens with the latest weeks in view.
- [ ] CP stats row.

### Task 9: Stack index

**Files:** Create `src/sections/Stack.tsx`, `src/lib/icons.ts`

- [ ] Alphabetical index with letter groups in CSS columns (3/2/1), Simple Icons paths rendered with `currentColor`, refs link to `#project-*` anchors; "Also" line for tools without a project reference.

### Task 10: About, Contact, footer, assets

**Files:** Create `src/sections/{About,Contact}.tsx`, `src/lib/usePageLoadTime.ts`, `public/images/wanderer*.jpg`

- [ ] Download public-domain Wanderer from Wikimedia Commons, resize to 1200w + 600w JPEG; duotone via CSS blend; explicit width/height.
- [ ] Contact: headline, Email me (mailto), Copy email (clipboard + aria-live "Copied"), links, colophon + measured page load (navigation timing; hidden if unavailable).

### Task 11: Meta assets

**Files:** Create `public/favicon.svg`, `public/og.png` (rendered from `scripts/og.html` with headless Edge), `public/robots.txt`

### Task 12: Verification

- [ ] `npx vitest run`, `npx tsc -b`, `npm run build` all clean.
- [ ] Browser QA: 1440 / 768 / 375 widths; light + dark; reduced motion; keyboard-only pass; no horizontal page scroll; no console errors.
- [ ] Taste-skill pre-flight + Vercel guidelines audit; grep for `—`, `–`, `transition: all`, `h-screen`.
