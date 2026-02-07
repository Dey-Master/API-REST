import express from 'express';
import { register, login, refreshToken ,forgetPassword ,resetPassword } from '../controllers/authControllers';
import { validate,  registerSchema, loginSchema, fogortPasswordSchema, resetPasswordSchema } from '../validations/validation';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refreshToken);

router.post('/request-reset', validate(fogortPasswordSchema), forgetPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema) ,resetPassword);

export default router;