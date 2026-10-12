import Section from '../components/Section'
import Timeline from '../components/Timeline'
import { experience } from '../data/experience'

export default function Experience({ meta }) {
  const entries = experience.map((job) => ({
    id: job.id,
    date: `${job.start} — ${job.end}`,
    place: `${job.location} · ${job.mode}`,
    title: (
      <>
        {job.role} <span className="tl__at">at</span> {job.org}
      </>
    ),
    subtitle: job.orgDetail,
    link: job.link,
    points: job.points
  }))

  return (
    <Section id={meta.id} number={meta.number} title="Experience">
      <Timeline entries={entries} />
    </Section>
  )
}
