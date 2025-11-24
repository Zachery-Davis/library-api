import express from 'express';
import * as checkoutController from '../controllers/checkoutController.js';
import { validateCheckout } from '../middleware/checkoutValidator.js';

const router = express.Router();

router.post('/', validateCheckout, checkoutController.createCheckout);
router.post('/:id/return', checkoutController.returnCheckout);
router.get('/', checkoutController.getCheckouts);
router.get('/:id', checkoutController.getCheckout);
router.put('/:id', validateCheckout, checkoutController.updateCheckout);
router.delete('/:id', checkoutController.deleteCheckout);

export default router;
