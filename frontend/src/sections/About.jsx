import Section from '../components/Section'
import RichText from '../components/RichText'
import { profile } from '../data/profile'
import portraitJpg from '../assets/portrait.jpg'
import portraitWebp from '../assets/portrait.webp'
import './About.css'

export default function About({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="About">
      <div className="about">
        <figure className="about__photo reveal">
          <picture>
            <source srcSet={portraitWebp} type="image/webp" />
            <img src={portraitJpg} alt={`${profile.name}, sitting on a rock in a mountain stream`} width="720" height="900" loading="lazy" decoding="async" />
          </picture>
          <figcaption className="mono">Somewhere in the hills · off the clock</figcaption>
        </figure>

        <div className="about__text">
          {profile.about.map((p, i) => (
            <p key={i} className="reveal" style={{ '--delay': `${i * 60}ms` }}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
