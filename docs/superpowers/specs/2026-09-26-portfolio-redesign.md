# Portfolio redesign: from "the numbers" to "Nishant"

Status: draft for review, 2026-09-26. Replaces the direction in `2026-09-26-portfolio-design.md` ("Measured").

## 1. What went wrong with "Measured"

The first build is a well-made argument, not a person.

- **The hero is a slogan.** "Slow is a bug." at 200 px is the first thing a visitor meets. Nishant's name is 17 px in the header.
- **Numbers are the protagonist.** 2.8 s → 120 ms, 35%, +18%, 4×, 10,000+, 0.07 → 0. Every section leads with a metric, so the page reads like a performance review.
- **There is no face.** The only image is a 200-year-old painting. Nothing shows who he is, where he's been, or what he's like to work with.
- **It is long and heavy.** The page is 10,700 px tall at desktop. Each project is a full-width case study with its own interactive diagram. A recruiter scanning for 20 seconds gets through about one project.
- **The voice is a brand voice.** Lines like "Selected work, with the numbers left in." or "Every tool, and where I used it." are clever copy, not first person.

## 2. What the four reference sites do

| | adityaa.pro | animeshh.me | arjunr.dev | mittalparth.dev |
|---|---|---|---|---|
| First thing you see | Pixel-art banner, avatar, name | Photo banner, avatar, name, pronunciation "/an·i·mesh/" | Polaroid photo pinned to a board, name | Polaroid photo, name |
| Tagline | "AI Systems / Backend Engineer" | "Full Stack Developer" | Handwritten: "building is my coping mechanism · 2nd place Anthropic hackathon" | Handwritten: "MTS @ Oracle · 15x hackathon winner" |
| Bio | 3 first-person bullets | 3 first-person bullets | Bullets on a yellow sticky note, highlights in a handwritten red font | Same, plus "Fun fact: I was featured on Times Square" |
| GitHub heatmap | Its own section | Its own section | **In the hero**, on a paper card | **In the hero**, on a paper card |
| Life and personality | Anime avatar, "rabbit holes", writing section | Now-playing music widget, ⌘K menu, star button | "What I've been up to lately" photo clothesline with pegs, cat doodle | Hackathon photo clothesline, draggable stickers with "Reset stickers" |
| Projects | Cards with screenshots, a category tag, one metric line at most | Cards with grayscale screenshots and a tech-tag cloud | Tilted polaroid cards pinned to a wall, award in red, horizontal scroll | Same pinned cards, award tags |
| Experience | Short list, company, dates | Narrative timeline | Timeline with company logos, "Show more" | Same |
| Layout | Narrow centered column (~1100 px), dark, hatched side rails | Same family | Full-width tactile "desk" scene | Same, green chalkboard |

### The pattern underneath

1. **Identity first.** Face, name and a human one-liner above everything else. The claim comes second.
2. **First person, short.** Three to five bullets, each with one highlighted word or phrase. Personality is allowed: "coping mechanism", "fun fact".
3. **Proof of life, not proof of metrics.** Real photos (hackathon teams, stages, desks), a live heatmap, and small artefacts (song, doodles, stickers) that make the page feel lived in.
4. **Projects are cards, not essays.** A thumbnail, a name, one line of what it is, an award tag if any, and icon links. One number at most.
5. **Compact.** Everything important fits in 3 to 4 screens. Detail sits behind "Show more" or a project link.
6. **Delight is small and tactile.** Tilt on hover, a pinned polaroid, draggable stickers, a handwritten accent. Not large animated diagrams.

The first two sites share one template family (profile column) and the last two share another (desk / pinboard). Copying either looks derivative. We should take the principles, not the skin.

## 3. What we should do instead

### Information architecture (one page, about 4 screens)

1. **Profile hero**
   - A real photo of Nishant; the Wanderer can live elsewhere as a personal touch.
   - Name as the H1.
   - One human line in his voice, e.g. "Backend and AI engineer. I get nerdy about why systems are slow."
   - A small meta line: Raipur, India / NIT Raipur '27 / interning at Culinda / open to internships and 2027 new-grad roles.
   - Icon links: GitHub, LinkedIn, LeetCode, X (if any), Résumé, Email.
2. **About as bullets**
   - Four to five first-person bullets, each with one highlighted phrase:
     - currently at Culinda
     - NIT Raipur CSE
     - LeetCode top 2%
     - Hack-a-Sol runner-up
     - one fun fact
   - The GitHub heatmap sits right under this, as the references do. It is "proof I'm usually building", not a stats section.
