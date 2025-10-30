import { useEffect } from 'react'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { Loader2, Shield } from 'lucide-react'

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, requireAuth } = useAdminAuth()

  useEffect(() => {
    if (!isLoading) {
      requireAuth()
    }
  }, [isLoading, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
            <Shield className="h-6 w-6 text-green-600 absolute top-3 left-1/2 transform -translate-x-1/2" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Vérification de l'authentification...</p>
          <p className="text-sm text-gray-500">Sécurisation de l'accès administrateur</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Accès Refusé</h2>
            <p className="text-red-600 mb-4">
              Vous devez être connecté en tant qu'administrateur pour accéder à cette page.
            </p>
            <p className="text-sm text-red-500">
              Redirection vers la page de connexion...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default AdminProtectedRoute
