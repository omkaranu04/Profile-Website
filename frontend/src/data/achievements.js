// Competitive programming handles.
// `fallback` values are shown when the live ratings API is unreachable.

export const cpPlatforms = [
  {
    id: 'codeforces',
    name: 'Codeforces',
    handle: 'omaksh_fr',
    url: 'https://codeforces.com/profile/omaksh_fr',
    fallback: { rating: null, maxRating: 1780 }
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
    fallback: { rating: null, maxRating: 2050 }
  }
]

export const cpRepo = { label: 'CP / DSA solutions', url: 'https://github.com/omkaranu04/CP_DSA' }
