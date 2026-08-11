import {
  CodeIcon,
  StackIcon,
  ServerIcon,
  ApiIcon,
  ChartIcon,
  ArchitectureIcon,
  LeadershipIcon,
  CommunicationIcon,
  StakeholderIcon,
  EmpathyIcon,
  FacilitationIcon,
  StrategyIcon,
} from '../components/Icons.jsx'
import heroImage from '../assets/hero-clean.png'
import collaborationImage from '../assets/home-collaboration.jpg'
import highStakesSystemsImage from '../assets/high-stakes-systems.jpg'

// Images on this page were generated with OpenAI image tools. See the asset
// table in ai/ai-spec.md for full attribution.

// Skills come from the resolved content decisions in ai/ai-spec.md. The tech
// lists there are expanded into sentences here; no capability is claimed that
// the resume does not support.
const TECHNICAL_SKILLS = [
  {
    Icon: CodeIcon,
    title: 'JavaScript & Front-End',
    text: 'Building interfaces with HTML, CSS, JavaScript, and React — including the component structure and routing behind this site.',
  },
  {
    Icon: StackIcon,
    title: 'MERN Stack',
    text: 'Using MongoDB, Express, React, and Node together to take a defined use case from data model through to a working interface.',
  },
  {
    Icon: ServerIcon,
    title: 'Java Back-End',
    text: 'Using Java with Spring Boot, JPA, and SQL for server-side services and relational data access.',
  },
  {
    Icon: ApiIcon,
    title: 'APIs & Tooling',
    text: 'REST APIs exercised and debugged with Postman, with Git and GitHub for version control and collaboration.',
  },
  {
    Icon: ChartIcon,
    title: 'Data Analysis & Visualization',
    text: 'R and Excel for statistical analysis of study data, turning research results into decisions a team can act on.',
  },
  {
    Icon: ArchitectureIcon,
    title: 'Systems Architecture & Requirements',
    text: 'Applying requirements traceability, system architecture, and failure mode analysis to complex, safety-critical products operating under real-world constraints.',
  },
]

const SOFT_SKILLS = [
  {
    Icon: LeadershipIcon,
    title: 'Leadership & Mentorship',
    text: 'Led a product development team of five through a Class II device 510(k) submission and an agile team of eight at Ford. Trained and mentored designers in human factors and product development.',
  },
  {
    Icon: CommunicationIcon,
    title: 'Cross-Functional Communication',
    text: 'Streamlined communication across mechanical engineering, regulatory, human factors, and business development by organizing information architecture, defining roles, and setting agendas.',
  },
  {
    Icon: StakeholderIcon,
    title: 'Stakeholder & Client Management',
    text: 'Managed OKRs, timelines, product backlogs, and sprints throughout the product lifecycle, and presented competitive analysis and product strategy to leadership.',
  },
  {
    Icon: EmpathyIcon,
    title: 'Design Thinking & Empathy',
    text: 'Used personas, user journeys, empathy maps, and qualitative research with more than 50 participants to ground decisions in real user needs.',
  },
  {
    Icon: FacilitationIcon,
    title: 'Agile Team Facilitation',
    text: 'Guided cross-functional teams through backlogs, sprints, and shared priorities, creating the structure needed to move complex work forward together.',
  },
  {
    Icon: StrategyIcon,
    title: 'Strategic Planning & Prioritization',
    text: 'Connected OKRs, competitive analysis, and product strategy to practical roadmaps, helping teams focus their efforts where they create the most value.',
  },
]

// The YouTube id of the introduction video — the trailing segment of the share
// URL (youtu.be/<id>), not the whole link. Leave it empty and the section below
// is skipped entirely, so an unset id can never ship a broken player to
// production. Paste the id here and the section appears on the next build.
const INTRO_VIDEO_ID = 'kCiZ8vkk4Rk'

const EXPERTISE = [
  ['Industrial & Systems Engineering', 'Requirements, architecture, safety-critical design'],
  ['Product Management', 'Roadmap, stakeholder alignment, regulatory environments'],
  ['UX & Human Factors', 'Research, interaction design, usability in complex systems'],
  ['Full-Stack Development', 'React, Node.js, Python, PostgreSQL, cloud infrastructure'],
]

const DOMAIN_EXPERIENCE = [
  ['Autonomous Vehicles', 'Driver monitoring, simulation, takeover safety'],
  ['Medical Devices', 'FDA 510(k), usability engineering, risk analysis'],
  ['Defense Systems', 'Mission planning, operator workload, requirements'],
  ['Consumer Products', 'Driver onboarding, prototyping, customer research'],
  ['Robotics', 'Warehouse workflows, ergonomics, usability testing'],
  ['Software Products', 'Full-stack applications, architecture, product strategy'],
]

