import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PaintSplash } from '../components/ui/UIComponents'
import { ArrowRight, Zap, Timer, GitBranch, BookOpen, Brain, Users, Activity, Crosshair, Cpu, GraduationCap, Swords, ChevronRight } from 'lucide-react'

/* ─── Tomes dans l'ordre pédagogique cohérent ─── */
const allTomes = [
  {
    path: '/basics',
    Icon: GraduationCap,
    tag: 'TOME 0',
    title: 'Les Fondamentaux',
    desc: 'Boutons, garde, Drive System, Pierre-Feuille-Ciseaux. Tout ce qu\'il faut savoir avant de commencer.',
    accent: 'green',
    difficulty: 0,
  },
  {
    path: '/frame-data',
    Icon: Timer,
    tag: 'TOME I',
    title: 'Les Frames',
    desc: 'Frame Data, Hitstun, Frame Traps. La science cachée derrière chaque coup.',
    accent: 'yellow',
    difficulty: 2,
  },
  {
    path: '/neutral',
    Icon: Zap,
    tag: 'TOME II',
    title: "L'Espace et le Mouvement",
    desc: 'Footsies, Whiff Punish, contrôle de l\'écran. La guerre des positions.',
    accent: 'green',
    difficulty: 2,
  },
  {
    path: '/psychology',
    Icon: Brain,
    tag: 'TOME III',
    title: 'Psychologie & Défense',
    desc: 'Mental Stack, Fuzzy Guard, Delay Tech. Comprendre et exploiter le cerveau adverse.',
    accent: 'pink',
    difficulty: 3,
  },
  {
    path: '/lab',
    Icon: GitBranch,
    tag: 'TOME IV',
    title: 'Le Système Drive',
    desc: 'Drive Rush, Drive Impact, Parry. Maîtriser la mécanique centrale de SF6.',
    accent: 'orange',
    difficulty: 2,
  },
  {
    path: '/combos',
    Icon: Activity,
    tag: 'TOME V',
    title: "Combo",
    desc: 'Hit Confirm, Buffering, Damage Scaling. Transformer chaque ouverture en dégâts.',
    accent: 'pink',
    difficulty: 2,
  },
  {
    path: '/okizeme',
    Icon: Crosshair,
    tag: 'TOME VI',
    title: 'Okizeme — La Relevée',
    desc: 'Meaty, Safe Jump, Shimmy. Dominer l\'adversaire lorsqu\'il est au sol.',
    accent: 'orange',
    difficulty: 2,
  },
  {
    path: '/option-select',
    Icon: Cpu,
    tag: 'TOME VII',
    title: 'Option Selects & Mental',
    desc: 'Buffer, OS, Conditioning. Tricher légalement avec le moteur du jeu.',
    accent: 'pink',
    difficulty: 3,
  },
  {
    path: '/characters',
    Icon: Users,
    tag: 'TOME VIII',
    title: 'Le Dojo',
    desc: 'Guide visuel par personnage : Neutral, Gameplan, Vidéos. Apprends ton main.',
    accent: 'blue',
    difficulty: 1,
  },
  {
    path: '/index',
    Icon: BookOpen,
    tag: 'TOME IX',
    title: "L'Index",
    desc: 'Encyclopédie complète des termes FGC. Shimmy, Meaty, Option Select, Buffer...',
    accent: 'yellow',
    difficulty: 2,
  },
  {
    path: '/learning',
    Icon: Swords,
    tag: 'TOME X',
    title: 'Apprendre à Apprendre',
    desc: 'Replay Review, Lab, Ressources YouTube. Deviens autonome dans ta progression.',
    accent: 'blue',
    difficulty: 1,
  },
]

const accentText   = { yellow: 'text-sf-yellow', green: 'text-sf-green', orange: 'text-sf-orange', blue: 'text-sf-blue', pink: 'text-sf-pink' }
const accentIcon   = { yellow: 'bg-sf-yellow/15 text-sf-yellow', green: 'bg-sf-green/15 text-sf-green', orange: 'bg-sf-orange/15 text-sf-orange', blue: 'bg-sf-blue/15 text-sf-blue', pink: 'bg-sf-pink/15 text-sf-pink' }
const accentBorder = { yellow: 'border-sf-yellow', green: 'border-sf-green', orange: 'border-sf-orange', blue: 'border-sf-blue', pink: 'border-sf-pink' }
const accentGlow   = { yellow: 'hover:shadow-[0_0_30px_rgba(255,184,0,0.10)]', green: 'hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]', orange: 'hover:shadow-[0_0_30px_rgba(255,107,26,0.10)]', blue: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]', pink: 'hover:shadow-[0_0_30px_rgba(255,30,142,0.10)]' }

