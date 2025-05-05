import { UserRepository } from '../models/user.repository.js';
import { SECRET_JWT_KEY } from '../config.js';
import jwt from 'jsonwebtoken'

const getHomePage = (req, res) => {
  const { user } = req.session;
  if (user) return res.sendFile(process.cwd() + '/views/protected.html');
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
      .send({ user, token });
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
  res.clearCookie('access_token');
  res.redirect('/');
};

const getProtectedPage = (req, res) => {
  const { user } = req.session;
  if (!user) return res.send('Acces not authorized');
  res.sendFile(process.cwd() + '/views/protected.html');
};

export { getHomePage, loginUser, registerUser, logoutUser, getProtectedPage };
