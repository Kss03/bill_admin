
import {Router} from 'express'
import productsControllers from "../controllers/products.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router()

router.post('/product', authMiddleware, productsControllers.createProduct)
router.get('/product', authMiddleware, productsControllers.getAllProducts)
router.get('/product/:id', authMiddleware, productsControllers.getOneProduct)
router.put('/product', authMiddleware, productsControllers.updateProduct)
router.delete('/product', authMiddleware, productsControllers.deleteProduct)

export default router