import express from 'express';
import calculateTax from '../routes/calculatetax.js';

const app = express();
app.use(express.json());
app.use('/', calculateTax);

export default app;