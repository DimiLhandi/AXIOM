import { motion } from 'framer-motion';
import { Search, Bot, Sparkles, Brain, MessageSquare, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import PixelParticles from './PixelParticles';
import { useTheme } from '../context/ThemeContext';



// A-shape path points for icons (following the A outline)
const aShapePath = [
  { x: 0, y: -170 },    // Top apex
  { x: 80, y: -20 },    // Right at crossbar level
  { x: 140, y: 130 },   // Right foot
  { x: -140, y: 130 },  // Left foot
  { x: -80, y: -20 },   // Left at crossbar level
];

export default function Solution() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [pathProgress, setPathProgress] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 2);
    }, 1500);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setPathProgress((prev) => (prev + 1) % 5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getIconPosition = (iconIndex: number) => {
    const posIndex = (iconIndex + pathProgress) % 5;
    return aShapePath[posIndex];
  };

  const aiIcons = [
    { icon: Sparkles, label: 'Gemini' },
    { icon: Sparkles, label: 'Perplexity' },
    { icon: Brain, label: 'Assistants IA' },
    { icon: Globe, label: 'Google Search' },
    { icon: MessageSquare, label: 'ChatGPT' },
  ];

  return (
    <section id="solution" className="py-32 bg-black relative overflow-hidden">
      {/* Pixel Particles Background */}
      <PixelParticles />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Column */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 uppercase"
            >
              <span className="text-white">NOTRE APPROCHE </span>
              <span className="text-primary">DOUBLE OPTIMISATION</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-[#86868b] mb-12 leading-relaxed"
            >
              Axiom IA ne choisit pas entre le passé et le futur. Nous fusionnons les meilleures pratiques SEO techniques avec les nouveaux standards de l'optimisation générative (GEO).
            </motion.p>

            <div className="space-y-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${activeIndex === 0
                    ? 'bg-purple-400 text-white shadow-[0_0_25px_rgba(167,139,250,0.7)]'
                    : 'bg-white/5 backdrop-blur-md border border-white/10 text-primary'
                    }`}
                >
                  <Search size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">SEO Traditionnel</h3>
                  <p className="text-[#86868b] leading-relaxed">
                    Structure technique impeccable, maillage interne, balisage Schema.org pour Google.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${activeIndex === 1
                    ? 'bg-purple-400 text-white shadow-[0_0_25px_rgba(167,139,250,0.7)]'
                    : 'bg-white/5 backdrop-blur-md border border-white/10 text-primary'
                    }`}
                >
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Optimisation AI-First</h3>
                  <p className="text-[#86868b] leading-relaxed">
                    Contenu sémantique riche et structuré pour être compris et cité par les LLMs.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.a
              href="https://calendly.com/ossmane-b1/appel-axiom-ia-infrastructure-ia?month=2026-02"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(119,52,184,0.4)] hover:shadow-[0_0_30px_rgba(119,52,184,0.6)]"
            >
              Planifier un échange
            </motion.a>
          </div>

          {/* Right Column - Clean 3D Letter A */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] hidden lg:flex items-center justify-center"
          >
            {/* Axiom Logo Image - Replacing 3D SVG */}
            <motion.div
              className="absolute flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/logo_axiom_a.png"
                alt="Axiom IA Logo"
                className="w-[480px] h-[480px] object-contain drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]"
              />
            </motion.div>

            {/* 5 AI icons around the A */}
            {aiIcons.map((item, idx) => {
              const pos = getIconPosition(idx);
              const isActive = idx === pathProgress;

              return (
                <motion.div
                  key={idx}
                  className="absolute z-20"
                  animate={{ x: pos.x, y: pos.y }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                      ? 'bg-purple-400 text-white shadow-[0_0_30px_rgba(167,139,250,0.9)] scale-110'
                      : isLight
                        ? 'bg-white/90 backdrop-blur-md border border-primary/30 text-primary shadow-lg'
                        : 'bg-black/80 backdrop-blur-md border border-white/30 text-[#86868b]'
                      }`}
                  >
                    <item.icon size={20} />
                  </div>
                  <p className={`text-[10px] text-center mt-1 whitespace-nowrap transition-all duration-500 ${isActive
                    ? 'text-purple-400 font-medium'
                    : isLight
                      ? 'text-gray-700 font-medium'
                      : 'text-[#86868b]'
                    }`}>
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
