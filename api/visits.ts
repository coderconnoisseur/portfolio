// Vercel Function: the visitor counter. The page POSTs once per browser (it remembers
// its number in localStorage) and shows "You're the Nth visitor"; GET returns the totals.
// ponytail: anyone can POST to inflate the count; add per-IP rate limiting if it ever matters.
import { failed, json, redis } from './_redis.ts'

export async function POST() {
  try {
    return json({ visitor: Number(await redis('INCR', 'visitors')) })
  } catch (err) {
    return failed(err)
  }
}

export async function GET() {
  try {
    const [visitors, resumeDownloads] = (await redis('MGET', 'visitors', 'resume_downloads')) as (string | null)[]
    return json({ visitors: Number(visitors ?? 0), resumeDownloads: Number(resumeDownloads ?? 0) })
  } catch (err) {
    return failed(err)
  }
}
