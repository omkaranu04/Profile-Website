// Single source of truth for personal details shown across the site.
// Text fields support **bold** for emphasis (see components/RichText.jsx).

export const profile = {
  name: 'Omkar Bhandare',
  fullName: 'Bhandare Omkar Vijay',
  initials: 'OB',
  headline: 'CSE @ IITKGP',
  location: 'Kharagpur, India',
  email: 'omkaranu04@gmail.com',
  // Drop a PDF in frontend/public/ (e.g. resume.pdf) and set this to '/resume.pdf'
  // to show the "Résumé" button in the hero, header menu and command palette.
  resume: null,

  // Rotating phrase in the hero ("I’m ___")
  roles: ['a coder', 'an ML/DL enthusiast', 'a poet', 'a writer', 'a learner for life'],

  intro: 'Final Year Dual Degree at **IIT Kharagpur**',

  // Headline numbers. Keep these short — they render as a row of figures.
  // `live` swaps in the peak rating from the CP API when it is reachable.
  figures: [
    { value: '8.97', unit: '/10', label: 'CGPA at IIT Kharagpur' },
    { value: '1772', label: 'Peak Codeforces rating', note: 'Expert', live: 'codeforces' },
    { value: '0.980', label: 'AUC on Indian clinical X-rays', note: 'Thesis' },
    { value: '15→2', unit: 'days', label: 'Time-to-action cut at AmEx' }
  ],

  about: [
    'Hey! I’m Omkar — a final-year Computer Science student at IIT Kharagpur. Most of my time goes into **machine learning and deep learning**: reading papers, reproducing them, and figuring out why a model that looks great on a benchmark falls over on real data.',
    'I’m equally at home lower in the stack. I’ve written a **Unix shell**, a **reliable transport protocol over UDP** and a **RISC processor on an FPGA**, and I keep my problem-solving sharp on Codeforces, CodeChef and AtCoder.',
    'Away from the keyboard I write **poetry and prose**, and I’m an unapologetic tech geek who keeps up with every new gadget and launch.'
  ],

  interests: ['Deep learning', 'Medical imaging', 'Agentic AI', 'Anomaly detection', 'Systems programming', 'Algorithms', 'Quantitative finance'],

  writing: {
    blurb:
      'Code is how I solve problems; writing is how I make sense of everything else. I write poetry and prose in my free time and share it on a small Instagram page — come say hi.',
    handle: '@deadpoets_page',
    url: 'https://www.instagram.com/deadpoets_page?igsh=MXFwMHVyamUwcm1wMQ=='
  }
}

export const socials = [
  { id: 'github', label: 'GitHub', handle: 'omkaranu04', url: 'https://github.com/omkaranu04' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'omkarbhandare13', url: 'https://www.linkedin.com/in/omkarbhandare13/' },
  { id: 'codeforces', label: 'Codeforces', handle: 'omaksh_fr', url: 'https://codeforces.com/profile/omaksh_fr' },
  { id: 'instagram', label: 'Instagram', handle: 'omkarvb_13', url: 'https://www.instagram.com/omkarvb_13?igsh=MTZxZm15M3lsNzl5OA==' }
]

export const education = [
  {
    school: 'Indian Institute of Technology, Kharagpur',
    degree: 'Dual Degree (B.Tech + M.Tech), Computer Science & Engineering',
    period: '2022 – 2027',
    score: 'CGPA 8.97 / 10'
  },
  {
    school: 'Nav Krishna Valley Junior College, Kupwad',
    degree: 'Maharashtra State Board (HSC), Class XII',
    period: '2022',
    score: '92.17%'
  }
]

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Python'], secondary: ['Bash', 'SQL', 'Cypher', 'Verilog', 'JavaScript', 'HTML/CSS', 'MIPS'] },
  { group: 'ML & Data', items: ['PyTorch', 'NumPy', 'Pandas'], secondary: ['scikit-learn', 'CatBoost', 'Optuna', 'FAISS'] },
  { group: 'Backend & Databases', items: ['Node.js', 'Express.js', 'Flask'], secondary: ['PostgreSQL', 'MongoDB', 'Neo4j'] },
  { group: 'Tools', items: ['Git', 'Linux shell', 'VS Code'], secondary: ['Postman', 'Jupyter', 'Google Colab', 'Kaggle'] }
]

export const coursework = [
  'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Compilers',
  'Computer Organization & Architecture', 'Systems Programming', 'Software Engineering',
  'Algorithms I & II', 'Deep Learning', 'Machine Learning', 'Advanced ML', 'Image Processing',
  'Natural Language Processing', 'Complex Network Theory', 'High Performance Computer Architecture',
  'Probability & Statistics', 'Discrete Structures', 'Linear Algebra'
]
