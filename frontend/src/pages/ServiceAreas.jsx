import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Navigation, Clock, Phone, Mail, ArrowRight, Globe, Shield } from 'lucide-react'
import DynamicMap from '../components/DynamicMap'
import { useState, useEffect } from 'react'
import { API_URLS, getPublicHeaders } from '../config/api'

const ServiceAreas = () => {
  const [settings, setSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch(API_URLS.SETTINGS, {
        headers: getPublicHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data.data || data)
      }
    } catch (error) {
      console.error('Erreur de chargement des paramètres:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const serviceAreas = [
    {
      name: 'Paris & Île-de-France',
      position: [48.8566, 2.3522],
      description: 'Siège Social - Hub Principal',
      color: '#FFD700', // Gold KPS
      isPrimary: true,
      features: ['Nettoyage Industriel', 'Bureaux Premium', 'Intervention H24']
    },
    {
      name: 'Grand Ouest (Nantes)',
      position: [47.2184, -1.5536],
      description: 'Agence Régionale Ouest',
      color: '#16a34a', // Green KPS
      isPrimary: false,
      features: ['Industrie Agroalimentaire', 'Logistic', 'Maintenance']
    },
    {
      name: 'Normandie (Rouen)',
      position: [49.4432, 1.0993],
      description: 'Agence Régionale Nord',
      color: '#16a34a', // Green KPS
      isPrimary: false,
      features: ['Sites Seveso', 'Portuaire', 'Vire & Sols']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Hero Section Premium Dark */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background subtil */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-black/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl mb-6 border border-white/10">
              <Globe className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Zones d'<span className="text-yellow-400">Intervention</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              KPS Services déploie son expertise sur l'ensemble du territoire national.
              Une présence locale pour une réactivité optimale.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {!isLoading && settings?.serviceAreas?.map((area, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-green-900/50 border border-green-500/30 text-green-300 rounded-full text-sm font-medium backdrop-blur-md"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map & Cards Section */}
      <section className="relative py-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Carte Interactive (Prend 2 colonnes) */}
            <motion.div
              className="lg:col-span-2 h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DynamicMap
                height="100%"
                showMultipleLocations={true}
                className="z-0"
              />
              {/* Overlay gradient pointer events none */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            </motion.div>

            {/* Liste des Zones (Prend 1 colonne) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Nos Agences
                </h2>
                <p className="text-gray-400 text-sm">Sélectionnez une zone pour voir les détails</p>
              </div>

              {serviceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className={`group relative p-6 rounded-2xl transition-all duration-300 border backdrop-blur-md ${area.isPrimary
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-primary/30 shadow-[0_0_15px_rgba(255,215,0,0.1)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-lg font-bold ${area.isPrimary ? 'text-primary' : 'text-white'}`}>
                        {area.name}
                      </h3>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mt-1">
                        {area.description}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: area.color + '20', color: area.color }}
                    >
                      <Navigation className="w-5 h-5" />
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {area.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: area.color }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {area.isPrimary && (
                    <div className="absolute top-4 right-4 animate-pulse">
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="bg-green-900/40 p-6 rounded-2xl border border-green-500/20 text-center">
                <h4 className="text-white font-bold mb-2">Votre zone n'est pas listée ?</h4>
                <p className="text-green-200 text-sm mb-4">Nous intervenons sur demande partout en France pour les grands comptes.</p>
                <Link to="/contact" className="text-primary hover:text-white text-sm font-semibold flex items-center justify-center transition-colors">
                  Nous contacter <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à collaborer avec KPS Services ?
            </h2>
            <p className="text-xl text-green-100 mb-10">
              Nos équipes sont prêtes à intervenir dans votre région.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Demander un devis
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/30 bg-green-700/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-800 transition-all duration-300 backdrop-blur-sm"
              >
                Contacter le siège
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceAreas
