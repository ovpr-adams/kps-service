import { motion } from 'framer-motion'
import { Users, Award, Target, Heart, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { API_URLS, getPublicHeaders } from '../config/api'

const About = () => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const loadSections = async () => {
      try {
        const response = await fetch(API_URLS.ABOUT_SECTIONS, {
          headers: getPublicHeaders()
        })
        const data = await response.json()
        if (response.ok && data.data) {
          setSections(data.data)
        }
      } catch (error) {
        // Fallback silently if API fails, using default hardcoded sections below if state is empty
        console.warn('Using default sections due to API error')
      }
    }
    loadSections()
  }, [])

  // Default content if API is empty or fails
  const defaultSections = [
    {
      _id: 'histoire',
      title: 'Notre Héritage',
      icon: 'Award',
      content: 'Fondée en 2002, KPS Services est née d\'une ambition simple : redefinir les standards de la propreté industrielle. Ce qui a commencé comme une entreprise familiale est aujourd\'hui une référence technique en Île-de-France.',
      stats: '20+ Ans d\'Excellence'
    },
    {
      _id: 'equipe',
      title: 'L\'Élite Technique',
      icon: 'Users',
      content: 'Plus qu\'une équipe de nettoyage, nous formons des techniciens experts. Chaque intervenant est qualifié pour opérer dans des environnements sensibles (Seveso, IGH, Zones stériles).',
      stats: '35+ Experts Qualifiés'
    },
    {
      _id: 'valeurs',
      title: 'Nos Piliers',
      icon: 'ShieldCheck',
      content: 'Rigueur absolue, transparence totale et innovation constante. Nous ne vendons pas seulement du temps de nettoyage, nous vendons de la sérénité opérationnelle.',
      stats: '100% Engagement'
    }
  ]

  const displaySections = sections.length > 0 ? sections : defaultSections

  const getIconComponent = (iconName) => {
    const icons = { Award, Users, Heart, Target, TrendingUp, ShieldCheck }
    return icons[iconName] || Award
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section Premium Dark */}
      <section className="relative pt-40 pb-24 bg-gray-900 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Notre ADN
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              L'Excellence comme <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Standard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Derrière chaque intervention KPS Services, il y a une vision :
              celle de transformer la propreté en un levier de performance pour votre entreprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Vision Grid */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displaySections.map((section, index) => {
              const IconComponent = getIconComponent(section.icon)
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    <IconComponent className="w-7 h-7 text-green-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-yellow-600 font-bold text-sm mb-4 uppercase tracking-wider">
                    {section.stats}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Horizon Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-400 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
              alt="Réunion équipe KPS"
              className="relative rounded-3xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
              <p className="text-4xl font-bold text-green-600 mb-1">100%</p>
              <p className="text-sm text-gray-500 font-semibold uppercase">Engagement Qualité</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Façonner les environnements de demain
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nous ne nous contentons pas de nettoyer. Nous assurons la pérennité de vos installations et la santé de vos collaborateurs.
              L'innovation est au cœur de notre stratégie : produits écologiques, machines autonomes et traçabilité numérique.
            </p>

            <ul className="space-y-4">
              {[
                "Respect rigoureux des normes environnementales",
                "Formation continue de nos équipes techniques",
                "Partenariat long terme avec nos clients"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
