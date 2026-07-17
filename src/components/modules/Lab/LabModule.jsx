import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { Zap, Shield, RotateCcw } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   CONSTANTES
══════════════════════════════════════════════════════════════ */
const MAX_GAUGE = 6

/* ══════════════════════════════════════════════════════════════
   JAUGE DE DRIVE
══════════════════════════════════════════════════════════════ */
function DriveGauge({ value, max = MAX_GAUGE, burnout = false }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < value
          const isLow = value <= 1 && !burnout
          return (
            <motion.div key={i} className="flex-1 h-5 rounded-sm overflow-hidden relative" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <motion.div className="absolute inset-0" initial={false} animate={{
                background: burnout ? 'rgba(255,30,142,0.15)' : filled ? isLow ? 'linear-gradient(135deg,#FF6B1A,#FF4500)' : 'linear-gradient(135deg,#39FF14,#00D4FF)' : 'rgba(255,255,255,0.04)',
              }} transition={{ duration: 0.25 }} />
              {burnout && <motion.div className="absolute inset-0 bg-sf-pink/30" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 0.9 }} />}
            </motion.div>
          )
        })}
      </div>
      <span className={`font-display text-xs tracking-widest ${burnout ? 'text-sf-pink' : value <= 1 ? 'text-sf-orange' : 'text-sf-green'}`}>
        {burnout ? '⚠ BURNOUT' : `${value} / ${max} DRIVE`}
      </span>
    </div>
  )
}

function FighterBlock({ color, label, flip = false }) {
  return (
    <div className={`flex flex-col items-center gap-1 select-none ${flip ? 'scale-x-[-1]' : ''}`}>
      <svg width="36" height="56" viewBox="0 0 36 56" fill="none">
        <circle cx="18" cy="8" r="7" fill={color} opacity="0.9" />
        <rect x="11" y="15" width="14" height="20" rx="3" fill={color} opacity="0.85" />
        <rect x="11" y="33" width="5" height="16" rx="2.5" fill={color} opacity="0.7" />
        <rect x="20" y="33" width="5" height="16" rx="2.5" fill={color} opacity="0.7" />
      </svg>
    </div>
  )
}

