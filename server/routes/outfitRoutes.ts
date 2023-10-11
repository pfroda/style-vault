import express from 'express';
const router = express.Router();

import outfitController from '../controllers/outfitController';

router.post('/outfit/add', outfitController.createOutfit);

export default router;
