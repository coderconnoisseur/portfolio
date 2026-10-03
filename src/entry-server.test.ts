import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { tools } from './content/stack.ts'
import { render } from './entry-server.tsx'

// Mirrors scripts/prerender.mjs: the HTML shell with the rendered app inside #root.
const shell = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const html = shell.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
const text = html
  .replace(/<(script|style)[\s\S]*?<\/\1>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

describe('prerendered homepage', () => {
  it('has exactly one H1', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
  })

  // Agent-readiness audits want 500+ characters of text and text at 5%+ of the HTML bytes.
  it('keeps text above 5% of the HTML', () => {
    expect(text.length).toBeGreaterThan(500)
    expect(text.length / html.length).toBeGreaterThan(0.055)
  })

  // Reveal animations start hidden; the <noscript> styles in index.html must undo every one of them.
  it('shows animated-in content when JavaScript is off', () => {
    const noscript = shell.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? ''
    const hiding = [...html.matchAll(/style="([^"]*(?:opacity:0|clip-path)[^"]*)"/g)].map((m) => m[1])
    expect(hiding.length).toBeGreaterThan(0)
    for (const style of hiding) expect(style.includes('opacity:0;') || style.includes('clip-path:inset(0 50%')).toBe(true)
    expect(noscript).toContain("[style*='opacity:0'] { opacity: 1 !important; transform: none !important; }")
    expect(noscript).toContain("[style*='clip-path:inset(0 50%'] { clip-path: none !important; }")
    expect(noscript).toContain('.heat .heat-cell { opacity: 1 !important; }')
  })

  it('gives every Organization in the JSON-LD an address and a contact point', () => {
    const orgs: Record<string, unknown>[] = []
    const walk = (n: unknown): void => {
      if (Array.isArray(n)) return n.forEach(walk)
      if (!n || typeof n !== 'object') return
      const o = n as Record<string, unknown>
      if (o['@type'] === 'Organization') orgs.push(o)
      Object.values(o).forEach(walk)
    }
    for (const [, json] of shell.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) walk(JSON.parse(json))
    expect(orgs.length).toBeGreaterThan(0)
    for (const o of orgs) {
      expect(o.address).toMatchObject({ '@type': 'PostalAddress' })
      expect(o.contactPoint).toMatchObject({ '@type': 'ContactPoint', contactType: expect.any(String), email: expect.any(String) })
    }
  })

  it('references stack icons from the sprite, and the sprite has each one', () => {
    const sprite = readFileSync(new URL('../public/images/brand-icons.svg', import.meta.url), 'utf8')
    for (const t of tools.filter((t) => t.icon)) {
      expect(html).toContain(`/images/brand-icons.svg#${t.icon!.slug}`)
      expect(sprite).toContain(`<symbol id="${t.icon!.slug}"`)
    }
  })
})
