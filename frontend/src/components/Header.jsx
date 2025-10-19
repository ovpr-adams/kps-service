import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', path: '/', section: 'home' },
    { name: 'À propos', path: '/about', section: 'about' },
    { name: 'Services', path: '/services', section: 'services' },
    { name: 'Références', path: '/references', section: 'references' },
    { name: 'Contact', path: '/contact', section: 'contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top Bar - Informations de contact */}
      <div className="bg-gray-900 text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>contact@kps-services.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>Île-de-France</span>
              </div>
            </div>
            <div className="text-green-400 font-medium">
              Service client : Lun-Ven 8h-18h
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Accueil - KPS Services">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mr-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">KPS</span>
                <span className="text-sm font-semibold text-green-600 tracking-wider">SERVICES</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 group ${location.pathname === item.path ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full ${location.pathname === item.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/quote"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg" id="mobile-menu">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav className="flex flex-col space-y-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-4 px-4 text-base font-semibold transition-all duration-300 rounded-lg ${location.pathname === item.path ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  to="/quote"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Devis gratuit
                </Link>
              </div>
              <div className="pt-4 text-sm text-gray-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>contact@kps-services.fr</span>
                </div>
                <div className="text-green-600 font-medium">
                  Service client : Lun-Ven 8h-18h
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
