import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import PixelParticles from './PixelParticles';

const questions = [
  {
    q: "Comment l'IA peut-elle citer mes produits ?",
    a: "Nous structurons vos données produits selon les standards sémantiques reconnus par les grands modèles de langage (LLMs). Notre infrastructure optimise le balisage Schema.org, enrichit vos métadonnées et crée des contenus spécifiquement conçus pour être ingérés et cités préférentiellement par ChatGPT, Perplexity et les autres assistants IA. Résultat : votre marque devient une source de référence dans les réponses conversationnelles."
  },
  {
    q: "Quelle est la différence avec le SEO classique ?",
    a: "Le SEO classique vise à positionner vos pages dans les résultats de recherche traditionnels. Notre approche GEO (Generative Engine Optimization) va plus loin : nous optimisons votre contenu pour apparaître comme la 'réponse unique' dans les conversations IA. Plutôt que de concurrencer 10 liens bleus, vous devenez LA recommandation quand un utilisateur demande un conseil d'achat à son assistant."
  },
  {
    q: "Combien de temps avant de voir les premiers résultats ?",
    a: "La génération de contenu est immédiate : vos fiches produits et articles sont créés en quelques heures. Pour l'indexation par Google, comptez 2 à 4 semaines selon l'autorité de votre domaine. Pour les citations IA, les résultats varient entre 4 et 8 semaines, le temps que les modèles intègrent vos nouvelles données dans leur base de connaissances lors de leurs mises à jour."
  },
  {
    q: "Les contenus générés sont-ils vraiment uniques ?",
    a: "Absolument. Chaque description est générée spécifiquement pour votre produit, votre Brand Voice et votre positionnement marché. Nous n'utilisons pas de templates génériques. Nos algorithmes analysent vos caractéristiques produits, votre ton éditorial et votre audience cible pour créer des contenus authentiques qui reflètent votre identité de marque tout en étant optimisés pour la conversion."
  },
  {
    q: "Est-ce compatible avec mon CMS et ma stack technique ?",
    a: "Oui, nous avons développé des connecteurs natifs pour les principales plateformes e-commerce : Shopify, Magento, WooCommerce, PrestaShop et BigCommerce. Pour les solutions sur mesure ou headless, nous proposons une API REST complète avec documentation exhaustive, webhooks temps réel et SDK dans plusieurs langages. L'intégration est transparente et ne nécessite aucune modification de votre infrastructure existante."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pt-16 pb-32 bg-black relative overflow-hidden">
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
            Questions Fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            Vous avez des questions sur notre approche, notre technologie ou notre processus d'intégration ? Retrouvez ci-dessous les réponses aux interrogations les plus fréquentes de nos clients.
          </motion.p>
        </div>

        {/* Full-width accordion */}
        <div className="space-y-4">
          {questions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md ${openIndex === idx
                ? 'bg-white/10 border border-primary/50'
                : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-semibold text-lg pr-8 transition-colors ${openIndex === idx ? 'text-primary' : 'text-white'}`}>
                  {item.q}
                </span>
                {openIndex === idx ? (
                  <Minus className="text-primary flex-shrink-0" size={20} />
                ) : (
                  <Plus className="text-[#86868b] flex-shrink-0" size={20} />
                )}
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-[#a1a1a6] leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
