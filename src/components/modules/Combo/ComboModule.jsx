import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { Link2, Unlink, Zap, Activity, AlertTriangle, ArrowRight } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   COMPOSANT : HIT CONFIRM SIMULATOR
══════════════════════════════════════════════════════════════ */
function HitConfirmSimulator() {
  const [phase, setPhase] = useState('idle') // idle | attacking | confirming | result
  const [targetHit, setTargetHit] = useState(false)
  const [result, setResult] = useState(null) // success_combo | success_safe | fail_drop | fail_punish
  const [reactionTime, setReactionTime] = useState(0)

  // Simulation timeline
  useEffect(() => {
    let timeout
    if (phase === 'attacking') {
      // Le premier coup (poke) est lancé. 
      // On décide aléatoirement s'il touche ou s'il est bloqué (50/50).
      const willHit = Math.random() > 0.5
      
      timeout = setTimeout(() => {
        setTargetHit(willHit)
        setPhase('confirming')
        
        // Fenêtre de confirm de 300ms (env. 18 frames)
        setTimeout(() => {
          setPhase(prev => {
            if (prev === 'confirming') {
              // Le joueur n'a rien fait.
              if (willHit) setResult('fail_drop') // Combo raté
              else setResult('success_safe') // C'était bloqué, il a eu raison de ne rien faire
              return 'result'
            }
            return prev
          })
        }, 350)
        
      }, 800 + Math.random() * 1000) // Temps aléatoire avant l'impact
    }
    return () => clearTimeout(timeout)
  }, [phase])

  const handleStart = () => {
    setPhase('attacking')
    setResult(null)
    setTargetHit(false)
  }

  const handleConfirm = () => {
    if (phase !== 'confirming') {
      // Mashé avant l'impact
      if (phase === 'attacking') {
        setResult('fail_punish')
        setPhase('result')
      }
      return
    }
    
    // Le joueur a cliqué pendant la fenêtre de confirm
    if (targetHit) {
      setResult('success_combo')
    } else {
      setResult('fail_punish') // A continué le combo sur une garde -> punissable
    }
    setPhase('result')
  }

  const getResultFeedback = () => {
    if (!result) return null
    if (result === 'success_combo') return { text: "COMBO RÉUSSI ! Tu as vu le hit, tu as cancel into un spécial.", color: "text-sf-green", bg: "bg-sf-green/10", border: "border-sf-green/40" }
    if (result === 'success_safe') return { text: "SAFE. Tu as vu la garde, tu as stoppé ton attaque. Parfait.", color: "text-sf-blue", bg: "bg-sf-blue/10", border: "border-sf-blue/40" }
    if (result === 'fail_drop') return { text: "DROP. Ça a touché mais tu as réagi trop tard ! Dommage.", color: "text-sf-orange", bg: "bg-sf-orange/10", border: "border-sf-orange/40" }
    if (result === 'fail_punish') return { text: "PUNITION. Ça a été bloqué (ou tu as cliqué trop tôt). L'adversaire va te détruire.", color: "text-sf-pink", bg: "bg-sf-pink/10", border: "border-sf-pink/40" }
    return null
  }

  const feedback = getResultFeedback()

  return (
    <ConcreteCard className="p-6 relative overflow-hidden border border-white/5">
      <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={100} /></div>
      <h3 className="font-display text-chalk text-2xl mb-2 relative z-10">SIMULATEUR DE HIT CONFIRM</h3>
      <p className="text-chalk-dim text-sm mb-6 max-w-2xl relative z-10">
        Clique sur <strong>ATTAQUER</strong>. Si le voyant devient <strong className="text-sf-green">VERT</strong> (Hit), clique vite sur <strong>CONFIRM</strong> pour faire ton spécial. 
        S'il devient <strong className="text-sf-pink">ROUGE</strong> (Bloqué), ne fais <strong>RIEN</strong>.
      </p>

      <div className="flex flex-col items-center gap-8 mb-4">
        {/* Voyant / Adversaire */}
        <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-colors duration-75 ${
          phase === 'idle' || phase === 'attacking' ? 'border-white/10 bg-black/50' :
          phase === 'confirming' && targetHit ? 'border-sf-green bg-sf-green/20 shadow-[0_0_30px_rgba(57,255,20,0.5)]' :
          phase === 'confirming' && !targetHit ? 'border-sf-pink bg-sf-pink/20 shadow-[0_0_30px_rgba(255,30,142,0.5)]' :
          'border-white/10 bg-black/50'
        }`}>
          {phase === 'confirming' && targetHit && <span className="font-display text-sf-green text-xl">HIT!</span>}
          {phase === 'confirming' && !targetHit && <span className="font-display text-sf-pink text-xl">BLOCK!</span>}
        </div>

        {/* Boutons */}
        <div className="flex gap-4 w-full max-w-md">
          <button 
            onMouseDown={phase === 'idle' || phase === 'result' ? handleStart : null}
            disabled={phase === 'attacking' || phase === 'confirming'}
            className="flex-1 py-4 btn-outline text-sm disabled:opacity-30"
          >
            {phase === 'idle' || phase === 'result' ? '1. ATTAQUER' : 'ATTENTE...'}
          </button>
          <button 
            onMouseDown={handleConfirm}
            disabled={phase === 'idle' || phase === 'result'}
            className={`flex-1 py-4 rounded-xl font-display tracking-widest text-lg transition-all ${
              phase === 'attacking' || phase === 'confirming'
                ? 'bg-sf-yellow hover:bg-sf-yellow/80 text-black shadow-[0_0_15px_rgba(255,184,0,0.3)]' 
                : 'bg-white/5 border border-white/10 text-stone cursor-not-allowed'
            }`}
          >
            2. CONFIRM
          </button>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'result' && feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border ${feedback.border} ${feedback.bg} w-full max-w-md text-center`}
            >
              <p className={`font-display tracking-wide ${feedback.color}`}>{feedback.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConcreteCard>
  )
}

