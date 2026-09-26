import { ArrowUpIcon } from '@phosphor-icons/react'
import { profile } from '../content/profile.ts'
import { formatDuration } from '../lib/format.ts'
import { usePageLoadTime } from '../lib/usePageLoadTime.ts'

export function Footer() {
  const loadMs = usePageLoadTime()
  const year = new Date().getFullYear()

  return (
    <footer className="wrap pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-col gap-3 border-t border-rule pt-6 text-[0.8125rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Banner: Friedrich’s <i>Wanderer above the Sea of Fog</i> (1818). Gophers by Renée French, CC BY 4.0.
        </p>
        <div className="flex items-center gap-5">
          {/* Measured in the visitor's own browser: a small nod to the slow-path obsession. */}
          {loadMs !== null && (
            <p className="tabular" title="Largest Contentful Paint, measured in your browser">
              Loaded in <span className="text-ink-2">{formatDuration(loadMs)}</span>
            </p>
          )}
          <a href="#top" className="group inline-flex min-h-6 items-center gap-1 text-ink-2 hover:text-ink">
            Top
            <ArrowUpIcon size={13} weight="bold" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
