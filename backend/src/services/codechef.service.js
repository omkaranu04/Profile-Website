import axios from 'axios'
import * as cheerio from 'cheerio'

const HANDLE = 'omaksh_fr'

export async function getCodeChef() {
  const { data } = await axios.get(
    `https://www.codechef.com/users/${HANDLE}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }
  )

  const $ = cheerio.load(data)

  const ratingText = $('.rating-number').first().text().trim()
  const highestText = $('small')
    .filter((_, el) => $(el).text().includes('Highest Rating'))
    .first()
    .text()

  const highestMatch = highestText.match(/(\d+)/)

  return {
    handle: HANDLE,
    rating: ratingText ? parseInt(ratingText) : null,
    maxRating: highestMatch ? parseInt(highestMatch[1]) : null
  }
}
