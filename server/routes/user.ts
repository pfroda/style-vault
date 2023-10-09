import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';
// import verifyToken from './middleware/authJwt';

router.post('/users/signup', userController.registerUser);
router.post('/users/signin', userController.logUser)

export default router;
