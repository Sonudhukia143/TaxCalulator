import { Router } from 'express';
import signinuser from '../controllers/registerController.js';

const router = Router();

router.post('/',signinuser);

export default router;