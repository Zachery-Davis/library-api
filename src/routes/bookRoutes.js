import express from 'express';
import * as bookController from '../controllers/bookController.js';
import * as bookValidator from '../middleware/bookValidator.js';

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', bookValidator, bookController.createBook);
router.get('/:id', bookController.getBook);
router.put('/:id', bookValidator, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
