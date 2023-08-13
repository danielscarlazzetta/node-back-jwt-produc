import { Router } from 'express';
import { deleteProduct, getIdProduct, getProduct, newProduct, updateProduct } from '../controllers/product.controller';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getProduct);
router.post('/create',validateToken, newProduct);
router.get('/:id',validateToken, getIdProduct);
router.put('/:id',validateToken, updateProduct);
router.delete('/:id',validateToken, deleteProduct);

export default router;