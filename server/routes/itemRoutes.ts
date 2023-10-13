import express from 'express';
const router = express.Router();

import itemController from '../controllers/itemController';

router.post('/item/add', itemController.createItem);
router.delete('/item/delete/:itemId', itemController.deleteItem);
router.put('/outfit/edit/:outfitId', itemController.editItem);

export default router;
