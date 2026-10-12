import Section from '../components/Section'
import RichText from '../components/RichText'
import { profile, education, skills, coursework } from '../data/profile'
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

      <div className="about__blocks">
        <div className="block reveal">
          <h3 className="block__title mono">Education</h3>
          <ol className="edu">
            {education.map((e) => (
              <li key={e.school} className="edu__item">
                <div className="edu__top">
                  <span className="edu__school">{e.school}</span>
                  <span className="edu__period mono">{e.period}</span>
                </div>
                <div className="edu__bottom">
                  <span>{e.degree}</span>
                  <span className="edu__score">{e.score}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="block reveal">
          <h3 className="block__title mono">Toolkit</h3>
          <dl className="skills">
            {skills.map((g) => (
              <div key={g.group} className="skills__row">
                <dt>{g.group}</dt>
                <dd>
                  {g.items.map((s) => <span key={s} className="skill skill--primary">{s}</span>)}
                  {g.secondary.map((s) => <span key={s} className="skill">{s}</span>)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <details className="block block--details reveal">
          <summary>
            <h3 className="block__title mono">Relevant coursework</h3>
            <span className="block__count mono">{coursework.length} courses</span>
          </summary>
          <ul className="course-list">
            {coursework.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </details>
      </div>
    </Section>
  )
}
