import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import movesData from '../../../data/moves.json'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import FrameTimeline from './FrameTimeline'
import FrameComparator from './FrameComparator'
import { ChevronRight } from 'lucide-react'

const accentColors = {
  yellow: { ring: 'ring-sf-yellow/50',  bg: 'bg-sf-yellow/10', text: 'text-sf-yellow', border: 'border-sf-yellow' },
  green:  { ring: 'ring-sf-green/50',   bg: 'bg-sf-green/10',  text: 'text-sf-green',  border: 'border-sf-green'  },
  orange: { ring: 'ring-sf-orange/50',  bg: 'bg-sf-orange/10', text: 'text-sf-orange', border: 'border-sf-orange' },
  pink:   { ring: 'ring-sf-pink/50',    bg: 'bg-sf-pink/10',   text: 'text-sf-pink',   border: 'border-sf-pink'   },
  blue:   { ring: 'ring-sf-blue/50',    bg: 'bg-sf-blue/10',   text: 'text-sf-blue',   border: 'border-sf-blue'   },
}

export default function FrameDataModule() {
  const [selectedMoveId, setSelectedMoveId] = useState(movesData.moves[0].id)
  const selectedMove = useMemo(
    () => movesData.moves.find((m) => m.id === selectedMoveId),
    [selectedMoveId]
  )

  return (
    <section id="frame-data" className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="yellow" size={600} top="15%"  left="5%"   opacity={0.055} />
      <PaintSplash color="pink"   size={500} top="65%"  right="-5%" opacity={0.045} />
      <PaintSplash color="blue"   size={350} top="40%"  left="90%"  opacity={0.035} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome I"
          title="Les Mathématiques des jeux de combat"
          subtitle="Le jeu tourne dans à 60 FPS. Chaque coup, chaque blocage, chaque hitstun se calcule à la frame près. C'est l'horloge interne de Street Fighter."
          color="yellow"
        />

        {/* ── 3 phases expliquées ── */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            {
              phase: 'STARTUP',
              abbr: 'S',
              color: 'yellow',
              borderColor: 'border-frame-startup/30',
              bg: 'bg-frame-startup/5',
              textColor: 'text-frame-startup',
              desc: "Mise en route du coup. Tu es vulnérable : un coup plus rapide adverse peut t'interrompre. Plus c'est court, plus le coup est difficile à anticiper.",
              tip: 'Coup à 5f → 83ms. En dessous du seuil de réaction humaine vous ne serez jamais spiderman !!!.',
            },
            {
              phase: 'ACTIVE',
              abbr: 'A',
              color: 'pink',
              borderColor: 'border-frame-active/30',
              bg: 'bg-frame-active/5',
              textColor: 'text-frame-active',
              desc: "La hitbox est active. Si l'adversaire est dans ta portée pendant ces frames, il prend des dégâts. Plus il y a de frames actives, plus la fenêtre de frappe est large.",
              
            },
            {
              phase: 'RECOVERY',
              abbr: 'R',
              color: 'blue',
              borderColor: 'border-frame-recovery/30',
              bg: 'bg-frame-recovery/5',
              textColor: 'text-frame-recovery',
              desc: "Retour à la position neutre. Tu ne peux pas agir. Si tu rates ton coup ou s'il est bloqué, c'est ici que l'adversaire peut te punir.",
              tip: 'Un gros coup à 25f de recovery raté = punish de fou garanti faut en profiter.',
            },
          ].map((p) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: p.phase === 'STARTUP' ? 0 : p.phase === 'ACTIVE' ? 0.1 : 0.2 }}
              className={`concrete-card p-6 border ${p.borderColor} ${p.bg}`}
            >
              <div className={`w-12 h-12 rounded-xl border ${p.borderColor} flex items-center justify-center mb-4`}>
                <span className={`font-display text-2xl ${p.textColor}`}>{p.abbr}</span>
              </div>
              <h3 className={`font-display text-xl mb-3 ${p.textColor}`}>{p.phase}</h3>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">{p.desc}</p>
              <p className={`text-xs font-body italic ${p.textColor} opacity-80`}>💡 {p.tip}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Concepts Avancés ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <ChevronRight className="text-sf-yellow" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">LES CONCEPTS AVANCÉS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Blockstun',
                color: 'sf-orange',
                desc: "Quand tu bloques un coup, ton personnage est 'gelé' dans son animation de garde pendant X frames. Pendant ce temps, tu ne peux absolument rien faire (ni sauter, ni taper, ni déchopper).",
                key: "Avantage au bloqueur (+ au blocage) = il récupère avant l'attaquant."
              },
              {
                title: 'Hitstun',
                color: 'sf-pink',
                desc: "Quand tu prends un coup (non bloqué), ton personnage chancelle pendant X frames. C'est le hitstun qui permet aux combos d'exister : si ton 2ème coup touche pendant le hitstun du 1er, c'est un combo.",
                key: "Counter Hit = Hitstun augmenté de 2 frames. Punish Counter = +4 frames."
              },
              {
                title: 'True String',
                color: 'sf-blue',
                desc: "Une série d'attaques où le blockstun du 1er coup s'enchaîne avec l'active frame du 2ème. L'adversaire est enfermé dans la garde. S'il essaie de faire un Shoryuken, le jeu ignorera sa commande.",
                key: "Totalement safe pour l'attaquant, mais ne fait pas de dégâts (sauf Burnout)."
              },
              {
                title: 'Frame Trap',
                color: 'sf-green',
                desc: "Un 'faux' enchaînement. Tu laisses volontairement un trou de 1 à 3 frames entre deux coups. Si l'adversaire essaie de taper pendant ce mini-trou, son coup n'a pas le temps de sortir (startup > 3f) et tu le Counters.",
                key: "C'est l'outil ultime pour éteindre les joueurs qui mash à vue d'oeil."
              }
            ].map((concept) => (
              <ConcreteCard key={concept.title} className={`p-6 border-t-2 border-t-${concept.color}/50 hover:bg-white/5 transition-colors`}>
                <h3 className={`font-display text-xl mb-3 text-${concept.color}`}>{concept.title}</h3>
                <p className="text-chalk-dim text-sm leading-relaxed mb-4">{concept.desc}</p>
                <div className={`bg-${concept.color}/10 border border-${concept.color}/20 rounded-lg p-3 mt-auto`}>
                  <span className={`text-[10px] font-display text-${concept.color} uppercase tracking-widest block mb-1`}>À retenir</span>
                  <span className="text-xs text-chalk font-body">{concept.key}</span>
                </div>
              </ConcreteCard>
            ))}
          </div>
        </motion.div>

        {/* ── Sélecteur de coup ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ChevronRight size={16} className="text-sf-yellow" />
            <h3 className="font-display text-chalk text-xl tracking-wide">CHOISIS UN COUP À ANALYSER</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {movesData.moves.map((move) => {
              const c = accentColors[move.color] || accentColors.yellow
              const isSelected = selectedMoveId === move.id
              return (
                <motion.button
                  key={move.id}
                  onClick={() => setSelectedMoveId(move.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-3 rounded-xl border font-display text-xs tracking-widest uppercase transition-all ${
                    isSelected
                      ? `${c.bg} ${c.border} ${c.text} shadow-lg ring-1 ${c.ring}`
                      : 'border-white/8 text-chalk-dim hover:border-white/20 hover:text-chalk bg-white/3'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{move.character}</span>
                  {move.name}
                  <span className={`ml-2 font-marker text-xs ${isSelected ? c.text : 'text-stone'}`}>
                    {move.notation}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── Timeline ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMoveId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <FrameTimeline move={selectedMove} />
          </motion.div>
        </AnimatePresence>

        {/* ── Comparateur ── */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <ChevronRight size={16} className="text-sf-yellow" />
            <h3 className="font-display text-chalk text-3xl tracking-wide">COMPARATEUR DE PUNITION</h3>
          </div>
          <p className="text-chalk-dim mb-8 text-sm ml-7">
            Ton coup est négatif au blocage ? Voyons si l'adversaire peut te punir avec quel jab.
          </p>
          <FrameComparator move={selectedMove} />
        </motion.div>
      </div>
    </section>
  )
}
