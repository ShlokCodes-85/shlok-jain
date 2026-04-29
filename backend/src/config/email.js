import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const emailUser = process.env.EMAIL_USER
const emailPass = (process.env.EMAIL_PASSWORD || '').replace(/\s/g, '')
const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com'
const emailPort = Number(process.env.EMAIL_PORT || 465)

console.log('Email Configuration:');
console.log('  User:', emailUser || '(not set)');
console.log('  Host:', emailHost);
console.log('  Port:', emailPort);
console.log('  Secure:', emailPort === 465);

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: emailPort === 465,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  family: 4,
})

transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error.message)
  } else {
    console.log('Email transporter verified - ready to send')
  }
})

export default transporter
