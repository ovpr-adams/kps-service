import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Phone, Mail } from 'lucide-react'
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
      name: 'Paris',
      position: [48.8566, 2.3522],
      description: 'Siège social et zone principale',
      color: '#10B981',
      features: ['Nettoyage de bureaux', 'Nettoyage industriel', 'Nettoyage de chantier']
    },
    {
      name: 'Nantes',
      position: [47.2184, -1.5536],
      description: 'Zone de service Ouest',
      color: '#3B82F6',
      features: ['Nettoyage commercial', 'Nettoyage résidentiel', 'Nettoyage post-travaux']
    },
    {
      name: 'Rouen',
      position: [49.4432, 1.0993],
      description: 'Zone de service Normandie',
      color: '#F59E0B',
      features: ['Nettoyage de vitres', 'Nettoyage de moquettes', 'Nettoyage spécialisé']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Zones de Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              KPS Services intervient dans toute la France avec des équipes locales 
              et une expertise reconnue dans le nettoyage professionnel.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isLoading && settings?.serviceAreas?.map((area, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Carte Interactive
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos zones d'intervention et nos points de service
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DynamicMap 
              height="600px" 
              showMultipleLocations={true}
              className="shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Service Areas Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Détails par Zone
            </h2>
            <p className="text-lg text-gray-600">
              Chaque zone dispose d'équipes spécialisées et d'équipements adaptés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: area.color }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                    <p className="text-gray-600 text-sm">{area.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Services disponibles :</h4>
                  <ul className="space-y-2">
                    {area.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Disponible 7j/7</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Besoin d'un devis pour votre zone ?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Contactez-nous pour une intervention dans votre région
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Demander un devis
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Nous contacter
              </a>
            </div>

            {settings && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-green-100">
                {settings.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <a href={`tel:${settings.phone}`} className="hover:text-white">
                      {settings.phone}
                    </a>
                  </div>
                )}
                {settings.publicEmails?.[0] && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href={`mailto:${settings.publicEmails[0]}`} className="hover:text-white">
                      {settings.publicEmails[0]}
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceAreas
