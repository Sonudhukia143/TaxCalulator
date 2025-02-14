import express from 'express';
import calculateTaxControler from '../controllers/calculatetax.js';

const router = express.Router();

router.post('/',calculateTaxControler);

export default router;