import express from 'express';
import * as authorController from '../controllers/authorController.js';
import { validateAuthor } from '../middleware/authorValidator.js';

const router = express.Router();

router.post('/', validateAuthor, authorController.createAuthor);
router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);
router.put('/:id', validateAuthor, authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
