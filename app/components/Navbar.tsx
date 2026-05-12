"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-5 transition-all duration-500 ${
        scrolled || isMenuOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left - Logo */}
          <a href="#" className="flex items-center gap-1.5 md:gap-2 group no-underline min-w-0 z-50">
            <div className="w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-brand/10 flex-shrink-0 flex items-center justify-center text-brand transition-transform group-hover:scale-105">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            </div>
            <span className="text-base md:text-xl font-bold tracking-tight text-slate-900 truncate">
              Usama<span className="text-brand">8</span>Faheem
            </span>
          </a>

          {/* Right - Desktop Links and Action Button */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[12px] font-medium transition-colors no-underline uppercase tracking-[0.15em] ${
                    scrolled ? "text-slate-600 hover:text-brand" : "text-slate-600 hover:text-brand"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button className="px-7 py-2.5 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 group relative overflow-hidden bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-cyan-400/30">
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-6 items-center pt-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-bold tracking-widest uppercase text-slate-800 hover:text-brand transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="w-full">
               <button className="w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 group relative overflow-hidden bg-brand text-white shadow-xl shadow-brand/20">
                 <span className="relative z-10 uppercase tracking-widest">Services</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
