import Section from '../components/Section'
import Timeline from '../components/Timeline'
import { projects } from '../data/projects'

export const toEntry = (p) => ({
  id: p.id,
  date: p.date,
  title: p.title,
  subtitle: p.context,
  link: p.github ? { label: 'Code', url: p.github } : null,
  points: p.points
})

export default function Projects({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="Projects">
      <Timeline entries={projects.map(toEntry)} />
    </Section>
  )
}
