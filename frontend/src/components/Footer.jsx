import { profile } from '../data/profile'
import './Footer.css'

const updated = new Date(__BUILD_DATE__).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

export default function Footer({ onOpenPalette }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="footer__mid">
          Press <button type="button" className="footer__kbd" onClick={onOpenPalette}><kbd>/</kbd></button> to jump anywhere
        </span>
        <span>
          Updated {updated} ·{' '}
          <a className="link" href="https://github.com/omkaranu04/Profile-Website" target="_blank" rel="noopener noreferrer">Source</a>
        </span>
      </div>
    </footer>
  )
}
