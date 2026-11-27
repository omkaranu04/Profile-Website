// Page sections, in order. Drives the header nav, scroll-spy and the
// legacy URL redirects (/cp, /hackathons, ...).

export const sections = [
  { id: 'about', label: 'About', number: '01', aliases: ['/about'] },
  { id: 'education', label: 'Education', number: '02', aliases: ['/education'] },
  { id: 'experience', label: 'Experience', number: '03', aliases: ['/experience'] },
  { id: 'projects', label: 'Projects', number: '04', aliases: ['/projects'] },
  { id: 'competitions', label: 'Competitions', number: '05', aliases: ['/competitions', '/hackathons'] },
  { id: 'cp', label: 'CP', number: '06', aliases: ['/cp'] },
  { id: 'contact', label: 'Contact', number: '07', aliases: ['/contact'] }
]
