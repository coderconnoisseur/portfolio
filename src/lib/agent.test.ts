import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { projects } from '../content/projects.ts'
import { homeMarkdown, notFoundMarkdown, prefersMarkdown } from './agent.ts'

describe('prefersMarkdown', () => {
  it('is true when an agent asks for Markdown', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true)
    expect(prefersMarkdown('Text/Markdown; charset=utf-8')).toBe(true)
  })

  it('is false for browsers, wildcards and missing headers', () => {
    expect(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')).toBe(false)
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown(null)).toBe(false)
  })

  it('respects q-values', () => {
    expect(prefersMarkdown('text/html, text/markdown;q=0.5')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
  })
})

describe('homeMarkdown', () => {
  const md = homeMarkdown()

  it('opens with the name as the only H1 and carries real content', () => {
    expect(md.startsWith('# Nishant Borkar\n')).toBe(true)
    expect(md.match(/^# /gm)).toHaveLength(1)
    expect(md.length).toBeGreaterThan(2000)
  })

  it('covers every section and project on the page', () => {
    for (const h of ['## About', '## Experience', '## Projects', '## Stack', '## Achievements', '## Contact']) expect(md).toContain(h)
    for (const p of projects) expect(md).toContain(`### ${p.name}`)
    expect(md).toContain('mailto:nishantborkar28@gmail.com')
    expect(md).toContain('https://nishantbuilds.me/llms.txt')
  })
})

describe('notFoundMarkdown', () => {
  it('explains the error and links to the homepage, llms.txt and sitemap', () => {
    const md = notFoundMarkdown('/nope')
    expect(md.startsWith('# 404')).toBe(true)
    expect(md).toContain('`/nope`')
    expect(md).toContain('](https://nishantbuilds.me/llms.txt)')
    expect(md).toContain('](https://nishantbuilds.me/sitemap.xml)')
  })
})

// https://llmstxt.org: H1, blockquote summary, free text without headings, then H2 sections of link lists.
describe('public/llms.txt', () => {
  const txt = readFileSync(new URL('../../public/llms.txt', import.meta.url), 'utf8')
  const [preamble, ...sections] = txt.split(/^## /m)

  it('follows the llms.txt layout', () => {
    expect(preamble.startsWith('# Nishant Borkar\n\n> ')).toBe(true)
    expect(preamble.match(/^#/gm)).toHaveLength(1)
    for (const s of sections) {
      const items = s.split('\n').slice(1).filter(Boolean)
      expect(items.length).toBeGreaterThan(0)
      for (const line of items) expect(line).toMatch(/^- \[[^\]]+\]\([^)]+\)(: .+)?$/)
    }
  })

  it('tells agents when to use the site and how to call it', () => {
    const when = sections.find((s) => s.startsWith('When to use this\n'))
    expect(when).toBeDefined()
    expect(when).toContain('Accept: text/markdown')
  })
})
