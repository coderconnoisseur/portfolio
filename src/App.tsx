import { LazyMotion, MotionConfig } from 'motion/react'

const loadFeatures = () => import('./lib/motionFeatures.ts').then((mod) => mod.default)
import { Footer } from './components/Footer.tsx'
import { LadderGopher } from './components/Gophers.tsx'
import { Header } from './components/Header.tsx'
import { About } from './sections/About.tsx'
import { Contact } from './sections/Contact.tsx'
import { Experience } from './sections/Experience.tsx'
import { Hero } from './sections/Hero.tsx'
import { Projects } from './sections/Projects.tsx'
import { Stack } from './sections/Stack.tsx'

export function App() {
  return (
    // "user": Motion drops transform animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-24 bg-ink px-4 py-2.5 font-semibold text-paper focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <div className="rails" aria-hidden="true" />
      <LadderGopher />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
      </LazyMotion>
    </MotionConfig>
  )
}
