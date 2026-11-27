import Section from '../components/Section'
import Icon from '../components/Icon'
import { profile, socials } from '../data/profile'
import './Contact.css'

const bySocial = Object.fromEntries(socials.map((s) => [s.id, s]))

const links = [
  { id: 'mail', label: 'Email', handle: profile.email, url: `mailto:${profile.email}`, external: false },
  { ...bySocial.linkedin, external: true },
  { ...bySocial.instagram, external: true }
]

export default function Contact({ meta }) {
  return (
    <Section id={meta.id} number={meta.number} title="Contact" wide>
      <ul className="contact reveal">
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={l.url}
              className="contact__link"
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact__icon"><Icon name={l.id} size={20} /></span>
              <span className="contact__text">
                <span className="contact__label">{l.label}</span>
                <span className="contact__handle">{l.handle}</span>
              </span>
              <Icon name="arrowUpRight" size={16} className="contact__arrow" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
