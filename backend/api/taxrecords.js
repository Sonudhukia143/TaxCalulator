import express from 'express';
import taxrecords from '../routes/taxrecords.js';

const app = express();
app.use(express.json());
app.use('/', taxrecords);

export default app;