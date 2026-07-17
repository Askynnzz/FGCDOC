import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, DifficultyIndicator, GrungeDivider } from '../../ui/UIComponents'
import { BookOpen, Shield, Sword, AlertTriangle } from 'lucide-react'

/* ─── Simulateur de Meaty ───────────────────────────── */
function MeatySimulator() {
  const [gameState, setGameState] = useState('idle') // idle, waking_up, hit, blocked, punished
  const [progress, setProgress] = useState(0)
  const [resultMsg, setResultMsg] = useState('')

  // 60 frames pour se lever (1 seconde à 60fps)
  // Fenêtre Meaty : 90% à 100% de la barre
  const WAKEUP_TIME = 1500 

  useEffect(() => {
    let animationFrame
    let startTime

    if (gameState === 'waking_up') {
      const animate = (time) => {
        if (!startTime) startTime = time
        const elapsed = time - startTime
        const p = Math.min((elapsed / WAKEUP_TIME) * 100, 100)
        setProgress(p)

        if (p < 100) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          // L'adversaire s'est levé complètement sans être frappé
          setGameState('idle')
          setResultMsg('Trop tard ! L\'adversaire s\'est levé et a bloqué ou attaqué.')
          setProgress(0)
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [gameState])

  const handleAttack = () => {
    if (gameState !== 'waking_up') return

    if (progress >= 90 && progress <= 100) {
      // MEATY PERFECT
      setGameState('hit')
      setResultMsg('PARFAIT ! (Meaty Hit) Ton coup a touché pendant l\'animation de lever.')
    } else if (progress < 90) {
      // TROP TÔT
      setGameState('punished')
      setResultMsg('TROP TÔT ! Ton coup a tapé dans le vide (Whiff). Punition gratuite.')
    }
  }

  const startWakeup = () => {
    setGameState('waking_up')
    setProgress(0)
    setResultMsg('')
  }

  return (
    <div className="concrete-card p-6 md:p-8 mt-10">
      <div className="flex items-center gap-3 mb-6">
        <Sword className="text-sf-orange" size={24} />
        <h3 className="font-display text-2xl text-sf-orange">Simulateur de Meaty</h3>
      </div>
      
      <p className="text-chalk-dim text-sm mb-6 leading-relaxed">
        L'adversaire est au sol. Appuie sur "Lancer l'Attaque" au moment exact où la barre atteint la **zone orange** (les dernières frames de son lever). 
      </p>

      {/* Barre de lever */}
      <div className="relative h-12 border-2 border-chalk/20 bg-[#110E0C]/5 w-full mb-8 overflow-hidden">
        {/* Zone Meaty */}
        <div className="absolute top-0 bottom-0 right-0 w-[10%] bg-gradient-to-r from-transparent to-sf-orange/30 border-l border-sf-orange/50 z-0" />
        
        {/* Barre de progression */}
        <div 
          className="h-full bg-chalk/30 z-10 relative flex items-center justify-end pr-2 transition-none"
          style={{ width: `${progress}%` }}
        >
          {gameState === 'waking_up' && <span className="font-display text-[10px] text-sf-orange opacity-50">WAKEUP...</span>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {gameState === 'idle' || gameState === 'hit' || gameState === 'punished' ? (
          <button 
            onClick={startWakeup}
            className="btn-outline px-6 py-3 w-full sm:w-auto text-sm"
          >
            Adversaire au sol (Start)
          </button>
        ) : (
          <button 
            onClick={handleAttack}
            className="btn-yellow px-8 py-3 w-full sm:w-auto"
          >
            Frapper !
          </button>
        )}

        <div className="h-12 flex items-center justify-center flex-1">
          <AnimatePresence mode="wait">
            {resultMsg && (
              <motion.div
                key={resultMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-sm font-bold font-body ${
                  gameState === 'hit' ? 'text-sf-green' : 'text-sf-orange'
                }`}
              >
                {resultMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function OkizemeModule() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          tag="Tome VIII"
          title="L'Art de la Relevée"
          subtitle="Okizeme, Meaty, Shimmy et Reversals. La phase la plus oppressante des jeux de combat, décortiquée."
          color="orange"
        />

        <div className="space-y-16">
          {/* 1. Introduction à l'Oki */}
          <div>
            <h3 className="graffiti-title text-3xl text-chalk mb-4 text-stroke-chalk">1. Qu'est-ce que l'Okizeme ?</h3>
            <p className="text-chalk-dim leading-relaxed mb-6">
              L'Okizeme (ou <em>Oki</em>) désigne le <strong>jeu au lever</strong>. C'est l'avantage psychologique et mathématique que possède le joueur debout sur le joueur au sol. Pendant que l'adversaire se relève, il ne peut pas agir, ce qui vous donne le temps de préparer la parfaite attaque à la frame près.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="concrete-card p-4 border-l-sf-orange">
                <span className="section-label text-sf-orange block mb-2">Le Problème</span>
                <p className="text-sm text-chalk-dim">L'adversaire est invulnérable tant qu'il est au sol.</p>
              </div>
              <div className="concrete-card p-4 border-l-sf-green">
                <span className="section-label text-sf-green block mb-2">L'Avantage</span>
                <p className="text-sm text-chalk-dim">Vous choisissez quand, où et comment l'attaque va frapper à son lever.</p>
              </div>
              <div className="concrete-card p-4 border-l-sf-pink">
                <span className="section-label text-sf-pink block mb-2">Le But</span>
                <p className="text-sm text-chalk-dim">Forcer l'adversaire à deviner votre intention (Block, Tech, Reversal).</p>
              </div>
            </div>
          </div>

          <GrungeDivider />

          {/* 2. Le Meaty */}
          <div>
            <h3 className="graffiti-title text-3xl text-sf-orange mb-4">2. Le Meaty (L'Attaque Parfaite)</h3>
            <DifficultyIndicator level={2} label={true} />
            
            <p className="text-chalk-dim leading-relaxed mt-4 mb-6">
              Un <strong>Meaty</strong> est une attaque chronométrée pour que ses dernières <em>Active Frames</em> frappent l'adversaire exactement sur sa toute première frame de lever. L'adversaire "se lève dans le coup".
            </p>

            <div className="concrete-card p-5 bg-[#110E0C]/5 mb-8 border border-chalk/10">
              <h4 className="font-display text-sf-orange mb-3 flex items-center gap-2">
                <AlertTriangle size={16} /> Pourquoi faire ça ?
              </h4>
              <ul className="space-y-3 text-sm text-chalk-dim">
                <li className="flex items-start gap-2">
                  <span className="text-sf-orange mt-0.5">■</span>
                  <span><strong>Réduit le startup :</strong> Du point de vue de l'adversaire, votre coup sort instantanément, le forçant à bloquer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sf-orange mt-0.5">■</span>
                  <span><strong>Plus d'avantage on-block :</strong> Comme votre coup touche dans ses dernières frames, vous finissez votre animation de <em>Recovery</em> plus tôt, vous donnant un meilleur Frame Advantage !</span>
                </li>
              </ul>
            </div>

            <MeatySimulator />
          </div>

          <GrungeDivider />

          {/* 3. Le Shimmy */}
          <div>
            <h3 className="graffiti-title text-3xl text-sf-green mb-4">3. Le Shimmy (Feinte de Chope)</h3>
            <DifficultyIndicator level={3} label={true} />
            
            <p className="text-chalk-dim leading-relaxed mt-4 mb-6">
              Si vous avez conditionné l'adversaire à s'attendre à une chope au lever (en l'ayant déjà chopé 2 fois), il va tenter de "déchopper" (Tech) en se levant. Le <strong>Shimmy</strong> consiste à faire un pas vers lui, puis reculer juste hors de portée. Sa chope va rater dans le vide (<em>Whiff</em>), vous laissant tout le temps de le punir avec un gros combo.
            </p>
          </div>

          {/* 4. Le Reversal et Safe Jump */}
          <div>
            <h3 className="graffiti-title text-3xl text-sf-pink mb-4">4. Le Reversal & Safe Jump</h3>
            <DifficultyIndicator level={4} label={true} />
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="concrete-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={20} className="text-sf-pink" />
                  <h4 className="font-display text-lg text-chalk">Wakeup Reversal (DP)</h4>
                </div>
                <p className="text-sm text-chalk-dim leading-relaxed">
                  L'option de désespoir de l'adversaire. En se levant, il utilise une attaque invincible (ex: Shoryuken/OD). S'il réussit, il bat votre Meaty. S'il est bloqué, la punition est dévastatrice.
                </p>
              </div>

              <div className="concrete-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sword size={20} className="text-sf-yellow" />
                  <h4 className="font-display text-lg text-chalk">Safe Jump</h4>
                </div>
                <p className="text-sm text-chalk-dim leading-relaxed">
                  L'arme ultime de l'attaquant. Un saut millimétré qui frappe l'adversaire s'il ne fait rien, mais permet d'atterrir et de bloquer automatiquement s'il tente un Reversal invincible. L'adversaire est piégé.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
