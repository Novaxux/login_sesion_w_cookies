import express from 'express';
import {
  getHomePage,
  loginUser,
  registerUser,
  logoutUser,
   validateSession,
} from '../controllers/auth.controller.js';
import { verifyCookie } from '../middleware/verifyCookie.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser); 
router.post('/logout', logoutUser); 
router.get('/', getHomePage);

router.get('/validate',verifyCookie, validateSession);

export default router;