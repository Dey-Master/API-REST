import express from 'express';
import { logout } from '../controllers/auth.Controllers';
import { getAllUser, deleteUser, getProfile } from '../controllers/users.Controllers';
import { authrize } from '../middlewares/authorize';
import { Role } from '../../generated/prisma/enums';

const router = express.Router();
router.post('/logout', logout);

//Apenas uma demostração de permissões entre o Admin e o User
router.get('/profile', getProfile);

router.get('/users', authrize(Role.ADMIN), getAllUser);
router.delete('/delete-user/:id', authrize(Role.ADMIN), deleteUser);

export default router;