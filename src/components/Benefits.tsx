import { motion } from 'framer-motion';
import { Rocket, Target, ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const benefits = [
  {
    icon: Rocket,
    title: "Croissance Rapide",
    desc: "Trafic organique multiplié par 3 en moyenne. Nos clients constatent une augmentation significative de leurs visiteurs qualifiés dès les premiers mois de collaboration."
  },
  {
    icon: Target,
    title: "Ciblage Précis",
    desc: "Nous captons vos clients au moment exact de leur intention d'achat. Nos contenus sont optimisés pour répondre aux requêtes commerciales à forte valeur."
  },
  {
    icon: ShieldCheck,
    title: "Qualité Garantie",
    desc: "Validation humaine systématique de tous les contenus générés. Notre équipe d'experts vérifie la cohérence, le ton et l'exactitude de chaque livrable."
  },
  {
    icon: Zap,
    title: "Mise en Place Éclair",
    desc: "Intégration complète en moins de 48 heures. Notre processus d'onboarding est conçu pour vous permettre de démarrer rapidement sans friction technique."
  },
  {
    icon: Globe,
    title: "Analytics Avancées",
    desc: "Tableaux de bord en temps réel pour suivre vos performances. Visualisez l'évolution de votre trafic, vos positions et vos citations IA en un coup d'œil."
  },
  {
    icon: Users,
    title: "Support Dédié",
    desc: "Une équipe d'experts à votre disposition pour vous accompagner. Account manager dédié, réponse sous 24h et sessions de stratégie mensuelles incluses."
  },
];

export default function Benefits() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle through icons one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 1500); // Change every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-16 pb-32 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Centered header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
          >
            Pourquoi Axiom IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            Des résultats mesurables et une approche centrée sur la performance. Découvrez comment Axiom IA transforme votre stratégie de contenu et booste votre visibilité organique.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${activeIndex === idx
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(119,52,184,0.6)]'
                  : 'bg-primary/10 text-primary'
                  }`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[#86868b] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
