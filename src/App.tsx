import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { motionTokens } from './lib/motion'
import { Home } from './pages/Home'
import { PlatformDetail } from './pages/PlatformDetail'

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])
  return null
}

function RoutedContent() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.enter }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/plataformas/:slug" element={<PlatformDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Header />
      <RoutedContent />
      <Footer />
    </MotionConfig>
  )
}
