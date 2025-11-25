import { body } from 'express-validator';
import { checkValidationResults } from './errorHandler.js';

export const validateBook = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required'),

  body('author').optional().isString().withMessage('Author must be a string'),

  body('authors').optional().isArray().withMessage('Authors must be an array'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('genres').optional().isArray().withMessage('Genres must be an array'),

  body('published')
    .optional()
    .customSanitizer((value) => {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
      return value;
    })
    .isISO8601()
    .withMessage('Published must be a valid ISO8601 date'),

  body('isbn').optional().isString().withMessage('ISBN must be a string'),

  checkValidationResults,
];
