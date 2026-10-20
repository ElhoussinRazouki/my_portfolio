'use client'

import { motion, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode } from 'react'

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 250, damping: 15, mass: 0.4 })

  return (
    <motion.span
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  )
}
