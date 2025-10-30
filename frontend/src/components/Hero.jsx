import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Sparkles, Phone, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { API_URLS, getPublicHeaders } from '../config/api'

const Hero = () => {
  const [heroData, setHeroData] = useState({
    mainTitle: "L'expertise du nettoyage professionnel au service de vos espaces",
    subtitle: "Nettoyage industriel, entretien de bureau et lavage de vitres sur mesure",
    foundedYear: 2002,
    teamSize: "+35 professionnels qualifiés",
    ctaText: "OBTENEZ UN DEVIS GRATUIT",
    ctaLink: "/quote",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    quoteTitle: "ET SI LA PUISSANCE D'UN FILM REMPLAÇAIT LA LONGUEUR D'UN DISCOURS ?",
    showQuote: true,
    services: []
  })

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const response = await fetch(API_URLS.HERO, {
          headers: getPublicHeaders()
        })
        const data = await response.json()
        if (response.ok && data.data) {
          setHeroData(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données Hero:', error)
      }
    }
    loadHeroData()
  }, [])

  const getIconComponent = (iconName) => {
    const icons = {
      Building2,
      Sparkles,
      Phone,
      Mail
    }
    return icons[iconName] || Building2
  }
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${heroData.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              id="hero-heading"
            >
              {heroData.mainTitle}
            </h1>

            <p className="text-lg md:text-xl mb-4 text-gray-200 leading-relaxed max-w-2xl">
              {heroData.subtitle}
            </p>
            <p className="text-base mb-8 text-yellow-300 font-semibold">
              Fondé en {heroData.foundedYear} • {heroData.teamSize}
            </p>

            {/* CTA Button */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                to={heroData.ctaLink}
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                aria-label="Obtenir un devis gratuit"
              >
                {heroData.ctaText}
              </Link>
            </motion.div>

            {/* Service Icons */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heroData.services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon)
                return (
                  <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-opacity-20 transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${service.color} mx-auto mb-3`} />
                    <p className="text-white text-sm font-medium">{service.title}</p>
                    <p className="text-gray-300 text-xs mt-1">{service.subtitle}</p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Video/Image placeholder */}
          {heroData.showQuote && (
            <motion.div
              className="lg:flex justify-end hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Decorative quote */}
                <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-8 max-w-lg">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {heroData.quoteTitle}
                  </h3>
                
                {/* Video preview mockup */}
                <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-24 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
                    <div className="w-32 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <button className="text-white text-sm hover:text-yellow-400">
                      Copier le lien
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
