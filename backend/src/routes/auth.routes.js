import { Router } from 'express';
import { signup, login, verify } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', authenticateToken, verify);

export default router;
