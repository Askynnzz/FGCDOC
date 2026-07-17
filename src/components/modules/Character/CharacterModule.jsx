import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import characterData from '../../../data/characters.json'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { User, Gamepad2, Target, Zap, PlaySquare, ExternalLink } from 'lucide-react'

const accentColors = {
  yellow: { ring: 'ring-sf-yellow/50',  bg: 'bg-sf-yellow/10', text: 'text-sf-yellow', border: 'border-sf-yellow', gradient: 'from-sf-yellow/20', solidBg: 'bg-sf-yellow' },
  green:  { ring: 'ring-sf-green/50',   bg: 'bg-sf-green/10',  text: 'text-sf-green',  border: 'border-sf-green',  gradient: 'from-sf-green/20', solidBg: 'bg-sf-green' },
  orange: { ring: 'ring-sf-orange/50',  bg: 'bg-sf-orange/10', text: 'text-sf-orange', border: 'border-sf-orange', gradient: 'from-sf-orange/20', solidBg: 'bg-sf-orange' },
  pink:   { ring: 'ring-sf-pink/50',    bg: 'bg-sf-pink/10',   text: 'text-sf-pink',   border: 'border-sf-pink',   gradient: 'from-sf-pink/20', solidBg: 'bg-sf-pink' },
  blue:   { ring: 'ring-sf-blue/50',    bg: 'bg-sf-blue/10',   text: 'text-sf-blue',   border: 'border-sf-blue',   gradient: 'from-sf-blue/20', solidBg: 'bg-sf-blue' },
}

const accentGlow = {
  yellow: 'hover:shadow-[0_0_30px_rgba(255,184,0,0.10)]',
  green:  'hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]',
  orange: 'hover:shadow-[0_0_30px_rgba(255,107,26,0.10)]',
  blue:   'hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]',
  pink:   'hover:shadow-[0_0_30px_rgba(255,30,142,0.10)]'
}

/* ─── Composants Locaux ─── */
const YoutubeEmbed = ({ videoId, title }) => (
  <div className="relative w-full rounded-xl overflow-hidden border border-white/10 group bg-black">
    <div className="pt-[56.25%]">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)

export default function CharacterModule() {
  const [selectedId, setSelectedId] = useState(characterData.characters[0].id)
  const selectedChar = characterData.characters.find(c => c.id === selectedId) || characterData.characters[0]
  const c = accentColors[selectedChar.color] || accentColors.yellow

  return (
    <section id="characters" className="relative py-12 px-4 sm:py-20 sm:px-6 overflow-hidden min-h-screen">
      <PaintSplash color={selectedChar.color} size={800} top="0%" left="-10%" opacity={0.06} />
      <PaintSplash color={selectedChar.color} size={600} top="50%" right="-5%" opacity={0.04} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome VI"
          title="Le Dojo"
          subtitle="Sélectionnez un personnage pour accéder à son guide visuel complet : neutral, gameplan et ressources vidéos."
          color={selectedChar.color}
        />

        {/* ── Sélecteur de personnage ── */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {characterData.characters.map((char) => {
              const charColor = accentColors[char.color] || accentColors.yellow
              const isSelected = selectedId === char.id
              
              return (
                <motion.button
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-display text-lg tracking-widest transition-all relative overflow-hidden ${
                    isSelected
                      ? `${charColor.bg} ${charColor.border} border-2 ${charColor.text} shadow-[0_0_20px_rgba(0,0,0,0.5)]`
                      : 'border-2 border-white/10 text-chalk-dim hover:border-white/30 bg-black/40'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 20px var(--color-${char.color}, rgba(255,255,255,0.2))` } : {}}
                >
                  {isSelected && <div className="absolute inset-0 bg-white/10" />}
                  <span className="relative z-10">{char.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── Fiche du personnage ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            
            {/* ── HEADER PERSONNAGE ── */}
            <ConcreteCard className={`overflow-hidden border-t-4 border-t-${selectedChar.color}`}>
              <div className="flex flex-col-reverse md:flex-row">
                <div className="p-6 sm:p-8 md:p-12 flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <User className={c.text} size={32} />
                    <h2 className="font-display text-chalk text-5xl md:text-6xl uppercase tracking-wider">{selectedChar.name}</h2>
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full ${c.bg} border ${c.border} mb-6 shadow-lg`}>
                    <span className={`text-sm md:text-base font-display tracking-widest uppercase ${c.text}`}>
                      {selectedChar.archetype}
                    </span>
                  </div>
                  <p className="text-chalk-dim leading-relaxed text-lg max-w-2xl">
                    {selectedChar.description}
                  </p>
                </div>
                {/* Image Portrait */}
                {selectedChar.portrait && (
                  <div className="md:w-1/3 relative min-h-[300px] bg-black/50">
                    <div className={`absolute inset-0 bg-gradient-to-r ${c.gradient} to-transparent opacity-50 mix-blend-overlay z-10 pointer-events-none`} />
                    <img 
                      src={selectedChar.portrait} 
                      alt={selectedChar.name}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815] to-transparent z-10 md:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1815] z-10 hidden md:block" />
                  </div>
                )}
              </div>
            </ConcreteCard>

            {/* ── SECTION WIP & SUPERCOMBO ── */}
            <ConcreteCard className="p-8 md:p-12 text-center border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1A1815] border border-white/10 mb-2">
                  <Target className="text-chalk-dim" size={32} />
                </div>
                
                <h3 className="font-display text-chalk text-3xl tracking-wide">Fiche Technique en construction</h3>
                <p className="text-chalk-dim text-lg leading-relaxed">
                  Les visuels détaillés des pokes et le plan de jeu de <strong className="text-chalk">{selectedChar.name}</strong> arrivent bientôt si j'ai la foi.
                </p>
                
                <div className="pt-6">
                  <a 
                    href={selectedChar.supercomboUrl || "https://wiki.supercombo.gg/w/Street_Fighter_6"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-8 py-4 ${c.solidBg} text-[#1A1815] rounded-xl font-display tracking-widest text-sm uppercase font-bold transition-all hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${accentGlow[selectedChar.color] || ''}`}
                  >
                    Consulter le Wiki SuperCombo <ExternalLink size={18} />
                  </a>
                  <p className="text-stone text-xs mt-4">Le wiki communautaire le plus complet en attendant.</p>
                </div>
              </div>
            </ConcreteCard>

            {/* ── SECTION VIDÉOS (Dojo & Ressources) ── */}
            {selectedChar.videoGuides && selectedChar.videoGuides.length > 0 && (
              <div className="pt-8">
                <div className="flex items-center gap-3 mb-8">
                  <PlaySquare className="text-sf-pink" size={32} />
                  <h3 className="font-display text-chalk text-3xl tracking-wide">Guides & Ressources Vidéo</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {selectedChar.videoGuides.map((video, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 + 0.4 }}
                      className="space-y-3"
                    >
                      <YoutubeEmbed videoId={video.id} title={video.title} />
                      <h4 className="font-display text-chalk text-lg pl-2 border-l-2 border-sf-pink">{video.title}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
