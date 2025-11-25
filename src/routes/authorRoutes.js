import express from 'express';
import * as authorController from '../controllers/authorController.js';
import { validateAuthor } from '../middleware/authorValidator.js';

import {
  authenticateToken,
  requireRole,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);

router.post(
  '/',
  authenticateToken,
  requireRole('librarian'),
  validateAuthor,
  authorController.createAuthor,
);

router.put(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  validateAuthor,
  authorController.updateAuthor,
);

router.delete(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  authorController.deleteAuthor,
);

export default router;
