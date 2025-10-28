import { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext(null)

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/settings')
        const data = await res.json()
        if (res.ok) {
          setSettings(data.data)
        } else {
          throw new Error(data.message || 'Erreur de chargement des paramètres')
        }
      } catch (e) {
        setError(e.message)
        // Fallback aux valeurs par défaut
        setSettings({
          phone: '+33652323256',
          serviceAreas: ['Île-de-France', 'Nantes', 'Rouen'],
          publicEmails: ['contact@kpsservices.fr', 'commercial@kpsservices.fr'],
          foundedYear: 2002,
          teamSize: '+35',
          businessHoursText: '7h00-19h30'
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, setSettings, loading, error }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)


