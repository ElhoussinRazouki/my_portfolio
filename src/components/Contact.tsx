'use client'

import { motion, type Variants } from 'motion/react'
import { profile } from '../data/content'
import { Tape } from './Decor'
import { DownloadIcon, GithubIcon, LinkedinIcon } from './Icons'
import { Magnetic } from './Magnetic'
import { ease, fadeUp, springSnappy, stagger, viewport } from './motion'

const title = 'SAY HI!'

const letter: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotate: 10 },
  show: { opacity: 1, y: 0, rotate: 0, transition: springSnappy },
}

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact__card"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{
          hidden: { opacity: 0, y: 60, scale: 0.97 },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease, staggerChildren: 0.12, delayChildren: 0.2 },
          },
        }}
      >
        <Tape color="blue" rotate={-5} delay={0.8} style={{ left: 40, top: -10, width: 80 }} />
        <Tape color="yellow" rotate={4} delay={0.9} style={{ right: 40, top: -10, width: 80 }} />

        <motion.p className="hand contact__kicker" variants={fadeUp}>
          got a hard problem? I'm listening.
        </motion.p>
        <motion.h2 className="contact__title" id="contact-title" variants={stagger(0.06)}>
          <span className="sr-only">{title}</span>
          {[...title].map((ch, i) => (
            <motion.span
              key={i}
              className="contact__letter"
              aria-hidden="true"
              variants={letter}
              whileHover={{ y: -14, rotate: i % 2 ? 8 : -8, color: '#f2c641', transition: springSnappy }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </motion.h2>
        <motion.a className="contact__email" href={`mailto:${profile.email}`} variants={fadeUp}>
          {profile.email}
          <motion.span
            className="contact__email-line"
            aria-hidden="true"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.3 } } }}
          />
        </motion.a>

        <motion.div className="contact__links" variants={stagger(0.08)}>
          {[
            { cls: 'pink', href: profile.github, icon: <GithubIcon size={14} />, label: 'GitHub', external: true },
            { cls: 'yellow', href: profile.linkedin, icon: <LinkedinIcon size={14} />, label: 'LinkedIn', external: true },
            { cls: 'green', href: profile.cvUrl, icon: <DownloadIcon size={14} />, label: 'Download CV', external: false },
          ].map((l) => (
            <motion.div key={l.label} variants={fadeUp}>
              <Magnetic>
                <a
                  className={`pill-btn pill-btn--${l.cls} mono`}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noreferrer' } : { download: true })}
                >
                  {l.icon} {l.label}
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.footer
        className="footer mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; built in {profile.location}</span>
      </motion.footer>
    </section>
  )
}
