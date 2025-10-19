import { motion } from 'framer-motion'
import { Star, MapPin, Building2 } from 'lucide-react'
import Testimonials from '../components/Testimonials'

const References = () => {
  const projects = [
    {
      id: 1,
      title: 'Complexe industriel TechCorp',
      category: 'Nettoyage industriel',
      location: 'Boulogne-Billancourt',
      description: 'Nettoyage complet d\'un complexe industriel de 15 000 m² incluant sols époxy, machines de production et espaces de stockage.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      results: ['Réduction de 40% des arrêts machines', 'Amélioration de la sécurité', 'Conformité aux normes HACCP']
    },
    {
      id: 2,
      title: 'Tour de bureaux La Défense',
      category: 'Lavage de vitres',
      location: 'La Défense, Paris',
      description: 'Lavage professionnel des 2 500 m² de vitres d\'une tour de 25 étages avec intervention en rappel et nacelle.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['Rénovation complète de l\'image', 'Sécurité maximale assurée', 'Respect du planning serré']
    },
    {
      id: 3,
      title: 'Centre commercial Rosny 2',
      category: 'Entretien espaces communs',
      location: 'Rosny-sous-Bois',
      description: 'Maintenance quotidienne des espaces communs d\'un centre commercial de 80 000 m², 7j/7.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['Satisfaction client >95%', 'Réactivité d\'intervention', 'Gestion écologique']
    }
  ]

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '15+', label: 'Années d\'expérience' },
    { number: '50+', label: 'Professionnels' },
    { number: '100%', label: 'Taux de recommandation' }
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
              Nos Références
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-uns de nos projets réalisés avec succès
              et les témoignages de nos clients satisfaits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Projets réalisés
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque projet témoigne de notre expertise et de notre engagement qualité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary mb-2">Résultats obtenus :</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-secondary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Votre projet mérite notre expertise
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Rejoignez nos clients satisfaits et bénéficiez de notre savoir-faire
              pour vos besoins de nettoyage professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-200">
                Demander un devis
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-secondary transition-colors duration-200">
                Voir plus de projets
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default References
