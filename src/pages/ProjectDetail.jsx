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
  const caseStudySections = [
    {
      label: 'The challenge',
      title: project.evidence[0].title,
      text: project.evidence[0].text,
    },
    {
      label: 'The approach',
      title: project.evidence[1].title,
      text: project.evidence[1].text,
    },
    {
      label: 'The outcome',
      title: project.evidence[2].title,
      text: project.evidence[2].text,
    },
  ]

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

      <section className="section container project-detail__evidence" aria-label="Project case study">
        <p className="label">Case study</p>
        <h2>Inside the work</h2>
        <div className="project-detail__evidence-grid">
          {caseStudySections.map((item) => (
            <div key={item.label}>
              <p className="label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
        position="bottom"
      />
    </article>
  )
}

export default ProjectDetail
