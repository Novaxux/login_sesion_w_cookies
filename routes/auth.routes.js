import express from 'express';
import {
  getHomePage,
  loginUser,
  registerUser,
  logoutUser,
  // getProtectedPage,
  validateSession,
} from '../controllers/auth.controller.js';
import { verifyCookie } from '../middleware/verifyCookie.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser); 
router.post('/logout', logoutUser); 
router.get('/', getHomePage);

router.use(verifyCookie);
router.get('/validate', validateSession);
// router.get('/protected', getProtectedPage);

export default router;
