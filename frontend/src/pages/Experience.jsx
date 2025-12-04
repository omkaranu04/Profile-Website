// profile-website/frontend/src/pages/Experience.jsx
import React from 'react'

/**
 * Timeline-style Experience page (alternating visual, left-aligned)
 * - Descriptions are parsed so lines that end with ":" become bold section titles,
 *   and subsequent lines starting with "- " become list items under that section.
 *
 * Replace / extend `entries` with your real data.
 */

const entries = [
  {
    id: 'proj-1',
    title: 'Research Intern - Deakin University (Dr. Ye Zhu)',
    timeframe: 'Apr \'24 - Aug \'24',
    github: 'https://github.com/omkaranu04/FTP-Deakin',
    description: ` 
    • Reproduced and validated MemStream for anomaly detection, achieving AUC-ROC scores up to 0.99 on Satimage-2 dataset \n
    • Introduced 'limit' score threshold for anomaly labeling, improving adaptability and outperforming 6 of 9 baselines across datasets \n
    • Benchmarked MemStream against 9 algorithms across 7 datasets, using AUC-ROC, ROC-PR, and error-rate metrics \n
    • Authored a report highlighting MemStream's performance, strengths in concept-drift and real-time anomaly detection \n
    `
  },
  {
    id: 'proj-2',
    title: 'Research Intern - Deakin University (Dr. Ye Zhu)',
    timeframe: 'Apr \'24 - Aug \'24',
    github: 'https://github.com/omkaranu04/FTP-Deakin',
    description: ` 
    • Reproduced and validated MemStream for anomaly detection, achieving AUC-ROC scores up to 0.99 on Satimage-2 dataset \n
    • Introduced 'limit' score threshold for anomaly labeling, improving adaptability and outperforming 6 of 9 baselines across datasets \n
    • Benchmarked MemStream against 9 algorithms across 7 datasets, using AUC-ROC, ROC-PR, and error-rate metrics \n
    • Authored a report highlighting MemStream's performance, strengths in concept-drift and real-time anomaly detection \n
    `
  }
]

/* simple parser to convert the description string into JSX:
   - lines ending with ':' become section headers (bold)
   - lines starting with '- ' become list items following a header
   - blank lines create paragraph breaks
*/
function renderDescription(text) {
  const lines = text.split('\n').map((l) => l.replace(/\r/g, ''))
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      // blank line -> paragraph gap
      out.push(<div key={`p-${i}`} style={{ height: 8 }} />)
      i++
      continue
    }

    if (line.endsWith(':')) {
      // section title
      const title = line.slice(0, -1)
      i++
      // collect subsequent '- ' lines as list items
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        items.push(lines[i].trim().replace(/^-+\s*/, ''))
        i++
      }

      out.push(
        <div key={`section-${i}`} className="desc-section">
          <div className="desc-section-title">{title}</div>
          {items.length > 0 ? (
            <ul className="desc-list">
              {items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )
      continue
    }

    // otherwise treat as a normal paragraph (may join consecutive non-empty lines until blank or section)
    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().endsWith(':')) {
      // stop if next is a section title line (ends with :) to avoid consuming it
      if (lines[i].trim().endsWith(':')) break
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length) {
      out.push(
        <p key={`para-${i}`} className="desc-paragraph">
          {paraLines.join(' ')}
        </p>
      )
    }
  }

  return out
}

export default function Experience() {
  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Experience</h1>
        </header>

        <div className="timeline" role="list">
          {entries.map((entry, idx) => {
            const side = idx % 2 === 0 ? 'left' : 'right'
            return (
              <article
                key={entry.id}
                className={`timeline-item ${side}`}
                tabIndex={0}
                role="listitem"
                aria-labelledby={`${entry.id}-title`}
              >
                <div className="item-content">
                  <div className="item-header">
                    <h3 id={`${entry.id}-title`} className="tile-title">{entry.title}</h3>
                              
                    <div className="time-github-row">
                      <span className="tile-time">{entry.timeframe}</span>
                              
                      {entry.github ? (
                        <a
                          className="github-link"
                          href={entry.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${entry.title} on GitHub`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 0C5.37 0 0 5.48 0 12.25c0 5.41 3.44 9.98 8.2 11.61.6.12.82-.27.82-.59v-2.1c-3.34.75-4.05-1.65-4.05-1.65-.55-1.43-1.34-1.82-1.34-1.82-1.1-.78.09-.77.09-.77 1.21.09 1.84 1.28 1.84 1.28 1.08 1.88 2.82 1.34 3.51 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.48-1.36-5.48-6.03 0-1.33.47-2.42 1.24-3.27-.12-.31-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.25a11.1 11.1 0 0 1 6.02 0c2.3-1.58 3.31-1.25 3.31-1.25.66 1.66.24 2.89.12 3.2.77.85 1.24 1.94 1.24 3.27 0 4.69-2.81 5.72-5.49 6.03.43.38.82 1.16.82 2.35v3.14c0 .32.21.71.83.59C20.56 22.23 24 17.66 24 12.25 24 5.48 18.63 0 12 0Z" />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="tile-body">
                    <div className="tile-desc">
                      {renderDescription(entry.description)}
                    </div>
                  </div>
                </div>

                {/* removed timeline-dot & connectors for simpler look */}
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
