import Section from '../components/Section'
import Timeline from '../components/Timeline'
import { education } from '../data/education'

export default function Education({ meta }) {
  const entries = education.map((e) => ({
    id: e.id,
    date: e.date,
    place: e.location,
    title: e.school,
    subtitle: e.degree
  }))

  return (
    <Section id={meta.id} number={meta.number} title="Education">
      <Timeline entries={entries} />
    </Section>
  )
}
