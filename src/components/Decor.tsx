'use client'

import { motion, type Variants } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'
import { useFinePointer } from '../hooks/usePointer'
import { ease, fadeUp, spring, springSoft, stagger, stampIn, viewport } from './motion'

type TapeColor = 'blue' | 'yellow' | 'white' | 'clear'

/** A strip of washi tape that "sticks" on when scrolled into view. Position it with `style`. */
export function Tape({
  color = 'clear',
  rotate = 0,
  delay = 0.3,
  style,
}: {
  color?: TapeColor
  rotate?: number
  delay?: number
  style?: CSSProperties
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`tape tape--${color}`}
      style={{ ...style, rotate, originX: 0 }}
      initial={{ opacity: 0, scaleX: 0.2, scaleY: 1.4 }}
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      viewport={viewport}
      transition={{ duration: 0.45, ease, delay }}
    />
  )
}

/** Image if `src` is set, otherwise a striped placeholder showing `label`. */
export function ImageSlot({
  src,
  label,
  tone = 'light',
  className = '',
}: {
  src?: string
  label: string
  tone?: 'light' | 'dark' | 'mint'
  className?: string
}) {
  if (src) return <img className={`image-slot ${className}`} src={src} alt={label} loading="lazy" draggable={false} />
  return (
    <div className={`image-slot image-slot--${tone} ${className}`} role="img" aria-label={`${label} (placeholder)`}>
      <span className="mono">[{label}]</span>
    </div>
  )
}

/** Handwritten kicker + boxed title, used to open most sections. */
export function SectionHeading({ kicker, title, id }: { kicker: string; title: string; id?: string }) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(0.12)}
    >
      <motion.p className="hand section-heading__kicker" variants={fadeUp}>
        {kicker}
      </motion.p>
      <motion.h2 className="boxed-title" id={id} variants={stampIn}>
        {title}
      </motion.h2>
    </motion.div>
  )
}

/** Tossed onto the page from above; the `rotate` it lands at is passed as `custom`. */
const polaroidVariants: Variants = {
  hidden: (rotate: number) => ({ opacity: 0, y: -90, rotate: rotate * 5, scale: 1.08 }),
  show: (rotate: number) => ({ opacity: 1, y: 0, rotate, scale: 1, transition: springSoft }),
}

/** A taped photo. Animate it by placing it inside a parent that switches `hidden` → `show`. */
export function Polaroid({
  src,
  label,
  caption,
  tone,
  rotate = 0,
  className = '',
  children,
}: {
  src?: string
  label: string
  caption: string
  tone?: 'light' | 'dark'
  rotate?: number
  className?: string
  children?: ReactNode
}) {
  const draggable = useFinePointer()

  return (
    <motion.figure
      className={`polaroid ${draggable ? 'is-draggable ' : ''}${className}`}
      custom={rotate}
      variants={polaroidVariants}
      whileHover={{ rotate: 0, scale: 1.04, transition: spring }}
      drag={draggable}
      dragSnapToOrigin
      dragElastic={0.4}
      whileDrag={{ scale: 1.08, rotate: rotate * -1.5, zIndex: 10, boxShadow: '0 22px 40px rgba(0, 0, 0, 0.22)' }}
    >
      <Tape color="blue" rotate={-32} delay={0.9} style={{ left: -10, top: -8 }} />
      <Tape color="yellow" rotate={30} delay={1} style={{ right: -10, top: -6 }} />
      <ImageSlot src={src} label={label} tone={tone} className="polaroid__img" />
      <figcaption className="hand polaroid__caption">{caption}</figcaption>
      {children}
    </motion.figure>
  )
}
