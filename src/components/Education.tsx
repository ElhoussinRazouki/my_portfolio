import { certifications, education } from '../data/content'

export function Education() {
  return (
    <section className="section section--tight" aria-label="Education and certifications">
      <div className="edu-grid">
        <div className="edu-card">
          <h2 className="mono edu-card__label edu-card__label--blue">✦ Education</h2>
          {education.map((e) => (
            <div key={e.title} className="edu-item">
              <h3 className="edu-item__title">{e.title}</h3>
              <p className="edu-item__detail">{e.detail}</p>
              <p className="mono edu-item__dates">{e.dates}</p>
            </div>
          ))}
        </div>

        <div className="edu-card">
          <h2 className="mono edu-card__label edu-card__label--pink">✦ Certifications</h2>
          <p className="hand edu-card__issuer">{certifications.issuer}</p>
          <ul className="certs">
            {certifications.items.map((c) => (
              <li key={c.name}>
                <span className="certs__swatch" style={{ background: c.color }} aria-hidden="true" />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
