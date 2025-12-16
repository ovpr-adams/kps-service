import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Afficher la bannière après 1 seconde
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
    // Ici vous pouvez activer Google Analytics, etc.
    console.log('✅ Cookies acceptés')
  }

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused')
    setIsVisible(false)
    console.log('❌ Cookies refusés')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Barre décorative */}
              <div className="h-1 bg-gradient-to-r from-green-500 via-primary to-green-600"></div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icône */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl flex items-center justify-center">
                      <Cookie className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Gestion des cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic.
                      En cliquant sur "Tout accepter", vous acceptez l'utilisation de tous les cookies.
                      Consultez notre{' '}
                      <Link
                        to="/privacy"
                        className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium underline decoration-2 underline-offset-2"
                      >
                        Politique de Confidentialité
                      </Link>
                      {' '}pour plus d'informations.
                    </p>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={handleRefuse}
                      className="px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 whitespace-nowrap"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={handleAccept}
                      className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-green-500/50 whitespace-nowrap"
                    >
                      Tout accepter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent
