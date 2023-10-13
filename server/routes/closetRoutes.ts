import express from 'express';
const router = express.Router();

import closetController from '../controllers/closetController';

router.post('/closet/add', closetController.createCloset);
router.delete('/closet/delete/:closetId', closetController.deleteCloset);
router.put('/outfit/edit/:outfitId', closetController.editCloset);

export default router;