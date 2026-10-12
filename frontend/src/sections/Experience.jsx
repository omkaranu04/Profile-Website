import Section from '../components/Section'
import RichText from '../components/RichText'
import Icon from '../components/Icon'
import { experience } from '../data/experience'
import './Experience.css'

export default function Experience({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="Experience" kicker="Industry and research internships — shipping ML where it meets real data.">
      <ol className="xp">
        {experience.map((job, i) => (
          <li key={job.id} className="xp__item reveal" style={{ '--delay': `${i * 80}ms` }}>
            <div className="xp__meta">
              <span className="xp__dates mono">{job.start} — {job.end}</span>
              <span className="xp__place">{job.location} · {job.mode}</span>
              {job.highlight ? (
                <div className="xp__highlight">
                  <span className="xp__hl-value">{job.highlight.value}</span>
                  <span className="xp__hl-label">{job.highlight.label}</span>
                </div>
              ) : null}
            </div>

            <article className="xp__card">
              <header className="xp__head">
                <h3 className="xp__role">
                  {job.role} <span className="xp__at">at</span> <span className="xp__org">{job.org}</span>
                </h3>
                {job.link ? (
                  <a href={job.link.url} target="_blank" rel="noopener noreferrer" className="xp__link mono">
                    {job.link.label} <Icon name="arrowUpRight" size={13} />
                  </a>
                ) : null}
              </header>
              <p className="xp__org-detail">{job.orgDetail}</p>
              <ul className="xp__points">
                {job.points.map((p, j) => <li key={j}><RichText text={p} /></li>)}
              </ul>
              <div className="tags">
                {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
