// Runs after both Vite builds: injects the server-rendered page into dist/index.html,
// so the first HTML response already contains the name, bio, experience and projects.
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-server/entry-server.js')
const file = new URL('../dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html')

await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`))
await rm(new URL('../dist-server', import.meta.url), { recursive: true, force: true })
console.log('prerender: dist/index.html now contains the rendered page')
