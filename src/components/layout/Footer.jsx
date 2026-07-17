import { NavLink } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-secondary mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-sf-pink rounded-lg flex items-center justify-center">
              <BookOpen size={14} className="text-bg-primary" fill="currentColor" />
            </div>
            <span className="font-display text-xl text-chalk tracking-widest">
              FGC<span className="text-sf-pink">DOC</span>
            </span>
          </div>

          <p className="text-stone text-sm font-body text-center">
            Damn Cold Tuff Aura.{' '}
            <span className="text-chalk-dim">Non affilié à Capcom ou Street Fighter.</span>
          </p>

          <div className="flex gap-4">
            <NavLink to="/" className="text-stone hover:text-sf-yellow transition-colors text-sm">
              Accueil
            </NavLink>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-stone text-xs">
            svp passez diamant au moins g pas fait ça pour rien
          </p>
        </div>
      </div>
    </footer>
  )
}
