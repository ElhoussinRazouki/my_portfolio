import { profile } from '../data/content'
import { ArrowUpRightIcon, CodeSlashIcon } from './Icons'

function CurvedArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="34"
      height="30"
      viewBox="0 0 34 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M2 26C10 22 22 14 30 4" />
      <path d="M22 5l8-1-1 8" />
    </svg>
  )
}

export function Hero() {
  const [tagA, tagB] = profile.heroTags

  return (
    <section id="top" className="hero">
      <div className="hero__avatar hero__avatar--left hero-deco" aria-hidden="true">
        <img className="hero__avatar-img" src={profile.avatar} alt="" />
      </div>
      <div className="hero__avatar hero__avatar--right hero-deco" aria-hidden="true">
        <CodeSlashIcon size={24} />
      </div>

      <p className="hand hero__intro">my name is</p>
      <svg className="hero__squiggle" aria-hidden="true" width="44" height="10" viewBox="0 0 44 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 3c10-2 30-2 40 0" />
        <path d="M6 7c8-1.5 24-1.5 32 0" />
      </svg>

      <div className="hero__name-wrap">
        <span className="tag tag--mint hero__tag hero__tag--left hero-deco">{tagA}</span>
        <span className="tag tag--yellow hero__tag hero__tag--right hero-deco">{tagB}</span>

        <p className="hero__name" aria-label={profile.name}>
          {profile.displayName}
        </p>

        <div className="hero__note hero__note--left hero-deco">
          <span className="hand hero__note-label hero__note-label--yellow">{profile.role}</span>
          <CurvedArrow />
        </div>
        <div className="hero__note hero__note--right hero-deco">
          <CurvedArrow flip />
          <span className="hand hero__note-label hero__note-label--mint">{profile.location}</span>
        </div>
      </div>

      <div className="hero__mobile-tags">
        <span className="hand hero__note-label hero__note-label--yellow">{profile.role}</span>
        <span className="hand hero__note-label hero__note-label--mint">{profile.location}</span>
        <span className="tag tag--yellow">{tagB}</span>
      </div>

      <p className="status mono">
        <span className="status__dot" aria-hidden="true" />
        {profile.status}
      </p>

      <h1 className="hero__headline">
        {profile.headline[0]}{' '}
        <span className="badge-target" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" fill="#fff" />
          </svg>
        </span>{' '}
        {profile.headline[1]}{' '}
        <svg className="badge-flower" aria-hidden="true" viewBox="0 0 24 24">
          <g fill="var(--pink-soft)" stroke="var(--ink)" strokeWidth="1">
            <circle cx="12" cy="5" r="4" />
            <circle cx="19" cy="12" r="4" />
            <circle cx="12" cy="19" r="4" />
            <circle cx="5" cy="12" r="4" />
          </g>
          <circle cx="12" cy="12" r="3.2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1" />
        </svg>
      </h1>

      <a href="#contact" className="btn-contact mono">
        <span className="btn-contact__icon" aria-hidden="true">
          <ArrowUpRightIcon size={14} />
        </span>
        Contact me
      </a>
    </section>
  )
}
