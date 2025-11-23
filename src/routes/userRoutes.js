import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateUser } from '../middleware/userValidator.js';

const router = express.Router();

router.post('/', validateUser, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
