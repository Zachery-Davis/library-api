import { body } from 'express-validator';
import { checkValidationResults } from './errorHandler.js';

export const validateGenre = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  checkValidationResults,
];
