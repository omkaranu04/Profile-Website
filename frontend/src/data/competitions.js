// Hackathons & competitions, newest first. Same shape as projects.js.

export const competitions = [
  {
    id: 'wunderfund',
    title: 'Alfa Connectome ML Competition',
    context: 'Wunder Fund · Online',
    date: 'Aug – Nov 2026',
    github: 'https://github.com/omkaranu04/wundernn_hackathon_2026',
    points: [
      'Built a **causal LSTM/GRU ensemble** distilled from **look-ahead teachers** to forecast price signals from **112 streaming features**.',
      'Wrote a **numba int8/int16 inference engine** replacing ONNX Runtime, cutting per-row latency from **~130 µs to <60 µs** on 1 vCPU.'
    ]
  },
  {
    id: 'innov8',
    title: 'AI-powered HR Decision Making',
    context: 'Innov8 2.0 Finals · Eightfold AI · In-person',
    date: 'Aug 2024',
    github: 'https://github.com/omkaranu04/8foldAI-hackathon',
    points: [
      'Built a **MERN + FastAPI** platform that ingests résumés and LORs, applying **LLaMA-based** vagueness, endorsement and trust scoring.',
      'Used **centrality and clustering** graph analytics to gauge influence and **flag fraud**, surfacing actionable HR insights.'
    ]
  },
  {
    id: 'amex-challenge',
    title: 'T20 Match-Winner Prediction',
    context: 'AmEx Campus Challenge 2024 · Online',
    date: 'May 2024',
    github: 'https://github.com/omkaranu04/AmEx-Hackathon-2024',
    points: [
      'Engineered **192+ domain-specific features** and a **CatBoost** model to forecast T20 match outcomes.',
      'Tuned with **Optuna** and GridSearchCV to **82% test accuracy**, standing out among **473** Round 1 entries.'
    ]
  }
]
