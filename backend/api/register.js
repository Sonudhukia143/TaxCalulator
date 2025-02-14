import express from 'express';
import signinuser from '../routes/signup.js';

const app = express();
app.use(express.json());
app.use('/', signinuser);

export default app;