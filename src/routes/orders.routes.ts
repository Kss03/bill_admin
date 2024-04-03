
import {Router} from 'express'
import ordersControllers from "../controllers/orders.controllers";

const router = Router()

router.post('/order', ordersControllers.createOrder)
router.get('/order', ordersControllers.getAllOrders)
router.get('/order/:id', ordersControllers.getOneOrder)
router.put('/order', ordersControllers.updateOrder)
router.put('/order/close', ordersControllers.closeOrder)
router.delete('/order', ordersControllers.deleteOrder)

export default router