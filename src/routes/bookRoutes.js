import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { validateBook } from '../middleware/bookValidator.js';

import {
  authenticateToken,
  requireRole
} from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', bookController.getBooks);
router.post('/', validateBook, bookController.createBook);
router.get('/:id', bookController.getBook);
router.put('/:id', validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.post('/',
  authenticateToken,
  requireRole('librarian'),
  bookValidator,
  bookController.createBook
);

router.put('/:id',
  authenticateToken,
  requireRole('librarian'),
  bookValidator,
  bookController.updateBook
);

router.delete('/:id',
  authenticateToken,
  requireRole('librarian'),
  bookController.deleteBook
);

export default router;