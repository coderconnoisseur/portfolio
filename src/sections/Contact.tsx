import { ArrowUpRightIcon, CheckIcon, CopyIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { WaveGopher } from '../components/Gophers.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { contact, profile } from '../content/profile.ts'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard can be blocked; the address is visible on the page anyway.
    }
  }

  return (
    <button type="button" onClick={copy} className="group inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] text-ink-2 hover:text-ink">
      {copied ? (
        <CheckIcon size={16} weight="bold" aria-hidden="true" className="text-signal" />
      ) : (
        <CopyIcon size={16} weight="bold" aria-hidden="true" className="text-ink-3 group-hover:text-signal" />
      )}
      <span className="link-draw">{copied ? contact.copied : profile.email}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap border-t border-rule py-16 sm:py-20">
      <Reveal className="group relative mt-12">
        <WaveGopher />
        <div className="relative overflow-hidden border border-rule bg-paper-2 px-6 py-10 sm:px-10 sm:py-14">
          <span aria-hidden="true" className="absolute top-0 left-0 h-full w-1 bg-signal" />
          <p className="text-sm text-ink-3">You made it to the end.</p>
          <h2 id="contact-title" className="mt-2 max-w-[18ch] font-display text-[clamp(2rem,5vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.03em] [font-stretch:115%]">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-2">{contact.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="pill pill-solid group">
              <span className="roll">
                <span>{contact.primary}</span>
                <span aria-hidden="true">Say hello</span>
              </span>
              <span className="pill-badge" aria-hidden="true">
                <ArrowUpRightIcon size={14} weight="bold" />
              </span>
            </a>
            <CopyEmail />
          </div>
          <ul className="mt-6 flex gap-2">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" data-tip="GitHub" aria-label="GitHub (opens in a new tab)" className="dock-btn">
                <GithubLogoIcon size={18} weight="bold" />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-tip="LinkedIn" aria-label="LinkedIn (opens in a new tab)" className="dock-btn">
                <LinkedinLogoIcon size={18} weight="bold" />
              </a>
            </li>
            <li>
              <a href={profile.x} target="_blank" rel="noreferrer" data-tip={`@${profile.xHandle}`} aria-label={`X, @${profile.xHandle} (opens in a new tab)`} className="dock-btn">
                <XLogoIcon size={17} weight="bold" />
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
