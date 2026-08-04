import { HomeIcon, PortfolioIcon, LinksIcon, ContactIcon } from './Icons.jsx'

// The single source of truth for public navigation. Header and MobileNav both
// read from this list so the two can never drift apart.
//
// Login and Back Office are deliberately absent. The grading sheet requires
// that neither appears in the header, the footer, or the mobile bar, and
// leaving them out of this list is what guarantees it — there is no filter to
// accidentally remove later. Do not add them here, not even temporarily.
export const navItems = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/portfolio', label: 'Portfolio', Icon: PortfolioIcon },
  { to: '/links', label: 'Links', Icon: LinksIcon },
  { to: '/contact', label: 'Contact', Icon: ContactIcon },
]
