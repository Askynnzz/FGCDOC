import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import glossaryData from '../../../data/glossary.json'
import { SectionHeader, PaintSplash, DifficultyIndicator } from '../../ui/UIComponents'
import { Search, ChevronDown, Play, BookOpen, AlertTriangle, CheckCircle2, X } from 'lucide-react'

/* ─── VideoEmbed ─────────────────────────────────────── */
function VideoEmbed({ video, accentColor }) {
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false)

  const colorMap = {
    yellow: 'border-sf-yellow/30 bg-sf-yellow/5',
    green:  'border-sf-green/30  bg-sf-green/5',
    pink:   'border-sf-pink/30   bg-sf-pink/5',
    blue:   'border-sf-blue/30   bg-sf-blue/5',
    orange: 'border-sf-orange/30 bg-sf-orange/5',
  }
  const textColor = {
    yellow: 'text-sf-yellow', green: 'text-sf-green',
    pink: 'text-sf-pink', blue: 'text-sf-blue', orange: 'text-sf-orange',
  }

  return (
    <div className={`rounded-xl border ${colorMap[accentColor] || colorMap.yellow} overflow-hidden`}>
      {/* Thumbnail / placeholder si pas encore actif */}
      {!active ? (
        <button
          onClick={() => setActive(true)}
          className="w-full group relative"
          aria-label={`Lancer la vidéo : ${video.title}`}
        >
          {/* Thumbnail YouTube */}
          <img
            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full aspect-video object-cover"
            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full ${textColor[accentColor] || 'text-sf-yellow'} bg-black/60 border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Play size={24} fill="currentColor" className="ml-1" />
            </div>
          </div>
        </button>
      ) : (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Infos vidéo */}
      <div className="px-4 py-3 flex items-start gap-3">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${textColor[accentColor] || 'text-sf-yellow'} bg-current/10`}>
          <Play size={12} fill="currentColor" className={textColor[accentColor] || 'text-sf-yellow'} />
        </div>
        <div className="min-w-0">
          <p className="text-chalk text-sm font-medium leading-snug">{video.title}</p>
          <p className="text-stone text-xs mt-0.5">{video.creator}</p>
          {video.description && (
            <p className="text-chalk-dim text-xs mt-2 leading-relaxed">{video.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Markdown-lite : bold **text** ─────────────────── */
function RichText({ text, className = '' }) {
  if (!text) return null
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i} className="text-chalk font-semibold">{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </span>
  )
}

/* ─── GlossaryCard ───────────────────────────────────── */
function GlossaryCard({ term, index }) {
  const [expanded, setExpanded] = useState(false)
  const [videoTab, setVideoTab] = useState(0)

  const C = {
    yellow: { text: 'text-sf-yellow', border: 'border-sf-yellow', borderDim: 'border-sf-yellow/25', bg: 'bg-sf-yellow/6', dot: 'bg-sf-yellow', accent: 'card-accent-yellow' },
    green:  { text: 'text-sf-green',  border: 'border-sf-green',  borderDim: 'border-sf-green/25',  bg: 'bg-sf-green/6',  dot: 'bg-sf-green',  accent: 'card-accent-green'  },
    orange: { text: 'text-sf-orange', border: 'border-sf-orange', borderDim: 'border-sf-orange/25', bg: 'bg-sf-orange/6', dot: 'bg-sf-orange', accent: 'card-accent-orange' },
    pink:   { text: 'text-sf-pink',   border: 'border-sf-pink',   borderDim: 'border-sf-pink/25',   bg: 'bg-sf-pink/6',   dot: 'bg-sf-pink',   accent: 'card-accent-pink'   },
    blue:   { text: 'text-sf-blue',   border: 'border-sf-blue',   borderDim: 'border-sf-blue/25',   bg: 'bg-sf-blue/6',   dot: 'bg-sf-blue',   accent: 'card-accent-blue'   },
  }
  const c = C[term.accentColor] || C.yellow

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      layout
      className={`gloss-card ${c.accent} ${expanded ? `border ${c.borderDim}` : ''}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className={`font-display text-3xl tracking-wide leading-none ${c.text}`}>
              {term.term}
            </h3>
            <span className={`tag-${term.accentColor === 'orange' ? 'orange' : term.accentColor}`}>
              {term.category}
            </span>
          </div>
          <DifficultyIndicator level={term.difficulty} />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
          className={`w-8 h-8 rounded-full border ${c.borderDim} flex items-center justify-center flex-shrink-0 transition-all hover:${c.border} ${c.text}`}
          aria-label={expanded ? 'Réduire' : 'Développer'}
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} />
          </motion.div>
        </button>
      </div>

      {/* ── Short def ── */}
      <p className="text-chalk-dim text-sm mt-3 leading-relaxed line-clamp-2">
        {term.shortDef}
      </p>

      {/* ── Expanded content ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-6 space-y-6">

              {/* Séparateur */}
              <div className={`h-px bg-gradient-to-r from-transparent via-${c.border.replace('border-', '')} to-transparent opacity-30`} />

              {/* ── Définition complète ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={15} className={c.text} />
                  <span className={`section-label ${c.text}`}>Définition complète</span>
                </div>
                <div className="space-y-3">
                  {term.definition.split('\n\n').map((para, i) => (
                    <p key={i} className="text-chalk-dim leading-relaxed text-sm">
                      <RichText text={para} />
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Comment ça marche ── */}
              {term.howItWorks && (
                <div className={`rounded-xl p-5 border ${c.borderDim} ${c.bg}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={15} className={c.text} />
                    <span className={`section-label ${c.text}`}>Comment ça marche</span>
                  </div>
                  <ol className="space-y-3">
                    {term.howItWorks.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`step-number ${c.text} text-xs mt-0.5`}
                          style={{ width: '22px', height: '22px', fontSize: '11px', border: '1.5px solid currentColor', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {i + 1}
                        </span>
                        <span className="text-chalk-dim text-sm leading-relaxed">
                          <RichText text={step} />
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* ── Erreur commune ── */}
              {term.commonMistakes && (
                <div className="rounded-xl p-4 border border-sf-pink/20 bg-sf-pink/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={15} className="text-sf-pink mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="section-label text-sf-pink block mb-2">Erreur classique à éviter</span>
                      <p className="text-chalk-dim text-sm leading-relaxed">
                        <RichText text={term.commonMistakes} />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Vidéos ── */}
              {term.videos && term.videos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Play size={15} className={c.text} />
                    <span className={`section-label ${c.text}`}>
                      Vidéo{term.videos.length > 1 ? 's' : ''} de référence
                    </span>
                    {term.videos.length > 1 && (
                      <div className="flex gap-1 ml-auto">
                        {term.videos.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setVideoTab(i)}
                            className={`px-3 py-1 rounded-full text-xs font-display tracking-wide transition-all ${
                              videoTab === i
                                ? `${c.bg} border ${c.borderDim} ${c.text}`
                                : 'text-stone hover:text-chalk-dim'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={videoTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <VideoEmbed
                        video={term.videos[videoTab]}
                        accentColor={term.accentColor}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ── Tags ── */}
              <div className="flex flex-wrap gap-2 pt-1">
                {term.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 rounded-full text-stone border border-white/8 font-body hover:border-white/20 hover:text-chalk-dim transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bouton fermer */}
              <button
                onClick={() => setExpanded(false)}
                className="w-full py-2.5 rounded-xl border border-white/8 text-stone text-xs font-display tracking-widest uppercase hover:border-white/20 hover:text-chalk-dim transition-all flex items-center justify-center gap-2"
              >
                <X size={12} /> Réduire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── GlossaryModule ─────────────────────────────────── */
export default function GlossaryModule() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return glossaryData.terms.filter((term) => {
      const q = search.toLowerCase()
      const matchSearch =
        term.term.toLowerCase().includes(q) ||
        term.shortDef.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.tags.some((t) => t.toLowerCase().includes(q))
      const matchCat = category === 'all' || term.category === category
      return matchSearch && matchCat
    })
  }, [search, category])

  return (
    <section id="glossary" className="relative py-12 px-4 sm:py-20 sm:px-6 overflow-hidden min-h-screen">
      <PaintSplash color="blue"   size={600} top="8%"   right="-8%"  opacity={0.06} />
      <PaintSplash color="yellow" size={400} top="85%"  left="3%"    opacity={0.05} />
      <PaintSplash color="pink"   size={350} top="50%"  right="5%"   opacity={0.04} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome V"
          title="L'Index"
          subtitle="Le lexique. Définition des concepts FGC expliqués en détail, avec mécaniques exactes, erreurs à éviter et vidéos de référence (pas encore les vidéos cherchez vous même pr l'instant svp)."
          color="blue"
        />

        {/* ── Barre de recherche premium ── */}
        <div className="relative mb-6 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone group-focus-within:text-sf-blue transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherche : Shimmy, Meaty, Frame Data, DP..."
            className="w-full bg-bg-card border border-white/8 rounded-2xl pl-12 pr-6 py-4 text-chalk placeholder:text-stone/60 focus:outline-none focus:border-sf-blue/50 font-body text-base transition-all"
            aria-label="Recherche dans le glossaire"
            id="glossary-search"
          />
        </div>

        {/* ── Filtres catégorie ── */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 mb-8 sm:mb-10 hide-scrollbar">
          {glossaryData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl border font-display text-xs tracking-widest uppercase transition-all ${
                category === cat.id
                  ? 'bg-sf-blue/15 border-sf-blue/60 text-sf-blue'
                  : 'border-white/8 text-stone hover:border-white/20 hover:text-chalk-dim'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Compteur ── */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-stone text-sm font-body">
            <span className="text-chalk font-semibold">{filtered.length}</span>{' '}
            terme{filtered.length !== 1 ? 's' : ''}
            {search && <span className="text-sf-blue"> · "{search}"</span>}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-stone hover:text-sf-yellow transition-colors flex items-center gap-1"
            >
              <X size={12} /> Effacer
            </button>
          )}
        </div>

        {/* ── Grille de cartes ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${search}-${category}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {filtered.length > 0 ? (
              filtered.map((term, i) => (
                <GlossaryCard key={term.id} term={term} index={i} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="md:col-span-2 concrete-card p-16 text-center"
              >
                <p className="text-6xl mb-4">🤷</p>
                <p className="font-display text-chalk text-3xl mb-3">Terme inconnu</p>
                <p className="text-chalk-dim text-lg">
                  On n'a pas encore "{search}" dans le lexique.
                </p>
                <button
                  onClick={() => setSearch('')}
                  className="mt-6 btn-outline px-8 py-3 text-sm inline-flex"
                >
                  ← Retour au lexique complet
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
