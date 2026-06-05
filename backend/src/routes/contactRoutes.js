import express from 'express'
import { body } from 'express-validator'
import { sendContactEmail } from '../controllers/contactController.js'

const router = express.Router()

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name is too long'),
    body('email').trim().isEmail().withMessage('Valid email is required').isLength({ max: 254 }).withMessage('Email is too long'),
    body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).withMessage('Subject is too long'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }).withMessage('Message is too long'),
  ],
  sendContactEmail
)

export default router
