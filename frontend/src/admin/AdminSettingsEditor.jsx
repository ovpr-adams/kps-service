import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Settings, 
  Save, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { API_URLS, getAuthHeaders } from '../config/api'

const AdminSettingsEditor = () => {
  const [settings, setSettings] = useState({
    phone: '',
    serviceAreas: [],
    publicEmails: [],
    contactRecipients: [],
    foundedYear: 2002,
    teamSize: '+35',
    businessHoursText: '7h00-19h30',
    domains: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [newServiceArea, setNewServiceArea] = useState('')
  const [newPublicEmail, setNewPublicEmail] = useState('')
  const [newContactRecipient, setNewContactRecipient] = useState('')
  const [newDomain, setNewDomain] = useState('')
  const navigate = useNavigate()

  // Vérifier l'authentification
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadSettings()
  }, [navigate])

  const loadSettings = async () => {
    try {
      const response = await fetch(API_URLS.SETTINGS, {
        headers: getAuthHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setSettings(data.data || data)
      } else {
        console.error('Erreur lors du chargement des paramètres')
        setMessage({ type: 'error', text: 'Erreur lors du chargement des paramètres' })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch(API_URLS.SETTINGS, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès !' })
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } else {
        const errorData = await response.json()
        setMessage({ type: 'error', text: errorData.message || 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setIsSaving(false)
    }
  }

  const addServiceArea = () => {
    if (newServiceArea.trim() && !settings.serviceAreas.includes(newServiceArea.trim())) {
      setSettings(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newServiceArea.trim()]
      }))
      setNewServiceArea('')
    }
  }

  const removeServiceArea = (index) => {
    setSettings(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index)
    }))
  }

  const addPublicEmail = () => {
    if (newPublicEmail.trim() && !settings.publicEmails.includes(newPublicEmail.trim())) {
      setSettings(prev => ({
        ...prev,
        publicEmails: [...prev.publicEmails, newPublicEmail.trim()]
      }))
      setNewPublicEmail('')
    }
  }

  const removePublicEmail = (index) => {
    setSettings(prev => ({
      ...prev,
      publicEmails: prev.publicEmails.filter((_, i) => i !== index)
    }))
  }

  const addContactRecipient = () => {
    if (newContactRecipient.trim() && !settings.contactRecipients.includes(newContactRecipient.trim())) {
      setSettings(prev => ({
        ...prev,
        contactRecipients: [...prev.contactRecipients, newContactRecipient.trim()]
      }))
      setNewContactRecipient('')
    }
  }

  const removeContactRecipient = (index) => {
    setSettings(prev => ({
      ...prev,
      contactRecipients: prev.contactRecipients.filter((_, i) => i !== index)
    }))
  }

  const addDomain = () => {
    if (newDomain.trim() && !settings.domains.includes(newDomain.trim())) {
      setSettings(prev => ({
        ...prev,
        domains: [...prev.domains, newDomain.trim()]
      }))
      setNewDomain('')
    }
  }

  const removeDomain = (index) => {
    setSettings(prev => ({
      ...prev,
      domains: prev.domains.filter((_, i) => i !== index)
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mr-3">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Paramètres du Site</h1>
                <p className="text-sm text-gray-500">Gestion des paramètres globaux</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message de feedback */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Informations de contact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-600" />
                Informations de Contact
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emails publics
                </label>
                <div className="space-y-2">
                  {settings.publicEmails.map((email, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-sm text-gray-700">{email}</span>
                      <button
                        onClick={() => removePublicEmail(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={newPublicEmail}
                      onChange={(e) => setNewPublicEmail(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="contact@kpsservices.fr"
                    />
                    <button
                      onClick={addPublicEmail}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataires des contacts
                </label>
                <div className="space-y-2">
                  {settings.contactRecipients.map((email, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-sm text-gray-700">{email}</span>
                      <button
                        onClick={() => removeContactRecipient(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={newContactRecipient}
                      onChange={(e) => setNewContactRecipient(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="admin@kpsservices.fr"
                    />
                    <button
                      onClick={addContactRecipient}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de l'entreprise */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                Informations de l'Entreprise
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année de fondation
                  </label>
                  <input
                    type="number"
                    value={settings.foundedYear}
                    onChange={(e) => setSettings(prev => ({ ...prev, foundedYear: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille de l'équipe
                  </label>
                  <input
                    type="text"
                    value={settings.teamSize}
                    onChange={(e) => setSettings(prev => ({ ...prev, teamSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+35"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horaires d'ouverture
                </label>
                <input
                  type="text"
                  value={settings.businessHoursText}
                  onChange={(e) => setSettings(prev => ({ ...prev, businessHoursText: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="7h00-19h30"
                />
              </div>
            </div>
          </div>

          {/* Zones de service */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Zones de Service
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-2 mb-4">
                {settings.serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{area}</span>
                    <button
                      onClick={() => removeServiceArea(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newServiceArea}
                  onChange={(e) => setNewServiceArea(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Île-de-France"
                />
                <button
                  onClick={addServiceArea}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* Domaines d'activité */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Domaines d'Activité
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-2 mb-4">
                {settings.domains.map((domain, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{domain}</span>
                    <button
                      onClick={() => removeDomain(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Nettoyage de chantier"
                />
                <button
                  onClick={addDomain}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsEditor
