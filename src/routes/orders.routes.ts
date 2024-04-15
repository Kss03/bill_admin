
import {Router} from 'express'
import ordersControllers from "../controllers/orders.controllers";
import authMiddleware from "../middleware/auth.middleware";

const router = Router()

router.post('/orders', authMiddleware, ordersControllers.createOrder)
router.post('/orders/order-product', authMiddleware, ordersControllers.addProductToOrder)
router.get('/orders/order-product/:id', authMiddleware, ordersControllers.getOrderedProducts)
router.get('/orders', authMiddleware, ordersControllers.getAllOrders)
router.get('/orders/:id', authMiddleware, ordersControllers.getOneOrder)
router.put('/orders', authMiddleware, ordersControllers.updateOrder)
router.put('/orders/close', authMiddleware, ordersControllers.closeOrder)
router.delete('/orders', authMiddleware, ordersControllers.deleteOrder)

export default router