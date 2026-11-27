import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Competitions from './sections/Competitions'
import CompetitiveProgramming from './sections/CompetitiveProgramming'
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
  const cp = useCpStats()

  useReveal('app')
  useLegacyPathRedirect()

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About meta={meta.about} />
        <Education meta={meta.education} />
        <Experience meta={meta.experience} />
        <Projects meta={meta.projects} />
        <Competitions meta={meta.competitions} />
        <CompetitiveProgramming meta={meta.cp} cp={cp} />
        <Contact meta={meta.contact} />
      </main>
    </>
  )
}
