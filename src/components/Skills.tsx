import type { CSSProperties } from 'react'
import { skills } from '../data/content'
import { SectionHeading } from './Decor'

const tilts = [-1.4, 1, -0.6, 1.3, -1, 0.8]

export function Skills() {
  return (
    <section className="section" aria-labelledby="skills-title">
      <SectionHeading kicker="what's in the toolbox" title="skills" id="skills-title" />

      <ul className="notes">
        {skills.map((s, i) => (
          <li
            key={s.title}
            className="note"
            style={{ '--note-bg': s.color, '--tilt': `${tilts[i % tilts.length]}deg` } as CSSProperties}
          >
            <h3 className="hand note__title">{s.title}</h3>
            <p className="note__items">{s.items}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
