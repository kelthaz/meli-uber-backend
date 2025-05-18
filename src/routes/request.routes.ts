import { Router } from 'express';
import { requestVehicle } from '../controllers/request.controller.js';

const router = Router();

router.post('/', requestVehicle);

export default router;
