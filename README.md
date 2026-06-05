# Shlok Jain

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-blue)

## Overview

This repository contains a React portfolio and an Express contact API.

## Tech Stack

- React 19
- Vite
- React Router
- CSS
- Express
- Resend

## Project Structure

```
shlok-jain/
├── frontend/
└── backend/
```

## Getting Started

1. Install dependencies:

```bash
cd frontend
npm install
cd ../backend
npm install
```

2. Copy `frontend/.env.example` to `frontend/.env` and `backend/.env.example`
   to `backend/.env`.

3. Start the backend and frontend in separate terminals:

```bash
cd backend
npm run dev

cd frontend
npm run dev
```

## Resend Setup

1. Create a Resend account and API key.
2. For a quick test, keep `EMAIL_FROM=Portfolio <onboarding@resend.dev>` and set
   `CONTACT_RECEIVER_EMAIL` to the email address associated with your Resend
   account.
3. For production, add and verify your domain in Resend, then change
   `EMAIL_FROM` to an address on that domain, such as
   `Portfolio <contact@yourdomain.com>`.
4. Set `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_RECEIVER_EMAIL`, and
   `FRONTEND_URL` as secret/environment variables on the backend host.
5. Set `VITE_BACKEND_URL` to the deployed backend URL on the frontend host,
   then redeploy the frontend.

Never put `RESEND_API_KEY` in a frontend variable or any variable beginning
with `VITE_`; Vite exposes those values to website visitors.

Test the API locally:

```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Hello","message":"Testing the portfolio contact form."}'
```

## Production Build

```bash
cd frontend
npm run build
```

Preview the production frontend:

```bash
npm run preview
```

## License

MIT
