import { ArrowUpRightIcon, DownloadSimpleIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { siLeetcode } from '../content/icons.generated.ts'
import { hero, images, profile } from '../content/profile.ts'
import { easeOutExpo } from '../lib/motion.ts'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: easeOutExpo },
})

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" className="fill-current">
    <path d={siLeetcode.path} />
  </svg>
)

const socials = [
  { label: 'GitHub', href: profile.github, icon: <GithubLogoIcon size={18} weight="bold" /> },
  { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinLogoIcon size={18} weight="bold" /> },
  { label: 'LeetCode', href: profile.leetcode, icon: <LeetCodeIcon /> },
  { label: `@${profile.xHandle}`, href: profile.x, icon: <XLogoIcon size={17} weight="bold" /> },
]

/** Three kinds of control, three shapes: a solid call to action, a file, and a row of round icons. */
function Actions() {
  return (
    <m.div {...rise(0.5)} className="mt-7 flex flex-wrap items-center gap-3">
      <a href={`mailto:${profile.email}`} className="pill pill-solid group">
        <span className="roll">
          <span>Email me</span>
          <span aria-hidden="true">Say hello</span>
        </span>
        <span className="pill-badge" aria-hidden="true">
          <ArrowUpRightIcon size={14} weight="bold" />
        </span>
      </a>
      <a
        href={profile.resume}
        download="Nishant_Borkar_Resume.pdf"
        onClick={() => navigator.sendBeacon?.('/api/resume-download')}
        className="pill group"
      >
        <DownloadSimpleIcon
          size={16}
          weight="bold"
          aria-hidden="true"
          className="text-ink-3 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5 group-hover:text-signal"
        />
        Résumé
        <span className="border border-rule-strong px-1 py-px font-mono text-[0.5625rem] tracking-wide text-ink-3">PDF</span>
      </a>
      <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-rule-strong sm:block" />
      <ul className="flex gap-2">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" data-tip={s.label} aria-label={`${s.label} (opens in a new tab)`} className="dock-btn">
              {s.icon}
            </a>
          </li>
        ))}
      </ul>
    </m.div>
  )
}

export function Hero() {
  const frame = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // As you scroll, the view pans down the painting: from the wanderer's head to the rock he stands on.
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start 64px', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '-44%'])

  return (
    <section id="top" aria-labelledby="hero-title" className="wrap pt-4 pb-14 sm:pt-6">
      <m.div
        ref={frame}
        className="relative aspect-[2/1] overflow-hidden border border-rule bg-paper-2 sm:aspect-[3.1/1]"
        initial={reduce ? false : { clipPath: 'inset(0 50% 0 50%)' }}
        animate={{ clipPath: 'inset(0 0% 0 0%)' }}
        transition={{ duration: 1.3, ease: easeOutExpo }}
      >
        <m.img
          src={images.banner.src}
          srcSet={images.banner.srcSet}
          sizes="(min-width: 1152px) 1072px, 100vw"
          alt={images.banner.alt}
          width={images.banner.width}
          height={images.banner.height}
          fetchPriority="high"
          style={{ y: reduce ? '-14%' : y }}
          className="absolute inset-x-0 top-0 h-auto w-full brightness-[var(--banner-dim)]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper/80 via-paper/20 to-transparent" />
        <span className="absolute right-3 bottom-2 text-[0.6875rem] text-ink/70">Friedrich, 1818</span>
      </m.div>

      <div className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        {/* A round portrait in a double ring: it sits on the painting but clearly apart from it. */}
        <m.div {...rise(0.15)} className="relative z-10 -mt-20 w-fit shrink-0 sm:-mt-24">
          <div className="rounded-full bg-paper p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)]">
            <div className="rounded-full p-[3px] [background:conic-gradient(from_210deg,var(--signal),transparent_35%,transparent_65%,var(--signal))]">
              <img
                src={images.photo.src}
                srcSet={images.photo.srcSet}
                sizes="(min-width: 640px) 152px, 120px"
                alt={images.photo.alt}
                width={152}
                height={152}
                className="size-30 rounded-full border-4 border-paper object-cover sm:size-38"
              />
            </div>
          </div>
          {/* The dot means what it says: available. */}
          <span className="absolute right-3 bottom-3 flex size-4 sm:right-4 sm:bottom-4" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-50 [animation-duration:2.4s]" />
            <span className="relative size-4 rounded-full border-[3px] border-paper bg-signal" />
          </span>
          <p
            aria-hidden="true"
            className="absolute top-3 left-[calc(100%+0.25rem)] hidden -rotate-6 font-hand text-xl leading-none whitespace-nowrap text-signal sm:block"
          >
            <svg viewBox="0 0 40 24" className="mr-1 inline-block h-4 w-7 -translate-y-0.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
              <path d="M38 12 C 26 4, 14 4, 4 14 M4 14 l 7 -1 M4 14 l 1 -7" />
            </svg>
            hey, that’s me
          </p>
        </m.div>

        <div className="min-w-0 sm:pt-2">
          <m.p {...rise(0.2)} className="flex flex-wrap items-center gap-x-2 text-sm text-ink-3">
            <span>{profile.location}</span>
            <span aria-hidden="true">/</span>
            <span>{profile.school}</span>
            <span aria-hidden="true">/</span>
            <span className="text-ink-2">{profile.availability}</span>
          </m.p>

          <m.h1
            {...rise(0.26)}
            id="hero-title"
            className="mt-2 font-name text-[clamp(2.75rem,7vw,4.25rem)] leading-[0.98] tracking-[-0.015em]"
          >
            {profile.name}
          </m.h1>
          <m.p {...rise(0.32)} className="mt-3 font-display text-[1.0625rem] font-semibold tracking-[-0.005em] text-ink-2 [font-stretch:112%]">
            {profile.role}
          </m.p>

          <m.p {...rise(0.4)} className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink">
            {hero.line}
          </m.p>
          <m.p {...rise(0.44)} className="mt-1.5 max-w-[60ch] text-[0.9375rem] text-ink-3">
            {hero.now}
          </m.p>

          <Actions />
        </div>
      </div>
    </section>
  )
}
