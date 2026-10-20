import { useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState, type PointerEvent } from 'react'

/** True on devices with a mouse/trackpad. Used to keep drag from hijacking touch scrolling. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}

/** 3D tilt that follows the cursor. Spread the result onto a motion element. */
export function useTilt(max = 6) {
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })

  return {
    style: { rotateX, rotateY, transformPerspective: 1000 },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (reduce || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
      rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
    },
    onPointerLeave() {
      rotateX.set(0)
      rotateY.set(0)
    },
  }
}
