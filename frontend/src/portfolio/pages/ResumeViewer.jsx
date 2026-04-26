import { useNavigate } from 'react-router-dom'

const RESUME_FILE = '/Shlok%20Jain%20Professional%20CV.pdf'

export default function ResumeViewer() {
  const navigate = useNavigate()

  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
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
        style={{
          width: 'min(1080px, 100%)',
          margin: '0 auto',
          borderRadius: 14,
          border: '1px solid rgba(133,183,235,0.18)',
          background: 'rgba(13,17,23,0.72)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            padding: '14px 16px',
            borderBottom: '1px solid rgba(133,183,235,0.18)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          </div>

          <a
            href={RESUME_FILE}
            download='Shlok-Jain-Resume.pdf'
            style={{
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 10,
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #185FA5, #1D9E75)',
            }}
          >
            Download Resume
          </a>
        </header>

        <div style={{ padding: 12 }}>
          <iframe
            src={`${RESUME_FILE}#toolbar=1&navpanes=0&scrollbar=1`}
            title='Shlok Jain Resume PDF'
            style={{
              width: '100%',
              height: 'calc(100vh - 170px)',
              minHeight: 620,
              border: '1px solid rgba(133,183,235,0.14)',
              borderRadius: 10,
              background: '#11151d',
            }}
          />
        </div>
      </section>
    </main>
  )
}