3. **Lately**
   - A strip of three to six real photos with a one-line caption each, for example:
     - Hack-a-Sol stage
     - the team
     - a desk setup
     - an NIT Raipur moment
   - This is the single most "human" element the references have, and we have none.
4. **Experience**
   - A timeline with a logo, role, dates and two bullets for Culinda, plus education (NIT Raipur).
   - The Culinda metrics shrink to one short line inside the bullets: "cut P95 latency from 2.8 s to 120 ms".
5. **Projects**
   - Six cards with a screenshot or diagram thumbnail, name, one-line description, award tag, stack and icon links.
   - Featured order: RidePulse, LUMEN (live demo), Guarded Agent Ensemble, SpatioX, EchoLine, Distributed Cache (in progress).
   - No interactive figures in the default view. Optionally, one small interaction survives in a card, such as the RidePulse "dispatch a ride" pulse on hover.
6. **Stack**
   - A compact logo grid, grouped: Languages / Backend / Data / Infra / AI.
7. **Achievements**
   - A small row inside About or its own strip: LeetCode 2108, Codeforces Specialist, 86th of 27,000+, Hack-a-Sol runner-up.
8. **Contact**
   - A short, warm sign-off with an email button and links.
   - Keep one playful line, such as "Send me your slowest endpoint." as a sign-off rather than a billboard.

### Visual direction (to choose, see open questions)

- **Option A: Profile column (recommended).**
  - A narrow centered column with dark and light themes.
  - The Wanderer, which is already his GitHub identity, becomes the **wide banner** above the avatar, duotoned to the palette. That's personal and not borrowed from anyone.
  - Clean sans type at normal sizes; the H1 is his name at about 48 px, not a 200 px slogan.
  - Tactile touches: the photo tilts slightly on hover, a hand-drawn underline marks the highlighted phrases, and the heatmap is framed as a small receipt-style card.
- **Option B: Engineer's desk.**
  - A tactile scene in the spirit of arjunr / mittalparth, re-themed to a backend engineer's desk: an index-card bio, a polaroid, and a thermal-printer receipt for the GitHub heatmap and LeetCode stats. Projects are pinned cards.
  - It is more memorable, but close to an existing template and heavier to build.

### What to keep from the current build

- The GitHub contributions pipeline (parser, tests, build-time snapshot, cached Vercel function) and the heatmap component, restyled.
- The content files (`src/content/*`), rewritten in first person.
- Accessibility and Vercel groundwork: skip link, focus rings, reduced motion, theme toggle without flash, self-hosted fonts, and the grid-blowout and zero-glyph fixes.
- Possibly the typefaces (Mona Sans for body, Hubot Sans used sparingly), depending on the chosen direction.

### What to drop

- The slogan hero and the latency meter as the centerpiece.
- The full-width case-study layout and the three large interactive figures (`DispatchPipeline`, `QueryRouter`, `DefenseLadder`). They are good engineering but the wrong emphasis. They could return later as detail pages.
- The "index at the back of a book" stack section.
- Brand-voice section headings.

## 4. What I need from Nishant

1. **A real photo** for the avatar, at least 800 × 800. Head and shoulders is ideal; a casual photo is fine.
2. **Photos for "Lately"**: 3 to 6 shots (hackathons, team, events, desk), each with a one-line caption.
3. **Project thumbnails** if any exist: screenshots of LUMEN, EchoLine and GAE's architecture page. Otherwise I'll capture what's public.
4. **Personality details**: one or two fun facts, what you do outside code, and anything you'd like on the page (music, games, books, sport).
5. **X / Twitter handle**, if you want it linked.
6. **Phone-free résumé PDF** (still pending).

## 5. Decisions (2026-09-26)

- Direction: **Option A, profile column.**
- Theme: **dark first**, with a light toggle (the choice is remembered).
- The Wanderer: **wide duotone banner above the real photo.**
- Interactive project demos: **none.** Plain project cards only. `DispatchPipeline`, `QueryRouter` and `DefenseLadder` are removed from the page.
- **No personal photos are available.**
  - The avatar is a close crop of the Wanderer figure; the banner is a wide crop of the fog.
  - The "Lately" photo strip is dropped.
  - Project thumbnails come from real repo material:
    - a screenshot of the live LUMEN demo
    - the RidePulse architecture diagram
    - the GAE architecture page
    - EchoLine screenshots
    - real code excerpts for SpatioX and Distributed Cache
- Stack uses filterable logo chips (All / Languages / Backend / Data / Infra / AI), with the header as a pill nav and a sliding active indicator.
