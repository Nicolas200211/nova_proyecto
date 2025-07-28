import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-transparent backdrop-blur-lg shadow-2xl shadow-cyan-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="relative">
              <img 
                src="/src/assets/logonova2.png" 
                alt="Logo" 
                className="h-23 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(199,152,263,0.6)]"
              />
              <motion.div 
                className="absolute  from-purple-400/0 via-purple-900/40 to-purple-900/40 rounded-full blur-md transition-opacity duration-500"
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.id}
                className="relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-5 py-3 text-base font-semibold text-slate-300 hover:text-white tracking-wide",
                    "transition-all duration-300 group-hover:bg-slate-800/50 rounded-xl"
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="absolute -left-2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {item.label}
                  </span>
                  <motion.span 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '70%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 rounded-xl bg-slate-800/80 backdrop-blur-sm text-cyan-300 hover:bg-slate-700/50 focus:outline-none transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div 
                  key="close"
                  className="relative w-6 h-6"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 180, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-cyan-400 rounded-full transform -translate-y-1/2 rotate-45"></span>
                  <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-cyan-400 rounded-full transform -translate-y-1/2 -rotate-45"></span>
                </motion.div>
              ) : (
                <motion.div 
                  key="menu"
                  className="relative w-6 h-5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="absolute top-0 left-0 w-6 h-0.5 bg-cyan-400 rounded-full transition-transform duration-300 group-hover:translate-y-1"></span>
                  <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-cyan-400 rounded-full transform -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0"></span>
                  <span className="absolute bottom-0 left-0 w-6 h-0.5 bg-cyan-400 rounded-full transition-transform duration-300 group-hover:-translate-y-1"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-lg rounded-2xl mx-2 my-2"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-2 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.05 * index, duration: 0.3, ease: 'easeOut' }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full px-6 py-4 text-lg font-medium text-left text-slate-300 hover:text-white rounded-xl transition-all duration-300 flex items-center group hover:bg-slate-800/50"
                    >
                      <span className="relative z-10 flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2"></span>
                        {item.label}
                      </span>
                      <span className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
