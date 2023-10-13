import express from 'express';
const router = express.Router();

import outfitController from '../controllers/outfitController';

router.post('/outfit/add', outfitController.createOutfit);
router.delete('/outfit/delete/:outfitId', outfitController.deleteOutfit);
router.put('/outfit/edit/:outfitId', outfitController.editOutfit);

export default router;
