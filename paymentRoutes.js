import express from 'express';
import { body } from 'express-validator';
import { processPayment, getPaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

router.post(
  '/process',
  [
    body('billId').notEmpty().isString(),
    body('amount').isFloat({ min: 0 }),
    body('paymentMethod').isIn(['credit_card', 'debit_card', 'bank_transfer'])
  ],
  processPayment
);

router.get('/:paymentId', getPaymentStatus);

export { router as paymentRoutes };