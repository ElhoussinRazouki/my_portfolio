import type { CSSProperties } from 'react'
import type { Project, ProjectTheme } from '../data/content'
import { ImageSlot, Tape } from './Decor'
import { ArrowUpRightIcon } from './Icons'

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

function Media({ project }: { project: Project }) {
  const { media, theme } = project

  if (media.kind === 'browser') {
    const light = theme === 'mint' || theme === 'yellow'
    return (
      <div className="project__media">
        <Tape color={light ? 'white' : 'clear'} style={{ left: 24, top: -10, transform: 'rotate(-4deg)' }} />
        <Tape color={light ? 'white' : 'clear'} style={{ right: 24, top: -10, transform: 'rotate(5deg)' }} />
        <div className={`browser${light ? ' browser--light' : ''}`}>
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
        </div>
      </div>
    )
  }

  return (
    <div className="project__media project__media--phones">
      <Tape color="white" style={{ left: '50%', top: -10, marginLeft: -35, transform: 'rotate(4deg)' }} />
      {media.labels.map((label, i) => (
        <div key={label} className={`phone phone--${i % 2 === 0 ? 'a' : 'b'}`}>
          <ImageSlot src={media.images?.[i]} label={label} tone="dark" className="phone__screen" />
          <span className="phone__island" aria-hidden="true" />
        </div>
      ))}
      {project.note && <p className="hand sticky-note">{project.note}</p>}
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const style = { ...themes[project.theme], '--tab-offset': project.tabOffset } as CSSProperties

  return (
    <article className="project" style={style} aria-labelledby={`${project.id}-title`}>
      <div className="project__tabs">
        <span className="project__tab project__tab--primary mono">✦ Project {project.number}</span>
        {project.extraTab && <span className="project__tab project__tab--extra mono">{project.extraTab}</span>}
      </div>

      <div className={`project__card${project.reverse ? ' project__card--reverse' : ''}`}>
        <div className="project__body">
          <p className="project__meta mono">
            <span className="project__dot" aria-hidden="true" />
            {project.meta}
          </p>
          <h3 className="project__title" id={`${project.id}-title`}>
            {project.name}
          </h3>
          <p className="project__tagline">{project.tagline}</p>

          {project.bullets && (
            <ul className="project__bullets">
              {project.bullets.map((b) => (
                <li key={b}>
                  <span aria-hidden="true">→</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {project.stats && (
            <dl className="project__stats">
              {project.stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt className="stat__label mono">{s.label}</dt>
                  <dd className="stat__value">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="chips" aria-label="Tech stack">
            {project.tech.map((t) => (
              <li key={t} className="chip mono">
                {t}
              </li>
            ))}
          </ul>

          {project.href && (
            <a className="link-arrow mono" href={project.href} target="_blank" rel="noreferrer">
              View project <ArrowUpRightIcon size={12} />
            </a>
          )}
        </div>

        <Media project={project} />
      </div>
    </article>
  )
}
