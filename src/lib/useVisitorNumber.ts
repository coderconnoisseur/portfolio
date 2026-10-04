import { useEffect, useState } from 'react'

const KEY = 'visitor-number'

/**
 * This browser's place in the visitor count. Counted once per browser: the number is
 * kept in localStorage, so reloads and return visits don't inflate it.
 * Returns null until known, and stays null if the counter is unavailable.
 */
export function useVisitorNumber() {
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    let saved = 0
    try {
      saved = Number(localStorage.getItem(KEY)) || 0
    } catch {
      // Storage can be blocked; then we count this visit and simply can't remember it.
    }
    if (saved > 0) return setN(saved)

    fetch('/api/visits', { method: 'POST' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { visitor?: number } | null) => {
        if (!data?.visitor) return
        setN(data.visitor)
        try {
          localStorage.setItem(KEY, String(data.visitor))
        } catch {
          // See above.
        }
      })
      .catch(() => {})
  }, [])

  return n
}
