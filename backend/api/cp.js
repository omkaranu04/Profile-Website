import axios from 'axios'
import * as cheerio from 'cheerio'

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

/* ===== HANDLES (move to env later if you want) ===== */
const CF_HANDLE = 'omaksh_fr'
const CC_HANDLE = 'omaksh_fr'
const AC_HANDLE = 'omkarvb13'

/* ===== CACHE ===== */
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes
let cache = {
  timestamp: 0,
  data: null
}

/* ===== CODEFORCES ===== */
async function getCodeforces() {
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`
  )

  if (res.data.status !== 'OK') {
    throw new Error('Codeforces API failed')
  }

  const u = res.data.result[0]

  return {
    platform: 'Codeforces',
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null
  }
}

/* ===== CODECHEF ===== */
async function getCodeChef() {
  const { data } = await axios.get(
    `https://www.codechef.com/users/${CC_HANDLE}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )

  const $ = cheerio.load(data)

  const ratingText = $('.rating-number').first().text().trim()
  const highestText = $('small')
    .filter((_, el) => $(el).text().includes('Highest Rating'))
    .first()
    .text()

  const highestMatch = highestText.match(/(\d+)/)

  return {
    platform: 'CodeChef',
    handle: CC_HANDLE,
    rating: ratingText ? Number(ratingText) : null,
    maxRating: highestMatch ? Number(highestMatch[1]) : null
  }
}

/* ===== ATCODER (JSON HISTORY API) ===== */
async function getAtCoder() {
  const { data } = await axios.get(
    `https://atcoder.jp/users/${AC_HANDLE}/history/json`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )

  if (!Array.isArray(data) || data.length === 0) {
    return {
      platform: 'AtCoder',
      handle: AC_HANDLE,
      rating: null,
      maxRating: null
    }
  }

  const last = data[data.length - 1]
  let maxRating = null

  for (const entry of data) {
    if (entry.NewRating != null) {
      maxRating = Math.max(maxRating ?? 0, entry.NewRating)
    }
  }

  return {
    platform: 'AtCoder',
    handle: AC_HANDLE,
    rating: last.NewRating ?? null,
    maxRating
  }
}

/* ===== VERCEL HANDLER ===== */
export default async function handler(req, res) {

    setCors(res)

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    
  const now = Date.now()

  // Serve from cache if valid
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return res.status(200).json({
      ...cache.data,
      cached: true
    })
  }

  try {
    const [cf, cc, ac] = await Promise.all([
      getCodeforces(),
      getCodeChef(),
      getAtCoder()
    ])

    const response = {
      codeforces: cf,
      codechef: cc,
      atcoder: ac,
      cached: false
    }

    cache = {
      timestamp: now,
      data: response
    }

    res.status(200).json(response)
  } catch (err) {
    console.error(err)

    // Fallback to stale cache if available
    if (cache.data) {
      return res.status(200).json({
        ...cache.data,
        cached: true,
        stale: true
      })
    }

    res.status(500).json({ error: 'Failed to fetch CP stats' })
  }
}

console.log('Cache age:', Date.now() - cache.timestamp)
