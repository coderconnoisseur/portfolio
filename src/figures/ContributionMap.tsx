import { useInView } from 'motion/react'
import { useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { summarize, toWeeks, type Day } from '../lib/contributions.ts'
import { formatDay, formatNumber, plural } from '../lib/format.ts'

const LEVEL_MIX = [0, 32, 55, 78, 100]
const cellColor = (level: number) =>
  level === 0
    ? 'color-mix(in oklab, var(--ink) 7%, transparent)'
    : `color-mix(in oklab, var(--signal) ${LEVEL_MIX[level]}%, var(--paper-2))`

const MONTH = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })

type Tip = { left: number; top: number; text: string }

/** A year of GitHub activity, drawn in the site's own palette. */
export function ContributionMap({ days }: { days: Day[] }) {
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
    setTip({
      left: cell.offsetLeft + cell.offsetWidth / 2,
      top: cell.offsetTop,
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

  const first = days[0].date
  const last = days[days.length - 1].date
  const label = `GitHub contribution calendar: ${plural(summary.total, 'contribution')} from ${formatDay(first)} to ${formatDay(last)}. Longest streak ${plural(summary.longestStreak, 'day')}.`

  return (
    <div ref={wrap}>
      <div ref={scroller} className="overflow-x-auto pb-1">
        <div className="relative min-w-[40rem]">
          <div
            aria-hidden="true"
            className="grid text-[0.6875rem] text-ink-3"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
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
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
          >
            {weeks.map((week, col) => (
              <div key={col} className="flex flex-col gap-[3px] sm:gap-1">
                {week.map((d, row) =>
                  d ? (
                    <span
                      key={d.date}
                      data-date={d.date}
                      data-count={d.count}
                      className="heat-cell block aspect-square w-full rounded-[2px]"
                      style={{ background: cellColor(d.level), animationDelay: `${col * 14 + row * 10}ms` }}
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
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full bg-ink px-2.5 py-1.5 text-xs whitespace-nowrap text-paper"
              style={{ left: tip.left, top: tip.top - 6 }}
            >
              {tip.text}
            </div>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="mt-4 flex items-center justify-end gap-1.5 text-[0.6875rem] text-ink-3">
        <span className="mr-1">Less</span>
        {LEVEL_MIX.map((_, l) => (
          <span key={l} className="inline-block size-2.5 shrink-0 rounded-[2px]" style={{ background: cellColor(l) }} />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  )
}
