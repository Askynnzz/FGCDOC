import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FrameTimeline({ move }) {
  const totalFrames = move.startup + move.active + move.recovery
  const [currentFrame, setCurrentFrame] = useState(1)

  const phase = useMemo(() => {
    if (currentFrame <= move.startup) return 'startup'
    if (currentFrame <= move.startup + move.active) return 'active'
    return 'recovery'
  }, [currentFrame, move])

  const phaseInfo = {
    startup: {
      label: 'STARTUP', letter: 'S',
      color: 'text-frame-startup', barBg: 'bg-frame-startup',
      border: 'border-frame-startup/40', bg: 'bg-frame-startup/8',
      desc: `Frame ${currentFrame} / ${move.startup} — Le coup se prépare. Tu es vulnérable à tout coup plus rapide.`,
      glow: 'rgba(255,184,0,0.3)',
    },
    active: {
      label: 'ACTIVE', letter: 'A',
      color: 'text-frame-active', barBg: 'bg-frame-active',
      border: 'border-frame-active/40', bg: 'bg-frame-active/8',
      desc: `Frame ${currentFrame} / ${move.startup + move.active} —  HITBOX ACTIVE ! Tout adversaire dans la portée prend des dégâts.`,
      glow: 'rgba(255,30,142,0.35)',
    },
    recovery: {
      label: 'RECOVERY', letter: 'R',
      color: 'text-frame-recovery', barBg: 'bg-frame-recovery',
      border: 'border-frame-recovery/40', bg: 'bg-frame-recovery/8',
      desc: `Frame ${currentFrame} / ${totalFrames} — Retour à la normale. Tu ne peux pas agir. C'est la fenêtre de punition adverse.`,
      glow: 'rgba(0,212,255,0.3)',
    },
  }

  const info = phaseInfo[phase]
  const framePercent = ((currentFrame - 1) / Math.max(totalFrames - 1, 1)) * 100

  return (
    <div className="concrete-card p-7">
      {/* ── Header coup ── */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="font-marker text-sf-yellow text-base">{move.character}</span>
            <span className="text-stone">—</span>
            <span className="font-display text-chalk text-3xl tracking-wide leading-none">{move.name}</span>
            <span className="font-marker text-chalk-dim text-base">{move.notation}</span>
          </div>
          <p className="text-chalk-dim text-sm max-w-md leading-relaxed">{move.description}</p>
        </div>

        {/* Stat pills */}
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: 'Startup',  val: move.startup,  color: 'text-frame-startup',  bg: 'bg-frame-startup/10',  border: 'border-frame-startup/30' },
            { label: 'Active',   val: move.active,   color: 'text-frame-active',   bg: 'bg-frame-active/10',   border: 'border-frame-active/30'  },
            { label: 'Recovery', val: move.recovery, color: 'text-frame-recovery', bg: 'bg-frame-recovery/10', border: 'border-frame-recovery/30'},
            { label: 'On Block', val: `${move.onBlock >= 0 ? '+' : ''}${move.onBlock}`, color: move.onBlock >= 0 ? 'text-sf-green' : 'text-sf-pink', bg: move.onBlock >= 0 ? 'bg-sf-green/8' : 'bg-sf-pink/8', border: move.onBlock >= 0 ? 'border-sf-green/25' : 'border-sf-pink/25' },
            { label: 'On Hit',   val: typeof move.onHit === 'number' ? `${move.onHit >= 0 ? '+' : ''}${move.onHit}` : move.onHit, color: 'text-sf-green', bg: 'bg-sf-green/8', border: 'border-sf-green/25' },
          ].map((s) => (
            <div key={s.label} className={`px-4 py-2.5 rounded-xl border ${s.border} ${s.bg} text-center min-w-[60px]`}>
              <div className={`font-display text-2xl ${s.color}`}>{s.val}</div>
              <div className="text-stone text-xs uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline visuelle ── */}
      <div className="mb-5">
        {/* Barre de frames */}
        <div className="flex h-16 rounded-xl overflow-hidden border border-white/8 gap-px">
          {/* Startup */}
          {Array.from({ length: move.startup }).map((_, i) => {
            const isCurrent = currentFrame === i + 1
            return (
              <motion.div
                key={`s-${i}`}
                className="flex-1 frame-bar-startup relative cursor-pointer"
                animate={isCurrent ? { scaleY: 1.12, filter: 'brightness(1.8)' } : { scaleY: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.1 }}
                onClick={() => setCurrentFrame(i + 1)}
                title={`Frame ${i + 1} — Startup`}
              >
                {i === Math.floor(move.startup / 2) && move.startup > 2 && (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xs text-black/70 no-select z-10">
                    {move.startup}f
                  </span>
                )}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            )
          })}
          {/* Active */}
          {Array.from({ length: move.active }).map((_, i) => {
            const fi = move.startup + i + 1
            const isCurrent = currentFrame === fi
            return (
              <motion.div
                key={`a-${i}`}
                className="flex-1 frame-bar-active relative cursor-pointer"
                animate={isCurrent ? { scaleY: 1.15, filter: 'brightness(2) saturate(1.3)' } : { scaleY: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.1 }}
                onClick={() => setCurrentFrame(fi)}
                title={`Frame ${fi} — Active`}
              >
                {i === Math.floor(move.active / 2) && move.active > 1 && (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xs text-white/90 no-select z-10">
                    {move.active}f
                  </span>
                )}
              </motion.div>
            )
          })}
          {/* Recovery */}
          {Array.from({ length: move.recovery }).map((_, i) => {
            const fi = move.startup + move.active + i + 1
            const isCurrent = currentFrame === fi
            return (
              <motion.div
                key={`r-${i}`}
                className="flex-1 frame-bar-recovery relative cursor-pointer"
                animate={isCurrent ? { scaleY: 1.1, filter: 'brightness(1.8)' } : { scaleY: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.1 }}
                onClick={() => setCurrentFrame(fi)}
                title={`Frame ${fi} — Recovery`}
              >
                {i === Math.floor(move.recovery / 2) && move.recovery > 2 && (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xs text-black/70 no-select z-10">
                    {move.recovery}f
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Labels */}
        <div className="flex mt-2 text-xs">
          <div style={{ flex: move.startup }}
            className="text-center text-frame-startup font-display opacity-80 tracking-wide">
            STARTUP
          </div>
          <div style={{ flex: move.active }}
            className="text-center text-frame-active font-display opacity-80 tracking-wide">
            ACTIVE
          </div>
          <div style={{ flex: move.recovery }}
            className="text-center text-frame-recovery font-display opacity-80 tracking-wide">
            RECOVERY
          </div>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-stone text-xs font-body">Frame 1</span>
          <motion.span
            key={`${phase}-${currentFrame}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-display text-sm tracking-widest ${info.color}`}
          >
            {info.label} — Frame {currentFrame}/{totalFrames}
          </motion.span>
          <span className="text-stone text-xs font-body">Frame {totalFrames}</span>
        </div>
        <input
          type="range"
          min={1}
          max={totalFrames}
          value={currentFrame}
          onChange={(e) => setCurrentFrame(Number(e.target.value))}
          className="w-full"
          aria-label={`Sélecteur de frame — actuellement frame ${currentFrame} sur ${totalFrames}`}
        />
        <p className="text-stone text-xs text-center mt-1">
          ← Fais glisser ou clique sur une barre pour explorer les frames
        </p>
      </div>

      {/* ── Phase info ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.2 }}
          className={`rounded-xl p-4 border ${info.border} ${info.bg} mb-5`}
          style={{ boxShadow: `0 0 30px ${info.glow}` }}
        >
          <div className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full ${info.barBg} mt-1.5 flex-shrink-0`}
              style={{ boxShadow: `0 0 8px ${info.glow}` }} />
            <div>
              <span className={`font-display text-xl tracking-wide ${info.color}`}>{info.label}</span>
              <p className="text-chalk-dim text-sm mt-1.5 leading-relaxed">{info.desc}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Description du coup ── */}
      <div className="p-4 bg-white/3 rounded-xl border border-white/6">
        <p className="text-stone text-xs uppercase tracking-wider mb-2 font-display">
          Contexte dans SF6
        </p>
        <p className="text-chalk-dim text-sm leading-relaxed">{move.description}</p>
      </div>
    </div>
  )
}
