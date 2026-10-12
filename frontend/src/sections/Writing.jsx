import Section from '../components/Section'
import Icon from '../components/Icon'
import { profile } from '../data/profile'
import './Writing.css'

export default function Writing({ meta }) {
  const w = profile.writing
  return (
    <Section id={meta.id} number={meta.number} title="Off the clock" kicker="Poetry & prose.">
      <div className="writing reveal">
        <Icon name="feather" size={28} className="writing__icon" />
        <p className="writing__lede">Some problems want an algorithm. Others want a stanza.</p>
        <p className="writing__blurb">{w.blurb}</p>
        <a href={w.url} target="_blank" rel="noopener noreferrer" className="btn">
          <Icon name="instagram" /> Read on {w.handle} <Icon name="arrowUpRight" />
        </a>
      </div>
    </Section>
  )
}
