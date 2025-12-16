import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Shield, Zap, Leaf, Award, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

// Composant pour les vidéos YouTube intégrées
const YouTubeEmbed = ({ videoId, title }) => (
  <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
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

// Composant Carte Service Premium
const ServiceCard = ({ image, title, description, features }) => (
  <motion.div
    className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100/50 flex flex-col h-full"
    whileHover={{ y: -8 }}
  >
    <div className="relative h-64 overflow-hidden shrink-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay gradient vert/or premium */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white drop-shadow-md mb-2">
          {title}
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
      </div>
    </div>

    <div className="p-8 flex flex-col grow">
      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{description}</p>

      {features && (
        <div className="space-y-3 pt-6 border-t border-gray-100">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Badge Service Premium */}
      <div className="mt-6 pt-4 flex justify-between items-center border-t border-gray-50">
        <span className="text-xs font-bold tracking-wider text-green-600 uppercase bg-green-50 px-3 py-1 rounded-full">
          Service Premium
        </span>
      </div>
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
      videoId: '', // Masqué
      images: [
        {
          src: '/nettoyage-chantier-industriel.jpg',
          title: 'Nettoyage après Chantier',
          description: 'Nettoyage professionnel avec équipement industriel de pointe pour tous types de chantiers.'
        }
      ],
      sectors: [
        'Industrie automobile et aéronautique',
        'Agroalimentaire et transformation',
        'Métallurgie et fabrication mécanique',
        'Pétrochimie et énergie',
        'Transport et logistique',
        'Sites hospitaliers et pharmaceutiques',
        'Nettoyage de chantier'
      ]
    },
    {
      id: 2,
      title: 'Maintenance Propreté',
      subtitle: 'Solutions d\'entretien quotidiennes et spécialisées',
      description: 'Services complets d\'entretien et de maintenance propreté pour tous types d\'environnements professionnels.',
      videoId: '', // Masqué
      images: [
        {
          src: '/entretien-bureaux-ecoles.jpg',
          title: 'Entretien Bureaux & Écoles',
          description: 'Nettoyage quotidien des espaces de travail et éducatifs pour un environnement sain et professionnel.'
        },
        {
          src: '/lavage-vitres-professionnel.jpg',
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
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Nettoyage Vapeur Sèche',
      description: 'Désinfection écologique haute température',
      gradient: 'from-green-600 to-green-700'
    },
    {
      icon: Award,
      title: 'Aspiration Industrielle',
      description: 'Équipements haute performance pour tous débris',
      gradient: 'from-yellow-500 to-yellow-600' // Gold accent
    },
    {
      icon: Leaf,
      title: 'Solutions Écologiques',
      description: 'Produits biodégradables et respectueux de l\'environnement',
      gradient: 'from-teal-500 to-teal-600'
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
    <div className="pt-16 relative bg-gray-50/50">

      {/* Hero Section Premium */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-800 to-gray-900 py-32 overflow-hidden">
        {/* Background Pattern subtil */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Cercles décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-primary font-semibold text-sm mb-6 backdrop-blur-md">
              EXCELLENCE & SAVOIR-FAIRE
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Nos Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">Professionnels</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez notre expertise complète en nettoyage industriel et maintenance propreté.
              Des solutions sur-mesure pour garantir la sécurité, la performance et la durabilité de vos espaces.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Section Vidéo YouTube Premium */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/hero-bg-2.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block py-2 px-4 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-sm mb-4 backdrop-blur-sm">
              DÉCOUVREZ NOS MÉTHODES
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Notre Expertise en Action
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez comment KPS Services transforme vos espaces avec professionnalisme et efficacité
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <YouTubeEmbed
              videoId="1t6Q0rq7kO4"
              title="KPS Services - Nettoyage Professionnel"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Services Loop */}
      <div className="relative -mt-20 z-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {mainServices.map((service, index) => (
            <div key={service.id}>

              {/* Header de la section service */}
              <motion.div
                className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 mb-12 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-primary"></div>

                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-primary mx-auto rounded-full mb-8"></div>

                <p className="text-2xl text-green-700 font-medium mb-6">
                  {service.subtitle}
                </p>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* Grille de cartes services */}
              <div className={`grid gap-8 mb-16 ${service.images.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' :
                service.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
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
                <motion.div
                  className="bg-gradient-to-br from-gray-900 to-green-900 rounded-3xl p-10 text-white shadow-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-10 text-center flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary mr-3" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Domaines d'Intervention
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {service.sectors.map((sector, idx) => (
                      <div key={idx} className="group flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 group-hover:bg-green-500/40 transition-colors">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">{sector}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Techniques Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos Techniques Avancées</h2>
            <p className="text-xl text-gray-500">Innovation et performance au service de votre propreté</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techniques.map((technique, idx) => {
              const Icon = technique.icon
              return (
                <motion.div
                  key={idx}
                  className="relative group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-green-100 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${technique.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{technique.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{technique.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Focus Technique Cryogénique */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl overflow-hidden shadow-2xl bg-gray-900 text-white relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Background avec effet */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-gray-900 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/hero-bg-2.jpg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-12 lg:p-20 gap-16 items-center">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Innovation KPS</span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                  Focus : Nettoyage Cryogénique
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Le nettoyage cryogénique est une méthode révolutionnaire utilisant des pellets de glace carbonique projetés à haute vitesse. Une solution sèche, non-abrasive et écologique.
                </p>

                <div className="space-y-4">
                  {[
                    'Zéro résidu secondaire (sublimation immédiate)',
                    'Nettoyage sous tension possible (procédé sec)',
                    'Non-abrasif : préserve l\'intégrité des surfaces',
                    'Désinfection naturelle par le froid (-78°C)'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-4 shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-lg text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  {/* Placeholder visuel stylisé pour remplacer la vidéo */}
                  <div className="text-center z-20 transform group-hover:scale-105 transition-transform duration-500">
                    <Zap className="w-20 h-20 text-primary mx-auto mb-4 opacity-80" />
                    <p className="text-white font-semibold text-lg">Technologie haute performance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi KPS + CTA Final */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pourquoi Choisir KPS Services ?</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon
              return (
                <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-green-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform text-green-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{adv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{adv.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Prêt à élever vos standards de propreté ?</h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                Contactez nos experts dès aujourd'hui pour une analyse personnalisée de vos besoins et un devis sur-mesure.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/quote"
                  className="bg-primary hover:bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-primary/50 flex items-center justify-center"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-green-800 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
