import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Helpful browser responses for direct navigation
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Auth API is running',
		endpoints: {
			register: 'POST /api/auth/register',
			login: 'POST /api/auth/login',
			profile: 'GET /api/auth/profile',
		},
	});
});

router.get('/login', (req, res) => {
	res.status(405).json({
		success: false,
		message: 'Use POST /api/auth/login to authenticate. This endpoint does not support browser GET requests.',
	});
});

router.get('/register', (req, res) => {
	res.status(405).json({
		success: false,
		message: 'Use POST /api/auth/register to create a user. This endpoint does not support browser GET requests.',
	});
});

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);

// Admin routes
router.get('/users', protect, authorize('admin'), authController.getAllUsers);
router.delete('/users/:id', protect, authorize('admin'), authController.deleteUser);

export default router;
