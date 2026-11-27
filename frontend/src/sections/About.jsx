import Section from '../components/Section'
import RichText from '../components/RichText'
import { profile } from '../data/profile'
import portraitJpg from '../assets/portrait.jpg'
import portraitWebp from '../assets/portrait.webp'
import './About.css'

export default function About({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="About" wide>
      <div className="about">
        <figure className="about__photo reveal">
          <picture>
            <source srcSet={portraitWebp} type="image/webp" />
            <img src={portraitJpg} alt={`${profile.name} in a suit, taking a mirror photo with a camera`} width="720" height="900" loading="lazy" decoding="async" />
          </picture>
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
