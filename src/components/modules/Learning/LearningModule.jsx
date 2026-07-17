import { motion } from 'framer-motion'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { BrainCircuit, Search, Link2, MonitorPlay, PlaySquare, Globe, BookOpen, Tv } from 'lucide-react'

/* ─── Composants Locaux ─── */
const ResourceCard = ({ title, desc, url, icon: Icon, type }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group block"
  >
    <ConcreteCard className="h-full p-5 border border-[#1A1815]/10 hover:border-sf-pink/40 transition-colors bg-white/5 group-hover:bg-white/10">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
          type === 'youtube' ? 'bg-sf-pink/10 text-sf-pink' :
          type === 'wiki' ? 'bg-sf-blue/10 text-sf-blue' :
          type === 'tool' ? 'bg-sf-yellow/10 text-sf-yellow' :
          'bg-stone/10 text-stone'
        }`}>
          <Icon size={24} strokeWidth={2} />
        </div>
        <div>
          <h4 className="font-display text-chalk text-lg mb-1 group-hover:text-sf-pink transition-colors">{title}</h4>
          <p className="text-chalk-dim text-xs leading-relaxed">{desc}</p>
        </div>
      </div>
    </ConcreteCard>
  </a>
)

export default function LearningModule() {
  return (
    <section className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="blue" size={600} top="10%" left="-10%" opacity={0.04} />
      <PaintSplash color="pink" size={500} top="60%" right="-5%" opacity={0.03} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="Tome X"
          title="Apprendre à Apprendre"
          subtitle="Savoir jouer est une chose. Savoir comment s'améliorer, analyser ses erreurs et utiliser les bonnes ressources en est une autre. Devenez autonome merde !!!."
          color="blue"
        />

        {/* ─── SECTION 1 : REPLAY REVIEW ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <MonitorPlay className="text-sf-blue" size={28} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">1. L'Auto-Évaluation (Replay Review)</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-chalk-dim text-sm leading-relaxed">
                Regarder ses propres matchs (Replays) est le facteur numéro un pour progresser. Quand vous jouez, votre cerveau est surchargé : vous ne pouvez pas analyser objectivement ce qui se passe. Le Replay permet de déconstruire le match à froid.
              </p>
              
              <ConcreteCard className="p-6 border-l-4 border-l-sf-blue bg-sf-blue/5">
                <h3 className="font-display text-sf-blue text-xl mb-4">Que chercher dans un Replay ?</h3>
                <ul className="space-y-4 text-sm text-chalk-dim">
                  <li className="flex gap-3">
                    <span className="text-sf-blue font-bold">1.</span>
                    <span><strong>Pourquoi ai-je pris ce coup ?</strong> Mettez pause à chaque fois que vous perdez de la vie. Étiez-vous en train de taper ? D'avancer ? Avez-vous raté une garde ?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sf-blue font-bold">2.</span>
                    <span><strong>Les Sauts :</strong> Avez-vous anti-air chaque saut de l'adversaire ? Combien de fois avez-vous sauté et été puni ?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sf-blue font-bold">3.</span>
                    <span><strong>Les Ouvertures ratées :</strong> Avez-vous touché l'adversaire avec un gros coup, mais oublié de confirmer en combo (Drop) ? Ou alors avez vous laissé passer une occasion de punir ?</span>
                  </li>
                </ul>
              </ConcreteCard>
            </div>

            <ConcreteCard className="p-8 flex flex-col justify-center">
              <h3 className="font-display text-chalk text-2xl mb-4 text-center">La Règle d'Or de l'Apprentissage</h3>
              <p className="text-center text-sf-pink font-display text-xl mb-4 p5-shadow">
                1 SESSION = 1 OBJECTIF
              </p>
              <p className="text-chalk-dim text-sm text-center leading-relaxed">
                Ne jouez pas "pour gagner" uniquement. Jouez pour apprendre et corriger vos erreurs. Si votre objectif du jour est de réussir vos anti-airs, et que vous perdez le match mais que vous avez anti-air 100% des sauts : <strong>C'est une victoire , chaque aspect s'apprends au fur et a mesure.</strong> Le rank n'est qu'une conséquence de votre apprentissage, pas un but en soi !!
              </p>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ─── SECTION 2 : RECHERCHE ET LABING ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <Search className="text-sf-yellow" size={28} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">2. Le Lab & L'Investigation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ConcreteCard className="p-6">
              <BrainCircuit className="text-sf-yellow mb-4" size={24} />
              <h3 className="font-display text-chalk text-lg mb-2">Utiliser le Mode Entraînement</h3>
              <p className="text-chalk-dim text-xs leading-relaxed">
                Le Lab n'est pas fait pour seulement répéter des combos dans le vide. Utilisez les fonctions d'enregistrement : enregistrez l'IA à faire le coup qui vous a posé problème dans votre dernier match, et trouvez la réponse (Punition, Parry, Sauts...).
              </p>
            </ConcreteCard>

            <ConcreteCard className="p-6">
              <Globe className="text-sf-yellow mb-4" size={24} />
              <h3 className="font-display text-chalk text-lg mb-2">Discord et Communauté</h3>
              <p className="text-chalk-dim text-xs leading-relaxed">
                Chaque personnage possède un serveur Discord dédié avec des joueurs obsédés par son optimisation. Vous y trouverez des documents Google Sheets, vidéos & autres listant absolument tout : des combos optimisés aux oki (setups à la relevée) gameplan , safe jumps etc...
              </p>
            </ConcreteCard>

            <ConcreteCard className="p-6">
              <PlaySquare className="text-sf-yellow mb-4" size={24} />
              <h3 className="font-display text-chalk text-lg mb-2">Review des pro pour s'en inspirer</h3>
              <p className="text-chalk-dim text-xs leading-relaxed">
                Allez sur le CFN (ou YouTube) et regardez les replays des meilleurs joueurs du monde sur votre personnage. Ne regardez pas le match en entier les bras croisés : regardez spécifiquement ce qu'ils font après un knockdown, ou comment ils gèrent le corner, le neutral etc...
              </p>
            </ConcreteCard>
          </div>
        </motion.div>

        {/* ─── SECTION 3 : LE COMPENDIUM ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-sf-pink" size={28} />
            <h2 className="font-display text-chalk text-3xl tracking-wide">3. Le Compendium des Ressources</h2>
          </div>
          <p className="text-chalk-dim text-sm mb-10 max-w-3xl leading-relaxed">
            Internet regorge d'excellents sites et créateurs de contenu dédiés à l'apprentissage des jeux de combat. Voici une liste non-exhaustive des ressources utiles.
          </p>

          <div className="space-y-12">
            
            {/* Outils et Wikis */}
            <div>
              <h3 className="font-display text-stone text-xl border-b border-[#1A1815]/10 pb-2 mb-6">Encyclopédies & Outils</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  type="wiki"
                  title="SuperCombo Wiki" 
                  desc="Frame data détaillée, hitboxes, et stratégies pour quasiment tous les jeux de combat majeurs." 
                  url="https://wiki.supercombo.gg/" 
                  icon={Globe} 
                />
                <ResourceCard 
                  type="wiki"
                  title="Infil's Fighting Game Glossary" 
                  desc="Le dictionnaire de référence de la FGC. Les définitions exactes avec exemples vidéo de tous les termes techniques." 
                  url="https://glossary.infil.net/" 
                  icon={BookOpen} 
                />
                <ResourceCard 
                  type="tool"
                  title="FAT (Frame Advantage Tool)" 
                  desc="Une application mobile et web complète pour consulter un tas d'information sur un matchup ou un personnage." 
                  url="https://fullmeter.com/fatonline/#/home" 
                  icon={BrainCircuit} 
                />
              </div>
            </div>

            {/* Créateurs de Contenu */}
            <div>
              <h3 className="font-display text-stone text-xl border-b border-[#1A1815]/10 pb-2 mb-6">Créateurs YouTube Pédagogiques (FGC)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  type="youtube"
                  title="Punk" 
                  desc="Probablement le joueur le plus connu de la communauté SF. Ses vidéos sont souvent intéressantes pour appréhender le jeu à très haut niveau." 
                  url="https://www.youtube.com/@Punkdagod" 
                  icon={PlaySquare} 
                />
                <ResourceCard 
                  type="youtube"
                  title="Brian_F" 
                  desc="Conseils de très haut niveau sur l'optimisation de SF6, le mindgame, analyse de match." 
                  url="https://www.youtube.com/@Brian_F/videos" 
                  icon={PlaySquare} 
                />
                <ResourceCard 
                  type="youtube"
                  title="Core-A Gaming" 
                  desc="Vidéos documentaires exceptionnelles sur la philosophie et les mécaniques profondes des jeux de combat." 
                  url="https://www.youtube.com/@CoreAGaming" 
                  icon={PlaySquare} 
                />
                <ResourceCard 
                  type="youtube"
                  title="Diaphone" 
                  desc="Créateur de guides extrêmement détaillés sur les personnages souvent à format long, les meta, aspect compétitifs des jeux de la FGC & +." 
                  url="https://www.youtube.com/@Diaphone" 
                  icon={PlaySquare} 
                />
                <ResourceCard 
                  type="youtube"
                  title="Chris F" 
                  desc="L'une des meilleures chaines pour apprendre les mécaniques les plus profondes de SF6." 
                  url="https://www.youtube.com/@Chris_F" 
                  icon={PlaySquare} 
                />
               <ResourceCard 
                  type="youtube"
                  title="Mr Crimson" 
                  desc="Joueur pro FR de niveau mondial qui fait souvent des vidéos débutant friendly pour débuter le jeu correctement" 
                  url="https://www.youtube.com/@MisterCrimson" 
                  icon={PlaySquare} 
                />
               <ResourceCard 
                  type="youtube"
                  title="Kayane" 
                  desc="La plus grosse voix féminine de la scène FGC FR et EU voir mondiale. Beaucoup de vidéos accessibles que ce soit sur SF Tekken ou autre." 
                  url="https://www.youtube.com/@Kayanetv252" 
                  icon={PlaySquare} 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
