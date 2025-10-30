import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URLS } from '../config/api'

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = getCookie('adminToken')
      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      // Vérifier la validité du token avec le backend
      const response = await fetch(API_URLS.AUTH_PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.data || userData)
        setIsAuthenticated(true)
      } else {
        // Token invalide, supprimer le cookie
        deleteCookie('adminToken')
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      console.error('Erreur de vérification d\'authentification:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const response = await fetch(API_URLS.AUTH_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        const token = data.token || data.data?.token
        
        if (token) {
          // Stocker le token dans un cookie httpOnly sécurisé
          setCookie('adminToken', token, {
            httpOnly: true,
            secure: window.location.protocol === 'https:',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 // 30 jours
          })
          
          setUser(data.user || data.data?.user)
          setIsAuthenticated(true)
          return { success: true, user: data.user || data.data?.user }
        }
      }
      
      const errorData = await response.json()
      return { success: false, error: errorData.message || 'Erreur de connexion' }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return { success: false, error: 'Erreur de connexion' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(() => {
    // Supprimer le cookie
    deleteCookie('adminToken')
    
    // Nettoyer l'état local
    setIsAuthenticated(false)
    setUser(null)
    
    // Rediriger vers la page de connexion
    navigate('/admin/login')
  }, [navigate])

  const requireAuth = useCallback(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/admin/login')
      return false
    }
    return isAuthenticated
  }, [isAuthenticated, isLoading, navigate])

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    requireAuth,
    checkAuthStatus
  }
}

// Utilitaires pour les cookies
const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${value}`
  
  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`
  }
  
  if (options.httpOnly) {
    cookieString += '; httpOnly'
  }
  
  if (options.secure) {
    cookieString += '; secure'
  }
  
  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`
  }
  
  if (options.path) {
    cookieString += `; path=${options.path}`
  } else {
    cookieString += '; path=/'
  }
  
  document.cookie = cookieString
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export default useAdminAuth
