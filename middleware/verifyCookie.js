import { SECRET_JWT_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

const verifyCookie = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
  } catch (error) {
    req.session.user = null;
    return res.status(401).json({ valid: false, message: 'Not authenticated' });
  }
  next();
};

export { verifyCookie };
