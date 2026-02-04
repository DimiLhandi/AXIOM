import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import PixelParticles from './PixelParticles';

const features = [
    {
        title: "Audit initial complet",
        desc: "Analyse approfondie de votre catalogue, de votre SEO actuel et de votre positionnement sur les moteurs IA."
    },
    {
        title: "Setup technique sur mesure",
        desc: "Configuration personnalisée de notre infrastructure pour s'adapter parfaitement à votre CMS et vos workflows."
    },
    {
        title: "Génération de contenu illimitée",
        desc: "Production à grande échelle de fiches produits, pages catégories et articles de blog optimisés."
    },
    {
        title: "Optimisation continue",
        desc: "Amélioration permanente de vos contenus basée sur les données de performance et les évolutions algorithmiques."
    },
    {
        title: "Support prioritaire 7j/7",
        desc: "Équipe dédiée disponible pour répondre à vos questions et vous accompagner dans votre croissance."
    },
    {
        title: "Accès API complet",
        desc: "Documentation exhaustive et accès illimité à notre API pour automatiser vos processus internes."
    }
];

export default function Pricing() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Cycle through icons one by one
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % features.length);
        }, 1500); // Change every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="pricing" className="py-32 bg-black relative overflow-hidden">
            {/* Pixel Particles Background */}
            <PixelParticles />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Centered header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase"
                    >
                        Tarification
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
                    >
                        Chaque e-commerce est unique, c'est pourquoi nous proposons des solutions sur mesure adaptées à vos besoins spécifiques. Pas de forfait générique : nous construisons ensemble une offre personnalisée qui correspond à votre catalogue, vos objectifs de croissance et votre budget.
                    </motion.p>
                </div>

                {/* Narrower card with animated glowing border */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto relative group"
                >
                    {/* Animated border glow container */}
                    <div className="absolute -inset-[2px] rounded-3xl overflow-hidden">
                        {/* Rotating gradient - sized larger to create trailing effect on rectangle */}
                        <div
                            className="absolute inset-[-100%] animate-border-snake"
                            style={{
                                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 80deg, #7734b8 100deg, #a855f7 130deg, #c084fc 140deg, #a855f7 150deg, #7734b8 170deg, transparent 190deg, transparent 360deg)',
                            }}
                        />
                        {/* Inner glow layer for softer effect */}
                        <div
                            className="absolute inset-[-100%] animate-border-snake blur-sm opacity-70"
                            style={{
                                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 80deg, #7734b8 100deg, #a855f7 130deg, #c084fc 140deg, #a855f7 150deg, #7734b8 170deg, transparent 190deg, transparent 360deg)',
                            }}
                        />
                        {/* Outer glow layer for halo effect */}
                        <div
                            className="absolute inset-[-100%] animate-border-snake blur-lg opacity-50"
                            style={{
                                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 80deg, #7734b8 100deg, #a855f7 130deg, #c084fc 140deg, #a855f7 150deg, #7734b8 170deg, transparent 190deg, transparent 360deg)',
                            }}
                        />
                    </div>

                    {/* Inner card content */}
                    <div className="relative p-10 rounded-3xl bg-black/95 backdrop-blur-md border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center">Solution Personnalisée</h3>
                        <p className="text-[#86868b] mb-10 leading-relaxed max-w-3xl mx-auto text-center">
                            Nous analysons en profondeur votre catalogue produit, votre positionnement actuel et vos objectifs business pour construire une infrastructure de contenu parfaitement adaptée à votre marque et votre marché cible.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {features.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${activeIndex === i
                                            ? 'bg-primary shadow-[0_0_20px_rgba(119,52,184,0.6)]'
                                            : 'bg-primary/20'
                                            }`}
                                    >
                                        <Check className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-white font-semibold">{item.title}</h4>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <a href="https://calendly.com/ossmane-b1/appel-axiom-ia-infrastructure-ia?month=2026-02" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(119,52,184,0.4)] hover:shadow-[0_0_30px_rgba(119,52,184,0.6)]">
                                Discuter avec nous
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
