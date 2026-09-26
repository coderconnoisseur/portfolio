// Vercel Function: fresh contribution data for the heatmap, cached at the edge
// for 12 hours so GitHub sees at most a couple of requests a day.
import { parseContributions } from '../src/lib/contributions.ts'

const USER = 'coderconnoisseur'

export async function GET() {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { 'user-agent': 'nishant-portfolio' },
      signal: AbortSignal.timeout(8_000),
    })
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
    const days = parseContributions(await res.text())
    if (days.length === 0) throw new Error('no days parsed')
    return Response.json(
      { user: USER, fetchedAt: new Date().toISOString(), days },
      { headers: { 'cache-control': 'public, s-maxage=43200, stale-while-revalidate=86400' } },
    )
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'unknown error' },
      { status: 502, headers: { 'cache-control': 'public, s-maxage=300' } },
    )
  }
}
