import { motion } from 'framer-motion'

/* ─── GraffitiTitle ────────────────────────────────── */
export function GraffitiTitle({ children, color = 'yellow', size = '6xl', className = '' }) {
  const cls = {
    yellow: 'graffiti-yellow',
    green:  'graffiti-green',
    pink:   'graffiti-pink',
    blue:   'graffiti-blue',
    orange: 'graffiti-orange',
    white:  'text-chalk graffiti-title',
  }
  const sizeMap = {
    '3xl': 'text-3xl', '4xl': 'text-4xl', '5xl': 'text-5xl',
    '6xl': 'text-6xl', '7xl': 'text-7xl', '8xl': 'text-8xl',
  }
  return (
    <motion.h2
      className={`${cls[color] || 'graffiti-yellow'} ${sizeMap[size] || 'text-6xl'} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.h2>
  )
}

/* ─── PaintSplash ──────────────────────────────────── */
export function PaintSplash({ color = 'yellow', size = 400, top, left, right, bottom, opacity = 0.07, className = '' }) {
  const palette = {
    yellow: '#FFB800', green: '#39FF14', pink: '#FF1E8E',
    blue: '#00D4FF', orange: '#FF6B1A',
  }
  return (
    <div
      className={`paint-splash ${className}`}
      aria-hidden="true"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle at 40% 40%, ${palette[color]} 0%, transparent 65%)`,
        opacity, top, left, right, bottom,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

/* ─── ConcreteCard ─────────────────────────────────── */
export function ConcreteCard({ children, className = '', onClick, hover = false }) {
  return (
    <motion.div
      className={`concrete-card ${onClick || hover ? 'concrete-card-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

/* ─── ModuleTag ─────────────────────────────────────── */
export function ModuleTag({ label, color = 'yellow' }) {
  return <span className={`tag-${color}`}>{label}</span>
}

/* ─── DifficultyIndicator ──────────────────────────── */
export function DifficultyIndicator({ level, max = 5, label = true }) {
  const levelNames = ['', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert', 'Pro']
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`difficulty-dot transition-all ${
              i < level ? 'bg-sf-yellow scale-100' : 'bg-white/10 scale-90'
            }`}
          />
        ))}
      </div>
      {label && (
        <span className="text-stone text-xs font-body">
          {levelNames[level] || ''}
        </span>
      )}
    </div>
  )
}

/* ─── SectionHeader ─────────────────────────────────── */
export function SectionHeader({ tag, title, subtitle, color = 'yellow' }) {
  return (
    <motion.div
      className="mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {tag && (
        <div className="mb-4">
          <ModuleTag label={tag} color={color} />
        </div>
      )}
      <GraffitiTitle color={color} size="5xl">{title}</GraffitiTitle>
      {subtitle && (
        <p className="text-chalk-dim mt-5 text-lg max-w-2xl leading-relaxed font-body">
          {subtitle}
        </p>
      )}
      <div className="paint-divider mt-6" />
    </motion.div>
  )
}

/* ─── StatBox ───────────────────────────────────────── */
export function StatBox({ value, label, color = 'yellow' }) {
  const cls = {
    yellow: 'text-sf-yellow', green: 'text-sf-green',
    pink: 'text-sf-pink', blue: 'text-sf-blue',
  }
  return (
    <div className="stat-box">
      <div className={`font-display text-5xl ${cls[color] || 'text-sf-yellow'}`}>{value}</div>
      <div className="text-stone text-sm mt-1 font-body">{label}</div>
    </div>
  )
}

/* ─── GrungeDivider ─────────────────────────────────── */
export function GrungeDivider() {
  return <div className="paint-divider-full" aria-hidden="true" />
}
