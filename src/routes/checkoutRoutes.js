import express from 'express';
import * as checkoutController from '../controllers/checkoutController.js';
import { validateCheckout } from '../middleware/checkoutValidator.js';

import {
  authenticateToken,
  requireRole,
  requireSelfOrAdmin,
  requireActiveUser
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',
  authenticateToken,
  requireActiveUser,
  validateCheckout,
  checkoutController.createCheckout
);

router.post('/:id/return',
  authenticateToken,
  requireSelfOrAdmin,
  checkoutController.returnCheckout
);

router.get('/',
  authenticateToken,
  requireRole('librarian'),
  checkoutController.getCheckouts
);

router.get('/:id',
  authenticateToken,
  requireSelfOrAdmin,
  checkoutController.getCheckout
);

router.put('/:id',
  authenticateToken,
  requireRole('librarian'),
  validateCheckout,
  checkoutController.updateCheckout
);

router.delete('/:id',
  authenticateToken,
  requireRole('librarian'),
  checkoutController.deleteCheckout
);

export default router;