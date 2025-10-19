import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database } from 'lucide-react'

const Privacy = () => {
  const sections = [
    {
      id: 'collecte',
      icon: Database,
      title: 'Collecte des données',
      content: 'Nous collectons uniquement les données nécessaires à la fourniture de nos services : nom, email, téléphone, et informations relatives à votre demande de devis ou de service. Ces données sont collectées avec votre consentement explicite.'
    },
    {
      id: 'utilisation',
      icon: Eye,
      title: 'Utilisation des données',
      content: 'Vos données personnelles sont utilisées exclusivement pour traiter vos demandes, vous contacter dans le cadre de nos prestations, et améliorer nos services. Nous ne vendons ni ne louons vos données à des tiers.'
    },
    {
      id: 'securite',
      icon: Lock,
      title: 'Sécurité des données',
      content: 'Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.'
    },
    {
      id: 'droits',
      icon: Shield,
      title: 'Vos droits',
      content: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de limitation du traitement, de portabilité et d\'opposition concernant vos données personnelles.'
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Votre vie privée est importante pour nous. Découvrez comment nous protégeons
              et utilisons vos données personnelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-600 mb-6">
              Chez KPS Services, nous accordons une grande importance à la protection de vos données personnelles.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <p className="text-sm text-gray-500 mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-secondary mb-3">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-secondary mb-4">Cookies</h2>
              <p className="text-gray-600 mb-4">
                Notre site utilise des cookies essentiels au fonctionnement du site. Vous pouvez paramétrer votre
                navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne pas fonctionner correctement.
              </p>

              <h2 className="text-xl font-bold text-secondary mb-4 mt-8">Conservation des données</h2>
              <p className="text-gray-600 mb-4">
                Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles
                elles ont été collectées, ou conformément aux obligations légales applicables.
              </p>

              <h2 className="text-xl font-bold text-secondary mb-4 mt-8">Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
                vous pouvez nous contacter :
                <br /><br />
                <strong>Email :</strong> contact@kps-services.fr<br />
                <strong>Téléphone :</strong> 01 23 45 67 89<br />
                <strong>Adresse :</strong> 123 Avenue de la Propreté, 75001 Paris
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Privacy

