// Projects, newest first. Add a new object to show a new entry.
//   title   : project name
//   context : course / supervisor line under the title
//   date    : shown on the left of the timeline
//   github  : optional link, shown as "Code"
//   points  : bullet list, supports **bold** and [links](https://...)

export const projects = [
  {
    id: 'btp',
    title: 'Thoracic Disease Detection & Report Synthesis',
    context: 'Bachelor’s Thesis · Prof. J. Mukhopadhyay',
    date: 'Aug 2025 – Apr 2026',
    points: [
      'Built a **5-model ensemble** (ResNet-v2, DenseNet-121/161/169/201) for **multi-label classification** of pathologies from chest X-rays.',
      'Achieved **0.827 / 0.821 AUC** zero-shot on CheXpert / NIH, improving to **0.980 AUC and 0.933 F1** on real-world **Indian clinical data**.',
      'Designed an **R2Gen-based report generator** with Contrastive Attention and Relational Memory, reaching **BLEU 0.382** on IU X-Ray.'
    ]
  },
  {
    id: 'vae-gan',
    title: 'VAE & GAN, Head to Head',
    context: 'Advanced Machine Learning',
    date: 'Oct 2025',
    github: 'https://github.com/omkaranu04/Advanced-ML_CS60073-Autumn-25/tree/master/Assignments/Assignment%203',
    points: [
      'Implemented a **VAE** with a 16-dimensional latent space trained via the **ELBO**, with reconstruction and generation curves.',
      'Trained an **MLP-based GAN** with a dropout-regularised LeakyReLU discriminator, Tanh generator and label smoothing.',
      'Compared both on MNIST using **Inception Score** and **Fréchet Distance**, computed with a custom CNN classifier.'
    ]
  },
  {
    id: 'mini-shell',
    title: 'Mini-Shell',
    context: 'Self project',
    date: 'May 2025',
    github: 'https://github.com/omkaranu04/Mini-Shell',
    points: [
      'Built a **Unix shell in C** with built-in commands, **PATH-based search**, **I/O redirection**, pipes, **wildcard globbing** and **heredoc streaming**.',
      'Handled **signals and terminal modes** for Bash-like Ctrl-C / Ctrl-\\ behaviour with signal-safe cleanup.',
      'Leak-free parsing of quotes and operators with **environment-variable expansion** and syntax validation.'
    ]
  },
  {
    id: 'graph-db',
    title: 'Graph Database System',
    context: 'DBMS Laboratory · Prof. Pabitra Mitra',
    date: 'Mar – Apr 2025',
    github: 'https://github.com/omkaranu04/DBMS-Term-Project',
    points: [
      'Designed a **Neo4j recommendation system** on Amazon SNAP data (**500K+ nodes, 1M+ edges**) with a custom two-phase **PageRank**.',
      'Built a **RAG chatbot** indexing **100K+ embeddings** with **FAISS** and BAAI models for sub-100 ms semantic retrieval.',
      'Added route-level performance logging of query latency, CPU and memory per API call.'
    ]
  },
  {
    id: 'captioning',
    title: 'Automatic Image Captioning',
    context: 'Deep Learning',
    date: 'Mar – Apr 2025',
    github: 'https://github.com/omkaranu04/DL-CS60010-Spring-25/tree/master/Assignments/Assignment%202',
    points: [
      'Built a **ViT–GPT2 encoder-decoder** for captioning, scoring **BERTScore F1 0.536** vs SmolVLM’s 0.515.',
      'Stayed robust under occlusion — **0.534 F1 at 80% masking**, against SmolVLM’s 0.474.'
    ]
  },
  {
    id: 'rtp',
    title: 'Reliable Transport Protocol',
    context: 'Computer Networks Laboratory · Prof. Sandip Chakraborty',
    date: 'Mar 2025',
    github: 'https://github.com/omkaranu04/Networks_Lab-CS39006-Spring-25/tree/master/Assignment%204%20Final',
    points: [
      'Designed a **reliability layer atop UDP sockets** with packet framing, flow / error control and a **selective-repeat sliding window**.',
      'Architected a **multi-threaded protocol daemon** with modular sender, receiver and GC threads.',
      'Synchronised sockets across processes with **shared memory and mutex locks**.'
    ]
  },
  {
    id: 'minirisc',
    title: 'KGP-miniRISC Processor',
    context: 'COA Laboratory · Prof. Debdeep Mukhopadhyay',
    date: 'Oct – Nov 2024',
    github: 'https://github.com/omkaranu04/KGP-miniRISC-Processor',
    points: [
      'Defined a **40-instruction RISC ISA** and designed a custom **hardwired control unit** on a **Harvard architecture**.',
      'Implemented **BRAM-backed memory**, ALU and branching; synthesised and verified the processor on an **FPGA**.'
    ]
  },
  {
    id: 'work-mgmt',
    title: 'Work Management System',
    context: 'Software Engineering Laboratory',
    date: 'Mar – Apr 2024',
    github: 'https://github.com/omkaranu04/Work-Management-System',
    points: [
      'Multi-user platform with **role-based access**, manual and automated assignment, and real-time progress tracking.',
      'Node.js + MongoDB backend with bcrypt auth; built with an **Agile SDLC** and unit, system and regression testing.'
    ]
  }
]
