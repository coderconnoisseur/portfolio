import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// Dark is the default; light is an explicit, remembered choice.
const currentTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function useTheme() {
  // Start from the prerendered default (dark) so hydration matches, then read the real choice.
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => setTheme(currentTheme()), [])

  useEffect(() => {
    // Keep the browser chrome in step with the page.
    const color = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', color)
  }, [theme])

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    if (next === 'light') document.documentElement.dataset.theme = 'light'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit.
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
