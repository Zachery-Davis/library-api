import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { validateBook } from '../middleware/bookValidator.js';

import {
  authenticateToken,
  requireRole,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

router.post(
  '/',
  authenticateToken,
  requireRole('librarian'),
  validateBook,
  bookController.createBook,
);
router.put(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  validateBook,
  bookController.updateBook,
);
router.delete(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  bookController.deleteBook,
);

export default router;
