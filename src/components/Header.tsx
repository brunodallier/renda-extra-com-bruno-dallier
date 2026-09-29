import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} onClick={closeMenu} className={location.hash === item.href.slice(1) ? 'is-active' : ''}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-cta" to="/#plataformas" onClick={closeMenu}>Ver oportunidades</Link>
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
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
