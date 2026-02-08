import express from 'express';
import { logout } from '../controllers/auth.Controllers';

const router = express.Router();
router.post('/logout', logout);

export default router;