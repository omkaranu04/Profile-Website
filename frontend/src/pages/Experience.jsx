import React from 'react'

/**
 * Experience page — timeline-like project tiles.
 * Replace the `entries` array with your actual experiences/projects.
 */

const entries = [
  {
    id: 'proj-1',
    title: 'Internship — ML Research',
    timeframe: 'Jun 2024 - Aug 2024',
    github: 'https://github.com/yourusername/project-a', // optional
    description:
      `Worked on model optimization for production inference. Implemented a pruning pipeline,
integrated quantization-aware training, and created evaluation dashboards.
Key contributions:
- Designed a pruning scheduler for layer-wise sparsity.
- Reduced model size by 58% with minimal accuracy drop.
- Built automated unit tests and evaluation notebooks.

Technologies: Python, PyTorch, ONNX, Docker, GitHub Actions.`
  },
  {
    id: 'proj-2',
    title: 'Personal Project — Portfolio Engine',
    timeframe: 'Oct 2023 - Dec 2023',
    github: 'https://github.com/yourusername/portfolio-engine',
    description:
      `A small MERN app to manage and render my portfolio dynamically. Features:
- Dynamic content editing with markdown support.
- Image upload integration with Cloudinary.
- Lightweight search and filtering for projects.

Technologies: React, Vite, Express, MongoDB, Cloudinary.`
  },
  {
    id: 'proj-3',
    title: 'University — Research Assistant',
    timeframe: 'Jan 2023 - May 2023',
    github: '', // no link — optional
    description:
      `Assisted in data collection and preprocessing for a computer vision research project.
Wrote data-augmentation scripts, prepared labeled datasets, and helped run baseline experiments.

Key points:
- Collected ~12k annotated images.
- Built augmentation pipeline with albumentations.
`
  }
]

export default function Experience() {
  return (
    <main className="app-root">
      <section className="experience-container">
        <header className="experience-header">
          <h1 className="headline">Experience</h1>
          <p className="hint">Hover or focus a card to see details. Click GitHub to view code.</p>
        </header>

        <div className="timeline-grid" role="list">
          {entries.map((e) => (
            <article
              key={e.id}
              className="timeline-item"
              tabIndex={0}                 // makes item focusable for keyboard users
              aria-labelledby={`${e.id}-title`}
              role="listitem"
            >
              <div className="tile-top">
                <div>
                  <h3 id={`${e.id}-title`} className="tile-title">{e.title}</h3>
                  <div className="tile-time">{e.timeframe}</div>
                </div>

                {e.github ? (
                  <a
                    className="github-link"
                    href={e.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${e.title} on GitHub (opens in new tab)`}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    {/* Inline GitHub SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path fill="currentColor" d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23A11.4 11.4 0 0112 6.8c1.02.01 2.05.14 3.01.41 2.28-1.55 3.28-1.23 3.28-1.23.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.25 0 4.63-2.8 5.66-5.47 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 .5z" />
                    </svg>
                  </a>
                ) : (
                  <div style={{ width: 20 }} aria-hidden />
                )}
              </div>

              <div className="tile-body">
                <div className="tile-desc" aria-hidden>
                  <pre>{e.description}</pre>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
