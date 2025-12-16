import Hero from '../components/Hero'
import EngagementsSection from '../components/EngagementsSection'

const Home = () => {
  return (
    <main>
      <Hero />
      <EngagementsSection />
      {/* Section avec image de fond en bas de la page d'accueil */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero-bg-2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Votre Partenaire de Confiance
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Depuis 2002, KPS Services vous accompagne avec professionnalisme et expertise dans tous vos projets de nettoyage et d'entretien.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home
