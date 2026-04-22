import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({ origin: frontendUrl }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Contact API is running' })
})

app.use('/api/contact', contactRoutes)

app.listen(port, () => {
  console.log(`Contact API running on port ${port}`)
})