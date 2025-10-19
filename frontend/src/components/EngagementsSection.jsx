import { motion } from 'framer-motion'
import { CheckCircle, Leaf, Shield, Clock } from 'lucide-react'

const EngagementsSection = () => {
  const engagements = [
    {
      id: 1,
      icon: CheckCircle,
      title: 'Qualité',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500'
    },
    {
      id: 2,
      icon: Leaf,
      title: 'Écologie',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500'
    },
    {
      id: 3,
      icon: CheckCircle,
      title: 'Sécurité',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Réactivité',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section className="py-20 bg-white" aria-labelledby="engagements-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            id="engagements-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            NOS ENGAGEMENTS
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {engagements.map((engagement) => {
            const Icon = engagement.icon
            return (
              <motion.div
                key={engagement.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <div className={`w-20 h-20 ${engagement.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-all duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {engagement.title}
                </h3>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default EngagementsSection

