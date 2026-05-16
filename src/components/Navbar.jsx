import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LogIn } from 'lucide-react';
import Button from './ui/Button';

const openAppStore = () => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  window.open(
    isIOS
      ? 'https://apps.apple.com/app/locsho/id6744042655'
      : 'https://play.google.com/store/apps/details?id=in.locsho.user&hl=en_IN',
    '_blank'
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isPartnerPage = location.pathname === '/partner';
  const isUserPage = location.pathname === '/user' || location.pathname === '/';

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: t('nav.forUser'), to: '/user' },
    { label: t('nav.forShopkeeper'), to: '/partner' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Locsho" className="w-8 h-8 rounded-lg" />
          <span className="font-black text-xl">
            <span className="text-[#1AAB6D]">Loc</span><span className="text-[#F59E0B]">Sho</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-[#1AAB6D] font-semibold'
                  : 'text-gray-600 hover:text-[#1AAB6D]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-full hover:bg-gray-50 transition-all"
          >
            {i18n.language === 'en' ? '🇮🇳 हिंदी' : '🌐 English'}
          </button>

          <a
            href="https://user.locsho.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-black border-2 border-[#1AAB6D] text-[#1AAB6D] rounded-full hover:bg-[#1AAB6D]/5 transition-all"
          >
            <LogIn size={14} strokeWidth={2.5} />
            User Login
          </a>

          {isPartnerPage && (
            <a
              href="https://partner.locsho.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-black border-2 border-[#1AAB6D] text-[#1AAB6D] rounded-full hover:bg-[#1AAB6D]/5 transition-all"
            >
              <LogIn size={14} strokeWidth={2.5} />
              Partner Login
            </a>
          )}

          <Button variant="primary" size="sm" onClick={openAppStore}>
            {t('nav.getApp')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-2 py-1 text-[10px] font-bold border border-gray-200 rounded-full"
          >
            {i18n.language === 'en' ? 'हिं' : 'EN'}
          </button>
        <button
          className="p-2 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-gray-700 block transition-all" />
          <span className="w-6 h-0.5 bg-gray-700 block transition-all" />
          <span className="w-6 h-0.5 bg-gray-700 block transition-all" />
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === link.to
                      ? 'text-[#1AAB6D] font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://user.locsho.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm font-black text-[#1AAB6D]"
              >
                <LogIn size={14} strokeWidth={2.5} />
                User Login
              </a>
              {isPartnerPage && (
                <a
                  href="https://partner.locsho.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm font-black text-[#1AAB6D]"
                >
                  <LogIn size={14} strokeWidth={2.5} />
                  Partner Login
                </a>
              )}
              <Button variant="primary" size="sm" onClick={openAppStore}>
                {t('nav.getApp')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
