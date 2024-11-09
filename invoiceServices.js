import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = (bill) => {
  const doc = new PDFDocument();
  const fileName = `invoice-${bill.id}.pdf`;
  const filePath = path.join('invoices', fileName);

  // Ensure invoices directory exists
  if (!fs.existsSync('invoices')) {
    fs.mkdirSync('invoices');
  }

  // Pipe PDF to file
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to PDF
  doc
    .fontSize(25)
    .text('Utility Bill Invoice', 100, 80);

  doc
    .fontSize(12)
    .text(`Bill ID: ${bill.id}`, 100, 160)
    .text(`Customer ID: ${bill.customerId}`, 100, 180)
    .text(`Utility Type: ${bill.utilityType}`, 100, 200)
    .text(`Amount: $${bill.amount}`, 100, 220)
    .text(`Due Date: ${new Date(bill.dueDate).toLocaleDateString()}`, 100, 240);

  doc.end();
  return filePath;
};