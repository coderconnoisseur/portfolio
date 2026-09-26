import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { parseContributions, summarize, toWeeks, type Day } from './contributions.ts'

const html = readFileSync(new URL('./__fixtures__/contrib.html', import.meta.url), 'utf8')

const day = (date: string, count: number): Day => ({ date, count, level: count === 0 ? 0 : 1 })

describe('parseContributions', () => {
  const days = parseContributions(html)

  it('reads every day cell', () => {
    expect(days).toHaveLength(14)
  })

  it('returns days in date order even though GitHub lists them row by row', () => {
    expect(days.map((d) => d.date)).toEqual([
      '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11', '2026-09-12',
      '2026-09-13', '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19',
    ])
  })

  it('takes counts from tooltips, treating "No contributions" as zero', () => {
    expect(days[0]).toEqual({ date: '2026-09-06', count: 0, level: 0 })
    expect(days[1]).toEqual({ date: '2026-09-07', count: 3, level: 2 })
    expect(days[2]).toEqual({ date: '2026-09-08', count: 1, level: 1 })
    expect(days[7]).toEqual({ date: '2026-09-13', count: 7, level: 4 })
  })

  it('returns an empty list for markup without a calendar', () => {
    expect(parseContributions('<html><body>rate limited</body></html>')).toEqual([])
  })
})

describe('summarize', () => {
  it('computes total, streaks and busiest day', () => {
    const s = summarize(parseContributions(html))
    expect(s.total).toBe(27)
    expect(s.longestStreak).toBe(4)
    expect(s.currentStreak).toBe(3)
    expect(s.busiest).toEqual({ date: '2026-09-13', count: 7, level: 4 })
  })

  it('does not break the current streak on a still-empty today', () => {
    const s = summarize([day('2026-09-01', 1), day('2026-09-02', 2), day('2026-09-03', 0)])
    expect(s.currentStreak).toBe(2)
  })

  it('treats a missing calendar date as a break', () => {
    const s = summarize([day('2026-09-01', 1), day('2026-09-02', 1), day('2026-09-05', 1)])
    expect(s.longestStreak).toBe(2)
    expect(s.currentStreak).toBe(1)
  })

  it('handles an empty year', () => {
    expect(summarize([])).toEqual({ total: 0, longestStreak: 0, currentStreak: 0, busiest: null })
  })
})

describe('toWeeks', () => {
  it('pads the first and last weeks so every column has seven slots, Sunday first', () => {
    // 2026-09-09 is a Wednesday; 2026-09-13 is a Sunday.
    const d = ['2026-09-09', '2026-09-10', '2026-09-11', '2026-09-12', '2026-09-13'].map((x) => day(x, 1))
    const weeks = toWeeks(d)
    expect(weeks).toHaveLength(2)
    expect(weeks[0]).toEqual([null, null, null, d[0], d[1], d[2], d[3]])
    expect(weeks[1]).toEqual([d[4], null, null, null, null, null, null])
  })

  it('returns no weeks for no days', () => {
    expect(toWeeks([])).toEqual([])
  })
})
