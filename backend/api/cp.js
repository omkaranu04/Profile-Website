import axios from 'axios'
import * as cheerio from 'cheerio'

/* =====================
   SIMPLE, SAFE CORS
   ===================== */
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

/* =====================
   HANDLES
   ===================== */
const CF_HANDLE = 'omaksh_fr'
const CC_HANDLE = 'omaksh_fr'
const AC_HANDLE = 'omkarvb13'

/* =====================
   CACHE (per instance)
   ===================== */
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes
let cache = {
  timestamp: 0,
  data: null
}

const http = axios.create({
  timeout: 8000,
  headers: { 'User-Agent': 'Mozilla/5.0' }
})

// history entries: { t: unix seconds, rating: number, contest: string }

/* =====================
   CODEFORCES
   ===================== */
async function getCodeforces() {
  const [info, history] = await Promise.all([
    http.get(`https://codeforces.com/api/user.info?handles=${CF_HANDLE}`),
    http.get(`https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`).catch(() => null)
  ])

  if (info.data.status !== 'OK') {
    throw new Error('Codeforces API failed')
  }

  const u = info.data.result[0]
  const contests = history?.data?.status === 'OK' ? history.data.result : []

  return {
    platform: 'Codeforces',
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null,
    history: contests.map((c) => ({
      t: c.ratingUpdateTimeSeconds,
      rating: c.newRating,
      contest: c.contestName
    }))
  }
}

/* =====================
   CODECHEF (profile page scrape)
   ===================== */
async function getCodeChef() {
  const { data } = await http.get(`https://www.codechef.com/users/${CC_HANDLE}`)

  const $ = cheerio.load(data)

  const ratingText = $('.rating-number').first().text().trim()
  const highestText = $('small')
    .filter((_, el) => $(el).text().includes('Highest Rating'))
    .first()
    .text()

  const highestMatch = highestText.match(/(\d+)/)

  // The rating graph is embedded as `var all_rating = [...];`
  let history = []
  const graph = data.match(/all_rating\s*=\s*(\[[\s\S]*?\]);/)
  if (graph) {
    try {
      history = JSON.parse(graph[1])
        .map((c) => ({
          t: Math.floor(Date.parse(String(c.end_date).replace(' ', 'T') + '+05:30') / 1000),
          rating: Number(c.rating),
          contest: c.name
        }))
        .filter((c) => Number.isFinite(c.t) && Number.isFinite(c.rating))
    } catch {
      history = []
    }
  }

  return {
    platform: 'CodeChef',
    handle: CC_HANDLE,
    rating: ratingText ? Number(ratingText) : null,
    maxRating: highestMatch ? Number(highestMatch[1]) : null,
    history
  }
}

/* =====================
   ATCODER (JSON API)
   ===================== */
async function getAtCoder() {
  const { data } = await http.get(`https://atcoder.jp/users/${AC_HANDLE}/history/json`)

  const rated = Array.isArray(data) ? data.filter((e) => e.IsRated && e.NewRating != null) : []

  if (rated.length === 0) {
    return {
      platform: 'AtCoder',
      handle: AC_HANDLE,
      rating: null,
      maxRating: null,
      history: []
    }
  }

  return {
    platform: 'AtCoder',
    handle: AC_HANDLE,
    rating: rated[rated.length - 1].NewRating,
    maxRating: Math.max(...rated.map((e) => e.NewRating)),
    history: rated.map((e) => ({
      t: Math.floor(Date.parse(e.EndTime) / 1000),
      rating: e.NewRating,
      contest: e.ContestNameEn || e.ContestName
    }))
  }
}

/* =====================
   VERCEL HANDLER
   ===================== */
export default async function handler(req, res) {
  setCors(res)

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const now = Date.now()

  // Cache hit
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return res.status(200).json({
      ...cache.data,
      cached: true
    })
  }

  // Each platform succeeds or fails on its own; a failure falls back to the
  // last cached value for that platform (or null), never failing the request.
  const [cf, cc, ac] = await Promise.allSettled([getCodeforces(), getCodeChef(), getAtCoder()])

  const pick = (result, key) => {
    if (result.status === 'fulfilled') return result.value
    console.error(`${key} failed:`, result.reason?.message ?? result.reason)
    return cache.data?.[key] ?? null
  }

  const response = {
    codeforces: pick(cf, 'codeforces'),
    codechef: pick(cc, 'codechef'),
    atcoder: pick(ac, 'atcoder'),
    cached: false
  }

  if (!response.codeforces && !response.codechef && !response.atcoder) {
    return res.status(500).json({ error: 'Failed to fetch CP stats' })
  }

  const allFresh = [cf, cc, ac].every((r) => r.status === 'fulfilled')
  if (allFresh || !cache.data) {
    cache = { timestamp: now, data: response }
  }

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400')
  return res.status(200).json(response)
}
