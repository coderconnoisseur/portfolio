import { describe, expect, it } from 'vitest'
import { formatDay, formatDuration, ordinal, plural } from './format.ts'

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

describe('ordinal', () => {
  it('picks st, nd, rd and th, with the teens always th', () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 101, 111, 112].map(ordinal)).toEqual([
      '1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '23rd', '101st', '111th', '112th',
    ])
  })

  it('groups thousands', () => {
    expect(ordinal(1023)).toBe('1,023rd')
  })
})
