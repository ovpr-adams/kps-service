import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calculator, Phone, Mail } from 'lucide-react'

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    surface: '',
    frequency: '',
    description: '',
    urgency: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Demande de devis envoyée !
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Merci pour votre demande. Notre équipe va analyser vos besoins et vous contacter
            sous 24h avec un devis personnalisé.
          </p>

          <div className="bg-primary/10 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-secondary mb-2">Ce qui se passe maintenant :</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Analyse de votre demande par nos experts</li>
              <li>• Contact sous 24h pour préciser vos besoins</li>
              <li>• Proposition d'un devis détaillé et transparent</li>
              <li>• Planification de l'intervention si validé</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              Retour à l'accueil
            </button>
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

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
            <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
              Demande de Devis
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Obtenez un devis personnalisé et transparent pour vos besoins de nettoyage professionnel.
              Réponse sous 24h garantie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-primary text-secondary' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            className="bg-white rounded-2xl shadow-xl p-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Step 1: Informations personnelles */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Informations de contact
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Détails du projet */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Détails du projet
                </h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="nettoyage-industriel">Nettoyage industriel</option>
                      <option value="lavage-vitres">Lavage de vitres</option>
                      <option value="entretien-bureaux">Entretien bureaux</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Surface approximative (m²)
                      </label>
                      <input
                        type="number"
                        name="surface"
                        value={formData.surface}
                        onChange={handleInputChange}
                        placeholder="Ex: 500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fréquence souhaitée
                      </label>
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="ponctuel">Ponctuel</option>
                        <option value="hebdomadaire">Hebdomadaire</option>
                        <option value="mensuel">Mensuel</option>
                        <option value="quotidien">Quotidien</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description du projet
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Décrivez vos besoins spécifiques, contraintes particulières..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Finalisation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Finalisation
                </h2>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'urgence
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="faible">Faible - Pas de contrainte particulière</option>
                    <option value="moyen">Moyen - Dans les prochaines semaines</option>
                    <option value="urgent">Urgent - Intervention rapide nécessaire</option>
                  </select>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-secondary mb-4">Récapitulatif de votre demande :</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Service :</span> {formData.service || 'Non spécifié'}
                    </div>
                    <div>
                      <span className="font-medium">Surface :</span> {formData.surface ? `${formData.surface} m²` : 'Non spécifiée'}
                    </div>
                    <div>
                      <span className="font-medium">Fréquence :</span> {formData.frequency || 'Non spécifiée'}
                    </div>
                    <div>
                      <span className="font-medium">Urgence :</span> {formData.urgency || 'Non spécifiée'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
                  >
                    Envoyer la demande
                  </button>
                </div>
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="mt-12 bg-secondary text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d'aide pour votre demande ?
              </h3>
              <p className="mb-6 text-gray-300">
                Notre équipe est disponible pour vous accompagner dans l'élaboration de votre devis
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>contact@kps-services.fr</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Quote
