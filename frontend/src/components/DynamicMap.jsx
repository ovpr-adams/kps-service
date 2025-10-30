import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'
import { API_URLS, getPublicHeaders } from '../config/api'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Icône personnalisée pour KPS Services
const createCustomIcon = (color = '#10B981') => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

function DynamicMap({ 
  height = '400px', 
  showMultipleLocations = false,
  className = '' 
}) {
  const [settings, setSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Coordonnées par défaut (Paris)
  const defaultPosition = [48.8566, 2.3522]
  const defaultZoom = 13

  // Coordonnées des zones de service (exemple)
  const serviceAreas = [
    { name: 'Paris', position: [48.8566, 2.3522], color: '#10B981' },
    { name: 'Nantes', position: [47.2184, -1.5536], color: '#3B82F6' },
    { name: 'Rouen', position: [49.4432, 1.0993], color: '#F59E0B' }
  ]

  useEffect(() => {
    loadSettings()
    addMapStyles()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch(API_URLS.SETTINGS, {
        headers: getPublicHeaders()
      })
      
      if (response.ok) {
        const data = await response.json()
        setSettings(data.data || data)
      } else {
        console.warn('Impossible de charger les paramètres, utilisation des valeurs par défaut')
      }
    } catch (error) {
      console.warn('Erreur de chargement des paramètres:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addMapStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-div-icon {
        background: transparent !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.1);
      }
      .leaflet-popup-content {
        margin: 0;
        font-family: inherit;
        min-width: 250px;
      }
      .leaflet-popup-tip {
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      .leaflet-control-zoom {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      }
      .leaflet-control-zoom a {
        border-radius: 4px;
        font-weight: bold;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }

  if (isLoading) {
    return (
      <div 
        className={`w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div 
        className={`w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Carte temporairement indisponible</p>
        </div>
      </div>
    )
  }

  const getMapCenter = () => {
    if (settings?.serviceAreas?.length > 0) {
      // Utiliser la première zone de service comme centre
      const firstArea = settings.serviceAreas[0]
      if (firstArea === 'Paris') return [48.8566, 2.3522]
      if (firstArea === 'Nantes') return [47.2184, -1.5536]
      if (firstArea === 'Rouen') return [49.4432, 1.0993]
    }
    return defaultPosition
  }

  const getMapZoom = () => {
    return showMultipleLocations ? 6 : defaultZoom
  }

  const getMarkers = () => {
    if (showMultipleLocations) {
      return serviceAreas.map((area, index) => (
        <Marker 
          key={index} 
          position={area.position} 
          icon={createCustomIcon(area.color)}
        >
          <Popup>
            <div className="text-center p-2">
              <div className="flex items-center justify-center mb-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: area.color }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <strong className="font-bold text-lg">{area.name}</strong>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="font-medium">KPS Services - {area.name}</p>
                <p className="text-gray-500">Zone de service</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))
    } else {
      // Marqueur unique pour le siège social
      return (
        <Marker position={getMapCenter()} icon={createCustomIcon('#10B981')}>
          <Popup>
            <div className="text-center p-4">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="text-green-600 font-bold text-lg">KPS Services</strong>
                  <p className="text-sm text-gray-500">Siège Social</p>
                </div>
              </div>
              
              <div className="text-gray-700 text-sm space-y-2">
                <div className="flex items-center">
                  <Navigation className="w-4 h-4 mr-2 text-gray-500" />
                  <span>123 Avenue de la Propreté, 75001 Paris</span>
                </div>
                
                {settings?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <a href={`tel:${settings.phone}`} className="hover:text-green-600">
                      {settings.phone}
                    </a>
                  </div>
                )}
                
                {settings?.publicEmails?.[0] && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <a href={`mailto:${settings.publicEmails[0]}`} className="hover:text-green-600">
                      {settings.publicEmails[0]}
                    </a>
                  </div>
                )}
                
                {settings?.businessHoursText && (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      <strong>Horaires:</strong> {settings.businessHoursText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      )
    }
  }

  return (
    <div 
      className={`w-full rounded-2xl overflow-hidden shadow-lg ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={getMapCenter()}
        zoom={getMapZoom()}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getMarkers()}
      </MapContainer>
    </div>
  )
}

export default DynamicMap
