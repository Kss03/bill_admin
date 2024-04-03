
import {Router} from 'express'
import productsControllers from "../controllers/products.controllers";
const router = Router()

router.post('/product', productsControllers.createProduct)
router.get('/product', productsControllers.getAllProducts)
router.get('/product/:id', productsControllers.getOneProduct)
router.put('/product', productsControllers.updateProduct)
router.delete('/product', productsControllers.deleteProduct)

export default router