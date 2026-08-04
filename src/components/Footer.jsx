// Footer, present on every route. Carries the contact information and
// copyright notice the grading sheet requires.
//
// Links here point outward only — no internal navigation, so Login and Back
// Office stay out of every navigation surface.
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
          <a href="mailto:omeedkashef@gmail.com">omeedkashef@gmail.com</a>
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
