import React from 'react'
import profilePic from '../assets/profile.jpg'

export default function About() {
  return (
    <main className="app-root">
      <section className="about-container">

        {/* Left: Image */}
        <div className="about-photo-wrapper">
          <img src={profilePic} alt="Omkar Bhandare" className="about-photo" />

        {/* Social Icons under the image */}
          <div className="about-social-icons">
            
            {/* GitHub */}
            <a 
              href="https://github.com/omkaranu04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-icon"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.48 0 12.25c0 5.41 3.44 9.98 8.2 11.61.6.12.82-.27.82-.59v-2.1c-3.34.75-4.05-1.65-4.05-1.65-.55-1.43-1.34-1.82-1.34-1.82-1.1-.78.09-.77.09-.77 1.21.09 1.84 1.28 1.84 1.28 1.08 1.88 2.82 1.34 3.51 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.48-1.36-5.48-6.03 0-1.33.47-2.42 1.24-3.27-.12-.31-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.25a11.1 11.1 0 0 1 6.02 0c2.3-1.58 3.31-1.25 3.31-1.25.66 1.66.24 2.89.12 3.2.77.85 1.24 1.94 1.24 3.27 0 4.69-2.81 5.72-5.49 6.03.43.38.82 1.16.82 2.35v3.14c0 .32.21.71.83.59C20.56 22.23 24 17.66 24 12.25 24 5.48 18.63 0 12 0Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/omkarbhandare13/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-icon"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 112.5 6a2.5 2.5 0 012.48-2.5zM2.5 8.75h4.96V21H2.5V8.75zM14.75 8.5c-2.2 0-3.21 1.23-3.76 2.1V8.75H6.25V21h4.96v-6.3c0-.34.02-.69.13-.94.28-.69.91-1.4 1.97-1.4 1.39 0 1.94 1.06 1.94 2.62V21h4.96v-6.77c0-3.63-1.94-5.73-4.46-5.73z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/omkarvb_13?igsh=MTZxZm15M3lsNzl5OA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect 
                  x="3" 
                  y="3" 
                  width="18" 
                  height="18" 
                  rx="5" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                />
                <circle 
                  cx="12" 
                  cy="12" 
                  r="3.2" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                />
                <circle 
                  cx="17.5" 
                  cy="6.5" 
                  r="1.1" 
                  fill="currentColor" 
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Short intro text */}
        <div className="about-text">
          <p className="about-description">
            {/* Placeholder content — will replace later */}
            Hey! <br />
            I am Omkar Bhandare, a fourth year CSE Dual Degree student at IIT Kharagpur. <br />
            I am passionate about machine learning and deep learning, and I am always keen to explore new advancements in these fields. <br />
            I also am fond of DSA and CP, and love solving problems on various competitive programming platforms. <br />
            Apart from academics, I enjoy writing poetry and prose in my free time. I do have an Instagram page where I share my work - don't forget to
            {" "}
            <a 
              href="https://www.instagram.com/deadpoets_page?igsh=MXFwMHVyamUwcm1wMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-instagram-link"
            >
               check it out!
            </a> <br />
            I am also a tech-geek, and I  love keeping myself updated with the latest tech trends and gadgets. <br />
          </p>
        </div>

      </section>
    </main>
  )
}
