# nishantborkar.dev

Personal portfolio of Nishant Borkar, Backend & AI Systems Engineer.
Single page, dark first, built with Vite, React, TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173, also on your LAN (see below)
npm test           # unit tests (contribution parser, formatting)
npm run build      # type-check, snapshot GitHub contributions, production build
npm run preview    # serve the production build on port 4173
```

Node 22.18 or newer is required: the build scripts import TypeScript directly.

### Open it on your phone

The dev and preview servers listen on every network interface (`server.host` in `vite.config.ts`).
With the laptop and phone on the same Wi-Fi, open `http://<laptop-ip>:5173` on the phone.
Vite prints the address as "Network" when it starts. On Windows, allow Node.js through the
firewall for private networks if the page doesn't load.

## Where things live

| Path | What it is |
|---|---|
| `src/content/` | Every word on the page. Edit copy here, not in components. |
| `src/sections/` | One file per section: Hero, About, Experience, Projects, Stack, Contact. |
| `src/components/` | Header, theme switch, section frame, reveal, code thumbnails, gophers. |
| `src/figures/ContributionMap.tsx` | The GitHub heatmap. |
| `src/lib/contributions.ts` | Parses GitHub's contribution calendar (tested). |
| `api/contributions.ts` | Vercel Function: fresh contribution data, cached 12 h at the edge. |
| `scripts/snapshot-contributions.mjs` | Runs before each build and bakes a snapshot into the bundle. |
| `scripts/gen-icons.mjs` | Copies only the brand icons in use out of `simple-icons` (`npm run icons`). |
| `public/` | Fonts, images, résumé, favicon, Open Graph image. |

## Deploying to Vercel

Import the repository; the Vite preset and `vercel.json` handle the rest (cache and security headers).
After the first deploy, set `VITE_SITE_URL` in `.env` (and in `public/robots.txt` and `public/sitemap.xml`)
to the real domain so canonical and Open Graph URLs are correct.

## Credits

- Banner: Caspar David Friedrich, *Wanderer above the Sea of Fog* (1818), public domain.
- Go gophers: Renée French, CC BY 4.0, from go.dev.
- Type: Hubot Sans and Mona Sans (GitHub), Martian Mono (Evil Martians), Gloock, Caveat. All SIL OFL, licenses in `public/fonts/`.
- Brand icons: Simple Icons (CC0). UI icons: Phosphor.
