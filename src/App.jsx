import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Links from './pages/Links.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import BackOffice from './pages/BackOffice.jsx'
import './App.css'

// Login and BackOffice are intentionally absent from any navigation. They are
// reachable only by typing the URL (or, for Login, a secret keydown added by
// the Login feature).
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/links" element={<Links />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/backoffice" element={<BackOffice />} />
    </Routes>
  )
}

export default App
