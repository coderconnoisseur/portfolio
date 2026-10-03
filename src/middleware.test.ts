import { describe, expect, it } from 'vitest'
import middleware from '../middleware.ts'

const get = (path: string, accept: string) => middleware(new Request(`https://nishantbuilds.me${path}`, { headers: { accept } }))
const browser = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

describe('middleware', () => {
  it('serves the homepage as Markdown to agents', async () => {
    const res = get('/', 'text/markdown')!
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(res.headers.get('vary')).toBe('Accept')
    expect(await res.text()).toMatch(/^# Nishant Borkar\n/)
  })

  it('answers unknown paths with a Markdown 404', async () => {
    const res = get('/__ora-404-probe-1fv3w6d7', 'text/markdown')!
    expect(res.status).toBe(404)
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(res.headers.get('vary')).toBe('Accept')
    expect(await res.text()).toContain('https://nishantbuilds.me/llms.txt')
  })

  it('leaves browsers and static files to the static site', () => {
    expect(get('/', browser)).toBeUndefined()
    expect(get('/missing', browser)).toBeUndefined()
    expect(get('/llms.txt', 'text/markdown')).toBeUndefined()
    expect(get('/Nishant_Borkar_Resume.pdf', 'text/markdown')).toBeUndefined()
  })
})
