import { motion } from 'framer-motion';
import { ShoppingBag, Layers, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
  {
    icon: ShoppingBag,
    title: "Fiches Produits",
    desc: "Descriptions vendeuses et optimisées pour la conversion. Nos algorithmes génèrent des contenus uniques qui mettent en valeur les caractéristiques de vos produits tout en intégrant naturellement les mots-clés stratégiques pour maximiser votre visibilité sur Google et les moteurs IA."
  },
  {
    icon: Layers,
    title: "Pages Catégories",
    desc: "Contenu riche et structuré pour capter la longue traîne. Nous créons des pages catégories complètes avec des textes d'introduction, des guides d'achat et des descriptions qui répondent aux questions de vos clients avant même qu'ils ne les posent."
  },
  {
    icon: FileText,
    title: "Blog & Guides",
    desc: "Articles d'expert qui positionnent votre marque comme référence du secteur. Nos contenus éducatifs attirent un trafic qualifié, renforcent votre autorité thématique et génèrent des backlinks naturels vers votre boutique."
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle through icons one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 1500); // Change every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="fonctionnalites" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Centered header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
          >
            Nos Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            Des outils puissants conçus pour les e-commerces modernes. Notre suite de services couvre l'ensemble de vos besoins en création de contenu, de la fiche produit au blog en passant par les pages catégories stratégiques.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${activeIndex === idx
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(119,52,184,0.6)]'
                  : 'bg-primary/10 text-primary'
                  }`}
              >
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-[#86868b] leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
