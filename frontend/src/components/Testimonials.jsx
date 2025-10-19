import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      company: 'Directrice RH - Entreprise TechCorp',
      content: 'KPS Services nous accompagne depuis 3 ans dans l\'entretien de nos bureaux. Leur équipe est professionnelle, ponctuelle et le résultat est toujours impeccable.',
      rating: 5
    },
    {
      id: 2,
      name: 'Jean-Michel Leroy',
      company: 'Gérant - Immeuble de bureaux Centre Ville',
      content: 'Le nettoyage industriel de nos locaux communs est effectué avec un grand professionnalisme. Nous recommandons vivement leurs services.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sophie Martin',
      company: 'Facility Manager - Complexe Commercial',
      content: 'Service de lavage de vitres exceptionnel. Ils interviennent en hauteur en toute sécurité et le résultat dépasse nos attentes à chaque fois.',
      rating: 5
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 relative"
            >
              <Quote className="w-12 h-12 text-primary/20 absolute top-4 right-4" />

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-secondary">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-secondary mb-4">
              Votre satisfaction est notre priorité
            </h3>
            <p className="text-gray-600">
              Rejoignez nos nombreux clients satisfaits et bénéficiez vous aussi
              d'un service de nettoyage professionnel de qualité.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
