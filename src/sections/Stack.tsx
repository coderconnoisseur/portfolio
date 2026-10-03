import { AnimatePresence, m } from 'motion/react'
import { useState, type CSSProperties } from 'react'
import type { BrandIcon } from '../content/icons.generated.ts'
import { Section } from '../components/Section.tsx'
import { stackGroups, tools, type StackGroup } from '../content/stack.ts'

type Filter = 'All' | StackGroup
const filters: Filter[] = ['All', ...stackGroups]

// Brand colours only where they stay readable; CSS picks the variant for the active theme.
function brandColor(icon: BrandIcon, theme: 'light' | 'dark') {
  const n = parseInt(icon.hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (theme === 'dark' && lum < 0.25) return undefined
  if (theme === 'light' && lum > 0.8) return undefined
  return `#${icon.hex}`
}

export function Stack() {
  const [filter, setFilter] = useState<Filter>('All')
  const shown = filter === 'All' ? tools : tools.filter((t) => t.group === filter)

  const tabs = (
    <div role="group" aria-label="Filter tools" className="flex max-w-full gap-4 overflow-x-auto border-b border-rule text-sm [scrollbar-width:none]">
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={filter === f}
          onClick={() => setFilter(f)}
          className={`relative min-h-10 shrink-0 transition-colors duration-200 ${filter === f ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}
        >
          {filter === f && (
            <m.span
              layoutId="stack-pill"
              className="absolute inset-x-0 -bottom-px h-0.5 bg-signal"
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            />
          )}
          {f}
        </button>
      ))}
    </div>
  )

  return (
    <Section id="stack" title="Stack" sub="Tools that have earned a place in the toolbox." aside={tabs}>
      <m.ul layout className="flex flex-wrap gap-2" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((t) => {
            return (
              <m.li
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="brand-chip group flex min-h-10 items-center gap-2 border border-rule bg-paper-2/60 px-3.5 text-sm text-ink transition-colors duration-200 hover:border-rule-strong"
                style={t.icon ? ({ '--brand-d': brandColor(t.icon, 'dark'), '--brand-l': brandColor(t.icon, 'light') } as CSSProperties) : undefined}
              >
                {t.icon && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 shrink-0 fill-current text-ink-3 transition-colors duration-200 group-hover:text-[var(--brand,var(--ink))]"
                  >
                    <use href={`/images/brand-icons.svg#${t.icon.slug}`} />
                  </svg>
                )}
                {t.name}
              </m.li>
            )
          })}
        </AnimatePresence>
      </m.ul>
    </Section>
  )
}
