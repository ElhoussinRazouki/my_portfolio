'use client'

import { AnimatePresence, motion, type Variants } from 'motion/react'
import Image, { type StaticImageData } from 'next/image'
import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useFinePointer } from '../hooks/usePointer'
import { ease, fadeUp, spring, springSoft, stagger, stampIn, viewport } from './motion'

type TapeColor = 'blue' | 'yellow' | 'white' | 'clear'

/** How long one strip takes to peel off. */
export const PEEL_DURATION = 0.32

/**
 * A strip of washi tape that "sticks" on when scrolled into view (or right away with `immediate`,
 * e.g. when it is put back): it is smoothed down from one end (a clip reveal, so it never moves
 * off its spot). Position it with `style`; it rotates around its centre, so `rotate` tilts it in place.
 *
 * Set `peel` to the side its outer end points (-1 left, 1 right) and it can be removed inside
 * AnimatePresence: the outer end lifts and curls around the still-stuck inner end, then the
 * strip is pulled up and away. It is laid down from that same inner end, so on and off mirror.
 */
export function Tape({
  color = 'clear',
  rotate = 0,
  delay = 0.3,
  immediate = false,
  peel,
  peelDelay = 0,
  style,
}: {
  color?: TapeColor
  rotate?: number
  delay?: number
  immediate?: boolean
  peel?: -1 | 1
  peelDelay?: number
  style?: CSSProperties
}) {
  const dir = peel ?? 1
  // Laid from the left end, or from the inner end when it can be peeled.
  const hidden = dir === -1 && peel ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)'
  const stuck = { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scaleY: 1 }
  // The holder only places and tilts the tape; the strip inside is what sticks and peels, pivoting
  // on its inner end without moving the tape off its spot.
  return (
    <span aria-hidden="true" className={`tape tape--${color}`} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <motion.span
        className="tape__strip"
        style={{ originX: peel ? (dir === -1 ? 1 : 0) : 0.5 }}
        initial={{ opacity: 0, clipPath: hidden, scaleY: 1.4 }}
        {...(immediate ? { animate: stuck } : { whileInView: stuck, viewport })}
        exit={
          peel && {
            rotate: [0, -dir * 14, -dir * 26],
            x: [0, 0, dir * 40],
            y: [0, -5, -38],
            scale: [1, 1.06, 1.1],
            filter: ['drop-shadow(0 0 0 rgba(0,0,0,0))', 'drop-shadow(0 5px 4px rgba(0,0,0,0.18))', 'drop-shadow(0 8px 6px rgba(0,0,0,0.12))'],
            opacity: [1, 1, 0],
            transition: {
              duration: PEEL_DURATION,
              delay: peelDelay,
              times: [0, 0.45, 1],
              ease: ['easeOut', 'easeIn'],
            },
          }
        }
        transition={{ duration: 0.45, ease, delay }}
      />
    </span>
  )
}

/** Quality for resized images; must be listed in `images.qualities` in next.config.ts. */
export const IMAGE_QUALITY = 85

/**
 * Image if `src` is set, otherwise a striped placeholder showing `label`.
 * Imported images are resized to the slot's `sizes`, so the browser never decodes a full-size original.
 */
export function ImageSlot({
  src,
  label,
  tone = 'light',
  sizes,
  className = '',
}: {
  src?: string | StaticImageData
  label: string
  tone?: 'light' | 'dark' | 'mint'
  /** Rendered width, as in the `sizes` attribute */
  sizes?: string
  className?: string
}) {
  if (typeof src === 'string')
    return <img className={`image-slot ${className}`} src={src} alt={label} loading="lazy" draggable={false} />
  if (src)
    return (
      <Image
        className={`image-slot ${className}`}
        src={src}
        alt={label}
        sizes={sizes}
        quality={IMAGE_QUALITY}
        draggable={false}
      />
    )
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

/** How long after the photo settles back before each strip is pressed on again. */
const RESTICK_DELAY = [0.05, 0.17]

/**
 * A taped photo. Animate it by placing it inside a parent that switches `hidden` → `show`.
 * Picking it up tears both strips off; once it has settled back in place they are stuck on again.
 */
export function Polaroid({
  src,
  label,
  caption,
  tone,
  rotate = 0,
  className = '',
  children,
}: {
  src?: string | StaticImageData
  label: string
  caption: string
  tone?: 'light' | 'dark'
  rotate?: number
  className?: string
  children?: ReactNode
}) {
  const draggable = useFinePointer()
  // `held` covers the whole lift: from the first drag movement until the snap back has finished.
  const [held, setHeld] = useState(false)
  const [moved, setMoved] = useState(false)
  const dragging = useRef(false)

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
      onDragStart={() => {
        dragging.current = true
        setHeld(true)
        setMoved(true)
      }}
      onDragEnd={() => {
        dragging.current = false
      }}
      onDragTransitionEnd={() => {
        // Also fires when a new grab interrupts the snap back; the photo is still in hand then.
        if (!dragging.current) setHeld(false)
      }}
    >
      <AnimatePresence>
        {!held && (
          <Tape
            key="left"
            color="blue"
            rotate={-32}
            delay={moved ? RESTICK_DELAY[0] : 0.9}
            immediate={moved}
            peel={-1}
            style={{ left: -10, top: -8 }}
          />
        )}
        {!held && (
          <Tape
            key="right"
            color="yellow"
            rotate={30}
            delay={moved ? RESTICK_DELAY[1] : 1}
            immediate={moved}
            peel={1}
            peelDelay={0.04}
            style={{ right: -10, top: -6 }}
          />
        )}
      </AnimatePresence>
      <ImageSlot src={src} label={label} tone={tone} sizes="180px" className="polaroid__img" />
      <figcaption className="hand polaroid__caption">{caption}</figcaption>
      {children}
    </motion.figure>
  )
}
