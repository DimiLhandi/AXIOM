import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import SolarSystem from './ui/SolarSystem';

// Logo URLs for the bottom carousel - original 3 logos
const logos = [
  { name: 'Shopify', src: 'https://cdn.simpleicons.org/shopify/86868b' },
  { name: 'PrestaShop', src: 'https://cdn.simpleicons.org/prestashop/86868b' },
  { name: 'WooCommerce', src: 'https://cdn.simpleicons.org/woocommerce/86868b' },
];

// Words for typewriter animation
const typewriterWords = ['GOOGLE', 'GEMINI', 'PERPLEXITY', 'CHATGPT'];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <section className="relative overflow-hidden pt-40 pb-20">
      {/* Background now handled by parent wrapper in App.tsx */}

      {/* Solar System - Bubbles orbiting around the title */}
      <SolarSystem />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">

        {/* Badge - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 border ${isLight
            ? 'bg-primary/10 border-primary/30'
            : 'bg-[#1d1d1f] border-[#424245]'
            }`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-primary' : 'bg-white'}`} />
          <span className={`text-sm font-medium ${isLight ? 'text-primary' : 'text-white'}`}>
            E-commerces en pleine croissance
          </span>
        </motion.div>

        {/* Headline - centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
            <span className="block">FAITES VOUS PROMOUVOIR</span>
            <span className="block mt-2">
              PAR{' '}
              <span className="text-primary">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </span>
            <span className="block mt-2">à des millions d'utilisateurs</span>
          </h1>
        </motion.div>

        {/* Subheadline - centered */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#86868b] mb-8 max-w-lg mx-auto font-light"
        >
          Soyez trouvé sur Google, compris par les IA et recommandé là où les décisions se prennent.
        </motion.p>

        {/* CTA Button - centered, only one button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <a href="https://calendly.com/ossmane-b1/appel-axiom-ia-infrastructure-ia?month=2026-02" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(119,52,184,0.4)] hover:shadow-[0_0_30px_rgba(119,52,184,0.6)]">
            Passez à l'action
          </a>
        </motion.div>

        {/* Hero Video - Theme aware with animated border glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto mb-12 relative"
        >
          {/* Animated border glow container */}
          <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
            {/* Rotating gradient - sized larger to create trailing effect */}
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

          {/* Video container with background */}
          <div className="relative rounded-2xl bg-black/95 overflow-hidden">
            <video
              key={isLight ? 'light' : 'dark'}
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl"
            >
              <source
                src={isLight ? '/videos/hero-light.mp4' : '/videos/hero-dark.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </motion.div>


        {/* Partner logos - centered text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <p className="text-xs text-[#86868b] uppercase tracking-widest mb-4 text-center">
            Compatible avec vos solutions
          </p>

          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll-right">
              {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto mx-8 flex-shrink-0 opacity-60"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
