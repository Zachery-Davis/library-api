import { body } from 'express-validator';
import { checkValidationResults } from './validationHandler.js';

export const validateCheckout = [
  body('userId')
    .isInt({ gt: 0 }).withMessage('userId must be a positive integer'),
  body('bookId')
    .isInt({ gt: 0 }).withMessage('bookId must be a positive integer'),
  body('dueAt').optional().isISO8601().withMessage('dueAt must be a valid date'),
  body('status').optional().isIn(['open', 'overdue', 'closed']).withMessage('Invalid status'),
  checkValidationResults,
];
