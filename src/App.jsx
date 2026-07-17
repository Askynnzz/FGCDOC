import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import FrameDataPage from './pages/FrameDataPage'
import NeutralPage from './pages/NeutralPage'
import FlowchartPage from './pages/FlowchartPage'
import LabPage from './pages/LabPage'
import GlossaryPage from './pages/GlossaryPage'
import SharedPage from './pages/SharedPage'
import ComboPage from './pages/ComboPage'
import CharacterPage from './pages/CharacterPage'
import OkizemePage from './pages/OkizemePage'
import OptionSelectPage from './pages/OptionSelectPage'
import LearningPage from './pages/LearningPage'
import BasicsPage from './pages/BasicsPage'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const PageTransition = ({ children }) => (
  <div style={{ perspective: 3000 }}>
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.95, transformOrigin: 'right center', filter: 'brightness(0.2)' }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.95, transformOrigin: 'left center', filter: 'brightness(0.2)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  </div>
)

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/frame-data" element={<PageTransition><FrameDataPage /></PageTransition>} />
        <Route path="/neutral" element={<PageTransition><NeutralPage /></PageTransition>} />
        <Route path="/psychology" element={<PageTransition><FlowchartPage /></PageTransition>} />
        <Route path="/lab" element={<PageTransition><LabPage /></PageTransition>} />
        <Route path="/combos" element={<PageTransition><ComboPage /></PageTransition>} />
        <Route path="/characters" element={<PageTransition><CharacterPage /></PageTransition>} />
        <Route path="/index" element={<PageTransition><GlossaryPage /></PageTransition>} />
        <Route path="/okizeme" element={<PageTransition><OkizemePage /></PageTransition>} />
        <Route path="/option-select" element={<PageTransition><OptionSelectPage /></PageTransition>} />
        <Route path="/learning" element={<PageTransition><LearningPage /></PageTransition>} />
        <Route path="/basics" element={<PageTransition><BasicsPage /></PageTransition>} />
        <Route path="/shared" element={<PageTransition><SharedPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg-primary py-0 md:py-8 overflow-hidden">
        <div className="book-container flex flex-col">
          <Header />
          <main className="flex-1 pt-24">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
