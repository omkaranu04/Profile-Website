import { useState } from 'react'
import Icon from '../components/Icon'
import { profile, socials } from '../data/profile'
import avatar from '../assets/avatar.jpg'
import './Contact.css'

export default function Contact({ meta, onToast }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true)
      onToast('Email copied to clipboard')
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <section id={meta.id} className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__label mono reveal">
          <span>{meta.number}</span> <span className="contact__rule" aria-hidden /> Contact
        </div>
        <h2 id="contact-heading" className="contact__title reveal">
          Let’s build something <em>worth shipping.</em>
        </h2>
        <p className="contact__lede reveal">
          I’m open to conversations about quant, software and ML roles, research collaborations, or just a good problem.
          The fastest way to reach me is email.
        </p>

        <div className="contact__mail reveal">
          <img src={avatar} alt="" width="56" height="56" className="contact__avatar" loading="lazy" />
          <a href={`mailto:${profile.email}`} className="contact__email">{profile.email}</a>
          <button type="button" className="icon-btn" onClick={copy} aria-label="Copy email address">
            <Icon name={copied ? 'check' : 'copy'} size={16} />
          </button>
        </div>

        <ul className="contact__links reveal">
          {socials.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="contact__link">
                <Icon name={s.id} size={18} />
                <span className="contact__link-label">{s.label}</span>
                <span className="contact__link-handle mono">{s.handle}</span>
                <Icon name="arrowUpRight" size={15} className="contact__link-arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
