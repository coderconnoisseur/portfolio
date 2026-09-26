import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { m } from 'motion/react'
import { useTheme } from '../lib/useTheme.ts'

/** A small switch: the knob slides to the chosen theme. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      className="group relative flex h-11 w-14 items-center justify-center"
    >
      <span className="relative flex h-7 w-12 items-center rounded-full border border-rule-strong bg-paper-2 px-0.5 transition-colors duration-200 group-hover:border-ink-3">
        <m.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
          className={`grid size-5.5 place-items-center rounded-full bg-ink text-paper ${dark ? 'ml-auto' : ''}`}
        >
          {dark ? <MoonIcon size={12} weight="fill" /> : <SunIcon size={12} weight="fill" />}
        </m.span>
      </span>
    </button>
  )
}
