import { Router } from 'express';
import { getUser, loginUser, newUser } from '../controllers/user.controller';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/findAll', getUser);



export default router;