import { useState } from 'react'
import Section from '../components/Section'
import Timeline from '../components/Timeline'
import Icon from '../components/Icon'
import useReveal from '../hooks/useReveal'
import { projects } from '../data/projects'

// How many projects show before "Show all"
const INITIAL = 3

export const toEntry = (p) => ({
  id: p.id,
  date: p.date,
  title: p.title,
  subtitle: p.context,
  link: p.github ? { label: 'Code', url: p.github } : null,
  points: p.points
})

export default function Projects({ meta }) {
  const [expanded, setExpanded] = useState(false)
  useReveal(expanded)

  const shown = expanded ? projects : projects.slice(0, INITIAL)
  const hidden = projects.length - INITIAL

  const toggle = () => {
    if (expanded) document.getElementById(meta.id)?.scrollIntoView({ behavior: 'smooth' })
    setExpanded((e) => !e)
  }

  return (
    <Section id={meta.id} number={meta.number} title="Projects">
      <Timeline entries={shown.map(toEntry)} />
      {hidden > 0 ? (
        <div className="tl-more">
          <button type="button" className="btn" onClick={toggle} aria-expanded={expanded}>
            {expanded ? 'Show Fewer Projects' : 'View All Projects'}
            <Icon name="arrowDown" className={expanded ? 'tl-more__icon is-up' : 'tl-more__icon'} />
          </button>
        </div>
      ) : null}
    </Section>
  )
}
