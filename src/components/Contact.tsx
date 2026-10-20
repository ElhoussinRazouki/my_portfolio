import { profile } from '../data/content'
import { Tape } from './Decor'
import { DownloadIcon, GithubIcon, LinkedinIcon } from './Icons'

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__card">
        <Tape color="blue" style={{ left: 40, top: -10, width: 80, transform: 'rotate(-5deg)' }} />
        <Tape color="yellow" style={{ right: 40, top: -10, width: 80, transform: 'rotate(4deg)' }} />

        <p className="hand contact__kicker">got a hard problem? I'm listening.</p>
        <h2 className="contact__title" id="contact-title">
          SAY HI!
        </h2>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="contact__links">
          <a className="pill-btn pill-btn--pink mono" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={14} /> GitHub
          </a>
          <a className="pill-btn pill-btn--yellow mono" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <a className="pill-btn pill-btn--green mono" href={profile.cvUrl} download>
            <DownloadIcon size={14} /> Download CV
          </a>
        </div>
      </div>

      <footer className="footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; built in {profile.location}</span>
      </footer>
    </section>
  )
}
