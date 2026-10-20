'use client'

import Lenis from 'lenis'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'

/** Smooth scrolling (Lenis) plus a global reduced-motion switch for every Motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    // `anchors` routes in-page #links through Lenis; it respects scroll-padding-top.
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 })
    return () => lenis.destroy()
  }, [reduce])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
