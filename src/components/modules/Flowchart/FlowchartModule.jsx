import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { GitBranch, Brain, Target, Shield, Crosshair, ChevronRight } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   COMPOSANT: DELAY TECH SIMULATOR
══════════════════════════════════════════════════════════════ */
function DelayTechSimulator() {
  const [phase, setPhase] = useState('idle') // idle | attack | result
  const [attackType, setAttackType] = useState('strike') // strike | throw
  const [result, setResult] = useState(null) // block | tech | hit | thrown
  const [techTiming, setTechTiming] = useState(null) // early | perfect | late
  const [timingWidth, setTimingWidth] = useState(0)

  // Simulation timeline
  useEffect(() => {
    if (phase === 'attack') {
      const start = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - start
        setTimingWidth(Math.min((elapsed / 600) * 100, 100))
        if (elapsed >= 600) {
          clearInterval(interval)
          resolveAttack(null)
        }
      }, 16)
      return () => clearInterval(interval)
    }
  }, [phase, attackType])

  const startSimulation = (type) => {
    setAttackType(type)
    setPhase('attack')
    setResult(null)
    setTechTiming(null)
    setTimingWidth(0)
  }

  const handleTech = () => {
    if (phase !== 'attack') return
    const pct = timingWidth
    let timing = ''
    if (pct < 30) timing = 'early'     // Mash tech (battra la chope, mais se fera hit par le strike)
    else if (pct < 70) timing = 'perfect' // Delay tech parfait !
    else timing = 'late'               // Trop tard

    resolveAttack(timing)
  }

  const resolveAttack = (timing) => {
    setPhase('result')
    setTechTiming(timing)

    if (attackType === 'strike') {
      // Le Strike touche tôt (frame 5 par ex).
      if (!timing) setResult('block') // Si tu ne tech pas du tout, tu bloquais de base
      else if (timing === 'early') setResult('hit') // Si tu tech trop tôt (mash), tu lâches la garde et te fais toucher
      else setResult('block') // Si tu delay tech (perfect ou late), tu étais en garde quand le coup a touché
    } else {
      // La Chope touche un peu plus tard
      if (!timing) setResult('thrown') // Si pas de tech
      else if (timing === 'early' || timing === 'perfect') setResult('tech') // Tech réussi
      else setResult('thrown') // Tech trop tard
    }
  }

  const getResultFeedback = () => {
    if (!result) return null
    if (result === 'block' && techTiming === 'perfect') return { text: "BLOCK RÉUSSI ! Tu as delay tech : tu as bloqué le strike avant que ta chope ne sorte.", color: "text-sf-green", bg: "bg-sf-green/10", border: "border-sf-green/40" }
    if (result === 'tech' && techTiming === 'perfect') return { text: "TECH RÉUSSI ! Tu as delay tech : l'adversaire a chopé, ta déchope est sortie à temps.", color: "text-sf-green", bg: "bg-sf-green/10", border: "border-sf-green/40" }
    if (result === 'hit') return { text: "TOUCHÉ ! Tu as 'mash' la chope trop tôt. Tu as lâché la garde et pris le coup de poing. C'est pourquoi le Delay Tech est vital.", color: "text-sf-pink", bg: "bg-sf-pink/10", border: "border-sf-pink/40" }
    if (result === 'thrown') return { text: "CHOPÉ ! Tu as tech trop tard (ou pas du tout).", color: "text-sf-pink", bg: "bg-sf-pink/10", border: "border-sf-pink/40" }
    if (result === 'block') return { text: "BLOQUÉ. (Mais tu n'as pas tech, donc tu serais mort si c'était une chope)", color: "text-sf-yellow", bg: "bg-sf-yellow/10", border: "border-sf-yellow/40" }
    if (result === 'tech') return { text: "TECH RÉUSSI. (Mais tech trop tôt = vulnérable au Strike)", color: "text-sf-yellow", bg: "bg-sf-yellow/10", border: "border-sf-yellow/40" }
    return { text: "", color: "", bg: "", border: "" }
  }

  const feedback = getResultFeedback()

  return (
    <ConcreteCard className="p-6 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10"><Shield size={100} /></div>
      <h3 className="font-display text-chalk text-2xl mb-2 relative z-10">SIMULATEUR DE DELAY TECH</h3>
      <p className="text-chalk-dim text-sm mb-6 max-w-2xl relative z-10">
        Tu es à la relevée et tu maintiens <strong>Arrière (Garde)</strong>. L'adversaire attaque. <br/>
        Clique sur <strong>DÉCHOPE</strong> quand la barre est dans la <strong>zone jaune</strong>. 
        Si tu le fais bien, tu bloqueras son attaque ET tu déchoperas sa chope avec le <em>même timing</em>.
      </p>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => startSimulation('strike')} 
          disabled={phase === 'attack'}
          className="btn-outline px-4 py-2 text-xs disabled:opacity-40"
        >
          🥊 L'adv fait un Strike
        </button>
        <button 
          onClick={() => startSimulation('throw')} 
          disabled={phase === 'attack'}
          className="btn-outline px-4 py-2 text-xs border-sf-pink/50 text-sf-pink hover:bg-sf-pink/10 disabled:opacity-40"
        >
          🤼‍♂️ L'adv fait une Chope
        </button>
      </div>

      <div className="relative h-12 bg-black/40 rounded-xl border border-white/10 mb-8 overflow-hidden">
        {/* Zones de timing */}
        <div className="absolute inset-y-0 left-0 w-[30%] bg-sf-pink/10 border-r border-sf-pink/30 flex items-center justify-center">
          <span className="text-[10px] text-sf-pink font-display uppercase opacity-50">Mash (Trop tôt)</span>
        </div>
        <div className="absolute inset-y-0 left-[30%] w-[40%] bg-sf-yellow/20 border-r border-sf-yellow/40 flex items-center justify-center">
          <span className="text-xs text-sf-yellow font-display uppercase">Zone Delay Tech</span>
        </div>
        <div className="absolute inset-y-0 right-0 w-[30%] bg-sf-pink/10 flex items-center justify-center">
          <span className="text-[10px] text-sf-pink font-display uppercase opacity-50">Trop tard</span>
        </div>

        {/* Barre de progression */}
        <div 
          className="absolute inset-y-0 left-0 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
          style={{ width: '4px', transform: `translateX(${timingWidth * 5}px)`, transition: phase === 'attack' ? 'none' : 'transform 0.3s' }}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button 
          onMouseDown={handleTech}
          disabled={phase !== 'attack'}
          className={`px-12 py-4 rounded-xl font-display tracking-widest text-lg transition-all ${
            phase === 'attack' 
              ? 'bg-sf-blue hover:bg-sf-blue/80 text-black shadow-[0_0_20px_rgba(0,212,255,0.4)] scale-105' 
              : 'bg-white/5 border border-white/10 text-stone cursor-not-allowed'
          }`}
        >
          DÉCHOPE (LP + LK ou L+M en Moderne)
        </button>

        <AnimatePresence mode="wait">
          {phase === 'result' && feedback && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${feedback.border} ${feedback.bg} w-full text-center mt-2`}
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
   COMPOSANT: MENTAL STACK VISUALIZER
══════════════════════════════════════════════════════════════ */
function MentalStackVisualizer() {
  const [stack, setStack] = useState([])
  const concepts = [
    { id: 'fireball', label: 'Parer les Boules de Feu', color: 'sf-blue' },
    { id: 'jump', label: 'Surveiller les Sauts', color: 'sf-yellow' },
    { id: 'di', label: 'Réagir au Drive Impact', color: 'sf-pink' },
    { id: 'dash', label: 'Stopper les Drive Rush', color: 'sf-green' },
    { id: 'throw', label: 'Déchopper (Delay Tech)', color: 'sf-orange' }
  ]

  const toggleConcept = (concept) => {
    if (stack.find(c => c.id === concept.id)) {
      setStack(stack.filter(c => c.id !== concept.id))
    } else {
      setStack([...stack, concept])
    }
  }

  const isOverloaded = stack.length >= 3

  return (
    <ConcreteCard className="p-6 border border-[#1A1815]/10 flex flex-col md:flex-row gap-8 items-center bg-[#110E0C]/5 mt-8">
      <div className="flex-1 w-full space-y-3">
        <p className="text-[#1A1815]/80 text-sm mb-4 leading-relaxed font-medium">Clique sur les tâches que tu imposes à l'adversaire :</p>
        {concepts.map(c => {
          const isActive = stack.find(s => s.id === c.id)
          return (
            <button
              key={c.id}
              onClick={() => toggleConcept(c)}
              className={`w-full text-left px-4 py-3 border-2 transition-all font-display tracking-wide uppercase text-sm ${isActive ? `border-${c.color} bg-${c.color}/10 text-${c.color}` : 'border-[#1A1815]/20 text-[#1A1815]/60 hover:border-[#1A1815]/40 hover:text-[#1A1815]'}`}
            >
              {isActive ? '✓ ' : '+ '} {c.label}
            </button>
          )
        })}
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[250px] relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Brain size={180} />
        </div>
        <div className="flex flex-col-reverse w-full items-center justify-end h-[160px]">
          <AnimatePresence>
            {stack.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`px-4 py-2 mt-2 w-3/4 text-center border border-${c.color}/50 bg-${c.color}/20 text-${c.color} font-display uppercase tracking-widest text-xs z-10 p5-shadow`}
              >
                {c.label}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className={`mt-6 font-display text-xl sm:text-2xl z-10 transition-colors text-center ${isOverloaded ? 'text-sf-pink animate-pulse' : 'text-sf-green'}`}>
          {stack.length === 0 ? 'CERVEAU DISPONIBLE' : isOverloaded ? '⚠️ SURCHARGE MENTALE' : 'CHARGE GÉRABLE'}
        </div>
        <div className="h-10 mt-2 z-10 text-center">
          {isOverloaded && <p className="text-sf-pink/70 text-xs">L'adversaire ne peut plus réagir. Ses réflexes s'effondrent.</p>}
        </div>
      </div>
    </ConcreteCard>
  )
}

/* ══════════════════════════════════════════════════════════════
   MODULE PRINCIPAL
══════════════════════════════════════════════════════════════ */
export default function FlowchartModule() {

  return (
    <section id="flowchart" className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="orange" size={600} top="10%" left="0%" opacity={0.05} />
      <PaintSplash color="pink" size={400} top="50%" right="-5%" opacity={0.04} />
      <PaintSplash color="green" size={500} top="80%" left="20%" opacity={0.03} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome III"
          title="La Psychologie & Défense"
          subtitle="La guerre de l'information. Surcharger le cerveau adverse (Mental Stack), survivre à ses mixups et capitaliser sur l'Okizeme."
          color="pink"
        />

        {/* ══════════════════════════════════════════════════════════════
            PARTIE 1 : ANATOMIE D'UN FLOWCHART
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-sf-pink" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">1. LE MENTAL STACK & L'OKIZEME</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Le cerveau humain ne peut traiter qu'un nombre limité d'informations. C'est le <strong>Mental Stack</strong>. Si tu forces ton adversaire à penser aux boules de feu, aux sauts, ET au Drive Rush en même temps, ses réactions s'effondrent. L'<strong>Okizeme</strong> (le jeu à la relevée) est le moment où ce Mental Stack est poussé à son paroxysme.
          </p>

          <MentalStackVisualizer />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            PARTIE 2 : LA DÉFENSE FONDAMENTALE
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-sf-green" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">2. LA DÉFENSE FONDAMENTALE</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Pour survivre et alléger ta propre Mental Stack, il ne faut pas essayer de tout voir. Il faut appliquer des règles simples qui couvrent 90% des situations sans aucun effort mental.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <ConcreteCard className="p-6 border-t-2 border-sf-yellow/50">
              <h4 className="font-display text-sf-yellow text-xl mb-3">1. Garde Basse = Par Défaut</h4>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                Les attaques basses (Lows) sortent très vite (4 à 6 frames). Il est impossible de réagir avec les yeux. Bloque <strong>toujours</strong> accroupi , les attaques hautes sont également couvertes par la garde basse.
              </p>
              <p className="text-chalk-dim text-sm leading-relaxed">
                Les attaques Overheads (qui brisent la garde basse) sont lentes. Tu as largement le temps de te lever en réaction.
              </p>
            </ConcreteCard>

            <ConcreteCard className="p-6 border-t-2 border-sf-blue/50">
              <h4 className="font-display text-sf-blue text-xl mb-3">2. L'Anti-Air Avant Tout</h4>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                L'attaque aérienne est la plus meurtrière (combo garanti), mais aussi la plus lente et prévisible. 
              </p>
              <p className="text-chalk-dim text-sm leading-relaxed">
                Soit prêt à sortir ton anti-air à chaque fois que le saut adverse arrive dans ta zone de contrôle. Un adversaire qui a peur de sauter est un adversaire avec une option en moins.
              </p>
            </ConcreteCard>

            <ConcreteCard className="p-6 border-t-2 border-sf-pink/50 bg-sf-pink/5">
              <h4 className="font-display text-sf-pink text-xl mb-3">3. "Take the Throw"</h4>
              <p className="text-chalk-dim text-sm leading-relaxed mb-4">
                Les débutants paniquent et "mash" pour déchopper à chaque relevée. Résultat : l'adversaire fait un Shimmy (feinte) ou un saut et te détruit .
              </p>
              <p className="text-chalk-dim text-sm leading-relaxed text-[#F4EBE1]">
                <strong>Accepte la chope.</strong> Elle fait peu de dégâts. Préfère te faire choper 3 fois de suite plutôt que de manger un seul combo de Shimmy fatal.
              </p>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            PARTIE 2 : LE FLOWCHART DÉFENSIF (DELAY TECH)
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-sf-blue" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">3. LA DÉFENSE AVANCÉE : LE DELAY TECH</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Une fois les bases acquises, on passe aux techniques avancées. Le <strong>Delay Tech</strong> est l'une d'entre elles. Il s'agit d'une méthode défensive (qui repose sur le principe de l'Option Select) permettant de bloquer un coup (Strike) ET de déchopper une chope avec une seule manipulation temporelle.
          </p>
          
          <DelayTechSimulator />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            PARTIE 3 : LA MATRICE DU CONDITIONNEMENT
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-sf-pink" size={24} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">4. LA MATRICE DE L'ADAPTATION</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-8 max-w-3xl leading-relaxed">
            Le cœur du mindgame. Chaque habitude (flowchart) possède son contre absolu. Observe ce que fait ton adversaire sous pression (à la relevée), et applique la solution de la matrice pour le détruire.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                habit: "Il Tech toute mes chope", 
                counter: "LE SHIMMY", 
                desc: "Fais semblant d'approcher puis recule. Son grab sortira dans le vide. Punition maximum garantie si tu réagis en punissant avec le bon coup.",
                color: "sf-pink" 
              },
              { 
                habit: "Il mash les boutons", 
                counter: "LE MEATY", 
                desc: "Frappe-le exactement au moment où il se relève. Ses coups n'auront pas le temps de sortir. Counter hit garanti.",
                color: "sf-orange" 
              },
              { 
                habit: "Il bloque tout le temps", 
                counter: "LA CHOPE", 
                desc: "La chope ignore la garde. S'il a trop peur des coups, approche et lance-le. Recommence jusqu'à ce qu'il panique.",
                color: "sf-green" 
              },
              { 
                habit: "Il saute tout le temps", 
                counter: "L'ANTI-AIR", 
                desc: "Reste au sol, concentre-toi sur son personnage. Dès qu'il quitte le sol, DP ou bouton anti-air. Ne le poursuis pas.",
                color: "sf-blue" 
              }
            ].map((item, i) => (
              <ConcreteCard key={i} className={`p-6 border-t-2 border-t-${item.color}/50 hover:bg-white/5 transition-colors`}>
                <p className="text-stone text-xs uppercase tracking-widest font-display mb-1">Si tu observes :</p>
                <p className="text-chalk text-base mb-6 font-medium">"{item.habit}"</p>
                <div className={`text-4xl mb-4 opacity-80 text-${item.color}`}>↓</div>
                <p className="text-stone text-xs uppercase tracking-widest font-display mb-1">La Solution :</p>
                <h4 className={`font-display text-2xl tracking-wide text-${item.color} mb-3`}>{item.counter}</h4>
                <p className="text-chalk-dim text-sm leading-relaxed">{item.desc}</p>
              </ConcreteCard>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            PARTIE 5 : POUR ALLER PLUS LOIN (FUZZY GUARD)
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t-2 border-white/5 relative"
        >
          <div className="absolute top-0 right-10 -translate-y-1/2 p5-shadow bg-sf-pink px-4 py-1">
            <span className="font-display text-[#F4EBE1] text-xs tracking-widest uppercase">Avancé</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Target className="text-sf-pink" size={24} />
            <h2 className="ransom-title text-chalk text-3xl sm:text-4xl tracking-wide">5. LE FUZZY GUARD</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 text-chalk-dim text-sm leading-relaxed space-y-4">
              <p>
                Le <strong>Fuzzy Guard</strong> est l'arme défensive ultime à très haut niveau. C'est une technique qui permet de bloquer deux attaques différentes (Low vs Overhead) qui ont des <em>timings de sortie différents</em>, sans jamais avoir besoin d'utiliser ses yeux pour réagir.
              </p>
              <p>
                <strong>Exemple :</strong> Tu es au sol. L'adversaire peut faire un Low (qui tape à la Frame 5) ou un Overhead (qui tape à la Frame 20).
              </p>
              <ul className="space-y-2 border-l-2 border-sf-pink/30 pl-4">
                <li><span className="text-sf-pink font-bold">1. Garde Basse (Frames 1 à 10) :</span> Tu maintiens bas. Si c'est le Low, tu le bloques automatiquement.</li>
                <li><span className="text-sf-pink font-bold">2. Changement (Frame 11+) :</span> Sans même regarder l'écran, tu te lèves et tu maintiens Garde Haute.</li>
              </ul>
              <p>
                Si c'était un Low, tu l'as déjà bloqué à l'étape 1 (et le jeu t'empêche de te lever pendant le blockstun). Si c'était un Overhead (lent), ton personnage sera déjà debout au moment où le coup touchera à l'étape 2. Tu as bloqué un "Mixup 50/50" avec 100% de réussite.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <ConcreteCard className="bg-sf-pink/5 border-l-4 border-sf-pink h-full flex flex-col justify-center items-center text-center p-6">
                <Shield size={48} className="text-sf-pink opacity-80 mb-4" />
                <h4 className="ransom-title text-sf-pink text-2xl mb-4">Attention</h4>
                <p className="text-xs text-[#1A1815]/80 leading-relaxed font-medium">
                  Le Fuzzy Guard ne marche que si les attaques adverses ont des timings différents. Si l'adversaire retarde volontairement son Low (Delay Low) pour le caler sur la Frame 20, il brisera ton Fuzzy Guard. C'est la boucle infinie des jeux de combat.
                </p>
              </ConcreteCard>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
