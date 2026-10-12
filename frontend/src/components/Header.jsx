import { useEffect, useState } from 'react'
import Icon from './Icon'
import { sections } from '../data/sections'
import { profile } from '../data/profile'
import useScrollSpy from '../hooks/useScrollSpy'
import './Header.css'

const ids = sections.map((s) => s.id)
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function Header({ theme, onToggleTheme, onOpenPalette }) {
  const active = useScrollSpy(ids)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label={`${profile.name} — back to top`}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav className="nav" aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`nav__link ${active === s.id ? 'is-active' : ''}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav__num mono">{s.number}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button type="button" className="kbar-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <Icon name="search" size={15} />
            <span className="kbar-btn__text">Search</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title="Toggle theme"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
