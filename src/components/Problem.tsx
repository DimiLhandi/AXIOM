import { SearchX, TrendingDown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const problems = [
  {
    icon: SearchX,
    title: "Invisible pour les IA",
    desc: "Vos produits n'apparaissent pas quand les utilisateurs demandent des conseils d'achat à ChatGPT."
  },
  {
    icon: TrendingDown,
    title: "Trafic SEO en baisse",
    desc: "Les moteurs de réponse IA volent progressivement les clics des moteurs de recherche traditionnels."
  },
  {
    icon: Clock,
    title: "Production lente",
    desc: "Créer manuellement des milliers de fiches produits et d'articles optimisés est impossible."
  }
];

export default function Problem() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle through icons one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % problems.length);
    }, 1500); // Change every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="probleme" className="relative pt-20 pb-20">
      {/* Background now handled by parent wrapper in App.tsx */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header - centered */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
          >
            Le défi des e-commerces modernes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[#86868b] max-w-2xl mx-auto"
          >
            Le paysage de la recherche change. Si vous n'êtes pas optimisé pour l'IA, vous disparaissez.
          </motion.p>
        </div>

        {/* Problem cards - left aligned */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${activeIndex === idx
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(119,52,184,0.6)]'
                  : 'bg-primary/10 text-primary'
                  }`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
              <p className="text-[#86868b] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
