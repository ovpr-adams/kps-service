import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, MapPin } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: Users,
      number: '500+',
      label: 'Clients satisfaits',
      description: 'Entreprises qui nous font confiance',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Award,
      number: '15+',
      label: 'Années d\'expérience',
      description: 'D\'excellence dans le nettoyage professionnel',
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 3,
      icon: TrendingUp,
      number: '98%',
      label: 'Taux de satisfaction',
      description: 'Clients recommandent nos services',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      icon: MapPin,
      number: '24/7',
      label: 'Service d\'urgence',
      description: 'Interventions rapides quand vous en avez besoin',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full opacity-20 -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full opacity-20 translate-x-48 translate-y-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Chiffres Clés
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Découvrez pourquoi KPS Services est le partenaire de confiance de centaines d'entreprises
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-primary-200">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-primary-100">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Rejoignez nos 500+ clients satisfaits
            </h3>
            <p className="text-secondary-600 mb-6">
              Découvrez pourquoi les entreprises nous choisissent pour leurs besoins de nettoyage professionnel.
              Qualité garantie, service personnalisé et résultats exceptionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Demander un devis
              </button>
              <button className="border-2 border-secondary-300 text-secondary-700 px-8 py-3 rounded-xl font-semibold hover:bg-secondary-50 transition-all duration-300 hover:scale-105">
                En savoir plus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
