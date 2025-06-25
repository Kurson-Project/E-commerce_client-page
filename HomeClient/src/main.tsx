import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProductProvider } from './context/CartProductProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey='vite-ui-theme'>
        <AuthProvider>
          <CartProductProvider>
            <App />
          </CartProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
)
