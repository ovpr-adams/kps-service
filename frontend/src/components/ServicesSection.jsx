import { motion } from 'framer-motion'
import { Building2, Sparkles, Home, CheckCircle } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: Building2,
      title: 'Nettoyage industriel',
      subtitle: 'Solutions complètes pour espaces industriels',
      description: 'Notre service de nettoyage industriel comprend le nettoyage en profondeur des sols, machines, équipements et infrastructures industrielles avec des techniques spécialisées.',
      features: [
        'Nettoyage haute pression',
        'Dégraissage industriel',
        'Nettoyage des sols époxy',
        'Maintenance préventive'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:border-blue-200'
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'Lavage de vitres',
      subtitle: 'Expertise en travail en hauteur',
      description: 'Service professionnel de lavage de vitres pour tous types de bâtiments, avec équipement de sécurité certifié et techniques respectueuses de l\'environnement.',
      features: [
        'Lavage traditionnel manuel',
        'Système de purification d\'eau',
        'Travail en hauteur sécurisé',
        'Nettoyage de façades'
      ],
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      hoverColor: 'hover:border-primary-200'
    },
    {
      id: 3,
      icon: Home,
      title: 'Entretien bureaux',
      subtitle: 'Environnements de travail impeccables',
      description: 'Maintenance complète et régulière des espaces de bureaux pour garantir un environnement de travail sain et professionnel.',
      features: [
        'Nettoyage quotidien',
        'Désinfection des surfaces',
        'Vidage des corbeilles',
        'Entretien des sols'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:border-green-200'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="services-heading">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-200 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            role="status"
            aria-live="polite"
          >
            ✨ Services Professionnels
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4" id="services-heading">
            Nos Services d'Excellence
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services de nettoyage adaptés à vos besoins spécifiques
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          role="region"
          aria-label="Liste des services de nettoyage"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className={`group relative ${service.bgColor} ${service.hoverColor} border-2 border-transparent rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 cursor-pointer`}
                role="article"
                aria-labelledby={`service-${service.id}-title`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    // Ici on pourrait ouvrir un modal ou naviguer vers une page détaillée
                  }
                }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} aria-hidden="true"></div>

                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}
                  whileHover={{ rotate: 5 }}
                  aria-hidden="true"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300" id={`service-${service.id}-title`}>
                    {service.title}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-4 text-sm" aria-describedby={`service-${service.id}-description`}>
                    {service.subtitle}
                  </p>
                  <p className="text-secondary-600 mb-6 leading-relaxed" id={`service-${service.id}-description`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6" role="list" aria-label={`Caractéristiques de ${service.title}`}>
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-sm text-secondary-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        role="listitem"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`En savoir plus sur ${service.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        // Ici on pourrait ouvrir un modal ou naviguer vers une page détaillée
                      }
                    }}
                  >
                    En savoir plus
                  </motion.button>
                </div>

                {/* Floating Accent */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${service.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 max-w-4xl mx-auto border border-primary-100">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Besoin d'un service sur mesure ?
            </h3>
            <p className="text-secondary-600 mb-6">
              Notre équipe d'experts vous accompagne pour définir la solution de nettoyage parfaitement adaptée à vos besoins spécifiques.
            </p>
            <motion.button
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voir tous nos services de nettoyage"
            >
              Tous nos services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
