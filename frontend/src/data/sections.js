// Page sections, in order. Drives the header nav, the command palette,
// scroll-spy, and the legacy URL redirects (/cp, /hackathons, ...).

export const sections = [
  { id: 'about', label: 'About', number: '01', aliases: ['/about'] },
  { id: 'experience', label: 'Experience', number: '02', aliases: ['/experience'] },
  { id: 'projects', label: 'Projects', number: '03', aliases: ['/projects'] },
  { id: 'competitions', label: 'Competitions', number: '04', aliases: ['/competitions', '/hackathons'] },
  { id: 'cp', label: 'CP', title: 'Competitive Programming', number: '05', aliases: ['/cp'] },
  { id: 'writing', label: 'Writing', number: '06', aliases: ['/writing'] },
  { id: 'contact', label: 'Contact', number: '07', aliases: ['/contact'] }
]
