import Section from '../components/Section'
import Timeline from '../components/Timeline'
import { competitions } from '../data/competitions'
import { toEntry } from './Projects'

export default function Competitions({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="Competitions">
      <Timeline entries={competitions.map(toEntry)} />
    </Section>
  )
}
