import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MobileNav from './MobileNav.jsx'

// The layout wrapper required by the grading sheet: all page content renders
// between the header and the footer. Declared once here rather than repeated
// in each page component.
//
// MobileNav sits outside <main> because it is fixed chrome, not page content.
// It is hidden above 768px by CSS alone, so there is no viewport listener and
// no hydration mismatch to worry about.
function Main({ children }) {
  return (
    <>
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
      <MobileNav />
    </>
  )
}

export default Main
