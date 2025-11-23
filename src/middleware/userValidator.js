import { body } from 'express-validator';
import { checkValidationResults } from './validationHandler.js';

export const validateUser = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName')
    .isString().withMessage('Full name must be a string')
    .notEmpty().withMessage('Full name is required'),
  body('role')
    .optional()
    .isIn(['member', 'librarian']).withMessage('Role must be member or librarian'),
  body('status')
    .optional()
    .isIn(['active', 'banned']).withMessage('Status must be active or banned'),
  checkValidationResults,
];
