import { Router } from 'express'; import { loginUser, registerUser, currentUser } from '../controllers/authController.js'; import { authenticate } from '../middleware/authMiddleware.js';
const router = Router(); router.post('/register', registerUser); router.post('/login', loginUser); router.get('/me', authenticate, currentUser); export default router;
