import axios from 'axios'

const HANDLE = 'omaksh_fr'

export async function getCodeforces() {
  const res = await axios.get(
    `https://codeforces.com/api/user.info?handles=${HANDLE}`
  )

  if (res.data.status !== 'OK') {
    throw new Error('Codeforces API failed')
  }

  const u = res.data.result[0]

  return {
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null,
    rank: u.rank ?? null,
    maxRank: u.maxRank ?? null
  }
}
