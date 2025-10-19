import { motion } from 'framer-motion'

const Legal = () => {
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
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
              Mentions Légales
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informations légales concernant KPS Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-secondary mb-6">Éditeur du site</h2>
              <p className="text-gray-600 mb-4">
                <strong>Raison sociale :</strong> KPS Services<br />
                <strong>Forme juridique :</strong> SARL<br />
                <strong>Capital social :</strong> 50 000 €<br />
                <strong>Siège social :</strong> 123 Avenue de la Propreté, 75001 Paris<br />
                <strong>Numéro SIRET :</strong> XXX XXX XXX XXXXX<br />
                <strong>Numéro TVA intracommunautaire :</strong> FR XX XXX XXX XXX<br />
                <strong>Téléphone :</strong> 01 23 45 67 89<br />
                <strong>Email :</strong> contact@kps-services.fr
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Directeur de publication</h2>
              <p className="text-gray-600 mb-4">
                [Nom du directeur de publication]
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Hébergement</h2>
              <p className="text-gray-600 mb-4">
                Ce site est hébergé par :<br />
                [Nom de l'hébergeur]<br />
                [Adresse de l'hébergeur]<br />
                Téléphone : [Téléphone de l'hébergeur]
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Propriété intellectuelle</h2>
              <p className="text-gray-600 mb-4">
                L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur.
                Toute reproduction, même partielle, est interdite sans l'autorisation écrite préalable de KPS Services.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Responsabilité</h2>
              <p className="text-gray-600 mb-4">
                KPS Services s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, des erreurs ou omissions peuvent survenir. L'internaute est invité à nous signaler toute erreur.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Liens hypertextes</h2>
              <p className="text-gray-600 mb-4">
                Ce site peut contenir des liens vers d'autres sites. KPS Services n'exerce aucun contrôle sur ces sites
                et décline toute responsabilité quant à leur contenu.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Legal

