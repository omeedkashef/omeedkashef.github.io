import educationImage from '../assets/portfolio-education.jpg'
import projectsImage from '../assets/portfolio-projects.jpg'
import vehicleInterface from '../assets/card-vehicle.jpg'
import needleTracking from '../assets/card-surgical.jpg'
import apheresisSafety from '../assets/card-apheresis.jpg'
import swarmControl from '../assets/card-swarm.jpg'
import driverOnboarding from '../assets/card-onboarding.jpg'
import packagingDistribution from '../assets/card-packaging.jpg'
import onboardingStoryboardImage from '../assets/onboarding-storyboard-image-only.png'
import onboardingProcessImage from '../assets/onboarding-process-image-only.png'
import vehicleAwarenessImage from '../assets/vehicle-awareness-image-only.png'
import vehicleStudyImage from '../assets/vehicle-study-image-only.png'
import packagingFlowImage from '../assets/packaging-flow.jpg'
import packagingResearchImage from '../assets/packaging-research.jpg'
import apheresisHtaImage from '../assets/apheresis-hta-image-only.png'
import apheresisUfmeaImage from '../assets/apheresis-ufmea-image-only.png'
import surgicalNeedleImage from '../assets/surgical-needle-image-only.png'
import surgicalProcessImage from '../assets/surgical-process-image-only.png'
import swarmSystemsImage from '../assets/swarm-systems-map.jpg'
import swarmOperationsImage from '../assets/swarm-operations.jpg'
import { Link } from 'react-router-dom'

// The two full-width section dividers retain the established site artwork.
// Project thumbnails use purpose-made artwork. Detail galleries combine original
// project-specific source slides from Omeed Kashef Portfolio.pdf.

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

