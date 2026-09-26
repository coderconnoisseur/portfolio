// Every string on the page lives in src/content. Edit copy here, not in components.
// House rules: first person, no em or en dashes, curly quotes, non-breaking space before units.

export const profile = {
  name: 'Nishant Borkar',
  firstName: 'Nishant',
  role: 'Backend & AI Systems Engineer',
  email: 'nishantborkar28@gmail.com',
  location: 'Raipur, India',
  school: 'NIT Raipur ’27',
  availability: 'open to internships & full-time roles',
  resume: '/Nishant_Borkar_Resume.pdf',
  github: 'https://github.com/coderconnoisseur',
  githubHandle: 'coderconnoisseur',
  linkedin: 'https://www.linkedin.com/in/nishantborkar',
  leetcode: 'https://leetcode.com/u/nishantborkar28',
  x: 'https://x.com/nishantBuilds',
  xHandle: 'nishantBuilds',
}

export const hero = {
  line: 'I build backend and AI systems, then chase down the slow parts until they aren’t.',
  now: 'Right now I’m at Culinda, helping make an AI platform faster, cheaper and more reliable.',
}

export const images = {
  banner: {
    src: '/images/banner-1920.jpg',
    srcSet: '/images/banner-1000.jpg 1000w, /images/banner-1920.jpg 1920w',
    width: 1920,
    height: 1552,
    alt: 'Wanderer above the Sea of Fog by Caspar David Friedrich: a man on a rocky summit above a sea of fog.',
  },
  photo: {
    src: '/images/nishant-200.jpg',
    srcSet: '/images/nishant-200.jpg 144w, /images/nishant-400.jpg 288w',
    small: '/images/nishant-64.jpg',
    alt: 'Nishant Borkar in a dark blazer, standing in a hallway.',
  },
}

// Each bullet is split so one phrase can carry a highlight.
export type Bullet = { before: string; mark: string; after: string }

export const about: Bullet[] = [
  {
    before: 'I’m a final-year Computer Science student at ',
    mark: 'NIT Raipur',
    after: ', and I learn best by building a system first and taking it apart second.',
  },
  {
    before: 'Right now I’m a ',
    mark: 'software engineering intern on Culinda’s AI platform',
    after: ', where I took a slow answer path from 2.8 s down to 120 ms.',
  },
  {
    before: 'Most of what I build lives behind an API: ',
    mark: 'distributed systems, retrieval pipelines',
    after: ' and agents that need guardrails before anyone should trust them.',
  },
  {
    before: 'Competitive programming is how I unwind. I’m ',
    mark: 'top 2% on LeetCode',
    after: ' and a Specialist on Codeforces.',
  },
  {
    before: 'I’m open to ',
    mark: 'internships and full-time roles',
    after: ', and always up for collaborating on something worth building.',
  },
]

export const contact = {
  heading: 'Send me your slowest endpoint.',
  body: 'An internship, a full-time role from 2027, or a side project worth building together. My inbox is open.',
  primary: 'Email me',
  copy: 'Copy email',
  copied: 'Copied',
}
