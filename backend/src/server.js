import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const backendUrl = process.env.VITE_BACKEND_URL || `http://localhost:${port}`
const apiBasePath = process.env.API_BASE_PATH || '/api'
const contactRoutePath = process.env.CONTACT_ROUTE_PATH || '/contact/send'
const healthRoutePath = process.env.HEALTH_ROUTE_PATH || '/health'
const healthCheckAliasPath = process.env.HEALTH_CHECK_ALIAS_PATH || '/health-check'
const healthMessage = process.env.HEALTH_MESSAGE || 'Contact API is running'

const normalizeOrigin = (origin) => origin.replace(/\/$/, '')

// Check both VITE_FRONTEND_URL and FRONTEND_URL for compatibility
const configuredFrontendUrl = process.env.VITE_FRONTEND_URL || process.env.FRONTEND_URL || ''
const allowedOrigins = configuredFrontendUrl
  ? configuredFrontendUrl
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
      .map(normalizeOrigin)
  : ['http://localhost:5173', 'http://localhost:3000']

console.log('Environment variables loaded:');
console.log('VITE_FRONTEND_URL:', process.env.VITE_FRONTEND_URL || '(not set)');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || '(not set)');
console.log('Using Frontend URL:', configuredFrontendUrl || '(using defaults)');
console.log('Allowed origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header) like curl or health monitors.
      if (!origin) {
        console.log('No origin header - allowing');
        callback(null, true)
        return
      }

      const normalizedOrigin = normalizeOrigin(origin)
      console.log('Incoming request from:', normalizedOrigin);
      
      if (allowedOrigins.includes(normalizedOrigin)) {
        console.log('✓ Origin allowed');
        callback(null, true)
        return
      }

      console.error('✗ CORS blocked:', normalizedOrigin);
      console.error('  Expected one of:', allowedOrigins);
      callback(new Error('Not allowed by CORS'))
    },
  })
)
app.use(express.json())

const sendHealthResponse = (req, res) => {
  res.status(200).json({
    success: true,
    healthy: true,
    status: 'ok',
    message: healthMessage,
    backendUrl,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}

app.get(`${apiBasePath}${healthRoutePath}`, sendHealthResponse)
app.get(`${apiBasePath}${healthCheckAliasPath}`, sendHealthResponse)

app.use(`${apiBasePath}${contactRoutePath}`, contactRoutes)

app.listen(port, () => {
  console.log(`Contact API running on port ${port}`)
})