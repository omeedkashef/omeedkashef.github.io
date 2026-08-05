import educationImage from '../assets/portfolio-education.jpg'
import projectsImage from '../assets/portfolio-projects.jpg'
import avPerception from '../assets/tech-in-nature.jpg'
import surgicalPlanning from '../assets/circuit-amber.jpg'
import fieldHealth from '../assets/analytics-dashboard.jpg'
import missionSystems from '../assets/forest-sunset.jpg'
import justiceAccess from '../assets/urban-greenery.jpg'
import supplyChain from '../assets/solar-architecture.jpg'

// The two section images were generated with DALL-E via ChatGPT and satisfy this
// page's AI-image requirement. The six project thumbnails are stock photography
// and are documented as such in ai/ai-spec.md — they are not AI-generated.

// Dates render in the work section only. Education carries none (the resume
// itself has none) and projects carry none. See ai/features/portfolio-page.feature.md.

const EDUCATION = [
  {
    institution: 'University of Iowa',
    program: 'Master of Science (MS), Industrial and Systems Engineering',
  },
  {
    institution: 'Grinnell College',
    program: 'Bachelor of Arts (BA), Biochemistry',
  },
]

// Descriptions condensed from the resume's own bullets. No metric appears here
// that the resume does not state.
const WORK = [
  {
    role: 'Forward Deployed Engineer',
    org: 'Codeboxx',
    dates: 'April 2026 – Present',
    text: 'Analyzes business use cases and develops requirements documents for full-stack applications, using AI to design system architectures with the MERN and Java/Spring Boot stacks. Combines UX, human factors, and systems thinking to improve product-market fit.',
  },
  {
    role: 'SMB Account Executive',
    org: 'Frontier Communications',
    dates: 'July 2025 – April 2026',
    text: 'Increased territory market share by 10% and met 115% of quota, averaging $280k in ARR and reaching the top 30% national ranking within three months.',
  },
  {
    role: 'Senior Product Consultant',
    org: 'Defense Contractor',
    dates: 'June 2024 – July 2025',
    text: 'Led a product development team of five through the 510(k) submission of a Class II surgical device, and trained five human factors and UX/UI designers on medical device development and regulatory hurdles. Designed methods to extract and integrate the priorities of unmanned vehicle operators into software requirements, producing an interface that reduced task time and theoretical workload by 40%.',
  },
  {
    role: 'Product Consultant',
    org: 'Goddard',
    dates: 'May 2023 – June 2024',
    text: 'Managed the integration of parts and information into Agile PLM for the production of a robotic arm at Amazon, and ran human factors and UX studies for clients across medical devices, robotics, web, and mobile products. Developed and tested interactive Figma prototypes with more than 50 participants, improving first-click success by 22%.',
  },
  {
    role: 'Usability Consultant',
    org: 'Haemonetics',
    dates: 'December 2022 – April 2023',
    text: 'Conducted task analysis, use-related FMEA, usability planning, and use specification development for a Class II medical device. Applied IEC 62366, ANSI HE75, ISO 14971, and FDA guidance to a failure mode and effects analysis, identifying 18 high-risk tasks for a blood-processing device.',
  },
  {
    role: 'Product Owner',
    org: 'Ford Motor Company',
    dates: 'October 2019 – September 2022',
    text: "Led an agile team of eight to deliver the prototype of Ford's first in-vehicle onboarding experience; usability testing with more than 60 participants across three user groups produced a 95% user acceptance rate. Managed OKRs, timelines, the product backlog, and sprints with stakeholders, and mentored coworkers in design thinking and human factors.",
  },
  {
    role: 'Human Factors Researcher',
    org: 'Driving Safety Research Institute',
    dates: 'August 2017 – August 2019',
    text: 'Developed attentional maintenance algorithms for camera-based driver monitoring in highly automated vehicles, demonstrating a 22% increase in situational awareness and a 28% decrease in reaction time. Built the front end of a 3D virtual driving environment and analyzed gaze transitions and takeover response times in R.',
  },
]

