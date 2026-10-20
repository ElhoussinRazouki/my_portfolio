import type { Transition, Variants } from 'motion/react'

/** Shared motion tokens so every section moves with the same personality. */
export const ease = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 260, damping: 20 }
export const springSoft: Transition = { type: 'spring', stiffness: 120, damping: 16 }
export const springSnappy: Transition = { type: 'spring', stiffness: 500, damping: 22 }

/** Trigger reveals a little before an element is fully on screen, and only once. */
export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const

export const stagger = (each = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: spring },
}

/** Rubber-stamp slam: starts big and tilted, lands flat. */
export const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.35, rotate: -6 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: springSnappy },
}

/** SVG stroke drawing itself. */
export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease } },
}
