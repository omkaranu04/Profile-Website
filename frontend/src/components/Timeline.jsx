import RichText from './RichText'
import Icon from './Icon'
import './Timeline.css'

// Shared timeline used by Experience, Projects and Competitions:
// dates (and optional place) on the left, a card with title, subtitle,
// optional link and bullet points on the right.
//
// entry: { id, date, place?, title, subtitle?, link?: { label, url }, points }
export default function Timeline({ entries }) {
  return (
    <ol className="tl">
      {entries.map((e, i) => (
        <li key={e.id} className="tl__item reveal" style={{ '--delay': `${Math.min(i, 4) * 60}ms` }}>
          <div className="tl__meta">
            <span className="tl__date mono">{e.date}</span>
            {e.place ? <span className="tl__place">{e.place}</span> : null}
          </div>

          <article className="tl__card">
            <header className="tl__head">
              <h3 className="tl__title">{e.title}</h3>
              {e.link ? (
                <a href={e.link.url} target="_blank" rel="noopener noreferrer" className="tl__link mono">
                  {e.link.label} <Icon name="arrowUpRight" size={13} />
                </a>
              ) : null}
            </header>
            {e.subtitle ? <p className="tl__subtitle">{e.subtitle}</p> : null}
            <ul className="tl__points">
              {e.points.map((p, j) => <li key={j}><RichText text={p} /></li>)}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  )
}
