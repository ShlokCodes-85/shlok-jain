import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoaderPage from './LoaderPage.jsx'
import About from './portfolio/pages/About.jsx'
import Achievements from './portfolio/pages/Achievements.jsx'
import Certifications from './portfolio/pages/Certifications.jsx'
import Contact from './portfolio/pages/Contact.jsx'
import Footer from './portfolio/components/Footer.jsx'
import Home from './portfolio/pages/Home.jsx'
import Experience from './portfolio/pages/Experience.jsx'
import Navbar from './portfolio/components/Navbar.jsx'
import Projects from './portfolio/pages/Projects.jsx'
import Resume from './portfolio/pages/Resume.jsx'
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
        <section id={SECTION_IDS.certifications} style={{ scrollMarginTop: 64 }}>
          <Certifications />
        </section>
        <section id={SECTION_IDS.achievements} style={{ scrollMarginTop: 64 }}>
          <Achievements />
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
  const [isReady, setIsReady] = useState(false)
  const handleReady = useCallback(() => setIsReady(true), [])

  if (!isReady) {
    return <LoaderPage onReady={handleReady} />
  }

  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route
        path="/resume"
        element={(
          <>
            <Navbar />
            <Resume />
          </>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
