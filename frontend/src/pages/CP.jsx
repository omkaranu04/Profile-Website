import React, { useEffect, useState } from 'react'

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
      .catch(() => {
        setError('Unable to load CP ratings')
        setLoading(false)
      })
  }, [])

  if (loading || error) {
    return (
      <main className="app-root">
        <section className="cp-wrapper">
          <h1 className="headline">Competitive Programming</h1>
          <p>{loading ? 'Loading ratings…' : error}</p>
        </section>
      </main>
    )
  }

  const { codeforces, codechef, atcoder } = data

  return (
    <main className="app-root">
      <section className="cp-wrapper">
        <h1 className="headline">Competitive Programming</h1>

        {/* GitHub Link */}
        <a
          href="https://github.com/omkaranu04/CP_DSA"
          target="_blank"
          rel="noopener noreferrer"
          className="cp-github-link"
        >
          -\gt CP/DSA Repository \lt-
        </a>

        {/* Cards */}
        <div className="cp-card-container">
          {[codeforces, codechef, atcoder].map((p) => (
            <div key={p.platform} className="cp-card">
              <h3 className="cp-platform">{p.platform}</h3>

              <p>
                <span className="label">Current Rating:</span>
                <span className="value">{p.rating ?? 'N/A'}</span>
              </p>

              <p>
                <span className="label">Highest Rating:</span>
                <span className="value">{p.maxRating ?? 'N/A'}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
