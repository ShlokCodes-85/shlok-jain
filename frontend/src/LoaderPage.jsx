import { useEffect, useState } from 'react'

const apiBaseUrl = (
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_CONTACT_API_URL ||
  ''
).trim()

const apiBasePath = (
  import.meta.env.VITE_API_BASE_PATH ||
  '/api'
).trim()

const healthCheckPath = (
  import.meta.env.VITE_HEALTH_CHECK_PATH ||
  '/health-check'
).trim()

if (!apiBaseUrl) {
  console.error('VITE_BACKEND_URL environment variable is not set. Please set it before running the app.')
}

const healthUrl = `${apiBaseUrl}${apiBasePath}${healthCheckPath}`

const LOADING_MESSAGES = [
  'Warming up the portfolio experience...',
  'Fetching projects, skills, and achievements...',
  'Almost there. Thanks for your patience!',
]

export default function LoaderPage({ onReady }) {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const secondMessageTimer = setTimeout(() => setMessageIndex(1), 2000)
    const finalMessageTimer = setTimeout(() => setMessageIndex(2), 7000)

    return () => {
      clearTimeout(secondMessageTimer)
      clearTimeout(finalMessageTimer)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const pingBackend = async () => {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(healthUrl, {
          method: 'GET',
          signal: controller.signal,
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok || data?.healthy !== true || data?.status !== 'ok') {
          throw new Error(data?.message || 'Backend health check failed')
        }

        if (!isMounted) {
          return
        }

        setStatus('ready')
        onReady()
      } catch (error) {
        if (!isMounted) {
          return
        }

        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Backend is unavailable')
      }
    }

    pingBackend()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [onReady])

  const isLoading = status === 'loading'

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at top, rgba(24, 95, 165, 0.2), transparent 34%), linear-gradient(180deg, #07111e 0%, #0d1117 48%, #090d14 100%)',
        color: '#E6EDF3',
        padding: '24px',
      }}
    >
      <style>{`
        .loader-ring {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 4px solid rgba(133, 183, 235, 0.18);
          border-top-color: #85B7EB;
          border-right-color: #5DCAA5;
          opacity: 0.92;
        }

        .loader-ring.spinning {
          animation: loader-spin 0.9s linear infinite;
        }

        .loader-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.2);
        }

        .loader-dot.pulse {
          animation: loader-pulse 1.2s ease-in-out infinite;
        }

        .loader-message {
          animation: loader-message-in 0.35s ease;
        }

        @keyframes loader-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loader-pulse {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.72;
          }

          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes loader-message-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          width: 'min(420px, 100%)',
          textAlign: 'center',
          padding: '32px 24px 28px',
          borderRadius: '24px',
          border: '1px solid rgba(133, 183, 235, 0.2)',
          background: 'rgba(13, 17, 23, 0.76)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            margin: '0 auto 22px',
            borderRadius: '999px',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, rgba(24,95,165,0.2), rgba(29,158,117,0.18))',
            border: '1px solid rgba(133, 183, 235, 0.18)',
          }}
        >
          <div className={`loader-ring${isLoading ? ' spinning' : ''}`} aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={handleRetry}
          disabled={isLoading}
          aria-busy={isLoading}
          style={{
            width: '100%',
            maxWidth: 280,
            margin: '0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '16px 22px',
            borderRadius: 999,
            border: '1px solid rgba(133, 183, 235, 0.18)',
            background: isLoading
              ? 'linear-gradient(135deg, rgba(24,95,165,0.9), rgba(29,158,117,0.82))'
              : 'linear-gradient(135deg, rgba(24,95,165,0.75), rgba(29,158,117,0.7))',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: isLoading ? 'default' : 'pointer',
            boxShadow: '0 14px 34px rgba(24, 95, 165, 0.28)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <span className={`loader-dot${isLoading ? ' pulse' : ''}`} aria-hidden="true" />
          <span>{isLoading ? 'Loading portfolio' : 'Retry connection'}</span>
        </button>

        <p
          key={isLoading ? messageIndex : 'error'}
          className="loader-message"
          style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, color: '#9BA9BA' }}
        >
          {isLoading ? LOADING_MESSAGES[messageIndex] : 'The portfolio could not connect to the server.'}
        </p>

        {errorMessage ? (
          <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: '#F0B8B8' }}>{errorMessage}</p>
        ) : null}
      </div>
    </main>
  )
}
