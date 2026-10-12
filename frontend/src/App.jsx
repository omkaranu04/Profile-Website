import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import CompetitiveProgramming from './sections/CompetitiveProgramming'
import Writing from './sections/Writing'
import Contact from './sections/Contact'
import useTheme from './hooks/useTheme'
import useReveal from './hooks/useReveal'
import useCpStats from './hooks/useCpStats'
import { sections } from './data/sections'

const meta = Object.fromEntries(sections.map((s) => [s.id, s]))

// Old multi-page URLs (/cp, /projects, ...) land on the matching section.
function useLegacyPathRedirect() {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '').toLowerCase()
    if (!path) return
    const target = sections.find((s) => s.aliases?.includes(path))
    window.history.replaceState(null, '', `/${target ? `#${target.id}` : ''}${window.location.search}`)
    if (target) {
      requestAnimationFrame(() => document.getElementById(target.id)?.scrollIntoView())
    }
  }, [])
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const cp = useCpStats()

  useReveal('app')
  useLegacyPathRedirect()

  const toastTimer = useRef(0)
  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      } else if (e.key === '/' && !typing && !paletteOpen) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen])

  const openPalette = useCallback(() => setPaletteOpen(true), [])

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <main>
        <Hero />
        <About meta={meta.about} />
        <Experience meta={meta.experience} />
        <Projects meta={meta.projects} />
        <CompetitiveProgramming meta={meta.cp} cp={cp} />
        <Writing meta={meta.writing} />
        <Contact meta={meta.contact} onToast={showToast} />
      </main>
      <Footer onOpenPalette={openPalette} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggle}
        onToast={showToast}
      />
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </>
  )
}
