import { describe, expect, it } from 'vitest'
import { formatDay, formatDuration, plural } from './format.ts'

describe('formatDuration', () => {
  it('keeps sub-second values in milliseconds with a non-breaking space', () => {
    expect(formatDuration(120)).toBe('120 ms')
    expect(formatDuration(339.6)).toBe('340 ms')
  })

  it('switches to seconds from 1000 ms', () => {
    expect(formatDuration(2800)).toBe('2.8 s')
    expect(formatDuration(12_400)).toBe('12 s')
  })
})

describe('formatDay', () => {
  it('formats in UTC so the date never drifts across time zones', () => {
    expect(formatDay('2026-07-08')).toBe('Wed, Jul 8, 2026')
  })
})

describe('plural', () => {
  it('picks the right noun and groups thousands', () => {
    expect(plural(1, 'day')).toBe('1 day')
    expect(plural(1087, 'contribution')).toBe('1,087 contributions')
  })
})
