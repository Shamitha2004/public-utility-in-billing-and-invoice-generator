import express from 'express';
import { billRoutes } from './routes/billRoutes.js';
import { paymentRoutes } from './routes/paymentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route to verify server is working
app.get('/', (req, res) => {
  res.json({ message: 'Utility Bill Payment API is running!' });
});

// Routes
app.use('/api/bills', billRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`✨ Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET  /');
  console.log('- POST /api/bills/generate');
  console.log('- GET  /api/bills/:billId');
  console.log('- POST /api/payments/process');
  console.log('- GET  /api/payments/:paymentId');
});