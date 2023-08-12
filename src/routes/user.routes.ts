import { Router } from 'express';
import { getAllUser, loginUser, newUser } from '../controllers/user.controller';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/findall', getAllUser);



export default router;