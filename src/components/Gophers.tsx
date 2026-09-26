import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Go gophers by Renée French (CC BY 4.0), from go.dev/images/gophers. Credited in the footer.

/** A gopher on a ladder that climbs down the right-hand rail as you read. Desktop only. */
export function LadderGopher() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // Plain pixels: Motion can't blend 'vh' with calc(), which made the gopher jump to the end.
  const y = useTransform(scrollYProgress, (p) => {
    const h = window.innerHeight
    return h * 0.06 + p * (h * 0.88 - 140)
  })
  return (
    <m.img
      src="/images/gophers/ladder.svg"
      alt=""
      aria-hidden="true"
      width={44}
      height={138}
      style={{ y: reduce ? 48 : y }}
      className="pointer-events-none fixed top-0 z-0 hidden w-11 opacity-80 left-[calc(50%+var(--col)/2-0.125rem)] lg:block"
    />
  )
}

/** A small gopher that pops up from the bottom edge of a thumbnail when its card is hovered. */
export function PeekGopher() {
  return (
    <img
      src="/images/gophers/front.svg"
      alt=""
      aria-hidden="true"
      width={56}
      height={75}
      loading="lazy"
      className="pointer-events-none absolute right-4 bottom-0 w-14 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-[18%]"
    />
  )
}

/** A gopher peeking over the top edge of the contact card; it waves when you hover the card. */
export function WaveGopher() {
  return (
    <img
      src="/images/gophers/happy.svg"
      alt=""
      aria-hidden="true"
      width={84}
      height={119}
      loading="lazy"
      className="pointer-events-none absolute -top-16 right-10 w-20 origin-bottom transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:-rotate-6 sm:right-16"
    />
  )
}
