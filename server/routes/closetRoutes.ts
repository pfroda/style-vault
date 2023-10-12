import express from 'express';
const router = express.Router();

import closetController from '../controllers/closetController';

router.post('/closet/add', closetController.createCloset);

export default router;