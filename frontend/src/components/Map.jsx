import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Icône personnalisée pour KPS Services
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: #10B981;
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

function Map() {
  // Coordonnées de KPS Services (Paris)
  const position = [48.8566, 2.3522] // Paris, France
  const zoom = 13

  useEffect(() => {
    // Ajouter les styles CSS pour l'icône personnalisée
    const style = document.createElement('style')
    style.textContent = `
      .custom-div-icon {
        background: transparent !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      .leaflet-popup-content {
        margin: 16px;
        font-family: inherit;
      }
      .leaflet-popup-tip {
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={createCustomIcon()}>
          <Popup>
            <div className="text-center p-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <strong className="text-green-600 font-bold text-lg">KPS Services</strong>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="font-medium">123 Avenue de la Propreté</p>
                <p>75001 Paris, France</p>
                <p className="text-gray-500 mt-1">Entreprise de nettoyage professionnel</p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Métro: Châtelet-Les Halles<br />
                  Lignes 1, 4, 7, 11, 14
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