function ExperienceList({ items, className = '' }) {
  return (
    <dl className={`experience-list ${className}`}>
      {items.map(([title, detail]) => (
        <div className="experience-list__row" key={title}>
          <dt>{title}</dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function SkillCard({ Icon, title, text }) {
  return (
    <article className="skill-card">
      <span className="skill-card__icon">
        <Icon />
      </span>
      <h3 className="skill-card__title">{title}</h3>
      <p className="skill-card__text">{text}</p>
    </article>
  )
}

// youtube-nocookie.com is the privacy-preserving host: it defers YouTube's
// tracking cookies until the visitor actually presses play. loading="lazy"
// keeps the third-party player off the critical path so it cannot slow the
// hero above it.
function IntroVideo() {
  if (!INTRO_VIDEO_ID) return null

  return (
    <section className="section container" aria-labelledby="video-heading">
      <div className="home-section__head">
        <p className="label">Introduction</p>
        <h2 id="video-heading">
          A brief hello,
          <br />
          <em>in my own words.</em>
        </h2>
      </div>
      <div className="home-video__frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${INTRO_VIDEO_ID}`}
          title="Omeed Kashef — personal introduction video"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      {/* Section 1 — Introduction */}
      <section className="home-intro" aria-labelledby="intro-heading">
        <div className="home-intro__media">
          <img
            src={heroImage}
            alt="A thriving sustainable city where green towers, solar panels, clean water and community life coexist with nature"
          />
          <div className="home-intro__scrim" />
        </div>

        <div className="home-intro__content container">
          <p className="eyebrow">Systems · Product · UX · Engineering</p>
          <h1 id="intro-heading" className="home-intro__name">
            Complex systems,
            <br />
            <em>built for people.</em>
          </h1>
          <p className="home-intro__lead">
            Forward-deployed systems engineer and product leader with deep experience in
            autonomous vehicles, medical devices, and defense, with a new focus on global health,
            social justice, and sustainable technology.
          </p>
        </div>
      </section>

      {/* Section 2 — Introduction video (renders only once an id is set) */}
      <IntroVideo />

      {/* Section 3 — Background and domain experience */}
      <section className="home-background" aria-labelledby="background-heading">
        <div className="home-background__grid container">
          <div className="home-background__story">
            <h2 id="background-heading">
              High-stakes scenarios,
              <br />
              <em>designed with control.</em>
            </h2>

            <div className="home-background__copy">
              <p>
                My background sits at the intersection of systems engineering, UX, software
                development, and product management. I’ve spent years in domains where the margin
                for error is effectively zero — autonomous vehicles, FDA-regulated medical
                devices, and defense systems.
              </p>
              <p>
                That experience shaped how I think about complexity: requirements traceability,
                failure mode analysis, and human factors in high-cognitive-load environments. I’m now
                applying that rigor to automotive, robotics, and software products where clear
                requirements and thoughtful interaction design materially improve outcomes.
              </p>
              <p>
                I believe technology and the natural world don’t have to be in conflict. The most
                durable systems are the ones that work with nature’s logic, not against it.
              </p>
            </div>

            <div className="home-background__expertise">
              <p className="label">Expertise</p>
              <ExperienceList items={EXPERTISE} className="experience-list--stacked" />
            </div>
          </div>

          <div className="home-background__domains">
            <figure className="home-background__image">
              <img
                src={highStakesSystemsImage}
                alt="A systems engineer monitoring autonomous vehicle validation from a controlled operations room"
              />
            </figure>
            <div>
              <p className="label">Domain experience</p>
              <ExperienceList items={DOMAIN_EXPERIENCE} />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="rule" />
      </div>

      {/* Section 4 — Technical skills */}
      <section className="section container" aria-labelledby="technical-heading">
        <div className="home-section__head">
          <p className="label">Technical expertise</p>
          <h2 id="technical-heading">
            From architecture
            <br />
            <em>to implementation.</em>
          </h2>
        </div>
        <div className="card-grid">
          {TECHNICAL_SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      {/* Band image — breaks the rhythm so the two skill groups read separately */}
      <div className="home-band">
        <img
          src={collaborationImage}
          alt="A sunlit workspace open to a forest canopy, where three people collaborate around a large screen showing system diagrams"
        />
      </div>

      {/* Section 5 — Soft skills */}
      <section className="section container" aria-labelledby="soft-heading">
        <div className="home-section__head">
          <p className="label">Collaborative practice</p>
          <h2 id="soft-heading">
            Building alignment,
            <br />
            <em>leading with empathy.</em>
          </h2>
        </div>
        <div className="card-grid">
          {SOFT_SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
