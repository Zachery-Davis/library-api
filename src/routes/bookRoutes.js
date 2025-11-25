import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { validateBook } from '../middleware/bookValidator.js';

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', validateBook, bookController.createBook);
router.get('/:id', bookController.getBook);
router.put('/:id', validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
