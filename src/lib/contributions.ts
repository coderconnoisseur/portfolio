// Parses the HTML fragment GitHub serves at github.com/users/<name>/contributions.
// Pure and dependency-free so it runs in the browser, the Vercel function and the
// Node snapshot script alike.

export type Level = 0 | 1 | 2 | 3 | 4

export type Day = { date: string; count: number; level: Level }

export type ContributionData = { user: string; fetchedAt: string; days: Day[] }

export type Summary = {
  total: number
  longestStreak: number
  currentStreak: number
  busiest: Day | null
}

const DAY_MS = 86_400_000

const attr = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

export function parseContributions(html: string): Day[] {
  const counts = new Map<string, number>()
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = text.match(/^\s*([\d,]+)\s+contributions?/)
    counts.set(id, n ? Number(n[1].replaceAll(',', '')) : 0)
  }

  const days: Day[] = []
  for (const [tag] of html.matchAll(/<td\b[^>]*\sdata-date="[^"]+"[^>]*>/g)) {
    const date = attr(tag, 'data-date')
    const id = attr(tag, 'id')
    if (!date || !id) continue
    const level = Math.min(4, Math.max(0, Number(attr(tag, 'data-level') ?? 0))) as Level
    days.push({ date, count: counts.get(id) ?? 0, level })
  }

  return days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

const toTime = (date: string) => Date.parse(`${date}T00:00:00Z`)

export function summarize(days: Day[]): Summary {
  let total = 0
  let longestStreak = 0
  let run = 0
  let busiest: Day | null = null
  let prev: number | null = null

  for (const d of days) {
    const t = toTime(d.date)
    if (prev !== null && t - prev !== DAY_MS) run = 0
    prev = t
    total += d.count
    run = d.count > 0 ? run + 1 : 0
    longestStreak = Math.max(longestStreak, run)
    if (d.count > 0 && (!busiest || d.count > busiest.count)) busiest = d
  }

  // A streak survives an empty "today": GitHub's own streak counts through yesterday.
  let end = days.length - 1
  if (end >= 0 && days[end].count === 0) end -= 1
  let currentStreak = 0
  for (let i = end; i >= 0 && days[i].count > 0; i--) {
    if (i < end && toTime(days[i + 1].date) - toTime(days[i].date) !== DAY_MS) break
    currentStreak += 1
  }

  return { total, longestStreak, currentStreak, busiest }
}

/** Columns of seven slots (Sunday first), padded with null at both ends. */
export function toWeeks(days: Day[]): (Day | null)[][] {
  if (days.length === 0) return []
  const weeks: (Day | null)[][] = []
  let week: (Day | null)[] = Array(new Date(toTime(days[0].date)).getUTCDay()).fill(null)
  for (const d of days) {
    week.push(d)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)])
  return weeks
}
