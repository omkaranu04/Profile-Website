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
                    <div>
                      <h3 id={`${p.id}-title`} className="tile-title">{p.title}</h3>
                      <div className="tile-time">{p.timeframe}</div>
                    </div>

                    {p.github ? (
                      <a
                        className="github-link"
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} on GitHub (opens in new tab)`}
                        onClick={(ev) => ev.stopPropagation()}
                      >
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
