import { m, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { images, profile } from '../content/profile.ts'
import { useActiveSection } from '../lib/useActiveSection.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

const nav = [
  { id: 'about', label: 'About', mobile: false },
  { id: 'experience', label: 'Experience', mobile: false },
  { id: 'projects', label: 'Projects', mobile: true },
  { id: 'stack', label: 'Stack', mobile: true },
  { id: 'contact', label: 'Contact', mobile: true },
] as const

const ids = nav.map((n) => n.id)

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  const active = useActiveSection(ids)

  return (
    <header
      className={`sticky top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-paper/80 shadow-[0_1px_0_var(--rule)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-semibold">
          <img
            src={images.photo.small}
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full object-cover ring-1 ring-rule-strong"
          />
          <span className="max-sm:sr-only">{profile.firstName}</span>
        </a>

        <nav aria-label="Primary">
          <ul className="flex items-center rounded-full border border-rule bg-paper-2/70 p-1 text-sm backdrop-blur-sm">
            {nav.map((item) => {
              const on = active === item.id
              return (
                <li key={item.id} className={item.mobile ? undefined : 'max-sm:hidden'}>
                  <a
                    href={`#${item.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`relative isolate flex min-h-10 items-center rounded-full px-3 transition-colors duration-200 ${
                      on ? 'text-paper' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {/* One shared pill that slides to the section you are reading. */}
                    {on && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
