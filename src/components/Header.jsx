import { Link, NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'
import ThemeToggle from './ThemeToggle.jsx'
import logo from '../assets/logo.png'

// Fixed top bar, present on every route including the hidden ones.
// The horizontal link list is hidden at <=768px, where MobileNav takes over.
function Header() {
  const skipToMain = () => {
    document.getElementById('app-main')?.focus()
  }

  return (
    <header className="site-header">
      <button type="button" className="skip-link" onClick={skipToMain}>
        Skip to main content
      </button>
      <div className="site-header__inner container">
        {/* end forces an exact match so "/" is not marked active on every route */}
        <div className="site-header__brand">
          <Link to="/" className="site-header__logo-link" aria-label="Go to Home">
            <img
              src={logo}
              alt="Omeed Kashef logo"
              className="site-header__logo"
              width="40"
              height="40"
            />
          </Link>
          <span className="site-header__name">Omeed Kashef</span>
        </div>

        {/* The toggle is a sibling of .site-nav, not a child: .site-nav is
            display:none below 768px, and a nested toggle would vanish there. */}
        <div className="site-header__actions">
          <nav className="site-nav" aria-label="Main navigation">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
