import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Nettoyage industriel', href: '/services#industriel' },
    { name: 'Lavage de vitres', href: '/services#vitres' },
    { name: 'Entretien bureaux', href: '/services#bureaux' },
    { name: 'Nettoyage après travaux', href: '/services#travaux' },
    { name: 'Nettoyage copropriétés', href: '/services#coproprietes' },
    { name: 'Maintenance préventive', href: '/services#maintenance' }
  ]

  const quickLinks = [
    { name: 'À propos', href: '/about' },
    { name: 'Nos services', href: '/services' },
    { name: 'Références', href: '/references' },
    { name: 'Devis en ligne', href: '/quote' },
    { name: 'Contact', href: '/contact' },
    { name: 'Recrutement', href: '/careers' }
  ]

  const legalLinks = [
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Conditions générales', href: '/terms' },
    { name: 'Plan du site', href: '/sitemap' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/kpsservices' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/kps-services' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/kpsservices' }
  ]

  return (
    <footer id="footer" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 mb-12">
          {/* Company Info & Logo */}
          <div className="xl:col-span-1 lg:col-span-2">
            <Link to="/" className="inline-flex items-center group mb-6" aria-label="Accueil - KPS Services">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mr-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">KPS</span>
                <span className="text-base font-semibold text-green-400 tracking-wider">SERVICES</span>
              </div>
            </Link>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              L'expertise du nettoyage professionnel au service de vos espaces. Nous intervenons en Île-de-France pour tous vos besoins de nettoyage industriel, entretien de bureaux et lavage de vitres.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={20} className="text-green-400 flex-shrink-0" />
                <span className="font-medium">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={20} className="text-green-400 flex-shrink-0" />
                <span className="font-medium">contact@kps-services.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={20} className="text-green-400 flex-shrink-0" />
                <span className="font-medium">Île-de-France & environs</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock size={20} className="text-green-400 flex-shrink-0" />
                <span className="font-medium">Lun-Ven: 8h-18h</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={`Suivez-nous sur ${social.name}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400 relative">
              Nos Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-400"></span>
            </h3>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-base flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400 relative">
              Liens Utiles
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-400"></span>
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-base flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} KPS Services. Tous droits réservés.
            </div>

            {/* Legal Links */}
            <nav aria-label="Liens légaux">
              <ul className="flex flex-wrap items-center space-x-6 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Restez informé de nos actualités
            </h3>
            <p className="text-gray-300 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos conseils d'entretien et nos offres exclusives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Adresse email pour la newsletter"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
