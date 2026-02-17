import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Timeline from './components/Timeline';
import Services from './components/Services';
import Benefits from './components/Benefits';

import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PixelParticles from './components/PixelParticles';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* Hero + Problem with shared animated background */}
        <div className="relative overflow-hidden">
          {/* Shared animated gradient background */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
              <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-900/40 rounded-full blur-3xl animate-blob animation-delay-2000" />
              <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl animate-blob" />
            </div>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Hero />
            <Problem />
          </div>
        </div>

        <Solution />
        <Timeline />

        {/* Services + Benefits with shared animated background */}
        <div className="relative overflow-hidden">
          {/* Shared animated gradient background */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/3 right-10 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
              <div className="absolute top-1/2 -left-10 w-72 h-72 bg-purple-900/35 rounded-full blur-3xl animate-blob animation-delay-4000" />
              <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
              <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-900/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Services />
            <Benefits />
          </div>
        </div>


        <FAQ />

        {/* Final CTA Section */}
        <section className="pt-16 pb-32 bg-black relative overflow-hidden">
          {/* Pixel Particles Background */}
          <PixelParticles />

          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
            >
              Prêt à dominer la recherche IA ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-[#86868b] mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Commencez votre transformation dès aujourd'hui et positionnez votre e-commerce comme la référence incontournable sur Google et les moteurs de recherche IA. Nos experts sont prêts à analyser votre catalogue et à construire une stratégie sur mesure pour maximiser votre visibilité.
            </motion.p>
            <motion.a
              href="https://calendly.com/ossmane-b1/appel-axiom-ia-infrastructure-ia?month=2026-02"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-10 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(119,52,184,0.4)] hover:shadow-[0_0_30px_rgba(119,52,184,0.6)]"
            >
              Planifier un échange
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
