'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { GithubIcon, HeartIcon, LinkedinIcon, MailIcon, SmileIcon, navIcons } from './Icons'
import { ease, spring } from './motion'

const sectionIds = navItems.map((n) => n.id)

const socialHover = { y: -3, rotate: -8, transition: spring }
const socialTap = { scale: 0.9 }

export function Nav() {
  const active = useActiveSection(sectionIds)
  const reduce = useReducedMotion()
  const tabsRef = useRef<HTMLUListElement>(null)

  // On a narrow screen the tabs overflow sideways; bring the active one to the middle of the row.
  useEffect(() => {
    const list = tabsRef.current
    const tab = list?.querySelector('.is-active')
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return
    const l = list.getBoundingClientRect()
    const t = tab.getBoundingClientRect()
    list.scrollTo({ left: list.scrollLeft + t.left - l.left - (l.width - t.width) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [active, reduce])

  return (
    <motion.nav
      className="nav"
      aria-label="Main"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="nav__left">
        <motion.a
          href="#top"
          className="nav__logo"
          aria-label="Back to top"
          whileHover={{ rotate: -14, scale: 1.08, transition: spring }}
          whileTap={socialTap}
        >
          <SmileIcon size={18} />
        </motion.a>
        <ul className="nav__tabs" ref={tabsRef}>
          {navItems.map((item) => {
            const Icon = navIcons[item.icon]
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav__tab mono${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav__tab-bg"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={12} />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="nav__right">
        <motion.a
          className="nav__social nav__social--yellow"
          href={profile.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
          whileHover={socialHover}
          whileTap={socialTap}
        >
          <LinkedinIcon size={15} />
        </motion.a>
        <motion.a
          className="nav__social nav__social--pink"
          href={profile.github}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          whileHover={socialHover}
          whileTap={socialTap}
        >
          <GithubIcon size={15} />
        </motion.a>
        <motion.a
          className="nav__social nav__social--green"
          href={`mailto:${profile.email}`}
          aria-label="Email"
          whileHover={socialHover}
          whileTap={socialTap}
        >
          <MailIcon size={15} />
        </motion.a>
        <a className="nav__contact mono" href="#contact">
          <HeartIcon size={12} className="nav__heart" />
          Contact
        </a>
      </div>
    </motion.nav>
  )
}
