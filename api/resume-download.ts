// Vercel Function: counts clicks on the résumé button (sent with navigator.sendBeacon).
import { failed, json, redis } from './_redis.ts'

export async function POST() {
  try {
    return json({ resumeDownloads: Number(await redis('INCR', 'resume_downloads')) })
  } catch (err) {
    return failed(err)
  }
}
