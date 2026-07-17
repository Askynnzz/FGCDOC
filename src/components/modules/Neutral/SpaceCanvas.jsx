import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConcreteCard } from '../../ui/UIComponents'

const GRAB_ZONE = 35      // % de la largeur : zone de chope (rouge)
const SHIMMY_ZONE = 55    // % : zone shimmy (vert)
const STAGE_WIDTH = 100   // % représentant l'écran

// Fighters SVG simplifiés
function FighterSilhouette({ color, flip = false, action = 'idle', label }) {
  const grabAnim = action === 'grab'
  const whiffAnim = action === 'whiff'
  const punishAnim = action === 'punish'

  return (
    <div className={`flex flex-col items-center gap-1 ${flip ? 'scale-x-[-1]' : ''}`}>
      <motion.div
        className="relative"
        animate={
          grabAnim ? { x: flip ? -30 : 30 } :
          whiffAnim ? { x: flip ? -20 : 20, scale: 0.95 } :
          punishAnim ? { x: 0 } :
          { x: 0 }
        }
        transition={{ type: 'spring', damping: 10 }}
      >
        <svg width="50" height="80" viewBox="0 0 50 80" fill="none">
          {/* Corps */}
          <circle cx="25" cy="12" r="10" fill={color} opacity={0.9} />
          <rect x="18" y="22" width="14" height="28" rx="4" fill={color} opacity={0.85} />
          {/* Jambes */}
          <rect x="18" y="48" width="6" height="24" rx="3" fill={color} opacity={0.75} />
          <rect x="26" y="48" width="6" height="24" rx="3" fill={color} opacity={0.75} />
          {/* Bras */}
          <motion.rect
            x="6" y="24" width="12" height="5" rx="2.5" fill={color} opacity={0.8}
            animate={grabAnim ? { x: 15, scaleX: 1.5 } : whiffAnim ? { x: 12, scaleX: 1.3, opacity: 0.4 } : { x: 0, scaleX: 1 }}
            style={{ transformOrigin: 'right center' }}
          />
          <rect x="32" y="24" width="12" height="5" rx="2.5" fill={color} opacity={0.8} />

          {/* Flash punish */}
          {punishAnim && (
            <motion.circle
              cx="25" cy="40" r="20"
              fill="rgba(255,184,0,0.3)"
              initial={{ scale: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </svg>
      </motion.div>
      <span
        className={`text-xs font-display tracking-wide ${flip ? 'scale-x-[-1]' : ''}`}
        style={{ color }}
      >
        {label}
      </span>
    </div>
  )
}

export default function SpaceCanvas() {
  const [position, setPosition] = useState(50)  // 0-100%
  const [phase, setPhase] = useState('neutral')  // neutral | grab | whiff | punish
  const [feedback, setFeedback] = useState('')
  const [showPunish, setShowPunish] = useState(false)

  const zone = position <= GRAB_ZONE
    ? 'danger'
    : position <= SHIMMY_ZONE
    ? 'shimmy'
    : 'safe'

  const zoneConfig = {
    danger: {
      label: '⚠️ ZONE CHOPE',
      sublabel: "Tu es à portée de chope adverse",
      color: 'text-sf-pink',
      borderColor: 'border-sf-pink',
      bg: 'bg-sf-pink/5',
    },
    shimmy: {
      label: '🎯 ZONE SHIMMY',
      sublabel: "Parfait pour le shimmy — recule encore un peu",
      color: 'text-sf-yellow',
      borderColor: 'border-sf-yellow',
      bg: 'bg-sf-yellow/5',
    },
    safe: {
      label: '✅ HORS PORTÉE',
      sublabel: "Tu es trop loin pour être chopé",
      color: 'text-sf-green',
      borderColor: 'border-sf-green',
      bg: 'bg-sf-green/5',
    },
  }

  const simulateAction = () => {
    if (zone === 'danger') {
      setPhase('grab')
      setFeedback('Il te chope ! Tu étais à portée.')
      setShowPunish(false)
    } else if (zone === 'shimmy' || zone === 'safe') {
      setPhase('whiff')
      setFeedback("Il chope dans le vide ! FENÊTRE DE PUNITION OUVERTE !")
      setTimeout(() => {
        setPhase('punish')
        setShowPunish(true)
        setFeedback('PUNISH ! Tu le frottes pendant sa recovery !')
      }, 800)
    }

    setTimeout(() => {
      setPhase('neutral')
      setFeedback('')
      setShowPunish(false)
    }, 2500)
  }

  const zoneInfo = zoneConfig[zone]

  return (
    <ConcreteCard className="p-6">
      <h3 className="font-display text-chalk text-2xl mb-2">
        SIMULATEUR DE SHIMMY
      </h3>
      <p className="text-chalk-dim text-sm mb-8">
        Déplace le slider pour positionner ton personnage. Observe comment changer l'espacement change tout.
      </p>

      {/* Stage visualisation */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-52 bg-gradient-to-b from-bg-secondary to-bg-primary border border-white/8">
        {/* Zone colorée */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background:
              zone === 'danger'
                ? 'linear-gradient(90deg, rgba(255,30,142,0.12) 0%, transparent 50%)'
                : zone === 'shimmy'
                ? 'linear-gradient(90deg, rgba(255,184,0,0.08) 0%, rgba(57,255,20,0.05) 50%,  transparent 80%)'
                : 'linear-gradient(90deg, rgba(57,255,20,0.06) 0%, transparent 40%)',
          }}
        />

        {/* Zone markers */}
        <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
          <div className="bg-sf-pink/50" style={{ width: `${GRAB_ZONE}%` }} />
          <div className="bg-sf-yellow/40" style={{ width: `${SHIMMY_ZONE - GRAB_ZONE}%` }} />
          <div className="bg-sf-green/30" style={{ flex: 1 }} />
        </div>

        {/* Adversaire (gauche, fixe) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <FighterSilhouette
            color="#FF1E8E"
            action={phase === 'grab' || phase === 'whiff' ? (zone === 'danger' ? 'grab' : 'whiff') : 'idle'}
            label="ADV."
          />
        </div>

        {/* Toi (droite, mobile) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          animate={{ left: `${position}%` }}
          style={{ translateX: '-50%' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <FighterSilhouette
            color="#00D4FF"
            flip
            action={phase === 'punish' ? 'punish' : 'idle'}
            label="TOI"
          />
        </motion.div>

        {/* Ligne de portée chope */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-sf-pink/40"
          style={{ left: `${GRAB_ZONE}%` }}
        >
          <span className="text-sf-pink text-xs font-display absolute top-2 left-1 whitespace-nowrap">
            Portée chope
          </span>
        </div>

        {/* Flash WHIFF */}
        <AnimatePresence>
          {phase === 'whiff' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-sf-yellow/20 border border-sf-yellow rounded-xl px-4 py-2">
                <span className="font-display text-sf-yellow text-xl">WHIFF!</span>
              </div>
            </motion.div>
          )}
          {phase === 'punish' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-sf-green/20 border-2 border-sf-green rounded-xl px-4 py-2 shadow-sf-green">
                <span className="font-display text-sf-green text-2xl">PUNISH!</span>
              </div>
            </motion.div>
          )}
          {phase === 'grab' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-sf-pink/20 border border-sf-pink rounded-xl px-4 py-2">
                <span className="font-display text-sf-pink text-xl">CHOPÉ!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider de position */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-stone mb-2">
          <span className="text-sf-pink">← Près (danger)</span>
          <span className="text-sf-yellow">Zone Shimmy</span>
          <span className="text-sf-green">Loin (safe) →</span>
        </div>
        <div className="relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="bg-sf-pink/40" style={{ width: `${GRAB_ZONE}%` }} />
              <div className="bg-sf-yellow/35" style={{ width: `${SHIMMY_ZONE - GRAB_ZONE}%` }} />
              <div className="bg-sf-green/30" style={{ flex: 1 }} />
            </div>
          </div>
          <input
            type="range"
            min={5}
            max={85}
            value={position}
            onChange={(e) => { setPosition(Number(e.target.value)); setPhase('neutral') }}
            className="w-full relative z-10"
            aria-label="Character position"
          />
        </div>
      </div>

      {/* Zone indicator */}
      <div className={`rounded-xl p-4 border ${zoneInfo.borderColor} ${zoneInfo.bg} mb-6 transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-display text-xl ${zoneInfo.color}`}>{zoneInfo.label}</div>
            <div className="text-chalk-dim text-sm">{zoneInfo.sublabel}</div>
          </div>
        </div>
      </div>

      {/* Bouton action */}
      <div className="flex justify-center">
        <motion.button
          onClick={simulateAction}
          disabled={phase !== 'neutral'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-green disabled:opacity-40 disabled:cursor-not-allowed px-10 py-3"
        >
          🥊 L'ADVERSAIRE CHOPE !
        </motion.button>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center font-display text-lg ${
              phase === 'grab' ? 'text-sf-pink' : phase === 'punish' ? 'text-sf-green' : 'text-sf-yellow'
            }`}
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>
    </ConcreteCard>
  )
}
