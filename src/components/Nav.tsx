'use client'

import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { GithubIcon, HeartIcon, LinkedinIcon, MailIcon, SmileIcon, navIcons } from './Icons'

const sectionIds = navItems.map((n) => n.id)

export function Nav() {
  const active = useActiveSection(sectionIds)

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav__left">
        <a href="#top" className="nav__logo" aria-label="Back to top">
          <SmileIcon size={18} />
        </a>
        <ul className="nav__tabs">
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
                  <Icon size={12} />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="nav__right">
        <a className="nav__social nav__social--yellow" href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <LinkedinIcon size={15} />
        </a>
        <a className="nav__social nav__social--pink" href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
          <GithubIcon size={15} />
        </a>
        <a className="nav__social nav__social--green" href={`mailto:${profile.email}`} aria-label="Email">
          <MailIcon size={15} />
        </a>
        <a className="nav__contact mono" href="#contact">
          <HeartIcon size={12} />
          Contact
        </a>
      </div>
    </nav>
  )
}
