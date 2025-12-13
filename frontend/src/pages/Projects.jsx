import React from 'react'

const projects = [
  {
    id: 'proj-a',
    title: 'Cardiomegaly Detection - Bachelors Thesis Project - I',
    timeframe: 'Jul \'25 - Nov \'25',
    github: '',
    description: `
    • Built a hybrid DenseNet121-CBAM model for Cardiomegaly detection, refining features across channel and spatial paths \n
    • Implemented a custom FZLPR loss to emphasize 'hard' examples, improving recall on borderline cases and stabilising optimization \n
    • Conducted extensive ablation studies isolating the contributions of CBAM, FZLPR, and training-schedule components \n
    • Assessed robustness under domain shift using an unseen Indian dataset; targeted fine-tuning lifted F1-Score from 74.84% to 96.70% \n
    `
  },
  {
    id: 'proj-b',
    title: 'VAE and GAN - Advanced Machine Learning Course',
    timeframe: 'Oct \'25',
    github: 'https://github.com/omkaranu04/Advanced-ML_CS60073-Autumn-25/tree/master/Assignments/Assignment%203',
    description:`
    • Implemented a VAE with a 16-dimensional latent space, trained via ELBO, generating reconstruction and generation curves\n
    • Trained an MLP-based GAN with LeakyReLU, dropout-regularized discriminator, Tanh generator, and label smoothing\n
    • Compared MNIST-trained VAE and GAN using Inception Score and Fréchet Distance, computed with a custom CNN classifier\n
    `
  },
  {
    id: 'proj-c',
    title:'Mini Shell - Self Project',
    timeframe: 'May \`25',
    github: 'https://github.com/omkaranu04/Mini-Shell',
    description:`
    • Built a robust Unix Shell in C supporting custom built-in commands, PATH-based search, and external executable handling\n
    • Implemented pipes, I/O-redirections, globbing, and heredoc streaming via fork/execve/dup2/pipe for POSIX compliance\n
    • Managed signals and terminal nodes for Bash-like Ctrl-C/Ctrl-\handling, signal-safe cleanup, and consistent state restoration\n
    • Ensured leak-free parsing of quotes, environment variable expansion, and operators with syntax validation and memory checks\n
    `
  },
  {
    id: 'proj-d',
    title: 'Graph Database System - Database Management Systems Laboratory',
    timeframe: 'Mar \'25 - Apr \'25',
    github: 'https://github.com/omkaranu04/DBMS-Term-Project',
    description:`
    • Designed a Neo4j recommendation system on Amazon SNAP dataset (500K+ nodes, 1M+ edges), using product-user relations\n
    • Built a RAG ChatBot for search, indexing 100K+ embeddings with FAISS for sub-100ms retrieval and BAAI for semantics\n
    • Developed a two-phase PageRank algorithm with 5-iteration convergence, blending helpfulness and co-purchase influence\n
    • Integrated route-level performance logging via a custom decorator logging query latency, CPU, and memory usage per API call\n
    `
  },
  {
    id: 'proj-e',
    title: 'Reliable Transport Protocol for Network Communication - Computer Networks Laboratory',
    timeframe: 'Mar \`25',
    github: 'https://github.com/omkaranu04/Networks_Lab-CS39006-Spring-25/tree/master/Assignment%204%20Final',
    description: `
      • Designed a reliability layer atop UDP, with packet framing, flow/error control, and retransmission in lossy environments\n
      • Architected a multi-threaded protocol daemon with modular sender, receiver, and GC threads, for maximizing throughput\n
      • Utilized shared memory and mutex locks to synchronize access for 5 sockets, enabling concurrent operations across processes\n
      • Implemented selective-repeat sliding window with sequence-numbered DATA/ACK packets for ordered delivery and fast recovery\n
    `
  },
  {
    id: 'proj-f',
    title: 'Automatic Image Captioning - Deep Learning Course',
    timeframe: 'Mar \'25 - Apr \'25',
    github: 'https://github.com/omkaranu04/DL-CS60010-Spring-25/tree/master/Assignments/Assignment%202',
    description:`
    • Developed a ViT-GPT2 encoder-decoder for image captioning, achieving BERTScore F1 (0.536) vs SmolVLM (0.515) on the test set\n
    • Demonstrated robustness under occlusion - model kept the BERTScore F1 of 0.534 at 80% masking, outperforming SmolVLM's 0.474\n
    • Benchmarked semantic alignment and stability - custom model showed lesser drop than SmolVLM under increasing occlusion\n
    `
  },
  {
    id: 'proj-g',
    title: 'KGP-miniRISC Processor - Computer Organization and Architecture Laboratory',
    timeframe: 'Oct \'24 - Nov \'24',
    github: 'https://github.com/omkaranu04/KGP-miniRISC-Processor',
    description:`
    • Designed a custom hardwired control unit with tailored instruction encoding, enabling efficient decoding and streamlined control flow\n
    • Implemented a BRAM-integrated memory with ALU, register-memory and branching instructions, ensuring efficient execution\n
    • Synthesized and deployed processor architecture on FPGA, conducting functional verification with test benches and instruction sets\n
    • Defined a 40-instruction RISC ISA and control-signal map, leveraging Harvard architecture for separate instruction and data paths\n
    `
  },
  {
    id: 'proj-h',
    title: 'Work Management System - Software Engineering Laboratory',
    timeframe: 'Mar \'24 - Apr \'24',
    github: 'https://github.com/omkaranu04/Work-Management-System',
    description:`
    • Developed a multi-user platform with role-based access, supporting manual and automated assignment and real-time progress tracking\n
    • Built dynamic interfaces for adding, editing, searching, and priority assignment of works and workers, enabling efficient management\n
    • Engineered a responsive frontend (HTML, CSS, JS) and Node.js backend with MongoDB, with bcrypt authentication, for fast operations\n
    • Adopted Agile SDLC with daily reviews, executing unit, system, and regression testing, passing across all user and assignment flows\n
    `
  }
]

