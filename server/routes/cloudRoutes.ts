import express from 'express';
const router = express.Router();

import cloudControllers from '../controllers/cloudControllers';


router.get('/logo', cloudControllers.logoDetection)

router.get('/label', cloudControllers.labelDetection)

router.get('/color', cloudControllers.imageProperties)

router.get('/all',
 [cloudControllers.logoDetection, 
    cloudControllers.labelDetection, 
    cloudControllers.imageProperties, 
    cloudControllers.sendFinalResponse
])




export default router