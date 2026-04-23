import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const backendUrl = process.env.BACKEND_URL || `http://localhost:${port}`
const apiBasePath = process.env.API_BASE_PATH || '/api'
const contactRoutePath = process.env.CONTACT_ROUTE_PATH || '/contact/send'
const healthRoutePath = process.env.HEALTH_ROUTE_PATH || '/health'
const healthCheckAliasPath = process.env.HEALTH_CHECK_ALIAS_PATH || '/health-check'
const healthMessage = process.env.HEALTH_MESSAGE || 'Contact API is running'

const normalizeOrigin = (origin) => origin.replace(/\/$/, '')

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map(normalizeOrigin)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header) like curl or health monitors.
      if (!origin) {
        callback(null, true)
        return
      }

      const normalizedOrigin = normalizeOrigin(origin)
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true)
        return
      }

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