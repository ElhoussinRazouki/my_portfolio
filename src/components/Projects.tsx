import { projects } from '../data/content'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const live = projects.filter((p) => p.live).length

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects__head">
        <div>
          <p className="hand projects__kicker">stuff I've shipped</p>
          <h2 className="projects__title" id="projects-title">
            Selected projects
          </h2>
        </div>
        <p className="mono projects__count">
          {String(projects.length).padStart(2, '0')} projects · {live} in production
        </p>
      </div>

      <div className="projects__stack">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
