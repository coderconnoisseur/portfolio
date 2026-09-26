import { useEffect, useState } from 'react'
import snapshot from '../data/contributions.json'
import type { ContributionData } from './contributions.ts'

const baked = snapshot as ContributionData

/**
 * Paints the build-time snapshot immediately, then swaps in fresher data from the
 * cached Vercel function if it answers. Any failure just keeps the snapshot.
 */
export function useContributions(): ContributionData {
  const [data, setData] = useState(baked)

  useEffect(() => {
    if (import.meta.env.DEV) return // the Vercel function only exists in deployments
    const ctrl = new AbortController()
    fetch('/api/contributions', { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<ContributionData>) : null))
      .then((fresh) => {
        if (fresh?.days?.length && (!baked.fetchedAt || fresh.fetchedAt > baked.fetchedAt)) setData(fresh)
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  return data
}
