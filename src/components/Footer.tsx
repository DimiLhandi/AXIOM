import { Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer className={`relative overflow-hidden border-t py-12 ${isLight ? 'border-gray-200' : 'border-[#424245]'
      }`}>
      {/* Animated gradient background - adapts to theme */}
      <div className={`absolute inset-0 ${isLight ? 'bg-white' : 'bg-black'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 -left-10 w-72 h-72 ${isLight ? 'bg-primary/30' : 'bg-primary/40'} rounded-full blur-3xl animate-blob-faster`} />
          <div className={`absolute top-1/2 right-0 w-64 h-64 ${isLight ? 'bg-purple-600/35' : 'bg-purple-800/50'} rounded-full blur-3xl animate-blob-faster animation-delay-2000`} />
          <div className={`absolute bottom-0 left-1/3 w-80 h-80 ${isLight ? 'bg-primary/25' : 'bg-primary/35'} rounded-full blur-3xl animate-blob-faster animation-delay-4000`} />
          <div className={`absolute bottom-1/4 right-1/4 w-56 h-56 ${isLight ? 'bg-purple-500/30' : 'bg-purple-700/45'} rounded-full blur-3xl animate-blob-faster`} />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <img src="/logo_axiom.png" alt="Axiom IA" className="h-8 w-auto mb-4" />
            <p className={`text-sm max-w-xs ${isLight ? 'text-gray-600' : 'text-[#86868b]'}`}>
              L'agence pionnière dans l'optimisation pour les moteurs de recherche génératifs.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-[#86868b]'}`}>Suivez-nous</span>
            <a
              href="https://www.linkedin.com/in/ossmane-baali-46874a38a/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-primary transition-colors ${isLight
                ? 'bg-gray-100 border-gray-300 text-gray-600 hover:text-primary'
                : 'bg-[#1d1d1f] border-[#424245] text-[#86868b] hover:text-white'
                }`}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isLight ? 'border-gray-200' : 'border-[#424245]'
          }`}>
          <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-[#86868b]'}`}>
            © 2025 Axiom IA. Tous droits réservés.
          </p>
          <div className={`flex gap-6 text-sm ${isLight ? 'text-gray-600' : 'text-[#86868b]'}`}>
            <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Mentions légales</a>
            <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Confidentialité</a>
            <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
