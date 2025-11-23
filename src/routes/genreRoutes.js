import express from 'express';
import * as genreController from '../controllers/genreController.js';
import { validateGenre } from '../middleware/genreValidator.js';

const router = express.Router();

router.post('/', validateGenre, genreController.createGenre);
router.get('/', genreController.getGenres);
router.get('/:id', genreController.getGenre);
router.put('/:id', validateGenre, genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

export default router;
