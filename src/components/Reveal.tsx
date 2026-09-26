import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOutExpo, inView } from '../lib/motion.ts'

type Props = { children: ReactNode; className?: string; delay?: number; y?: number }

/** Fades content up once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 18 }: Props) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  )
}
