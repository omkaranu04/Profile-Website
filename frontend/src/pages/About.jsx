import React from 'react'
import profilePic from '../assets/profile.jpg'

export default function About() {
  return (
    <main className="app-root">
      <section className="about-container">

        {/* Left: Image */}
        <div className="about-photo-wrapper">
          <img src={profilePic} alt="Omkar Bhandare" className="about-photo" />
        </div>

        {/* Right: Short intro text */}
        <div className="about-text">
          <h1 className="about-title">About Me</h1>

          <p className="about-description">
            {/* Placeholder content — will replace later */}
            This is a short introduction about me. We will update this content soon.
          </p>
        </div>

      </section>
    </main>
  )
}
