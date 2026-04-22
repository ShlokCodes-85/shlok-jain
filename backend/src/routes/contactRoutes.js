import express from 'express'
import { body } from 'express-validator'
import { sendContactEmail } from '../controllers/contactController.js'

const router = express.Router()

router.post(
  '/send',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  sendContactEmail
)

export default router