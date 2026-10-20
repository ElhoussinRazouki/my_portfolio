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
    const instance = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 })
    setLenis(instance)
    return () => {
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
