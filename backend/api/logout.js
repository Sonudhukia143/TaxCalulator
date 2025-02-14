import express from 'express';
import logoutRouter  from '../routes/logout.js';

const app = express();
app.use(express.json());
app.use('/', logoutRouter);

export default app;