import { Router } from 'express';
import taxrecords from '../controllers/taxrecordsControler.js';

const router = Router();

router.get('/', taxrecords);

export default router;