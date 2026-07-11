import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PersonPage from './PersonPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonPage />
  </StrictMode>,
)
