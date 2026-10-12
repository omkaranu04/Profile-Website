import { useEffect, useState } from 'react'
import { cpPlatforms } from '../data/achievements'

// Live ratings from the backend (/api/cp). Each platform falls back to the
// static values in data/achievements.js, so the section never shows an error.
export default function useCpStats() {
  const [state, setState] = useState({
    status: 'loading',
    platforms: cpPlatforms.map((p) => ({ ...p, ...p.fallback, history: [], live: false }))
  })

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL
    if (!base) {
      setState((s) => ({ ...s, status: 'offline' }))
      return
    }
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 12000)

    fetch(`${base.replace(/\/$/, '')}/api/cp`, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setState({
          status: 'live',
          platforms: cpPlatforms.map((p) => {
            const d = json?.[p.id]
            if (!d || (d.rating == null && d.maxRating == null)) {
              return { ...p, ...p.fallback, history: [], live: false }
            }
            return {
              ...p,
              rating: d.rating ?? null,
              maxRating: Math.max(d.maxRating ?? 0, p.fallback.maxRating ?? 0) || null,
              history: Array.isArray(d.history) ? d.history : [],
              live: true
            }
          })
        })
      })
      .catch(() => setState((s) => ({ ...s, status: 'offline' })))
      .finally(() => clearTimeout(timeout))

    return () => {
      clearTimeout(timeout)
      ctrl.abort()
    }
  }, [])

  return state
}
