import { useInView } from 'motion/react'
import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { summarize, toWeeks, type Day } from '../lib/contributions.ts'
import { formatDay, formatNumber, plural } from '../lib/format.ts'

// GitHub's contribution greens, per theme (see --heat-* in index.css).
const LEVELS = [0, 1, 2, 3, 4]
const cellColor = (level: number) => `var(--heat-${level})`

const MONTH = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })

type Tip = { left: number; top: number; text: string; below: boolean; align: 'start' | 'center' | 'end' }

/** GitHub activity as a calendar grid. `cellMax` caps cell size when few weeks are shown. */
export function ContributionMap({ days, cellMax }: { days: Day[]; cellMax?: number }) {
  const weeks = useMemo(() => toWeeks(days), [days])
  const summary = useMemo(() => summarize(days), [days])
  const wrap = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const seen = useInView(wrap, { once: true, amount: 0.3 })
  const [tip, setTip] = useState<Tip | null>(null)

  // On narrow screens the grid scrolls sideways; start on the most recent weeks.
  useLayoutEffect(() => {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [weeks.length])

  const months = weeks.map((w, i) => {
    const first = w.find((d): d is Day => d !== null)
    if (!first) return null
    const dom = Number(first.date.slice(8, 10))
    return dom <= 7 && i > 0 ? MONTH(first.date) : null
  })

  const onOver = (e: PointerEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>('[data-date]')
    if (!cell) return setTip(null)
    const count = Number(cell.dataset.count)
    // The grid sits in a scroll container that clips overflow, so the tooltip flips below
    // the cell on the top rows and hugs the edge on the first and last weeks.
    const width = (cell.offsetParent as HTMLElement | null)?.offsetWidth ?? 0
    const below = cell.offsetTop < 60
    const align = cell.offsetLeft < 120 ? 'start' : cell.offsetLeft > width - 120 ? 'end' : 'center'
    setTip({
      left: align === 'start' ? cell.offsetLeft : align === 'end' ? cell.offsetLeft + cell.offsetWidth : cell.offsetLeft + cell.offsetWidth / 2,
      top: below ? cell.offsetTop + cell.offsetHeight + 6 : cell.offsetTop - 6,
      below,
      align,
      text: `${count === 0 ? 'No' : formatNumber(count)} contribution${count === 1 ? '' : 's'} on ${formatDay(cell.dataset.date!)}`,
    })
  }

  if (days.length === 0) {
    return (
      <p className=" border border-dashed border-rule-strong p-8 text-ink-2">
        The contribution calendar is catching its breath. It lives on{' '}
        <a className="link-draw font-semibold text-ink" href="https://github.com/coderconnoisseur">
          GitHub
        </a>{' '}
        in the meantime.
      </p>
    )
  }

  const columns = `repeat(${weeks.length}, minmax(0, ${cellMax ? `${cellMax}px` : '1fr'}))`
  const first = days[0].date
  const last = days[days.length - 1].date
  const label = `GitHub contribution calendar: ${plural(summary.total, 'contribution')} from ${formatDay(first)} to ${formatDay(last)}. Longest streak ${plural(summary.longestStreak, 'day')}.`

  return (
    <div ref={wrap}>
      <div ref={scroller} className="overflow-x-auto pb-1">
        <div className={`relative ${weeks.length > 30 ? 'min-w-[40rem]' : 'min-w-[22rem]'}`}>
          <div
            aria-hidden="true"
            className="grid text-[0.6875rem] text-ink-3"
            style={{ gridTemplateColumns: columns }}
          >
            {months.map((m, i) => (
              <span key={i} className="h-5 overflow-visible whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>

          <div
            role="img"
            aria-label={label}
            data-in={seen}
            onPointerOver={onOver}
            onPointerLeave={() => setTip(null)}
            className="heat grid gap-[3px] sm:gap-1"
            style={{ gridTemplateColumns: columns }}
          >
            {weeks.map((week, col) => (
              <div key={col} className="flex flex-col gap-[3px] sm:gap-1" style={{ '--col': col } as CSSProperties}>
                {week.map((d, row) =>
                  d ? (
                    <span
                      key={d.date}
                      data-date={d.date}
                      data-count={d.count}
                      data-level={d.level || undefined}
                      className="heat-cell"
                    />
                  ) : (
                    <span key={`pad-${row}`} className="block aspect-square w-full" />
                  ),
                )}
              </div>
            ))}
          </div>

          {tip && (
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute z-10 bg-ink px-2.5 py-1.5 text-xs whitespace-nowrap text-paper ${
                tip.below ? '' : '-translate-y-full'
              } ${tip.align === 'center' ? '-translate-x-1/2' : tip.align === 'end' ? '-translate-x-full' : ''}`}
              style={{ left: tip.left, top: tip.top }}
            >
              {tip.text}
            </div>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="mt-4 flex items-center justify-end gap-1.5 text-[0.6875rem] text-ink-3">
        <span className="mr-1">Less</span>
        {LEVELS.map((l) => (
          <span key={l} className="inline-block size-2.5 shrink-0 rounded-[2px]" style={{ background: cellColor(l) }} />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  )
}
