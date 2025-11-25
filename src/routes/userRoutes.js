import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateUser } from '../middleware/userValidator.js';

import {
  authenticateToken,
  requireRole,
  requireSelfOrAdmin,
  requireActiveUser
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',
  authenticateToken,
  requireRole('librarian'),
  validateUser,
  userController.createUser
);

router.get('/',
  authenticateToken,
  requireRole('librarian'),
  userController.getUsers
);

router.get('/:id',
  authenticateToken,
  requireSelfOrAdmin,
  userController.getUser
);

router.put('/:id',
  authenticateToken,
  requireSelfOrAdmin,
  validateUser,
  userController.updateUser
);

router.delete('/:id',
  authenticateToken,
  requireRole('librarian'),
  userController.deleteUser
);

export default router;