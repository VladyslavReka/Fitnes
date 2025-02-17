import express from 'express';
import AuthController from '../Controllers/authController.js';
import {verifyToken} from '../Middleware/access.js';

const authController = new AuthController();
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);

export default router;