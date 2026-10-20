import { about, profile } from '../data/content'
import { Polaroid } from './Decor'
import { SparkleIcon, stampIcons } from './Icons'

export function About() {
  return (
    <>
      <svg className="divider" aria-hidden="true" viewBox="0 0 1240 40" preserveAspectRatio="none">
        <path d="M0 38 Q620 -14 1240 38" />
      </svg>

      <section id="about" className="about" aria-labelledby="about-title">
        <p className="hand about__label">about me!</p>

        <div className="about__row">
          <Polaroid
            className="polaroid--left"
            src={profile.photo}
            label="El Houssin Razouki"
            caption={profile.photoCaption}
          />

          <div className="about__body">
            <h2 className="boxed-title" id="about-title">
              what's up
            </h2>
            <p className="hand about__text">
              {about.intro} <SparkleIcon size={22} className="about__sparkle" /> {about.body}
            </p>

            <ul className="stamps" aria-label="Focus areas">
              {about.stamps.map((s) => {
                const Icon = stampIcons[s.icon]
                return (
                  <li key={s.label} className="stamps__pair">
                    <span className={`stamp stamp--${s.color}`}>{s.label}</span>
                    <span className={`stamp stamp--icon stamp--${s.color}`} aria-hidden="true">
                      <Icon size={20} />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <Polaroid
            className="polaroid--right"
            src={profile.productsPhoto}
            label="CTRBuddy, Aevo and Study Time app icons"
            caption={profile.productsCaption}
            tone="dark"
          />
        </div>
      </section>
    </>
  )
}