/* Reuse the same description parser implemented for Experience */
function renderDescription(text) {
  const lines = text.split('\n').map((l) => l.replace(/\r/g, ''))
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      out.push(<div key={`p-${i}`} style={{ height: 8 }} />)
      i++
      continue
    }

    if (line.endsWith(':')) {
      const title = line.slice(0, -1)
      i++
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        items.push(lines[i].trim().replace(/^-+\s*/, ''))
        i++
      }

      out.push(
        <div key={`section-${i}`} className="desc-section">
          <div className="desc-section-title">{title}</div>
          {items.length > 0 ? (
            <ul className="desc-list">
              {items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )
      continue
    }

    const paraLines = []
    while (i < lines.length && lines[i].trim() && !lines[i].trim().endsWith(':')) {
      if (lines[i].trim().endsWith(':')) break
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length) {
      out.push(
        <p key={`para-${i}`} className="desc-paragraph">
          {paraLines.join(' ')}
        </p>
      )
    }
  }

  return out
}

export default function Projects() {
  return (
    <main className="app-root">
      <section className="experience-timeline-wrapper">
        <header className="experience-header">
          <h1 className="headline">Projects</h1>
        </header>

        <div className="timeline" role="list">
          {projects.map((p, idx) => {
            const side = idx % 2 === 0 ? 'left' : 'right'
            return (
              <article
                key={p.id}
                className={`timeline-item ${side}`}
                tabIndex={0}
                role="listitem"
                aria-labelledby={`${p.id}-title`}
              >
                <div className="item-content">
                  <div className="item-header">
                    <h3 id={`${p.id}-title`} className="tile-title">{p.title}</h3>
                              
                    <div className="time-github-row">
                      <span className="tile-time">{p.timeframe}</span>
                              
                      {p.github ? (
                        <a
                          className="github-link"
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.title} on GitHub`}
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0C5.37 0 0 5.48 0 12.25c0 5.41 3.44 9.98 8.2 11.61.6.12.82-.27.82-.59v-2.1c-3.34.75-4.05-1.65-4.05-1.65-.55-1.43-1.34-1.82-1.34-1.82-1.1-.78.09-.77.09-.77 1.21.09 1.84 1.28 1.84 1.28 1.08 1.88 2.82 1.34 3.51 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.48-1.36-5.48-6.03 0-1.33.47-2.42 1.24-3.27-.12-.31-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.25a11.1 11.1 0 0 1 6.02 0c2.3-1.58 3.31-1.25 3.31-1.25.66 1.66.24 2.89.12 3.2.77.85 1.24 1.94 1.24 3.27 0 4.69-2.81 5.72-5.49 6.03.43.38.82 1.16.82 2.35v3.14c0 .32.21.71.83.59C20.56 22.23 24 17.66 24 12.25 24 5.48 18.63 0 12 0Z" />
                          </svg>
                        </a>
                      ) : (
                        <div style={{ width: 18 }} aria-hidden />
                      )}
                    </div>
                  </div>
                  <div className="tile-body">
                    <div className="tile-desc">
                      {renderDescription(p.description)}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
