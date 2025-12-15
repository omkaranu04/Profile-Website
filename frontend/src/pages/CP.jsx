import React, { useEffect, useState } from 'react'

export default function CP() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/cp')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <p>Loading CP stats...</p>

  const platforms = [
    {
      name: 'Codeforces',
      curr: data.codeforces.rating,
      max: data.codeforces.maxRating,
      link: `https://codeforces.com/profile/${data.codeforces.handle}`
    },
    {
      name: 'CodeChef',
      curr: data.codechef.rating,
      max: data.codechef.maxRating,
      link: `https://www.codechef.com/users/${data.codechef.handle}`
    },
    {
      name: 'AtCoder',
      curr: data.atcoder.rating,
      max: data.atcoder.maxRating,
      link: `https://atcoder.jp/users/${data.atcoder.handle}`
    }
  ]

  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Competitive Programming</h1>
        </header>
                <div style={{}}>
          <a
            className="github-link"
            href="https://github.com/omkaranu04/CP_DSA"
            target="_blank"
          >
            -&gt; CP/DSA GitHub Repository &lt;-
          </a>
        </div>

        <div className="timeline">
          {platforms.map((p, idx) => (
            <article
              key={p.name}
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="item-content">
                <h3 className="tile-title">{p.name}</h3>
                <p className="tile-time">
                  Current Rating: <strong>{p.curr ?? 'N/A'}</strong>
                </p>
                <p className="tile-time">
                  Highest Rating: <strong>{p.max ?? 'N/A'}</strong>
                </p>
                <a
                  className="github-link"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
