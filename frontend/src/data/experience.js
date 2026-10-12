// Work & research experience, newest first.
// `highlight` is the one number shown beside the role; `points` support **bold**.

export const experience = [
  {
    id: 'amex',
    role: 'Analyst Intern',
    org: 'American Express',
    orgDetail: 'American Express Pvt. Ltd.',
    location: 'Gurugram',
    mode: 'Onsite',
    start: 'May 2026',
    end: 'Jul 2026',
    highlight: { value: '15d → 2d', label: 'time to action' },
    points: [
      'Developed an **agentic AI workflow** inside the Paid Search environment that **detects anomalies across KPIs** in paid-search markets.',
      'Engineered the workflow to **reason about the root cause** of each anomaly and **suggest corrective actions**, improving the quality of the action taken.',
      'Cut time-to-action from **~15 days to ~2 days**; delivered the workflow as a **functional MVP** in the paid-search environment.'
    ],
    tags: ['Agentic AI', 'LLMs', 'Anomaly detection', 'Paid search']
  },
  {
    id: 'deakin',
    role: 'Research Intern',
    org: 'Deakin University',
    orgDetail: 'Deakin University, Australia · with Dr. Ye Zhu',
    location: 'Australia',
    mode: 'Remote',
    start: 'Apr 2024',
    end: 'Aug 2024',
    highlight: { value: '0.99', label: 'AUC on Satimage-2' },
    link: { label: 'Code', url: 'https://github.com/omkaranu04/FTP-Deakin' },
    points: [
      'Reproduced and validated the **MemStream** algorithm for **real-time anomaly detection**, reaching scores up to **0.99** on the Satimage-2 dataset.',
      'Introduced a **“limit” score threshold** for anomaly labelling, improving adaptability and **outperforming 6 of 9 baselines** across datasets.',
      'Benchmarked MemStream against **9 algorithms on 7 datasets** using ROC-AUC, ROC-PR, false-positive and false-negative metrics.',
      'Authored a report on MemStream’s strengths under **concept drift** and in real-time detection.'
    ],
    tags: ['Streaming ML', 'Anomaly detection', 'Research', 'Python']
  }
]
