import Section from '../components/Section'
import Icon from '../components/Icon'
import RatingChart from '../components/RatingChart'
import { rankTitle } from '../lib/ranks'
import { cpRepo, honours } from '../data/achievements'
import './CompetitiveProgramming.css'

function PlatformCard({ p, loading }) {
  const peakTitle = rankTitle(p.id, p.maxRating)
  const showChart = p.history && p.history.length > 1

  return (
    <article className="cp-card reveal">
      <header className="cp-card__head">
        <div>
          <h3 className="cp-card__name">{p.name}</h3>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="cp-card__handle mono">
            @{p.handle} <Icon name="arrowUpRight" size={12} />
          </a>
        </div>
        {peakTitle ? <span className="cp-card__rank">{peakTitle}</span> : null}
      </header>

      <dl className="cp-card__stats">
        <div>
          <dt>Peak</dt>
          <dd>{p.maxRating ?? '—'}</dd>
        </div>
        <div>
          <dt>Current</dt>
          <dd className={loading ? 'is-loading' : ''}>{loading ? '····' : p.rating ?? '—'}</dd>
        </div>
      </dl>

      <div className="cp-card__chart">
        {showChart ? (
          <RatingChart history={p.history} label={p.name} />
        ) : (
          <div className={`cp-card__nochart mono ${loading ? 'is-loading' : ''}`}>
            {loading ? 'Fetching rating history…' : 'Rating history unavailable'}
          </div>
        )}
      </div>
    </article>
  )
}

export default function CompetitiveProgramming({ meta, cp }) {
  const { status, platforms } = cp
  const loading = status === 'loading'

  return (
    <Section
      id={meta.id}
      number={meta.number}
      title="Competitive programming"
      kicker="Contests keep my fundamentals honest. Ratings below are pulled live from each platform."
      wide
    >
      <div className="cp-status mono" role="status">
        <span className={`cp-status__dot is-${status}`} aria-hidden />
        {status === 'live' && 'Live from Codeforces, CodeChef & AtCoder'}
        {status === 'loading' && 'Fetching live ratings…'}
        {status === 'offline' && 'Live ratings unavailable — showing peak ratings'}
        <a href={cpRepo.url} target="_blank" rel="noopener noreferrer" className="cp-status__repo">
          <Icon name="github" size={14} /> {cpRepo.label} <Icon name="arrowUpRight" size={12} />
        </a>
      </div>

      <div className="cp-grid">
        {platforms.map((p) => <PlatformCard key={p.id} p={p} loading={loading} />)}
      </div>

      <div className="honours reveal">
        <h3 className="honours__title mono">Entrance examinations</h3>
        <ul className="honours__list">
          {honours.map((h) => (
            <li key={h.label} className="honour">
              <span className="honour__value">{h.value}</span>
              <span className="honour__label">{h.label}</span>
              <span className="honour__note">{h.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
