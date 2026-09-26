import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { m, useInView } from 'motion/react'
import { useMemo, useRef } from 'react'
import { Reveal } from '../components/Reveal.tsx'
import { Section } from '../components/Section.tsx'
import { achievements } from '../content/achievements.ts'
import { about, profile } from '../content/profile.ts'
import { ContributionMap } from '../figures/ContributionMap.tsx'
import { summarize } from '../lib/contributions.ts'
import { formatNumber, plural } from '../lib/format.ts'
import { easeOutExpo, inView } from '../lib/motion.ts'
import { useContributions } from '../lib/useContributions.ts'

function Bullets() {
  const ref = useRef<HTMLUListElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  return (
    <ul ref={ref} data-in={seen} className="grid max-w-[64ch] gap-3.5 text-[1.0625rem] leading-relaxed text-ink-2">
      {about.map((b, i) => (
        <m.li
          key={b.mark}
          className="flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, delay: i * 0.06, ease: easeOutExpo }}
        >
          <span aria-hidden="true" className="mt-[0.62em] size-1.5 shrink-0 rotate-45 bg-signal" />
          <span>
            {b.before}
            <span className="mark" style={{ transitionDelay: `${250 + i * 120}ms` }}>
              {b.mark}
            </span>
            {b.after}
          </span>
        </m.li>
      ))}
    </ul>
  )
}

function Stats() {
  return (
    <ul className="mt-10 grid grid-cols-2 overflow-hidden border border-rule sm:grid-cols-4">
      {achievements.map((a, i) => {
        const inner = (
          <>
            <span className="block font-display text-[1.75rem] leading-none font-bold [font-stretch:112%]">{a.value}</span>
            <span className="mt-2 block text-[0.8125rem] leading-snug text-ink-3">{a.label}</span>
          </>
        )
        return (
          <li
            key={a.label}
            className={`bg-paper-2/60 p-4 sm:p-5 ${i % 2 ? 'border-l border-rule' : ''} ${i > 1 ? 'border-t border-rule sm:border-t-0' : ''} ${
              i === 2 ? 'sm:border-l' : ''
            }`}
          >
            {a.href ? (
              <a href={a.href} target="_blank" rel="noreferrer" className="group block">
                {inner}
                <span className="sr-only">(LeetCode profile, opens in a new tab)</span>
              </a>
            ) : (
              inner
            )}
          </li>
        )
      })}
    </ul>
  )
}

function GitHubCard() {
  const { days } = useContributions()
  const s = useMemo(() => summarize(days), [days])
  return (
    <Reveal className="mt-10">
      <div className=" border border-rule bg-paper-2/60 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold">GitHub activity</h3>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-6 items-center gap-1 text-sm text-ink-3 hover:text-ink"
          >
            @{profile.githubHandle}
            <ArrowUpRightIcon size={13} weight="bold" aria-hidden="true" className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <ContributionMap days={days} />
        <p className="mt-3 text-[0.8125rem] text-ink-3">
          <span className="text-ink">{formatNumber(s.total)}</span> contributions in the last year. Longest streak{' '}
          <span className="text-ink">{plural(s.longestStreak, 'day')}</span>.
        </p>
      </div>
    </Reveal>
  )
}

export function About() {
  return (
    <Section id="about" title="About">
      <Bullets />
      <Stats />
      <GitHubCard />
    </Section>
  )
}
