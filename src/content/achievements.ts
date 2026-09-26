import { profile } from './profile.ts'

export type Achievement = { value: string; label: string; href?: string }

export const achievements: Achievement[] = [
  { value: '2108', label: 'LeetCode rating, top 2%', href: profile.leetcode },
  { value: '1483', label: 'Codeforces max, Specialist' },
  { value: '86th', label: 'of 27,000+, LeetCode Biweekly 169' },
  { value: '2nd', label: 'AI track, Hack-a-Sol hackathon' },
]
