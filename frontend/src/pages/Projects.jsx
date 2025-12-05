// profile-website/frontend/src/pages/Projects.jsx
import React from 'react'

/**
 * Projects page — uses same timeline-card layout/behavior as Experience.jsx.
 * Replace or extend the `projects` array with your real projects.
 *
 * The rendering/parsing logic is identical to Experience.jsx so styles remain consistent.
 */

const projects = [
  {
    id: 'proj-a',
    title: 'Portfolio Website (This Site)',
    timeframe: 'June 2024 - July 2024',
    github: 'https://github.com/yourusername/portfolio-website',
    description: `A personal portfolio site built with React (Vite) and Express.
Features:
- Minimal, responsive design
- Animated headline and timeline components
- Deploy-ready architecture (separate frontend + backend)

Technologies:
- React (Vite)
- Express
- MongoDB (Atlas)
- Tailwind / CSS`
  },
  {
    id: 'proj-b',
    title: 'Image Captioning Research',
    timeframe: '2023',
    github: 'https://github.com/yourusername/image-captioning',
    description: `Research prototype for image captioning using encoder-decoder transformers.

Key points:
- Trained on custom dataset with augmentation
- Experimented with attention visualizations
- Provided evaluation scripts and notebooks

Technologies:
- PyTorch
- Transformers
- Weights & Biases`
  },
  {
    id: 'proj-c',
    title: 'Chatbot Assistant (PoC)',
    timeframe: '2022',
    github: '',
    description: `Proof-of-concept chatbot to help with documentation and small tasks.

Features:
- Local LLM orchestration (prompt templates)
- Slack integration for notifications

Technologies:
- Node.js
- Express
- Socket.io`
  }
]

/* Reuse the same description parser implemented for Experience */
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

    if (line.endsWith(':')) {
      const title = line.slice(0, -1)
      i++
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

    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().endsWith(':')) {
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

export default function Projects() {
  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Projects</h1>
        </header>

        <div className="timeline" role="list">
          {projects.map((p, idx) => {
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
                    <h3 id={`${p.id}-title`} className="tile-title">{p.title}</h3>
                              
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
