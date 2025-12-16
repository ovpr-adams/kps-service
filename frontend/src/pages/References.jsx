import { motion } from 'framer-motion'
import { Star, MapPin, Building2, Trophy, ArrowUpRight, CheckCircle2, Quote } from 'lucide-react'
import Testimonials from '../components/Testimonials'
import { useEffect, useState } from 'react'
import { API_URLS, getPublicHeaders } from '../config/api'

const References = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Complexe Industriel TechCorp',
      category: 'Nettoyage Industriel',
      location: 'Boulogne-Billancourt',
      description: 'Protocole complet de décontamination et maintenance pour site de production haute technologie.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      results: ['-40% d\'arrêts machines', 'Conformité ISO 9001', 'Audit Sécurité 100%']
    },
    {
      id: 2,
      title: 'Tour Horizon La Défense',
      category: 'Travaux en Hauteur',
      location: 'Paris La Défense',
      description: 'Nettoyage de vitrerie par cordistes sur IGH (Immeuble Grande Hauteur) de 45 étages.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['Intervention zéro incident', 'Clarté vitrage optimale', 'Planning respecté J-1']
    },
    {
      id: 3,
      title: 'Mall Westfield Rosny 2',
      category: 'Espaces Publics',
      location: 'Rosny-sous-Bois',
      description: 'Gestion de la propreté 7j/7 pour un flux de 15 millions de visiteurs annuels.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['Satisfaction Visiteurs 4.8/5', 'Tri déchets optimisé', 'Réactivité < 15min']
    },
    {
      id: 4,
      title: 'Lycée d\'Excellence Doisneau',
      category: 'Éducation',
      location: 'Cormeilles-en-Parisis',
      description: 'Bio-nettoyage des espaces de vie scolaire et protocoles sanitaires renforcés.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['Hygiène certifiée', 'Zéro allergène', 'Cadre de vie amélioré']
    },
    {
      id: 5,
      title: 'Campus Innovation Fontaine',
      category: 'Maintenance Tertiaire',
      location: 'Fontaine-sous-Jouy',
      description: 'Entretien éco-responsable d\'un campus mixte bureaux/labos avec produits label vert.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      results: ['100% Produits Verts', 'Bien-être salariés', 'Maintenance prédictive']
    }
  ])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URLS.REFERENCES, {
          headers: getPublicHeaders()
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data.data)) {
          // On garde les données de l'API mais on pourrait les enrichir si besoin
          setProjects(data.data)
        }
      } catch (_) { }
    }
    load()
  }, [])

  const stats = [
    { number: '500+', label: 'Clients Partenaires', icon: Building2 },
    { number: '98%', label: 'Taux de Fidélisation', icon: Star },
    { number: '24/7', label: 'Disponibilité', icon: MapPin },
    { number: '22', label: 'Années d\'Expertise', icon: Trophy }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section "Hall of Fame" */}
      <section className="relative pt-40 pb-24 bg-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl mb-6 border border-white/10">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Réussites</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Ils nous confient leurs environnements les plus critiques.
              <br className="hidden md:block" /> Découvrez comment KPS Services transforme les standards de propreté.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Floating Section */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 hover:border-yellow-400/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">{stat.number}</span>
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Projets Emblématiques</h2>
              <p className="text-gray-600">Une expertise démontrée sur le terrain</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="h-1 w-32 bg-yellow-400 rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Image Container with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-200 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-xs uppercase text-gray-400 tracking-widest mb-2">Impact Client</h4>
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Integration */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <Testimonials />
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative z-10">
              <Quote className="w-12 h-12 text-yellow-400 mx-auto mb-6 opacity-50" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Prêt à élever vos standards ?
              </h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                Rejoignez le cercle des entreprises qui ne font aucun compromis sur la qualité.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-300 shadow-xl flex items-center justify-center">
                  Commencer un projet
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default References