const PROJECTS = [
  {
    title: 'Field Health Data Platform',
    domain: 'Global Health',
    tags: ['Full-Stack', 'Product', 'Low-Bandwidth'],
    text: 'Open-source platform for community health workers to collect and sync patient data offline — React Native, Node.js, PostgreSQL. Built so that unreliable connectivity does not stop care from being recorded.',
    img: fieldHealth,
    alt: 'An analytics dashboard displayed on a laptop screen',
  },
  {
    title: 'Justice Access Navigator',
    domain: 'Social Justice',
    tags: ['Social Entrepreneurship', 'Full-Stack', 'Civic Tech'],
    text: 'Web app connecting low-income residents to legal aid, housing, and social services, co-designed with community organizers across three U.S. cities so its recommendations reflect the resources actually available.',
    img: justiceAccess,
    alt: 'Dense urban greenery interspersed with modern buildings',
  },
  {
    title: 'AV Perception HMI',
    domain: 'Autonomous Vehicles',
    tags: ['UX', 'Systems', 'Safety-Critical'],
    text: 'Operator interface for a Level 4 autonomous vehicle fleet, translating real-time sensor fusion and edge-case decisions into displays a remote supervisor can act on under time pressure.',
    img: avPerception,
    alt: 'A laptop screen reflecting sunlight through trees',
  },
  {
    title: 'Supply Chain Transparency',
    domain: 'Social Enterprise',
    tags: ['Product Management', 'API', 'Impact'],
    text: 'B2B SaaS tool helping small and medium-sized enterprises audit and publish supplier labor standards, taken from requirements through MVP in partnership with a fair-trade certification body.',
    img: supplyChain,
    alt: 'A modern building fitted with large solar panels',
  },
  {
    title: 'Surgical Planning Workflow',
    domain: 'Medical Device',
    tags: ['Product Management', 'UX', 'FDA 510(k)'],
    text: 'End-to-end product ownership of a pre-operative planning tool — requirements, regulatory documentation and clinical validation across orthopedic surgery suites.',
    img: surgicalPlanning,
    alt: 'A circuit board lit with glowing amber points',
  },
  {
    title: 'Mission Systems Dashboard',
    domain: 'Defense',
    tags: ['Systems Engineering', 'UX', 'Real-Time'],
    text: 'Operator console for mission-critical ground systems: information architecture and interaction design for high-cognitive-load environments working under ITAR constraints.',
    img: missionSystems,
    alt: 'An aerial view of a vast forest at sunset',
  },
]

function Portfolio() {
  return (
    <>
      <section className="section container" aria-labelledby="portfolio-heading">
        <div className="portfolio-head">
          <div>
            <p className="eyebrow">Experience &amp; selected work</p>
            <h1 id="portfolio-heading">
              A practice shaped by
              <br />
              <em>complex systems.</em>
            </h1>
          </div>
          <a
            className="btn"
            href={`${import.meta.env.BASE_URL}Omeed_Kashef_Resume.pdf`}
            download
          >
            Download resume (PDF)
          </a>
        </div>
      </section>

      {/* Section 1 — Education */}
      <section className="section container" aria-labelledby="education-heading">
        <p className="label">Education</p>
        <h2 id="education-heading" className="portfolio-section__title">
          Foundations
        </h2>
        <div className="entry-list">
          {EDUCATION.map((item) => (
            <article key={item.institution} className="entry">
              <div className="entry__meta">
                <p className="entry__org">{item.institution}</p>
              </div>
              <div className="entry__body">
                <h3 className="entry__title">{item.program}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="portfolio-band">
        <img
          src={educationImage}
          alt="An open study space with engineering texts, precise models and drafting tools, overlooking mature trees"
        />
      </div>

      {/* Section 2 — Work experience */}
      <section className="section container" aria-labelledby="work-heading">
        <p className="label">Work experience</p>
        <h2 id="work-heading" className="portfolio-section__title">
          Where I have contributed
        </h2>
        <div className="entry-list">
          {WORK.map((job) => (
            <article key={`${job.org}-${job.role}`} className="entry">
              <div className="entry__meta">
                <p className="entry__dates">{job.dates}</p>
                <p className="entry__org">{job.org}</p>
              </div>
              <div className="entry__body">
                <h3 className="entry__title">{job.role}</h3>
                <p className="entry__text">{job.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="portfolio-band">
        <img
          src={projectsImage}
          alt="A workbench where circuit boards, sensors and interface sketches sit among growing plants"
        />
      </div>

      {/* Section 3 — Projects */}
      <section className="section container" aria-labelledby="projects-heading">
        <p className="label">Selected projects</p>
        <h2 id="projects-heading" className="portfolio-section__title">
          Evidence in the work
        </h2>
        <div className="card-grid">
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card">
              <div className="media media--zoom">
                <img src={project.img} alt={project.alt} />
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__domain">{project.domain}</p>
                <div className="row project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="project-card__text">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Portfolio
