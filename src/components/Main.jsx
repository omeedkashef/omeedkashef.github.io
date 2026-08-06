import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MobileNav from './MobileNav.jsx'
import { useSecretRoute } from './useSecretRoute.js'

// The layout wrapper required by the grading sheet: all page content renders
// between the header and the footer. Declared once here rather than repeated
// in each page component.
//
// MobileNav sits outside <main> because it is fixed chrome, not page content.
// It is hidden above 768px by CSS alone, so there is no viewport listener and
// no hydration mismatch to worry about.
function Main({ children }) {
  // Mounted here so the secret Login shortcut works from any page. This is the
  // only place the Login feature touches shared chrome.
  useSecretRoute()

  return (
    <>
      <Header />
      <main id="app-main" className="app-main" tabIndex="-1">{children}</main>
      <Footer />
      <MobileNav />
    </>
  )
}

export default Main
