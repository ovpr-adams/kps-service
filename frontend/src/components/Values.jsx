import { motion } from 'framer-motion'
import { Shield, Clock, Award, Users } from 'lucide-react'

const Values = () => {
  const values = [
    {
      id: 1,
      icon: Shield,
      title: 'Fiabilité',
      description: 'Nous respectons nos engagements et garantissons la qualité de nos interventions.'
    },
    {
      id: 2,
      icon: Clock,
      title: 'Ponctualité',
      description: 'Nous intervenons dans les délais convenus et respectons votre planning d\'activité.'
    },
    {
      id: 3,
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet avec du matériel professionnel de qualité.'
    },
    {
      id: 4,
      icon: Users,
      title: 'Équipe experte',
      description: 'Notre équipe qualifiée et formée régulièrement assure un service irréprochable.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Nos Valeurs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident notre travail et garantissent votre satisfaction
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-secondary mb-4">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Engagement Qualité
            </h3>
            <p className="text-gray-600 mb-6">
              Certifiés ISO 9001 et respectueux des normes environnementales,
              nous nous engageons pour un service de qualité supérieure et respectueux de l'environnement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm font-medium text-secondary">ISO 9001</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm font-medium text-secondary">Assuré & Garanti</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Values
