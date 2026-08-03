import { Link, NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'
import logo from '../assets/logo.png'

// Fixed top bar, present on every route including the hidden ones.
// The horizontal link list is hidden at <=768px, where MobileNav takes over.
function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        {/* end forces an exact match so "/" is not marked active on every route */}
        <Link to="/" className="site-header__brand" aria-label="Omeed Kashef — go to Home">
          <img
            src={logo}
            alt="Omeed Kashef's personal logo: a stylised leaf enclosed in a circle"
            className="site-header__logo"
            width="32"
            height="32"
          />
          <span className="site-header__name">Omeed Kashef</span>
        </Link>

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
      </div>
    </header>
  )
}

export default Header
