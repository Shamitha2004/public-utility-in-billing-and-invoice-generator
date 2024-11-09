import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with a database in production)
const payments = new Map();

export const processPayment = (req, res) => {
  const { billId, amount, paymentMethod } = req.body;
  
  const payment = {
    id: uuidv4(),
    billId,
    amount,
    paymentMethod,
    status: 'completed',
    timestamp: new Date().toISOString()
  };

  payments.set(payment.id, payment);
  
  res.status(201).json({
    success: true,
    data: {
      paymentId: payment.id,
      status: payment.status
    }
  });
};

export const getPaymentStatus = (req, res) => {
  const { paymentId } = req.params;
  const payment = payments.get(paymentId);
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      error: 'Payment not found'
    });
  }
  
  res.json({
    success: true,
    data: payment
  });
};