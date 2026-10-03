import { afterEach, describe, expect, it, vi } from 'vitest'
import { POST as resumePOST } from '../api/resume-download.ts'
import { GET, POST } from '../api/visits.ts'

// Fakes Upstash's REST API: records each command and answers with `result`.
function fakeRedis(result: unknown) {
  const commands: unknown[] = []
  vi.stubEnv('KV_REST_API_URL', 'https://redis.example')
  vi.stubEnv('KV_REST_API_TOKEN', 'test-token')
  vi.stubGlobal('fetch', async (_url: string, init: RequestInit) => {
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer test-token')
    commands.push(JSON.parse(String(init.body)))
    return Response.json({ result })
  })
  return commands
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('visitor counter', () => {
  it('POST /api/visits counts a visitor and returns their number', async () => {
    const commands = fakeRedis(42)
    const res = await POST()
    expect(commands).toEqual([['INCR', 'visitors']])
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toEqual({ visitor: 42 })
  })

  it('GET /api/visits returns both totals, treating missing keys as zero', async () => {
    const commands = fakeRedis(['1234', null])
    expect(await (await GET()).json()).toEqual({ visitors: 1234, resumeDownloads: 0 })
    expect(commands).toEqual([['MGET', 'visitors', 'resume_downloads']])
  })

  it('POST /api/resume-download counts a click', async () => {
    const commands = fakeRedis(7)
    expect(await (await resumePOST()).json()).toEqual({ resumeDownloads: 7 })
    expect(commands).toEqual([['INCR', 'resume_downloads']])
  })

  it('answers 503 with a JSON error until the database is connected', async () => {
    vi.stubEnv('KV_REST_API_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    const res = await POST()
    expect(res.status).toBe(503)
    expect(await res.json()).toEqual({ error: 'visitor counter is not configured' })
  })
})