function DriveRushVisual({ onUse, gauge, burnout }) {
  const [rushing, setRushing] = useState(false)
  const handleRush = () => { if (gauge >= 3 && !burnout) { setRushing(true); onUse(-3); setTimeout(() => setRushing(false), 1000) } }
  return (
    <div className="relative bg-gradient-to-b from-bg-secondary to-bg-primary rounded-xl border border-white/8 h-40 overflow-hidden flex items-center px-6">
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {rushing ? (
            <motion.div key="r" animate={{ x: 160 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <FighterBlock color="#39FF14" label="TOI" />
            </motion.div>
          ) : (
            <motion.div key="i"><FighterBlock color="#39FF14" label="TOI" /></motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2"><FighterBlock color="#FF1E8E" label="ADV." flip /></div>
      <button onClick={handleRush} disabled={gauge < 3 || burnout || rushing} className="absolute bottom-3 right-3 btn-green text-xs px-4 py-2 rounded-lg font-display tracking-widest disabled:opacity-30">
        ⚡ RUSH (−3)
      </button>
    </div>
  )
}

function DriveImpactVisual({ onUse, gauge, burnout }) {
  const handleDI = () => { if (gauge >= 1 && !burnout) { onUse(-1) } }
  return (
    <div className="relative bg-gradient-to-b from-bg-secondary to-bg-primary rounded-xl border border-white/8 h-40 overflow-hidden flex items-center px-6">
      <FighterBlock color="#FF6B1A" label="TOI" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2"><FighterBlock color="#FF1E8E" label="ADV." flip /></div>
      <button onClick={handleDI} disabled={gauge < 1 || burnout} className="absolute bottom-3 right-3 btn-yellow text-xs px-4 py-2 rounded-lg font-display tracking-widest disabled:opacity-30">
        💥 IMPACT (−1)
      </button>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   MODULE PRINCIPAL
══════════════════════════════════════════════════════════════ */
export default function LabModule() {
  const [gauge, setGauge] = useState(MAX_GAUGE)
  const [burnout, setBurnout] = useState(false)
  const [activeTab, setActiveTab] = useState('rush')
  const [activeMode, setActiveMode] = useState('overview') // overview | archetypes

  const modifyGauge = useCallback((delta) => {
    setGauge(prev => {
      let next = Math.max(0, Math.min(MAX_GAUGE, prev + delta))
      if (delta < 0 && next <= 0 && !burnout) { setBurnout(true); next = 0 }
      return next
    })
  }, [burnout])

  const tabs = [
    { id: 'rush',   label: 'Drive Rush',   color: 'text-sf-green' },
    { id: 'impact', label: 'Drive Impact', color: 'text-sf-orange' },
  ]

  const tabContent = {
    rush: { 
      title: 'Drive Rush (DR)', 
      color: 'text-sf-green', 
      Visual: DriveRushVisual, 
      desc: "Un dash vert spécial fondamental dans l'offensive. Il en existe deux types : le 'Raw Drive Rush' (Parry + Avant, Avant) qui coûte 1 barre, et le 'Drive Rush Cancel' (Annule un coup normal en faisant Avant, Avant ou Parry) qui coûte 3 barres. Pendant un Drive Rush, votre personnage glisse avec plus d'élan et toute attaque normale gagne +4 frames de Hit stun et Block stun. C'est l'outil ultime pour s'approcher, maintenir la pression ou étendre un combo. C'est la façon la plus commune de dépenser sa jauge." 
    },
    impact: { title: 'Drive Impact', color: 'text-sf-orange', Visual: DriveImpactVisual, desc: "Coup blindé avec 2 hits d'Armure. Absorbe les pokes adverses et wall-splat dans le coin. Contre : Drive Impact ou Parry." },
  }

  const current = tabContent[activeTab]
  const CurrentVisual = current.Visual

  return (
    <section id="lab" className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="orange" size={600} top="15%" left="5%" opacity={0.05} />
      <PaintSplash color="blue"   size={400} top="60%" right="-5%" opacity={0.04} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome IV"
          title="Le Système Drive"
          subtitle="Le manuel SF6 spécifique : Le Drive System et les Archétypes de personnages."
          color="orange"
        />

        {/* ── TABS de navigation ── */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {[
            { id: 'overview', label: '⚡ Drive System' },
            { id: 'archetypes', label: '🥊 Archétypes' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id)}
              className={`px-6 py-3 rounded-xl border font-display text-sm tracking-widest uppercase transition-all ${
                activeMode === tab.id
                  ? 'bg-sf-orange/15 border-sf-orange/50 text-sf-orange'
                  : 'border-white/8 text-stone hover:border-white/20 hover:text-chalk-dim'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ONGLET 1 : LE DRIVE SYSTEM
        ══════════════════════════════════════════════════════════════ */}
        {activeMode === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
              <div className={`concrete-card p-5 border ${burnout ? 'border-sf-pink/40' : 'border-white/6'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-chalk text-lg tracking-wide">DRIVE GAUGE</h3>
                  <button onClick={() => { setGauge(6); setBurnout(false) }} className="text-xs text-stone hover:text-white"><RotateCcw size={12}/></button>
                </div>
                <DriveGauge value={gauge} burnout={burnout} />
                {burnout && (
                  <div className="mt-4 p-3 rounded-xl bg-sf-pink/10 border border-sf-pink/30">
                    <p className="text-sf-pink text-xs"><strong>BURNOUT</strong> — tu prends des dégâts même en bloquant, et tes specials sont plus lents.</p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="flex gap-2 mb-4">
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 py-3 rounded-xl border font-display tracking-widest text-sm transition-all ${activeTab === t.id ? 'bg-white/10 border-white/20 text-chalk' : 'border-white/5 opacity-50 hover:opacity-75'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="concrete-card p-5">
                  <h3 className={`font-display text-2xl mb-3 ${current.color}`}>{current.title}</h3>
                  <p className="text-chalk-dim text-sm mb-6">{current.desc}</p>
                  <CurrentVisual onUse={modifyGauge} gauge={gauge} burnout={burnout} />
                </div>
              </div>
            </div>

            {/* Tableau récap Drive */}
            <ConcreteCard className="p-6">
              <h3 className="font-display text-chalk text-xl mb-6">LES 5 MÉCANIQUES DRIVE</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { name: 'Drive Rush', cost: '−1 / −3', color: 'sf-green', desc: 'Raw DR (-1) ou DR Cancel (-3). Propulsion +4 frames d\'avantage.' },
                  { name: 'Drive Impact', cost: '−1', color: 'sf-orange', desc: 'Coup avec armure. Wall splat adverse. (MP+MK / DI)' },
                  { name: 'Drive Parry', cost: 'Drain', color: 'sf-blue', desc: 'Absorbe les coups. Perfect Parry = +Drive. (MP+MK Maintenu)' },
                  { name: 'Drive Reversal', cost: '−2', color: 'sf-purple', desc: 'Repousse adversaire. Sortie de blocage. (Avant + DI pendant la garde)' },
                  { name: 'Overdrive', cost: '−2', color: 'sf-yellow', desc: 'Version EX des spéciaux. Plus de dégâts/propriétés. (2 boutons poings/pieds ou R2)' },
                ].map(m => (
                  <div key={m.name} className={`p-4 rounded-xl border border-${m.color}/25 bg-${m.color}/5 text-center`}>
                    <p className={`font-display text-sm text-${m.color} mb-1`}>{m.name}</p>
                    <p className={`font-display text-xs text-${m.color}/60 mb-2`}>{m.cost}</p>
                    <p className="text-chalk-dim text-xs">{m.desc}</p>
                  </div>
                ))}
              </div>
            </ConcreteCard>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            ONGLET 2 : LES ARCHÉTYPES
        ══════════════════════════════════════════════════════════════ */}
        {activeMode === 'archetypes' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
              Chaque personnage de SF6 appartient à un "archétype" — un profil de jeu avec sa propre philosophie. Comprendre le tien (et celui de l'adversaire) est fondamental pour adapter tes stratégies.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Le Shoto',
                  chars: 'Ryu, Ken, Luke, Akuma',
                  color: 'sf-blue',
                  goal: "Contrôler l'espace avec le Hadoken, punir les sauts avec le DP, et engager au corps-à-corps quand l'adversaire est conditionné.",
                  strengths: ['Boules de feu pour le zonage', 'DP invincible comme anti-air', 'Polyvalent dans toutes les distances', 'Facilité d\'adaptation'],
                  weaknesses: ['Pas exceptionnel dans un domaine précis', 'Peut être bloqué par les Zoners de longue portée']
                },
                {
                  name: 'Le Grappler',
                  chars: 'Zangief, Alex, Manon, Marisa',
                  color: 'sf-pink',
                  goal: "Entrer dans la zone de chope adverse (close range) et placer des chopes de commande qui font entre 30 et 40% de vie en un seul input.",
                  strengths: ['Dégâts one-touch parmi les plus élevés du jeu', 'Solidité défensive (HP élevés)', 'Command grab non techables'],
                  weaknesses: ['Vitesse de marche lente', 'Difficile à jouer contre les Zoners', 'Très prévisible']
                },
                {
                  name: 'Le Zoner',
                  chars: 'Guile, JP, Dhalsim, Ingrid',
                  color: 'sf-green',
                  goal: "Contrôler tout l'écran via des projectiles et coups à longue portée. Rendre le neutral frustrant pour forcer l'adversaire à sauter ou se précipiter (et le punir).",
                  strengths: ['Contrôle total du spacing', 'Force l\'adversaire à prendre des risques', 'Excellent corner carry par le projectile game'],
                  weaknesses: ['Vulnérable aux personnages à haute mobilité', 'Peu de possibilités de gameplan']
                },
                {
                  name: 'Le Rushdown',
                  chars: 'Cammy, Juri, M.Bison, Dee Jay',
                  color: 'sf-orange',
                  goal: "Maintenir une pression constante et une vitesse de mouvement élevée. Shimmy, mixup et corps-à-corps non-stop pour ne jamais donner de répit.",
                  strengths: ['Vitesse de marche très élevée', 'Excellents mix-ups au corps-à-corps', 'Très bon pour le Shimmy et les Setplay'],
                  weaknesses: ['Doivent entrer pour être dangereux','Peu de range', 'Pauvres contre un anti-air bien placé']
                },
              ].map(a => (
                <ConcreteCard key={a.name} className={`p-6 border-t-2 border-t-${a.color}/50`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`font-display text-2xl text-${a.color} mb-1`}>{a.name}</h3>
                      <p className="text-stone text-xs font-display tracking-widest uppercase">{a.chars}</p>
                    </div>
                  </div>

                  <p className="text-chalk-dim text-sm leading-relaxed mb-4 border-l-2 border-white/10 pl-3">{a.goal}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-display text-sf-green uppercase tracking-widest mb-2">Forces</p>
                      <ul className="space-y-1">
                        {a.strengths.map(s => <li key={s} className="text-chalk-dim text-xs flex items-start gap-1.5"><span className="text-sf-green mt-0.5">+</span>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-display text-sf-pink uppercase tracking-widest mb-2">Faiblesses</p>
                      <ul className="space-y-1">
                        {a.weaknesses.map(w => <li key={w} className="text-chalk-dim text-xs flex items-start gap-1.5"><span className="text-sf-pink mt-0.5">−</span>{w}</li>)}
                      </ul>
                    </div>
                  </div>
                </ConcreteCard>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
