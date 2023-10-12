import express from 'express';
const router = express.Router();

import cloudControllers from '../controllers/cloudControllers';


router.post('/logo', cloudControllers.logoDetection)

router.post('/label', cloudControllers.labelDetection)

router.post('/color', cloudControllers.imageProperties)

router.post('/all',
 [cloudControllers.logoDetection, 
    cloudControllers.labelDetection, 
    cloudControllers.imageProperties, 
    cloudControllers.sendFinalResponse
])




export default router