'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ease } from './motion'

/** Splits "~$2K" into prefix "~$", number 2 and suffix "K". */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  if (!match) return null
  const n = Number(match[2].replace(/,/g, ''))
  if (!n) return null
  const grouped = match[2].includes(',')
  return {
    n,
    format: (v: number) =>
      match[1] + (grouped ? Math.round(v).toLocaleString('en-US') : String(Math.round(v))) + match[3],
  }
}

/** Counts a stat up from zero the first time it scrolls into view. Renders the final value without JS. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const parsed = parse(value)
    if (!el || !parsed || reduce) return
    if (!inView) {
      el.textContent = parsed.format(0)
      return
    }
    const controls = animate(0, parsed.n, {
      duration: 1.6,
      ease,
      onUpdate: (v) => (el.textContent = parsed.format(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return <span ref={ref}>{value}</span>
}
