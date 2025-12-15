import React from 'react'

const hackathons = [
  {
    id: 'hack-1',
    title: 'AI-powered HR Decision Making - INNOV8-2.0 Finals',
    timeframe: "Sep \'24",
    github: 'https://github.com/omkaranu04/8foldAI-hackathon',
    description: `
    • Built 'Satya', LLaMA-based model for vagueness scoring, reciprocal endorsement, and trust metrics to flag resume frauds\n
    • Leveraged graph analytics with centrality and clustering metrics to assess influence, networking, and career progression\n
    • Developed a MERN-FastAPI dashboard integrating real-time risk scoring, skill relevance, and fraud alerts for HR decisions\n
    `
  },
  {
    id: 'hack-2',
    title: 'T20 Match Winner Prediction - The American Express Campus Challenge',
    timeframe: "May '24 - Jun '24",
    github: 'https://github.com/omkaranu04/AmEx-Hackathon-2024',
    description: `
    • Achieved 57.93% accuracy on the test dataset in Round-I of the competition, distinguishing our submission among 473 unique entries\n
    • Engineered 192+ domain-specific features and developed a CatBoost-based predictive model to forecast T20 match outcomes\n
    • Performed hyperparameter tuning Optuna and GridSearchCV, reaching 82% test accuracy and 81.2% cross-validation score\n
    `
  }
]

function renderDescription(text) {
  const lines = text.split('\n').map((l) => l.replace(/\r/g, ''))
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      out.push(<div key={`p-${i}`} style={{ height: 8 }} />)
      i++
      continue
    }

    const paraLines = []
    while (i < lines.length && lines[i].trim()) {
      paraLines.push(lines[i].trim())
      i++
    }

    out.push(
      <p key={`para-${i}`} className="desc-paragraph">
        {paraLines.join(' ')}
      </p>
    )
  }

  return out
}

export default function Hackathons() {
  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Hackathons</h1>
        </header>

        <div className="timeline" role="list">
          {hackathons.map((p, idx) => {
            const side = idx % 2 === 0 ? 'left' : 'right'
            return (
              <article
                key={p.id}
                className={`timeline-item ${side}`}
                tabIndex={0}
                role="listitem"
                aria-labelledby={`${p.id}-title`}
              >
                <div className="item-content">
                  <div className="item-header">
                    <h3 id={`${p.id}-title`} className="tile-title">
                      {p.title}
                    </h3>

                    <div className="time-github-row">
                      <span className="tile-time">{p.timeframe}</span>

                      {p.github ? (
                        <a
                          className="github-link"
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.title} on GitHub`}
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0C5.37 0 0 5.48 0 12.25c0 5.41 3.44 9.98 8.2 11.61.6.12.82-.27.82-.59v-2.1c-3.34.75-4.05-1.65-4.05-1.65-.55-1.43-1.34-1.82-1.34-1.82-1.1-.78.09-.77.09-.77 1.21.09 1.84 1.28 1.84 1.28 1.08 1.88 2.82 1.34 3.51 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.48-1.36-5.48-6.03 0-1.33.47-2.42 1.24-3.27-.12-.31-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.25a11.1 11.1 0 0 1 6.02 0c2.3-1.58 3.31-1.25 3.31-1.25.66 1.66.24 2.89.12 3.2.77.85 1.24 1.94 1.24 3.27 0 4.69-2.81 5.72-5.49 6.03.43.38.82 1.16.82 2.35v3.14c0 .32.21.71.83.59C20.56 22.23 24 17.66 24 12.25 24 5.48 18.63 0 12 0Z" />
                          </svg>
                        </a>
                      ) : (
                        <div style={{ width: 18 }} aria-hidden />
                      )}
                    </div>
                  </div>

                  <div className="tile-body">
                    <div className="tile-desc">
                      {renderDescription(p.description)}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}