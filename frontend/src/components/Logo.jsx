import { Link } from 'react-router-dom'
import logoUrl from '../assets/logo-alex.jpg'

const Logo = ({ className = "", showText = true, size = "default", variant = "default", showTagline = false }) => {
  const sizeClasses = {
    small: "w-12 h-12",
    default: "w-20 h-20", 
    large: "w-28 h-28"
  }

  const textSizeClasses = {
    small: "text-xl",
    default: "text-3xl",
    large: "text-4xl"
  }

  const textColorClasses = {
    default: "text-gray-900 group-hover:text-green-600",
    white: "text-white group-hover:text-green-400"
  }

  const subtextColorClasses = {
    default: "text-green-600",
    white: "text-green-400"
  }

  const taglineColorClasses = {
    default: "text-yellow-500",
    white: "text-yellow-400"
  }

  return (
    <Link to="/" className={`flex items-center group ${className}`} aria-label="Accueil - KPS Services">
      <div className="flex items-center">
        {/* Logo Icon - Formes géométriques KPS */}
        <div className={`${sizeClasses[size]} flex items-center justify-center mr-4 transition-all duration-300`}>
          <img 
            src={logoUrl} 
            alt="KPS Services Logo" 
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              // Fallback vers le SVG KPS avec les bonnes formes
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          {/* Fallback SVG - Logo KPS avec formes géométriques */}
          <svg className="w-12 h-12 hidden" viewBox="0 0 24 24">
            {/* Fond blanc */}
            <rect width="24" height="24" fill="white"/>
            {/* Cercle vert (tête) */}
            <circle cx="8" cy="6" r="2" fill="#16a34a"/>
            {/* Forme verte inclinée (bras/corps) */}
            <path d="M6 8 L10 12 L8 14 L4 10 Z" fill="#16a34a"/>
            {/* Triangle jaune (jambe) */}
            <path d="M8 14 L10 18 L6 18 Z" fill="#fbbf24"/>
            {/* Arc jaune (autre jambe) */}
            <path d="M10 12 Q14 12 14 16 Q14 18 12 18 Q10 18 10 16 Z" fill="#fbbf24"/>
          </svg>
        </div>
        
        {/* Logo Text */}
        {showText && (
          <div className="flex flex-col">
            <span className={`${textSizeClasses[size]} font-bold ${textColorClasses[variant]} transition-colors duration-300`}>
              KPS SERVICES
            </span>
            {showTagline && (
              <span className={`text-sm font-medium ${taglineColorClasses[variant]} tracking-wider`}>
                LE SERVICE AU PLURIEL
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default Logo
