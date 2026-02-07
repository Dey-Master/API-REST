import express from 'express';
import { logout } from '../controllers/authControllers';

const router = express.Router();
router.post('/logout', logout);

export default router;