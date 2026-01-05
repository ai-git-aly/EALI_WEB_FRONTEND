import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../images/logo.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { label: t('home'), href: "/" },
    { label: t('about'), href: "/#about" },
    { label: t('organization'), href: "/#organization" },
    { label: t('programs'), href: "/#programs" },
    { label: t('partnerships'), href: "/#partnerships" },
    { label: t('news'), href: "/#news" },
    { label: t('tenders') || "Appel d'offre", href: "/#tenders" },
    { label: t('contact'), href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-brand-primary/10 shadow-lg shadow-brand-primary/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <img src={logo} alt="EALI Logo" className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className={`font-bold text-xl tracking-wider hidden sm:block ${scrolled ? 'text-brand-primary' : 'text-white'}`}>
              EALI<span className="text-brand-secondary">.BI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 group ${scrolled ? 'text-slate-700 hover:text-brand-primary' : 'text-slate-200 hover:text-white'}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 group-hover:w-3/4" />
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className={`ml-4 flex items-center gap-2 pl-4 border-l ${scrolled ? 'border-slate-200' : 'border-white/10'}`}>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                    <User className="w-4 h-4 text-brand-secondary" />
                    <span className="text-sm font-medium">{user?.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                  >
                    <LogOut className="w-4 h-4" />
                    {t('auth.logout', 'Logout')}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-brand-primary/25 active:scale-95 ${scrolled ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'bg-white text-brand-primary hover:bg-slate-50'}`}
                >
                  <LogIn className="w-4 h-4" />
                  {t('auth.login', 'Login')}
                </Link>
              )}
            </div>

            {/* Language Switcher */}
            <div className={`ml-6 flex items-center gap-2 pl-6 border-l ${scrolled ? 'border-slate-200' : 'border-white/10'}`}>
              <Globe className="w-4 h-4 text-brand-secondary" />
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-sm font-medium rounded transition-all duration-300 ${i18n.language === 'en' ? 'bg-brand-primary text-white' : scrolled ? 'text-slate-600 hover:text-brand-primary' : 'text-slate-300 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-2 py-1 text-sm font-medium rounded transition-all duration-300 ${i18n.language === 'fr' ? 'bg-brand-primary text-white' : scrolled ? 'text-slate-600 hover:text-brand-primary' : 'text-slate-300 hover:text-white'}`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-xl border-b border-brand-primary/10 shadow-xl"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-700 hover:text-brand-primary hover:bg-brand-primary/5 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 text-slate-700">
                      <User className="w-5 h-5 text-brand-secondary" />
                      <span className="font-medium">{user?.username}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      {t('auth.logout', 'Logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-primary text-white font-medium transition-all duration-300"
                  >
                    <LogIn className="w-5 h-5" />
                    {t('auth.login', 'Login')}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-3 pt-4 px-4 border-t border-slate-100 mt-4">
                <Globe className="w-4 h-4 text-brand-secondary" />
                <button
                  onClick={() => { changeLanguage('en'); setIsOpen(false); }}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-300 ${i18n.language === 'en' ? 'bg-brand-primary text-white' : 'text-slate-600 hover:text-brand-primary'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { changeLanguage('fr'); setIsOpen(false); }}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-300 ${i18n.language === 'fr' ? 'bg-brand-primary text-white' : 'text-slate-600 hover:text-brand-primary'}`}
                >
                  Français
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;