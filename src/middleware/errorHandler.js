import { validationResult } from 'express-validator';
import { Prisma } from '../generated/prisma/index.js';

export function checkValidationResults(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map((err) => err.msg),
    });
  }
  next();
}

export function handlePrismaError(res, err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Resource not found' });
    }
    if (err.code === 'P2002') {
      const fields = err.meta?.target?.join(', ') || 'unique field';
      return res.status(400).json({ error: `Duplicate value for: ${fields}` });
    }
    return res.status(400).json({ error: err.message });
  }
  console.error('DEFAULT: ', err);
  res.status(500).json({ error: 'Internal server error' });
}
