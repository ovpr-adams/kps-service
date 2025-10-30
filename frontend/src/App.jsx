import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import References from './pages/References'
import Quote from './pages/Quote'
import Contact from './pages/Contact'
import ServiceAreas from './pages/ServiceAreas'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminPageEditor from './admin/AdminPageEditor'
import AdminHeroEditor from './admin/AdminHeroEditor'
import AdminEngagementsEditor from './admin/AdminEngagementsEditor'
import AdminAboutEditor from './admin/AdminAboutEditor'
import AdminServicesEditor from './admin/AdminServicesEditor'
import AdminSettingsEditor from './admin/AdminSettingsEditor'
import AdminStatsEditor from './admin/AdminStatsEditor'
import AdminLayout from './admin/AdminLayout'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Scroll en haut à chaque changement de route
    window.scrollTo(0, 0)
  }, [])

  return (
    <Router basename="/kps-service">
      <div className="min-h-screen bg-white flex flex-col font-sans antialiased">
        <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          <a href="#main-content" className="block underline hover:no-underline">Aller au contenu principal</a>
          <a href="#footer" className="block underline hover:no-underline">Aller au pied de page</a>
        </div>

        <Header />

        <main id="main-content" role="main" className="flex-grow" tabIndex={-1}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/references" element={<References />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/zones" element={<ServiceAreas />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Route de connexion admin (publique) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Routes admin protégées avec layout */}
            <Route path="/admin/*" element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="pages" element={<AdminPageEditor />} />
                    <Route path="hero" element={<AdminHeroEditor />} />
                    <Route path="engagements" element={<AdminEngagementsEditor />} />
                    <Route path="about" element={<AdminAboutEditor />} />
                    <Route path="services" element={<AdminServicesEditor />} />
                    <Route path="settings" element={<AdminSettingsEditor />} />
                    <Route path="stats" element={<AdminStatsEditor />} />
                    <Route path="*" element={<AdminDashboard />} />
                  </Routes>
                </AdminLayout>
              </AdminProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App