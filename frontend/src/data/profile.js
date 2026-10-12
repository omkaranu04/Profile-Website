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

  // About text, one entry per line. Supports **bold** and [links](https://...).
  about: [
    'Hey!',
    'I am Omkar Bhandare, a fourth year CSE Dual Degree student at IIT Kharagpur.',
    'I am passionate about machine learning and deep learning, and I am always keen to explore new advancements in these fields.',
    'I also am fond of DSA and CP, and love solving problems on various competitive programming platforms.',
    'Apart from academics, I enjoy writing poetry and prose in my free time. I do have an Instagram page where I share my work - don’t forget to [check it out!](https://www.instagram.com/deadpoets_page?igsh=MXFwMHVyamUwcm1wMQ==)',
    'I am also a tech-geek, and I love keeping myself updated with the latest tech trends and gadgets.'
  ],

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
