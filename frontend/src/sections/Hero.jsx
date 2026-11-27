import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import './Hero.css'

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function RotatingRole({ words }) {
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    if (reduceMotion()) return
    let t1
    const t = setInterval(() => {
      setPhase('out')
      t1 = setTimeout(() => {
        setI((n) => (n + 1) % words.length)
        setPhase('in')
      }, 280)
    }, 2400)
    return () => {
      clearInterval(t)
      clearTimeout(t1)
    }
  }, [words.length])

  return (
    <span className="role" aria-hidden>
      <span className={`role__word role__word--${phase}`}>{words[i]}</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title reveal">
          {profile.name.split(' ')[0]}{' '}
          <span className="hero__title-last">{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>

        <p className="hero__role reveal" style={{ '--delay': '120ms' }}>
          <span className="sr-only">I’m {profile.roles.join(', ')}.</span>
          <span aria-hidden>I’m </span>
          <RotatingRole words={profile.roles} />
        </p>
      </div>
    </section>
  )
}
