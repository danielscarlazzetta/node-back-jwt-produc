import { Router } from 'express';
import { getProduct, newProduct } from '../controllers/product.controller';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getProduct);
router.post('/create',validateToken, newProduct);

export default router;