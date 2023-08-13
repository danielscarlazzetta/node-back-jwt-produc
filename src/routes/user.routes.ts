import { Router } from 'express';
import { deleteUser, getAllUser, getIdUsers, loginUser, newUser, updateUser } from '../controllers/user.controller';
import validateToken from './validate-token';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/findall', validateToken, getAllUser);
router.get('/:id',validateToken, getIdUsers);
router.put('/:id',validateToken, updateUser);
router.delete('/:id',validateToken, deleteUser);

export default router;