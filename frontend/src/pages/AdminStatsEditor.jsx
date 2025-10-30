import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  ArrowLeft, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Eye
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { API_URLS, getAuthHeaders } from '../config/api'

const AdminStatsEditor = () => {
  const [stats, setStats] = useState([])
  const [dashboardStats, setDashboardStats] = useState({
    totalQuotes: 0,
    totalContacts: 0,
    totalServices: 0,
    totalStats: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [quotes, setQuotes] = useState([])
  const [contacts, setContacts] = useState([])
  const [services, setServices] = useState([])
  const navigate = useNavigate()

  // Couleurs pour les graphiques
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  // Vérifier l'authentification
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadAllData()
  }, [navigate])

  const loadAllData = async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        loadStats(),
        loadDashboardData()
      ])
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setMessage({ type: 'error', text: 'Erreur lors du chargement des données' })
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch(API_URLS.STATS, {
        headers: getAuthHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data.data || data)
      } else {
        console.error('Erreur lors du chargement des statistiques')
      }
    } catch (error) {
      console.error('Erreur stats:', error)
    }
  }

  const loadDashboardData = async () => {
    try {
      const [quotesRes, contactsRes, servicesRes] = await Promise.all([
        fetch(API_URLS.QUOTES, { headers: getAuthHeaders() }),
        fetch(API_URLS.CONTACTS, { headers: getAuthHeaders() }),
        fetch(API_URLS.SERVICES, { headers: getAuthHeaders() })
      ])

      let totalQuotes = 0, totalContacts = 0, totalServices = 0

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json()
        const quotesArray = Array.isArray(quotesData) ? quotesData : (quotesData.data || [])
        setQuotes(quotesArray)
        totalQuotes = quotesArray.length
      }

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        const contactsArray = Array.isArray(contactsData) ? contactsData : (contactsData.data || [])
        setContacts(contactsArray)
        totalContacts = contactsArray.length
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        const servicesArray = Array.isArray(servicesData) ? servicesData : (servicesData.data || [])
        setServices(servicesArray)
        totalServices = servicesArray.length
      }

      setDashboardStats({
        totalQuotes,
        totalContacts,
        totalServices,
        totalStats: stats.length
      })
    } catch (error) {
      console.error('Erreur dashboard data:', error)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setMessage({ type: '', text: '' })
    
    try {
      await loadAllData()
      setMessage({ type: 'success', text: 'Données rafraîchies avec succès !' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors du rafraîchissement' })
    } finally {
      setIsRefreshing(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Données pour les graphiques
  const chartData = [
    { name: 'Devis', value: dashboardStats.totalQuotes, color: COLORS[0] },
    { name: 'Messages', value: dashboardStats.totalContacts, color: COLORS[1] },
    { name: 'Services', value: dashboardStats.totalServices, color: COLORS[2] },
    { name: 'Statistiques', value: dashboardStats.totalStats, color: COLORS[3] }
  ]

  const monthlyData = [
    { month: 'Jan', quotes: 12, contacts: 8 },
    { month: 'Fév', quotes: 19, contacts: 15 },
    { month: 'Mar', quotes: 15, contacts: 12 },
    { month: 'Avr', quotes: 22, contacts: 18 },
    { month: 'Mai', quotes: 18, contacts: 14 },
    { month: 'Juin', quotes: 25, contacts: 20 }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
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
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Statistiques Globales</h1>
                <p className="text-sm text-gray-500">Analyse des données et performances</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Rafraîchir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Devis</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalQuotes}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalContacts}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalServices}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Statistiques</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalStats}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Graphique en barres */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Mensuelle</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quotes" fill={COLORS[0]} name="Devis" />
                    <Bar dataKey="contacts" fill={COLORS[1]} name="Messages" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique en secteurs */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Données</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Statistiques Détaillées</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat._id || index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{stat.title}</h4>
                      <span className="text-2xl font-bold text-green-600">
                        {stat.value}{stat.unit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Ordre: {stat.order}</p>
                    {stat.icon && (
                      <p className="text-sm text-gray-500 mt-1">Icône: {stat.icon}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Derniers devis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Derniers Devis</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {quotes.slice(0, 5).map((quote) => (
                    <div key={quote._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{quote.company}</p>
                        <p className="text-sm text-gray-600">{quote.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formatDate(quote.createdAt)}</p>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          {quote.status || 'En attente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Derniers messages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Derniers Messages</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formatDate(contact.createdAt)}</p>
                        <button className="text-green-600 hover:text-green-800">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatsEditor
