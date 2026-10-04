// One Redis command over Upstash's REST API, so the counters need no client library.
// The leading underscore keeps Vercel from deploying this file as its own function.
// Env vars come from the Upstash for Redis integration in the Vercel Marketplace.
export async function redis(...command: (string | number)[]) {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('visitor counter is not configured')
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(5_000),
  })
  const data = (await res.json()) as { result?: unknown; error?: string }
  if (!res.ok || data.error) throw new Error(data.error ?? `Redis responded ${res.status}`)
  return data.result
}

export const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } })

export const failed = (err: unknown) => json({ error: err instanceof Error ? err.message : 'unknown error' }, 503)
