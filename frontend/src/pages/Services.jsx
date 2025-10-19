import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Play, Shield, Zap, Leaf, Award, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

// Composant pour les vidéos YouTube intégrées
const YouTubeEmbed = ({ videoId, title }) => (
  <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
    <iframe
      className="absolute inset-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)

// Composant pour les cards d'images avec texte
const ServiceCard = ({ image, title, description, features }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {features && (
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
)

const Services = () => {
  const mainServices = [
    {
      id: 1,
      title: 'Nettoyage Industriel',
      subtitle: 'Experts du Nettoyage Industriel – Sécurité, Performance et Durabilité',
      description: 'Notre mission : garantir un environnement de production propre, sûr et durable. Chez KPS Services, nous sommes spécialisés dans le nettoyage industriel et l\'entretien des sites de production.',
      videoId: 'dQw4w9WgXcQ', // Remplacez par votre vraie vidéo YouTube
      images: [
        {
          src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Nettoyage Cryogénique',
          description: 'Technique innovante utilisant des pellets de glace carbonique. Aucun produit chimique, compatible avec toutes surfaces industrielles.'
        },
        {
          src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Nettoyage Haute Pression',
          description: 'Solutions de dégraissage et nettoyage en profondeur pour équipements industriels lourds.'
        },
        {
          src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Maintenance Préventive',
          description: 'Programmes d\'entretien régulier pour optimiser la durée de vie de vos équipements.'
        },
        {
          src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Audit et Conformité',
          description: 'Évaluation complète de vos besoins et mise en conformité réglementaire.'
        }
      ],
      sectors: [
        'Industrie automobile et aéronautique',
        'Agroalimentaire et transformation',
        'Métallurgie et fabrication mécanique',
        'Pétrochimie et énergie',
        'Transport et logistique',
        'Sites hospitaliers et pharmaceutiques'
      ]
    },
    {
      id: 2,
      title: 'Maintenance Propreté',
      subtitle: 'Solutions d\'entretien quotidiennes et spécialisées',
      description: 'Services complets d\'entretien et de maintenance propreté pour tous types d\'environnements professionnels.',
      videoId: 'dQw4w9WgXcQ', // Remplacez par votre vraie vidéo YouTube
      images: [
        {
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Entretien Bureaux',
          description: 'Nettoyage quotidien des espaces de travail pour un environnement sain et professionnel.'
        },
        {
          src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Lavage de Vitres',
          description: 'Service professionnel avec équipement de sécurité certifié pour tous types de bâtiments.'
        }
      ]
    }
  ]

  const techniques = [
    {
      icon: Zap,
      title: 'Nettoyage Cryogénique',
      description: 'Projection de glace carbonique sans eau ni produit chimique',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Nettoyage Vapeur Sèche',
      description: 'Désinfection écologique haute température',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Aspiration Industrielle',
      description: 'Équipements haute performance pour tous débris',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Leaf,
      title: 'Solutions Écologiques',
      description: 'Produits biodégradables et respectueux de l\'environnement',
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const advantages = [
    {
      icon: Users,
      title: 'Formation Continue',
      description: 'Techniciens certifiés et formés aux dernières technologies'
    },
    {
      icon: Shield,
      title: 'Veille Réglementaire',
      description: 'Respect des normes sanitaires et environnementales'
    },
    {
      icon: Leaf,
      title: 'Impact Environnemental',
      description: 'Solutions durables et écologiques prioritaires'
    },
    {
      icon: Clock,
      title: 'Réactivité Optimale',
      description: 'Interventions d\'urgence 24/7 disponibles'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Nos Services Professionnels
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez notre expertise complète en nettoyage industriel et maintenance propreté. 
              Des solutions sur-mesure pour garantir la sécurité, la performance et la durabilité de vos espaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Principaux */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="mb-32"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* En-tête de service */}
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-xl text-green-600 font-semibold mb-6">
                  {service.subtitle}
                </p>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Vidéo YouTube */}
              <div className="mb-16">
                <div className="max-w-4xl mx-auto">
                  <YouTubeEmbed 
                    videoId={service.videoId} 
                    title={`Vidéo présentation ${service.title}`} 
                  />
                </div>
              </div>

              {/* Grille d'images/services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {service.images.map((image, idx) => (
                  <ServiceCard
                    key={idx}
                    image={image.src}
                    title={image.title}
                    description={image.description}
                  />
                ))}
              </div>

              {/* Secteurs d'intervention */}
              {service.sectors && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Nos Domaines d'Intervention
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.sectors.map((sector, idx) => (
                      <div key={idx} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quote"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contactez nos experts
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Techniques de Nettoyage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Nos Techniques Avancées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous maîtrisons les méthodes les plus innovantes du secteur pour des résultats optimaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techniques.map((technique, idx) => {
              const Icon = technique.icon
              return (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${technique.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {technique.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {technique.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Focus Technique: Nettoyage Cryogénique */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Focus Technique : Le Nettoyage Cryogénique
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Le nettoyage cryogénique est une méthode innovante qui utilise des pellets 
                  de glace carbonique projetés à haute vitesse.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Aucun produit chimique ni résidu secondaire',
                    'Compatible avec la plupart des surfaces industrielles', 
                    'Réduit les temps d\'arrêt de production',
                    'Respectueux de l\'environnement'
                  ].map((advantage, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-blue-300 mr-3 flex-shrink-0" />
                      <span className="text-blue-50">{advantage}</span>
                    </div>
                  ))}
                </div>

                <p className="text-blue-100 italic">
                  Cette technique illustre parfaitement notre engagement vers une maintenance 
                  propreté responsable et performante.
                </p>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <YouTubeEmbed 
                    videoId="dQw4w9WgXcQ" 
                    title="Démonstration Nettoyage Cryogénique" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi Choisir KPS Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Choisir KPS Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos clients nous font confiance pour notre expertise, notre engagement et notre service exceptionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, idx) => {
              const Icon = advantage.icon
              return (
                <motion.div
                  key={idx}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Contactez Nos Experts
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Vous souhaitez améliorer la propreté et la performance de votre site industriel ?
              Nos spécialistes sont à votre disposition pour un diagnostic gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center shadow-lg"
              >
                📞 Diagnostic gratuit
              </Link>
              <Link
                to="/quote"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Devis personnalisé
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
