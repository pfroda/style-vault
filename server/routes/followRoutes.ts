import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/followsController';

const router = Router();

router.post('/follow/:userId', followUser);
router.post('/unfollow/:userId', unfollowUser);

export default router;
