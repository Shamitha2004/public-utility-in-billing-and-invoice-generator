import { v4 as uuidv4 } from 'uuid';
import { generateInvoicePDF } from '../services/invoiceService.js';

// In-memory storage (replace with a database in production)
const bills = new Map();

export const generateBill = (req, res) => {
  const { customerId, utilityType, amount, dueDate } = req.body;
  
  const bill = {
    id: uuidv4(),
    customerId,
    utilityType,
    amount,
    dueDate,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bills.set(bill.id, bill);
  
  // Generate PDF invoice
  const invoicePath = generateInvoicePDF(bill);
  
  res.status(201).json({
    success: true,
    data: {
      billId: bill.id,
      invoicePath
    }
  });
};

export const getBill = (req, res) => {
  const { billId } = req.params;
  const bill = bills.get(billId);
  
  if (!bill) {
    return res.status(404).json({
      success: false,
      error: 'Bill not found'
    });
  }
  
  res.json({
    success: true,
    data: bill
  });
};