import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { SectionHeader, PaintSplash, ConcreteCard } from '../../ui/UIComponents'
import { Users, Link as LinkIcon, Copy, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import glossaryData from '../../../data/glossary.json'

export default function SharedModule() {
  const [searchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [syllabusData, setSyllabusData] = useState(null)
  const [selectedTerms, setSelectedTerms] = useState([])
  const [title, setTitle] = useState('')

  // Check if we are viewing a shared link
  useEffect(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(dataParam))
        setSyllabusData(decoded)
      } catch (e) {
        console.error("Invalid shared link", e)
      }
    }
  }, [searchParams])

  const toggleTerm = (termId) => {
    setSelectedTerms(prev => 
      prev.includes(termId) ? prev.filter(id => id !== termId) : [...prev, termId]
    )
  }

  const generateLink = () => {
    if (selectedTerms.length === 0) return ''
    const payload = {
      t: title || "Syllabus FGC",
      i: selectedTerms // list of term IDs
    }
    const encoded = btoa(JSON.stringify(payload))
    return `${window.location.origin}/shared?data=${encoded}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLink())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // --- VIEW MODE (Reading a shared link) ---
  if (syllabusData) {
    const items = syllabusData.i.map(id => glossaryData.terms.find(t => t.id === id)).filter(Boolean)
    
    return (
      <section className="relative py-20 px-6 overflow-hidden min-h-screen">
        <PaintSplash color="pink" size={500} top="10%" left="5%" opacity={0.05} />
        
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            tag="Syllabus Partagé"
            title={syllabusData.t}
            subtitle="Un ami t'a envoyé cette liste de lecture pour t'entraîner."
            color="pink"
          />

          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to="/index">
                  <ConcreteCard className={`p-6 border-l-4 border-l-${item.accentColor} hover:bg-white/5 transition-colors group`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`font-display text-2xl text-${item.accentColor} mb-2`}>{item.term}</h3>
                        <p className="text-chalk-dim text-sm">{item.shortDef}</p>
                      </div>
                      <ArrowRight className="text-stone group-hover:text-white transition-colors" />
                    </div>
                  </ConcreteCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shared" className="btn-outline px-6 py-3 font-display tracking-widest text-xs rounded-xl inline-flex">
              + Créer mon propre Syllabus
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // --- CREATION MODE ---
  const sharedLink = generateLink()

  return (
    <section className="relative py-20 px-6 overflow-hidden min-h-screen">
      <PaintSplash color="pink" size={600} top="15%" left="5%" opacity={0.05} />
      <PaintSplash color="blue" size={400} top="60%" right="-5%" opacity={0.04} />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="Outil Social"
          title="Créateur de Syllabus"
          subtitle="Génère un lien contenant une liste de concepts spécifiques à étudier ."
          color="pink"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ConcreteCard className="p-6">
              <h3 className="font-display text-chalk text-xl mb-4">1. Nomme ton Syllabus</h3>
              <input 
                type="text" 
                placeholder="Ex: Programme défense"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-chalk placeholder:text-stone font-body focus:outline-none focus:border-sf-pink/50 transition-colors"
              />
            </ConcreteCard>

            <ConcreteCard className="p-6">
              <h3 className="font-display text-chalk text-xl mb-4">2. Sélectionne les concepts</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {glossaryData.terms.map(term => {
                  const isSelected = selectedTerms.includes(term.id)
                  return (
                    <button
                      key={term.id}
                      onClick={() => toggleTerm(term.id)}
                      className={`text-left px-4 py-3 rounded-xl border transition-all ${
                        isSelected 
                          ? `bg-${term.accentColor}/10 border-${term.accentColor}/50 shadow-[0_0_15px_rgba(255,255,255,0.05)]` 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-display text-sm tracking-wide ${isSelected ? `text-${term.accentColor}` : 'text-chalk-dim'}`}>
                          {term.term}
                        </span>
                        {isSelected && <CheckCircle2 size={14} className={`text-${term.accentColor}`} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </ConcreteCard>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ConcreteCard className="p-6 border-sf-pink/30">
                <div className="flex items-center gap-3 mb-6">
                  <LinkIcon className="text-sf-pink" size={24} />
                  <h3 className="font-display text-chalk text-2xl">Ton Lien</h3>
                </div>
                
                <p className="text-stone text-xs uppercase tracking-widest font-display mb-2">Sélection</p>
                <p className="text-chalk-dim font-medium mb-6">
                  {selectedTerms.length} concept{selectedTerms.length > 1 ? 's' : ''} ajouté{selectedTerms.length > 1 ? 's' : ''}
                </p>

                {selectedTerms.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 overflow-x-auto">
                      <code className="text-xs text-stone whitespace-nowrap">{sharedLink}</code>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className={`w-full py-3 rounded-xl font-display tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
                        copied ? 'bg-sf-green text-black' : 'bg-sf-pink text-white hover:bg-sf-pink/80'
                      }`}
                    >
                      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copied ? 'LIEN COPIÉ !' : 'COPIER LE LIEN'}
                    </button>
                    <p className="text-xs text-stone text-center mt-4">
                      Les données sont encodées dans l'URL. Pas besoin de compte !
                    </p>
                  </div>
                ) : (
                  <p className="text-stone text-sm text-center py-6 border border-dashed border-white/10 rounded-xl">
                    Sélectionne au moins un concept pour générer le lien.
                  </p>
                )}
              </ConcreteCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
