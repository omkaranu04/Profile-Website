// Competitive programming handles and academic honours.
// `fallback` values are shown when the live ratings API is unreachable.

export const cpPlatforms = [
  {
    id: 'codeforces',
    name: 'Codeforces',
    handle: 'omaksh_fr',
    url: 'https://codeforces.com/profile/omaksh_fr',
    fallback: { rating: null, maxRating: 1772 }
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    handle: 'omaksh_fr',
    url: 'https://www.codechef.com/users/omaksh_fr',
    fallback: { rating: null, maxRating: 1922 }
  },
  {
    id: 'atcoder',
    name: 'AtCoder',
    handle: 'omkarvb13',
    url: 'https://atcoder.jp/users/omkarvb13',
    fallback: { rating: null, maxRating: 1919 }
  }
]

export const cpRepo = { label: 'CP / DSA solutions', url: 'https://github.com/omkaranu04/CP_DSA' }

export const honours = [
  { value: 'AIR 1067', label: 'JEE Main 2022', note: 'Top 0.11%' },
  { value: 'AIR 2057', label: 'JEE Advanced 2022', note: 'Top 1.3%' },
  { value: 'AIR 9', label: 'MHT-CET 2022 · All India Merit', note: 'State Merit Rank 60, of 2 lakh+ candidates' }
]
