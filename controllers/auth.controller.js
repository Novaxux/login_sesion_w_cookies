import { UserRepository } from '../models/user.repository.js';
import { SECRET_JWT_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

const getHomePage = (req, res) => {
  return res.sendFile(process.cwd() + '/views/index.html');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h',
      }
    );
    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .send({ user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('access_token').json({ message: 'logout succesfull' });
};

const getProtectedPage = (req, res) => {
  const { user } = req.session;
  if (!user) return res.send('Acces not authorized');
  res.sendFile(process.cwd() + '/views/protected.html');
};

const validateSession = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ valid: true, user: req.session.user });
  } else {
    return res.status(401).json({ valid: false, message: 'Not authenticated' });
  }
};

export {
  getHomePage,
  loginUser,
  registerUser,
  logoutUser,
  getProtectedPage,
  validateSession,
};
