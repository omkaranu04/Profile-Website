import axios from 'axios'
import * as cheerio from 'cheerio'

const HANDLE = 'omkarvb13'

export async function getAtCoder() {
  const { data } = await axios.get(
    `https://atcoder.jp/users/${HANDLE}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }
  )

  const $ = cheerio.load(data)

  const rating = $('th')
    .filter((_, el) => $(el).text().trim() === 'Rating')
    .next()
    .text()
    .trim()

  const maxRating = $('th')
    .filter((_, el) => $(el).text().trim() === 'Highest Rating')
    .next()
    .text()
    .trim()

  return {
    handle: HANDLE,
    rating: rating ? parseInt(rating) : null,
    maxRating: maxRating ? parseInt(maxRating) : null
  }
}
