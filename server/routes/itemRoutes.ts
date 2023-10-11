import express from 'express';
const router = express.Router();

import itemController from '../controllers/itemController';

router.post('/item/add', itemController.createItem);

export default router;
