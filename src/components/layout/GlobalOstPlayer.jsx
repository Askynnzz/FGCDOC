import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const OST_TRACKS = [
  { id: 'ryu', name: 'Menu - Naruto Storm 2', url: '/audio/nsuns2_menu.mp3' },
  // { id: 'chunli', name: 'Chun-Li Theme', url: '/audio/chunli_ost.mp3' },
  // { id: 'mai', name: 'Mai Theme', url: '/audio/mai_ost.mp3' },
  // { id: 'ingrid', name: 'Ingrid Theme', url: '/audio/ingrid_ost.mp3' }
]

export default function GlobalOstPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef(null)

  const currentTrack = OST_TRACKS[trackIdx]

  // Try to autoplay on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && !isPlaying) {
        setHasInteracted(true)
        audioRef.current.volume = 0.05 // Faible volume (5%)
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          showTrackToast()
        }).catch(e => console.log('Autoplay prevented:', e))
      }
      document.removeEventListener('click', handleFirstInteraction)
    }
    document.addEventListener('click', handleFirstInteraction)
    return () => document.removeEventListener('click', handleFirstInteraction)
  }, [hasInteracted, isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.volume = 0.05
        audioRef.current.play().catch(e => console.log('Play failed:', e))
        showTrackToast()
      }
      setIsPlaying(!isPlaying)
      setHasInteracted(true)
    }
  }

  const nextTrack = () => {
    const nextIdx = (trackIdx + 1) % OST_TRACKS.length
    setTrackIdx(nextIdx)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = OST_TRACKS[nextIdx].url
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Play failed:', e))
      }
    }
    showTrackToast()
  }

  const showTrackToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-[#1A1815]/90 border border-white/10 rounded-full p-1 sm:p-1.5 shadow-lg backdrop-blur-md">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={nextTrack}
      />
      
      <button 
        onClick={togglePlay}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        title="Lecture / Pause OST"
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sf-pink" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone" />}
      </button>

      <button 
        onClick={nextTrack}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        title="Changer de musique"
      >
        <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-chalk-dim" />
      </button>

      {/* Mini notification de la track */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: -10, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: -10, width: 0 }}
            className="overflow-hidden whitespace-nowrap flex items-center pr-3"
          >
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <Music size={12} className="text-sf-yellow" />
              <span className="font-display text-[10px] uppercase tracking-wider text-chalk-dim">
                {OST_TRACKS[trackIdx].name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
