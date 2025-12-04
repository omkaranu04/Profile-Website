import React, { useEffect, useState, useRef } from 'react'

const ROLES = [
  'Coder',
  'ML/DL Enthusiast',
  'Poet',
  'Writer',
  'Learner For Life',
  'Exploring...'
]

export default function Home() {
  const [text, setText] = useState('Omkar Bhandare') // current headline text
  const [rolledOut, setRolledOut] = useState(false) // controls roll state
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  useEffect(() => {
    const initialDelay = 1500
    const roleDisplayMs = 1000
    const rollMs = 220 // should match CSS --roll-duration

    let timers = []

    const scheduleRollChange = (newText, when) => {
      const tOut = setTimeout(() => {
        if (!mounted.current) return
        setRolledOut(true)
      }, when)

      const tSwap = setTimeout(() => {
        if (!mounted.current) return
        setText(newText)
      }, when + rollMs)

      const tIn = setTimeout(() => {
        if (!mounted.current) return
        setRolledOut(false)
      }, when + rollMs + 20)

      timers.push(tOut, tSwap, tIn)
    }

    let offset = initialDelay
    ROLES.forEach((role) => {
      scheduleRollChange(role, offset)
      offset += roleDisplayMs
    })

    scheduleRollChange('Omkar Bhandare', offset)

    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  return (
    <main className="app-root">
      <section className="hero">
        <h1 className="headline">
          Hey! I am{' '}
          <span
            className={`name-animated ${rolledOut ? 'rolled' : 'inplace'}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-inner">{text}</span>
          </span>
        </h1>
      </section>
    </main>
  )
}
