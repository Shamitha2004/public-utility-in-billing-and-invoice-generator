import express from 'express';
import { body, validationResult } from 'express-validator';
import { generateBill, getBill } from '../controllers/billController.js';

const router = express.Router();

router.post(
  '/generate',
  [
    body('customerId').notEmpty().isString(),
    body('utilityType').isIn(['electricity', 'water', 'gas']),
    body('amount').isFloat({ min: 0 }),
    body('dueDate').isISO8601()
  ],
  generateBill
);

router.get('/:billId', getBill);

export { router as billRoutes };