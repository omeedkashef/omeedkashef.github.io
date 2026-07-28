import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// HashRouter, not BrowserRouter: GitHub Pages serves static files only, so a
// real path like /backoffice would 404 on refresh or a direct link. With the
// hash, the served path always stays '/'.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
