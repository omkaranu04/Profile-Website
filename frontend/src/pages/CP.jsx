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
          <p>{loading ? 'Loading Ratings…' : error}</p>
        </section>
      </main>
    )
  }

  const platforms = [
    {
      ...data.codeforces,
      profile: 'https://codeforces.com/profile/omaksh_fr'
    },
    {
      ...data.codechef,
      profile: 'https://www.codechef.com/users/omaksh_fr'
    },
    {
      ...data.atcoder,
      profile: 'https://atcoder.jp/users/omkarvb13'
    }
  ]

  return (
    <main className="app-root">
      <section className="cp-wrapper">
        <h1 className="headline">Competitive Programming</h1>

        <a
          href="https://github.com/omkaranu04/CP_DSA"
          target="_blank"
          rel="noopener noreferrer"
          className="cp-github-link"
        >
          CP/DSA Repository
        </a>

        <div className="cp-card-container">
          {platforms.map((p) => (
            <article key={p.platform} className="cp-card">
              <div className="cp-card-header">
                <h3 className="cp-platform">{p.platform}</h3>

                <a
                  href={p.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-profile-link"
                >
                  Profile →
                </a>
              </div>

              <div className="cp-metrics">
                <div className="cp-row">
                  <span className="label">Current Rating</span>
                  <span className="value">{p.rating ?? 'N/A'}</span>
                </div>

                <div className="cp-row">
                  <span className="label">Highest Rating</span>
                  <span className="value">{p.maxRating ?? 'N/A'}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