function DifficultyDots({ level }) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i < level ? 'bg-sf-yellow' : 'bg-white/15'}`} />
      ))}
    </div>
  )
}

function PaintDrip({ color, style }) {
  return <div className="absolute pointer-events-none" aria-hidden="true" style={{ width: '2px', background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`, ...style }} />
}

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-12 sm:pb-20 px-4 sm:px-6 min-h-[88vh] flex items-center">
        
        {/* ── Vidéo de fond (YouTube) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F4EBE1]">
          <iframe 
            src={`https://www.youtube.com/embed/CqI3HWB7CM4?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=CqI3HWB7CM4&playsinline=1`}
            title="FGC Background" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] md:w-[150vw] md:h-[150vh] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.12] mix-blend-multiply pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4EBE1] via-[#F4EBE1]/40 to-transparent pointer-events-none" />
        </div>

        {/* ── Éléments de peinture (Z-10) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <PaintSplash color="yellow" size={900} top="40%"  left="55%"  opacity={0.055} />
          <PaintSplash color="pink"   size={600} top="75%"  left="15%"  opacity={0.05}  />
          <PaintSplash color="blue"   size={500} top="10%"  left="80%"  opacity={0.04}  />
          <PaintSplash color="green"  size={400} top="90%"  left="70%"  opacity={0.035} />

          <PaintDrip color="rgba(255,184,0,0.3)"   style={{ top: 0, left: '22%',  height: '200px' }} />
          <PaintDrip color="rgba(255,30,142,0.22)" style={{ top: 0, left: '60%',  height: '140px' }} />
          <PaintDrip color="rgba(57,255,20,0.18)"  style={{ top: 0, right: '18%', height: '110px' }} />
        </div>

        {/* Mega text fond */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
          <span className="font-display uppercase select-none" style={{ fontSize: 'clamp(50px, 15vw, 260px)', WebkitTextStroke: '1.5px rgba(255,184,0,0.045)', color: 'transparent', letterSpacing: '0.05em', lineHeight: 1 }}>
            FGC DOC
          </span>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sf-yellow/30 bg-sf-yellow/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-sf-yellow animate-pulse" />

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 1.15, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
              className="ransom-title mb-6 flex flex-wrap"
              style={{ fontSize: 'clamp(50px, 12vw, 150px)', letterSpacing: '0.05em' }}
            >
              <span className="text-[#F4EBE1]">FGC</span>
              <span className="text-sf-pink" style={{ filter: 'drop-shadow(0 0 24px rgba(230,0,18,0.5))' }}>DOC</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10"
            >
              {['Frame Data', 'Mindgame', 'Mécanique SF6', 'Combos', 'Okizeme'].map((kw, i) => (
                <span key={kw}>
                  <span className="font-display text-xl md:text-2xl text-chalk-dim tracking-wide">{kw}</span>
                  {i < 4 && <span className="text-sf-yellow/40 font-display text-xl md:text-2xl ml-3">·</span>}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/basics"
                className="group p5-clip inline-flex items-center gap-3 bg-sf-pink text-[#F4EBE1] px-10 py-5 font-display tracking-widest text-base uppercase p5-shadow p5-shadow-hover transition-all"
              >
                Commencer — Tome 0 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/frame-data"
                className="inline-flex items-center gap-2 border-2 border-white/15 text-chalk-dim hover:border-sf-yellow/40 hover:text-chalk px-8 py-4 font-display tracking-widest text-sm uppercase rounded-xl transition-all"
              >
                Déjà une base ? Tome I →
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <span className="text-stone text-xs font-display tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-sf-yellow/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          GRILLE DES TOMES (ordre pédagogique)
      ══════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 border-t-4 border-chalk/10">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="tag-yellow mb-4 inline-block">La Bibliothèque</span>
            <h2 className="graffiti-title text-chalk text-5xl md:text-6xl" style={{ textShadow: '3px 3px 0 #000' }}>LES TOMES</h2>
            <div className="paint-divider mt-4 mb-4" />
            <p className="text-chalk-dim text-sm max-w-xl">
              Les tomes sont ordonnés dans un <strong className="text-chalk">ordre pédagogique cohérent</strong>. Commence par le Tome 0 et avance dans l'ordre, chaque tome s'appuie sur le précédent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allTomes.map((mod, i) => {
              const Icon = mod.Icon
              return (
                <motion.div
                  key={mod.path}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={mod.path}
                    className={`group relative flex flex-col h-full border-2 border-chalk/10 hover:border-${accentBorder[mod.accent].replace('border-', '')}/50 p-6 hover:bg-[#1A1815]/5 transition-all ${accentGlow[mod.accent]} p5-shadow-hover block overflow-hidden rounded-xl`}
                  >
                    {/* Barre d'accentuation top au hover */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${accentBorder[mod.accent].replace('border-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-0 bg-p5-stripes opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-11 h-11 rounded-xl ${accentIcon[mod.accent]} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex items-center gap-3">
                          <DifficultyDots level={mod.difficulty} />
                          <span className={`tag-${mod.accent} text-xs`}>{mod.tag}</span>
                        </div>
                      </div>

                      <h3 className="font-display text-chalk text-xl tracking-wide mb-2 group-hover:text-white transition-colors leading-tight">
                        {mod.title}
                      </h3>
                      <p className="text-chalk-dim leading-relaxed mb-5 text-xs flex-1">{mod.desc}</p>

                      <div className={`flex items-center gap-2 font-display text-xs tracking-widest uppercase ${accentText[mod.accent]} opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300`}>
                        Découvrir <ChevronRight size={13} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

    </div>
  )
}
