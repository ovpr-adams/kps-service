import React from 'react'
import { MapPin } from 'lucide-react'

function Map() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <div>
          <strong className="text-green-600 font-bold text-xl">KPS Services</strong><br />
          <span className="text-gray-700">123 Avenue de la Propreté</span><br />
          <span className="text-gray-700">75001 Paris</span><br />
          <span className="text-gray-600 text-sm">Entreprise de nettoyage professionnel</span>
        </div>
      </div>
    </div>
  )
}

export default Map
