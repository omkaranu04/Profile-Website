import { useMemo, useState } from 'react'
import Section from '../components/Section'
import RichText from '../components/RichText'
import Icon from '../components/Icon'
import { projects, projectCategories } from '../data/projects'
import useReveal from '../hooks/useReveal'
import './Projects.css'

const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.key, c.label]))

function ProjectCard({ p, index }) {
  return (
    <article
      className={`card reveal ${p.featured ? 'card--featured' : ''}`}
      style={{ '--delay': `${Math.min(index, 6) * 50}ms` }}
    >
      <div className="card__top mono">
        <span className="card__cat">{categoryLabel[p.category]}</span>
        <span className="card__date">{p.date}</span>
      </div>

      <div className="card__body">
        <div>
          <h3 className="card__title">
            {p.title}
            {p.badge ? <span className="card__badge mono">{p.badge}</span> : null}
          </h3>
          <p className="card__context">{p.context}</p>

          {p.metrics ? (
            <dl className="card__metrics">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <ul className="card__points">
          {p.points.map((pt, i) => <li key={i}><RichText text={pt} /></li>)}
        </ul>
      </div>

      <div className="card__foot">
        <div className="tags">
          {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        {p.github ? (
          <a className="card__link" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`}>
            <Icon name="github" size={15} />
            <span>Code</span>
            <Icon name="arrowUpRight" size={13} />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default function Projects({ meta }) {
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    projects.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1 })
    return c
  }, [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  useReveal(filter)

  return (
    <Section
      id={meta.id}
      number={meta.number}
      title="Selected work"
      kicker="Thesis research, systems built from scratch, coursework I’m proud of and hackathon builds. Filter by area — every card links to its code where it’s public."
      wide
    >
      <div className="filters" role="toolbar" aria-label="Filter projects">
        {projectCategories.filter((c) => counts[c.key]).map((c) => (
          <button
            key={c.key}
            type="button"
            className={`filter ${filter === c.key ? 'is-active' : ''}`}
            aria-pressed={filter === c.key}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
            <span className="filter__count mono">{counts[c.key]}</span>
          </button>
        ))}
      </div>

      <div className="cards" aria-live="polite">
        {visible.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      </div>
    </Section>
  )
}
