import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Home, Shield, Users, Briefcase, MapPin, Phone, MessageSquare } from 'lucide-react'

const Sitemap = () => {
  const sections = [
    {
      title: 'Navigation Principale',
      links: [
        { name: 'Accueil', url: '/', icon: Home },
        { name: 'Nos Services', url: '/services', icon: Briefcase },
        { name: 'Zones d\'Intervention', url: '/zones', icon: MapPin },
        { name: 'Nos Références', url: '/references', icon: Users },
        { name: 'À Propos', url: '/about', icon: Users },
        { name: 'Contact', url: '/contact', icon: Phone },
        { name: 'Demander un Devis', url: '/quote', icon: FileText },
      ]
    },
    {
      title: 'Informations Légales',
      links: [
        { name: 'Mentions Légales', url: '/legal', icon: Shield },
        { name: 'Politique de Confidentialité', url: '/privacy', icon: Shield },
        { name: 'Conditions Générales', url: '/terms', icon: FileText },
      ]
    },
    {
      title: 'Administration',
      links: [
        { name: 'Espace Client (Bientôt)', url: '#', icon: Users },
        { name: 'Accès Admin', url: '/admin/login', icon: Shield },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">Plan du Site</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Retrouvez facilement toutes les pages de KPS Services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Links Grid */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.url}
                        className="flex items-center text-gray-600 hover:text-green-600 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-green-50 transition-colors">
                          <link.icon className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                        </div>
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sitemap
