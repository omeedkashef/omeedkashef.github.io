import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

// Footer, present on every route. Carries the social links and
// copyright notice the grading sheet requires.
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="site-footer__identity">
          <p className="site-footer__name">Omeed Kashef</p>
          <p className="site-footer__tagline">Systems · Product · UX · Engineering</p>
        </div>

        <div className="site-footer__contact">
          <Link to="/" className="site-footer__logo-link" aria-label="Go to Home">
            <img
              src={logo}
              alt="Omeed Kashef logo"
              className="site-footer__logo"
              width="40"
              height="40"
            />
          </Link>
          <a
            href="https://www.linkedin.com/in/omeedkashef"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/FL11024OmeedK"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>

        <p className="site-footer__copyright">© {year} Omeed Kashef</p>
      </div>
    </footer>
  )
}

export default Footer
