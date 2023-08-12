import { Router } from 'express';
import { getProduct, newProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getProduct);
router.post('/create', newProduct);

export default router;