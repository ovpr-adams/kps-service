import { motion } from 'framer-motion'
import { FileText, CheckCircle } from 'lucide-react'

const Terms = () => {
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
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
              Conditions d'Utilisation
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veuillez lire attentivement ces conditions avant d'utiliser nos services
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
              <p className="text-gray-600 mb-6">
                Bienvenue sur le site de KPS Services. En utilisant notre site et nos services,
                vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions,
                veuillez ne pas utiliser notre site.
              </p>

              <p className="text-sm text-gray-500 mb-8">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6">1. Acceptation des conditions</h2>
              <p className="text-gray-600 mb-6">
                L'utilisation de ce site implique l'acceptation pleine et entière des présentes conditions générales
                d'utilisation. Ces conditions peuvent être modifiées ou complétées à tout moment, les utilisateurs
                du site sont donc invités à les consulter régulièrement.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">2. Services proposés</h2>
              <p className="text-gray-600 mb-4">
                KPS Services propose les prestations suivantes :
              </p>
              <ul className="list-none space-y-2 mb-6">
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  Nettoyage industriel
                </li>
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  Lavage de vitres professionnel
                </li>
                <li className="flex items-start text-gray-600">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  Entretien de bureaux et espaces professionnels
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">3. Devis et commandes</h2>
              <p className="text-gray-600 mb-6">
                Les demandes de devis effectuées via le site n'engagent ni le client ni KPS Services tant qu'un
                devis formel n'a pas été établi, signé et retourné. Chaque prestation fait l'objet d'un devis détaillé
                et personnalisé qui précise la nature, la durée et le coût des services.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">4. Tarifs</h2>
              <p className="text-gray-600 mb-6">
                Les tarifs sont indiqués en euros TTC. KPS Services se réserve le droit de modifier ses tarifs à tout moment,
                mais les services seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">5. Conditions de paiement</h2>
              <p className="text-gray-600 mb-6">
                Les modalités de paiement sont précisées sur chaque devis. En règle générale, le paiement s'effectue
                selon les conditions négociées (à la commande, à la livraison, ou selon un échéancier convenu).
                Tout retard de paiement pourra entraîner l'application de pénalités de retard.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">6. Annulation et modification</h2>
              <p className="text-gray-600 mb-6">
                Toute annulation ou modification d'une prestation programmée doit être notifiée par écrit au moins
                48 heures avant la date prévue. En cas d'annulation tardive, des frais pourront être appliqués.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">7. Responsabilité</h2>
              <p className="text-gray-600 mb-6">
                KPS Services met tout en œuvre pour fournir des services de qualité. Notre responsabilité
                professionnelle est couverte par une assurance. En cas de dommage, notre responsabilité est limitée
                au montant de la prestation concernée.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">8. Propriété intellectuelle</h2>
              <p className="text-gray-600 mb-6">
                Tous les éléments du site (textes, images, graphismes, logo, etc.) sont protégés par le droit
                de la propriété intellectuelle et sont la propriété exclusive de KPS Services.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">9. Protection des données</h2>
              <p className="text-gray-600 mb-6">
                Les informations personnelles collectées sont traitées conformément à notre politique de confidentialité
                et au RGPD. Pour plus d'informations, consultez notre politique de confidentialité.
              </p>

              <h2 className="text-2xl font-bold text-secondary mb-6 mt-10">10. Droit applicable</h2>
              <p className="text-gray-600 mb-6">
                Les présentes conditions sont soumises au droit français. En cas de litige, et après tentative de
                recherche d'une solution amiable, compétence est donnée aux tribunaux compétents de Paris.
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-secondary mb-4">Contact</h2>
                <p className="text-gray-600">
                  Pour toute question concernant ces conditions d'utilisation :
                  <br /><br />
                  <strong>Email :</strong> contact@kps-services.fr<br />
                  <strong>Téléphone :</strong> 01 23 45 67 89<br />
                  <strong>Adresse :</strong> 123 Avenue de la Propreté, 75001 Paris
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Terms

