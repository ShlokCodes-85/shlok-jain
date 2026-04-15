import express from 'express';
import * as contentController from '../controllers/contentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', contentController.getAllContent);
router.get('/stats', contentController.getContentStats);
router.get('/slug/:slug', contentController.getContentBySlug);
router.get('/:id', contentController.getContentById);

// Protected routes (editor and above)
router.post('/', protect, authorize('admin', 'editor'), contentController.createContent);

// Protected routes (owner or admin can update/delete)
router.put('/:id', protect, authorize('admin', 'editor'), contentController.updateContent);
router.delete('/:id', protect, authorize('admin', 'editor'), contentController.deleteContent);
router.patch('/:id/publish', protect, authorize('admin', 'editor'), contentController.publishContent);

export default router;
