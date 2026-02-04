import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Problème', href: '#probleme' },
  { label: 'Solution', href: '#solution' },
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Pricing', href: '#pricing' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
      ? theme === 'dark' ? 'bg-black/90 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl shadow-sm'
      : 'bg-transparent'
      }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - switches based on theme */}
          <div className="flex-shrink-0 cursor-pointer">
            <img
              src={theme === 'dark' ? '/logo_axiom_new.png' : '/logo_axiom_light.png'}
              alt="Axiom IA"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${theme === 'dark'
                  ? 'text-[#86868b] hover:text-white'
                  : 'text-gray-600 hover:text-black'
                  }`}
              >
                {item.label}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                : 'bg-black/10 hover:bg-black/20 text-purple-600'
                }`}
              aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                : 'bg-black/10 hover:bg-black/20 text-purple-600'
                }`}
              aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${theme === 'dark' ? 'text-[#86868b] hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden backdrop-blur-xl border-t ${theme === 'dark'
            ? 'bg-black/95 border-[#424245]'
            : 'bg-white/95 border-gray-200'
            }`}
        >
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block text-base font-medium ${theme === 'dark'
                  ? 'text-[#86868b] hover:text-white'
                  : 'text-gray-600 hover:text-black'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
