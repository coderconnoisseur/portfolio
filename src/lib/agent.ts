// Markdown versions of the page for AI agents, served by middleware.ts when a request
// prefers text/markdown. Built from the same content modules as the page, so they never drift.
import { achievements } from '../content/achievements.ts'
import { education, experience } from '../content/experience.ts'
import { about, contact, hero, profile } from '../content/profile.ts'
import { projects } from '../content/projects.ts'
import { stackGroups, tools } from '../content/stack.ts'

export const SITE = 'https://nishantbuilds.me'

/** True when the Accept header ranks text/markdown at least as high as text/html. */
export function prefersMarkdown(accept: string | null) {
  const q = (type: string) => {
    for (const part of (accept ?? '').split(',')) {
      const [media, ...params] = part.split(';').map((s) => s.trim().toLowerCase())
      if (media !== type) continue
      const weight = params.find((p) => p.startsWith('q='))
      return weight ? Number(weight.slice(2)) || 0 : 1
    }
    return 0
  }
  const md = q('text/markdown')
  return md > 0 && md >= q('text/html')
}

export function homeMarkdown() {
  const cv = `${SITE}${profile.resume}`
  return [
    `# ${profile.name}`,
    `> ${profile.role}. ${hero.line}`,
    hero.now,
    [
      `- Location: ${profile.location}`,
      `- Education: ${education.role}, ${education.org} (${education.period})`,
      `- Availability: ${profile.availability}`,
      `- Email: [${profile.email}](mailto:${profile.email})`,
      `- Résumé (PDF): [${cv}](${cv})`,
    ].join('\n'),
    '## About',
    about.map((b) => `- ${b.before}${b.mark}${b.after}`).join('\n'),
    '## Experience',
    ...[...experience, education].map((e) =>
      [`### ${e.role}, ${e.org}`, `${e.period} · ${e.place}`, '', ...e.points.map((p) => `- ${p}`)].join('\n'),
    ),
    '## Projects',
    ...projects.map((p) =>
      [
        `### ${p.name}`,
        `${p.category} · ${p.year}${p.status ? ` · ${p.status}` : ''}`,
        '',
        p.line,
        '',
        `- Highlight: ${p.highlight}`,
        `- Stack: ${p.stack.join(', ')}`,
        ...p.links.map((l) => `- ${l.kind === 'live' ? 'Live demo' : 'Source'}: [${l.href}](${l.href})`),
      ].join('\n'),
    ),
    '## Stack',
    stackGroups.map((g) => `- ${g}: ${tools.filter((t) => t.group === g).map((t) => t.name).join(', ')}`).join('\n'),
    '## Achievements',
    achievements.map((a) => `- ${a.value}: ${a.label}`).join('\n'),
    '## Contact',
    contact.body,
    [
      `- Email: [${profile.email}](mailto:${profile.email})`,
      `- GitHub: [${profile.github}](${profile.github})`,
      `- LinkedIn: [${profile.linkedin}](${profile.linkedin})`,
      `- X: [${profile.x}](${profile.x})`,
      `- LeetCode: [${profile.leetcode}](${profile.leetcode})`,
    ].join('\n'),
    `Guidance for agents: [${SITE}/llms.txt](${SITE}/llms.txt)`,
  ].join('\n\n') + '\n'
}

export function notFoundMarkdown(path: string) {
  return [
    '# 404: page not found',
    `There is no page at \`${path}\`. This site is a single page: everything about ${profile.name} lives on the homepage.`,
    [
      `- Homepage (send \`Accept: text/markdown\` for Markdown): [${SITE}/](${SITE}/)`,
      `- Agent guide: [${SITE}/llms.txt](${SITE}/llms.txt)`,
      `- Sitemap: [${SITE}/sitemap.xml](${SITE}/sitemap.xml)`,
    ].join('\n'),
  ].join('\n\n') + '\n'
}
