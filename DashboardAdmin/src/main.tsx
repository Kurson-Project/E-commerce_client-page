import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
)
