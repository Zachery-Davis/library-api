import express from 'express';
import * as checkoutController from '../controllers/checkoutController.js';
import { validateCheckout } from '../middleware/checkoutValidator.js';

import {
  authenticateToken,
  requireRole,
  requireSelfOrAdmin,
  requireActiveUser,
} from '../middleware/authMiddleware.js';

const router = express.Router();

const assignCheckoutUser = (req, res, next) => {
  if (req.user.role !== 'librarian') {
    req.body.userId = req.user.userId;
  }
  next();
};

router.get(
  '/',
  authenticateToken,
  requireRole('librarian'),
  checkoutController.getCheckouts,
);

router.post(
  '/',
  authenticateToken,
  requireActiveUser,
  assignCheckoutUser,
  validateCheckout,
  checkoutController.createCheckout,
);

router.get(
  '/:id',
  authenticateToken,
  requireSelfOrAdmin,
  checkoutController.getCheckout,
);

router.put(
  '/:id',
  authenticateToken,
  requireSelfOrAdmin,
  validateCheckout,
  checkoutController.updateCheckout,
);

router.delete(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  checkoutController.deleteCheckout,
);

router.post(
  '/:id/return',
  authenticateToken,
  requireSelfOrAdmin,
  checkoutController.returnCheckout,
);

export default router;
