import { motion } from 'framer-motion'
import { Users, Award, Target, Heart } from 'lucide-react'

const About = () => {
  const sections = [
    {
      id: 'histoire',
      title: 'Notre Histoire',
      icon: Award,
      content: 'Fondée en 2010, KPS Services est née de la passion de ses fondateurs pour l\'excellence dans le domaine du nettoyage professionnel. Ce qui a commencé comme une petite entreprise familiale est aujourd\'hui une référence dans le secteur, avec plus de 500 clients satisfaits à travers la région parisienne.',
      stats: '15+ années d\'expérience'
    },
    {
      id: 'equipe',
      title: 'Notre Équipe',
      icon: Users,
      content: 'Notre équipe est composée de professionnels expérimentés, formés aux dernières techniques de nettoyage et aux normes de sécurité les plus strictes. Chaque membre partage notre engagement pour la qualité et la satisfaction client.',
      stats: '50+ professionnels qualifiés'
    },
    {
      id: 'valeurs',
      title: 'Nos Valeurs',
      icon: Heart,
      content: 'L\'intégrité, le respect et l\'excellence guident chacune de nos actions. Nous croyons en des relations durables avec nos clients et nos partenaires, fondées sur la confiance mutuelle et le professionnalisme.',
      stats: '100% satisfaction client'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
              À Propos de KPS Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez l'histoire, l'équipe et les valeurs qui font de KPS Services
              votre partenaire de confiance pour tous vos besoins de nettoyage professionnel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-secondary">
                          {section.title}
                        </h2>
                        <p className="text-primary font-semibold">
                          {section.stats}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <Icon className="w-24 h-24 text-primary/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contribuer à des environnements de travail plus sains et plus productifs
              en offrant des services de nettoyage d'excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <Target className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary mb-3">Vision</h3>
              <p className="text-gray-600">
                Devenir la référence du nettoyage professionnel en Île-de-France
                en maintenant les plus hauts standards de qualité.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary mb-3">Engagement</h3>
              <p className="text-gray-600">
                Respecter nos engagements envers nos clients, nos employés
                et l'environnement dans chacune de nos actions.
              </p>
            </div>

            <div className="text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary mb-3">Innovation</h3>
              <p className="text-gray-600">
                Intégrer les dernières technologies et méthodes
                pour améliorer continuellement nos services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
