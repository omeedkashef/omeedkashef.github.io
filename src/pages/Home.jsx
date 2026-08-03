import {
  CodeIcon,
  StackIcon,
  ServerIcon,
  ApiIcon,
  ChartIcon,
  LeadershipIcon,
  CommunicationIcon,
  StakeholderIcon,
  EmpathyIcon,
} from '../components/Icons.jsx'
import heroImage from '../assets/hero.jpg'
import collaborationImage from '../assets/home-collaboration.jpg'

// Both images on this page were generated with DALL-E via ChatGPT. See the
// "AI-generated assets and tool attribution" table in ai/ai-spec.md.

// Skills come from the resolved content decisions in ai/ai-spec.md. The tech
// lists there are expanded into sentences here; no capability is claimed that
// the resume does not support.
const TECHNICAL_SKILLS = [
  {
    Icon: CodeIcon,
    title: 'JavaScript & Front-End',
    text: 'Building interfaces with HTML, CSS, JavaScript and React — including the component structure and routing behind this site.',
  },
  {
    Icon: StackIcon,
    title: 'MERN Stack',
    text: 'MongoDB, Express, React and Node used together to take a defined use case from data model through to a working interface.',
  },
  {
    Icon: ServerIcon,
    title: 'Java Back-End',
    text: 'Java with Spring Boot, JPA and SQL for server-side services and relational data access.',
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
]

const SOFT_SKILLS = [
  {
    Icon: LeadershipIcon,
    title: 'Leadership & Mentorship',
    text: 'Led a product development team of five through a Class II device 510(k) submission and an agile team of eight at Ford, and has trained and mentored designers in human factors and product development.',
  },
  {
    Icon: CommunicationIcon,
    title: 'Cross-Functional Communication',
    text: 'Streamlined communication across mechanical engineering, regulatory, human factors and business development by organising information architecture, defining roles and setting agendas.',
  },
  {
    Icon: StakeholderIcon,
    title: 'Stakeholder & Client Management',
    text: 'Managed OKRs, timelines, product backlogs and sprints with stakeholders from cradle to grave, and presented competitive analysis and product strategy to leadership.',
  },
  {
    Icon: EmpathyIcon,
    title: 'Design Thinking & Empathy',
    text: 'Persona development, user journey and empathy mapping, and qualitative research with more than 50 participants to ground decisions in real user needs.',
  },
]

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
            Omeed Kashef
          </h1>
          <p className="home-intro__role">Forward Deployed Engineer &amp; Product Leader</p>
          <p className="home-intro__lead">
            Systems engineer and product leader with deep experience in autonomous vehicles,
            medical devices and defense, with a new focus on global health, social justice and
            sustainable technology. I work where the margin for error is small — and I build the
            software, the requirements and the shared understanding that keeps it that way.
          </p>
        </div>
      </section>

      <div className="container">
        <hr className="rule" />
      </div>

      {/* Section 2 — Technical skills */}
      <section className="section container" aria-labelledby="technical-heading">
        <div className="home-section__head">
          <p className="label">Technical practice</p>
          <h2 id="technical-heading">
            Build with rigor.
            <br />
            <em>Design for reality.</em>
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

      {/* Section 3 — Soft skills */}
      <section className="section container" aria-labelledby="soft-heading">
        <div className="home-section__head">
          <p className="label">How I work</p>
          <h2 id="soft-heading">
            Human stakes,
            <br />
            <em>operational clarity.</em>
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
