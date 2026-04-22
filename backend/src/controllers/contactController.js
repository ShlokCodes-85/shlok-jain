import { validationResult } from 'express-validator'
import transporter from '../config/email.js'

export const sendContactEmail = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    })
  }

  const { name, email, subject, message } = req.body
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver,
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin: 0 0 16px;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-wrap;"><strong>Message:</strong><br />${message}</p>
        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message,
    })
  }
}