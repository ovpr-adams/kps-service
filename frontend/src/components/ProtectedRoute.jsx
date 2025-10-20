import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  const token = localStorage.getItem('adminToken')
  if (!token) {
    return null // Le composant sera redirigé
  }

  return children
}

export default ProtectedRoute
