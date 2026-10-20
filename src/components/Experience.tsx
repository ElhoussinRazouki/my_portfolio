'use client'

import { motion, type Variants } from 'motion/react'
import { experience } from '../data/content'
import { SectionHeading, Tape } from './Decor'
import { ease, stagger, viewport } from './motion'

const row: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

/** Highlighter-marker swipe across the company name. */
const highlight: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.55, ease, delay: 0.25 } },
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading kicker="where I've worked" title="experience" id="experience-title" />

      <motion.ol
        className="sheet xp"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
      >
        <Tape color="yellow" rotate={-2} delay={0.7} style={{ left: '50%', top: -12, width: 90, marginLeft: -45 }} />
        {experience.map((job) => (
          <motion.li key={`${job.org}-${job.dates}`} className="xp__row" variants={row}>
            <p className="xp__dates mono">{job.dates}</p>
            <div className="xp__main">
              <motion.div className="xp__heading" variants={stagger()}>
                <h3 className="xp__title">{job.title}</h3>
                <motion.span className="hand xp__org" style={{ background: job.color }} variants={highlight}>
                  {job.org}
                </motion.span>
              </motion.div>
              <p className="xp__summary">{job.summary}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
