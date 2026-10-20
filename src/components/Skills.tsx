'use client'

import { motion, type Variants } from 'motion/react'
import type { CSSProperties } from 'react'
import { skills } from '../data/content'
import { useFinePointer } from '../hooks/usePointer'
import { SectionHeading } from './Decor'
import { spring, springSoft, stagger, viewport } from './motion'

const tilts = [-1.4, 1, -0.6, 1.3, -1, 0.8]

/** Sticky notes flutter down and land at their own tilt (passed as `custom`). */
const note: Variants = {
  hidden: (tilt: number) => ({ opacity: 0, y: -50, rotate: tilt * 6 }),
  show: (tilt: number) => ({ opacity: 1, y: 0, rotate: tilt, transition: springSoft }),
}

export function Skills() {
  const draggable = useFinePointer()

  return (
    <section className="section" aria-labelledby="skills-title">
      <SectionHeading kicker="what's in the toolbox" title="skills" id="skills-title" />

      <motion.ul
        className="notes"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.09, 0.15)}
      >
        {skills.map((s, i) => {
          const tilt = tilts[i % tilts.length]
          return (
            <motion.li
              key={s.title}
              className={`note${draggable ? ' is-draggable' : ''}`}
              style={{ '--note-bg': s.color } as CSSProperties}
              custom={tilt}
              variants={note}
              whileHover={{ rotate: 0, y: -6, transition: spring }}
              drag={draggable}
              dragSnapToOrigin
              dragElastic={0.5}
              whileDrag={{ scale: 1.06, rotate: tilt * -3, zIndex: 10 }}
            >
              <h3 className="hand note__title">{s.title}</h3>
              <p className="note__items">{s.items}</p>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}
