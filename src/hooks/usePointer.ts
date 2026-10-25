import { useDragControls, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'

/** True on devices with a mouse/trackpad. */
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

/** How far (px) a finger can wander during the hold before it counts as a scroll. */
const HOLD_SLOP = 10

/**
 * Drag for every kind of pointer. A mouse or pen grabs straight away; a finger has to rest on the
 * element for `delay`ms first, so a swipe across it still scrolls the page.
 * Put `ref` and `dragProps` on a motion element. `held` is true from the end of a touch hold until the finger lifts.
 */
export function useHoldToDrag<T extends HTMLElement>({ delay = 220, onLift }: { delay?: number; onLift?: () => void } = {}) {
  const controls = useDragControls()
  const ref = useRef<T>(null)
  const lifted = useRef(false)
  const [held, setHeld] = useState(false)

  // Once lifted, the finger drags the element instead of scrolling the page. Only a non-passive
  // listener that was already on the element when the touch began can cancel that scroll.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const block = (e: TouchEvent) => {
      if (lifted.current) e.preventDefault()
    }
    el.addEventListener('touchmove', block, { passive: false })
    return () => el.removeEventListener('touchmove', block)
  }, [])

  function onPointerDown(e: PointerEvent<T>) {
    if (e.pointerType !== 'touch') return controls.start(e)

    const origin = e.nativeEvent
    const timer = setTimeout(() => {
      lifted.current = true
      setHeld(true)
      onLift?.()
      navigator.vibrate?.(10)
      controls.start(origin)
    }, delay)

    const onMove = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId !== origin.pointerId || lifted.current) return
      if (Math.hypot(ev.clientX - origin.clientX, ev.clientY - origin.clientY) > HOLD_SLOP) end(ev)
    }
    // Also runs on pointercancel, which the browser sends when it takes the touch over for scrolling.
    const end = (ev: globalThis.PointerEvent) => {
      if (ev.pointerId !== origin.pointerId) return
      clearTimeout(timer)
      if (lifted.current) {
        lifted.current = false
        setHeld(false)
      }
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
  }

  return {
    ref,
    held,
    dragProps: {
      drag: true,
      dragControls: controls,
      dragListener: false,
      onPointerDown,
      // Android opens the long-press menu while the finger is still resting on a lifted element.
      onContextMenu(e: MouseEvent<T>) {
        if (lifted.current) e.preventDefault()
      },
    },
  }
}

/** 3D tilt that follows the cursor, or leans toward a finger while it presses. Spread the result onto a motion element. */
export function useTilt(max = 6) {
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })

  function lean(e: PointerEvent<HTMLElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }

  return {
    style: { rotateX, rotateY, transformPerspective: 1000 },
    onPointerDown: lean,
    onPointerMove: lean,
    // Touch gets a pointerleave after lifting or when the page starts scrolling, so this resets both.
    onPointerLeave() {
      rotateX.set(0)
      rotateY.set(0)
    },
  }
}
