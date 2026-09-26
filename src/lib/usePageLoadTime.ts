import { useEffect, useState } from 'react'

/**
 * How long this page took to reach the visitor, measured in their own browser:
 * Largest Contentful Paint where supported, otherwise the load event.
 * Returns null until there is an honest number to show.
 */
export function usePageLoadTime() {
  const [ms, setMs] = useState<number | null>(null)

  useEffect(() => {
    let lcp = 0
    let observer: PerformanceObserver | undefined
    try {
      observer = new PerformanceObserver((list) => {
        const last = list.getEntries().at(-1)
        if (last) lcp = last.startTime
      })
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      // LCP is not available in every browser.
    }

    const settle = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const value = lcp || nav?.loadEventEnd || nav?.domContentLoadedEventEnd || 0
      if (value > 0) setMs(value)
    }

    // LCP stops updating at the first interaction; reading after load plus a beat is close enough.
    const onLoad = () => window.setTimeout(settle, 1500)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return ms
}
