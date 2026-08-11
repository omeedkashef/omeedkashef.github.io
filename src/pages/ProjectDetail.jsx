import { Link, Navigate, useParams } from 'react-router-dom'
import { PROJECTS } from './Portfolio.jsx'

function ProjectNavigation({ previousProject, nextProject, position }) {
  return (
    <nav
      className={`${position === 'top' ? '' : 'section container '}project-detail__nav project-detail__nav--${position}`}
      aria-label={`${position === 'top' ? 'Top' : 'Bottom'} project navigation`}
    >
      <Link
        className="project-detail__nav-link project-detail__nav-link--previous"
        to={`/portfolio/projects/${previousProject.slug}`}
        rel="prev"
      >
        <span className="label">← Previous project</span>
        <span>{previousProject.title}</span>
      </Link>
      <Link
        className="project-detail__nav-link project-detail__nav-link--next"
        to={`/portfolio/projects/${nextProject.slug}`}
        rel="next"
      >
        <span className="label">Next project →</span>
        <span>{nextProject.title}</span>
      </Link>
    </nav>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const projectIndex = PROJECTS.findIndex((item) => item.slug === slug)
  const project = PROJECTS[projectIndex]

  if (!project) return <Navigate to="/portfolio" replace />

  const previousProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length]
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length]

  return (
    <article className="project-detail">
      <div className="container project-detail__visual-frame">
        <ProjectNavigation
          previousProject={previousProject}
          nextProject={nextProject}
          position="top"
        />

        <header
          className="section project-detail__header"
          style={{ '--project-hero': `url(${project.img})` }}
        >
          <Link className="project-detail__back" to="/portfolio#selected-projects">
            ← Back to selected projects
          </Link>
          <p className="eyebrow">{project.domain}</p>
          <h1>{project.title}</h1>
          <p className="lead project-detail__intro">{project.text}</p>
          <div className="row project-card__tags" aria-label="Project disciplines">
            {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </header>

        <section className="project-detail__gallery" aria-label="Project visuals">
          {project.gallery.map((image) => (
            <figure key={image.src} className="project-detail__figure">
              <div className="project-detail__image">
                <img src={image.src} alt={image.alt} />
            </div>
            <figcaption>{image.caption}</figcaption>
          </figure>
          ))}
        </section>
      </div>

      <section className="section container project-detail__content" aria-label="Project case study">
        <div>
          <p className="label">The challenge</p>
          <h2>What needed to work</h2>
          <p>{project.challenge}</p>
        </div>
        <div>
          <p className="label">The approach</p>
          <h2>How the problem was framed</h2>
          <p>{project.approach}</p>
        </div>
        <div>
          <p className="label">The outcome</p>
          <h2>What changed</h2>
          <p>{project.outcome}</p>
        </div>
      </section>

      {project.evidence && (
        <section className="section container project-detail__evidence" aria-label="Case study evidence">
          <p className="label">Evidence from the case study</p>
          <h2>Inside the work</h2>
          <div className="project-detail__evidence-grid">
            {project.evidence.map((item) => (
              <div key={item.title}>
                <p className="label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
        position="bottom"
      />
    </article>
  )
}

export default ProjectDetail
