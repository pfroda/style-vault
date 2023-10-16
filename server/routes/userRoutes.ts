import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';
// import verifyToken from './middleware/authJwt';

router.post('/users/signup', userController.registerUser);
router.post('/users/signin', userController.logUser);
router.put('/users/:userId/upload', userController.updateUser);
router.get('/users/:userId', userController.getUserData);


export default router;
