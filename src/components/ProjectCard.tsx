'use client'

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import type { Project, ProjectTheme } from '../data/content'
import { useTilt } from '../hooks/usePointer'
import { CountUp } from './CountUp'
import { ImageSlot, Tape } from './Decor'
import { ArrowUpRightIcon } from './Icons'
import { ease, fadeUp, spring, stagger, viewport } from './motion'

const themes: Record<ProjectTheme, CSSProperties> = {
  dark: {
    '--card-bg': 'var(--ink)',
    '--card-fg': '#ffffff',
    '--card-soft': '#D8D5CD',
    '--card-chip': '#4A4842',
    '--card-accent': 'var(--yellow)',
    '--card-dot': 'var(--green-bright)',
    '--tab-bg': 'var(--blue)',
    '--tab-fg': '#ffffff',
  } as CSSProperties,
  yellow: {
    '--card-bg': 'var(--yellow)',
    '--card-fg': 'var(--ink)',
    '--card-soft': 'var(--ink)',
    '--card-chip': 'var(--ink)',
    '--card-accent': 'var(--ink)',
    '--card-dot': 'var(--ink)',
  } as CSSProperties,
  blue: {
    '--card-bg': 'var(--blue)',
    '--card-fg': '#ffffff',
    '--card-soft': '#E4E9FB',
    '--card-chip': '#8CA2EA',
    '--card-accent': 'var(--yellow)',
    '--card-dot': 'var(--yellow)',
  } as CSSProperties,
  mint: {
    '--card-bg': 'var(--mint)',
    '--card-fg': 'var(--ink)',
    '--card-soft': 'var(--ink)',
    '--card-chip': 'var(--ink)',
    '--card-accent': 'var(--green)',
    '--card-dot': 'var(--green)',
  } as CSSProperties,
}

/** Scroll-linked drift: the element moves `distance`px against the scroll while it crosses the viewport. */
function useParallax(distance: number, offset = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [offset, offset] : [offset + distance, offset - distance])
  return { ref, y }
}

/** Each phone carries its own strip of tape, so the tape always sits on the phone it holds. */
function Phone({ label, src, index }: { label: string; src?: string; index: number }) {
  const even = index % 2 === 0
  const rotate = even ? -3 : 3

  return (
    <motion.div
      className={`phone phone--${even ? 'a' : 'b'}`}
      style={{ y: even ? 0 : 24 }}
      initial={{ opacity: 0, scale: 0.9, rotate: rotate * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={viewport}
      transition={{ ...spring, delay: 0.15 + index * 0.12 }}
    >
      <Tape color="white" rotate={even ? -4 : 5} delay={0.9 + index * 0.1} style={{ left: '50%', top: -10, width: 70, marginLeft: -35 }} />
      <ImageSlot src={src} label={label} tone="dark" className="phone__screen" />
      <span className="phone__island" aria-hidden="true" />
    </motion.div>
  )
}

function Browser({ project }: { project: Project }) {
  const { media, theme } = project
  const tilt = useTilt(5)
  const { ref, y } = useParallax(36)
  const light = theme === 'mint' || theme === 'yellow'

  return (
    <motion.div ref={ref} className="project__media" style={{ y }}>
      <motion.div
        className={`browser${light ? ' browser--light' : ''}`}
        initial={{ opacity: 0, x: project.reverse ? -60 : 60, rotate: project.reverse ? -3 : 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        {...tilt}
      >
        <Tape color={light ? 'white' : 'clear'} rotate={-4} delay={0.9} style={{ left: 24, top: -10 }} />
        <Tape color={light ? 'white' : 'clear'} rotate={5} delay={1} style={{ right: 24, top: -10 }} />
        <div className="browser__bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <ImageSlot
          src={media.images?.[0]}
          label={media.labels[0]}
          tone={light ? 'mint' : 'dark'}
          className="browser__screen"
        />
      </motion.div>
    </motion.div>
  )
}

function Phones({ project }: { project: Project }) {
  const { media } = project
  const { ref, y } = useParallax(36)

  return (
    <motion.div ref={ref} className="project__media project__media--phones" style={{ y }}>
      {media.labels.map((label, i) => (
        <Phone key={label} label={label} src={media.images?.[i]} index={i} />
      ))}
      {project.note && (
        <motion.p
          className="hand sticky-note"
          initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 4, transition: { ...spring, delay: 0.6 } }}
          whileHover={{ rotate: -3, scale: 1.08, transition: spring }}
          viewport={viewport}
        >
          {project.note}
        </motion.p>
      )}
    </motion.div>
  )
}

function Media({ project }: { project: Project }) {
  return project.media.kind === 'browser' ? <Browser project={project} /> : <Phones project={project} />
}

const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
}

export function ProjectCard({ project }: { project: Project }) {
  const style = { ...themes[project.theme], '--tab-offset': project.tabOffset } as CSSProperties

  return (
    <motion.article
      className="project"
      style={style}
      aria-labelledby={`${project.id}-title`}
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="project__tabs">
        <span className="project__tab project__tab--primary mono">✦ Project {project.number}</span>
        {project.extraTab && <span className="project__tab project__tab--extra mono">{project.extraTab}</span>}
      </div>

      <div className={`project__card${project.reverse ? ' project__card--reverse' : ''}`}>
        <motion.div
          className="project__body"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08, 0.2)}
        >
          <motion.p className="project__meta mono" variants={fadeUp}>
            <span className="project__dot" aria-hidden="true" />
            {project.meta}
          </motion.p>
          <motion.h3 className="project__title" id={`${project.id}-title`} variants={fadeUp}>
            {project.name}
          </motion.h3>
          <motion.p className="project__tagline" variants={fadeUp}>
            {project.tagline}
          </motion.p>

          {project.bullets && (
            <motion.ul className="project__bullets" variants={stagger(0.07)}>
              {project.bullets.map((b) => (
                <motion.li key={b} variants={fadeUp}>
                  <span aria-hidden="true">→</span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          )}

          {project.stats && (
            <motion.dl className="project__stats" variants={fadeUp}>
              {project.stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt className="stat__label mono">{s.label}</dt>
                  <dd className="stat__value">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}

          <motion.ul className="chips" aria-label="Tech stack" variants={stagger(0.03)}>
            {project.tech.map((t) => (
              <motion.li key={t} className="chip mono" variants={chip}>
                {t}
              </motion.li>
            ))}
          </motion.ul>

          {project.href && (
            <motion.a
              className="link-arrow mono"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
            >
              View project <ArrowUpRightIcon size={12} />
            </motion.a>
          )}
        </motion.div>

        <Media project={project} />
      </div>
    </motion.article>
  )
}
