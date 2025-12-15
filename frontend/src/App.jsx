import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import CP from './pages/CP'
import Hackathons from './pages/Hackathons'

export default function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/cp" element={<CP />} />
        <Route path="/hackathons" element={<Hackathons />} />
      </Routes>
    </>
  )
}