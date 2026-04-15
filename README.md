# Shlok Jain - Full-Stack MERN CMS Portfolio

A comprehensive full-stack Content Management System (CMS) built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features JWT-based authentication, role-based access control, and a complete content management ecosystem.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![MERN Stack](https://img.shields.io/badge/stack-MERN-blue)

## 🎯 Project Overview

This is a **monorepo** containing both frontend and backend separated into distinct packages:

- **Frontend**: React 19 + Vite - Portfolio website with integrated content fetching
- **Backend**: Node.js + Express + MongoDB - RESTful API with CMS functionality, JWT auth, and role-based access control

## 📁 Project Structure

```
shlok-jain/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── assets/                   # Static assets (images, etc.)
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles
│   │   ├── ThemeContext.jsx          # Theme management
│   │   └── scrollToSection.js        # Utility functions
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .gitignore
│   ├── README.md
│   └── index.html
│
├── backend/                           # Node.js backend API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js     # Auth logic (register, login, profile)
│   │   │   └── contentController.js  # Content CRUD operations
│   │   ├── models/
│   │   │   ├── User.js              # User schema (with bcrypt)
│   │   │   ├── Content.js           # Content schema
│   │   │   └── Category.js          # Category schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── contentRoutes.js     # Content endpoints
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT protection & authorization
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection
│   │   │   └── config.js            # Configuration
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   └── server.js                # Express app and routes
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── src/server.js
│
├── .gitignore                         # Root gitignore
├── package.json                       # Root package (workspaces)
├── LICENSE
└── README.md                          # This file
```

## ✨ Key Features

### Backend Features
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Admin, Editor, and Viewer roles
- ✅ **Content Management** - Full CRUD operations for content
- ✅ **Publishing Workflow** - Draft and publish states
- ✅ **Content Analytics** - View counts and statistics
- ✅ **MongoDB Integration** - Document-based database
- ✅ **Input Validation** - Server-side validation
- ✅ **Error Handling** - Comprehensive error management

### Frontend Features
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **React 19** - Modern UI with hooks
- 🛣️ **React Router** - Client-side routing
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎯 **Component Architecture** - Modular and reusable components
- 🌓 **Theme Context** - Theme management support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShlokCodes-85/shlok-jain.git
cd shlok-jain
```

2. **Install dependencies** (installs for both frontend and backend)
```bash
npm install
```

3. **Setup Environment Variables**

For Backend (create `backend/.env`):
```
MONGODB_URI=mongodb://localhost:27017/shlok-jain-cms
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

For Frontend (optional, create `frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

### Development

**Run both frontend and backend simultaneously:**
```bash
npm run dev
```

**Or run them separately:**
```bash
npm run dev:frontend    # Runs on http://localhost:5173
npm run dev:backend     # Runs on http://localhost:5000
```

### Production

**Build both applications:**
```bash
npm run build
```

**Build individually:**
```bash
npm run build:frontend
npm run build:backend
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (protected) |
| PUT | `/api/auth/profile` | Update profile (protected) |
| GET | `/api/auth/users` | Get all users (admin only) |
| DELETE | `/api/auth/users/:id` | Delete user (admin only) |

### Content Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content` | Get all content (with filters) |
| GET | `/api/content/:id` | Get content by ID |
| GET | `/api/content/slug/:slug` | Get content by slug |
| GET | `/api/content/stats` | Get content statistics |
| POST | `/api/content` | Create content (protected) |
| PUT | `/api/content/:id` | Update content (protected) |
| DELETE | `/api/content/:id` | Delete content (protected) |
| PATCH | `/api/content/:id/publish` | Publish content (protected) |

## 🔐 User Roles

- **Admin** - Full access to all features, user management
- **Editor** - Can create, edit, and publish content
- **Viewer** - Can only view published content (default)

## 🛠️ Technology Stack

### Frontend
- React 19
- Vite
- React Router v7
- CSS3
- JavaScript ES6+

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Development Tools
- Nodemon (backend watch mode)
- eslint & eslint-plugin-react
- Vite plugin for React

## 📚 Monorepo Structure

This project uses **npm workspaces** for monorepo management:

- `frontend` workspace - React application
- `backend` workspace - Express API

Install dependencies for both:
```bash
npm install
```

Run scripts in specific workspace:
```bash
npm run dev -w frontend
npm run dev -w backend
npm run build -w frontend
npm run build -w backend
```

## 🧪 Testing & Linting

```bash
# Lint frontend code
npm run lint

# Preview frontend build
npm run preview:frontend
```

## 📖 Documentation

- [Frontend README](./frontend/README.md) - Frontend specific setup and details
- [Backend README](./backend/README.md) - Backend specific setup, API reference, and configuration

## 🔄 Git Workflow

The project uses standard git flow:
- `main` - Production-ready code
- Feature branches for development
- Pull requests for code review

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Shlok Jain**
- GitHub: [@ShlokCodes-85](https://github.com/ShlokCodes-85)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using MERN Stack**
