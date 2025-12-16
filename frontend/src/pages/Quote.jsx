import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Calculator, Phone, Mail, ArrowRight, User, Building, FileText, Calendar, AlertCircle } from 'lucide-react'
import { API_URLS, getPublicHeaders } from '../config/api'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    // Validation : Vérifier si le niveau d'urgence est sélectionné
    if (!formData.urgency) {
      setSubmitError('Veuillez sélectionner un niveau d\'urgence')
      setIsSubmitting(false)
      return
    }

    try {
      // Filtrer les champs vides avant l'envoi
      const dataToSend = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      )

      const response = await fetch(API_URLS.QUOTES, {
        method: 'POST',
        headers: getPublicHeaders(),
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.message || 'Erreur lors de l\'envoi de la demande')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          className="max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center border-t-8 border-green-500 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Confetti effect background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Demande envoyée !
            </h2>
            <p className="text-xl text-green-600 font-medium mb-8">
              Nous avons bien reçu votre demande de devis.
            </p>
            <p className="text-gray-600 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
              Notre équipe d'experts va analyser vos besoins et vous contacter <span className="font-bold text-gray-900">sous 24h</span> avec une proposition personnalisée.
            </p>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-10 border border-gray-200 text-left">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-primary" />
                Prochaines étapes :
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                  Analyse technique de votre demande
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                  Prise de contact pour affiner les détails
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 text-sm font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                  Envoi de votre devis détaillé et transparent
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                Retour à l'accueil
              </button>
              <div className="flex items-center justify-center px-6 py-4 bg-gray-50 rounded-xl border border-gray-200">
                <Phone className="w-5 h-5 mr-3 text-green-600" />
                <span className="font-bold text-gray-900">01 23 45 67 89</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section Premium avec Image de Fond */}
      <section className="relative pt-40 pb-32 lg:pb-48 overflow-hidden">
        {/* Image de fond fixe avec Parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-gray-900/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Extra darkening for text readability */}
          <img
            src="/devis-nettoyage-industriel.jpg"
            className="w-full h-full object-cover fixed inset-0" // fixed creates faux-parallax
            alt="Devis Nettoyage Industriel"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20 shadow-xl">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Demande de <span className="text-primary">Devis</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Obtenez une estimation précise et gratuite pour vos besoins de nettoyage.
              Réponse garantie sous 24h par nos experts KPS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area - Form & Info */}
      <section className="relative z-30 -mt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Colonne Gauche - Formulaire (2/3) */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Progress Header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center justify-between max-w-md mx-auto relative">
                    {/* Ligne de fond */}
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>

                    {/* Ligne de progression active */}
                    <div
                      className="absolute left-0 top-1/2 h-1 bg-green-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out"
                      style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((step) => (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${step <= currentStep
                            ? step === currentStep
                              ? 'bg-primary text-gray-900 scale-110 ring-4 ring-primary/20'
                              : 'bg-green-500 text-white'
                            : 'bg-white text-gray-400 border-2 border-gray-200'
                            }`}
                        >
                          {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                        </div>
                        <span className={`text-xs font-semibold mt-2 transition-colors duration-300 ${step === currentStep ? 'text-green-700' : 'text-gray-400'
                          }`}>
                          {step === 1 ? 'Contact' : step === 2 ? 'Projet' : 'Finalisation'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Informations Contact */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <User className="w-6 h-6 mr-3 text-primary" />
                          Vos Coordonnées
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Nom complet *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              placeholder="Votre nom"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Entreprise</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              placeholder="Nom de votre société"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email professionnel *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              placeholder="email@entreprise.com"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Téléphone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              placeholder="06 12 34 56 78"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Détails du projet */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <Building className="w-6 h-6 mr-3 text-primary" />
                          Détails de la prestation
                        </h2>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Type de service souhaité *</label>
                            <div className="relative">
                              <select
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none appearance-none"
                                required
                              >
                                <option value="">Sélectionnez une prestation</option>
                                <option value="nettoyage-industriel">Nettoyage industriel</option>
                                <option value="lavage-vitres">Lavage de vitres</option>
                                <option value="entretien-bureaux">Entretien de bureaux</option>
                                <option value="remise-en-etat">Remise en état après travaux</option>
                                <option value="autre">Autre demande spécifique</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">Surface (m²)</label>
                              <input
                                type="number"
                                name="surface"
                                value={formData.surface}
                                onChange={handleInputChange}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                placeholder="Surface approximative"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 ml-1">Fréquence</label>
                              <div className="relative">
                                <select
                                  name="frequency"
                                  value={formData.frequency}
                                  onChange={handleInputChange}
                                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                  <option value="">Sélectionnez</option>
                                  <option value="ponctuel">Intervention ponctuelle</option>
                                  <option value="quotidien">Journalier</option>
                                  <option value="hebdomadaire">Hebdomadaire</option>
                                  <option value="mensuel">Mensuel</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Description détaillée</label>
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                              placeholder="Précisez vos besoins particuliers, horaires d'accès, contraintes techniques..."
                            ></textarea>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Finalisation */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <FileText className="w-6 h-6 mr-3 text-primary" />
                            Récapitulatif
                          </h2>

                          <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="p-3 bg-white/60 rounded-xl">
                                <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Service</span>
                                <span className="font-semibold text-gray-900">{formData.service || 'Non spécifié'}</span>
                              </div>
                              <div className="p-3 bg-white/60 rounded-xl">
                                <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Surface</span>
                                <span className="font-semibold text-gray-900">{formData.surface ? `${formData.surface} m²` : 'Non spécifiée'}</span>
                              </div>
                              <div className="p-3 bg-white/60 rounded-xl">
                                <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Fréquence</span>
                                <span className="font-semibold text-gray-900">{formData.frequency || 'Non spécifiée'}</span>
                              </div>
                              <div className="p-3 bg-white/60 rounded-xl">
                                <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Contact</span>
                                <span className="font-semibold text-gray-900">{formData.name}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2 text-primary" />
                              Niveau d'urgence
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {['Faible', 'Moyen', 'Urgent'].map((level) => (
                                <label
                                  key={level}
                                  className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.urgency === level.toLowerCase()
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-green-200 text-gray-600'
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="urgency"
                                    value={level.toLowerCase()}
                                    checked={formData.urgency === level.toLowerCase()}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                  />
                                  <span className="font-bold">{level}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {submitError && (
                          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-700">
                            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            {submitError}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-10 pt-8 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1 || isSubmitting}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentStep === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      Précédent
                    </button>

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-primary hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center"
                      >
                        Suivant
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-green-600/50 transition-all duration-300 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Traitement...
                          </>
                        ) : (
                          <>
                            Envoyer la demande
                            <CheckCircle className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Colonne Droite - Info & Confiance (1/3) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Carte Contact Rapide */}
              <motion.div
                className="bg-green-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  Besoin d'aide ?
                </h3>
                <p className="text-green-100 mb-8 text-sm leading-relaxed">
                  Nos experts sont disponibles pour vous guider dans l'élaboration de votre cahier des charges.
                </p>

                <div className="space-y-4">
                  <a href="tel:0123456789" className="flex items-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-bold tracking-wider">01 23 45 67 89</span>
                  </a>
                  <a href="mailto:contact@kps-services.fr" className="flex items-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-sm font-medium">contact@kps-services.fr</span>
                  </a>
                </div>
              </motion.div>

              {/* Carte Avantages */}
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Pourquoi choisir KPS ?</h3>
                <ul className="space-y-4">
                  {[
                    { text: 'Devis détaillé sous 24h', icon: Calendar },
                    { text: 'Tarifs transparents', icon: FileText },
                    { text: 'Experts certifiés', icon: CheckCircle },
                    { text: 'Solutions sur-mesure', icon: Calculator }
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <li key={idx} className="flex items-center text-gray-600 text-sm">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3 shrink-0">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        {item.text}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quote
