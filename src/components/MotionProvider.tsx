'use client'

import Lenis from 'lenis'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const LenisContext = createContext<Lenis | null>(null)

/** The page's Lenis instance (null when reduced motion is on). Use it to pause scrolling under a dialog. */
export const useLenis = () => useContext(LenisContext)

/** Smooth scrolling (Lenis) plus a global reduced-motion switch for every Motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduce) return
    // `anchors` routes in-page #links through Lenis; it respects scroll-padding-top.
    const instance = new Lenis({ anchors: true, lerp: 0.1 })

    // Tick Lenis only while it is easing a scroll. A frame loop that never stops (`autoRaf`) makes
    // the browser restyle and commit every frame even when the page is sitting still.
    // Lenis is fed its own clock so a pause between scrolls never reaches it as one huge time step.
    let frameId = 0
    let clock = 0
    let last = 0
    const tick = (now: number) => {
      clock += last ? now - last : 1000 / 60
      last = now
      instance.raf(clock)
      if (instance.isScrolling === 'smooth') {
        frameId = requestAnimationFrame(tick)
      } else {
        frameId = 0
        last = 0
      }
    }
    // Wheel, touch and anchor scrolling all go through scrollTo.
    const scrollTo = instance.scrollTo.bind(instance)
    instance.scrollTo = (...args) => {
      scrollTo(...args)
      if (!frameId && instance.isScrolling === 'smooth') frameId = requestAnimationFrame(tick)
    }

    setLenis(instance)
    return () => {
      cancelAnimationFrame(frameId)
      instance.destroy()
      setLenis(null)
    }
  }, [reduce])

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  )
}
