import { m } from 'motion/react'
import { Section } from '../components/Section.tsx'
import { education, experience, type TimelineEntry } from '../content/experience.ts'
import { easeOutExpo, inView } from '../lib/motion.ts'

function Entry({ e, index, last }: { e: TimelineEntry; index: number; last: boolean }) {
  return (
    <m.li
      className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-10 last:pb-0"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, delay: index * 0.08, ease: easeOutExpo }}
    >
      {/* The spine joins each entry to the next. */}
      {!last && <span aria-hidden="true" className="absolute top-12 bottom-1 left-[1.375rem] w-px bg-rule" />}
      <span className="grid size-11 place-items-center overflow-hidden border border-rule bg-white p-1">
        <img src={e.logo} alt={`${e.org} logo`} width={40} height={40} loading="lazy" className="size-full object-contain" />
      </span>
      <div className="min-w-0 pt-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <h3 className="font-semibold text-ink">{e.org}</h3>
          <p className="text-sm text-ink-3">{e.period}</p>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="text-[0.9375rem] text-ink-2">{e.role}</p>
          <p className="text-sm text-ink-3">{e.place}</p>
        </div>
        <ul className="mt-3 grid gap-2 text-[0.9375rem] leading-relaxed text-ink-2">
          {e.points.map((p) => (
            <li key={p} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-2 shrink-0 bg-ink-3" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.li>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="Experience" sub="Where I’ve worked and studied.">
      <ol>
        {[...experience, education].map((e, i, all) => (
          <Entry key={e.org} e={e} index={i} last={i === all.length - 1} />
        ))}
      </ol>
    </Section>
  )
}
