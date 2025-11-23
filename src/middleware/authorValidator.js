import { body } from 'express-validator';
import { checkValidationResults } from './validationHandler.js';

export const validateAuthor = [
  body('firstName')
    .isString().withMessage('First name must be a string')
    .notEmpty().withMessage('First name is required'),
  body('lastName')
    .isString().withMessage('Last name must be a string')
    .notEmpty().withMessage('Last name is required'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  checkValidationResults,
];
