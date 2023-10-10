import express from 'express';
const router = express.Router();

import cloudControllers from '../controllers/cloudControllers';


router.get('/label-image', cloudControllers.logoDetection)





export default router