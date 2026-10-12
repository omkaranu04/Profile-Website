import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import RichText from '../components/RichText'
import { profile, socials } from '../data/profile'
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
  const primary = socials.filter((s) => s.id === 'github' || s.id === 'linkedin')

  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero__main">
          <p className="hero__eyebrow mono reveal">
            <span className="hero__dot" aria-hidden />
            {profile.headline}
          </p>

          <h1 className="hero__title reveal" style={{ '--delay': '60ms' }}>
            {profile.name.split(' ')[0]}
            <br />
            <span className="hero__title-last">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="hero__role reveal" style={{ '--delay': '120ms' }}>
            <span className="sr-only">I’m {profile.roles.join(', ')}.</span>
            <span aria-hidden>I’m </span>
            <RotatingRole words={profile.roles} />
          </p>

          <p className="hero__intro reveal" style={{ '--delay': '180ms' }}>
            <RichText text={profile.intro} />
          </p>

          <div className="hero__cta reveal" style={{ '--delay': '240ms' }}>
            <a href="#projects" className="btn btn--primary">
              See my work <Icon name="arrowDown" />
            </a>
            {profile.resume ? (
              <a href={profile.resume} className="btn" target="_blank" rel="noopener noreferrer">
                Résumé <Icon name="file" />
              </a>
            ) : (
              <a href="#contact" className="btn">
                Get in touch <Icon name="arrowRight" />
              </a>
            )}
            <div className="hero__socials">
              {primary.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={s.label}>
                  <Icon name={s.id} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
