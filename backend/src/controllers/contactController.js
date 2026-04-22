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
  const subjectPrefix = process.env.CONTACT_EMAIL_SUBJECT_PREFIX || 'Portfolio contact:'
  const emailHeading = process.env.CONTACT_EMAIL_HEADING || 'New message from your portfolio'
  const nameLabel = process.env.CONTACT_EMAIL_NAME_LABEL || 'Name:'
  const emailLabel = process.env.CONTACT_EMAIL_EMAIL_LABEL || 'Email:'
  const subjectLabel = process.env.CONTACT_EMAIL_SUBJECT_LABEL || 'Subject:'
  const messageLabel = process.env.CONTACT_EMAIL_MESSAGE_LABEL || 'Message:'

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver,
      replyTo: email,
      subject: `${subjectPrefix} ${subject}`,
      text: [
        `${nameLabel} ${name}`,
        `${emailLabel} ${email}`,
        `${subjectLabel} ${subject}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin: 0 0 16px;">${emailHeading}</h2>
          <p><strong>${nameLabel}</strong> ${name}</p>
          <p><strong>${emailLabel}</strong> ${email}</p>
          <p><strong>${subjectLabel}</strong> ${subject}</p>
          <p style="white-space: pre-wrap;"><strong>${messageLabel}</strong><br />${message}</p>
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