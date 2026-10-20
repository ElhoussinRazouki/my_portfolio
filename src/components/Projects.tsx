'use client'

import { motion } from 'motion/react'
import { projects } from '../data/content'
import { ProjectCard } from './ProjectCard'
import { fadeUp, stagger, viewport } from './motion'

export function Projects() {
  const live = projects.filter((p) => p.live).length

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <motion.div
        className="projects__head"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.1)}
      >
        <div>
          <motion.p className="hand projects__kicker" variants={fadeUp}>
            stuff I've shipped
          </motion.p>
          <motion.h2 className="projects__title" id="projects-title" variants={fadeUp}>
            Selected projects
          </motion.h2>
        </div>
        <motion.p className="mono projects__count" variants={fadeUp}>
          {String(projects.length).padStart(2, '0')} projects · {live} in production
        </motion.p>
      </motion.div>

      <div className="projects__stack">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
