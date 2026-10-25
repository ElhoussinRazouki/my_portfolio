'use client'

import {
  motion,
  useInView,
  useMotionValueEvent,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'
import Image from 'next/image'
import { createContext, useContext, useRef, type ReactNode } from 'react'
import { profile } from '../data/content'
import { useFinePointer } from '../hooks/usePointer'
import { IMAGE_QUALITY } from './Decor'
import { ArrowUpRightIcon, CodeSlashIcon } from './Icons'
import { Magnetic } from './Magnetic'
import { ease, spring, springSnappy } from './motion'

/** Normalised cursor position over the hero (-0.5 … 0.5), smoothed. Driven by scrolling on touch screens. */
const PointerContext = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null)

/** Decorative piece that pops in, then drifts with the cursor. Higher `depth` = moves more. */
function Deco({
  depth,
  rotate = 0,
  delay,
  className,
  children,
}: {
  depth: number
  rotate?: number
  delay: number
  className: string
  children: ReactNode
}) {
  const pointer = useContext(PointerContext)!
  const x = useTransform(pointer.x, (v) => v * depth)
  const y = useTransform(pointer.y, (v) => v * depth)

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate - 24 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

const drawPath = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.7, ease, delay },
})

function CurvedArrow({ flip = false, delay }: { flip?: boolean; delay: number }) {
  return (
    <svg
      aria-hidden="true"
      width="34"
      height="30"
      viewBox="0 0 34 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.path d="M2 26C10 22 22 14 30 4" {...drawPath(delay)} />
      <motion.path d="M22 5l8-1-1 8" {...drawPath(delay + 0.45)} />
    </svg>
  )
}

const letter: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: -60, rotate: i % 2 ? 14 : -14 }),
  show: { opacity: 1, y: 0, rotate: 0, transition: springSnappy },
}

const word: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(10px)' },
  // A leftover blur(0px) would keep a filter on the word for good; drop it once it is sharp.
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease }, transitionEnd: { filter: 'none' } },
}

const badge: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { ...spring, stiffness: 180 } },
}

const flower: Variants = {
  ...badge,
  spin: { rotate: 180, transition: { duration: 0.6, ease } },
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

function Words({ text }: { text: string }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <motion.span className="hero__word" variants={word}>
        {w}
      </motion.span>{' '}
    </span>
  ))
}

export function Hero() {
  const [tagA, tagB] = profile.heroTags
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { initial: true })

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const pointer = {
    x: useSpring(px, { stiffness: 60, damping: 18 }),
    y: useSpring(py, { stiffness: 60, damping: 18 }),
  }

  // Without a cursor to follow, the pieces drift apart as the hero scrolls away instead.
  const finePointer = useFinePointer()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce || finePointer) return
    px.set(v * 0.25)
    py.set(v * 0.5)
  })

  let letterIndex = 0

  return (
    <PointerContext.Provider value={pointer}>
      <section
        id="top"
        className={`hero${inView ? '' : ' is-offscreen'}`}
        ref={ref}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse' || !ref.current) return
          const r = ref.current.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width - 0.5)
          py.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'mouse') return
          px.set(0)
          py.set(0)
        }}
      >
        <Deco depth={-60} delay={1.05} className="hero__avatar hero__avatar--left hero-deco">
          <div className="hero__avatar-disc hero__avatar-disc--yellow float">
            <Image className="hero__avatar-img" src={profile.avatar} alt="" sizes="52px" quality={IMAGE_QUALITY} loading="eager" />
          </div>
        </Deco>
        <Deco depth={-80} delay={1.15} className="hero__avatar hero__avatar--right hero-deco">
          <div className="hero__avatar-disc hero__avatar-disc--mint float float--late">
            <CodeSlashIcon size={24} />
          </div>
        </Deco>

        <motion.p className="hand hero__intro" {...fadeIn(0.1)}>
          my name is
        </motion.p>
        <svg className="hero__squiggle" aria-hidden="true" width="44" height="10" viewBox="0 0 44 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <motion.path d="M2 3c10-2 30-2 40 0" {...drawPath(0.25)} />
          <motion.path d="M6 7c8-1.5 24-1.5 32 0" {...drawPath(0.4)} />
        </svg>

        <div className="hero__name-wrap">
          <Deco depth={30} rotate={-3} delay={0.85} className="tag tag--mint hero__tag hero__tag--left hero-deco">
            {tagA}
          </Deco>
          <Deco depth={40} rotate={3} delay={0.95} className="tag tag--yellow hero__tag hero__tag--right hero-deco">
            {tagB}
          </Deco>

          <motion.p
            className="hero__name"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              show: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease, delay: 0.15, staggerChildren: 0.05, delayChildren: 0.25 },
              },
            }}
          >
            <span className="sr-only">{profile.name}</span>
            {profile.displayName.split(' ').map((w, wi) => (
              <span key={wi} aria-hidden="true">
                {wi > 0 && ' '}
                <span className="hero__name-word">
                  {[...w].map((ch) => {
                    const i = letterIndex++
                    return (
                      <motion.span
                        key={i}
                        className="hero__letter"
                        custom={i}
                        variants={letter}
                        whileHover={{ y: -10, rotate: i % 2 ? 6 : -6, transition: springSnappy }}
                      >
                        {ch}
                      </motion.span>
                    )
                  })}
                </span>
              </span>
            ))}
          </motion.p>

          <Deco depth={0} delay={1.0} className="hero__note hero__note--left hero-deco">
            <span className="hand hero__note-label hero__note-label--yellow">{profile.role}</span>
            <CurvedArrow delay={1.2} />
          </Deco>
          <Deco depth={0} delay={1.1} className="hero__note hero__note--right hero-deco">
            <CurvedArrow flip delay={1.3} />
            <span className="hand hero__note-label hero__note-label--mint">{profile.location}</span>
          </Deco>
        </div>

        <motion.div
          className="hero__mobile-tags"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
        >
          {[
            ['hand hero__note-label hero__note-label--yellow', profile.role],
            ['hand hero__note-label hero__note-label--mint', profile.location],
            ['tag tag--yellow', tagB],
          ].map(([cls, text]) => (
            <motion.span
              key={text}
              className={cls}
              variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: spring } }}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>

        <motion.p className="status mono" {...fadeIn(0.75)}>
          <span className="status__dot" aria-hidden="true" />
          {profile.status}
        </motion.p>

        <motion.h1
          className="hero__headline"
          initial="hidden"
          animate="show"
          whileHover="spin"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.85 } } }}
        >
          <Words text={profile.headline[0]} />
          <motion.span className="badge-target" aria-hidden="true" variants={badge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" fill="#fff" />
            </svg>
          </motion.span>{' '}
          <Words text={profile.headline[1]} />
          <motion.svg className="badge-flower" aria-hidden="true" viewBox="0 0 24 24" variants={flower}>
            <g fill="var(--pink-soft)" stroke="var(--ink)" strokeWidth="1">
              <circle cx="12" cy="5" r="4" />
              <circle cx="19" cy="12" r="4" />
              <circle cx="12" cy="19" r="4" />
              <circle cx="5" cy="12" r="4" />
            </g>
            <circle cx="12" cy="12" r="3.2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1" />
          </motion.svg>
        </motion.h1>

        <motion.div className="hero__cta" {...fadeIn(1.35)}>
          <Magnetic>
            <a href="#contact" className="btn-contact mono">
              <span className="btn-contact__icon" aria-hidden="true">
                <ArrowUpRightIcon size={14} />
              </span>
              Contact me
            </a>
          </Magnetic>
        </motion.div>
      </section>
    </PointerContext.Provider>
  )
}
