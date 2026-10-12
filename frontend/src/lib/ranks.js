// Rank names per platform, from each platform's public rating bands.
export function rankTitle(platform, rating) {
  if (rating == null) return null
  if (platform === 'codeforces') {
    const bands = [
      [3000, 'Legendary Grandmaster'], [2600, 'International Grandmaster'], [2400, 'Grandmaster'],
      [2300, 'International Master'], [2100, 'Master'], [1900, 'Candidate Master'],
      [1600, 'Expert'], [1400, 'Specialist'], [1200, 'Pupil'], [0, 'Newbie']
    ]
    return bands.find(([min]) => rating >= min)[1]
  }
  if (platform === 'codechef') {
    const stars = rating >= 2500 ? 7 : rating >= 2200 ? 6 : rating >= 2000 ? 5 : rating >= 1800 ? 4 : rating >= 1600 ? 3 : rating >= 1400 ? 2 : 1
    return `${stars}★`
  }
  if (platform === 'atcoder') {
    if (rating >= 2000) return 'Dan'
    return `${Math.min(10, 1 + Math.floor((1999 - rating) / 200))} Kyu`
  }
  return null
}
