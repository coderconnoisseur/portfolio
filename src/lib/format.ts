const NBSP = ' '

/** 120 -> "120 ms", 2800 -> "2.8 s", with a non-breaking space before the unit. */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}${NBSP}ms`
  return `${(ms / 1000).toFixed(ms < 10_000 ? 1 : 0)}${NBSP}s`
}

export const formatNumber = (n: number) => n.toLocaleString('en-US')

/** "2026-07-08" -> "Wed, Jul 8, 2026", in UTC so the calendar date never shifts. */
export function formatDay(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export const plural = (n: number, one: string, many = `${one}s`) => `${formatNumber(n)}${NBSP}${n === 1 ? one : many}`
