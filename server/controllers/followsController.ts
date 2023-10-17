
import { User } from '../models/userSchema';


export const followUser = async (req, res) => {
    const followerId = req.userId;
    const userIdToFollow = req.params.userId;

    try {
        const user = await User.findByPk(followerId);
        const userToFollow = await User.findByPk(userIdToFollow);

        if(!userToFollow) {
            return res.status(404).send({ error: "User not found" });
        }

        await user.addFollowing(userToFollow);

        res.send({ message: 'Successfully followed user' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};

export const unfollowUser = async (req, res) => {
    const followerId = req.userId;
    const userIdToUnfollow = req.params.userId;

    try {
        const user = await User.findByPk(followerId);
        const userToUnfollow = await User.findByPk(userIdToUnfollow);

        if(!userToUnfollow) {
            return res.status(404).send({ error: "User not found" });
        }

        await user.removeFollowing(userToUnfollow);

        res.send({ message: 'Successfully unfollowed user' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};
