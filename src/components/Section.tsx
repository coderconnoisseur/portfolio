import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { easeOutExpo } from '../lib/motion.ts'
import { Reveal } from './Reveal.tsx'

type Props = { id: string; title: string; sub?: string; children: ReactNode; aside?: ReactNode }

/** Every section shares one frame: a hairline on top, a heading, an optional one-liner. */
export function Section({ id, title, sub, children, aside }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap relative py-14 sm:py-16">
      {/* The section rule draws itself in from the left as it enters view. */}
      <m.span
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px origin-left bg-rule-strong sm:inset-x-8 lg:inset-x-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
      />
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id={`${id}-title`} className="font-display text-[1.75rem] leading-tight font-bold tracking-[-0.02em] [font-stretch:112%]">
            {title}
          </h2>
          {sub && <p className="mt-1.5 text-[0.9375rem] text-ink-3">{sub}</p>}
        </div>
        {aside}
      </Reveal>
      {children}
    </section>
  )
}
