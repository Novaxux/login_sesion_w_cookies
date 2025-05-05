import express from 'express';
import { getHomePage, loginUser, registerUser, logoutUser, getProtectedPage } from '../controllers/auth.controller.js';
import { verifyCookie } from '../middleware/verifyCookie.js';

const router = express.Router();

router.get('/', verifyCookie, getHomePage);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get('/protected', verifyCookie, getProtectedPage);

export default router;
