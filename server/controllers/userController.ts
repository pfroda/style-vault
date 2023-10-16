import { TOKEN_SECRET } from "../config/.token";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { User } from '../models/userSchema';

async function registerUser(req, res) {
  try {
    const user: User = req.body;
    console.log('Received user data:', user);

    const findUser = await User.findOne({ where: { email: user.email } });
    if (findUser) {
      console.log('User already exists:', findUser);
      return res.status(409).send({ error: '409', message: 'User already exists' });
    }

    if (!user.password) {
      console.log('Password is missing');
      throw new Error('Password is missing');
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({
      username: user.username,
      password: hashPassword,
      email: user.email,
      profilePicture: user.profilePicture || null,
      name: user.name || null,
      surname: user.surname || null,
    });

    console.log('Created new user:', newUser);

    const accessToken = jwt.sign({ id: newUser.id }, TOKEN_SECRET);
    console.log('Generated access token:', accessToken);
    res.cookie('token', accessToken, {httpOnly: true, secure: true, SameSite: 'true', expires: new Date(Date.now() + 60 * 60 * 1000 * 24)})
    res.status(201).send({accessToken, id: newUser.id})
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send({ error: error.message, message: 'Could not create user' });
  }
}

async function logUser (req, res) {
  const login: User = req.body;
  // console.log('received user data', login)
  try {
    const user = await User.findOne({ where: { email: login.email } });
    // console.log('user in database', user)
    const validatedPass = await bcrypt.compare(login.password, user.password);

    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, TOKEN_SECRET);
    // console.log('Generated access token:', accessToken);
    res.cookie('token', accessToken, {httpOnly: true, secure: true, SameSite: 'true', expires: new Date(Date.now() + 60 * 60 * 1000 * 24)});
    // res.json({id: user.id})
    res.status(200).send({accessToken, id: user.id})
    } catch (error) {
      res
        .status(401)
        .send({ error: '401', message: 'Username or password is incorrect' });
    }
};

async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const existingUser = await User.findOne({ where: { id: userId } });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUserData = req.body;
    let passwordUpdate = {};

    if (updatedUserData.password) {
      const newPasswordHash = await bcrypt.hash(updatedUserData.password, 10);
      passwordUpdate = { password: newPasswordHash };
    }

    const [updatedRowCount, updatedUser] = await User.update(
      {
        username: updatedUserData.username || existingUser.username,
        email: updatedUserData.email || existingUser.email,
        name: updatedUserData.name || existingUser.name,
        surname: updatedUserData.surname || existingUser.surname,
        ...passwordUpdate,
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );

    if (updatedRowCount === 0) {
      throw new Error('User not found');
    }

    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).send({ error: error.message, message: 'Could not update user' });
  }
}

async function getUserData (req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      return res.status(404).send({ error: 'User not found', message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send({ error: error.message, message: 'Could not get user' });
  }
}


export default {
  registerUser,
  logUser,
  updateUser,
  getUserData
};
