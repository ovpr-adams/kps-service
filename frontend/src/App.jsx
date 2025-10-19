import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import References from './pages/References'
import Quote from './pages/Quote'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Améliorer l'accessibilité en gérant le focus
    const handleRouteChange = () => {
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.focus()
      }
    }

    // Gestion du scroll vers le haut sur changement de route
    window.scrollTo(0, 0)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
        {/* Skip Links pour l'accessibilité */}
        <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          <a href="#main-content" className="block underline hover:no-underline">Aller au contenu principal</a>
          <a href="#footer" className="block underline hover:no-underline">Aller au pied de page</a>
        </div>

        <Header />

        <main id="main-content" role="main" className="flex-grow" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/references" element={<References />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
