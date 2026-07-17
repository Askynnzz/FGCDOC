import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { ArrowRight, CheckCircle2, XCircle, ChevronRight, Crosshair, Shield, AlertTriangle } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   COMPOSANT : SIMULATEUR D'ESPACEMENT
   Montre la notion de portée de poke et de "safe distance"
══════════════════════════════════════════════════════════════ */
function SpacingSimulator() {
  const [playerX, setPlayerX] = useState(20) // % from left
  const [isPoking, setIsPoking] = useState(false)
  const [pokeResult, setPokeResult] = useState(null) // null | 'hit' | 'whiff' | 'punished'
  const advX = 75 // opponent fixed at 75%
  const POKE_REACH = 18 // % range of the poke

  const distance = advX - playerX

  const doZone = distance > POKE_REACH + 4
  const doIdeal = distance >= POKE_REACH - 2 && distance <= POKE_REACH + 4
  const doTooClose = distance < POKE_REACH - 2

  const zoneColor = doZone ? 'text-sf-blue' : doIdeal ? 'text-sf-green' : 'text-sf-pink'
  const zoneLabel = doZone ? 'Hors de portée' : doIdeal ? '✓ Zone de Poke Idéale' : '⚠ Trop Proche (Zone de Chope)'

  const triggerPoke = () => {
    if (isPoking) return
    setIsPoking(true)
    setPokeResult(null)
    setTimeout(() => {
      if (doIdeal) setPokeResult('hit')
      else if (doZone) setPokeResult('whiff')
      else setPokeResult('punished')
      setTimeout(() => { setIsPoking(false); setPokeResult(null) }, 1400)
    }, 200)
  }

  return (
    <ConcreteCard className="p-6">
      <h3 className="font-display text-chalk text-xl mb-1">SIMULATEUR DE SPACING</h3>
      <p className="text-chalk-dim text-xs mb-6">
        Déplace-toi avec le curseur, puis appuie sur <strong>POKE</strong>. Trouve la bonne distance.
      </p>

      {/* Terrain */}
      <div className="relative h-28 bg-black/40 rounded-xl border border-white/8 mb-4 overflow-hidden select-none">
        {/* Sol */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        {/* Zone de poke visualisée */}
        <div
          className="absolute bottom-0 h-full bg-sf-green/5 border-l-2 border-r-2 border-sf-green/20 border-dashed"
          style={{ left: `${advX - POKE_REACH}%`, width: `${POKE_REACH}%` }}
        >
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-sf-green/50 font-display whitespace-nowrap">PORTÉE DU POKE</span>
        </div>

        {/* Joueur */}
        <motion.div
          className="absolute bottom-0 flex flex-col items-center cursor-grab active:cursor-grabbing"
          style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(e, info) => {
            const container = e.target.closest('.relative')
            if (!container) return
            const rect = container.getBoundingClientRect()
            const newX = Math.max(5, Math.min(65, ((info.point.x - rect.left) / rect.width) * 100))
            setPlayerX(newX)
          }}
          animate={pokeResult === 'hit' ? { x: [0, 10, 0] } : {}}
        >
          <svg width="28" height="44" viewBox="0 0 36 56" fill="none">
            <circle cx="18" cy="8" r="7" fill="#39FF14" opacity="0.9" />
            <rect x="11" y="15" width="14" height="20" rx="3" fill="#39FF14" opacity="0.85" />
            <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
            <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
            <rect x="2" y="17" width="10" height="4" rx="2" fill="#39FF14" opacity="0.75" />
            <rect x="24" y="17" width="10" height="4" rx="2" fill="#39FF14" opacity="0.75" />
          </svg>
          <span className="text-[9px] font-display text-sf-green mt-0.5">TOI</span>
        </motion.div>

        {/* Adversaire */}
        <div className="absolute bottom-0 flex flex-col items-center" style={{ left: `${advX}%`, transform: 'translateX(-50%)' }}>
          <motion.div
            animate={pokeResult === 'punished' ? { x: [-5, 5, -5, 0] } : pokeResult === 'hit' ? { x: [0, 12, 0] } : {}}
          >
            <svg width="28" height="44" viewBox="0 0 36 56" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <circle cx="18" cy="8" r="7" fill="#FF1E8E" opacity="0.9" />
              <rect x="11" y="15" width="14" height="20" rx="3" fill="#FF1E8E" opacity="0.85" />
              <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
              <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
              <rect x="2" y="17" width="10" height="4" rx="2" fill="#FF1E8E" opacity="0.75" />
              <rect x="24" y="17" width="10" height="4" rx="2" fill="#FF1E8E" opacity="0.75" />
            </svg>
          </motion.div>
          <span className="text-[9px] font-display text-sf-pink">ADV.</span>
        </div>

        {/* Extension du poke (animation) */}
        <AnimatePresence>
          {isPoking && (
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute h-1 rounded-full"
              style={{
                bottom: '34px',
                left: `${playerX}%`,
                width: `${POKE_REACH}%`,
                background: pokeResult === 'hit' ? '#39FF14' : '#aaa',
                boxShadow: `0 0 8px ${pokeResult === 'hit' ? '#39FF14' : '#aaa'}`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Résultat */}
        <AnimatePresence>
          {pokeResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-display text-sm border ${
                pokeResult === 'hit' ? 'bg-sf-green/20 border-sf-green/60 text-sf-green' :
                pokeResult === 'whiff' ? 'bg-white/10 border-white/20 text-chalk-dim' :
                'bg-sf-pink/20 border-sf-pink/60 text-sf-pink'
              }`}
            >
              {pokeResult === 'hit' ? '✓ POKE TOUCHE !' : pokeResult === 'whiff' ? 'DANS LE VIDE...' : '✗ TROP PROCHE — CHOPÉ !'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicateur de zone */}
      <div className={`text-center text-sm font-display tracking-wide mb-4 ${zoneColor}`}>{zoneLabel}</div>

      <button
        onClick={triggerPoke}
        disabled={isPoking}
        className={`w-full py-3 rounded-xl font-display tracking-widest text-sm transition-all ${
          isPoking ? 'bg-white/5 text-stone cursor-not-allowed' : 'bg-sf-green/15 border border-sf-green/40 text-sf-green hover:bg-sf-green/25'
        }`}
      >
        {isPoking ? 'POKE EN COURS...' : '👊 LANCER UN POKE (Bas Moyen Pied)'}
      </button>
    </ConcreteCard>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT : COMPARAISON ✓ / ✗ VISUELLES
══════════════════════════════════════════════════════════════ */
function DosDonts({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`p-5 rounded-2xl border ${item.ok
            ? 'border-sf-green/25 bg-sf-green/5'
            : 'border-sf-pink/25 bg-sf-pink/5'
          }`}
        >
          <div className="flex items-start gap-3">
            {item.ok
              ? <CheckCircle2 className="text-sf-green mt-0.5 flex-shrink-0" size={18} />
              : <XCircle className="text-sf-pink mt-0.5 flex-shrink-0" size={18} />
            }
            <div>
              <p className={`font-display text-base tracking-wide mb-1 ${item.ok ? 'text-sf-green' : 'text-sf-pink'}`}>
                {item.action}
              </p>
              <p className="text-chalk-dim text-sm leading-relaxed">{item.why}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT : SCÉNARIO INTERACTIF ANTI-AIR
══════════════════════════════════════════════════════════════ */
function AntiAirScenario() {
  const [phase, setPhase] = useState('idle') // idle | jumping | result
  const [choice, setChoice] = useState(null)

  const choose = (c) => {
    if (phase !== 'jumping') return
    setChoice(c)
    setPhase('result')
  }

  const start = () => { setPhase('jumping'); setChoice(null) }
  const reset = () => { setPhase('idle'); setChoice(null) }

  const results = {
    antiair: { label: 'SHORYUKEN — ANTI-AIR !', color: 'sf-green', desc: "L'adversaire prend un Shoryuken dans les airs. Il retombe, tu récupères l'avantage. C'est la réponse correcte. Toujours." },
    block: { label: 'TU AS BLOQUÉ', color: 'sf-yellow', desc: "Tu n'as pas pris de dégâts, mais il atterrit avec l'avantage. La pression continue. Le jump-in n'a rien coûté à l'adversaire." },
    nothing: { label: 'DAMN !', color: 'sf-pink', desc: "Tu as mal réagi. Plein combo. Perdre de la vie, perdre l'avantage. Ne jamais laisser un jump-in passer sans réponse." },
  }

  return (
    <ConcreteCard className="p-6">
      <h3 className="font-display text-chalk text-xl mb-2">SCÉNARIO : L'ADVERSAIRE SAUTE</h3>
      <p className="text-chalk-dim text-xs mb-6">
        Il quitte le sol avec un gros poing. Tu as environ <strong>40 frames</strong> pour réagir (~660ms). Quelle est ta réponse ?
      </p>

      {/* Terrain */}
      <div className="relative h-32 bg-black/40 rounded-xl border border-white/8 mb-6 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        {/* Toi (sol) */}
        <div className="absolute bottom-0 left-12 flex flex-col items-center">
          <svg width="28" height="44" viewBox="0 0 36 56" fill="none">
            <circle cx="18" cy="8" r="7" fill="#39FF14" opacity="0.9" />
            <rect x="11" y="15" width="14" height="20" rx="3" fill="#39FF14" opacity="0.85" />
            <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
            <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
            {choice === 'antiair' && <rect x="20" y="4" width="10" height="4" rx="2" fill="#39FF14" opacity="1" style={{ transform: 'rotate(-45deg)', transformOrigin: '25px 6px' }} />}
          </svg>
          <span className="text-[9px] font-display text-sf-green">TOI</span>
        </div>

        {/* Adversaire qui saute */}
        <motion.div
          className="absolute right-12 flex flex-col items-center"
          animate={
            phase === 'jumping' ? { bottom: ['0%', '50%', '0%'], transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } } :
            phase === 'result' && choice === 'antiair' ? { bottom: '50%', rotate: 45, opacity: 0 } :
            { bottom: '0%' }
          }
          initial={{ bottom: '0%' }}
        >
          <svg width="28" height="44" viewBox="0 0 36 56" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <circle cx="18" cy="8" r="7" fill="#FF1E8E" opacity="0.9" />
            <rect x="11" y="15" width="14" height="20" rx="3" fill="#FF1E8E" opacity="0.85" />
            <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
            <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
          </svg>
          <span className="text-[9px] font-display text-sf-pink">ADV.</span>
        </motion.div>

        {/* Instructions flottantes */}
        <AnimatePresence>
          {phase === 'jumping' && !choice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="font-display text-sf-yellow text-sm tracking-widest animate-pulse">▼ CHOISIS UNE OPTION ▼</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Boutons de choix */}
      {phase === 'idle' && (
        <button onClick={start} className="w-full py-3 bg-sf-orange/15 border border-sf-orange/40 text-sf-orange rounded-xl font-display tracking-widest text-sm hover:bg-sf-orange/25 transition-all">
          ⚡ L'ADVERSAIRE SAUTE — QUE FAIS-TU ?
        </button>
      )}

      {phase === 'jumping' && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'antiair', label: '⚡ Anti-Air (DP)', desc: 'Shoryuken' },
            { id: 'block',   label: '🛡 Je Bloque',    desc: 'Arrière' },
            { id: 'nothing', label: '😬 Je fais autre chose', desc: 'Mauvais timing' },
          ].map(opt => (
            <button key={opt.id} onClick={() => choose(opt.id)} className="p-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-center transition-all">
              <p className="font-display text-xs text-chalk">{opt.label}</p>
              <p className="text-stone text-[10px] mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      )}

      {phase === 'result' && choice && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`p-4 rounded-xl border border-${results[choice].color}/40 bg-${results[choice].color}/10 mb-3`}>
            <p className={`font-display text-lg mb-2 text-${results[choice].color}`}>{results[choice].label}</p>
            <p className="text-chalk-dim text-sm">{results[choice].desc}</p>
          </div>
          <button onClick={reset} className="w-full btn-outline py-2 text-xs font-display tracking-widest rounded-xl">
            ← Rejouer
          </button>
        </motion.div>
      )}
    </ConcreteCard>
  )
}

/* ══════════════════════════════════════════════════════════════
   MODULE PRINCIPAL — TOME II
══════════════════════════════════════════════════════════════ */
export default function NeutralModule() {
  return (
    <section id="neutral" className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="green"  size={700} top="10%"  left="5%"   opacity={0.05} />
      <PaintSplash color="blue"   size={500} top="55%"  right="-5%" opacity={0.04} />
      <PaintSplash color="yellow" size={400} top="85%"  left="20%"  opacity={0.03} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome II"
          title="L'Espace et Le Mouvement"
          subtitle="Le Neutral, c'est la phase où personne n'a l'avantage. C'est ici que se gagnent les vraies parties. Avant les combos, avant les stratégies avancées, il faut maîtriser les règles de base."
          color="green"
        />

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 : C'EST QUOI LE NEUTRAL ?
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Crosshair className="text-sf-green" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">1. C'EST QUOI LE NEUTRAL ?</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-chalk-dim leading-relaxed mb-4">
                Le <strong className="text-chalk">Neutral</strong> (ou "jeu neutre"), c'est le moment du match où les deux joueurs sont <strong>debout, à distance, sans avantage particulier</strong>. Ni toi, ni ton adversaire ne domine. C'est une danse.
              </p>
              <p className="text-chalk-dim leading-relaxed mb-4">
                L'objectif du neutral est simple en théorie : <strong className="text-chalk">créer une ouverture</strong> pour porter la première attaque décisive, ou <strong className="text-chalk">forcer ton adversaire à faire une erreur</strong> que tu pourras punir.
              </p>
              <p className="text-chalk-dim leading-relaxed">
                En pratique, c'est là que se joue 90% du match. Les combos sont un bonus auquel tu veux <em>accéder</em>, c'est ça le vrai défi.
              </p>
            </div>

            {/* Visuel : Division de l'écran */}
            <div className="concrete-card p-4">
              <p className="text-stone text-xs font-display uppercase tracking-widest mb-3 text-center">La carte du terrain</p>
              <div className="relative h-32 bg-black/40 rounded-lg border border-white/8 overflow-hidden flex items-end">
                {/* Zones */}
                <div className="absolute inset-0 flex">
                  <div className="w-[15%] bg-sf-pink/10 border-r border-sf-pink/20 flex items-center justify-center">
                    <span className="text-[9px] text-sf-pink font-display rotate-90 tracking-widest">COIN</span>
                  </div>
                  <div className="flex-1 bg-sf-green/5 flex items-center justify-center">
                    <span className="text-[10px] text-sf-green font-display tracking-widest">MIDSCREEN — ZONE NEUTRE</span>
                  </div>
                  <div className="w-[15%] bg-sf-pink/10 border-l border-sf-pink/20 flex items-center justify-center">
                    <span className="text-[9px] text-sf-pink font-display rotate-90 tracking-widest">COIN</span>
                  </div>
                </div>

                {/* Personnages */}
                <div className="absolute bottom-0 left-[30%]">
                  <svg width="24" height="36" viewBox="0 0 36 56" fill="none">
                    <circle cx="18" cy="8" r="7" fill="#39FF14" opacity="0.9" />
                    <rect x="11" y="15" width="14" height="20" rx="3" fill="#39FF14" opacity="0.85" />
                    <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
                    <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#39FF14" opacity="0.7" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-[30%]">
                  <svg width="24" height="36" viewBox="0 0 36 56" fill="none" style={{ transform: 'scaleX(-1)' }}>
                    <circle cx="18" cy="8" r="7" fill="#FF1E8E" opacity="0.9" />
                    <rect x="11" y="15" width="14" height="20" rx="3" fill="#FF1E8E" opacity="0.85" />
                    <rect x="11" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
                    <rect x="20" y="33" width="5" height="16" rx="2.5" fill="#FF1E8E" opacity="0.7" />
                  </svg>
                </div>

                {/* Flèches objectif */}
                <div className="absolute top-2 right-[30%] text-[9px] text-sf-green font-display">← Pousser</div>
                <div className="absolute top-2 left-[30%] text-[9px] text-sf-pink font-display text-right">Pousser →</div>
              </div>
              <p className="text-stone text-[10px] mt-2 text-center">L'objectif : pousser l'adversaire dans le coin = ses options réduites de 50%.</p>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 : LA PORTÉE DE POKE — SIMULATEUR
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <ChevronRight className="text-sf-green" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">2. LA DISTANCE — LE CONCEPT LE PLUS IMPORTANT</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Chaque coup normal a une <strong className="text-chalk">portée maximale</strong>. La distance idéale pour un <em>poke</em> (coup neutre de harcèlement), c'est d'être juste à la limite de cette portée. Trop loin : le coup passe dans le vide. Trop proche : tu te fais chopper.
          </p>

          <SpacingSimulator />

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { zone: 'Trop loin', color: 'sf-blue', icon: '↔', desc: "Ton coup ne touche pas. Tu es en sécurité si tu es trop loin de l'adversaire, sinon tu viens de whiffer ton coup et tu risques d'être punis ! Il faut apprendre à maîtriser la distance de chacun de tes coups." },
              { zone: 'Zone Idéale', color: 'sf-green', icon: '✓', desc: "La 'max range' de ton poke. Le coup atteint sa cible pendant sa phase ACTIVE extrême. Si l'adversaire avance ou sort un coup, il se fait toucher." },
              { zone: 'Trop proche', color: 'sf-pink', icon: '!', desc: "Tu es dans la portée de chope ou d'un jab qui sortira généralement bien plus vite que ton poke. C'est la zone à éviter à tout prix quand tu cherches à poke." },
            ].map(z => (
              <ConcreteCard key={z.zone} className={`p-4 border-t-2 border-t-${z.color}/50`}>
                <p className={`font-display text-lg text-${z.color} mb-2`}>{z.icon} {z.zone}</p>
                <p className="text-chalk-dim text-xs leading-relaxed">{z.desc}</p>
              </ConcreteCard>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 : CE QU'IL FAUT FAIRE / NE PAS FAIRE
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-sf-yellow" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">3. LES RÈGLES DU NEUTRAL</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Ces règles sont valables dans 95% des situations. Les maîtriser, c'est passer du niveau "débutant qui subit" au niveau "joueur qui comprend ce qu'il se passe".
          </p>

          <DosDonts items={[
            {
              ok: true,
              action: 'Marcher vers l\'adversaire progressivement',
              why: 'Walk forward / walk back est la mécanique de base. Avancer pour menacer, reculer pour faire rater ses coups. La marche est gratuite et certains personnages avec une vitesse de marche élevée doivent en abuser !.',
            },
            {
              ok: false,
              action: 'Sauter en neutral sans raison',
              why: 'Un saut dure ~45 frames, soit 750ms. Pendant ce temps, tu ne peux pas changer de direction. C\'est une trajectoire prévisible. Tout bon joueur a un anti-air prêt. Tu vas juste te faire punir à chaque fois.',
            },
            {
              ok: true,
              action: 'Utiliser les coups moyens/légers comme pokes',
              why: 'Les Medium et Light (MK, MP) ont une bonne portée sans être trop lents. Ils "sondent" l\'espace adverse. S\'ils touchent, tu engages. S\'ils ratent, tu te remets vite en position neutre grâce à leur courte recovery.',
            },
            {
              ok: false,
              action: 'Spammer les gros coups lents (HK, HP)',
              why: 'Les Heavy ont trop de recovery. Si tu rates, tu te fais punir largement. En neutral, c\'est une sentence de mort. Garde-les pour punir des erreurs adverses grossières, pas pour "attaquer en premier".',
            },
            {
              ok: true,
              action: 'Bloquer bas quand tu n\'es pas sûr',
              why: 'En situation de doute, bloquer bas couvre les coups bas ET les coups hauts (les plus courants). Tu n\'es vulnérable qu\'aux overheads qui sont lent et facile à punir !',
            },
            {
              ok: false,
              action: 'Rester immobile à portée de coup adverse',
              why: 'Être statique, c\'est donner un timing gratuit à l\'adversaire. Il peut aligner son poke sur toi sans risque. Bouge toujours. Le mouvement crée des erreurs chez lui.',
            },
          ]} />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 4 : L'ANTI-AIR — SCÉNARIO INTERACTIF
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-sf-orange" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">4. L'ANTI-AIR — LA RÈGLE D'OR</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            La règle la plus importante du neutral : <strong className="text-chalk">ne jamais laisser un saut passer impunément</strong>. Chaque saut adverse non puni lui apprend que sauter est gratuit. Il va recommencer. C'est une spirale. Coupez-la dès le premier.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <AntiAirScenario />

            <div className="space-y-4">
              <ConcreteCard className="p-5 border-t-2 border-t-sf-green/50">
                <h4 className="font-display text-sf-green text-lg mb-3">Les outils anti-air par type</h4>
                <div className="space-y-3 text-sm">
                  {[
                    { name: 'Le DP (Dragon Punch = anti air)', ex: 'Ryu/Ken : ↓↘→ + Poing (ou ➔ + S en Moderne)', desc: "Coup invincible au startup. Brise l'armor et punit les sauts. Le meilleur outil, mais risqué si utilisé sans saut adverse (punissable à -30)." },
                    { name: 'Le Bouton Neutre', ex: 'HP ou HK debout (H en Moderne)', desc: "Le plus simple. Ce type de coup debout bat la plupart des cross-ups. Pas besoin de motion, juste timing et bonne portée." },
                    { name: 'Le Drive Impact', ex: 'MP+MK (ou bouton DI)', desc: "Absorbe un coup du saut et contre. Utile si tu n'as pas le timing pour un DP. Coûte 1 barre de Drive." },
                  ].map(tool => (
                    <div key={tool.name} className="border-l-2 border-sf-green/30 pl-3">
                      <p className="font-display text-chalk text-sm">{tool.name}</p>
                      <p className="text-stone text-[10px] font-display mb-1">{tool.ex}</p>
                      <p className="text-chalk-dim text-xs">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </ConcreteCard>

              <div className="p-4 rounded-2xl border border-sf-orange/25 bg-sf-orange/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-sf-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-display text-sf-orange text-sm mb-1">Le réflexe à construire</p>
                    <p className="text-chalk-dim text-sm leading-relaxed">
                      L'anti-air ne se fait pas "à la réflexion". Il se construit comme un réflexe. Passe du temps en training mode avec le mannequin paramétré sur "Sauter aléatoirement". Ton cerveau finira par détecter le saut avant même que tu l'aies conscientisé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 5 : LE WHIFF PUNISH — LA NOTION CLEF
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Crosshair className="text-sf-pink" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">5. LE WHIFF PUNISH — PUNIR LES ERREURS</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-chalk-dim leading-relaxed mb-4">
                Le <strong className="text-chalk">Whiff Punish</strong> (punition d'un coup dans le vide), c'est le cœur du neutral au sol. L'adversaire avance et essaie de te toucher. Il rate son coup (Whiff). Pendant sa récupération (Recovery), il ne peut RIEN faire. C'est ta fenêtre de punition.
              </p>
              <p className="text-chalk-dim leading-relaxed mb-6">
                L'exécuter demande du positionnement : être <em>juste hors de portée</em> pour que son coup rate, puis avancer rapidement avec un coup plus puissant (ou un combo).
              </p>

              <div className="space-y-3">
                {[
                  { step: '1', label: 'Il avance et essaie de te toucher', color: 'sf-pink' },
                  { step: '2', label: 'Son coup passe dans le vide (Whiff)', color: 'sf-orange' },
                  { step: '3', label: 'Sa Recovery commence : il ne peut rien faire', color: 'sf-yellow' },
                  { step: '4', label: 'Tu avances et le punis lourdement', color: 'sf-green' },
                ].map(s => (
                  <div key={s.step} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full bg-${s.color}/20 border border-${s.color}/40 flex items-center justify-center flex-shrink-0`}>
                      <span className={`font-display text-${s.color} text-sm`}>{s.step}</span>
                    </div>
                    <p className="text-chalk-dim text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <ConcreteCard className="p-6">
              <h4 className="font-display text-chalk text-lg mb-4">Exemple concret : Ryu</h4>
              <div className="space-y-4 text-sm">
                <div className="p-3 rounded-lg bg-sf-pink/10 border border-sf-pink/20">
                  <p className="font-display text-sf-pink text-xs uppercase mb-1">Adversaire</p>
                  <p className="text-chalk-dim">Fait un Bas Lourd Pied (cr.HK) en avançant pour essayer de te toucher.</p>
                </div>
                <div className="flex justify-center text-stone">↓</div>
                <div className="p-3 rounded-lg bg-sf-yellow/10 border border-sf-yellow/20">
                  <p className="font-display text-sf-yellow text-xs uppercase mb-1">Ce qu'il se passe</p>
                  <p className="text-chalk-dim">Son cr.HK rate (tu étais juste hors portée). Il est en Recovery pendant ~25 frames.</p>
                </div>
                <div className="flex justify-center text-stone">↓</div>
                <div className="p-3 rounded-lg bg-sf-green/10 border border-sf-green/20">
                  <p className="font-display text-sf-green text-xs uppercase mb-1">Ta réponse</p>
                  <p className="text-chalk-dim">Tu fonces avec un Bas Moyen Pied → Hadoken (cr.MK → ↓↘→+P ou Bas M → S en Moderne). Punition gratuite.</p>
                </div>
              </div>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SUITE PÉDAGOGIQUE
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-6 rounded-2xl border border-sf-green/20 bg-sf-green/5 mb-8">
            <p className="font-display text-sf-green text-lg mb-2">✓ Les fondations sont là. Et après ?</p>
            <p className="text-chalk-dim text-sm leading-relaxed">
              Tu sais maintenant ce qu'est le neutral, comment gérer l'espace et les règles de base. La prochaine étape : comprendre <strong className="text-chalk">pourquoi certains coups te punissent</strong> (Frame Data) et comment <strong className="text-chalk">briser les habitudes de l'adversaire</strong> (Psychologie).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/frame-data" className="group">
              <ConcreteCard className="p-6 h-full border-white/5 group-hover:border-sf-yellow/50 transition-colors">
                <p className="text-stone text-xs font-display tracking-widest uppercase mb-2">Suivant →</p>
                <h3 className="font-display text-chalk text-xl mb-2 group-hover:text-sf-yellow transition-colors">Tome I : Les Mathématiques</h3>
                <p className="text-chalk-dim text-sm">Pourquoi ton poke s'est fait punir ? Comprends les frames et la frame data.</p>
              </ConcreteCard>
            </Link>
            <Link to="/psychology" className="group">
              <ConcreteCard className="p-6 h-full border-white/5 group-hover:border-sf-pink/50 transition-colors">
                <p className="text-stone text-xs font-display tracking-widest uppercase mb-2">Aller plus loin →</p>
                <h3 className="font-display text-chalk text-xl mb-2 group-hover:text-sf-pink transition-colors">Tome III : Psychologie</h3>
                <p className="text-chalk-dim text-sm">L'adversaire fait toujours pareil ? Apprends à lire ses patterns et à les détruire.</p>
              </ConcreteCard>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
