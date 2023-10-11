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

export default {
  registerUser,
  logUser,
};
