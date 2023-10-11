import express from 'express';
import multer from 'multer';
const upload = multer()
const router = express.Router();

import cloudinaryControllers from '../controllers/cloudinaryControllers';

router.post('/item-foto', upload.any(), cloudinaryControllers.uploadToCloudinary)

export default router
