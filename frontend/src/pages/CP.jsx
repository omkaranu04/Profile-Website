import React, { useEffect, useState } from 'react'

// Competitive Programming Page

export default function CP() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL

    if (!API_BASE) {
      setError('API URL not configured')
      setLoading(false)
      return
    }

    fetch(`${API_BASE}/api/cp`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch CP stats')
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load CP ratings')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="app-root">
        <section className="experience-timeline-wrapper">
          <h1 className="headline">Competitive Programming</h1>
          <p>Loading ratings…</p>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="app-root">
        <section className="experience-timeline-wrapper">
          <h1 className="headline">Competitive Programming</h1>
          <p>{error}</p>
        </section>
      </main>
    )
  }

  const { codeforces, codechef, atcoder } = data

  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Competitive Programming</h1>
        </header>

        <div className="timeline">
          {[codeforces, codechef, atcoder].map((p, idx) => (
            <article
              key={p.platform}
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="item-content">
                <h3 className="tile-title">{p.platform}</h3>

                <p className="tile-time">
                  Current Rating:{' '}
                  <strong>{p.rating ?? 'N/A'}</strong>
                </p>

                <p className="tile-time">
                  Highest Rating:{' '}
                  <strong>{p.maxRating ?? 'N/A'}</strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
