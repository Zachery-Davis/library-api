import express from 'express';
import * as bookController from '../controllers/bookController.js';
import * as bookValidator from '../middleware/bookValidator.js';

const router = express.Router();

router.get('/', bookController.getBooks);

export default router;
