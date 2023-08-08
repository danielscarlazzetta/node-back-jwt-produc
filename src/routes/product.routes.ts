import { Router } from 'express';
import { getProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getProduct);


export default router;