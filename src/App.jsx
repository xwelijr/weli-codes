import { useEffect, useRef, useState } from 'react'
import {
  site,
  about,
  whatIDo,
  skillGroups,
  metricStrings,
  ehrdCode,
  projects,
  principles,
  contactIntro,
} from './data.js'

/* Wrap the approved metric strings (and only those) in <strong class="metric">. */
function Metric({ text }) {
  const hit = metricStrings.find((m) => text.includes(m))
  if (!hit) return text
  const [before, after] = [text.slice(0, text.indexOf(hit)), text.slice(text.indexOf(hit) + hit.length)]
  return (
    <>
      {before}
      <strong className="metric">{hit}</strong>
      {after}
    </>
  )
}

function StatusReadout({ lead, rest, dim }) {
  return (
    <p className={'status-readout' + (dim ? ' status-readout--dim' : '')}>
      <span className="status-dot" aria-hidden="true" />
      <span>
        <span className="status-lead">{lead}</span>
        {rest}
      </span>
    </p>
  )
}

function StatusChip({ status }) {
  return <span className={`chip chip--${status.variant}`}>{status.text}</span>
}

function EvidenceFrame({ img, onZoom }) {
  return (
    <figure className="evidence-figure">
      <button
        type="button"
        className="evidence"
        aria-label={`View full size — ${img.caption}`}
        onClick={(e) => onZoom(img, e.currentTarget)}
      >
        <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" />
      </button>
      <figcaption className="evidence-caption">{img.caption}</figcaption>
    </figure>
  )
}

function CodeBlock() {
  return (
    <div className="artifact">
      <div className="artifact-head">
        <span className="artifact-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="artifact-label">docker-compose.yml · compat/prepend.php</span>
      </div>
      <pre className="artifact-body">
        <code>{ehrdCode}</code>
      </pre>
    </div>
  )
}

