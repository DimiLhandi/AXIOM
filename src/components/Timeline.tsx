import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Brain, Rocket, BarChart3, CheckCircle } from 'lucide-react';
import { useRef } from 'react';
import PixelParticles from './PixelParticles';

const steps = [
  {
    id: 1,
    icon: Database,
    title: "AUDIT & ANALYSE",
    desc: "Nous réalisons une analyse approfondie de votre catalogue produit, de votre positionnement actuel sur Google et les moteurs IA, ainsi qu'une étude complète de vos concurrents. Cette phase permet d'identifier les opportunités de croissance et les lacunes à combler pour maximiser votre visibilité."
  },
  {
    id: 2,
    icon: Brain,
    title: "INFRASTRUCTURE IA",
    desc: "Configuration personnalisée de nos modèles d'intelligence artificielle sur votre Brand Voice, votre ton éditorial et vos données produits. Nous entraînons nos systèmes à comprendre votre identité de marque pour générer des contenus authentiques et cohérents avec votre image."
  },
  {
    id: 3,
    icon: Rocket,
    title: "DÉPLOIEMENT",
    desc: "Intégration transparente et sans friction avec votre CMS (Shopify, PrestaShop, WooCommerce). Notre infrastructure se connecte directement à votre back-office pour automatiser le flux de production de contenu sans intervention manuelle de votre part."
  },
  {
    id: 4,
    icon: BarChart3,
    title: "GÉNÉRATION",
    desc: "Production à grande échelle de milliers de fiches produits, descriptions SEO, contenus enrichis et métadonnées optimisées. Chaque contenu est conçu pour performer à la fois sur Google et sur les nouveaux moteurs de recherche IA comme ChatGPT et Perplexity."
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "RÉSULTATS",
    desc: "Suivi en temps réel de vos performances via notre tableau de bord dédié. Monitoring continu des positions, du trafic organique et des citations IA. Ajustements réguliers de la stratégie pour assurer une croissance durable et mesurable de votre visibilité."
  }
];



export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });


  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Pixel Particles Background */}
      <PixelParticles />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header - centered */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
          >
            Comment ça marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            Un processus structuré en 5 étapes clés, conçu pour transformer votre catalogue e-commerce en une machine à générer du trafic qualifié. De l'audit initial jusqu'au suivi des résultats, nous vous accompagnons à chaque étape de votre croissance organique.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Base line (dark) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-purple-400 via-primary to-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.7)]"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
            }}
          />

          <div className="space-y-12">
            <motion.div>
              {steps.map((step, idx) => (
                <motion.div key={step.id} className="mb-12">
                  <TimelineStepWithProgress step={step} idx={idx} scrollProgress={scrollYProgress} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* End dot */}
          <motion.div
            className="absolute left-[30px] bottom-0 w-3 h-3 rounded-full transition-all duration-500"
            style={{
              backgroundColor: useTransform(scrollYProgress, [0.9, 1], ['rgba(119,52,184,0.5)', 'rgba(167,139,250,1)']),
              boxShadow: useTransform(scrollYProgress, [0.9, 1], ['0 0 10px rgba(119,52,184,0.4)', '0 0 25px rgba(167,139,250,0.9)'])
            }}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a href="https://calendly.com/ossmane-b1/appel-axiom-ia-infrastructure-ia?month=2026-02" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(119,52,184,0.4)] hover:shadow-[0_0_30px_rgba(119,52,184,0.6)]">
            Planifier un échange
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Separate component to use motion values properly
function TimelineStepWithProgress({
  step,
  idx,
  scrollProgress
}: {
  step: typeof steps[0],
  idx: number,
  scrollProgress: any
}) {
  const stepProgress = useTransform(scrollProgress, [0, 1], [0, 5]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="relative flex items-start gap-8 pl-24"
    >
      {/* Icon circle */}
      <motion.div
        className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300"
        style={{
          backgroundColor: useTransform(stepProgress,
            [idx, idx + 0.5, idx + 1],
            ['rgba(0,0,0,1)', 'rgba(167,139,250,1)', 'rgba(119,52,184,1)']
          ),
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: useTransform(stepProgress,
            [idx - 0.5, idx, idx + 0.5],
            ['rgba(119,52,184,0.5)', 'rgba(167,139,250,1)', 'rgba(167,139,250,0.8)']
          ),
          boxShadow: useTransform(stepProgress,
            [idx - 0.5, idx, idx + 0.5],
            ['0 0 10px rgba(119,52,184,0.2)', '0 0 35px rgba(167,139,250,0.9)', '0 0 20px rgba(119,52,184,0.6)']
          ),
          scale: useTransform(stepProgress,
            [idx - 0.2, idx, idx + 0.2],
            [1, 1.1, 1]
          ),
        }}
      >
        <step.icon size={28} className="text-primary" style={{ color: 'white' }} />
      </motion.div>

      {/* Number badge */}
      <motion.div
        className="absolute left-12 -top-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center z-20"
        style={{
          backgroundColor: useTransform(stepProgress,
            [idx, idx + 0.3],
            ['rgba(119,52,184,0.5)', 'rgba(167,139,250,1)']
          ),
          color: 'white',
        }}
      >
        {step.id}
      </motion.div>

      {/* Card */}
      <motion.div
        className="flex-1 p-6 rounded-2xl backdrop-blur-md transition-all duration-300"
        style={{
          backgroundColor: useTransform(stepProgress,
            [idx - 0.5, idx, idx + 1],
            ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.06)']
          ),
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: useTransform(stepProgress,
            [idx - 0.5, idx, idx + 0.5],
            ['rgba(255,255,255,0.1)', 'rgba(119,52,184,0.5)', 'rgba(119,52,184,0.3)']
          ),
          boxShadow: useTransform(stepProgress,
            [idx - 0.5, idx, idx + 0.5],
            ['none', '0 0 25px rgba(119,52,184,0.3)', '0 0 15px rgba(119,52,184,0.2)']
          ),
        }}
      >
        <motion.h3
          className="text-lg font-bold mb-3 tracking-wide"
          style={{
            color: useTransform(stepProgress,
              [idx - 0.5, idx, idx + 1],
              ['rgba(255,255,255,0.5)', 'rgba(167,139,250,1)', 'rgba(119,52,184,1)']
            ),
          }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="leading-relaxed"
          style={{
            color: useTransform(stepProgress,
              [idx - 0.5, idx],
              ['rgba(134,134,139,0.6)', 'rgba(161,161,166,1)']
            ),
          }}
        >
          {step.desc}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
