import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './components/Layout.css'
import App from './App.jsx'
import { iniciarDatos } from './lib/almacen.js'

// Carga los datos de prueba la primera vez que se abre la plataforma
iniciarDatos()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
