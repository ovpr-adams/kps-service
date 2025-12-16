import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Building, ArrowRight } from 'lucide-react'
import DynamicMap from '../components/DynamicMap'
import { API_URLS, getPublicHeaders } from '../config/api'
import { useSettings } from '../context/SettingsContext'

const Contact = () => {
  const { settings } = useSettings()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(API_URLS.CONTACTS, {
        method: 'POST',
        headers: getPublicHeaders(),
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setError(result.message || 'Erreur lors de l\'envoi du message')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
      console.error('Erreur:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          className="max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Message envoyé avec succès !
          </h2>
          <p className="text-gray-500 mb-10 text-lg max-w-lg mx-auto">
            Merci de nous avoir contactés. Notre équipe va traiter votre demande et revenir vers vous dans les plus brefs délais.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
          >
            Envoyer un autre message
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section Premium */}
      <section className="relative pt-40 pb-20 bg-gray-900 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('/hero-bg-2.jpg')] bg-cover bg-center opacity-20 user-select-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Support & Information
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contactez <span className="text-primary">KPS Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Une question sur nos prestations ? Besoin d'une intervention spécifique ?
              Nos experts sont à votre écoute pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Info Cards (Left Side) */}
            <motion.div
              className="lg:col-span-1 space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Adresse */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-green-200 transition-colors group">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Siège Social</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      KPS Services<br />
                      Paris, Île-de-France<br />
                      <span className="text-xs text-gray-400 mt-2 block">Intervention Nationale</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Téléphone */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-green-200 transition-colors group">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600 font-medium">{settings?.phone || '01 23 45 67 89'}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {settings?.businessHoursText || 'Lun-Ven 7h00-19h30'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-green-200 transition-colors group">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4 w-full">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Emails</h3>
                    <div className="space-y-2 text-sm">
                      <a href="mailto:contact@kps-services.fr" className="flex justify-between items-center text-gray-600 hover:text-green-600 transition-colors pb-1 border-b border-gray-50">
                        <span>Contact</span>
                        <span className="text-gray-400 text-xs">Général</span>
                      </a>
                      <a href="mailto:commercial@kps-services.fr" className="flex justify-between items-center text-gray-600 hover:text-green-600 transition-colors">
                        <span>Commercial</span>
                        <span className="text-gray-400 text-xs">Devis</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Interactive Mini */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-64 relative">
                <DynamicMap height="100%" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-sm">Notre Zone Principale</p>
                    <p className="text-xs opacity-80">Paris & Île-de-France</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Contact Form (Right Side - 2 Cols) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2 relative z-10">Envoyez-nous un message</h2>
                <p className="text-gray-500 mb-8 relative z-10">Remplissez le formulaire ci-dessous et nous vous répondrons sous 24h.</p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {error}
                    </div>
                  )}

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
                      <label className="text-sm font-bold text-gray-700 ml-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                        placeholder="06 ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Sujet *</label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="devis">Demande de devis</option>
                          <option value="partenariat">Partenariat</option>
                          <option value="recrutement">Recrutement</option>
                          <option value="autre">Autre demande</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Simplified */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Questions Fréquentes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Délais d'intervention ?", a: "24-48h pour les urgences, ou sur planning régulier." },
              { q: "Zones couvertes ?", a: "Principalement Paris/Île-de-France et grandes métropoles." },
              { q: "Devis gratuit ?", a: "Oui, tous nos devis sont gratuits et sans engagement." },
              { q: "Certification ?", a: "Nos équipes sont formées et certifiées aux normes de sécurité." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
