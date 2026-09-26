import { ArrowUpRightIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react'
import { m } from 'motion/react'
import { CodeThumb } from '../components/CodeThumb.tsx'
import { PeekGopher } from '../components/Gophers.tsx'
import { Section } from '../components/Section.tsx'
import { projects, type Project } from '../content/projects.ts'
import { easeOutExpo, inView } from '../lib/motion.ts'

function Card({ p, index }: { p: Project; index: number }) {
  const primary = p.links.find((l) => l.kind === 'live') ?? p.links[0]
  return (
    <m.article
      id={`project-${p.id}`}
      aria-labelledby={`project-${p.id}-name`}
      className="ticks group relative flex flex-col overflow-hidden border border-rule bg-paper-2/50 transition-[border-color,background-color] duration-300 hover:border-rule-strong hover:bg-paper-2"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: easeOutExpo }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-paper-3">
        <div className="size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.035]">
          {p.thumb.kind === 'image' ? (
            <img
              src={p.thumb.src}
              alt={p.thumb.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top brightness-[var(--banner-dim)]"
            />
          ) : (
            <CodeThumb file={p.thumb.file} lang={p.thumb.lang} code={p.thumb.code} />
          )}
        </div>
        {p.stack.includes('Go') && <PeekGopher />}
        {p.status && (
          <span className="absolute top-3 left-3 border border-signal/50 bg-paper/85 px-2.5 py-1 text-xs font-medium text-signal-ink backdrop-blur-sm">
            {p.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 id={`project-${p.id}-name`} className="font-display text-xl font-bold tracking-[-0.01em] [font-stretch:110%]">
            {/* The whole card is clickable through this link; the icon links below sit above it. */}
            <a href={primary.href} target="_blank" rel="noreferrer" className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-signal">
              {p.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </h3>
          <span className="shrink-0 text-sm text-ink-3">{p.year}</span>
        </div>
        <p className="mt-1 text-[0.8125rem] font-medium text-signal-ink">{p.category}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{p.line}</p>
        <p className="mt-3 border-l-2 border-signal/60 pl-3 text-sm leading-snug text-ink">{p.highlight}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="text-[0.8125rem] leading-snug text-ink-3">{p.stack.join(', ')}</p>
          <ul className="relative z-10 flex shrink-0 gap-1">
            {p.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} ${l.kind === 'live' ? 'live demo' : 'source on GitHub'} (opens in a new tab)`}
                  data-tip={l.kind === 'live' ? 'Live demo' : 'Source'}
                  className="dock-btn size-9"
                >
                  {l.kind === 'live' ? <GlobeIcon size={16} weight="bold" /> : <GithubLogoIcon size={16} weight="bold" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ArrowUpRightIcon
        size={18}
        weight="bold"
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 bg-paper/85 p-1 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 size-7 -translate-x-1"
      />
    </m.article>
  )
}

export function Projects() {
  return (
    <Section id="projects" title="Projects" sub="A few things I’ve built, most of them to find out how something really works.">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.id} p={p} index={i} />
        ))}
      </div>
    </Section>
  )
}
