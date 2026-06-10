import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
=======
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
>>>>>>> 1800e6af55e1c877a72e3e0b52621ae4d57c9875
  </StrictMode>,
)
