import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, DifficultyIndicator, GrungeDivider } from '../../ui/UIComponents'
import { Brain, Command, Cpu, AlertTriangle } from 'lucide-react'

export default function OptionSelectModule() {
  const [activeTab, setActiveTab] = useState('buffer')

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          tag="Tome IX"
          title="L'Ingénierie du Jeu"
          subtitle="Option Selects et Conditionnement. Comment tricher avec le moteur du jeu et le cerveau adverse."
          color="pink"
        />

        <div className="space-y-16">
          {/* 1. Introduction */}
          <div>
            <h3 className="graffiti-title text-3xl text-chalk mb-4 text-stroke-chalk">1. L'Illusion de la Réaction</h3>
            <p className="text-chalk-dim leading-relaxed mb-6">
              Les joueurs professionnels semblent avoir des réflexes surhumains. En réalité, ils ne réagissent pas : ils trichent légalement en utilisant des mécaniques appelées <strong>Option Selects</strong> et en manipulant l'esprit adverse (le <strong>Conditionnement</strong>).
            </p>
          </div>

          <GrungeDivider />

          {/* 2. Qu'est-ce qu'une Option Select ? */}
          <div>
            <h3 className="graffiti-title text-3xl text-sf-pink mb-4">2. Qu'est-ce qu'une Option Select (OS) ?</h3>
            <DifficultyIndicator level={4} label={true} />
            
            <p className="text-chalk-dim leading-relaxed mt-4 mb-6">
              Une <strong>Option Select (OS)</strong> est une situation où effectuer exactement la même séquence de boutons (des "inputs cachés") conduit à des résultats différents selon l'interaction des personnages. Le jeu "sélectionne une option" automatiquement pour vous selon ce que l'adversaire a fait. Cela réduit drastiquement la charge mentale car vous n'avez plus besoin de réagir parfaitement à tout.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Exemple 1 : Le Buffer */}
              <div className="concrete-card p-6 border-l-sf-green border-sf-green/30">
                <div className="flex items-center gap-2 mb-3">
                  <Command size={20} className="text-sf-green" />
                  <h4 className="font-display text-lg text-chalk">OS #1 : Le Buffer</h4>
                </div>
                <p className="text-sm text-chalk-dim leading-relaxed mb-4">
                  L'OS la plus commune. Vous "cachez" l'input d'un coup spécial (Hadoken) derrière l'animation d'un coup normal (c.MK).
                </p>
                <ul className="text-xs text-stone space-y-2">
                  <li>➔ Si le c.MK <strong>tape dans le vide (Whiff)</strong> : le coup spécial ne sort pas. Vous êtes en sécurité.</li>
                  <li>➔ Si le c.MK <strong>touche (ou est bloqué)</strong> : le jeu valide l'input caché, le spécial sort automatiquement en combo !</li>
                </ul>
              </div>

              {/* Exemple 2 : Le Delay Tech */}
              <div className="concrete-card p-6 border-l-sf-blue border-sf-blue/30">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={20} className="text-sf-blue" />
                  <h4 className="font-display text-lg text-chalk">OS #2 : Le Delay Tech</h4>
                </div>
                <p className="text-sm text-chalk-dim leading-relaxed mb-4">
                  Un OS défensif vital. Au moment de vous lever, vous bloquez brièvement, puis vous appuyez sur "Chope".
                </p>
                <ul className="text-xs text-stone space-y-2">
                  <li>➔ S'il attaque : Vous bloquez son attaque (la chope ne sort pas car vous êtes coincé en <em>Blockstun</em>).</li>
                  <li>➔ S'il chope : Vous "Tech" (déchopez) grâce à votre input de chope retardé.</li>
                </ul>
              </div>
            </div>

            <div className="concrete-card mt-6 p-6 border-l-sf-orange border-sf-orange/30 bg-sf-orange/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={20} className="text-sf-orange" />
                  <h4 className="font-display text-lg text-sf-orange">Attention : Chaque OS a une faille</h4>
                </div>
                <p className="text-sm text-chalk-dim leading-relaxed">
                  Puisque l'Option Select est une séquence automatique de votre côté, elle devient prévisible. Le Delay Tech, par exemple, perd automatiquement contre le <strong>Shimmy</strong> (si l'adversaire recule, votre chope cachée sort dans le vide, et vous êtes puni lourdement).
                </p>
            </div>
          </div>

          <GrungeDivider />

          {/* 3. Le Conditionnement */}
          <div>
            <h3 className="graffiti-title text-3xl text-sf-yellow mb-4">3. Le Conditionnement</h3>
            <DifficultyIndicator level={4} label={true} />
            
            <p className="text-chalk-dim leading-relaxed mt-4 mb-6">
              Les Option Selects piratent le jeu. Le Conditionnement pirate <strong>le cerveau du joueur</strong>. Il s'agit d'entraîner l'adversaire à réagir à une situation spécifique, pour exploiter cette réaction plus tard.
            </p>

            <div className="relative bg-[#110E0C]/5 border border-chalk/10 rounded-xl p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Brain size={120} />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h4 className="font-display text-chalk text-xl mb-4">La Boucle de Pavlov</h4>
                <ol className="space-y-4 text-sm text-chalk-dim">
                  <li className="flex gap-4">
                    <span className="font-display text-sf-yellow">01</span>
                    <p><strong>Établir le Pattern :</strong> Finissez toujours votre string par une chope (Round 1).</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-display text-sf-yellow">02</span>
                    <p><strong>La Réaction :</strong> L'adversaire "apprend" que vous allez choper. Il commence à Delay Tech.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-display text-sf-yellow">03</span>
                    <p><strong>L'Exploitation :</strong> Finissez votre string, mais faites un Shimmy. L'adversaire "Tech" dans le vide. Vous le tuez.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
