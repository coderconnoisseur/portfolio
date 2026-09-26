export type TimelineEntry = {
  org: string
  logo: string
  role: string
  period: string
  place: string
  points: string[]
}

export const experience: TimelineEntry[] = [
  {
    org: 'Culinda',
    logo: '/images/logo-culinda.png',
    role: 'Software Engineering Intern, AI Platform',
    period: 'Apr 2026 to present',
    place: 'Remote',
    points: [
      'Ship Python and FastAPI microservices for Culinda’s ITSM and contract lifecycle products, scaling async services to 4× throughput.',
      'Built a Redis semantic cache over vector embeddings that cut P95 latency from 2.8 s to 120 ms, and automated indexing of 10,000+ documents.',
      'Lowered LLM inference cost by 35% and lifted RAG answer relevance by 18%, checked against an offline evaluation harness.',
    ],
  },
]

export const education: TimelineEntry = {
  org: 'National Institute of Technology, Raipur',
  logo: '/images/logo-nitrr.png',
  role: 'B.Tech, Computer Science and Engineering',
  period: '2023 to 2027',
  place: 'Raipur, India',
  points: [
    'CGPA 8.06 / 10.',
    'Documentation Executive at the Association of Computer Engineers (ACE), the department’s technical club: I maintained its technical documentation and wrote up events and workshops so the next batch could pick up where we left off.',
  ],
}
