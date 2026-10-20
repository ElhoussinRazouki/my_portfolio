'use client'

import { motion } from 'motion/react'
import { about, profile } from '../data/content'
import { Polaroid } from './Decor'
import { SparkleIcon, stampIcons } from './Icons'
import { draw, fadeUp, stagger, stampIn, viewport } from './motion'

export function About() {
  return (
    <>
      <motion.svg
        className="divider"
        aria-hidden="true"
        viewBox="0 0 1240 40"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.path d="M0 38 Q620 -14 1240 38" variants={draw} />
      </motion.svg>

      <section id="about" className="about" aria-labelledby="about-title">
        <motion.p
          className="hand about__label"
          initial={{ opacity: 0, x: -24, rotate: -4 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
        >
          about me!
        </motion.p>

        <motion.div
          className="about__row"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.15)}
        >
          <Polaroid
            className="polaroid--left"
            rotate={-3}
            src={profile.photo}
            label="El Houssin Razouki"
            caption={profile.photoCaption}
          />

          <motion.div className="about__body" variants={stagger(0.12)}>
            <motion.h2 className="boxed-title" id="about-title" variants={stampIn}>
              what's up
            </motion.h2>
            <motion.p className="hand about__text" variants={fadeUp}>
              {about.intro}{' '}
              <motion.span
                className="about__sparkle-wrap"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
              >
                <SparkleIcon size={22} className="about__sparkle" />
              </motion.span>{' '}
              {about.body}
            </motion.p>

            <motion.ul className="stamps" aria-label="Focus areas" variants={stagger(0.1, 0.1)}>
              {about.stamps.map((s) => {
                const Icon = stampIcons[s.icon]
                return (
                  <motion.li key={s.label} className="stamps__pair" variants={stampIn}>
                    <span className={`stamp stamp--${s.color}`}>{s.label}</span>
                    <span className={`stamp stamp--icon stamp--${s.color}`} aria-hidden="true">
                      <Icon size={20} />
                    </span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>

          <Polaroid
            className="polaroid--right"
            rotate={2.5}
            src={profile.productsPhoto}
            label="CTRBuddy, Aevo and Study Time app icons"
            caption={profile.productsCaption}
            tone="dark"
          />
        </motion.div>
      </section>
    </>
  )
}
