import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  BarChart3, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  Plus
} from 'lucide-react'
import { API_URLS, getAuthHeaders } from '../config/api'
import { useAdminAuth } from '../hooks/useAdminAuth'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalContacts: 0,
    totalServices: 0,
    pendingQuotes: 0
  })
  const [quotes, setQuotes] = useState([])
  const [contacts, setContacts] = useState([])
  const [services, setServices] = useState([])
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  // Charger les données du dashboard
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      const [quotesRes, contactsRes, servicesRes] = await Promise.all([
        fetch(API_URLS.QUOTES, {
          headers: getAuthHeaders(),
          credentials: 'include'
        }),
        fetch(API_URLS.CONTACTS, {
          headers: getAuthHeaders(),
          credentials: 'include'
        }),
        fetch(API_URLS.SERVICES, {
          headers: getAuthHeaders(),
          credentials: 'include'
        })
      ])

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json()
        console.log('quotes data:', quotesData)
        // Vérifier si c'est un tableau ou extraire le tableau de la réponse
        const quotesArray = Array.isArray(quotesData) ? quotesData : (quotesData.data || [])
        setQuotes(quotesArray)
        setStats(prev => ({ ...prev, totalQuotes: quotesArray.length }))
      } else {
        console.error('Erreur quotes:', quotesRes.status, await quotesRes.text())
      }

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        console.log('contacts data:', contactsData)
        const contactsArray = Array.isArray(contactsData) ? contactsData : (contactsData.data || [])
        setContacts(contactsArray)
        setStats(prev => ({ ...prev, totalContacts: contactsArray.length }))
      } else {
        console.error('Erreur contacts:', contactsRes.status, await contactsRes.text())
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        console.log('services data:', servicesData)
        const servicesArray = Array.isArray(servicesData) ? servicesData : (servicesData.data || [])
        setServices(servicesArray)
        setStats(prev => ({ ...prev, totalServices: servicesArray.length }))
      } else {
        console.error('Erreur services:', servicesRes.status, await servicesRes.text())
      }

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
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
              <div className="h-10 w-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mr-3">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration KPS</h1>
                <p className="text-sm text-gray-500">Tableau de bord</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'quotes', label: 'Devis', icon: FileText },
              { id: 'contacts', label: 'Messages', icon: MessageSquare },
              { id: 'services', label: 'Services', icon: Settings },
              { id: 'content', label: 'Contenu', icon: Edit }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Devis</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalQuotes}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Services</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingQuotes}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                      onClick={() => navigate('/admin/pages')}
                      className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">Éditeur de pages</p>
                        <p className="text-sm text-gray-600">Modifier le contenu du site</p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin/services')}
                      className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Settings className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">Gérer les services</p>
                        <p className="text-sm text-gray-600">Ajouter/modifier des services</p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin/hero')}
                      className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Edit className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">Éditeur Hero</p>
                        <p className="text-sm text-gray-600">Modifier la page d'accueil</p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin/engagements')}
                      className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">Engagements</p>
                        <p className="text-sm text-gray-600">Modifier les engagements</p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin/about')}
                      className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">À propos</p>
                        <p className="text-sm text-gray-600">Modifier les sections About</p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin/quotes')}
                      className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-3 text-left">
                        <p className="font-medium text-gray-900">Gérer les devis</p>
                        <p className="text-sm text-gray-600">Voir et traiter les demandes</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Activité récente */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.isArray(quotes) && quotes.slice(0, 5).map((quote) => (
                      <div key={quote._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{quote.company}</p>
                          <p className="text-sm text-gray-600">{quote.service}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{formatDate(quote.createdAt)}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                            {quote.status || 'En attente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gestion des devis */}
          {activeTab === 'quotes' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des devis</h3>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau devis
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{quote.company}</div>
                            <div className="text-sm text-gray-500">{quote.contactName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(quote.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                            {quote.status || 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-green-600 hover:text-green-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gestion des messages */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Messages reçus</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <div key={contact._id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{contact.name}</h4>
                          <span className="text-sm text-gray-500">{contact.email}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{contact.subject}</p>
                        <p className="mt-2 text-sm text-gray-700">{contact.message}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm text-gray-500">{formatDate(contact.createdAt)}</p>
                        <div className="mt-2 flex space-x-2">
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gestion des services */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un service
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{service.price}€</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestion du Contenu</h2>
                <p className="text-gray-600 mt-2">Modifier le contenu des différentes sections du site</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                  onClick={() => navigate('/admin/hero')}
                  className="flex items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200"
                >
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Edit className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Page d'Accueil</h3>
                    <p className="text-sm text-gray-600">Titre, sous-titre, CTA, services</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/engagements')}
                  className="flex items-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 border border-yellow-200"
                >
                  <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Engagements</h3>
                    <p className="text-sm text-gray-600">Qualité, Écologie, Sécurité, Réactivité</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/about')}
                  className="flex items-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 border border-indigo-200"
                >
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">À Propos</h3>
                    <p className="text-sm text-gray-600">Histoire, Équipe, Valeurs</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/pages')}
                  className="flex items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200"
                >
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Pages</h3>
                    <p className="text-sm text-gray-600">Contenu des pages statiques</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/settings')}
                  className="flex items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
                >
                  <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    <Settings className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Paramètres du Site</h3>
                    <p className="text-sm text-gray-600">Téléphone, horaires, zones, emails</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/stats')}
                  className="flex items-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 border border-indigo-200"
                >
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Statistiques Globales</h3>
                    <p className="text-sm text-gray-600">Graphiques et analyses des données</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/admin/references')}
                  className="flex items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200"
                >
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Références</h3>
                    <p className="text-sm text-gray-600">Clients et projets</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
