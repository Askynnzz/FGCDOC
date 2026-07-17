import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import movesData from '../../../data/moves.json'
import { ConcreteCard } from '../../ui/UIComponents'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const OPPONENT_MOVES = [
  { id: 'jab_4f', label: 'Jab (4f)', startup: 4 },
  { id: 'jab_5f', label: 'Jab (5f)', startup: 5 },
  { id: 'jab_6f', label: 'Jab (6f)', startup: 6 },
  { id: 'jab_7f', label: 'Jab (7f)', startup: 7 },
  { id: 'dp_5f', label: 'DP (5f)', startup: 5 },
  { id: 'medium_8f', label: 'Moyen (8f)', startup: 8 },
]

export default function FrameComparator({ move }) {
  const [opponentStartup, setOpponentStartup] = useState(5)
  const [isAnimating, setIsAnimating] = useState(false)
  const [result, setResult] = useState(null)

  const onBlock = move.onBlock

  const runSimulation = () => {
    setIsAnimating(true)
    setResult(null)

    setTimeout(() => {
      const advantage = onBlock + opponentStartup
      if (advantage > 0) {
        setResult('safe')
      } else if (advantage === 0) {
        setResult('trade')
      } else {
        setResult('punishable')
      }
      setIsAnimating(false)
    }, 1200)
  }

  const resultConfig = {
    safe: {
      icon: CheckCircle,
      label: 'SAFE !',
      color: 'text-sf-green',
      borderColor: 'border-sf-green',
      bg: 'bg-sf-green/10',
      desc: `Ton coup est safe à -${Math.abs(onBlock)}. L'adversaire ne peut pas te punir avec un coup à ${opponentStartup} frames. Il arrive trop tard !`,
    },
    punishable: {
      icon: XCircle,
      label: 'PUNISHABLE !',
      color: 'text-sf-pink',
      borderColor: 'border-sf-pink',
      bg: 'bg-sf-pink/10',
      desc: `Ton coup est à ${onBlock} et le coup adverse à ${opponentStartup}f. Il te punit ! La différence de ${Math.abs(onBlock + opponentStartup)} frames lui laisse largement le temps.`,
    },
    trade: {
      icon: AlertCircle,
      label: 'ÉGALITÉ !',
      color: 'text-sf-yellow',
      borderColor: 'border-sf-yellow',
      bg: 'bg-sf-yellow/10',
      desc: `Timing parfait ! Les deux joueurs sont actifs en même temps. Ça dépend de qui fait le plus de dégâts dans cet échange.`,
    },
  }

  return (
    <ConcreteCard className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Colonne A */}
        <div>
          <h4 className="font-display text-chalk text-lg mb-1">TON COUP</h4>
          <p className="text-chalk-dim text-sm mb-4">
            <span className="text-chalk font-medium">{move.name}</span> — On Block :{' '}
            <span className={`font-display text-base ${move.onBlock >= 0 ? 'text-sf-green' : 'text-sf-pink'}`}>
              {move.onBlock >= 0 ? '+' : ''}{move.onBlock}
            </span>
          </p>

          {/* Visualisation disadvantage */}
          <div className="space-y-2 mb-4">
            <p className="text-stone text-xs uppercase tracking-wide">Fenêtre de punition</p>
            <div className="flex gap-1 h-6">
              {Array.from({ length: Math.abs(onBlock) }).map((_, i) => (
                <div key={i} className="flex-1 bg-sf-pink/40 rounded-sm" />
              ))}
              {onBlock < 0 && (
                <div className="text-sf-pink text-xs ml-2 self-center font-display">
                  {Math.abs(onBlock)} frames vulnérables
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colonne B */}
        <div>
          <h4 className="font-display text-chalk text-lg mb-1">RIPOSTE ADVERSE</h4>
          <p className="text-chalk-dim text-sm mb-4">Quelle est la vitesse du coup adverse ?</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {OPPONENT_MOVES.map((opp) => (
              <button
                key={opp.id}
                onClick={() => { setOpponentStartup(opp.startup); setResult(null) }}
                className={`px-3 py-1.5 rounded-lg border text-sm font-display tracking-wide transition-all ${
                  opponentStartup === opp.startup
                    ? 'bg-sf-blue/20 border-sf-blue text-sf-blue'
                    : 'border-white/15 text-chalk-dim hover:border-white/30'
                }`}
              >
                {opp.label}
              </button>
            ))}
          </div>

          {/* Custom startup */}
          <div className="flex items-center gap-3">
            <span className="text-stone text-sm">Custom :</span>
            <input
              type="number"
              min={1}
              max={30}
              value={opponentStartup}
              onChange={(e) => { setOpponentStartup(Number(e.target.value)); setResult(null) }}
              className="w-16 bg-white/5 border border-white/15 rounded-lg px-2 py-1 text-center text-chalk font-display text-lg focus:outline-none focus:border-sf-blue"
            />
            <span className="text-stone text-sm">frames</span>
          </div>
        </div>
      </div>

      {/* Bouton simulation */}
      <div className="mt-6 flex justify-center">
        <motion.button
          onClick={runSimulation}
          disabled={isAnimating}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-yellow disabled:opacity-50 disabled:cursor-not-allowed px-10 py-3"
        >
          {isAnimating ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
              >
                ⚡
              </motion.span>
              Simulation...
            </span>
          ) : (
            '⚔️ SIMULER LE COMBAT'
          )}
        </motion.button>
      </div>

      {/* Résultat animé */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 12 }}
            className={`mt-6 p-5 rounded-xl border ${resultConfig[result].borderColor} ${resultConfig[result].bg}`}
          >
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = resultConfig[result].icon
                return <Icon size={32} className={resultConfig[result].color} />
              })()}
              <div>
                <h4 className={`font-display text-2xl ${resultConfig[result].color} mb-1`}>
                  {resultConfig[result].label}
                </h4>
                <p className="text-chalk-dim">{resultConfig[result].desc}</p>

                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="text-stone">Calcul :</span>
                  <span className="font-marker text-chalk">
                    ({move.onBlock >= 0 ? '+' : ''}{move.onBlock}) + {opponentStartup}f ={' '}
                    <span className={resultConfig[result].color}>
                      {onBlock + opponentStartup >= 0 ? '+' : ''}{onBlock + opponentStartup}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConcreteCard>
  )
}
