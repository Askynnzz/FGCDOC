import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { Shield, Swords, Heart, Star, ChevronDown, Gamepad2, Zap, PlaySquare, Target, AlertTriangle } from 'lucide-react'

/* ─── Composant embed YouTube ─── */
const YoutubeEmbed = ({ videoId, title }) => (
  <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black">
    <div className="pt-[56.25%]">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
)

/* ─── Composant Accordéon ─── */
const Accordion = ({ title, icon: Icon, color = 'sf-yellow', children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`rounded-2xl border transition-colors duration-300 ${open ? `border-${color}/40 bg-${color}/5` : 'border-white/8 bg-white/2'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}/15 text-${color}`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          <span className="font-display text-chalk text-xl tracking-wide">{title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={22} className={`text-${color} opacity-60`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Badge de touche ─── */
const Key = ({ label }) => (
  <span className="inline-block bg-black/50 border border-white/20 rounded-lg px-2.5 py-1 font-display text-chalk text-sm tracking-wider mx-0.5">{label}</span>
)

/* ─── PFC Card ─── */
const PFCCard = ({ emoji, title, beats, losesTo, color }) => (
  <div className={`p-5 rounded-2xl border border-${color}/30 bg-${color}/5 flex flex-col items-center gap-3 text-center`}>
    <span className="text-5xl">{emoji}</span>
    <div className={`font-display text-${color} text-xl`}>{title}</div>
    <div className="space-y-1 text-xs text-chalk-dim">
      <p>✅ Bat : <span className="text-chalk">{beats}</span></p>
      <p>❌ Perdu contre : <span className="text-chalk">{losesTo}</span></p>
    </div>
  </div>
)

const GUIDE_VIDEOS = [
  { id: 'Zbir0qosxTI', title: 'Guide Débutant SF6 – Vidéo 1' },
  { id: 'gZLWYIyEGCU', title: 'Guide Débutant SF6 – Vidéo 2 (voir playlist complète sur sa chaîne de tuto gratuit)' },
]

export default function BasicsModule() {
  return (
    <section className="relative py-12 px-4 sm:py-20 sm:px-6 overflow-hidden min-h-screen">
      <PaintSplash color="yellow" size={700} top="0%"  left="-10%" opacity={0.05} />
      <PaintSplash color="green"  size={500} top="60%" right="-5%" opacity={0.04} />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="Tome 0 — Avant tout"
          title="Les Fondamentaux"
          subtitle="Tu n'as jamais joué à un jeu de combat sérieusement ? Parfait. Ce tome est ton point de départ absolu. Pas de jargon, pas de prérequis. Juste les règles du jeu."
          color="yellow"
        />

        <div className="space-y-4">

          {/* ═══════════════════════════════════════
              1. L'OBJECTIF
          ═══════════════════════════════════════ */}
          <Accordion title="L'Objectif du Jeu" icon={Heart} color="sf-pink" defaultOpen>
            <div className="grid md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-4 text-chalk-dim text-sm leading-relaxed">
                <p>
                  Dans Street Fighter 6, l'objectif est simple : <strong className="text-chalk">vider la barre de vie de l'adversaire avant qu'il ne vide la tienne.</strong> Un match se joue en 3 rounds (best of 3). Celui qui en remporte 2 gagne le match.
                </p>
                <p>Le round se termine si :</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-2"><span className="text-sf-pink">→</span> La barre de vie d'un joueur tombe à zéro <strong className="text-chalk">(K.O.)</strong></li>
                  <li className="flex gap-2"><span className="text-sf-pink">→</span> Le temps s'écoule : celui qui a <strong className="text-chalk">le plus de vie restante</strong> gagne</li>
                  <li className="flex gap-2"><span className="text-sf-pink">→</span> Les deux barres tombent simultanément : <strong className="text-chalk">Double K.O.</strong>, on rejoue</li>
                </ul>
              </div>
              <ConcreteCard className="p-5 flex flex-col gap-4 justify-center">
                <p className="font-display text-chalk-dim text-xs text-center tracking-widest uppercase mb-2">Simulation d'un round en cours</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-stone font-display mb-1"><span>Joueur 1</span><span>65%</span></div>
                    <div className="h-5 w-full rounded-full bg-sf-green/20 border border-sf-green/30 overflow-hidden">
                      <motion.div initial={{width:'100%'}} animate={{width:'65%'}} transition={{duration:1.5,delay:0.3,ease:'easeOut'}} className="h-full bg-sf-green rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-stone font-display mb-1"><span>Joueur 2</span><span>30%</span></div>
                    <div className="h-5 w-full rounded-full bg-sf-pink/20 border border-sf-pink/30 overflow-hidden">
                      <motion.div initial={{width:'100%'}} animate={{width:'30%'}} transition={{duration:1.5,delay:0.5,ease:'easeOut'}} className="h-full bg-sf-pink rounded-full" />
                    </div>
                  </div>
                </div>
                <p className="text-chalk-dim text-xs text-center">Le Joueur 1 est en train de gagner ce round.</p>
              </ConcreteCard>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              2. CLASSIQUE VS MODERNE
          ═══════════════════════════════════════ */}
          <Accordion title="Classique vs Moderne : Lequel Choisir ?" icon={Gamepad2} color="sf-blue">
            <div className="space-y-6 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                SF6 propose deux façons de jouer. <strong className="text-chalk">Il n'y a pas de mauvais choix.</strong> Les deux sont viables du débutant jusqu'au haut niveau.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Classique */}
                <ConcreteCard className="p-6 border border-white/10">
                  <h4 className="font-display text-chalk text-2xl mb-2">🕹️ Classique</h4>
                  <p className="text-chalk-dim text-xs leading-relaxed mb-4">
                    Les <strong className="text-chalk">6 boutons d'attaque</strong> complets (LP, MP, HP, LK, MK, HK), et les coups spéciaux s'exécutent avec des <strong className="text-chalk">motions de joystick</strong> (ex: ↓↘→ + Poing pour Hadouken). Demande de la pratique mais offre un contrôle total.
                  </p>
                  <div className="bg-black/30 rounded-xl p-3 space-y-1.5 text-xs font-display">
                    <div className="flex items-center gap-2"><Key label="LP"/><Key label="MP"/><Key label="HP"/> <span className="text-stone">Poings</span></div>
                    <div className="flex items-center gap-2"><Key label="LK"/><Key label="MK"/><Key label="HK"/> <span className="text-stone">Pieds</span></div>
                    <div className="flex items-center gap-2 mt-2"><Key label="↓↘→+P"/><span className="text-stone">Hadouken</span></div>
                  </div>
                </ConcreteCard>

                {/* Moderne */}
                <ConcreteCard className="p-6 border border-sf-blue/30 bg-sf-blue/5">
                  <h4 className="font-display text-sf-blue text-2xl mb-2">🎮 Moderne</h4>
                  <p className="text-chalk-dim text-xs leading-relaxed mb-4">
                    Le bouton <Key label="S"/><span className="text-chalk-dim"> (Spécial)</span> remplace les motions. Un seul bouton suffit pour déclencher n'importe quel coup spécial. Les normaux sont regroupés en 3 boutons de force. En contrepartie, les dégâts des coups spéciaux sont légèrement réduits.
                  </p>
                  <div className="bg-black/30 rounded-xl p-3 space-y-1.5 text-xs font-display">
                    <div className="flex items-center gap-2"><Key label="L"/><Key label="M"/><Key label="H"/> <span className="text-stone">Attaques normales</span></div>
                    <div className="flex items-center gap-2 mt-2"><Key label="S"/><span className="text-stone">Coup spécial neutre</span></div>
                    <div className="flex items-center gap-2"><Key label="→+S"/><span className="text-stone">Anti-air (ex: Shoryuken)</span></div>
                    <div className="flex items-center gap-2"><Key label="Direction+S"/><span className="text-stone">Autres coups (dépend du perso)</span></div>
                  </div>
                </ConcreteCard>
              </div>

              <ConcreteCard className="p-5 border-l-4 border-l-sf-yellow">
                <h4 className="font-display text-sf-yellow text-base mb-2">💡 Mon conseil si tu débutes</h4>
                <p className="text-chalk-dim text-sm leading-relaxed">
                  <strong className="text-chalk">Commence en Moderne.</strong> Tu pourras te concentrer sur la compréhension du jeu (stratégie, garde, positionnement) sans bloquer sur l'exécution des motions. Une fois que tu maîtrises le jeu, tu peux passer en Classique si tu le souhaites, ou rester en Moderne, c'est un choix personnel valide.
                </p>
              </ConcreteCard>

              {/* Tableau comparatif */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/3">
                      <th className="text-left p-3 font-display text-stone tracking-widest text-xs uppercase">Point</th>
                      <th className="text-center p-3 font-display text-chalk tracking-widest text-xs uppercase">Classique</th>
                      <th className="text-center p-3 font-display text-sf-blue tracking-widest text-xs uppercase">Moderne</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ['Facilité d\'exécution', '★★☆☆', '★★★★'],
                      ['Coups spéciaux (dégâts)', '100%', '~80%'],
                      ['Combos optimaux', 'Accès total', 'Légèrement limité'],
                      ['Anti-air rapide', 'Motion requise', '→+S réflexe'],
                      ['Accessible en compét.', '✅', '✅'],
                    ].map(([point, classic, modern], i) => (
                      <tr key={i} className="hover:bg-white/3 transition-colors">
                        <td className="p-3 text-chalk-dim">{point}</td>
                        <td className="p-3 text-center text-chalk">{classic}</td>
                        <td className="p-3 text-center text-sf-blue">{modern}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              3. LES BOUTONS
          ═══════════════════════════════════════ */}
          <Accordion title="Les Boutons & Les Attaques" icon={Swords} color="sf-yellow">
            <div className="space-y-6 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                En Classique, il y a <strong className="text-chalk">6 boutons d'attaque</strong> : 3 Poings et 3 Pieds, chacun décliné en Léger, Moyen et Lourd. En Moderne, les 3 boutons <Key label="L"/> <Key label="M"/> <Key label="H"/> couvrent les deux types.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'LP / L', full: 'Light Punch / Léger', color: 'sf-green' },
                  { label: 'MP / M', full: 'Medium Punch / Moyen', color: 'sf-yellow' },
                  { label: 'HP / H', full: 'Heavy Punch / Lourd', color: 'sf-orange' },
                ].map(b => (
                  <div key={b.label} className={`p-3 rounded-xl border border-${b.color}/30 bg-${b.color}/5 text-center`}>
                    <div className={`font-display text-${b.color} text-xl mb-1`}>{b.label}</div>
                    <div className="text-stone text-xs">{b.full}</div>
                  </div>
                ))}
              </div>

              <ConcreteCard className="p-5 border-l-4 border-l-sf-yellow">
                <h4 className="font-display text-sf-yellow text-lg mb-3">La Règle des 3 Forces</h4>
                <div className="grid grid-cols-3 gap-4 text-center text-xs text-chalk-dim">
                  <div>
                    <div className="font-display text-sf-green text-xl mb-1">Léger</div>
                    <p>Très rapide. Peu de dégâts. Sert à interrompre l'adversaire, commencer un combo ou contrer une attaque.</p>
                  </div>
                  <div>
                    <div className="font-display text-sf-yellow text-xl mb-1">Moyen</div>
                    <p>Bon équilibre. Ce sont souvent les meilleurs "pokes" pour tenir l'adversaire à distance ou confirmer un hit.</p>
                  </div>
                  <div>
                    <div className="font-display text-sf-orange text-xl mb-1">Lourd</div>
                    <p>Lent mais fort et longue portée. Idéal pour punir une grosse erreur adverse ou contrôler l'espace.</p>
                  </div>
                </div>
              </ConcreteCard>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              4. SE DÉPLACER & BLOQUER
          ═══════════════════════════════════════ */}
          <Accordion title="Se Déplacer & Bloquer" icon={Shield} color="sf-blue">
            <div className="space-y-5 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                La garde est ta première ligne de défense. Dans SF6, la direction que tu tiens sur le stick détermine contre quoi tu es protégé. <strong className="text-chalk">Pas toutes les attaques se bloquent de la même façon.</strong>
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <ConcreteCard className="p-5">
                  <div className="font-display text-sf-blue text-lg mb-1">Garde Haute</div>
                  <div className="text-stone text-xs mb-3 font-display">← Arrière (debout)</div>
                  <p className="text-chalk-dim text-xs leading-relaxed mb-3">Protège contre les attaques <strong className="text-chalk">hautes</strong> et les projectiles. Utilisée debout.</p>
                  <div className="p-2 rounded-lg bg-sf-blue/10 border border-sf-blue/20 text-xs text-sf-blue font-display text-center">Bloque les attaques hautes</div>
                </ConcreteCard>

                <ConcreteCard className="p-5 border border-sf-yellow/30 bg-sf-yellow/5">
                  <div className="font-display text-sf-yellow text-lg mb-1">Garde Basse</div>
                  <div className="text-stone text-xs mb-3 font-display">↙ Bas-Arrière (accroupi)</div>
                  <p className="text-chalk-dim text-xs leading-relaxed mb-3">
                    <strong className="text-chalk">Obligatoire</strong> pour bloquer les attaques basses (sweeps, low kicks). La garde haute ne protège pas contre les lows.
                  </p>
                  <div className="p-2 rounded-lg bg-sf-yellow/10 border border-sf-yellow/20 text-xs text-sf-yellow font-display text-center">Bloque les attaques basses</div>
                </ConcreteCard>

                <ConcreteCard className="p-5 border border-sf-green/30 bg-sf-green/5">
                  <div className="font-display text-sf-green text-lg mb-1">Sauts</div>
                  <div className="text-stone text-xs mb-3 font-display">↑ — Se déplacer en l'air</div>
                  <p className="text-chalk-dim text-xs leading-relaxed mb-3">
                    Les attaques sautées se bloquent en <strong className="text-chalk">garde haute debout (←)</strong>. L'alternative est l'anti-air : frapper l'adversaire pendant qu'il est dans les airs.
                  </p>
                  <div className="p-2 rounded-lg bg-sf-green/10 border border-sf-green/20 text-xs text-sf-green font-display text-center">Bloquable en garde haute</div>
                </ConcreteCard>
              </div>

              {/* Overhead : la vraie faiblesse de la garde basse */}
              <ConcreteCard className="p-5 border border-sf-pink/30 bg-sf-pink/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-sf-pink mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-display text-sf-pink mb-1 text-base">⚠️ Le danger de la garde basse : l'Overhead</div>
                    <p className="text-chalk-dim text-xs leading-relaxed">
                      La garde basse ne protège <strong className="text-chalk">pas</strong> contre les attaques <strong className="text-chalk">Overhead</strong> ou des coups spéciaux ou normaux qui frappent "par-dessus" et qui <strong className="text-chalk">doivent être bloqués debout</strong>. Ils sont rares mais existent pour punir les joueurs trop accroupis. Les Chopes (Throws) contournent également les deux gardes.
                    </p>
                  </div>
                </div>
              </ConcreteCard>

              <ConcreteCard className="p-5 border-l-4 border-l-sf-blue">
                <p className="text-chalk-dim text-sm leading-relaxed">
                  <strong className="text-chalk">La règle de base :</strong> Si tu ne sais pas ce que l'adversaire va faire, tiens la <strong className="text-chalk">garde basse en arrière</strong> (↙). Tu bloqueras les attaques hautes ET basses. Reste attentif aux Overheads et aux Chopes, c'est là que le vrai jeu de réflexion commence.
                </p>
              </ConcreteCard>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              5. PIERRE-FEUILLE-CISEAUX : LE CŒUR DU JEU
          ═══════════════════════════════════════ */}
          <Accordion title="Le Cœur du Jeu : Pierre-Feuille-Ciseaux" icon={Target} color="sf-pink">
            <div className="space-y-6 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                Un jeu de combat n'est pas qu'une question de dextérité. C'est un <strong className="text-chalk">jeu de décision permanent</strong>. À chaque instant, tu dois deviner ce que fait l'adversaire et y répondre correctement. Ce système s'appelle le <strong className="text-chalk">Pierre-Feuille-Ciseaux asymétrique</strong>.
              </p>

              {/* PFC Visuel */}
              <div className="grid grid-cols-3 gap-4">
                <PFCCard
                  emoji="🗡️"
                  title="Attaquer"
                  beats="La Chope"
                  losesTo="La Garde"
                  color="sf-yellow"
                />
                <PFCCard
                  emoji="🛡️"
                  title="Garder"
                  beats="L'Attaque"
                  losesTo="La Chope"
                  color="sf-blue"
                />
                <PFCCard
                  emoji="✊"
                  title="Choper"
                  beats="La Garde"
                  losesTo="L'Attaque"
                  color="sf-pink"
                />
              </div>

              {/* Flèches de cycle */}
              <ConcreteCard className="p-6 text-center">
                <div className="font-display text-chalk-dim text-base mb-4">Quand l'adversaire t'approche, le mindgame commence :</div>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="font-display text-sf-yellow text-xl">Attaquer</div>
                    <div className="text-stone text-xs">Interrompt la chope</div>
                  </div>
                  <div className="text-chalk-dim text-2xl">⟷</div>
                  <div className="text-center">
                    <div className="font-display text-sf-blue text-xl">Garder</div>
                    <div className="text-stone text-xs">Bloque l'attaque</div>
                  </div>
                  <div className="text-chalk-dim text-2xl">⟷</div>
                  <div className="text-center">
                    <div className="font-display text-sf-pink text-xl">Choper</div>
                    <div className="text-stone text-xs">Punis la garde</div>
                  </div>
                </div>
              </ConcreteCard>

              <p className="text-chalk-dim text-sm leading-relaxed">
                Mais contrairement au vrai Pierre-Feuille-Ciseaux, il n'y a pas que 3 options. Tu peux aussi <strong className="text-chalk">sauter</strong>, utiliser un <strong className="text-chalk">Drive Impact</strong>, faire un <strong className="text-chalk">Parry</strong>... Chaque option a ses forces et ses faiblesses. Le jeu consiste à <strong className="text-chalk">lire les habitudes de l'adversaire</strong> et à choisir l'option gagnante avant lui, c'est le cœur de ce qu'on appelle le <em>Mindgame</em>.
              </p>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              6. COUPS SPÉCIAUX & SUPERS
          ═══════════════════════════════════════ */}
          <Accordion title="Coups Spéciaux & Supers" icon={Star} color="sf-yellow">
            <div className="space-y-5 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                En plus des attaques normales, chaque personnage possède des <strong className="text-chalk">Coups Spéciaux</strong> : des mouvements uniques déclenchés par une combinaison de direction + bouton (Classique) ou le bouton <Key label="S"/> (Moderne).
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ConcreteCard className="p-5">
                  <h4 className="font-display text-chalk text-lg mb-3">Classique — Motions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Key label="↓↘→+P"/> <span className="text-chalk-dim">Hadouken (Projectile)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Key label="→↓↘+P"/> <span className="text-chalk-dim">Shoryuken (Anti-Air)</span>
                    </div>
                  </div>
                </ConcreteCard>
                <ConcreteCard className="p-5 border border-sf-blue/30 bg-sf-blue/5">
                  <h4 className="font-display text-sf-blue text-lg mb-3">Moderne — 1 Bouton</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Key label="S"/> <span className="text-chalk-dim">Hadouken automatique</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Key label="→+S"/> <span className="text-chalk-dim">Shoryuken (Anti-Air)</span>
                    </div>
                  </div>
                </ConcreteCard>
              </div>
              <ConcreteCard className="p-5 border-l-4 border-l-sf-yellow">
                <h4 className="font-display text-sf-yellow text-lg mb-2">Les Super Arts</h4>
                <p className="text-chalk-dim text-sm leading-relaxed">
                  Chaque personnage possède 3 niveaux de Super Arts — des attaques ultra-puissantes qui consomment la <strong className="text-chalk">jauge Super</strong> (barre bleue en bas). En Classique : motions doubles (ex: ↓↘→↓↘→+P pour Ryu). En Moderne, cela dépend du personnage (ex: <Key label="↓+H+S"/> pour Ingrid). Réserve-les pour <strong className="text-chalk">punir une grosse erreur adverse</strong>.
                </p>
              </ConcreteCard>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              7. LE DRIVE SYSTEM
          ═══════════════════════════════════════ */}
          <Accordion title="La Jauge Drive (SF6 uniquement)" icon={Zap} color="sf-orange">
            <div className="space-y-5 mt-2">
              <p className="text-chalk-dim text-sm leading-relaxed">
                SF6 introduit la <strong className="text-chalk">Jauge Drive</strong> : 6 segments de drive qui alimentent 5 mécaniques distinctes. C'est la mécanique centrale du jeu qui est capitale pour votre progression, il faut apprendre à la gérer.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ConcreteCard className="p-4 space-y-1">
                  <div className="font-display text-sf-orange text-base">Drive Impact (DI)</div>
                  <div className="text-stone text-xs font-display tracking-wider">HP + HK — Coût : 1 barre</div>
                  <p className="text-chalk-dim text-xs leading-relaxed">Attaque blindée qui peut résister a 2 coups et stun l'ennemi s'il attaque dedans. Se contre avec un autre DI, un parry, ou 3coups avant la fin de l'animation du DI.</p>
                </ConcreteCard>
                <ConcreteCard className="p-4 space-y-1">
                  <div className="font-display text-sf-orange text-base">Drive Parry</div>
                  <div className="text-stone text-xs font-display tracking-wider">MP + MK — Régénère la jauge si contact</div>
                  <p className="text-chalk-dim text-xs leading-relaxed">
                    Neutralise les attaques adverses et <strong className="text-chalk">régénère de la jauge</strong> au contact. Attention : si tu maintiens le Parry dans le vide sans toucher d'attaque, il <strong className="text-chalk">consomme progressivement ta barre Drive</strong>.
                  </p>
                </ConcreteCard>
                <ConcreteCard className="p-4 space-y-1">
                  <div className="font-display text-sf-orange text-base">Drive Rush (DR)</div>
                  <div className="text-stone text-xs font-display tracking-wider">Parry puis →→ (1 barre) ou Annulation →→ (3 barres)</div>
                  <p className="text-chalk-dim text-xs leading-relaxed">Un dash rapide qui donne +4 frames à tes normaux. Utilisé pour prolonger les combos et créer de la pression au corps-à-corps.</p>
                </ConcreteCard>
                <ConcreteCard className="p-4 space-y-1">
                  <div className="font-display text-sf-orange text-base">Overdrive (OD)</div>
                  <div className="text-stone text-xs font-display tracking-wider">Bouton ×2 — Coût : 2 barres</div>
                  <p className="text-chalk-dim text-xs leading-relaxed">Version améliorée d'un coup spécial. Plus rapide, plus fort, propriétés différentes. En Moderne : même chose.</p>
                </ConcreteCard>
              </div>
              <ConcreteCard className="p-5 border border-sf-pink/30 bg-sf-pink/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-sf-pink mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-display text-sf-pink mb-1">⚠️ Le Burnout : À éviter absolument</div>
                    <p className="text-chalk-dim text-xs leading-relaxed">
                      Si ta jauge Drive tombe à zéro, tu entres en <strong className="text-chalk">Burnout</strong> : tes gardes deviennent vulnérables (les Drive Impacts te stun si proche du coin) , tu prends des chip damage sur les spéciaux et tu ne peux plus utiliser aucune mécanique Drive. <strong className="text-chalk">La jauge de drive est plus importante que la barre de vie.</strong>
                    </p>
                  </div>
                </div>
              </ConcreteCard>
            </div>
          </Accordion>

          {/* ═══════════════════════════════════════
              8. GUIDES VIDÉO
          ═══════════════════════════════════════ */}
          <div className="pt-8">
            <div className="flex items-center gap-3 mb-6">
              <PlaySquare className="text-sf-yellow" size={28} />
              <h3 className="font-display text-chalk text-3xl tracking-wide">Guides Vidéo Recommandés</h3>
            </div>
            <p className="text-chalk-dim text-sm mb-8 max-w-2xl leading-relaxed">
              Ces vidéos couvrent et expliquent de manière claire et détaillée les bases de SF6. 
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {GUIDE_VIDEOS.map((video, i) => (
                <div key={i} className="space-y-3">
                  <YoutubeEmbed videoId={video.id} title={video.title} />
                  <h4 className="font-display text-chalk text-lg pl-2 border-l-2 border-sf-yellow">{video.title}</h4>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