// The projects are the student's own — six carried from the portfolio deck
// (preliminary-docs/Portfolio). Challenges,
// methods and results are that deck's wording; every metric also appears in the
// resume or LinkedIn export. Ordered most recent first, dates not displayed.
// Shared with ProjectDetail; keeping the case-study content beside its cards
// makes each summary and detail page straightforward to update together.
// oxlint-disable-next-line react/only-export-components
export const PROJECTS = [
  {
    slug: 'swarm-control',
    title: 'Swarm Control',
    domain: 'Defense',
    tags: ['Scenario Development', 'Card Sorting', 'Requirements'],
    text: 'Complex environments raise operator workload during the replanning and monitoring of cross-domain drones, where hundreds of variables are weighed in very short amounts of time. Scenario development and a card sorting study extracted prioritized metrics and their relative weights, turning subjective mission tradeoffs into front-end and back-end requirements that reduce information complexity — and an interface that cut task time and theoretical workload by 40%.',
    img: swarmControl,
    alt: 'Operator coordinating aerial and ground unmanned systems',
    gallery: [
      { src: swarmSystemsImage, alt: 'Connected aerial and ground unmanned systems with mission metrics', caption: 'Cross-domain mission system and prioritized operating signals.' },
      { src: swarmOperationsImage, alt: 'Operator monitoring coordinated unmanned systems across several displays', caption: 'Operational context for rapid replanning and monitoring.' },
    ],
    challenge: 'Operators replanning and monitoring cross-domain drones must evaluate hundreds of variables quickly without losing sight of mission priorities.',
    approach: 'Scenario development and card sorting captured the metrics operators value, their relative priority, and the tradeoffs that needed to be represented in both interface and system requirements.',
    outcome: 'The resulting interface reduced information complexity, cutting task time and theoretical workload by 40%.',
    evidence: [
      {
        label: 'Research design',
        title: 'Making subjective priorities comparable',
        text: 'Scenario development established realistic replanning conditions, while a card-sorting study captured the metrics operators considered and the relative weight of each one across diverse, changing missions.',
      },
      {
        label: 'Systems translation',
        title: 'From operator judgment to requirements',
        text: 'User engagement connected mission priorities and tradeoffs to interface and algorithm development, giving front-end and back-end teams a prioritized set of requirements rather than an unstructured list of variables.',
      },
      {
        label: 'Design implication',
        title: 'Reduce complexity without hiding context',
        text: 'Pattern analysis revealed how metric priorities shift by scenario. The resulting design direction reduced information complexity while preserving the context operators need to replan and monitor cross-domain vehicles.',
      },
    ],
  },
  {
    slug: 'surgical-needle-tracking',
    title: 'Surgical Needle Tracking',
    domain: 'Medical Device',
    tags: ['Risk Mitigation', 'uFMEA', 'FDA 510(k)'],
    text: 'Roughly 1,500 surgical items are unintentionally left inside patients each year in the U.S. Ethnographic research, task decomposition and SME interviews fed a use failure mode and effects analysis that identified 17 critical use steps, producing a finalized system design and an HFE validation plan whose acceptance criteria trace back to the uFMEA. Led a product development team of five through 510(k) submission of the Class II device.',
    img: needleTracking,
    alt: 'Medical-device safety workflow for tracking surgical instruments',
    gallery: [
      {
        src: surgicalNeedleImage,
        alt: 'Suture needle and thread held by a surgical instrument',
        caption: 'Design question',
      },
      {
        src: surgicalProcessImage,
        alt: 'Operating-room research, counting records, needle trays, and the surgical tracking device concept',
        caption: 'Process, challenges, and results',
      },
    ],
    challenge: 'A surgical tracking system needed to reduce the risk of retained items while satisfying the usability-engineering evidence expected for a Class II medical device.',
    approach: 'Ethnographic research, task decomposition, and subject-matter-expert interviews informed a use failure mode and effects analysis and a traceable human-factors validation plan.',
    outcome: 'The work identified 17 critical use steps, finalized the system design, and supported a five-person product team through 510(k) submission.',
    evidence: [
      {
        label: 'Field research',
        title: 'Following the real counting workflow',
        text: 'Ethnographic research, task decomposition, workflow development, and subject-matter-expert interviews documented how needles move through the operating room and where counting failures can occur.',
      },
      {
        label: 'Risk analysis',
        title: 'Seventeen critical use steps',
        text: 'The use failure mode and effects analysis connected critical steps to hazards and mitigations while balancing product effectiveness, user acceptance, and the needs of a client new to human factors engineering.',
      },
      {
        label: 'Validation strategy',
        title: 'Acceptance criteria trace back to risk',
        text: 'The work finalized a system design that significantly mitigates retained-item risk and produced a human-factors validation plan whose acceptance criteria trace directly to the uFMEA.',
      },
    ],
  },
  {
    slug: 'packaging-distribution',
    title: 'Packaging & Distribution',
    domain: 'Robotics',
    tags: ['Ethnography', 'Contextual Inquiry', 'A/B Testing'],
    text: 'Warehouse operators face rising workload, ergonomic issues and shipping errors. Ethnography and contextual inquiry mapped the jobs to be done and the granular workflow; an A/B study of workstation orientation reduced steps and twisting motion, decreased the time to retrieve and place packages, raised SUS scores, and identified three critical safety issues.',
    img: packagingDistribution,
    alt: 'Ergonomic warehouse packaging workstation with robotic material handling',
    gallery: [
      { src: packagingFlowImage, alt: 'Comparison of inefficient and ergonomically improved packaging workflows', caption: 'Workstation orientation compared through movement and reach.' },
      { src: packagingResearchImage, alt: 'Researcher observing an operator at a warehouse packaging station', caption: 'Ethnographic research and contextual inquiry in the warehouse.' },
    ],
    challenge: 'Warehouse teams were contending with unnecessary walking, twisting, workload, and shipping errors in a high-volume packaging process.',
    approach: 'Ethnography and contextual inquiry mapped the detailed workflow and jobs to be done. An A/B study then compared workstation orientations using task time, movement, safety, and usability measures.',
    outcome: 'The preferred layout reduced steps, twisting, and package handling time, improved System Usability Scale scores, and revealed three critical safety issues.',
    evidence: [
      {
        label: 'Contextual research',
        title: 'Map the work before changing the station',
        text: 'Ethnographic research and contextual inquiry captured warehouse jobs to be done and the granular workflow, including travel, retrieval, placement, reach, and twisting behavior.',
      },
      {
        label: 'Comparative study',
        title: 'Test workstation orientation',
        text: 'An A/B study compared workstation orientations using ergonomics, user experience, and task-performance measures while coordinating equipment, participants, engineers, and operational stakeholders.',
      },
      {
        label: 'Measured result',
        title: 'Safer movement and faster handling',
        text: 'The revised orientation reduced steps and twisting, shortened package retrieval and placement time, increased System Usability Scale scores, and surfaced three critical safety issues.',
      },
    ],
  },
  {
    slug: 'driver-onboarding',
    title: 'Driver Onboarding',
    domain: 'Automotive',
    tags: ['Prototyping', 'Cognitive Walkthrough', 'User Testing'],
    text: "Updates to automated vehicles increase complexity and driver confusion, so how do you introduce system changes to drivers? Competitive benchmarking, user stories and cognitive walkthroughs shaped low- and mid-fidelity prototypes of Ford's in-vehicle onboarding experience, prioritized around safety, accessible learning options, transparent notifications without interruption, and centralized control. Testing with more than 60 participants across three user groups returned a 95% user acceptance rate — planned entirely remotely, on limited resources, during the pandemic.",
    img: driverOnboarding,
    alt: 'Driver learning an updated automated-driving feature while safely parked',
    gallery: [
      { src: onboardingStoryboardImage, alt: 'Hand-drawn storyboard for learning a vehicle update', caption: 'Early storyboard exploring when and where drivers learn about changes.' },
      { src: onboardingProcessImage, alt: 'Update journey, center-console prototype, and in-car evaluation', caption: 'Journey modeling, interface prototyping, and remote evaluation.' },
    ],
    challenge: 'Drivers needed a safe, understandable way to learn new automated-vehicle capabilities without distracting or interrupting them at the wrong moment.',
    approach: 'Competitive benchmarking, user stories, and cognitive walkthroughs shaped low- and mid-fidelity concepts focused on accessible learning, transparent notifications, and centralized control.',
    outcome: 'Remote testing with more than 60 people across three user groups produced a 95% user-acceptance rate for Ford’s prototype in-vehicle onboarding experience.',
    evidence: [
      {
        label: 'Study design',
        title: 'From mental models to testable concepts',
        text: 'Competitive benchmarking and team ideation led into UML activity diagrams, user stories, and cognitive walkthroughs. Low-fidelity concepts were refined into two mid-fidelity experiences: a stationary center-console lesson and an in-motion, audio-guided lesson evaluated in a within-subjects study.',
      },
      {
        label: 'Research constraints',
        title: 'Working beyond an early assumption',
        text: 'The original scope assumed onboarding belonged entirely inside the vehicle, while pandemic restrictions limited direct customer contact. Think-aloud interviews and open-ended prompts challenged that premise and showed that learning spans more of the customer journey.',
      },
      {
        label: 'What the team learned',
        title: 'Choice, timing, and control matter',
        text: 'Participants wanted multiple learning options, a safe-feeling experience, transparent notifications without interruption, and centralized control. The findings opened collaboration with other UX teams, informed feature prioritization, and supported approval of the next research phase.',
      },
    ],
  },
  {
    slug: 'apheresis-device-safety',
    title: 'Apheresis Device Safety',
    domain: 'Medical Device',
    tags: ['Hierarchical Task Analysis', 'uFMEA', 'Traceability'],
    text: 'A human-factors and risk analysis of a legacy Class II apheresis device, focused on the physical and cognitive work required to set up a disposable set, perform venipuncture, process blood, and safely return blood cells to the patient.',
    img: apheresisSafety,
    alt: 'Clinician loading a disposable tubing set into an apheresis blood-processing device',
    gallery: [
      { src: apheresisHtaImage, alt: 'Hierarchical task analysis with critical use steps outlined', caption: 'Task decomposition used to locate critical use steps.' },
      { src: apheresisUfmeaImage, alt: 'Risk-analysis matrix linking failures, controls, and evidence', caption: 'uFMEA structure connecting use errors to controls and verification.' },
    ],
    challenge: 'Critical use errors can seriously harm a patient or operator. Because this legacy device predated newer FDA usability practices, its improving design needed a retroactive analysis connecting use steps, possible failures, risk controls, and verification evidence.',
    approach: 'Subject-matter-expert interviews and a hierarchical task analysis decomposed user goals, tasks, and touchpoints. Customer complaints, change orders, service records, verification cases, and input from marketing and test engineering supplemented limited access to end users. The resulting task model became the input to a use failure mode and effects analysis.',
    outcome: 'The work documented potential use errors, hazards, harms, severity, frequency, and existing controls; supported updates to outdated manuals; and exposed gaps between some mitigations and their verification tests. Recommendations included unique identifiers, bidirectional traceability, earlier formative and summative evaluation, and a centralized traceability matrix.',
    evidence: [
      {
        label: 'Research recovery',
        title: 'Reconstructing the user’s mental model',
        text: 'When direct end-user access was constrained, product-lifecycle records supplied the history and rationale behind product changes and reported use errors. Marketing specialists clarified cognitive tasks, while verification engineers supplied detail about physical tasks.',
      },
      {
        label: 'Risk analysis',
        title: 'Connecting use steps to controls',
        text: 'The uFMEA linked each decomposed use step to possible errors, hazards, hazardous situations, harms, severity, frequency, and design mitigations. Reviewing the chain in both directions helped reveal undocumented assumptions and missing verification links.',
      },
      {
        label: 'Recommendation',
        title: 'Make traceability continuous',
        text: 'A scalable ID system and centralized, bidirectional matrix would let teams follow source requirements into lower-level requirements and tests, then back again. Earlier user research and ongoing cross-functional review would reduce retrofit risk, rework, and avoidable cost.',
      },
    ],
  },
  {
    slug: 'vehicle-interface',
    title: 'Vehicle Interface',
    domain: 'Autonomous Vehicles',
    tags: ['A/B Testing', 'Driver Monitoring', 'R'],
    text: 'Drivers in automated vehicles are not ready when automation fails, so the question was whether gaze behaviour could be used to maintain situational awareness. Adaptive warning algorithms were tested in a Level 3 highway simulation against transfer-of-control, automation-failure and freeze-probe events, with a 3-D virtual driving environment built for the study. Gaze transitions and takeover response times analysed in R showed a 22% increase in situational awareness and a 28% decrease in reaction time.',
    img: vehicleInterface,
    alt: 'Automated-driving simulator with gaze-based driver monitoring',
    gallery: [
      { src: vehicleAwarenessImage, alt: 'Situational-awareness feedback model from environment to driver behavior', caption: 'Gaze behavior modeled within a continuous awareness and decision loop.' },
      { src: vehicleStudyImage, alt: 'Highway simulation, participant driving, and camera-based gaze monitoring', caption: 'Level 3 simulation and driver-monitoring study setup.' },
    ],
    challenge: 'Drivers using Level 3 automation may not be situationally prepared when the vehicle unexpectedly returns control.',
    approach: 'Adaptive gaze-based warnings were evaluated in a custom 3-D highway simulation using transfer-of-control, automation-failure, and freeze-probe events. Gaze transitions and takeover responses were analyzed in R.',
    outcome: 'The gaze-based adaptive warnings increased situational awareness by 22%, increased on-road gaze behavior, and reduced reaction time by 28% in the study.',
    evidence: [
      {
        label: 'Study design',
        title: 'Three warning conditions',
        text: 'Twenty-four participants, balanced by sex and ranging from ages 21 to 45, drove a high-fidelity full-motion Level 3 highway simulation. A control condition was compared with gaze-based attention-maintenance alerts and state-contingent alerts tied to both gaze and vehicle limitations.',
      },
      {
        label: 'Measures',
        title: 'Awareness, gaze, and takeover performance',
        text: 'Eight counterbalanced freeze-probe and takeover events measured vehicle-location recall, gaze within the field relevant for driving, hand-on-wheel and steering response time, lane behavior, and comfort. A secondary trivia task with a monetary incentive restored workload after traffic-density limits reduced scenario complexity.',
      },
      {
        label: 'Design implication',
        title: 'Performance improved, comfort did not',
        text: 'Gaze-based alerts improved situational awareness and takeover performance, but alerted groups reported lower comfort than the baseline group. The result points to a transparency and trust problem: future interfaces should explain their behavior and tune alert timing without sacrificing attention support.',
      },
    ],
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
      <section id="selected-projects" className="section container" aria-labelledby="projects-heading">
        <p className="label">Selected projects</p>
        <h2 id="projects-heading" className="portfolio-section__title">
          Evidence in the work
        </h2>
        <div className="card-grid">
          {PROJECTS.map((project) => (
            <Link key={project.title} className="project-card" to={`/portfolio/projects/${project.slug}`}>
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
                <span className="project-card__cta">Read case study <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Portfolio
