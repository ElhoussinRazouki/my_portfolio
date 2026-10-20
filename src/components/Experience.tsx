import { experience } from '../data/content'
import { SectionHeading, Tape } from './Decor'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading kicker="where I've worked" title="experience" id="experience-title" />

      <ol className="sheet xp">
        <Tape color="yellow" style={{ left: '50%', top: -12, width: 90, marginLeft: -45, transform: 'rotate(-2deg)' }} />
        {experience.map((job) => (
          <li key={`${job.org}-${job.dates}`} className="xp__row">
            <p className="xp__dates mono">{job.dates}</p>
            <div className="xp__main">
              <div className="xp__heading">
                <h3 className="xp__title">{job.title}</h3>
                <span className="hand xp__org" style={{ background: job.color }}>
                  {job.org}
                </span>
              </div>
              <p className="xp__summary">{job.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