/* ══════════════════════════════════════════════════════════════
   MODULE PRINCIPAL
══════════════════════════════════════════════════════════════ */
export default function ComboModule() {
  return (
    <section id="combos" className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="pink" size={600} top="15%" left="5%" opacity={0.05} />
      <PaintSplash color="green" size={500} top="65%" right="-5%" opacity={0.04} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome V"
          title="Les Combo"
          subtitle="La théorie des dégâts. Comment lier les coups, confirmer une touche et comprendre la réduction des dégâts."
          color="pink"
        />

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 : LINKS VS CANCELS
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="text-sf-pink" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">1. LINKS VS CANCELS</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Il y a deux manières d'enchaîner des coups dans Street Fighter. Les confondre, c'est s'assurer de rater ses combos.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <ConcreteCard className="p-6 border-t-2 border-t-sf-blue/50">
              <div className="flex items-center gap-3 mb-4">
                <Unlink className="text-sf-blue" size={24} />
                <h3 className="font-display text-sf-blue text-2xl">Le Link</h3>
              </div>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                Tu fais un coup, tu attends que son animation se termine complètement, puis tu lances un autre coup qui touche avant que l'adversaire ne sorte de son Hitstun. C'est purement mathématique (Frame Data).
              </p>
              <div className="p-4 bg-sf-blue/5 border border-sf-blue/20 rounded-xl mb-4">
                <p className="text-[10px] font-display text-sf-blue uppercase tracking-widest mb-1">Condition</p>
                <p className="text-chalk text-xs">Ton avantage onHit doit être supérieur au startup du coup suivant.</p>
              </div>
              <p className="text-stone text-xs italic">Ex: cr.MP (touche) → Attente complète → cr.MP</p>
            </ConcreteCard>

            <ConcreteCard className="p-6 border-t-2 border-t-sf-pink/50">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="text-sf-pink" size={24} />
                <h3 className="font-display text-sf-pink text-2xl">Le Cancel</h3>
              </div>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                Tu <strong>interromps</strong> l'animation de ton coup normal (pendant ses Active Frames) pour lancer un coup spécial ou un Super. Tu zappes complètement la phase de Recovery.
              </p>
              <div className="p-4 bg-sf-pink/5 border border-sf-pink/20 rounded-xl mb-4">
                <p className="text-[10px] font-display text-sf-pink uppercase tracking-widest mb-1">Condition</p>
                <p className="text-chalk text-xs">Le coup normal doit avoir la propriété "Special Cancelable".</p>
              </div>
              <p className="text-stone text-xs italic">Ex: cr.MK (touche) → Imput direct Hadoken</p>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 : LE HIT CONFIRM
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-sf-yellow" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">2. LE HIT CONFIRM</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Un coup spécial comme un Hadoken ou un Shoryuken est dangereux. S'il est bloqué, tu te feras punir lourdement. Le "Hit Confirm" consiste à frapper avec un coup normal safe, vérifier visuellement s'il a touché, et annuler en spécial <strong>uniquement si c'est un hit</strong>.
          </p>

          <HitConfirmSimulator />

          <div className="mt-8">
            <ConcreteCard className="p-6 border-l-4 border-l-sf-green bg-sf-green/5">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="text-sf-green" size={20} />
                <h3 className="font-display text-sf-green text-xl">La Limite Humaine & Le Buffering</h3>
              </div>
              <p className="text-[#1A1815]/80 text-sm leading-relaxed mb-4 font-medium">
                Le temps de réaction humain moyen est d'environ 15 frames (250ms). Or, l'animation d'un coup rapide (Light) dure généralement moins de 15 frames. Il est donc <strong>physiquement impossible</strong> de confirmer visuellement l'impact d'un seul coup rapide.
              </p>
              <p className="text-[#1A1815]/80 text-sm leading-relaxed mb-4 font-medium">
                Pour pallier ce problème, les joueurs utilisent le <strong>Buffering d'inputs (Mémoire tampon)</strong>. Plutôt que d'attendre de voir si le coup touche, tu effectues le mouvement de ton attaque spéciale <em>pendant l'animation de ton attaque normale</em>.
              </p>
              <ul className="text-[#1A1815]/70 text-sm space-y-2 border-l-2 border-sf-green/30 pl-4 mb-4">
                <li>➔ <strong>Si le coup tape dans le vide (Whiff) :</strong> le coup normal termine son animation dans le vent, et l'input du coup spécial est ignoré. Tu restes en sécurité.</li>
                <li>➔ <strong>Si le coup touche l'adversaire (Hit ou Guard) :</strong> le jeu enregistre le contact, valide l'input que tu avais caché en mémoire, et lance le coup spécial automatiquement !</li>
              </ul>
              <p className="text-[#1A1815]/80 text-sm leading-relaxed font-medium">
                Le Buffering permet d'externaliser le temps de réaction au moteur du jeu lui-même. Tu n'as plus besoin de réagir, tu as juste besoin d'être au bon endroit de l'écran.
              </p>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 : LE DAMAGE SCALING
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-sf-green" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">3. LE DAMAGE SCALING</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                Pour éviter les combos infinis ou les morts en une touche, le jeu applique une réduction de dégâts (Damage Scaling) à chaque coup supplémentaire dans un combo.
              </p>
              <ul className="space-y-4">
                {[
                  { text: "Coup 1 et 2 font 100% de leurs dégâts.", icon: "100" },
                  { text: "Coup 3 fait 80%.", icon: "80" },
                  { text: "Coup 4 fait 70%.", icon: "70" },
                  { text: "Coup 5 fait 60%...", icon: "60" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm text-chalk">{item.icon}%</span>
                    </div>
                    <span className="text-chalk-dim text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ConcreteCard className="p-6">
              <h3 className="font-display text-chalk text-xl mb-4">Exceptions et Règles Vitales</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-sf-orange/30 bg-sf-orange/5 flex items-start gap-3">
                  <AlertTriangle className="text-sf-orange flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-display text-sf-orange text-sm mb-1">Pénalité de Coup Léger (Lights)</h4>
                    <p className="text-chalk-dim text-xs leading-relaxed">
                      Commencer un combo par un Light Punch ou Light Kick inflige une pénalité instantanée (le 2ème coup tombe à 90%, le 3ème à 80%). Les petits combos ne tuent jamais.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-sf-blue/30 bg-sf-blue/5 flex items-start gap-3">
                  <ArrowRight className="text-sf-blue flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-display text-sf-blue text-sm mb-1">Drive Rush Cancel</h4>
                    <p className="text-chalk-dim text-xs leading-relaxed">
                      Annuler un coup dans un Drive Rush réduit immédiatement les dégâts des coups suivants de 15%. C'est le prix à payer pour étendre un combo.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-sf-pink/30 bg-sf-pink/5 flex items-start gap-3">
                  <Activity className="text-sf-pink flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-display text-sf-pink text-sm mb-1">Le Minimum des Super Arts</h4>
                    <p className="text-chalk-dim text-xs leading-relaxed">
                      Un Super Art niveau 3 ne fera <strong>jamais moins de 50% de ses dégâts totaux</strong>, même s'il est placé à la fin d'un combo de 20 hits. C'est la mécanique de Comeback.
                    </p>
                  </div>
                </div>
              </div>
            </ConcreteCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
