// Vercel Routing Middleware: requests that prefer text/markdown (AI agents) get Markdown;
// everything else, including every browser request, falls through to the static site untouched.
import { homeMarkdown, notFoundMarkdown, prefersMarkdown } from './src/lib/agent.ts'

export const config = { matcher: '/((?!api/|assets/|fonts/|images/).*)' }

const markdown = (body: string, status = 200) =>
  new Response(body, { status, headers: { 'content-type': 'text/markdown; charset=utf-8', vary: 'Accept' } })

export default function middleware(request: Request) {
  if (!prefersMarkdown(request.headers.get('accept'))) return
  const { pathname } = new URL(request.url)
  if (pathname === '/' || pathname === '/index.html') return markdown(homeMarkdown())
  // ponytail: the site is one page, so any extensionless path is a 404; paths with an extension
  // fall through to the static files (and Vercel's HTML 404). Add a route list if pages appear.
  if (!pathname.slice(pathname.lastIndexOf('/')).includes('.')) return markdown(notFoundMarkdown(pathname), 404)
}
