'use client'

import { motion, type Variants } from 'motion/react'
import { certifications, education } from '../data/content'
import { ease, fadeUp, pop, stagger, viewport } from './motion'

const card = (from: number): Variants => ({
  hidden: { opacity: 0, x: from },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease, staggerChildren: 0.08, delayChildren: 0.2 } },
})

export function Education() {
  return (
    <section className="section section--tight" aria-label="Education and certifications">
      <motion.div
        className="edu-grid"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.12)}
      >
        <motion.div className="edu-card" variants={card(-40)}>
          <motion.h2 className="mono edu-card__label edu-card__label--blue" variants={fadeUp}>
            ✦ Education
          </motion.h2>
          {education.map((e) => (
            <motion.div key={e.title} className="edu-item" variants={fadeUp}>
              <h3 className="edu-item__title">{e.title}</h3>
              <p className="edu-item__detail">{e.detail}</p>
              <p className="mono edu-item__dates">{e.dates}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="edu-card" variants={card(40)}>
          <motion.h2 className="mono edu-card__label edu-card__label--pink" variants={fadeUp}>
            ✦ Certifications
          </motion.h2>
          <motion.p className="hand edu-card__issuer" variants={fadeUp}>
            {certifications.issuer}
          </motion.p>
          <ul className="certs">
            {certifications.items.map((c) => (
              <motion.li key={c.name} variants={fadeUp}>
                <motion.span
                  className="certs__swatch"
                  style={{ background: c.color }}
                  aria-hidden="true"
                  variants={pop}
                  whileHover={{ rotate: 45, scale: 1.3 }}
                />
                {c.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
