// Runs before every build: bakes the last year of GitHub contributions into the
// bundle so the heatmap paints instantly. Keeps the previous snapshot if GitHub
// is unreachable, so a flaky network never fails a deploy.
// Requires Node >= 22.18 (native TypeScript type stripping for the shared parser).
import { readFile, writeFile } from 'node:fs/promises'
import { parseContributions } from '../src/lib/contributions.ts'

const USER = 'coderconnoisseur'
const OUT = new URL('../src/data/contributions.json', import.meta.url)

try {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { 'user-agent': 'nishant-portfolio-snapshot' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
  const days = parseContributions(await res.text())
  if (days.length < 300) throw new Error(`only ${days.length} days parsed`)
  const data = { user: USER, fetchedAt: new Date().toISOString(), days }
  await writeFile(OUT, JSON.stringify(data) + '\n')
  console.log(`contributions: saved ${days.length} days`)
} catch (err) {
  const existing = await readFile(OUT, 'utf8').catch(() => null)
  if (!existing) {
    await writeFile(OUT, JSON.stringify({ user: USER, fetchedAt: null, days: [] }) + '\n')
  }
  console.warn(`contributions: kept previous snapshot (${err.message})`)
}
