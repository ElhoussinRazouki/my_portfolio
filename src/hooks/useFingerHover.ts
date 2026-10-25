import { visualElementStore } from 'motion/react'
import { useEffect } from 'react'

/** A finger resting this long counts as hovering; when the page scrolls instead, the browser has taken over by then. */
const HOVER_DELAY = 90
/** Shortest time a finger hover lasts, so a quick tap still plays the whole effect. */
const MIN_HOVER = 350
/** A finger that travels past the browser's scroll slop without a pointercancel is scrubbing, not scrolling. */
const SCRUB_DISTANCE = 16

/** Turns an element's hover look on or off: its `[data-hover]` CSS and any Motion `whileHover`. */
function setHover(el: Element, on: boolean) {
  el.toggleAttribute('data-hover', on)
  // Motion's hover gesture ignores touch; this is the same call it makes for a mouse.
  const node = visualElementStore.get(el)
  if (node?.getProps().whileHover) node.animationState?.setActive('whileHover', on)
}

/**
 * Touch screens have no hover, so a finger stands in for the cursor: the element under it and its
 * ancestors get their hover look, as `:hover` would give them, until the finger lifts. Sliding keeps it
 * going wherever the page can't pan that way (the letter rows are `touch-action: pan-y`).
 * A touch also sets `data-touch` on <html>, which switches off the browser's sticky `:hover` until a mouse moves.
 */
export function useFingerHover() {
  useEffect(() => {
    const root = document.documentElement
    let hovered: Element[] = []
    let pointerId: number | null = null
    let start = { x: 0, y: 0 }
    let since = 0
    let timer = 0

    const hoverAt = (x: number, y: number) => {
      const chain: Element[] = []
      for (let el = document.elementFromPoint(x, y); el && el !== root; el = el.parentElement) chain.push(el)
      for (const el of hovered) if (!chain.includes(el)) setHover(el, false)
      for (const el of chain) if (!hovered.includes(el)) setHover(el, true)
      if (!hovered.length) since = performance.now()
      hovered = chain
    }
    const clear = () => {
      for (const el of hovered) setHover(el, false)
      hovered = []
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      root.dataset.touch = ''
      if (pointerId !== null) return
      clearTimeout(timer)
      clear()
      pointerId = e.pointerId
      start = { x: e.clientX, y: e.clientY }
      timer = window.setTimeout(() => hoverAt(start.x, start.y), HOVER_DELAY)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        delete root.dataset.touch
        return
      }
      if (e.pointerId !== pointerId) return
      if (hovered.length || Math.hypot(e.clientX - start.x, e.clientY - start.y) > SCRUB_DISTANCE) {
        clearTimeout(timer)
        hoverAt(e.clientX, e.clientY)
      }
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = null
      clearTimeout(timer)
      if (!hovered.length) hoverAt(e.clientX, e.clientY)
      timer = window.setTimeout(clear, since + MIN_HOVER - performance.now())
    }
    // The browser took the touch over to scroll or zoom: drop the hover at once.
    const onCancel = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = null
      clearTimeout(timer)
      clear()
    }

    const opts = { capture: true, passive: true }
    window.addEventListener('pointerdown', onDown, opts)
    window.addEventListener('pointermove', onMove, opts)
    window.addEventListener('pointerup', onUp, opts)
    window.addEventListener('pointercancel', onCancel, opts)
    return () => {
      clearTimeout(timer)
      clear()
      window.removeEventListener('pointerdown', onDown, opts)
      window.removeEventListener('pointermove', onMove, opts)
      window.removeEventListener('pointerup', onUp, opts)
      window.removeEventListener('pointercancel', onCancel, opts)
    }
  }, [])
}
