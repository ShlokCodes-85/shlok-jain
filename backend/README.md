# Shlok Jain CMS - Backend

MERN stack CMS backend with JWT authentication, MongoDB integration, and comprehensive content management system.

## Features

- ✅ JWT-based authentication
- ✅ User role-based access control (Admin, Editor, Viewer)
- ✅ Content CRUD operations
- ✅ Content publishing workflow
- ✅ Category management
- ✅ Content statistics and analytics
- ✅ MongoDB integration
- ✅ Express.js REST API
- ✅ Error handling and validation

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── contentController.js   # Content management logic
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt
│   │   ├── Content.js            # Content schema
│   │   └── Category.js           # Category schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   └── contentRoutes.js      # Content endpoints
│   ├── middleware/
│   │   ├── auth.js               # JWT protection & authorization
│   │   └── errorHandler.js       # Error handling
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── config.js             # Configuration
│   ├── utils/
│   │   └── helpers.js            # Utility functions
│   └── server.js                 # Main server file
├── package.json
├── .env.example
└── .gitignore
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example` and set your values:
```
MONGODB_URI=mongodb://localhost:27017/shlok-jain-cms
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev    # Development mode with nodemon
npm start      # Production mode
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `GET /api/auth/users` - Get all users (admin only)
- `DELETE /api/auth/users/:id` - Delete user (admin only)

### Content
- `GET /api/content` - Get all content (with filters)
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/slug/:slug` - Get content by slug
- `GET /api/content/stats` - Get content statistics
- `POST /api/content` - Create content (protected)
- `PUT /api/content/:id` - Update content (protected)
- `DELETE /api/content/:id` - Delete content (protected)
- `PATCH /api/content/:id/publish` - Publish content (protected)

## User Roles

- **Admin**: Full access to all features
- **Editor**: Can create, edit, and publish content
- **Viewer**: Can only view published content

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
