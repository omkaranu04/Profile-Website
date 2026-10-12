import { useEffect, useMemo, useRef, useState } from 'react'
import './RatingChart.css'

const H = 120
const PAD = { top: 12, right: 10, bottom: 8, left: 34 }

function niceTicks(min, max) {
  const step = max - min > 600 ? 400 : max - min > 250 ? 200 : 100
  const lo = Math.floor(min / step) * step
  const hi = Math.ceil(max / step) * step
  const ticks = []
  for (let v = lo; v <= hi; v += step) ticks.push(v)
  return { lo, hi, ticks }
}

const fmtDate = (t) => new Date(t * 1000).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })

// Single-series rating line: 2px stroke, faint area wash, end dot with surface
// ring, hairline grid and a snapping crosshair + tooltip on hover/focus.
export default function RatingChart({ history, label }) {
  const wrapRef = useRef(null)
  const [width, setWidth] = useState(320)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !('ResizeObserver' in window)) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(200, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const geo = useMemo(() => {
    const ratings = history.map((h) => h.rating)
    const { lo, hi, ticks } = niceTicks(Math.min(...ratings), Math.max(...ratings))
    const innerW = width - PAD.left - PAD.right
    const innerH = H - PAD.top - PAD.bottom
    const t0 = history[0].t
    const t1 = history[history.length - 1].t
    const x = (t) => PAD.left + (t1 === t0 ? innerW : ((t - t0) / (t1 - t0)) * innerW)
    const y = (r) => PAD.top + innerH - ((r - lo) / (hi - lo || 1)) * innerH
    const pts = history.map((h) => [x(h.t), y(h.rating)])
    const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join('')
    const area = `${line}L${pts[pts.length - 1][0].toFixed(1)},${PAD.top + innerH}L${pts[0][0].toFixed(1)},${PAD.top + innerH}Z`
    return { pts, line, area, ticks, y, innerH }
  }, [history, width])

  const peak = Math.max(...history.map((h) => h.rating))
  const last = history[history.length - 1]
  const summary = `${label} rating history: ${history.length} rated contests, ${fmtDate(history[0].t)} to ${fmtDate(last.t)}. Peak ${peak}, latest ${last.rating}.`

  const pick = (clientX) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const px = clientX - rect.left
    let best = 0
    geo.pts.forEach(([x], i) => { if (Math.abs(x - px) < Math.abs(geo.pts[best][0] - px)) best = i })
    setHover(best)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setHover((h) => {
        const cur = h ?? history.length - 1
        return Math.max(0, Math.min(history.length - 1, cur + (e.key === 'ArrowRight' ? 1 : -1)))
      })
    }
  }

  const hp = hover != null ? geo.pts[hover] : null
  const hd = hover != null ? history[hover] : null
  const [ex, ey] = geo.pts[geo.pts.length - 1]

  return (
    <div
      className="rchart"
      ref={wrapRef}
      tabIndex={0}
      role="img"
      aria-label={summary}
      onPointerMove={(e) => pick(e.clientX)}
      onPointerLeave={() => setHover(null)}
      onFocus={() => setHover(history.length - 1)}
      onBlur={() => setHover(null)}
      onKeyDown={onKey}
    >
      <svg width={width} height={H} viewBox={`0 0 ${width} ${H}`} aria-hidden>
        {geo.ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={width - PAD.right} y1={geo.y(t)} y2={geo.y(t)} className="rchart__grid" />
            <text x={PAD.left - 8} y={geo.y(t)} className="rchart__tick" textAnchor="end" dominantBaseline="middle">{t}</text>
          </g>
        ))}
        <path d={geo.area} className="rchart__area" />
        <path d={geo.line} className="rchart__line" />
        {hp ? (
          <>
            <line x1={hp[0]} x2={hp[0]} y1={PAD.top} y2={PAD.top + geo.innerH} className="rchart__cross" />
            <circle cx={hp[0]} cy={hp[1]} r="4" className="rchart__dot" />
          </>
        ) : (
          <circle cx={ex} cy={ey} r="4" className="rchart__dot" />
        )}
      </svg>

      <div className="rchart__axis" aria-hidden style={{ paddingLeft: PAD.left, paddingRight: PAD.right }}>
        <span>{fmtDate(history[0].t)}</span>
        <span>{fmtDate(last.t)}</span>
      </div>

      {hd ? (
        <div
          className={`rchart__tip ${hp[0] > width * 0.6 ? 'is-left' : ''}`}
          style={{ left: hp[0], top: Math.max(0, hp[1] - 12) }}
          role="presentation"
        >
          <strong>{hd.rating}</strong>
          <span className="rchart__tip-name">{hd.contest || 'Rated contest'}</span>
          <span className="rchart__tip-date">{fmtDate(hd.t)}</span>
        </div>
      ) : null}
    </div>
  )
}
