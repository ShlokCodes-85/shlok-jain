import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/useTheme.js'

const RESUME_OPTIONS = [
  {
    id: 'full-stack',
    label: 'Full Stack',
    title: 'Full Stack Resume',
    file: '/Shlok%20Jain%20Full%20Stack%20CV.pdf',
    downloadName: 'Shlok-Jain-Full-Stack-CV.pdf',
    description: 'Current resume available for download.',
  },
  {
    id: 'ai-ml',
    label: 'AI/ML',
    title: 'AI/ML Resume',
    file: '/Shlok%20Jain%20AIML%20CV.pdf',
    downloadName: 'Shlok-Jain-AIML-CV.pdf',
    description: 'Resume to be added soon.',
  },
]

export default function Resume() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [activeResumeId, setActiveResumeId] = useState(RESUME_OPTIONS[0].id)
  const [toastMessage, setToastMessage] = useState('')

  const activeResume = RESUME_OPTIONS.find((option) => option.id === activeResumeId) ?? RESUME_OPTIONS[0]

  useEffect(() => {
    if (!toastMessage) return undefined

    const timeoutId = window.setTimeout(() => setToastMessage(''), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  const handleDownload = () => {
    if (!activeResume.file || !activeResume.downloadName) {
      return
    }

    const link = document.createElement('a')
    link.href = activeResume.file
    link.download = activeResume.downloadName
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setToastMessage(`${activeResume.title} downloaded.`)
  }

  return (
    <main
      className='page-content'
      style={{
        minHeight: '100vh',
        paddingTop: 88,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 28,
        background: 'radial-gradient(circle at 10% -20%, rgba(24,95,165,0.2), transparent 50%), radial-gradient(circle at 90% 120%, rgba(29,158,117,0.2), transparent 50%), #0d1117',
      }}
    >
      <section
        className="no-invert"
        style={{
          width: 'min(1080px, 100%)',
          margin: '0 auto',
          borderRadius: 14,
          border: '1px solid rgba(133,183,235,0.18)',
          background: 'rgba(13,17,23,0.72)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <header
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 12,
            flexWrap: 'wrap',
            padding: '16px',
            borderBottom: '1px solid rgba(133,183,235,0.18)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type='button'
              onClick={handleClose}
              style={{
                border: '1px solid rgba(133,183,235,0.24)',
                background: 'transparent',
                color: '#E6EDF3',
                borderRadius: 10,
                padding: '8px 12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close
            </button>

            <div>
              <h1
                style={{
                  margin: 0,
                  color: '#E6EDF3',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Shlok Jain Resume
              </h1>
              <p style={{ margin: '4px 0 0', color: '#9EB2C7', fontFamily: "'DM Sans', sans-serif", fontSize: 12.5 }}>
                Select a resume, preview it here, and download the version you are viewing.
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={handleDownload}
            disabled={!activeResume.file}
            className="no-invert"
            style={{
              border: '1px solid rgb(253, 249, 249)',
              padding: '8px 14px',
              borderRadius: 10,
              color: '#FFFFFF',
              cursor: activeResume.file ? 'pointer' : 'not-allowed',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #185FA5, #1D9E75)',
              opacity: activeResume.file ? 1 : 0.56,
            }}
          >
            Download Resume
          </button>

          {/* status text removed per user request */}
        </header>

        <div style={{ padding: 16, display: 'grid', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px',
                borderRadius: 8,
                background: isDark ? 'rgba(13,17,23,0.5)' : 'rgba(133,183,235,0.1)',
                border: `1px solid ${isDark ? 'rgba(133,183,235,0.2)' : 'rgba(133,183,235,0.3)'}`,
              }}
            >
              {RESUME_OPTIONS.map((option) => {
                const isActive = option.id === activeResumeId
                return (
                  <button
                    key={option.id}
                    type='button'
                    onClick={() => setActiveResumeId(option.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 6,
                      border: 'none',
                      background: isActive ? 'linear-gradient(135deg, #185FA5, #1D9E75)' : 'transparent',
                      color: isActive ? '#FFFFFF' : isDark ? '#9EB2C7' : '#666666',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            </div>

            {activeResume.file ? (
              <object
                className="no-invert"
                data={`${activeResume.file}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                title={activeResume.title}
                style={{
                  width: '100%',
                  height: 'calc(100vh - 170px)',
                  minHeight: 620,
                  border: isDark ? '1px solid rgba(133,183,235,0.14)' : '1px solid rgba(148,163,184,0.12)',
                  borderRadius: 10,
                  background: isDark ? '#11151d' : '#ffffff',
                }}
              >
                <embed
                  src={`${activeResume.file}#toolbar=1&navpanes=0&scrollbar=1`}
                  type="application/pdf"
                  className="no-invert"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: isDark ? '#11151d' : '#ffffff',
                  }}
                />
                <div style={{ padding: 24, textAlign: 'center' }}>
                  <p style={{ color: '#9EB2C7' }}>Unable to display PDF preview. <a href={activeResume.file} target="_blank" rel="noreferrer">Open PDF</a></p>
                </div>
              </object>
            ) : (
              <div
                style={{
                  minHeight: 620,
                  border: '1px dashed rgba(133,183,235,0.2)',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ color: '#E6EDF3', fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>
                    AI/ML resume coming soon
                  </div>
                  <div style={{ marginTop: 8, color: '#9EB2C7', fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5 }}>
                    The pill is ready now. Add the AI/ML PDF later and it will plug into this same switcher.
                  </div>
                </div>
              </div>
            )}
          </div>

          {toastMessage ? (
            <div
              role='status'
              aria-live='polite'
              style={{
                position: 'fixed',
                left: '50%',
                bottom: 22,
                transform: 'translateX(-50%)',
                background: 'rgba(8, 14, 24, 0.94)',
                border: '1px solid rgba(29,158,117,0.32)',
                color: '#F2F7FB',
                borderRadius: 999,
                padding: '12px 18px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                boxShadow: '0 14px 36px rgba(0,0,0,0.35)',
                zIndex: 30,
              }}
            >
              {toastMessage}
            </div>
          ) : null}
        </section>
      </main>
    )
  }
