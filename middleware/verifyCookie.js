import { SECRET_JWT_KEY } from '../config.js';
import jwt from 'jsonwebtoken';

const verifyCookie = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };
  if (!token) return next();
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
  } catch (error) {
    req.session.user = null;
  }
  next();
};

export { verifyCookie };
  