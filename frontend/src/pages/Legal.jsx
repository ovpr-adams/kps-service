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
              <div className="text-gray-600 mb-8 space-y-2">
                <p><strong>Raison sociale :</strong> KPS SERVICES</p>
                <p><strong>Forme juridique :</strong> EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</p>
                <p><strong>Capital social :</strong> 2 000,00 €</p>
                <p><strong>Activité :</strong> Nettoyage courant des bâtiments</p>
                <p><strong>RCS :</strong> 918 371 089 R.C.S. Meaux</p>
                <p><strong>SIREN :</strong> 918 371 089</p>
                <p><strong>SIRET (siège) :</strong> 918 371 089 00015</p>
                <p><strong>Numéro de TVA intracommunautaire :</strong> FR66918371089</p>
                <p><strong>Date de création :</strong> 11/07/2022</p>
              </div>

              <h3 className="text-xl font-bold text-secondary mb-4">Siège Social</h3>
              <p className="text-gray-600 mb-8">
                18 ALLÉE DU BOIS MOUSSU<br />
                77420 CHAMPS-SUR-MARNE<br />
                France
              </p>

              <h3 className="text-xl font-bold text-secondary mb-4">Contact</h3>
              <p className="text-gray-600 mb-8">
                <strong>Téléphone :</strong> <a href="tel:+33185091951" className="hover:text-primary transition-colors">01 85 09 19 51</a><br />
                <strong>Email :</strong> <a href="mailto:Contact@kpsservices.fr" className="hover:text-primary transition-colors">Contact@kpsservices.fr</a>
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Directeur de publication</h2>
              <p className="text-gray-600 mb-4">
                La direction de KPS SERVICES.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">Hébergement</h2>
              <p className="text-gray-600 mb-4">
                Ce site est hébergé par :<br />
                <strong>o2switch</strong><br />
                Chemin des Pardiaux<br />
                63000 Clermont-Ferrand<br />
                France<br />
                Téléphone : 04 44 44 60 40
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

