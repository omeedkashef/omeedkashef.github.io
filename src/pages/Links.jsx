import linkedinImage from '../assets/link-linkedin.jpg'
import githubImage from '../assets/link-github.jpg'
import courseraImage from '../assets/link-coursera.jpg'
import figmaImage from '../assets/link-figma.jpg'

// All four thumbnails were generated with DALL-E via ChatGPT. See the
// "AI-generated assets and tool attribution" table in ai/ai-spec.md.

// Content is the resolved Links list from ai/ai-spec.md, taken verbatim.
const LINKS = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/omeedkashef',
    text: 'Professional profile covering a decade of product, UX, and systems engineering work across autonomous vehicles, medical devices, and defense. The best place to see the full career history and to get in touch about roles.',
    img: linkedinImage,
    alt: 'A network of softly glowing connection points spreading through a forest canopy at dusk',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/FL11024OmeedK',
    text: 'Source code for every project built during the Codeboxx AI Native Full Stack Developer program, including this portfolio. Shows commit history, branching workflow, and how the applications are actually put together.',
    img: githubImage,
    alt: 'Layered translucent panels branching and merging like a version history, set among green leaves',
  },
  {
    title: 'Coursera Profile',
    url: 'https://www.coursera.org/learner/omeedkashef',
    text: 'Verified certifications, including the Google UX Design Professional Certificate. Documents the formal design training behind the human-factors side of my work.',
    img: courseraImage,
    alt: 'An open book whose pages dissolve into points of light rising through a forest clearing',
  },
  {
    title: 'Portfolio Design File',
    url: 'https://www.figma.com/make/YBYiqbFMh7f60b3tFPcSHt/Portfolio-website-design',
    text: 'The Figma design file this site was prototyped from. Included to show the process — design system, tokens, and layout decisions — before any code was written.',
    img: figmaImage,
    alt: 'Overlapping translucent design artboards and colour swatches arranged on a mossy stone surface',
  },
]

// Shown on each card so a visitor can see where a link goes before clicking.
function hostOf(url) {
  return new URL(url).hostname.replace(/^www\./, '')
}

function Links() {
  return (
    <>
      <section className="section container" aria-labelledby="links-heading">
        <p className="eyebrow">Elsewhere</p>
        <h1 id="links-heading">
          Useful context,
          <br />
          <em>in one place.</em>
        </h1>
        <p className="lead links-intro">
          A few ways to explore the work independently — the full career history, the source code
          behind it, the certifications, and the design file this site grew out of.
        </p>
      </section>

      <section className="section container links-section" aria-label="External links">
        <div className="card-grid">
          {LINKS.map((link) => (
            // The whole card is the anchor, so the visible target and the click
            // target are the same shape. rel="noreferrer" keeps the opened page
            // from reaching back through window.opener.
            <a
              key={link.url}
              className="link-card"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="media media--zoom">
                <img src={link.img} alt={link.alt} />
              </div>
              <div className="link-card__body">
                <h2 className="link-card__title">
                  {link.title}
                  <span className="link-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </h2>
                <p className="link-card__text">{link.text}</p>
                <span className="link-card__host">{hostOf(link.url)}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default Links
