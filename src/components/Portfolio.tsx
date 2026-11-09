import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUp, ArrowUpRight, Asterisk, Focus, Sparkles } from 'lucide-react'
import { about, contact, projects } from '../content'

function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (entry.boundingClientRect.top > 0) {
        element.animate([{ opacity: .45, translate: '0 12px' }, { opacity: 1, translate: '0 0' }], {
          duration: 460,
          easing: 'cubic-bezier(.2,.65,.2,1)',
        })
      }
      observer.disconnect()
    }, { threshold: .08 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label mono"><span />{children}</p>
}

function ProjectArtwork({ variant }: { variant: typeof projects[number]['artwork'] }) {
  return (
    <div className={`project-art art-${variant}`} aria-hidden="true">
      <span className="art-index mono">{variant === 'prompt' ? 'FIG. 01 / INPUT' : 'FIG. 02 / ORGANIZE'}</span>
      {variant === 'prompt' ? (
        <div className="prompt-window">
          <div className="prompt-top"><Sparkles size={14} /> STUDIO / DRAFT</div>
          <p>Start with a<br />question<span>.</span></p>
          <div className="prompt-field"><span>What are you exploring?</span><span><ArrowUp size={13} /></span></div>
        </div>
      ) : (
        <div className="workspace-window">
          <div className="workspace-sidebar"><Asterisk size={20} /><i /><i /><i /><i /></div>
          <div className="workspace-main">
            <p>Workspace</p>
            <div className="workspace-blocks"><i /><i /><i /></div>
            <div className="workspace-rows"><i /><i /><i /></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Portfolio() {
  return (
    <>
      <section id="work" className="work-section section-pad" aria-labelledby="work-title">
        <div className="frame">
          <Reveal>
            <SectionLabel>01 / Portfolio</SectionLabel>
            <div className="section-heading">
              <h2 id="work-title">Selected work<span>.</span></h2>
              {projects.some((project) => project.sample) && <p>Editable project placeholders.<br />Case studies will appear here.</p>}
            </div>
          </Reveal>
          <div className="project-grid">
            {projects.map((project) => (
              <Reveal key={project.id}>
                <article className="project">
                  {project.image ? (
                    <img className="project-image" src={project.image} alt="" loading="lazy" />
                  ) : <ProjectArtwork variant={project.artwork} />}
                  <div className="project-meta mono"><span>{project.category}</span><span>{project.sample ? 'Placeholder' : 'Project'} / {project.id}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.href && <a className="text-link" href={project.href}>View case study <ArrowUpRight size={15} /></a>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experiments" className="lab-section section-pad" aria-labelledby="lab-title">
        <div className="frame">
          <Reveal>
            <SectionLabel>02 / Play</SectionLabel>
            <div className="section-heading">
              <h2 id="lab-title">Experiments<span>.</span></h2>
              <p>Small builds that give an interaction room to breathe.</p>
            </div>
            <a className="lab-entry" href="#top">
              <span className="lab-icon"><Focus size={27} strokeWidth={1.3} /></span>
              <span>
                <span className="mono lab-entry-label">Live on this site / 01</span>
                <strong>Cursor-tracked portrait</strong>
                <span className="lab-entry-description">A head-turn animation you can scrub with your pointer.</span>
              </span>
              <span className="lab-arrow"><ArrowUpRight size={23} /></span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="about" className="about-section section-pad" aria-labelledby="about-title">
        <div className="frame">
          <Reveal>
            <SectionLabel>03 / About</SectionLabel>
            <div className="about-grid">
              {about.portrait && <img className="about-portrait" src={about.portrait} alt="Sasi" loading="lazy" />}
              <h2 id="about-title">{about.heading}</h2>
              <div className="about-copy">
                <p>{about.introduction}</p>
                <p>{about.approach}</p>
                <a className="text-link" href="#contact">Get in touch <ArrowDownRight size={17} /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
        <div className="frame">
          <Reveal>
            <SectionLabel>04 / Contact</SectionLabel>
            <div className="section-heading">
              <h2 id="contact-title">Let’s talk<span>.</span></h2>
              {contact.length ? (
                <ul className="contact-links">
                  {contact.map(({ label, href }) => <li key={href}><a className="text-link" href={href}>{label} <ArrowUpRight size={17} /></a></li>)}
                </ul>
              ) : <p>Contact links coming soon.</p>}
            </div>
          </Reveal>
          <div className="footer-bottom mono"><span>Sasi / Product Designer &amp; Builder</span><a href="#top">Back to top <ArrowUp size={14} /></a></div>
        </div>
      </footer>
    </>
  )
}
