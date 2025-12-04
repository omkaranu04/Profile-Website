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
    title: 'Internship — ML Research',
    timeframe: 'Jun 2024 - Aug 2024',
    github: 'https://github.com/yourusername/project-a',
    description:
`Worked on model optimization for production inference. Implemented a pruning pipeline,
integrated quantization-aware training, and created evaluation dashboards.

Technologies:
- Python
- PyTorch
- ONNX
- Docker
- GitHub Actions`
  },
  {
    id: 'proj-2',
    title: 'Personal Project — Portfolio Engine',
    timeframe: 'Oct 2023 - Dec 2023',
    github: 'https://github.com/yourusername/portfolio-engine',
    description:
`A small MERN app to manage and render my portfolio dynamically.

Features:
- Dynamic content editing with markdown support
- Image upload integration with Cloudinary
- Lightweight search and filtering

Technologies:
- React (Vite)
- Express
- MongoDB
- Cloudinary`
  },
  {
    id: 'proj-3',
    title: 'University — Research Assistant',
    timeframe: 'Jan 2023 - May 2023',
    github: '',
    description:
`Assisted in data collection and preprocessing for a computer vision research project.

Key points:
- Collected ~12k annotated images
- Built augmentation pipeline with albumentations`
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
                    <div>
                      <h3 id={`${entry.id}-title`} className="tile-title">{entry.title}</h3>
                      <div className="tile-time">{entry.timeframe}</div>
                    </div>

                    {entry.github ? (
                      <a
                        className="github-link"
                        href={entry.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${entry.title} on GitHub (opens in new tab)`}
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        {/* small GitHub icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path fill="currentColor" d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23A11.4 11.4 0 0112 6.8c1.02.01 2.05.14 3.01.41 2.28-1.55 3.28-1.23 3.28-1.23.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.25 0 4.63-2.8 5.66-5.47 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .5z" />
                        </svg>
                      </a>
                    ) : (
                      <div style={{ width: 18 }} aria-hidden />
                    )}
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
