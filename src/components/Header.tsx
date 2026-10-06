import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motionTokens } from '../lib/motion'
import { Brand } from './Brand'

const navigation = [
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Plataformas', href: '/#plataformas' },
  { label: 'Tarefas', href: '/#tarefas' },
  { label: 'Dúvidas', href: '/#duvidas' },
  { label: 'Tutoriais', href: '/#tutoriais' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isCompactNav, setIsCompactNav] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let previousY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 8)
      setIsHidden(currentY > 120 && currentY > previousY)
      previousY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1100px)')
    const sync = () => setIsCompactNav(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <motion.header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} animate={{ y: isHidden ? '-105%' : 0 }} transition={{ duration: motionTokens.duration.component, ease: motionTokens.easing.standard }}>
      <div className="container header-inner">
        <Brand />
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item, index) => {
            const isActive = location.hash === item.href.slice(1)
            return (
              <motion.div key={item.href} className="main-nav__item" initial={false} animate={isCompactNav ? (open ? 'open' : 'closed') : 'desktop'} variants={{ closed: { opacity: 0, y: -8 }, open: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.component, delay: index * 0.05, ease: motionTokens.easing.enter } }, desktop: { opacity: 1, y: 0 } }}>
                <Link to={item.href} onClick={closeMenu} className={isActive ? 'is-active' : ''}>
                  {item.label}
                  {isActive ? <motion.span className="nav-active-indicator" layoutId="nav-active" transition={motionTokens.spring} /> : null}
                </Link>
              </motion.div>
            )
          })}
          <motion.div className="main-nav__item" initial={false} animate={isCompactNav ? (open ? 'open' : 'closed') : 'desktop'} variants={{ closed: { opacity: 0, y: -8 }, open: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.component, delay: navigation.length * 0.05, ease: motionTokens.easing.enter } }, desktop: { opacity: 1, y: 0 } }}>
            <Link className="nav-cta" to="/#plataformas" onClick={closeMenu}>Ver oportunidades</Link>
          </motion.div>
        </nav>
        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          data-tooltip={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? 'close' : 'menu'} initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: motionTokens.duration.micro }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.header>
  )
}
