import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, BookOpen, Star } from 'lucide-react'
import GlobalOstPlayer from './GlobalOstPlayer'

const navItems = [
  { path: '/basics',     label: 'Les Fondamentaux', tag: 'TOME 0' },
  { path: '/frame-data', label: 'Les Maths', tag: 'TOME I' },
  { path: '/neutral',    label: 'L\'Espace', tag: 'TOME II' },
  { path: '/psychology', label: 'Psycho & Défense', tag: 'TOME III' },
  { path: '/lab',        label: 'Système Drive', tag: 'TOME IV' },
  { path: '/combos',     label: 'Combos', tag: 'TOME V' },
  { path: '/characters', label: 'Personnages', tag: 'TOME VI' },
  { path: '/index',      label: 'L\'Index', tag: 'TOME VII' },
  { path: '/okizeme',    label: 'Okizeme', tag: 'TOME VIII' },
  { path: '/option-select', label: 'Option Selects', tag: 'TOME IX' },
  { path: '/learning',   label: 'Apprendre à Apprendre', tag: 'TOME X' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Bloquer le scroll quand le menu plein écran est ouvert
  if (typeof document !== 'undefined') {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60]">
        {/* Fond + blur */}
        <div className="absolute inset-0 transition-colors duration-300" style={{
          background: menuOpen ? 'transparent' : 'rgba(244, 235, 225, 0.9)',
          backdropFilter: menuOpen ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: menuOpen ? 'none' : 'blur(16px)',
          borderBottom: menuOpen ? 'none' : '2px solid rgba(26,24,21,0.1)',
        }} />

        {/* Ligne d'accentuation rouge sf */}
        {!menuOpen && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sf-pink/50 to-transparent" />}

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 group" aria-label="FGCDOC Accueil">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:-rotate-6"
                style={{ background: 'linear-gradient(135deg, #110E0C, #1A1815)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <BookOpen size={18} className="text-[#F4EBE1]" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity bg-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-[0.15em] text-[#110E0C] leading-none">
                FGC<span className="text-sf-pink">DOC</span>
              </span>
              <span className="font-display text-[10px] tracking-widest text-[#110E0C]/50 uppercase mt-0.5">L'Encyclopédie</span>
            </div>
          </NavLink>

          <div className="absolute top-0 right-4 sm:right-12 h-full flex items-center gap-4 sm:gap-6 z-[70]">
            <GlobalOstPlayer />
            
            {/* Bouton Sommaire (Ruban Marque-Page Metaphor/P5) */}
            <button
              className={`relative w-14 sm:w-20 pb-6 pt-6 sm:pb-8 sm:pt-10 flex flex-col items-center justify-start gap-1 sm:gap-2 transition-all origin-top font-display tracking-widest uppercase p5-shadow focus:outline-none ${
              menuOpen 
                ? 'bg-[#1A1815] text-[#F4EBE1]' 
                : 'bg-sf-pink text-[#1A1815]'
            }`}
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Sommaire des Tomes"
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={4} /> : <Star className="w-5 h-5 sm:w-7 sm:h-7 fill-current" strokeWidth={3} />}
              </motion.div>
            </AnimatePresence>
            <span className="text-[10px] sm:text-sm [writing-mode:vertical-lr] rotate-180 mt-1 font-black">
              {menuOpen ? 'FERMER' : 'INDEX'}
            </span>
          </button>
          </div>
        </div>
      </header>

      {/* ─── MENU PLEIN ÉCRAN (LE PARCHEMIN) ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Voile sombre en fond (le dojo) */}
            <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

            {/* Le Menu P5 (Halftone & Rouge/Noir) */}
            <motion.div 
              initial={{ rotateY: 90, transformOrigin: 'right center' }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl mx-auto h-full shadow-2xl flex flex-col overflow-hidden bg-sf-pink p5-shadow"
              style={{
                perspective: 2000,
              }}
            >
              <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-32 bg-p5-stripes pointer-events-none" />
              
              <div className="flex-1 overflow-y-auto pt-28 pb-16 px-8 sm:px-16 scrollbar-hide relative z-10">
                
                <h2 className="ransom-title text-5xl sm:text-6xl text-[#F4EBE1] text-center mb-16 transform -rotate-2">
                  SOMMAIRE
                </h2>

                <nav className="flex flex-col gap-2">
                  <NavLink
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 py-4 border-b border-[#110E0C]/10 group transition-all hover:pl-4"
                  >
                    <span className="font-display text-sm tracking-widest text-[#110E0C]/40 group-hover:text-sf-pink transition-colors">ACCUEIL</span>
                    <span className="font-display text-2xl text-[#110E0C] flex-1">Le Vestibule</span>
                    <ChevronRight size={20} className="text-[#110E0C]/20 group-hover:text-sf-pink transition-all" />
                  </NavLink>

                  {navItems.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={item.path}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-4 py-4 border-b border-[#110E0C]/10 group transition-all hover:pl-4 ${
                            isActive ? 'pl-4' : ''
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`font-display text-sm sm:text-lg tracking-widest transition-colors w-28 ${isActive ? 'text-[#1A1815]' : 'text-[#1A1815]/60 group-hover:text-[#1A1815]'}`}>
                              {item.tag}
                            </span>
                            <span className={`font-display text-xl sm:text-3xl flex-1 transition-transform origin-left ${isActive ? 'text-[#F4EBE1] scale-105 p5-shadow' : 'text-[#F4EBE1] group-hover:scale-105 group-hover:p5-shadow'}`}>
                              {item.label}
                            </span>
                            <ChevronRight size={32} strokeWidth={4} className={`transition-all ${isActive ? 'text-[#1A1815] opacity-100 translate-x-3' : 'text-[#1A1815]/20 opacity-0 group-hover:opacity-100 group-hover:text-[#1A1815] group-hover:translate-x-3'}`} />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-16 text-center">
                  <p className="font-display text-[10px] tracking-widest uppercase text-[#110E0C]/30">
                     • FGCDOC
                  </p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
