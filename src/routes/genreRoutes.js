import express from 'express';
import * as genreController from '../controllers/genreController.js';
import { validateGenre } from '../middleware/genreValidator.js';

import {
  authenticateToken,
  requireRole
} from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/',
  authenticateToken,
  requireRole('librarian'),
  validateGenre,
  genreController.createGenre
);


router.get('/', genreController.getGenres);
router.get('/:id', genreController.getGenre);


router.put('/:id',
  authenticateToken,
  requireRole('librarian'),
  validateGenre,
  genreController.updateGenre
);


router.delete('/:id',
  authenticateToken,
  requireRole('librarian'),
  genreController.deleteGenre
);

export default router;