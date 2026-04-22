import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './portfolio/pages/About.jsx'
import Contact from './portfolio/pages/Contact.jsx'
import Footer from './portfolio/components/Footer.jsx'
import Home from './portfolio/pages/Home.jsx'
import Experience from './portfolio/pages/Experience.jsx'
import Navbar from './portfolio/components/Navbar.jsx'
import Projects from './portfolio/pages/Projects.jsx'
import Skills from './portfolio/pages/Skills.jsx'
import { getSectionFromHash, scrollToSection, SECTION_IDS } from './portfolio/scrollToSection.js'

// Portfolio component
function PortfolioPage() {
  useEffect(() => {
    const sectionId = getSectionFromHash(window.location.hash)
    if (sectionId !== SECTION_IDS.home) {
      setTimeout(() => scrollToSection(sectionId), 0)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="page-content">
        <section id={SECTION_IDS.home} style={{ scrollMarginTop: 64 }}>
          <Home />
        </section>
        <section id={SECTION_IDS.about} style={{ scrollMarginTop: 64 }}>
          <About />
        </section>
        <section id={SECTION_IDS.experience} style={{ scrollMarginTop: 64 }}>
          <Experience />
        </section>
        <Skills />
        <section id={SECTION_IDS.projects} style={{ scrollMarginTop: 64 }}>
          <Projects />
        </section>
        <section id={SECTION_IDS.contact} style={{ scrollMarginTop: 64 }}>
          <Contact />
        </section>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="*" element={<PortfolioPage />} />
    </Routes>
  )
}