function PipelineStrip() {
  return (
    <div className="artifact">
      <div className="artifact-head">
        <span className="artifact-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="artifact-label">Deploy path</span>
      </div>
      <p className="visually-hidden">
        Deployment path: commit, then the dev environment at ehrd.dev.rks-a.com with a test
        database, then production on Linode.
      </p>
      <div className="pipeline">
        <div className="pipeline-stage">
          <span className="pipeline-name">Commit</span>
          <span className="pipeline-detail">Source push</span>
        </div>
        <div className="pipeline-connector" aria-hidden="true">
          <span className="pipeline-line" />
          <span className="pipeline-arrow">↓</span>
        </div>
        <div className="pipeline-stage">
          <span className="pipeline-name">Dev — ehrd.dev.rks-a.com</span>
          <span className="pipeline-detail">Test database · prod-shaped data</span>
        </div>
        <div className="pipeline-connector" aria-hidden="true">
          <span className="pipeline-line" />
          <span className="pipeline-arrow">↓</span>
        </div>
        <div className="pipeline-stage">
          <span className="pipeline-name">Prod — Linode</span>
          <span className="pipeline-detail">
            <span className="chip chip--green chip--mini">Phase 1 live</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function ProjectText({ p }) {
  return (
    <div className="project-text">
      <div className="project-title-line">
        <h3>{p.title}</h3>
        <span className="project-period">{p.period}</span>
      </div>
      <p className="project-meta">{[p.org, ...p.tags].join(' · ')}</p>
      <p className="project-summary">{p.summary}</p>
      <ul className="project-highlights" role="list">
        {p.highlights.map((h) => (
          <li key={h}>
            <Metric text={h} />
          </li>
        ))}
      </ul>
      <StatusChip status={p.status} />
    </div>
  )
}

function Project({ p, onZoom }) {
  if (p.evidence === 'gallery') {
    return (
      <article className="project project--flagship">
        <ProjectText p={p} />
        <div className="project-gallery">
          <EvidenceFrame img={p.gallery.lead} onZoom={onZoom} />
          <div className="project-gallery-pair">
            {p.gallery.pair.map((img) => (
              <EvidenceFrame key={img.src} img={img} onZoom={onZoom} />
            ))}
          </div>
        </div>
      </article>
    )
  }
  const rail =
    p.evidence === 'code' ? (
      <CodeBlock />
    ) : p.evidence === 'pipeline' ? (
      <PipelineStrip />
    ) : p.evidence === 'image' ? (
      <EvidenceFrame img={p.image} onZoom={onZoom} />
    ) : null
  return (
    <article
      className={
        'project' +
        (p.flipped ? ' project--flipped' : '') +
        (p.evidence === 'none' ? ' project--text-only' : '')
      }
    >
      <ProjectText p={p} />
      {rail && <div className="project-evidence">{rail}</div>}
    </article>
  )
}

function Lightbox({ img, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={img.caption} onClick={onClose}>
      <button
        type="button"
        ref={closeRef}
        className="lightbox-close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} />
        <p className="lightbox-caption">{img.caption}</p>
      </div>
    </div>
  )
}

const NAV = [
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [zoom, setZoom] = useState(null) // { img, trigger }
  const [active, setActive] = useState(null)

  useEffect(() => {
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(visible.size ? [...visible][visible.size - 1] : null)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const openZoom = (img, trigger) => setZoom({ img, trigger })
  const closeZoom = () => {
    const t = zoom?.trigger
    setZoom(null)
    t?.focus()
  }

  return (
    <>
      <a className="skip-link" href="#skills">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#top">
            weli.codes
            <span className="cursor-block" aria-hidden="true" />
          </a>
          <nav className="site-nav" aria-label="Section navigation">
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                {label}
              </a>
            ))}
            <a className="btn btn--primary" href={`mailto:${site.links.email}`}>
              Email
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ——— Hero ——— */}
        <section className="hero container" aria-label="Introduction">
          <p className="eyebrow">{site.eyebrow}</p>
          <h1 className="hero-name">
            {site.name[0]}
            <br />
            {site.name[1]}
          </h1>
          <p className="hero-positioning">{site.positioning}</p>
          <StatusReadout lead={site.status.lead} rest={site.status.rest} />
          <ul className="facts" role="list">
            {site.facts.map((f, i) => (
              <li key={f}>
                {i > 0 && <span className="facts-divider" aria-hidden="true" />}
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="btn btn--primary" href={`mailto:${site.links.email}`}>
              Email
            </a>
            <a className="btn" href={site.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        {/* ——— 01 Skills ——— */}
        <section id="skills" className="section container" aria-labelledby="skills-heading">
          <div className="section-rule" />
          <div className="section-head-row">
            <p className="eyebrow">
              <span className="section-index">01</span> — Capabilities
            </p>
            <p className="section-meta">PT Asuransi Raksa Pratikara</p>
          </div>
          <h2 id="skills-heading">Skills &amp; stack</h2>
          <div className="section-content">
            <p className="about">{about}</p>
            <div className="skills-split">
              <div className="whatido">
                {whatIDo.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="skill-groups">
                {skillGroups.map((g) => (
                  <div className="skill-group" key={g.label}>
                    <p className="skill-group-label">{g.label}</p>
                    <ul role="list">
                      {g.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— 02 Projects ——— */}
        <section id="work" className="section container" aria-labelledby="work-heading">
          <div className="section-rule" />
          <div className="section-head-row">
            <p className="eyebrow">
              <span className="section-index">02</span> — Selected work
            </p>
            <p className="section-meta">2025 — 2026</p>
          </div>
          <h2 id="work-heading">Projects</h2>
          <div className="section-content">
            {projects.map((p, i) => (
              <div key={p.id}>
                {i > 0 && <div className="project-separator" aria-hidden="true" />}
                <Project p={p} onZoom={openZoom} />
              </div>
            ))}
          </div>
        </section>

        {/* ——— 03 Approach ——— */}
        <section id="approach" className="section container" aria-labelledby="approach-heading">
          <div className="section-rule" />
          <div className="section-head-row">
            <p className="eyebrow">
              <span className="section-index">03</span> — Approach
            </p>
          </div>
          <h2 id="approach-heading">How I work</h2>
          <div className="section-content principles">
            {principles.map((pr) => (
              <div className="principle" key={pr.label}>
                <p className="principle-label">{pr.label}</p>
                <p className="principle-text">{pr.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ——— 04 Contact ——— */}
        <section id="contact" className="section container" aria-labelledby="contact-heading">
          <div className="section-rule" />
          <div className="section-head-row">
            <p className="eyebrow">
              <span className="section-index">04</span> — Contact
            </p>
          </div>
          <h2 id="contact-heading">Contact</h2>
          <div className="section-content">
            <p className="contact-intro">
              {contactIntro.before}
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                {contactIntro.linkText}
              </a>
              {contactIntro.after}
            </p>
            <a className="contact-email" href={`mailto:${site.links.email}`}>
              {site.links.email}
            </a>
            <div className="contact-rows">
              <a className="contact-row" href={site.links.phoneHref}>
                <span className="contact-row-label">Phone</span>
                <span className="contact-row-value">{site.links.phone}</span>
              </a>
              <a
                className="contact-row"
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row-label">LinkedIn</span>
                <span className="contact-row-value">/welli-irawan-370ba835a</span>
              </a>
              <a
                className="contact-row"
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row-label">GitHub</span>
                <span className="contact-row-value">/xwelijr</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <StatusReadout
            lead="Last updated"
            rest={` ${__BUILD_DATE__} · all links tested · built with Vite + React`}
            dim
          />
          <a className="back-to-top" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>

      {zoom && <Lightbox img={zoom.img} onClose={closeZoom} />}
    </>
  )
}
